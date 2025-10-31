import { Server, Socket } from 'socket.io'
import Message from '../models/Message'
import Post from '../models/Post'
import Comment from '../models/Comment'
import jwt from 'jsonwebtoken'
import User from '../models/User'

interface AuthSocket extends Socket {
  userId?: string
}

// Store active users
const activeUsers = new Map<string, string>() // userId -> socketId

export const setupSocketHandlers = (io: Server) => {
  // Authentication middleware
  io.use(async (socket: AuthSocket, next) => {
    try {
      const token = socket.handshake.auth.token
      
      if (!token) {
        console.log('Socket authentication failed: No token provided')
        return next(new Error('Authentication error: No token'))
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any
      socket.userId = decoded.userId
      
      console.log('Socket authenticated for user:', socket.userId)
      next()
    } catch (error: any) {
      console.error('Socket authentication error:', error.message)
      next(new Error('Authentication error: Invalid token'))
    }
  })

  io.on('connection', (socket: AuthSocket) => {
    console.log('User connected:', socket.userId)

    // Store active user
    if (socket.userId) {
      activeUsers.set(socket.userId, socket.id)
      
      // Join user's own room for private notifications
      socket.join(socket.userId)
      
      // Broadcast user online status
      socket.broadcast.emit('user-online', { userId: socket.userId })
    }

    // ========== CHAT HANDLERS ==========
    
    // Join chat room
    socket.on('join-chat', ({ userId }) => {
      const roomId = [socket.userId, userId].sort().join('-')
      socket.join(roomId)
      console.log(`User ${socket.userId} joined chat room: ${roomId}`)
    })

    // Send message
    socket.on('send-message', async (data) => {
      try {
        const { receiverId, content, type = 'text', sessionId } = data
        
        if (!socket.userId) return

        const message = new Message({
          sender: socket.userId,
          receiver: receiverId,
          content,
          type,
          sessionId
        })

        await message.save()
        await message.populate('sender', 'name avatar role')
        await message.populate('receiver', 'name avatar role')

        // Send to receiver
        const receiverSocketId = activeUsers.get(receiverId)
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('new-message', message)
        }

        // Confirm to sender
        socket.emit('message-sent', message)
      } catch (error) {
        console.error('Send message error:', error)
        socket.emit('message-error', { error: 'Failed to send message' })
      }
    })

    // Typing indicator
    socket.on('typing', ({ receiverId }) => {
      const receiverSocketId = activeUsers.get(receiverId)
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('typing', { userId: socket.userId })
        console.log(`👀 User ${socket.userId} is typing to ${receiverId}`)
      }
    })

    socket.on('stop-typing', ({ receiverId }) => {
      const receiverSocketId = activeUsers.get(receiverId)
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('stop-typing', { userId: socket.userId })
      }
    })

    // Mark message as read
    socket.on('mark-read', async ({ messageId }) => {
      try {
        const message = await Message.findById(messageId)
        if (message && message.receiver.toString() === socket.userId) {
          message.isRead = true
          message.readAt = new Date()
          await message.save()

          // Notify sender
          const senderSocketId = activeUsers.get(message.sender.toString())
          if (senderSocketId) {
            io.to(senderSocketId).emit('message-read', {
              messageId: message._id,
              readAt: message.readAt
            })
          }
        }
      } catch (error) {
        console.error('Mark read error:', error)
      }
    })

    // ========== COMMUNITY HANDLERS ==========

    // Join community room
    socket.on('join-community', () => {
      socket.join('community')
      console.log(`User ${socket.userId} joined community`)
    })

    // Create post
    socket.on('create-post', async (data) => {
      try {
        if (!socket.userId) return

        const { content, category, tags } = data
        
        const post = new Post({
          author: socket.userId,
          content,
          category,
          tags: tags || []
        })

        await post.save()
        await post.populate('author', 'name email role avatar')

        // Broadcast to community
        io.to('community').emit('new-post', {
          ...post.toObject(),
          likes: 0,
          comments: 0
        })
      } catch (error) {
        console.error('Create post error:', error)
        socket.emit('post-error', { error: 'Failed to create post' })
      }
    })

    // Like post (real-time)
    socket.on('like-post', async ({ postId }) => {
      try {
        if (!socket.userId) return

        const post = await Post.findById(postId)
        if (!post) return

        const likeIndex = post.likes.findIndex(
          id => id.toString() === socket.userId
        )

        if (likeIndex > -1) {
          post.likes.splice(likeIndex, 1)
        } else {
          post.likes.push(socket.userId as any)
        }

        await post.save()

        // Broadcast like update
        io.to('community').emit('post-liked', {
          postId: post._id,
          likes: post.likes.length,
          userId: socket.userId
        })
      } catch (error) {
        console.error('Like post error:', error)
      }
    })

    // Add comment (real-time)
    socket.on('add-comment', async (data) => {
      try {
        if (!socket.userId) return

        const { postId, content } = data
        
        const comment = new Comment({
          post: postId,
          author: socket.userId,
          content
        })

        await comment.save()
        await comment.populate('author', 'name email role avatar')

        // Update post
        await Post.findByIdAndUpdate(postId, {
          $push: { comments: comment._id }
        })

        // Broadcast new comment
        io.to('community').emit('new-comment', {
          postId,
          comment: comment.toObject()
        })
      } catch (error) {
        console.error('Add comment error:', error)
        socket.emit('comment-error', { error: 'Failed to add comment' })
      }
    })

    // ========== MENTORSHIP HANDLERS ==========

    // Join session room
    socket.on('join-session', ({ sessionId }) => {
      socket.join(`session-${sessionId}`)
      console.log(`User ${socket.userId} joined session: ${sessionId}`)
      
      // Notify others in session
      socket.to(`session-${sessionId}`).emit('user-joined-session', {
        userId: socket.userId
      })
    })

    // Leave session room
    socket.on('leave-session', ({ sessionId }) => {
      socket.leave(`session-${sessionId}`)
      socket.to(`session-${sessionId}`).emit('user-left-session', {
        userId: socket.userId
      })
    })

    // Session message (for video call chat)
    socket.on('session-message', ({ sessionId, message }) => {
      socket.to(`session-${sessionId}`).emit('session-message', {
        userId: socket.userId,
        message,
        timestamp: new Date()
      })
    })

    // Video call signals (WebRTC)
    socket.on('video-offer', ({ sessionId, offer }) => {
      socket.to(`session-${sessionId}`).emit('video-offer', {
        userId: socket.userId,
        offer
      })
    })

    socket.on('video-answer', ({ sessionId, answer }) => {
      socket.to(`session-${sessionId}`).emit('video-answer', {
        userId: socket.userId,
        answer
      })
    })

    socket.on('ice-candidate', ({ sessionId, candidate }) => {
      socket.to(`session-${sessionId}`).emit('ice-candidate', {
        userId: socket.userId,
        candidate
      })
    })

    // ========== NOTIFICATION HANDLERS ==========

    // Send notification to specific user
    socket.on('send-notification', ({ userId, notification }) => {
      const userSocketId = activeUsers.get(userId)
      if (userSocketId) {
        io.to(userSocketId).emit('notification', notification)
      }
    })

    // ========== PROGRESS TRACKING ==========

    // Update progress
    socket.on('update-progress', async ({ moduleId, progress }) => {
      try {
        if (!socket.userId) return

        // Update user's module progress
        // This would typically update the user's progress in the database
        
        // Broadcast progress update to mentors/institution
        socket.broadcast.emit('student-progress-update', {
          userId: socket.userId,
          moduleId,
          progress
        })
      } catch (error) {
        console.error('Update progress error:', error)
      }
    })

    // ========== DISCONNECT ==========

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.userId)
      
      if (socket.userId) {
        activeUsers.delete(socket.userId)
        
        // Broadcast user offline status
        socket.broadcast.emit('user-offline', { userId: socket.userId })
      }
    })
  })

  return io
}

export { activeUsers }

