import express from 'express'
import SwotAnalysis from '../models/SwotAnalysis'
import { AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get all SWOT analyses for current user
router.get('/', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const analyses = await SwotAnalysis.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })

    res.json({ analyses })
  } catch (error) {
    console.error('Get SWOT analyses error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single SWOT analysis
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const analysis = await SwotAnalysis.findOne({
      _id: req.params.id,
      userId: req.user._id
    })

    if (!analysis) {
      return res.status(404).json({ message: 'SWOT analysis not found' })
    }

    res.json({ analysis })
  } catch (error) {
    console.error('Get SWOT analysis error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create new SWOT analysis
router.post('/', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const analysis = new SwotAnalysis({
      ...req.body,
      userId: req.user._id
    })

    await analysis.save()
    res.status(201).json({ analysis })
  } catch (error) {
    console.error('Create SWOT analysis error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update SWOT analysis
router.put('/:id', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const analysis = await SwotAnalysis.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    )

    if (!analysis) {
      return res.status(404).json({ message: 'SWOT analysis not found' })
    }

    res.json({ analysis })
  } catch (error) {
    console.error('Update SWOT analysis error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete SWOT analysis
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const analysis = await SwotAnalysis.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    })

    if (!analysis) {
      return res.status(404).json({ message: 'SWOT analysis not found' })
    }

    res.json({ message: 'SWOT analysis deleted successfully' })
  } catch (error) {
    console.error('Delete SWOT analysis error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Generate AI suggestions for SWOT
router.post('/:id/ai-suggestions', async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const analysis = await SwotAnalysis.findOne({
      _id: req.params.id,
      userId: req.user._id
    })

    if (!analysis) {
      return res.status(404).json({ message: 'SWOT analysis not found' })
    }

    // TODO: Integrate with actual AI service (GPT-4, etc.)
    // For now, returning mock suggestions
    const aiSuggestions = {
      strengths: [
        'Strong technical skills and domain expertise',
        'Innovative approach to solving the problem',
        'Passionate and committed team'
      ],
      weaknesses: [
        'Limited initial funding',
        'Need to build brand awareness',
        'Competition from established players'
      ],
      opportunities: [
        'Growing market demand',
        'Potential partnerships with industry leaders',
        'Government grants and startup programs'
      ],
      threats: [
        'Market saturation',
        'Regulatory changes',
        'Economic downturn affecting funding'
      ]
    }

    analysis.aiSuggestions = aiSuggestions
    await analysis.save()

    res.json({ analysis })
  } catch (error) {
    console.error('Generate AI suggestions error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router

