import express from 'express'
import Cohort from '../models/Cohort'
import User from '../models/User'
import { AuthRequest } from '../middleware/auth'
import { requireRole } from '../middleware/auth'

const router = express.Router()

// Get all cohorts (filtered by institution if user is institution)
router.get('/', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    const query: any = {}
    
    // If user is institution, only show their cohorts
    if (req.user.role === 'institution') {
      query.institution = req.user._id
    }
    
    const cohorts = await Cohort.find(query)
      .populate('institution', 'name institution')
      .populate('students', 'name email xp level')
      .sort({ startDate: -1 })
    
    res.json({ cohorts })
  } catch (error) {
    console.error('Get cohorts error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get cohort by ID
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const cohort = await Cohort.findById(req.params.id)
      .populate('institution', 'name institution')
      .populate('students', 'name email xp level badges')
    
    if (!cohort) {
      return res.status(404).json({ message: 'Cohort not found' })
    }
    
    res.json({ cohort })
  } catch (error) {
    console.error('Get cohort error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create cohort (institution or admin only)
router.post('/', requireRole(['institution', 'admin']), async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    const { name, startDate, endDate, description, studentIds } = req.body
    
    if (!name || !startDate || !endDate) {
      return res.status(400).json({ message: 'Name, start date, and end date are required' })
    }
    
    // Verify all students exist
    if (studentIds && studentIds.length > 0) {
      const students = await User.find({
        _id: { $in: studentIds },
        role: 'student'
      })
      
      if (students.length !== studentIds.length) {
        return res.status(400).json({ message: 'Some student IDs are invalid' })
      }
    }
    
    const cohort = new Cohort({
      name,
      institution: req.user.role === 'institution' ? req.user._id : req.body.institutionId,
      students: studentIds || [],
      startDate,
      endDate,
      description
    })
    
    await cohort.save()
    await cohort.populate(['institution', 'students'])
    
    res.status(201).json({ cohort })
  } catch (error) {
    console.error('Create cohort error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update cohort
router.put('/:id', requireRole(['institution', 'admin']), async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    const cohort = await Cohort.findById(req.params.id)
    if (!cohort) {
      return res.status(404).json({ message: 'Cohort not found' })
    }
    
    // Check authorization
    const userId = req.user._id as any
    if (
      req.user.role === 'institution' &&
      cohort.institution.toString() !== userId.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    const { name, startDate, endDate, status, description, completionRate } = req.body
    
    if (name) cohort.name = name
    if (startDate) cohort.startDate = startDate
    if (endDate) cohort.endDate = endDate
    if (status) cohort.status = status
    if (description !== undefined) cohort.description = description
    if (completionRate !== undefined) cohort.completionRate = completionRate
    
    await cohort.save()
    await cohort.populate(['institution', 'students'])
    
    res.json({ cohort })
  } catch (error) {
    console.error('Update cohort error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Add students to cohort
router.post('/:id/students', requireRole(['institution', 'admin']), async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    const { studentIds } = req.body
    
    if (!studentIds || !Array.isArray(studentIds)) {
      return res.status(400).json({ message: 'Student IDs array is required' })
    }
    
    const cohort = await Cohort.findById(req.params.id)
    if (!cohort) {
      return res.status(404).json({ message: 'Cohort not found' })
    }
    
    // Check authorization
    const userId = req.user._id as any
    if (
      req.user.role === 'institution' &&
      cohort.institution.toString() !== userId.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    // Verify students exist
    const students = await User.find({
      _id: { $in: studentIds },
      role: 'student'
    })
    
    if (students.length !== studentIds.length) {
      return res.status(400).json({ message: 'Some student IDs are invalid' })
    }
    
    // Add students (avoiding duplicates)
    studentIds.forEach((id: string) => {
      const studentExists = cohort.students.some(sid => sid.toString() === id)
      if (!studentExists) {
        cohort.students.push(id as any)
      }
    })
    
    await cohort.save()
    await cohort.populate('students', 'name email xp level')
    
    res.json({ cohort })
  } catch (error) {
    console.error('Add students to cohort error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Remove student from cohort
router.delete('/:id/students/:studentId', requireRole(['institution', 'admin']), async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    const cohort = await Cohort.findById(req.params.id)
    if (!cohort) {
      return res.status(404).json({ message: 'Cohort not found' })
    }
    
    // Check authorization
    const userId = req.user._id as any
    if (
      req.user.role === 'institution' &&
      cohort.institution.toString() !== userId.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    cohort.students = cohort.students.filter(
      id => id.toString() !== req.params.studentId
    )
    
    await cohort.save()
    
    res.json({ message: 'Student removed from cohort', cohort })
  } catch (error) {
    console.error('Remove student from cohort error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete cohort
router.delete('/:id', requireRole(['institution', 'admin']), async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    const cohort = await Cohort.findById(req.params.id)
    if (!cohort) {
      return res.status(404).json({ message: 'Cohort not found' })
    }
    
    // Check authorization
    const userId = req.user._id as any
    if (
      req.user.role === 'institution' &&
      cohort.institution.toString() !== userId.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    
    await cohort.deleteOne()
    
    res.json({ message: 'Cohort deleted successfully' })
  } catch (error) {
    console.error('Delete cohort error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get institution analytics
router.get('/analytics/institution', requireRole(['institution', 'admin']), async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    
    const query: any = {}
    if (req.user.role === 'institution') {
      query.institution = req.user._id
    }
    
    const [
      totalCohorts,
      activeCohorts,
      completedCohorts,
      cohorts
    ] = await Promise.all([
      Cohort.countDocuments(query),
      Cohort.countDocuments({ ...query, status: 'active' }),
      Cohort.countDocuments({ ...query, status: 'completed' }),
      Cohort.find(query).populate('students')
    ])
    
    const totalStudents = cohorts.reduce((sum, cohort) => sum + cohort.students.length, 0)
    const avgCompletionRate = cohorts.length > 0
      ? cohorts.reduce((sum, cohort) => sum + cohort.completionRate, 0) / cohorts.length
      : 0
    
    res.json({
      totalCohorts,
      activeCohorts,
      completedCohorts,
      totalStudents,
      avgCompletionRate: Math.round(avgCompletionRate)
    })
  } catch (error) {
    console.error('Get institution analytics error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router

