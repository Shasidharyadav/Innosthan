import express from 'express'
import Message from '../models/Message'
import User from '../models/User'
import { AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get conversations list (unique users you've chatted with)
router.get('/conversations', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: req.user._id },
            { receiver: req.user._id }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', req.user._id] },
              '$receiver',
              '$sender'
            ]
          },
          lastMessage: { $first: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$receiver', req.user._id] },
                    { $eq: ['$isRead', false] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      }
    ])

    // Populate user details
    const populatedConversations = await User.populate(messages, {
      path: '_id',
      select: 'name email avatar role'
    })

    // Transform to cleaner structure
    const conversations = populatedConversations.map((conv: any) => ({
      _id: conv._id._id,
      name: conv._id.name,
      email: conv._id.email,
      avatar: conv._id.avatar,
      role: conv._id.role,
      lastMessage: {
        content: conv.lastMessage.content,
        createdAt: conv.lastMessage.createdAt,
        sender: conv.lastMessage.sender,
        isRead: conv.lastMessage.isRead
      },
      unreadCount: conv.unreadCount
    }))

    console.log('✅ Found', conversations.length, 'conversations')
    res.json({ conversations })
  } catch (error) {
    console.error('Get conversations error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get messages with a specific user
router.get('/with/:userId', async (req: AuthRequest, res) => {
  try {
    console.log('📥 GET /api/messages/with/:userId - User:', req.user?._id, 'Recipient:', req.params.userId)
    
    if (!req.user) {
      console.log('❌ Authentication required')
      return res.status(401).json({ message: 'Authentication required' })
    }

    const { limit = 50, before } = req.query
    
    const query: any = {
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id }
      ]
    }

    if (before) {
      query.createdAt = { $lt: new Date(before as string) }
    }

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .populate('sender', 'name avatar')
      .populate('receiver', 'name avatar')

    // Mark messages as read
    await Message.updateMany(
      {
        sender: req.params.userId,
        receiver: req.user._id,
        isRead: false
      },
      {
        isRead: true,
        readAt: new Date()
      }
    )

    console.log('✅ Found', messages.length, 'messages')
    res.json({ messages: messages.reverse() })
  } catch (error) {
    console.error('❌ Get messages error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Send message (also handled via Socket.io)
router.post('/send', async (req: AuthRequest, res) => {
  try {
    console.log('📤 POST /api/messages/send - From:', req.user?._id, 'To:', req.body.receiverId)
    
    if (!req.user) {
      console.log('❌ Authentication required')
      return res.status(401).json({ message: 'Authentication required' })
    }

    const { receiverId, content, type = 'text', sessionId } = req.body

    if (!receiverId || !content) {
      console.log('❌ Receiver and content are required')
      return res.status(400).json({ message: 'Receiver and content are required' })
    }

    // Verify receiver exists
    const receiver = await User.findById(receiverId)
    if (!receiver) {
      console.log('❌ Receiver not found:', receiverId)
      return res.status(404).json({ message: 'Receiver not found' })
    }

    const message = new Message({
      sender: req.user._id,
      receiver: receiverId,
      content,
      type,
      sessionId
    })

    await message.save()
    await message.populate('sender', 'name avatar role')
    await message.populate('receiver', 'name avatar role')

    console.log('✅ Message saved:', message._id)

    // Emit via Socket.io to both sender and receiver
    const io = req.app.get('io')
    // Emit to all connected clients (they'll filter by sender/receiver)
    io.emit('new-message', message)

    res.status(201).json({ message })
  } catch (error) {
    console.error('❌ Send message error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Mark message as read
router.put('/:id/read', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const message = await Message.findById(req.params.id)
    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    const userId = req.user._id as any
    if (message.receiver.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    message.isRead = true
    message.readAt = new Date()
    await message.save()

    // Emit via Socket.io
    const io = req.app.get('io')
    io.to(message.sender.toString()).emit('message-read', {
      messageId: message._id,
      readAt: message.readAt
    })

    res.json({ message })
  } catch (error) {
    console.error('Mark message read error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get unread count
router.get('/unread/count', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const count = await Message.countDocuments({
      receiver: req.user._id,
      isRead: false
    })

    res.json({ count })
  } catch (error) {
    console.error('Get unread count error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete message
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const message = await Message.findById(req.params.id)
    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    const userId = req.user._id as any
    if (message.sender.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    await message.deleteOne()

    res.json({ message: 'Message deleted' })
  } catch (error) {
    console.error('Delete message error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router

