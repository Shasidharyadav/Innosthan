import express from 'express'
import User from '../models/User'
import { AuthRequest } from '../middleware/auth'
import { requireRole } from '../middleware/auth'

const router = express.Router()

// Get all users (admin only)
router.get('/', requireRole(['admin']), async (req: AuthRequest, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query
    
    const query: any = {}
    if (role) query.role = role
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))

    const total = await User.countDocuments(query)

    res.json({
      users,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get user by ID
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ user })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update user (admin only)
router.put('/:id', requireRole(['admin']), async (req: AuthRequest, res) => {
  try {
    const { name, email, role, xp, level, isVerified } = req.body
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, xp, level, isVerified },
      { new: true, runValidators: true }
    ).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ user })
  } catch (error) {
    console.error('Update user error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete user (admin only)
router.delete('/:id', requireRole(['admin']), async (req: AuthRequest, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get leaderboard
router.get('/leaderboard/top', async (req: AuthRequest, res) => {
  try {
    const { limit = 10 } = req.query
    
    const users = await User.find({ role: 'student' })
      .select('name email xp level badges')
      .sort({ xp: -1 })
      .limit(Number(limit))

    res.json({ users })
  } catch (error) {
    console.error('Get leaderboard error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
