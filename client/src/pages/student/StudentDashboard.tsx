import { motion } from 'framer-motion'
<<<<<<< HEAD
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import { useAuthStore } from '../../stores/authStore'
import axios from 'axios'
import { 
  TrendingUp, 
  Book, 
  Trophy, 
  Target, 
  Users, 
  Sparkles,
  ArrowRight,
  BarChart3,
  Briefcase,
  FileText,
  Sun,
  Moon,
  Menu,
  X,
  MessageCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Analytics {
  totalAssignments: number
  completedAssignments: number
  pendingAssignments: number
  xp: number
  level: number
  badges: number
}

interface Module {
  _id: string
  title: string
  description: string
  moduleNumber: number
  isUnlocked: boolean
  progress?: number
}

const StudentDashboard = () => {
  const { isDarkMode, toggleTheme } = useThemeStore()
  const { user } = useAuthStore()
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [analyticsRes, modulesRes] = await Promise.all([
        axios.get('/api/analytics/user'),
        axios.get('/api/modules')
      ])

      setAnalytics(analyticsRes.data)
      setModules(modulesRes.data.modules)
    } catch (error: any) {
      console.error('Fetch dashboard data error:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      title: 'SWOT Analysis',
      description: 'Analyze your startup idea',
      icon: <Target className="w-6 h-6" />,
      link: '/student/swot',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Resource Library',
      description: 'Access learning materials',
      icon: <Book className="w-6 h-6" />,
      link: '/student/resources',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Community',
      description: 'Connect with peers',
      icon: <Users className="w-6 h-6" />,
      link: '/student/community',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Messages',
      description: 'Chat with peers & mentors',
      icon: <MessageCircle className="w-6 h-6" />,
      link: '/student/messages',
      color: 'from-violet-500 to-purple-500'
    },
    {
      title: 'Mentorship',
      description: 'Get expert guidance',
      icon: <Briefcase className="w-6 h-6" />,
      link: '/student/mentorship',
      color: 'from-amber-500 to-orange-500'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full" />
=======
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Target, 
  Calendar,
  Award,
  Zap,
  MessageCircle,
  Brain
} from 'lucide-react'

const StudentDashboard = () => {
  const { user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  // Redirect non-students to their appropriate dashboards
  useEffect(() => {
    if (isAuthenticated && user?.role && user.role !== 'student') {
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard')
          break
        case 'mentor':
          navigate('/mentor/dashboard')
          break
        case 'institution':
          navigate('/institution/dashboard')
          break
      }
    }
  }, [isAuthenticated, user, navigate])

  const stats = [
    { label: 'XP Earned', value: user?.xp || 0, icon: <Zap className="w-6 h-6" />, color: 'text-amber-400', change: '+50' },
    { label: 'Modules Completed', value: 3, icon: <BookOpen className="w-6 h-6" />, color: 'text-violet-400', change: '+1' },
    { label: 'Badges Earned', value: user?.badges?.length || 0, icon: <Award className="w-6 h-6" />, color: 'text-pink-400', change: '+2' },
    { label: 'Current Level', value: user?.level || 1, icon: <Trophy className="w-6 h-6" />, color: 'text-primary-400', change: '+1' }
  ]

  const recentActivities = [
    { action: 'Completed Module 2: Ideation', time: '2 hours ago', xp: '+50 XP', type: 'learning' },
    { action: 'Earned "Problem Solver" Badge', time: '1 day ago', xp: '+25 XP', type: 'achievement' },
    { action: 'Attended Mentorship Session', time: '3 days ago', xp: '+30 XP', type: 'mentorship' },
    { action: 'Submitted Assignment', time: '1 week ago', xp: '+40 XP', type: 'assignment' }
  ]

  const upcomingEvents = [
    { title: 'Mentorship Session', time: 'Tomorrow, 2:00 PM', mentor: 'Dr. Sarah Johnson', type: 'video' },
    { title: 'Community Workshop', time: 'Friday, 3:00 PM', topic: 'Pitch Deck Design', type: 'workshop' },
    { title: 'Assignment Due', time: 'Next Monday', module: 'Business Model Canvas', type: 'deadline' }
  ]

  const quickActions = [
    { title: 'Continue Learning', icon: <BookOpen className="w-5 h-5" />, route: '/student/learning', color: 'bg-violet-500' },
    { title: 'Join Community', icon: <Users className="w-5 h-5" />, route: '/student/community', color: 'bg-pink-500' },
    { title: 'Book Mentorship', icon: <MessageCircle className="w-5 h-5" />, route: '/student/mentorship', color: 'bg-primary-500' },
    { title: 'AI Mentor Chat', icon: <Brain className="w-5 h-5" />, route: '/student/mentorship', color: 'bg-mint-500' }
  ]

  // Show loading state if user data is not available
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
          <p className="text-white/60">Loading dashboard...</p>
        </div>
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
      </div>
    )
  }

  return (
<<<<<<< HEAD
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
              Level {analytics?.level || 1} • {analytics?.xp || 0} XP
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

          <Link to="/student/profile" className="hidden md:block btn-primary px-6 py-2">
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
              <TrendingUp className={`w-8 h-8 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
            </div>
            <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {analytics?.xp || 0}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>Total XP</p>
          </motion.div>

          <motion.div
            className="glass-card p-6 rounded-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`flex items-center justify-between mb-2`}>
              <FileText className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {analytics?.completedAssignments || 0}/{analytics?.totalAssignments || 0}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>Completed</p>
          </motion.div>

          <motion.div
            className="glass-card p-6 rounded-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className={`flex items-center justify-between mb-2`}>
              <Trophy className={`w-8 h-8 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
            </div>
            <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {analytics?.badges || 0}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>Badges</p>
          </motion.div>

          <motion.div
            className="glass-card p-6 rounded-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className={`flex items-center justify-between mb-2`}>
              <BarChart3 className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {analytics?.level || 1}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>Level</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Modules Progress */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Learning Path
            </h2>
            <Link 
              to="/student/learning"
              className={`text-sm flex items-center space-x-1 ${
                isDarkMode ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'
              }`}
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.slice(0, 6).map((module, index) => (
              <motion.div
                key={module._id}
                className="glass-card glass-card-hover p-6 rounded-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold`}>
                    {module.moduleNumber}
                  </div>
                  {!module.isUnlocked && (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}>
                      Locked
                    </span>
                  )}
                </div>
                <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {module.title}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'} mb-4`}>
                  {module.description}
                </p>
                {module.isUnlocked && (
                  <Link to={`/student/learning?module=${module._id}`} className="btn-primary py-2 px-4 text-sm inline-flex items-center space-x-2">
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
=======
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name || 'Student'}! 🚀
          </h1>
          <p className="text-white/60 text-lg">
            Ready to continue your entrepreneurial journey? Let's build something amazing!
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card glass-card-hover p-6 rounded-2xl"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-mint-400">{stat.change}</div>
                </div>
              </div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Learning Progress */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Learning Progress</h2>
              
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((module) => (
                  <div key={module} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold">
                      {module}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-semibold">Module {module}</h3>
                        <span className="text-white/60 text-sm">
                          {module <= 3 ? 'Completed' : module === 4 ? 'In Progress' : 'Locked'}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: module <= 3 ? '100%' : module === 4 ? '60%' : '0%' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activities</h2>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'learning' ? 'bg-violet-500/20' :
                        activity.type === 'achievement' ? 'bg-amber-500/20' :
                        activity.type === 'mentorship' ? 'bg-primary-500/20' :
                        'bg-mint-500/20'
                      }`}>
                        {activity.type === 'learning' && <BookOpen className="w-4 h-4 text-violet-400" />}
                        {activity.type === 'achievement' && <Award className="w-4 h-4 text-amber-400" />}
                        {activity.type === 'mentorship' && <MessageCircle className="w-4 h-4 text-primary-400" />}
                        {activity.type === 'assignment' && <Target className="w-4 h-4 text-mint-400" />}
                      </div>
                      <div>
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-white/60 text-sm">{activity.time}</p>
                      </div>
                    </div>
                    <div className="text-amber-400 font-semibold">{activity.xp}</div>
                  </motion.div>
                ))}
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
            {/* Quick Actions */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="w-full btn-primary text-left flex items-center space-x-3"
                    onClick={() => navigate(action.route)}
                  >
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                      {action.icon}
                    </div>
                    <span>{action.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events</h2>
              
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        event.type === 'video' ? 'bg-primary-500/20' :
                        event.type === 'workshop' ? 'bg-violet-500/20' :
                        'bg-amber-500/20'
                      }`}>
                        {event.type === 'video' && <MessageCircle className="w-4 h-4 text-primary-400" />}
                        {event.type === 'workshop' && <Users className="w-4 h-4 text-violet-400" />}
                        {event.type === 'deadline' && <Calendar className="w-4 h-4 text-amber-400" />}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm">{event.title}</h3>
                        <p className="text-white/60 text-xs">{event.time}</p>
                      </div>
                    </div>
                    {event.mentor && <p className="text-white/80 text-xs">with {event.mentor}</p>}
                    {event.topic && <p className="text-white/80 text-xs">{event.topic}</p>}
                    {event.module && <p className="text-white/80 text-xs">{event.module}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Leaderboard</h2>
              
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((rank) => (
                  <div key={rank} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {rank}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">Student {rank}</p>
                      <p className="text-white/60 text-sm">{1000 - rank * 100} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
