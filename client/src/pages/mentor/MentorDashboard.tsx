import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import { useAuthStore } from '../../stores/authStore'
import { useSocket } from '../../contexts/SocketContext'
import axios from 'axios'
import { 
  TrendingUp, 
  Users, 
  Calendar,
  CheckCircle,
  Star,
  ArrowRight,
  Briefcase,
  Sun,
  Moon,
  Menu,
  X,
  MessageCircle,
  BookOpen,
  Video,
  Clock,
  Sparkles
} from 'lucide-react'
import toast from 'react-hot-toast'

interface MentorAnalytics {
  totalSessions: number
  completedSessions: number
  upcomingSessions: number
  activeStudents: number
  averageRating: string
  totalReviews: number
}

interface PendingReview {
  _id: string
  studentId: {
    _id: string
    name: string
    email: string
  }
  moduleId: {
    _id: string
    title: string
    moduleNumber: number
  }
  submittedAt: string
  title: string
}

interface UpcomingSession {
  _id: string
  student: {
    _id: string
    name: string
    email: string
  }
  topic: string
  scheduledAt: string
  type: string
  duration: number
  status: string
}

interface StudentProgress {
  _id: string
  name: string
  xp: number
  level: number
  completedModules: number
}

const MentorDashboard = () => {
  const { isDarkMode, toggleTheme } = useThemeStore()
  const { user } = useAuthStore()
  const { socket, isConnected } = useSocket()
  const navigate = useNavigate()
  const [analytics, setAnalytics] = useState<MentorAnalytics | null>(null)
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([])
  const [upcomingSessions, setUpcomingSessions] = useState<UpcomingSession[]>([])
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    fetchDashboardData()
    
    // Set up polling for real-time updates every 30 seconds
    intervalRef.current = setInterval(() => {
      fetchDashboardData()
    }, 30000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Real-time updates via WebSocket
  useEffect(() => {
    if (!socket || !isConnected) return

    // Listen for new assignment submissions
    socket.on('assignment:submitted', (data: any) => {
      toast.success(`New assignment submitted by ${data.studentName}`)
      fetchDashboardData()
    })

    // Listen for new session requests
    socket.on('session:created', (data: any) => {
      toast.success(`New session scheduled: ${data.topic}`)
      fetchDashboardData()
    })

    // Listen for session updates
    socket.on('session:updated', () => {
      fetchDashboardData()
    })

    // Listen for assignment reviews
    socket.on('assignment:reviewed', () => {
      fetchDashboardData()
    })

    return () => {
      socket.off('assignment:submitted')
      socket.off('session:created')
      socket.off('session:updated')
      socket.off('assignment:reviewed')
    }
  }, [socket, isConnected])

  const fetchDashboardData = async () => {
    try {
      const [analyticsRes, pendingRes, sessionsRes, studentsRes] = await Promise.all([
        axios.get('/api/sessions/mentor/analytics').catch(() => ({ data: null })),
        axios.get('/api/assignments', { params: { status: 'submitted', limit: 5 } }).catch(() => ({ data: { assignments: [] } })),
        axios.get('/api/sessions', { params: { status: 'scheduled', limit: 5 } }).catch(() => ({ data: { sessions: [] } })),
        axios.get('/api/sessions/mentor/students').catch(() => ({ data: { students: [] } }))
      ])

      if (analyticsRes.data) setAnalytics(analyticsRes.data)
      setPendingReviews(pendingRes.data.assignments || [])
      
      // Filter and sort upcoming sessions
      const upcoming = (sessionsRes.data.sessions || []).filter((s: UpcomingSession) => {
        const sessionDate = new Date(s.scheduledAt)
        return sessionDate >= new Date() && ['scheduled', 'confirmed'].includes(s.status)
      }).sort((a: UpcomingSession, b: UpcomingSession) => 
        new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
      )
      setUpcomingSessions(upcoming.slice(0, 5))
      
      setStudentProgress(studentsRes.data.students || [])
    } catch (error: any) {
      console.error('Fetch dashboard data error:', error)
      if (!analytics) {
        toast.error('Failed to load dashboard data')
      }
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      title: 'My Students',
      description: 'View and manage students',
      icon: <Users className="w-6 h-6" />,
      link: '/mentor/students',
      color: 'from-violet-500 to-pink-500'
    },
    {
      title: 'Sessions',
      description: 'Schedule and manage sessions',
      icon: <Calendar className="w-6 h-6" />,
      link: '/mentor/sessions',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Courses',
      description: 'Create and manage courses',
      icon: <BookOpen className="w-6 h-6" />,
      link: '/mentor/courses',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Messages',
      description: 'Chat with students',
      icon: <MessageCircle className="w-6 h-6" />,
      link: '/student/messages',
      color: 'from-violet-500 to-purple-500'
    },
    {
      title: 'Profile',
      description: 'View and edit profile',
      icon: <Briefcase className="w-6 h-6" />,
      link: '/mentor/profile',
      color: 'from-amber-500 to-orange-500'
    }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Today'
    if (days === 1) return 'Tomorrow'
    if (days === -1) return 'Yesterday'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diff < 60) return `${diff} minutes ago`
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`
    return `${Math.floor(diff / 1440)} days ago`
  }

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
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome back, {user?.name}!
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
              Mentor • {analytics?.activeStudents || 0} Active Students
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors`}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${
              isDarkMode ? 'bg-white/10' : 'bg-gray-100'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/mentor/profile" className="hidden md:block btn-primary px-6 py-2">
            Profile
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            className="glass-card p-6 rounded-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className={`flex items-center justify-between mb-2`}>
              <Users className={`w-8 h-8 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
            </div>
            <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {analytics?.activeStudents || 0}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>Active Students</p>
          </motion.div>

          <motion.div
            className="glass-card p-6 rounded-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`flex items-center justify-between mb-2`}>
              <Calendar className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {analytics?.upcomingSessions || 0}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>Upcoming Sessions</p>
          </motion.div>

          <motion.div
            className="glass-card p-6 rounded-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className={`flex items-center justify-between mb-2`}>
              <CheckCircle className={`w-8 h-8 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
            </div>
            <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {pendingReviews.length}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>Pending Reviews</p>
          </motion.div>

          <motion.div
            className="glass-card p-6 rounded-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className={`flex items-center justify-between mb-2`}>
              <Star className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {analytics?.averageRating || '0.0'}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>Average Rating</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <motion.div
                  className="glass-card glass-card-hover p-6 rounded-2xl h-full"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                    {action.icon}
                  </div>
                  <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {action.title}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                    {action.description}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Upcoming Sessions
            </h2>
            <Link 
              to="/mentor/sessions"
              className={`text-sm flex items-center space-x-1 ${
                isDarkMode ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'
              }`}
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session, index) => (
                <motion.div
                  key={session._id}
                  className="glass-card glass-card-hover p-6 rounded-2xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => navigate(`/mentor/sessions`)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center text-white`}>
                      {session.type === 'video' ? <Video className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      session.status === 'confirmed' 
                        ? isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                        : isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                  <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {session.student?.name || 'Student'}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'} mb-4`}>
                    {session.topic}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className={`flex items-center space-x-1 ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(session.scheduledAt)}</span>
                    </div>
                    <span className={isDarkMode ? 'text-white/60' : 'text-gray-600'}>
                      {formatTime(session.scheduledAt)}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className={`col-span-2 glass-card p-6 rounded-2xl text-center ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No upcoming sessions scheduled</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >

            {/* Pending Reviews */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Pending Reviews
                </h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-amber-100 text-amber-700'
                }`}>
                  {pendingReviews.length} pending
                </span>
              </div>
              
              <div className="space-y-4">
                {pendingReviews.length > 0 ? (
                  pendingReviews.map((review, index) => (
                    <motion.div
                      key={review._id}
                      className={`glass-card glass-card-hover p-4 rounded-xl ${
                        isDarkMode ? 'bg-white/5' : 'bg-gray-50'
                      } transition-all cursor-pointer`}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      whileHover={{ y: -2 }}
                      onClick={() => navigate(`/mentor/courses?assignment=${review._id}`)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {review.studentId?.name?.charAt(0) || 'S'}
                            </div>
                            <div>
                              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {review.studentId?.name || 'Student'}
                              </h3>
                              <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                {review.moduleId?.title || review.title || 'Assignment'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 ml-12 mt-2">
                            <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>
                              Submitted {getTimeAgo(review.submittedAt)}
                            </p>
                          </div>
                        </div>
                        <button 
                          className="btn-primary text-sm px-4 py-2 ml-4"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/mentor/courses?assignment=${review._id}`)
                          }}
                        >
                          Review
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className={`text-center py-8 ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No pending reviews</p>
                  </div>
                )}
              </div>
            </div>

            {/* Student Progress */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Student Progress
                </h2>
                <Link 
                  to="/mentor/students"
                  className={`text-sm flex items-center space-x-1 ${
                    isDarkMode ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'
                  }`}
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {studentProgress.length > 0 ? (
                  studentProgress.slice(0, 5).map((student) => {
                    const progress = student.completedModules > 0 ? Math.min(100, (student.completedModules / 8) * 100) : 0
                    return (
                      <div 
                        key={student._id} 
                        className={`glass-card glass-card-hover p-4 rounded-xl cursor-pointer ${
                          isDarkMode ? 'bg-white/5' : 'bg-gray-50'
                        }`}
                        onClick={() => navigate(`/mentor/students?student=${student._id}`)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                              {student.name?.charAt(0) || 'S'}
                            </div>
                            <div>
                              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {student.name}
                              </h3>
                              <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                Level {student.level} • {student.xp} XP
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {Math.round(progress)}%
                            </span>
                          </div>
                        </div>
                        <div className={`w-full ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2`}>
                          <div 
                            className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className={`text-center py-8 ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                    <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No students yet</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Quick Stats */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                This Week
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={isDarkMode ? 'text-white/80' : 'text-gray-700'}>Sessions Conducted</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {analytics?.completedSessions || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDarkMode ? 'text-white/80' : 'text-gray-700'}>Assignments Reviewed</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {analytics?.totalReviews || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDarkMode ? 'text-white/80' : 'text-gray-700'}>Total Sessions</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {analytics?.totalSessions || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDarkMode ? 'text-white/80' : 'text-gray-700'}>Active Students</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {analytics?.activeStudents || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Connection Status */}
            <div className={`glass-card p-4 rounded-2xl ${
              isConnected ? (isDarkMode ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200') : (isDarkMode ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200')
            }`}>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                {isConnected ? 'Real-time updates active' : 'Reconnecting...'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default MentorDashboard
