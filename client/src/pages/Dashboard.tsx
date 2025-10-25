import { motion } from 'framer-motion'
import { useAuthStore } from '../stores/authStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Target, 
  Calendar,
  Award,
  Zap
} from 'lucide-react'

const Dashboard = () => {
  const { user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  // Debug logging
  console.log('Dashboard - User:', user)
  console.log('Dashboard - isAuthenticated:', isAuthenticated)

  // Redirect non-students to their appropriate dashboards
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      switch (user.role) {
        case 'admin':
          navigate('/admin')
          break
        case 'mentor':
          navigate('/mentor')
          break
        case 'institution':
          navigate('/institution')
          break
        default:
          // Student - stay on dashboard
          break
      }
    }
  }, [isAuthenticated, user, navigate])

  const stats = [
    { label: 'XP Earned', value: user?.xp || 0, icon: <Zap className="w-6 h-6" />, color: 'text-amber-400' },
    { label: 'Modules Completed', value: 3, icon: <BookOpen className="w-6 h-6" />, color: 'text-violet-400' },
    { label: 'Badges Earned', value: user?.badges?.length || 0, icon: <Award className="w-6 h-6" />, color: 'text-pink-400' },
    { label: 'Current Level', value: user?.level || 1, icon: <Trophy className="w-6 h-6" />, color: 'text-primary-400' }
  ]

  const recentActivities = [
    { action: 'Completed Module 2: Ideation', time: '2 hours ago', xp: '+50 XP' },
    { action: 'Earned "Problem Solver" Badge', time: '1 day ago', xp: '+25 XP' },
    { action: 'Attended Mentorship Session', time: '3 days ago', xp: '+30 XP' },
    { action: 'Submitted Assignment', time: '1 week ago', xp: '+40 XP' }
  ]

  // Show loading state if user data is not available
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
          <p className="text-white/60">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
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
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-white/60 text-lg">
            Continue your entrepreneurial journey
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
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Overview */}
          <motion.div
            className="lg:col-span-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-card p-6 rounded-2xl mb-6">
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
                    <div>
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-white/60 text-sm">{activity.time}</p>
                    </div>
                    <div className="text-amber-400 font-semibold">{activity.xp}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="space-y-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              
              <div className="space-y-4">
                <button className="w-full btn-primary text-left flex items-center space-x-3">
                  <BookOpen className="w-5 h-5" />
                  <span>Continue Learning</span>
                </button>
                
                <button className="w-full btn-secondary text-left flex items-center space-x-3">
                  <Users className="w-5 h-5" />
                  <span>Join Community</span>
                </button>
                
                <button className="w-full btn-secondary text-left flex items-center space-x-3">
                  <Target className="w-5 h-5" />
                  <span>Set Goals</span>
                </button>
                
                <button className="w-full btn-secondary text-left flex items-center space-x-3">
                  <Calendar className="w-5 h-5" />
                  <span>View Schedule</span>
                </button>
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
        </div>
      </div>
    </div>
  )
}

export default Dashboard
