import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import axios from 'axios'
import {
  ArrowLeft,
  Search,
  Video,
  Book,
  FileText,
  Code,
  Download,
  Play,
  Star,
  Filter
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Resource {
  _id: string
  title: string
  description: string
  category: string
  subcategory: string
  type: string
  url: string
  author: string
  level: string
  tags: string[]
  downloads: number
  views: number
  rating: number
  ratingCount: number
  duration?: string
  fileSize?: string
}

const StudentResourcesPage = () => {
  const { isDarkMode } = useThemeStore()
  const [resources, setResources] = useState<Resource[]>([])
  const [filteredResources, setFilteredResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    fetchResources()
  }, [])

  useEffect(() => {
    filterResources()
  }, [searchTerm, selectedCategory, selectedLevel, resources])

  const fetchResources = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('/api/resources', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setResources(res.data.resources)
      setFilteredResources(res.data.resources)
    } catch (error) {
      console.error('Fetch resources error:', error)
      toast.error('Failed to load resources')
    } finally {
      setLoading(false)
    }
  }

  const filterResources = () => {
    let filtered = [...resources]

    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(r => r.category === selectedCategory)
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(r => r.level === selectedLevel)
    }

    setFilteredResources(filtered)
  }

  const handleDownload = async (resourceId: string) => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `/api/resources/${resourceId}/download`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success('Download started!')
      fetchResources()
    } catch (error) {
      toast.error('Failed to download resource')
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'video':
        return <Video className="w-5 h-5" />
      case 'document':
        return <Book className="w-5 h-5" />
      case 'template':
        return <FileText className="w-5 h-5" />
      case 'code':
        return <Code className="w-5 h-5" />
      default:
        return <Book className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'video':
        return 'from-purple-500 to-pink-500'
      case 'document':
        return 'from-blue-500 to-cyan-500'
      case 'template':
        return 'from-amber-500 to-orange-500'
      case 'code':
        return 'from-green-500 to-emerald-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const categories = [
    { value: 'all', label: 'All Resources' },
    { value: 'video', label: 'Videos' },
    { value: 'document', label: 'Documents' },
    { value: 'template', label: 'Templates' },
    { value: 'code', label: 'Code' },
    { value: 'article', label: 'Articles' }
  ]

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full" />
      </div>
    )
  }

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
      <nav className={`relative z-10 flex items-center justify-between p-6 backdrop-blur-md ${
        isDarkMode ? 'bg-black/50' : 'bg-white/80'
      } border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <Link to="/student/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-5 h-5" />
          <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Back to Dashboard</span>
        </Link>
        <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Resource Library
        </h1>
        <div className="w-32" /> {/* Spacer */}
      </nav>

      {/* Main Content */}
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDarkMode ? 'text-white/40' : 'text-gray-400'
            }`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search resources..."
              className={`w-full pl-12 pr-4 py-4 rounded-xl ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-white placeholder-white/40' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              } border focus:outline-none focus:border-violet-500 transition-colors`}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Filters:</span>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-2 rounded-xl appearance-none cursor-pointer ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-gray-100 border-gray-200 text-gray-900'
              } border focus:outline-none focus:border-violet-500`}
              style={{
                backgroundImage: isDarkMode 
                  ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")"
                  : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                paddingRight: '2.25rem'
              }}
            >
              {categories.map((cat) => (
                <option 
                  key={cat.value} 
                  value={cat.value}
                  style={isDarkMode ? { backgroundColor: '#111827', color: '#ffffff' } : { backgroundColor: '#ffffff', color: '#111827' }}
                >
                  {cat.label}
                </option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className={`px-4 py-2 rounded-xl appearance-none cursor-pointer ${
                isDarkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-gray-100 border-gray-200 text-gray-900'
              } border focus:outline-none focus:border-violet-500`}
              style={{
                backgroundImage: isDarkMode 
                  ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")"
                  : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                paddingRight: '2.25rem'
              }}
            >
              {levels.map((level) => (
                <option 
                  key={level.value} 
                  value={level.value}
                  style={isDarkMode ? { backgroundColor: '#111827', color: '#ffffff' } : { backgroundColor: '#ffffff', color: '#111827' }}
                >
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
            Showing {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource._id}
              className="glass-card glass-card-hover p-6 rounded-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              {/* Category Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(resource.category)} flex items-center justify-center text-white mb-4 shadow-lg`}>
                {getCategoryIcon(resource.category)}
              </div>

              {/* Title */}
              <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {resource.title}
              </h3>

              {/* Description */}
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-white/60' : 'text-gray-600'} line-clamp-2`}>
                {resource.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center space-x-4 mb-4 text-sm">
                {resource.rating > 0 && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className={isDarkMode ? 'text-white/60' : 'text-gray-600'}>
                      {resource.rating.toFixed(1)}
                    </span>
                  </div>
                )}
                {resource.duration && (
                  <div className="flex items-center space-x-1">
                    <Play className="w-4 h-4" />
                    <span className={isDarkMode ? 'text-white/60' : 'text-gray-600'}>
                      {resource.duration}
                    </span>
                  </div>
                )}
                {resource.fileSize && (
                  <span className={isDarkMode ? 'text-white/60' : 'text-gray-600'}>
                    {resource.fileSize}
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  isDarkMode ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'
                }`}>
                  {resource.level}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>
                  {resource.type}
                </span>
              </div>

              {/* Actions */}
              <button
                onClick={() => handleDownload(resource._id)}
                className="btn-primary w-full py-2 flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-20">
            <Book className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`} />
            <p className={`text-lg ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
              No resources found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentResourcesPage

