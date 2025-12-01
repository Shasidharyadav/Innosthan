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

// Save version of current analysis
router.post('/:id/versions', async (req: AuthRequest, res) => {
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

    const versionNumber = (analysis.versions?.length || 0) + 1
    const snapshot = {
      ideaTitle: analysis.ideaTitle,
      description: analysis.description,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      opportunities: analysis.opportunities,
      threats: analysis.threats,
      tags: analysis.tags,
      insights: analysis.insights
    }

    // Ensure versions is available and use a type-safe push via `any` to avoid Mongoose DocumentArray assignment issues
    const av = (analysis as any).versions || []
    av.push({
      versionNumber,
      snapshot,
      changedAt: new Date(),
      changeDescription: req.body.changeDescription || `Version ${versionNumber}`
    })
    ;(analysis as any).versions = av

    await analysis.save()
    res.json({ analysis, message: `Version ${versionNumber} saved` })
  } catch (error) {
    console.error('Save version error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get all versions of an analysis
router.get('/:id/versions', async (req: AuthRequest, res) => {
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

    res.json({ versions: analysis.versions || [] })
  } catch (error) {
    console.error('Get versions error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Restore from a specific version
router.post('/:id/versions/:versionNumber/restore', async (req: AuthRequest, res) => {
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

    const version = analysis.versions?.find(v => v.versionNumber === parseInt(req.params.versionNumber))
    if (!version) {
      return res.status(404).json({ message: 'Version not found' })
    }

    const snapshot = version.snapshot as any
    analysis.ideaTitle = snapshot.ideaTitle
    analysis.description = snapshot.description
    analysis.strengths = snapshot.strengths
    analysis.weaknesses = snapshot.weaknesses
    analysis.opportunities = snapshot.opportunities
    analysis.threats = snapshot.threats
    analysis.tags = snapshot.tags

    await analysis.save()
    res.json({ analysis, message: `Restored from version ${req.params.versionNumber}` })
  } catch (error) {
    console.error('Restore version error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Generate insights
router.post('/:id/generate-insights', async (req: AuthRequest, res) => {
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

    const insights: any[] = []

    // High-impact weaknesses that need mitigation
    const highWeaknesses = analysis.weaknesses.filter(w => w.impact === 'high')
    if (highWeaknesses.length > 0) {
      insights.push({
        type: 'critical',
        title: 'Critical Weaknesses to Address',
        description: `You have ${highWeaknesses.length} high-impact weaknesses. Prioritize creating mitigation strategies.`,
        priority: 1,
        category: 'weakness'
      })
    }

    // Strengths-Opportunities alignment
    const highOpportunities = analysis.opportunities.filter(o => o.timeframe === 'short_term')
    const highStrengths = analysis.strengths.filter(s => s.impact === 'high')
    if (highStrengths.length > 0 && highOpportunities.length > 0) {
      insights.push({
        type: 'opportunity',
        title: 'Leverage Strengths for Quick Wins',
        description: `You have ${highStrengths.length} strong strengths and ${highOpportunities.length} short-term opportunities. Consider combining them.`,
        priority: 2,
        category: 'opportunity'
      })
    }

    // Threats that need monitoring
    const highThreats = analysis.threats.filter(t => t.likelihood === 'high')
    if (highThreats.length > 0) {
      insights.push({
        type: 'warning',
        title: 'High-Likelihood Threats Detected',
        description: `${highThreats.length} threats have high likelihood. Review mitigation plans regularly.`,
        priority: 2,
        category: 'threat'
      })
    }

    // Imbalance detection
    const avgStrengths = analysis.strengths.reduce((sum, s) => sum + (s.priority || 5), 0) / (analysis.strengths.length || 1)
    const avgWeaknesses = analysis.weaknesses.reduce((sum, w) => sum + (w.priority || 5), 0) / (analysis.weaknesses.length || 1)
    if (avgWeaknesses > avgStrengths + 2) {
      insights.push({
        type: 'warning',
        title: 'Imbalanced SWOT Profile',
        description: 'Your weaknesses appear to outweigh your strengths. Consider focusing on strength-building initiatives.',
        priority: 3,
        category: 'balance'
      })
    }

    // No data for a quadrant
    if (analysis.threats.length === 0) {
      insights.push({
        type: 'info',
        title: 'Threats Section Empty',
        description: 'Consider adding potential threats to ensure comprehensive analysis.',
        priority: 4,
        category: 'completeness'
      })
    }

    analysis.insights = insights
    await analysis.save()
    res.json({ analysis, insights })
  } catch (error) {
    console.error('Generate insights error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router

