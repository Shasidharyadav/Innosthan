import express from 'express'
import Module from '../models/Module'
import { AuthRequest } from '../middleware/auth'
import { requireRole } from '../middleware/auth'

const router = express.Router()

// Get all modules
router.get('/', async (req: AuthRequest, res) => {
  try {
    const modules = await Module.find()
      .sort({ order: 1 })
      .populate('prerequisites', 'title moduleNumber')

    res.json({ modules })
  } catch (error) {
    console.error('Get modules error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get module by ID
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const module = await Module.findById(req.params.id)
    if (!module) {
      return res.status(404).json({ message: 'Module not found' })
    }

    res.json({ module })
  } catch (error) {
    console.error('Get module error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create module (admin and mentor can create)
router.post('/', requireRole(['admin', 'mentor']), async (req: AuthRequest, res) => {
  try {
    const moduleData = {
      ...req.body,
      createdBy: req.user?._id // Track who created the module
    }
    const module = new Module(moduleData)
    await module.save()

    res.status(201).json({ module })
  } catch (error) {
    console.error('Create module error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update module (admin and mentor who created it can update)
router.put('/:id', requireRole(['admin', 'mentor']), async (req: AuthRequest, res) => {
  try {
    const module = await Module.findById(req.params.id)
    if (!module) {
      return res.status(404).json({ message: 'Module not found' })
    }

    // Check if mentor can update (only if they created it or if admin)
    const userId = req.user?._id as any
    if (req.user?.role === 'mentor' && (module as any).createdBy?.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You can only update your own modules' })
    }

    const updatedModule = await Module.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    res.json({ module: updatedModule })
  } catch (error) {
    console.error('Update module error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete module (admin only)
router.delete('/:id', requireRole(['admin']), async (req: AuthRequest, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id)
    if (!module) {
      return res.status(404).json({ message: 'Module not found' })
    }

    res.json({ message: 'Module deleted successfully' })
  } catch (error) {
    console.error('Delete module error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Unlock module (admin only)
router.post('/:id/unlock', requireRole(['admin']), async (req: AuthRequest, res) => {
  try {
    const module = await Module.findByIdAndUpdate(
      req.params.id,
      { isUnlocked: true },
      { new: true }
    )

    if (!module) {
      return res.status(404).json({ message: 'Module not found' })
    }

    res.json({ module })
  } catch (error) {
    console.error('Unlock module error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
