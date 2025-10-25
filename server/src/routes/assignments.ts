import express from 'express'
import Assignment from '../models/Assignment'
import { AuthRequest } from '../middleware/auth'
import { requireRole } from '../middleware/auth'

const router = express.Router()

// Get assignments for current user
router.get('/my', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const assignments = await Assignment.find({ studentId: req.user!._id })
      .populate('moduleId', 'title moduleNumber')
      .sort({ createdAt: -1 })

    res.json({ assignments })
  } catch (error) {
    console.error('Get assignments error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get all assignments (mentor/admin only)
router.get('/', requireRole(['mentor', 'admin']), async (req: AuthRequest, res) => {
  try {
    const { status, moduleId, page = 1, limit = 10 } = req.query
    
    const query: any = {}
    if (status) query.status = status
    if (moduleId) query.moduleId = moduleId

    const assignments = await Assignment.find(query)
      .populate('studentId', 'name email')
      .populate('moduleId', 'title moduleNumber')
      .populate('mentorId', 'name email')
      .sort({ submittedAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))

    const total = await Assignment.countDocuments(query)

    res.json({
      assignments,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total
    })
  } catch (error) {
    console.error('Get assignments error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get assignment by ID
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('studentId', 'name email')
      .populate('moduleId', 'title moduleNumber')
      .populate('mentorId', 'name email')

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' })
    }

    // Check if user has access to this assignment
    if (req.user!.role !== 'admin' && 
        req.user!.role !== 'mentor' && 
        (assignment.studentId as any)._id.toString() !== (req.user!._id as any).toString()) {
      return res.status(403).json({ message: 'Access denied' })
    }

    res.json({ assignment })
  } catch (error) {
    console.error('Get assignment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create assignment
router.post('/', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const assignment = new Assignment({
      ...req.body,
      studentId: req.user!._id
    })

    await assignment.save()

    res.status(201).json({ assignment })
  } catch (error) {
    console.error('Create assignment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update assignment
router.put('/:id', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const assignment = await Assignment.findById(req.params.id)
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' })
    }

    // Check if user can update this assignment
    if (req.user!.role !== 'admin' && 
        req.user!.role !== 'mentor' && 
        (assignment.studentId as any).toString() !== (req.user!._id as any).toString()) {
      return res.status(403).json({ message: 'Access denied' })
    }

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('studentId', 'name email')
     .populate('moduleId', 'title moduleNumber')
     .populate('mentorId', 'name email')

    res.json({ assignment: updatedAssignment })
  } catch (error) {
    console.error('Update assignment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Submit assignment
router.post('/:id/submit', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const assignment = await Assignment.findById(req.params.id)
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' })
    }

    if ((assignment.studentId as any).toString() !== (req.user!._id as any).toString()) {
      return res.status(403).json({ message: 'Access denied' })
    }

    assignment.status = 'submitted'
    assignment.submittedAt = new Date()
    await assignment.save()

    res.json({ assignment })
  } catch (error) {
    console.error('Submit assignment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Review assignment (mentor/admin only)
router.post('/:id/review', requireRole(['mentor', 'admin']), async (req: AuthRequest, res) => {
  try {
    const { grade, feedback, status } = req.body

    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      {
        grade,
        feedback,
        status: status || 'reviewed',
        mentorId: req.user?._id,
        reviewedAt: new Date()
      },
      { new: true }
    ).populate('studentId', 'name email')
     .populate('moduleId', 'title moduleNumber')
     .populate('mentorId', 'name email')

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' })
    }

    res.json({ assignment })
  } catch (error) {
    console.error('Review assignment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
