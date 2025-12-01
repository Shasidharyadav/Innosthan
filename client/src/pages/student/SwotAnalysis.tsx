import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useThemeStore } from '../../stores/themeStore'
import { useAuthStore } from '../../stores/authStore'
import axios from 'axios'
import {
  Plus,
  Trash2,
  Sparkles,
  Save,
  TrendingUp,
  AlertTriangle,
  Target,
  Shield
} from 'lucide-react'
import toast from 'react-hot-toast'
import BackButton from '../../components/BackButton'
import { saveVersion, compareSwotAnalyses } from '../../utils/swotLogic'

interface SwotItem {
  text: string
  createdAt?: Date
}

interface SwotAnalysis {
  _id?: string
  ideaTitle: string
  strengths: SwotItem[]
  weaknesses: SwotItem[]
  opportunities: SwotItem[]
  threats: SwotItem[]
  status: 'draft' | 'completed' | 'archived'
}

const SwotAnalysisPage = () => {
  const { isDarkMode } = useThemeStore()
  const { token } = useAuthStore()
  const [, setAnalyses] = useState<SwotAnalysis[]>([])
  const [currentAnalysis, setCurrentAnalysis] = useState<SwotAnalysis>({
    ideaTitle: '',
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: [],
    status: 'draft'
  })
  const [newItemText, setNewItemText] = useState({
    strengths: '',
    weaknesses: '',
    opportunities: '',
    threats: ''
  })
  const [loading, setLoading] = useState(false)
  const [versionLoading, setVersionLoading] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)
  const [showMatrix, setShowMatrix] = useState(false)
  const [showChart, setShowChart] = useState(false)
  const [selectedChartQuadrant, setSelectedChartQuadrant] = useState<'strengths' | 'weaknesses' | 'opportunities' | 'threats' | null>(null)
  // version comparison UI/state removed per request

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    fetchAnalyses()
  }, [])

  const fetchAnalyses = async () => {
    try {
      const res = await axios.get('/api/swot', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAnalyses(res.data.analyses)
      if (res.data.analyses.length > 0) {
        setCurrentAnalysis(res.data.analyses[0])
      }
    } catch (error) {
      console.error('Fetch analyses error:', error)
    }
  }

  const handleAddItem = (category: keyof typeof newItemText) => {
    if (!newItemText[category].trim()) return
    
    setCurrentAnalysis({
      ...currentAnalysis,
      [category]: [...currentAnalysis[category], { text: newItemText[category], createdAt: new Date() }]
    })
    setNewItemText({ ...newItemText, [category]: '' })
  }

  const handleRemoveItem = (category: keyof SwotAnalysis, index: number) => {
    const items = currentAnalysis[category] as SwotItem[]
    setCurrentAnalysis({
      ...currentAnalysis,
      [category]: items.filter((_, i) => i !== index)
    })
  }

  const handleSave = async () => {
    if (!currentAnalysis.ideaTitle.trim()) {
      toast.error('Please enter an idea title')
      return
    }

    setLoading(true)
    try {
      if (currentAnalysis._id) {
        await axios.put(
          `/api/swot/${currentAnalysis._id}`,
          currentAnalysis,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        toast.success('SWOT analysis updated!')
      } else {
        const res = await axios.post(
          '/api/swot',
          currentAnalysis,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setCurrentAnalysis(res.data.analysis)
        toast.success('SWOT analysis created!')
      }
      fetchAnalyses()
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Failed to save SWOT analysis')
    } finally {
      setLoading(false)
    }
  }

  

  

  // simple heuristic to infer priority from item text (non-AI)
  const inferPriority = (text = ''): 'high' | 'medium' | 'low' => {
    const t = (text || '').toLowerCase()
    // high: explicit urgency/critical keywords or numeric metrics
    if (/\b(urgent|critical|must|immediate|important|high priority|priority)\b/i.test(t)) return 'high'
    if (/\b\d+%|\d+\s*(users|customers|revenue|growth|m|k)\b/i.test(t)) return 'high'
    // low: vague language
    if (/\b(lots|many|various|some|maybe|might|could|etc|etc\.)\b/i.test(t)) return 'low'
    // medium default
    return 'medium'
  }

  const buildPriorityMatrix = () => {
    const priorities = ['high', 'medium', 'low'] as const
    const quadrantsKeys = ['strengths', 'weaknesses', 'opportunities', 'threats']
    const matrix: Record<string, Record<string, { count: number; samples: string[] }>> = {}
    priorities.forEach(p => {
      matrix[p] = {}
      quadrantsKeys.forEach(q => (matrix[p][q] = { count: 0, samples: [] }))
    })

    quadrantsKeys.forEach((q) => {
      const arr = currentAnalysis[q as keyof typeof currentAnalysis] as any[]
      arr.forEach((it) => {
        const p = inferPriority(it.text || '')
        matrix[p][q].count += 1
        if (matrix[p][q].samples.length < 2) matrix[p][q].samples.push(it.text || '')
      })
    })

    return { matrix, priorities, quadrantsKeys }
  }

  // Generate pie chart SVG data
  const generatePieChart = () => {
    const s = currentAnalysis.strengths.length
    const w = currentAnalysis.weaknesses.length
    const o = currentAnalysis.opportunities.length
    const t = currentAnalysis.threats.length
    const total = s + w + o + t

    if (total === 0) return null

    const colors = ['#10b981', '#ef4444', '#3b82f6', '#a855f7']
    const data = [
      { label: 'Strengths', value: s, color: colors[0] },
      { label: 'Weaknesses', value: w, color: colors[1] },
      { label: 'Opportunities', value: o, color: colors[2] },
      { label: 'Threats', value: t, color: colors[3] }
    ]

    const cx = 80
    const cy = 80
    const radius = 60
    let startAngle = 0

    const slices = data.map((d) => {
      const sliceAngle = (d.value / total) * 360
      const endAngle = startAngle + sliceAngle

      const start = {
        x: cx + radius * Math.cos((startAngle * Math.PI) / 180),
        y: cy + radius * Math.sin((startAngle * Math.PI) / 180)
      }
      const end = {
        x: cx + radius * Math.cos((endAngle * Math.PI) / 180),
        y: cy + radius * Math.sin((endAngle * Math.PI) / 180)
      }

      const largeArc = sliceAngle > 180 ? 1 : 0
      const path = `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`

      const midAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = cx + labelRadius * Math.cos((midAngle * Math.PI) / 180)
      const labelY = cy + labelRadius * Math.sin((midAngle * Math.PI) / 180)

      const result = { ...d, path, labelX, labelY, angle: midAngle, percent: ((d.value / total) * 100).toFixed(1) }
      startAngle = endAngle
      return result
    })

    return { slices, total }
  }

  const sections = [
    { key: 'strengths', title: 'Strengths', icon: <TrendingUp className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
    { key: 'weaknesses', title: 'Weaknesses', icon: <AlertTriangle className="w-6 h-6" />, color: 'from-red-500 to-pink-500' },
    { key: 'opportunities', title: 'Opportunities', icon: <Target className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    { key: 'threats', title: 'Threats', icon: <Shield className="w-6 h-6" />, color: 'from-purple-500 to-violet-500' }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        {!isDarkMode ? (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        )}
      </div>

      {/* Navigation */}
      <div className={`relative z-10 p-6 backdrop-blur-md ${
        isDarkMode ? 'bg-black/50' : 'bg-white/80'
      } border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <BackButton />
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSave}
                disabled={loading}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                <span>Save</span>
              </button>
              
              <button
                onClick={async () => {
                  // save a local/server version snapshot
                  if (!currentAnalysis.ideaTitle?.trim()) {
                    toast.error('Please enter an idea title before saving a version')
                    return
                  }
                  setVersionLoading(true)
                  try {
                    // if persisted, call server endpoint to save version
                    if (currentAnalysis._id) {
                      await axios.post(
                        `/api/swot/${currentAnalysis._id}/versions`,
                        { snapshot: currentAnalysis },
                        { headers: { Authorization: `Bearer ${token}` } }
                      )
                      toast.success('Version saved to server')
                    } else {
                      // fallback: create a downloadable snapshot
                      const v = saveVersion({
                        title: currentAnalysis.ideaTitle || '',
                        description: '',
                        items: [
                          // map simple frontend items into generic shape
                          ...currentAnalysis.strengths.map((s: any) => ({ id: String(Date.now()), quadrant: 'strength' as any, text: s.text || '', priority: 3, timeHorizon: 'medium_term' as any, createdAt: Date.now() })),
                          ...currentAnalysis.weaknesses.map((s: any) => ({ id: String(Date.now()), quadrant: 'weakness' as any, text: s.text || '', priority: 3, timeHorizon: 'medium_term' as any, createdAt: Date.now() })),
                          ...currentAnalysis.opportunities.map((s: any) => ({ id: String(Date.now()), quadrant: 'opportunity' as any, text: s.text || '', priority: 3, timeHorizon: 'medium_term' as any, createdAt: Date.now() })),
                          ...currentAnalysis.threats.map((s: any) => ({ id: String(Date.now()), quadrant: 'threat' as any, text: s.text || '', priority: 3, timeHorizon: 'medium_term' as any, createdAt: Date.now() }))
                        ],
                        versionHistory: []
                      } as any)
                      const blob = new Blob([JSON.stringify(v, null, 2)], { type: 'application/json' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `${(currentAnalysis.ideaTitle || 'swot').replace(/[^a-z0-9-_]/gi, '_')}_version_${v.timestamp}.json`
                      document.body.appendChild(a)
                      a.click()
                      a.remove()
                      URL.revokeObjectURL(url)
                      toast.success('Version downloaded')
                    }
                  } catch (err) {
                    console.error('Save version error', err)
                    toast.error('Failed to save version')
                  } finally {
                    setVersionLoading(false)
                  }
                }}
                disabled={loading || versionLoading}
                className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5" />
                <span>Save Version</span>
              </button>
              <div className="relative">
                <button
                  onClick={async () => {
                    setExportLoading(true)
                    try {
                      // Determine previous saved snapshot (if available)
                      let prevState: any = {
                        strengths: [],
                        weaknesses: [],
                        opportunities: [],
                        threats: []
                      }

                      if (currentAnalysis._id) {
                        try {
                          const res = await axios.get(
                            `/api/swot/${currentAnalysis._id}/versions`,
                            { headers: { Authorization: `Bearer ${token}` } }
                          )
                          const raw = res.data.versions || []
                          // Find the most recent version whose snapshot differs from currentAnalysis
                          const currSnapStr = (() => {
                            try { return JSON.stringify({ strengths: currentAnalysis.strengths, weaknesses: currentAnalysis.weaknesses, opportunities: currentAnalysis.opportunities, threats: currentAnalysis.threats }) } catch (e) { return null }
                          })()
                          // iterate from newest to oldest
                          for (let i = raw.length - 1; i >= 0; i--) {
                            const v = raw[i]
                            const snap = v.snapshot || v
                            let snapStr = null
                            try { snapStr = JSON.stringify({ strengths: snap.strengths || [], weaknesses: snap.weaknesses || [], opportunities: snap.opportunities || [], threats: snap.threats || [] }) } catch (e) { snapStr = null }
                            if (snapStr && currSnapStr && snapStr === currSnapStr) {
                              // same as current, skip
                              continue
                            }
                            if (snap) {
                              prevState = {
                                strengths: snap.strengths || [],
                                weaknesses: snap.weaknesses || [],
                                opportunities: snap.opportunities || [],
                                threats: snap.threats || []
                              }
                              break
                            }
                          }
                        } catch (e) {
                          // ignore fetch errors and fall back to empty prevState
                        }
                      }

                      const currState = {
                        strengths: currentAnalysis.strengths,
                        weaknesses: currentAnalysis.weaknesses,
                        opportunities: currentAnalysis.opportunities,
                        threats: currentAnalysis.threats
                      }

                      const comparison = compareSwotAnalyses(prevState, currState)

                      // Build CSV with Previous, Present and Analytics sections
                      const csvLines: string[] = []

                      // Previous SWOT details
                      csvLines.push('# PREVIOUS SWOT DETAILS')
                      csvLines.push('quadrant,text,createdAt')
                      const pushRowsRaw = (q: string, arr: any[]) => arr.forEach(it => csvLines.push(`${q},"${(it.text||'').replace(/"/g,'""')}","${it.createdAt || ''}"`))
                      pushRowsRaw('strengths', prevState.strengths || [])
                      pushRowsRaw('weaknesses', prevState.weaknesses || [])
                      pushRowsRaw('opportunities', prevState.opportunities || [])
                      pushRowsRaw('threats', prevState.threats || [])
                      csvLines.push('')

                      // Present SWOT details
                      csvLines.push('# PRESENT SWOT DETAILS')
                      csvLines.push('quadrant,text,createdAt')
                      pushRowsRaw('strengths', currState.strengths || [])
                      pushRowsRaw('weaknesses', currState.weaknesses || [])
                      pushRowsRaw('opportunities', currState.opportunities || [])
                      pushRowsRaw('threats', currState.threats || [])
                      csvLines.push('')

                      // Analytics comparison
                      csvLines.push('# ANALYTICS COMPARISON')
                      csvLines.push(`# Exported at: ${new Date().toISOString()}`)
                      csvLines.push(`# Total Items (Previous): ${comparison.totalPrev}`)
                      csvLines.push(`# Total Items (Present): ${comparison.totalCurr}`)
                      const totalAdded = Object.values(comparison.added).reduce((s: number, arr: any[]) => s + arr.length, 0)
                      const totalRemoved = Object.values(comparison.removed).reduce((s: number, arr: any[]) => s + arr.length, 0)
                      csvLines.push(`# Total Added: ${totalAdded}`)
                      csvLines.push(`# Total Removed: ${totalRemoved}`)
                      csvLines.push(`# Total Modified: ${comparison.modified.length}`)
                      csvLines.push('')

                      csvLines.push('# DELTAS BY QUADRANT')
                      csvLines.push('Quadrant,Delta')
                      Object.entries(comparison.deltaCounts).forEach(([q, delta]: [string, number]) => {
                        csvLines.push(`${q},${delta >= 0 ? '+' + delta : delta}`)
                      })
                      csvLines.push('')

                      // Added / Removed / Modified samples
                      if (totalAdded > 0) {
                        csvLines.push('# ADDED ITEMS')
                        Object.entries(comparison.added).forEach(([q, items]: [string, any[]]) => {
                          if (items.length > 0) {
                            items.forEach(it => csvLines.push(`${q},"${(it.text||'').replace(/"/g,'""')}",added`))
                          }
                        })
                        csvLines.push('')
                      }

                      if (totalRemoved > 0) {
                        csvLines.push('# REMOVED ITEMS')
                        Object.entries(comparison.removed).forEach(([q, items]: [string, any[]]) => {
                          if (items.length > 0) {
                            items.forEach(it => csvLines.push(`${q},"${(it.text||'').replace(/"/g,'""')}",removed`))
                          }
                        })
                        csvLines.push('')
                      }

                      if (comparison.modified.length > 0) {
                        csvLines.push('# MODIFIED ITEMS')
                        csvLines.push('quadrant,before,after')
                        comparison.modified.forEach((m: any) => {
                          csvLines.push(`${m.quadrant},"${(m.before?.text||'').replace(/"/g,'""')}","${(m.after?.text||'').replace(/"/g,'""')}"`)
                        })
                        csvLines.push('')
                      }

                      const csv = csvLines.join('\n')
                      const blob = new Blob([csv], { type: 'text/csv' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `${(currentAnalysis.ideaTitle || 'swot').replace(/[^a-z0-9-_]/gi, '_')}_export_${Date.now()}.csv`
                      document.body.appendChild(a)
                      a.click()
                      a.remove()
                      URL.revokeObjectURL(url)
                      toast.success('Exported SWOT (previous, present & analytics)')
                    } catch (err) {
                      console.error('Export error', err)
                      toast.error('Failed to export')
                    } finally {
                      setExportLoading(false)
                    }
                  }}
                  disabled={exportLoading}
                  className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Export</span>
                </button>
              </div>
              <button
                onClick={() => setShowChart(!showChart)}
                className="btn-secondary flex items-center space-x-2"
              >
                <Target className="w-5 h-5" />
                <span>{showChart ? 'Hide Chart' : 'Chart'}</span>
              </button>
              <button
                onClick={() => setShowMatrix(!showMatrix)}
                className="btn-secondary flex items-center space-x-2"
              >
                <AlertTriangle className="w-5 h-5" />
                <span>{showMatrix ? 'Hide Matrix' : 'Matrix'}</span>
              </button>
              {/* Compare Versions feature removed */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <span className="gradient-text">SWOT Analysis</span>
          </h1>
          <input
            type="text"
            value={currentAnalysis.ideaTitle}
            onChange={(e) => setCurrentAnalysis({ ...currentAnalysis, ideaTitle: e.target.value })}
            placeholder="Enter your startup idea title..."
            className={`w-full max-w-2xl px-6 py-4 rounded-xl text-2xl font-bold ${
              isDarkMode 
                ? 'bg-white/10 border-white/20 text-white placeholder-white/40' 
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
            } border focus:outline-none focus:border-violet-500 transition-colors`}
          />
        </div>

        

        {/* Pie Chart Card */}
        {showChart && generatePieChart() && (
          (() => {
            const chartData = generatePieChart()
            if (!chartData) return null
            const { slices } = chartData
            const quadrantMap: Record<string, 'strengths' | 'weaknesses' | 'opportunities' | 'threats'> = {
              'Strengths': 'strengths',
              'Weaknesses': 'weaknesses',
              'Opportunities': 'opportunities',
              'Threats': 'threats'
            }
            const selectedItems = selectedChartQuadrant ? currentAnalysis[selectedChartQuadrant] : []
            return (
              <>
                <div className="glass-card p-6 rounded-2xl mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      SWOT Distribution Analytics
                    </h3>
                    {selectedChartQuadrant && (
                      <button
                        onClick={() => setSelectedChartQuadrant(null)}
                        className="text-xs px-3 py-1 rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                      >
                        Clear Selection
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Pie Chart SVG - Clickable */}
                    <div className="flex-shrink-0">
                      <svg width="200" height="200" viewBox="0 0 160 160" className="drop-shadow-lg">
                        {slices.map((slice, i) => (
                          <g
                            key={i}
                            onClick={() => {
                              const quadrant = quadrantMap[slice.label]
                              setSelectedChartQuadrant(selectedChartQuadrant === quadrant ? null : quadrant)
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <path
                              d={slice.path}
                              fill={slice.color}
                              opacity={selectedChartQuadrant === null || selectedChartQuadrant === quadrantMap[slice.label] ? '0.9' : '0.3'}
                              stroke={isDarkMode ? '#1f2937' : '#f3f4f6'}
                              strokeWidth="2"
                              className="transition-opacity"
                            />
                            {slice.percent !== '0.0' && (
                              <text
                                x={slice.labelX}
                                y={slice.labelY}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-xs font-bold pointer-events-none"
                                fill={isDarkMode ? '#fff' : '#000'}
                              >
                                {slice.percent}%
                              </text>
                            )}
                          </g>
                        ))}
                      </svg>
                    </div>
                    {/* Legend and Stats */}
                    <div className="flex-1 space-y-2">
                      {slices.map((slice, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            const quadrant = quadrantMap[slice.label]
                            setSelectedChartQuadrant(selectedChartQuadrant === quadrant ? null : quadrant)
                          }}
                          className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-4 h-4 rounded"
                              style={{
                                backgroundColor: slice.color,
                                opacity: selectedChartQuadrant === null || selectedChartQuadrant === quadrantMap[slice.label] ? 1 : 0.3
                              }}
                            />
                            <span
                              className={`text-sm font-medium ${
                                selectedChartQuadrant === quadrantMap[slice.label]
                                  ? isDarkMode
                                    ? 'text-blue-300 font-bold'
                                    : 'text-blue-600 font-bold'
                                  : isDarkMode
                                  ? 'text-white'
                                  : 'text-gray-900'
                              }`}
                            >
                              {slice.label}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {slice.value}
                            </span>
                            <span className={`text-xs ml-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              ({slice.percent}%)
                            </span>
                          </div>
                        </div>
                      ))}
                      <div className={`pt-2 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Total Items
                          </span>
                          <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {chartData.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Panel */}
                {selectedChartQuadrant && selectedItems && selectedItems.length > 0 && (
                  <div className="glass-card p-6 rounded-2xl mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {selectedChartQuadrant.charAt(0).toUpperCase() + selectedChartQuadrant.slice(1)} Details
                      </h3>
                      <span className="text-sm text-gray-500">{selectedItems.length} items</span>
                    </div>
                    <div className="space-y-3">
                      {selectedItems.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}
                        >
                          <div className="flex items-start justify-between">
                            <span className={`flex-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.text}</span>
                            <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                              {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )
          })()
        )}

        {showMatrix && (
          (() => {
            const { matrix, priorities, quadrantsKeys } = buildPriorityMatrix()
            return (
              <div className="glass-card p-4 rounded-2xl mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Priority Matrix
                  </h3>
                  <p className="text-sm text-gray-500">Inferred priorities (heuristic)</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed text-sm">
                    <thead>
                      <tr>
                        <th className="w-28 text-left pr-4">Priority</th>
                        {quadrantsKeys.map((q) => (
                          <th key={q} className="text-left px-3">{q.charAt(0).toUpperCase() + q.slice(1)}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {priorities.map((p) => (
                        <tr key={p} className="align-top">
                          <td className="py-2 pr-4 font-medium">{p.charAt(0).toUpperCase() + p.slice(1)}</td>
                          {quadrantsKeys.map((q, ci) => {
                            const cell = matrix[p][q]
                            const color = sections[ci].color
                            return (
                              <td key={q} className="py-2 px-3">
                                <div className={`p-2 rounded-lg flex items-center justify-between ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                  <div className={`w-8 h-8 rounded-md flex items-center justify-center text-white bg-gradient-to-r ${color}`}>
                                    <span className="text-sm font-semibold">{cell.count}</span>
                                  </div>
                                  <div className="ml-3 text-xs text-gray-500 max-w-xs">
                                    {cell.samples.length > 0 ? (
                                      cell.samples.map((s, i) => <div key={i} className="truncate">{s}</div>)
                                    ) : (
                                      <div className="text-xs italic text-gray-400">—</div>
                                    )}
                                  </div>
                                </div>
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })()
        )}

        {/* SWOT Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <motion.div
              key={section.key}
              className="glass-card p-6 rounded-3xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${section.color} flex items-center justify-center text-white shadow-lg`}>
                  {section.icon}
                </div>
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {section.title}
                </h2>
              </div>

              {/* Items List */}
              <div className="space-y-3 mb-4">
                {(currentAnalysis[section.key as keyof SwotAnalysis] as SwotItem[])?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={`p-3 rounded-xl flex items-center justify-between ${
                      isDarkMode ? 'bg-white/5' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{item.text}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(section.key as keyof SwotAnalysis, index)}
                      className={`p-1 rounded-lg ${
                        isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-200'
                      } transition-colors`}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Item */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newItemText[section.key as keyof typeof newItemText]}
                  onChange={(e) => setNewItemText({ ...newItemText, [section.key]: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddItem(section.key as keyof typeof newItemText)}
                  placeholder={`Add ${section.title.toLowerCase()}...`}
                  className={`flex-1 px-4 py-2 rounded-xl ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/40' 
                      : 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-400'
                  } border focus:outline-none focus:border-violet-500 transition-colors`}
                />
                <button
                  onClick={() => handleAddItem(section.key as keyof typeof newItemText)}
                  className={`p-2 rounded-xl bg-gradient-to-r ${section.color} text-white shadow-lg hover:opacity-90 transition-opacity`}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Version Comparison feature removed */}
      </div>
    </div>
  )
}

export default SwotAnalysisPage
