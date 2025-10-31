import express from 'express'
import Resource from '../models/Resource'
import { AuthRequest } from '../middleware/auth'
import { requireRole } from '../middleware/auth'

const router = express.Router()

// Get all resources (with filters)
router.get('/', async (req: AuthRequest, res) => {
  try {
    const { category, level, search, moduleId } = req.query
    
    let query: any = {}
    
    if (category) query.category = category
    if (level) query.level = level
    if (moduleId) query.moduleId = moduleId
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ]
    }

    const resources = await Resource.find(query)
      .sort({ createdAt: -1 })
      .populate('moduleId', 'title moduleNumber')

    res.json({ resources })
  } catch (error) {
    console.error('Get resources error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get resource by ID
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('moduleId', 'title moduleNumber')
      
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' })
    }

    // Increment view count
    resource.views += 1
    await resource.save()

    res.json({ resource })
  } catch (error) {
    console.error('Get resource error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Track resource download
router.post('/:id/download', async (req: AuthRequest, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' })
    }

    resource.downloads += 1
    await resource.save()

    res.json({ message: 'Download tracked', resource })
  } catch (error) {
    console.error('Track download error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Rate resource
router.post('/:id/rate', async (req: AuthRequest, res) => {
  try {
    const { rating } = req.body
    
    if (rating < 0 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 0 and 5' })
    }

    const resource = await Resource.findById(req.params.id)
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' })
    }

    // Calculate new average rating
    const totalRating = (resource.rating * resource.ratingCount) + rating
    resource.ratingCount += 1
    resource.rating = totalRating / resource.ratingCount

    await resource.save()

    res.json({ resource })
  } catch (error) {
    console.error('Rate resource error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create resource (admin only)
router.post('/', requireRole(['admin']), async (req: AuthRequest, res) => {
  try {
    const resource = new Resource(req.body)
    await resource.save()

    res.status(201).json({ resource })
  } catch (error) {
    console.error('Create resource error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update resource (admin only)
router.put('/:id', requireRole(['admin']), async (req: AuthRequest, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' })
    }

    res.json({ resource })
  } catch (error) {
    console.error('Update resource error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete resource (admin only)
router.delete('/:id', requireRole(['admin']), async (req: AuthRequest, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id)
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' })
    }

    res.json({ message: 'Resource deleted successfully' })
  } catch (error) {
    console.error('Delete resource error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get resources by category with stats
router.get('/category/:category', async (req: AuthRequest, res) => {
  try {
    const { category } = req.params
    
    const resources = await Resource.find({ category })
      .sort({ rating: -1, downloads: -1 })
      .limit(20)

    const totalResources = await Resource.countDocuments({ category })
    const avgRating = await Resource.aggregate([
      { $match: { category } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ])

    res.json({
      resources,
      stats: {
        total: totalResources,
        avgRating: avgRating[0]?.avgRating || 0
      }
    })
  } catch (error) {
    console.error('Get resources by category error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router

