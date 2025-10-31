import express from 'express'
import User from '../models/User'
import { AuthRequest } from '../middleware/auth'
import { requireRole } from '../middleware/auth'

const router = express.Router()

// Get all mentors
router.get('/list', async (req: AuthRequest, res) => {
  try {
    const mentors = await User.find({ role: 'mentor', isVerified: true })
      .select('name email avatar xp level badges createdAt')
      .sort({ xp: -1 })

    res.json({ mentors })
  } catch (error) {
    console.error('Get mentors error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// AI Chat endpoint
router.post('/chat', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const { message, context } = req.body

    // TODO: Integrate with OpenAI API
    // For now, return a mock response
    const response = {
      message: "I'm your AI mentor! I'm here to help you with your entrepreneurial journey. How can I assist you today?",
      suggestions: [
        "Help me understand the problem-solution fit",
        "Review my business model canvas",
        "Guide me through customer validation",
        "Help me prepare for my pitch"
      ]
    }

    res.json(response)
  } catch (error) {
    console.error('AI chat error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get mentor sessions
router.get('/sessions', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    // TODO: Implement mentor sessions with proper Session model
    // For now, return empty array
    const sessions: any[] = []
    res.json({ sessions })
  } catch (error) {
    console.error('Get sessions error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create mentor session
router.post('/sessions', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    // TODO: Implement create mentor session with proper Session model
    res.status(201).json({ message: 'Session created successfully' })
  } catch (error) {
    console.error('Create session error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
