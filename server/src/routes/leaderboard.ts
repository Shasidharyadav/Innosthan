import express from 'express'
import User from '../models/User'
import { AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get leaderboard
router.get('/', async (req: AuthRequest, res) => {
  try {
    const { limit = 50, timeframe = 'all' } = req.query
    
    let dateFilter = {}
    if (timeframe === 'week') {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      dateFilter = { lastLogin: { $gte: weekAgo } }
    } else if (timeframe === 'month') {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      dateFilter = { lastLogin: { $gte: monthAgo } }
    }

    const users = await User.find({ 
      role: 'student',
      ...dateFilter
    })
      .select('name email xp level badges avatar')
      .sort({ xp: -1 })
      .limit(Number(limit))

    // Add rank to each user
    const leaderboard = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1
    }))

    res.json({ leaderboard })
  } catch (error) {
    console.error('Get leaderboard error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get user's rank
router.get('/my-rank', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const userXp = req.user.xp
    const rank = await User.countDocuments({ 
      role: 'student',
      xp: { $gt: userXp }
    }) + 1

    const totalStudents = await User.countDocuments({ role: 'student' })

    res.json({ 
      rank,
      totalStudents,
      xp: userXp,
      percentile: Math.round(((totalStudents - rank + 1) / totalStudents) * 100)
    })
  } catch (error) {
    console.error('Get user rank error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
