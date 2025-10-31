import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Calendar, Video, MessageCircle, Clock, Users, Plus, X, Sun, Moon } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../stores/authStore'
import { useThemeStore } from '../../stores/themeStore'
import BackButton from '../../components/BackButton'

interface Session {
  _id: string
  student: {
    _id: string
    name: string
    email: string
    avatar?: string
  }
  topic: string
  scheduledAt: string
  duration: number
  type: 'video' | 'chat'
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

const MentorSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
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
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      const response = await axios.get('/api/sessions', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSessions(response.data.sessions || [])
    } catch (error: any) {
      console.error('Fetch sessions error:', error)
      toast.error('Failed to load sessions')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-mint-500/20 text-mint-400 border-mint-500/30'
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'completed': return 'bg-violet-500/20 text-violet-400 border-violet-500/30'
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30'
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
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Mentorship Sessions 📅</h1>
          <p className="text-gray-600 dark:text-white/60 text-lg">Manage and schedule your mentorship sessions</p>
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
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{sessions.length}</div>
                <div className="text-sm text-gray-600 dark:text-white/60">Total Sessions</div>
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
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sessions.filter(s => s.status === 'confirmed').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-white/60">Confirmed</div>
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
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sessions.filter(s => s.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-white/60">Pending</div>
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
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(sessions.map(s => s.student._id)).size}
                </div>
                <div className="text-sm text-gray-600 dark:text-white/60">Unique Students</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {sessions.length === 0 ? (
            <motion.div
              className="glass-card p-12 rounded-2xl text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Calendar className="w-16 h-16 text-gray-400 dark:text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Sessions Yet</h3>
              <p className="text-gray-600 dark:text-white/60">Sessions will appear here when students book mentorship time with you</p>
            </motion.div>
          ) : (
            sessions.map((session, index) => (
              <motion.div
                key={session._id}
                className="glass-card p-6 rounded-2xl"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {session.student.avatar || session.student.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {session.student.name}
                      </h3>
                      <p className="text-gray-600 dark:text-white/60 text-sm mb-2">{session.topic}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-white/60">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(session.scheduledAt).toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          {session.type === 'video' ? <Video className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                          <span>{session.type === 'video' ? 'Video Call' : 'Chat Session'}</span>
                        </span>
                        <span>{session.duration} minutes</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                    {session.status === 'confirmed' && (
                      <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg text-white font-medium hover:scale-105 transition-transform">
                        Start Session
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default MentorSessions
