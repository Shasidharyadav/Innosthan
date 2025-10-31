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
  Shield,
  Lightbulb
} from 'lucide-react'
import toast from 'react-hot-toast'
import BackButton from '../../components/BackButton'

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
  aiSuggestions?: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  }
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
  const [showAISuggestions, setShowAISuggestions] = useState(false)

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

  const handleGetAISuggestions = async () => {
    if (!currentAnalysis._id) {
      toast.error('Please save the analysis first')
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(
        `/api/swot/${currentAnalysis._id}/ai-suggestions`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCurrentAnalysis(res.data.analysis)
      setShowAISuggestions(true)
      toast.success('AI suggestions generated!')
    } catch (error) {
      console.error('AI suggestions error:', error)
      toast.error('Failed to generate AI suggestions')
    } finally {
      setLoading(false)
    }
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

        {/* AI Suggestions Button */}
        {currentAnalysis._id && (
          <div className="mb-8">
            <button
              onClick={handleGetAISuggestions}
              disabled={loading}
              className="btn-secondary flex items-center space-x-2"
            >
              <Lightbulb className="w-5 h-5" />
              <span>Get AI Suggestions</span>
            </button>
          </div>
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
                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{item.text}</span>
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

              {/* AI Suggestions */}
              {showAISuggestions && currentAnalysis.aiSuggestions && currentAnalysis.aiSuggestions[section.key as keyof typeof currentAnalysis.aiSuggestions]?.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                    AI Suggestions:
                  </p>
                  <div className="space-y-2">
                    {currentAnalysis.aiSuggestions[section.key as keyof typeof currentAnalysis.aiSuggestions].map((suggestion: string, index: number) => (
                      <div
                        key={index}
                        className={`p-2 rounded-lg text-sm ${
                          isDarkMode ? 'bg-violet-500/10 text-violet-300' : 'bg-violet-50 text-violet-700'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 inline mr-2" />
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SwotAnalysisPage

