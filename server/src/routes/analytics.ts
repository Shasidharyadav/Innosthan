import express from 'express'
import User from '../models/User'
import Assignment from '../models/Assignment'
import Module from '../models/Module'
import { AuthRequest } from '../middleware/auth'
import { requireRole } from '../middleware/auth'

const router = express.Router()

// Get platform analytics (admin only)
router.get('/platform', requireRole(['admin']), async (req: AuthRequest, res) => {
  try {
    const [
      totalUsers,
      totalStudents,
      totalMentors,
      totalAssignments,
      completedAssignments,
      totalModules
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'mentor' }),
      Assignment.countDocuments(),
      Assignment.countDocuments({ status: 'approved' }),
      Module.countDocuments()
    ])

    const completionRate = totalAssignments > 0 
      ? Math.round((completedAssignments / totalAssignments) * 100) 
      : 0

    res.json({
      totalUsers,
      totalStudents,
      totalMentors,
      totalAssignments,
      completedAssignments,
      totalModules,
      completionRate
    })
  } catch (error) {
    console.error('Get platform analytics error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get user analytics
router.get('/user', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const userAssignments = await Assignment.find({ studentId: req.user._id })
    const completedAssignments = userAssignments.filter(a => a.status === 'approved')
    const pendingAssignments = userAssignments.filter(a => a.status === 'submitted')

    res.json({
      totalAssignments: userAssignments.length,
      completedAssignments: completedAssignments.length,
      pendingAssignments: pendingAssignments.length,
      xp: req.user.xp,
      level: req.user.level,
      badges: req.user.badges.length
    })
  } catch (error) {
    console.error('Get user analytics error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get module analytics
router.get('/modules', requireRole(['admin']), async (req: AuthRequest, res) => {
  try {
    const modules = await Module.find().sort({ order: 1 })
    
    const moduleStats = await Promise.all(
      modules.map(async (module) => {
        const assignments = await Assignment.find({ moduleId: module._id })
        const completed = assignments.filter(a => a.status === 'approved')
        
        return {
          moduleId: module._id,
          title: module.title,
          totalAssignments: assignments.length,
          completedAssignments: completed.length,
          completionRate: assignments.length > 0 
            ? Math.round((completed.length / assignments.length) * 100) 
            : 0
        }
      })
    )

    res.json({ moduleStats })
  } catch (error) {
    console.error('Get module analytics error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
