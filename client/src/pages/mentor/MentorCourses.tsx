import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Lock, Unlock, BookOpen, Save, X, Users, TrendingUp } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../stores/authStore'
import { useThemeStore } from '../../stores/themeStore'
import BackButton from '../../components/BackButton'

interface Module {
  _id?: string
  title: string
  description: string
  moduleNumber: number
  isUnlocked: boolean
  duration?: string
  xpReward?: number
  lessons?: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  progress?: number
  createdBy?: string
}

const MentorCourses = () => {
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingModule, setEditingModule] = useState<Module | null>(null)
  const { token, user } = useAuthStore()
  const { isDarkMode, toggleTheme } = useThemeStore()

  const [formData, setFormData] = useState<Module>({
    title: '',
    description: '',
    moduleNumber: 1,
    isUnlocked: true,
    duration: '2h',
    xpReward: 100,
    lessons: 5,
    difficulty: 'Beginner'
  })

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    fetchMyCourses()
  }, [])

  const fetchMyCourses = async () => {
    try {
      const response = await axios.get('/api/modules', {
        headers: { Authorization: `Bearer ${token}` }
      })
      // Filter modules created by this mentor
      const myModules = (response.data.modules || []).filter((m: any) => 
        m.createdBy === user?._id || m.createdBy?._id === user?._id
      )
      setModules(myModules)
    } catch (error: any) {
      console.error('Fetch courses error:', error)
      toast.error('Failed to load your courses')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingModule?._id) {
        await axios.put(`/api/modules/${editingModule._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        toast.success('Course updated successfully!')
      } else {
        await axios.post('/api/modules', formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        toast.success('Course created successfully!')
      }
      
      fetchMyCourses()
      closeModal()
    } catch (error: any) {
      console.error('Save course error:', error)
      toast.error(error.response?.data?.message || 'Failed to save course')
    }
  }

  const handleDelete = async (moduleId: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return

    try {
      await axios.delete(`/api/modules/${moduleId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Course deleted successfully!')
      fetchMyCourses()
    } catch (error: any) {
      console.error('Delete course error:', error)
      toast.error('Failed to delete course')
    }
  }

  const handleToggleLock = async (module: Module) => {
    try {
      await axios.put(`/api/modules/${module._id}`, 
        { ...module, isUnlocked: !module.isUnlocked },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success(`Course ${!module.isUnlocked ? 'unlocked' : 'locked'}!`)
      fetchMyCourses()
    } catch (error: any) {
      console.error('Toggle lock error:', error)
      toast.error('Failed to update course')
    }
  }

  const openModal = (module?: Module) => {
    if (module) {
      setEditingModule(module)
      setFormData(module)
    } else {
      setEditingModule(null)
      setFormData({
        title: '',
        description: '',
        moduleNumber: modules.length + 1,
        isUnlocked: true,
        duration: '2h',
        xpReward: 100,
        lessons: 5,
        difficulty: 'Beginner'
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingModule(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-mint-500/20 text-mint-400 border-mint-500/30'
      case 'Intermediate': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'Advanced': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Expert': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <BackButton showHomeButton={false} />
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 transition-colors shadow-md"
          >
            {isDarkMode ? (
              <span className="text-yellow-400">☀️</span>
            ) : (
              <span className="text-gray-700">🌙</span>
            )}
          </button>
        </div>

        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Courses 📚</h1>
            <p className="text-gray-600 dark:text-white/60 text-lg">Create and manage courses to guide your students</p>
          </div>
          
          <button
            onClick={() => openModal()}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Create Course</span>
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            className="glass-card p-6 rounded-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{modules.length}</div>
                <div className="text-sm text-gray-600 dark:text-white/60">My Courses</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-6 rounded-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-mint-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Unlock className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{modules.filter(m => m.isUnlocked).length}</div>
                <div className="text-sm text-gray-600 dark:text-white/60">Published</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-6 rounded-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">0</div>
                <div className="text-sm text-gray-600 dark:text-white/60">Students</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-6 rounded-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{modules.reduce((sum, m) => sum + (m.xpReward || 0), 0)}</div>
                <div className="text-sm text-gray-600 dark:text-white/60">Total XP</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module._id}
              className="glass-card p-6 rounded-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {module.moduleNumber}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty}
                  </span>
                  {module.isUnlocked ? (
                    <Unlock className="w-5 h-5 text-mint-400" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-400 dark:text-white/40" />
                  )}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{module.title}</h3>
              <p className="text-gray-600 dark:text-white/70 mb-4 line-clamp-2">{module.description}</p>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center bg-gray-100 dark:bg-white/5 p-2 rounded-lg">
                  <div className="text-xs text-gray-600 dark:text-white/60">Duration</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{module.duration}</div>
                </div>
                <div className="text-center bg-gray-100 dark:bg-white/5 p-2 rounded-lg">
                  <div className="text-xs text-gray-600 dark:text-white/60">Lessons</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{module.lessons}</div>
                </div>
                <div className="text-center bg-amber-500/10 p-2 rounded-lg">
                  <div className="text-xs text-amber-400/70">XP</div>
                  <div className="text-sm font-semibold text-amber-400">{module.xpReward}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleToggleLock(module)}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    module.isUnlocked
                      ? 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/70 hover:bg-gray-300 dark:hover:bg-white/20'
                      : 'bg-mint-500/20 text-mint-400 hover:bg-mint-500/30'
                  }`}
                >
                  {module.isUnlocked ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => openModal(module)}
                  className="p-2 bg-violet-500/20 text-violet-400 rounded-lg hover:bg-violet-500/30 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(module._id!)}
                  className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {modules.length === 0 && (
          <motion.div
            className="glass-card p-12 rounded-2xl text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <BookOpen className="w-16 h-16 text-gray-400 dark:text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Courses Yet</h3>
            <p className="text-gray-600 dark:text-white/60 mb-6">Create your first course to start guiding students!</p>
            <button
              onClick={() => openModal()}
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
            >
              Create Course
            </button>
          </motion.div>
        )}

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              className="glass-card p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingModule ? 'Edit Course' : 'Create New Course'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-white/60" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                      Course Number
                    </label>
                    <input
                      type="number"
                      value={formData.moduleNumber}
                      onChange={(e) => setFormData({ ...formData, moduleNumber: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-violet-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-violet-500 transition-colors appearance-none cursor-pointer ${
                        isDarkMode 
                          ? 'bg-white/10 border-white/20 text-white' 
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      }`}
                      style={{
                        backgroundImage: isDarkMode 
                          ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")"
                          : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        paddingRight: '2.5rem'
                      }}
                      required
                    >
                      <option value="Beginner" style={isDarkMode ? { backgroundColor: '#111827', color: '#ffffff' } : { backgroundColor: '#ffffff', color: '#111827' }}>
                        Beginner
                      </option>
                      <option value="Intermediate" style={isDarkMode ? { backgroundColor: '#111827', color: '#ffffff' } : { backgroundColor: '#ffffff', color: '#111827' }}>
                        Intermediate
                      </option>
                      <option value="Advanced" style={isDarkMode ? { backgroundColor: '#111827', color: '#ffffff' } : { backgroundColor: '#ffffff', color: '#111827' }}>
                        Advanced
                      </option>
                      <option value="Expert" style={isDarkMode ? { backgroundColor: '#111827', color: '#ffffff' } : { backgroundColor: '#ffffff', color: '#111827' }}>
                        Expert
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                    Course Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Advanced Business Strategy"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:border-violet-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what students will learn..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 2h"
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:border-violet-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                      Lessons
                    </label>
                    <input
                      type="number"
                      value={formData.lessons}
                      onChange={(e) => setFormData({ ...formData, lessons: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-violet-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                      XP Reward
                    </label>
                    <input
                      type="number"
                      value={formData.xpReward}
                      onChange={(e) => setFormData({ ...formData, xpReward: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-violet-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isUnlocked"
                    checked={formData.isUnlocked}
                    onChange={(e) => setFormData({ ...formData, isUnlocked: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 dark:border-white/20 text-violet-500 focus:ring-violet-500"
                  />
                  <label htmlFor="isUnlocked" className="text-sm font-medium text-gray-700 dark:text-white/80">
                    Publish course for students
                  </label>
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                  >
                    <Save className="w-5 h-5" />
                    <span>{editingModule ? 'Update Course' : 'Create Course'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MentorCourses

