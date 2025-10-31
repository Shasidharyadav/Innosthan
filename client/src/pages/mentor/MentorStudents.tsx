import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Users, BookOpen, TrendingUp, MessageCircle, Award, Search, CheckCircle } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../stores/authStore'
import { useThemeStore } from '../../stores/themeStore'
import BackButton from '../../components/BackButton'

interface Student {
  _id: string
  name: string
  email: string
  avatar?: string
  xp: number
  level: number
  progress: {
    modulesCompleted: number
    totalModules: number
    assignmentsCompleted: number
    totalAssignments: number
  }
}

const MentorStudents = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const { token } = useAuthStore()
  const { isDarkMode, toggleTheme } = useThemeStore()

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      // Get all students
      const response = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` },
        params: { role: 'student' }
      })
      setStudents(response.data.users || [])
    } catch (error: any) {
      console.error('Fetch students error:', error)
      toast.error('Failed to load students')
    } finally {
      setLoading(false)
    }
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Students 👨‍🎓</h1>
          <p className="text-gray-600 dark:text-white/60 text-lg">Guide and track your mentees' progress</p>
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
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{students.length}</div>
                <div className="text-sm text-gray-600 dark:text-white/60">Total Students</div>
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
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {students.length ? Math.round(students.reduce((sum, s) => sum + (s.progress?.modulesCompleted || 0), 0) / students.length) : 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-white/60">Avg Modules</div>
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
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {students.reduce((sum, s) => sum + (s.xp || 0), 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-white/60">Total XP</div>
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
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {students.filter(s => (s.progress?.modulesCompleted || 0) > 0).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-white/60">Active</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/40" />
            <input
              type="text"
              placeholder="Search students by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student, index) => (
            <motion.div
              key={student._id}
              className="glass-card p-6 rounded-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {student.avatar || student.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{student.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-white/60">{student.email}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-white/60">Modules</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {student.progress?.modulesCompleted || 0}/{student.progress?.totalModules || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${student.progress?.totalModules ? ((student.progress.modulesCompleted / student.progress.totalModules) * 100) : 0}%`
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-white/60">Assignments</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {student.progress?.assignmentsCompleted || 0}/{student.progress?.totalAssignments || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-mint-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${student.progress?.totalAssignments ? ((student.progress.assignmentsCompleted / student.progress.totalAssignments) * 100) : 0}%`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-gray-100 dark:bg-white/5 p-3 rounded-lg text-center">
                  <div className="text-xs text-gray-600 dark:text-white/60 mb-1">Level</div>
                  <div className="text-lg font-bold text-violet-400">{student.level || 1}</div>
                </div>
                <div className="bg-amber-500/10 p-3 rounded-lg text-center">
                  <div className="text-xs text-amber-400/70 mb-1">XP</div>
                  <div className="text-lg font-bold text-amber-400">{student.xp || 0}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  className="flex-1 py-2 px-4 bg-violet-500/20 text-violet-400 rounded-lg hover:bg-violet-500/30 transition-colors font-medium text-sm flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </button>
                <button
                  className="flex-1 py-2 px-4 bg-mint-500/20 text-mint-400 rounded-lg hover:bg-mint-500/30 transition-colors font-medium text-sm flex items-center justify-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Guide</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <motion.div
            className="glass-card p-12 rounded-2xl text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Users className="w-16 h-16 text-gray-400 dark:text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'No students found' : 'No students yet'}
            </h3>
            <p className="text-gray-600 dark:text-white/60">
              {searchTerm ? 'Try a different search term' : 'Students will appear here once they join'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MentorStudents
