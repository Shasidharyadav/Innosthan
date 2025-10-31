import { motion } from 'framer-motion'
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
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
