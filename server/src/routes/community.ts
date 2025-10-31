import express from 'express'
import Post from '../models/Post'
import Comment from '../models/Comment'
import { AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get all posts
router.get('/posts', async (req: AuthRequest, res) => {
  try {
    const { category, search, limit = 20, page = 1 } = req.query
    
    const query: any = {}
    if (category && category !== 'all') {
      query.category = category
    }
    
    if (search) {
      query.$or = [
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ]
    }
    
    const posts = await Post.find(query)
      .populate('author', 'name email role')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .lean()
    
    // Add counts
    const postsWithCounts = posts.map(post => ({
      ...post,
      likes: post.likes.length,
      comments: post.comments.length
    }))
    
    const total = await Post.countDocuments(query)
    
    res.json({
      posts: postsWithCounts,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit))
    })
  } catch (error) {
    console.error('Get posts error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create post
router.post('/posts', async (req: AuthRequest, res) => {
  try {
    console.log('📝 POST /api/community/posts - User:', req.user?._id, 'Category:', req.body.category)
    
    if (!req.user) {
      console.log('❌ Authentication required')
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    const { content, category, tags } = req.body
    
    if (!content || !category) {
      console.log('❌ Content and category are required')
      return res.status(400).json({ message: 'Content and category are required' })
    }
    
    const post = new Post({
      author: req.user._id,
      content,
      category,
      tags: tags || []
    })
    
    await post.save()
    await post.populate('author', 'name email role avatar')
    
    console.log('✅ Post created:', post._id)
    
    // Emit real-time event
    const io = req.app.get('io')
    const postObject = post.toObject()
    io.emit('new-post', postObject)
    
    res.status(201).json({ post: postObject })
  } catch (error) {
    console.error('❌ Create post error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Like/Unlike post
router.put('/posts/:id/like', async (req: AuthRequest, res) => {
  try {
    console.log('❤️ PUT /api/community/posts/:id/like - User:', req.user?._id, 'Post:', req.params.id)
    
    if (!req.user) {
      console.log('❌ Authentication required')
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    const post = await Post.findById(req.params.id)
    if (!post) {
      console.log('❌ Post not found:', req.params.id)
      return res.status(404).json({ message: 'Post not found' })
    }
    
    const userId = req.user._id as any
    const likeIndex = post.likes.findIndex(id => id.toString() === userId.toString())
    
    let action = ''
    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1)
      action = 'unliked'
    } else {
      // Like
      post.likes.push(userId)
      action = 'liked'
    }
    
    await post.save()
    
    console.log(`✅ Post ${action} - Total likes:`, post.likes.length)
    
    // Emit real-time event
    const io = req.app.get('io')
    io.emit('post-liked', {
      postId: post._id,
      likes: post.likes
    })
    
    res.json({ post: { likes: post.likes } })
  } catch (error) {
    console.error('❌ Like post error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get comments for a post
router.get('/posts/:id/comments', async (req: AuthRequest, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .populate('author', 'name email role')
      .sort({ createdAt: -1 })
      .lean()
    
    res.json({ comments })
  } catch (error) {
    console.error('Get comments error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Add comment to post
router.post('/posts/:id/comments', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    const { content } = req.body
    
    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' })
    }
    
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    
    const comment = new Comment({
      post: req.params.id,
      author: req.user._id,
      content
    })
    
    await comment.save()
    await comment.populate('author', 'name email role')
    
    // Add comment to post
    post.comments.push(comment._id as any)
    await post.save()
    
    // Emit real-time event
    const io = req.app.get('io')
    io.emit('new-comment', {
      postId: post._id,
      comment: comment.toObject()
    })
    
    res.status(201).json({ comment })
  } catch (error) {
    console.error('Add comment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete post (author only)
router.delete('/posts/:id', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    
    // Check if user is author or admin
    const userId = req.user._id as any
    if (post.author.toString() !== userId.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this post' })
    }
    
    // Delete associated comments
    await Comment.deleteMany({ post: req.params.id })
    
    await post.deleteOne()
    
    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Delete post error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router

