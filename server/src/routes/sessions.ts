import express from 'express'
import Session from '../models/Session'
import User from '../models/User'
import { AuthRequest } from '../middleware/auth'
import { requireRole } from '../middleware/auth'

const router = express.Router()

// Get all sessions for current user
router.get('/', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    const { status, upcoming } = req.query
    
    const query: any = {
      $or: [
        { mentor: req.user._id },
        { student: req.user._id }
      ]
    }
    
    if (status) {
      query.status = status
    }
    
    if (upcoming === 'true') {
      query.scheduledAt = { $gte: new Date() }
      query.status = { $in: ['scheduled', 'confirmed'] }
    }
    
    const sessions = await Session.find(query)
      .populate('mentor', 'name email avatar')
      .populate('student', 'name email avatar')
      .sort({ scheduledAt: 1 })
    
    res.json({ sessions })
  } catch (error) {
    console.error('Get sessions error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create new session
router.post('/', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    const { mentorId, topic, type, scheduledAt, duration, notes } = req.body
    
    if (!mentorId || !topic || !scheduledAt) {
      return res.status(400).json({ message: 'Mentor, topic, and schedule time are required' })
    }
    
    // Verify mentor exists and has mentor role
    const mentor = await User.findById(mentorId)
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(400).json({ message: 'Invalid mentor' })
    }
    
    const session = new Session({
      mentor: mentorId,
      student: req.user._id,
      topic,
      type: type || 'video',
      scheduledAt,
      duration: duration || 60,
      notes
    })
    
    await session.save()
    await session.populate('mentor', 'name email avatar')
    await session.populate('student', 'name email avatar')
    
    // Emit real-time event
    const io = req.app.get('io')
    io.emit('session-created', session)
    
    res.status(201).json({ session })
  } catch (error) {
    console.error('Create session error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update session status
router.put('/:id/status', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    const { status } = req.body
    
    if (!['confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }
    
    const session = await Session.findById(req.params.id)
    if (!session) {
      return res.status(404).json({ message: 'Session not found' })
    }
    
    // Check authorization
    const userId = req.user._id as any
    if (
      session.mentor.toString() !== userId.toString() &&
      session.student.toString() !== userId.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    session.status = status
    await session.save()
    
    // Emit real-time event
    const io = req.app.get('io')
    io.emit('session-updated', session)
    
    res.json({ session })
  } catch (error) {
    console.error('Update session status error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Add feedback to session
router.put('/:id/feedback', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    const { rating, comment } = req.body
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Valid rating (1-5) is required' })
    }
    
    const session = await Session.findById(req.params.id)
    if (!session) {
      return res.status(404).json({ message: 'Session not found' })
    }
    
    // Only student can add feedback
    const userId = req.user._id as any
    if (session.student.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Only the student can add feedback' })
    }
    
    // Session must be completed
    if (session.status !== 'completed') {
      return res.status(400).json({ message: 'Can only add feedback to completed sessions' })
    }
    
    session.feedback = { rating, comment }
    await session.save()
    
    res.json({ session })
  } catch (error) {
    console.error('Add feedback error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get mentor's students
router.get('/mentor/students', requireRole(['mentor', 'admin']), async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    // Get unique students from sessions
    const sessions = await Session.find({ mentor: req.user._id })
      .populate('student', 'name email avatar xp level')
      .distinct('student')
    
    res.json({ students: sessions })
  } catch (error) {
    console.error('Get mentor students error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get pending reviews for mentor
router.get('/mentor/pending-reviews', requireRole(['mentor', 'admin']), async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    // This would typically fetch from Assignment model
    // For now, return empty array
    res.json({ reviews: [] })
  } catch (error) {
    console.error('Get pending reviews error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get mentor analytics
router.get('/mentor/analytics', requireRole(['mentor', 'admin']), async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    const [
      totalSessions,
      completedSessions,
      upcomingSessions,
      students
    ] = await Promise.all([
      Session.countDocuments({ mentor: req.user._id }),
      Session.countDocuments({ mentor: req.user._id, status: 'completed' }),
      Session.countDocuments({ 
        mentor: req.user._id, 
        status: { $in: ['scheduled', 'confirmed'] },
        scheduledAt: { $gte: new Date() }
      }),
      Session.find({ mentor: req.user._id }).distinct('student')
    ])
    
    // Calculate average rating from feedback
    const sessionsWithFeedback = await Session.find({
      mentor: req.user._id,
      'feedback.rating': { $exists: true }
    })
    
    const averageRating = sessionsWithFeedback.length > 0
      ? sessionsWithFeedback.reduce((sum, s) => sum + (s.feedback?.rating || 0), 0) / sessionsWithFeedback.length
      : 0
    
    res.json({
      totalSessions,
      completedSessions,
      upcomingSessions,
      activeStudents: students.length,
      averageRating: averageRating.toFixed(1),
      totalReviews: sessionsWithFeedback.length
    })
  } catch (error) {
    console.error('Get mentor analytics error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router

