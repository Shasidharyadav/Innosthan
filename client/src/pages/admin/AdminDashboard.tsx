import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import { useAuthStore } from '../../stores/authStore'
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Settings, 
  BarChart3,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react'
import axios from 'axios'

const AdminDashboard = () => {
  const { isDarkMode, toggleTheme } = useThemeStore()
  const { user } = useAuthStore()
  const [viewMode, setViewMode] = useState<'admin' | 'student' | 'mentor' | 'institution'>('admin')
  const [analytics, setAnalytics] = useState<any>(null)
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
      const analyticsRes = await axios.get('/api/analytics/platform').catch(() => ({ data: null }))
      if (analyticsRes.data) {
        setAnalytics(analyticsRes.data)
        // Update stats with real data if available
      }
    } catch (error: any) {
      console.error('Fetch dashboard data error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  const getStatsForView = () => {
    switch (viewMode) {
      case 'student':
        return [
          { label: 'XP Earned', value: 1250, icon: <Award className="w-6 h-6" />, color: 'text-amber-400', change: '+50' },
          { label: 'Modules Completed', value: 3, icon: <BookOpen className="w-6 h-6" />, color: 'text-violet-400', change: '+1' },
          { label: 'Badges Earned', value: 5, icon: <Award className="w-6 h-6" />, color: 'text-pink-400', change: '+2' },
          { label: 'Current Level', value: 4, icon: <TrendingUp className="w-6 h-6" />, color: 'text-primary-400', change: '+1' }
        ]
      case 'mentor':
        return [
          { label: 'Active Mentees', value: 12, icon: <Users className="w-6 h-6" />, color: 'text-violet-400', change: '+2' },
          { label: 'Sessions This Month', value: 24, icon: <BookOpen className="w-6 h-6" />, color: 'text-primary-400', change: '+5' },
          { label: 'Assignments Reviewed', value: 18, icon: <Award className="w-6 h-6" />, color: 'text-mint-400', change: '+3' },
          { label: 'Average Rating', value: '4.9', icon: <TrendingUp className="w-6 h-6" />, color: 'text-amber-400', change: '+0.1' }
        ]
      case 'institution':
        return [
          { label: 'Total Students', value: 1247, icon: <Users className="w-6 h-6" />, color: 'text-violet-400', change: '+12%' },
          { label: 'Active Cohorts', value: 8, icon: <BookOpen className="w-6 h-6" />, color: 'text-primary-400', change: '+2' },
          { label: 'Completion Rate', value: '78%', icon: <TrendingUp className="w-6 h-6" />, color: 'text-mint-400', change: '+5%' },
          { label: 'Certificates Issued', value: 3421, icon: <Award className="w-6 h-6" />, color: 'text-amber-400', change: '+18%' }
        ]
      default: // admin
        return [
          { label: 'Total Students', value: 1247, icon: <Users className="w-6 h-6" />, color: 'text-violet-400', change: '+12%' },
          { label: 'Active Modules', value: 9, icon: <BookOpen className="w-6 h-6" />, color: 'text-primary-400', change: '+2' },
          { label: 'Completion Rate', value: '78%', icon: <TrendingUp className="w-6 h-6" />, color: 'text-mint-400', change: '+5%' },
          { label: 'Badges Awarded', value: 3421, icon: <Award className="w-6 h-6" />, color: 'text-amber-400', change: '+18%' }
        ]
    }
  }

  const recentActivities = [
    { action: 'New student registration', user: 'Alex Kumar', time: '2 minutes ago' },
    { action: 'Module completion', user: 'Sarah Chen', time: '15 minutes ago' },
    { action: 'Badge awarded', user: 'Raj Patel', time: '1 hour ago' },
    { action: 'Mentor session booked', user: 'Maria Garcia', time: '2 hours ago' }
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
              Admin • Platform Management
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

          <Link to="/admin/profile" className="hidden md:block btn-primary px-6 py-2">
            Profile
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 p-6 max-w-7xl mx-auto">

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {getStatsForView().map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 rounded-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={
                  stat.color.includes('violet') ? `${isDarkMode ? 'text-violet-400' : 'text-violet-600'}` :
                  stat.color.includes('primary') || stat.color.includes('blue') ? `${isDarkMode ? 'text-blue-400' : 'text-blue-600'}` :
                  stat.color.includes('mint') || stat.color.includes('green') ? `${isDarkMode ? 'text-green-400' : 'text-green-600'}` :
                  `${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`
                }>
                  {stat.icon}
                </div>
              </div>
              <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>{stat.label}</p>
              {stat.change && (
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {stat.change}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <motion.div
            className="lg:col-span-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {viewMode === 'admin' && (
              <>
                <div className="glass-card p-6 rounded-2xl mb-6">
                  <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Platform Analytics
                  </h2>
                  
                  <div className={`h-64 rounded-xl flex items-center justify-center ${
                    isDarkMode ? 'bg-white/5' : 'bg-gray-100'
                  }`}>
                    <div className="text-center">
                      <BarChart3 className={`w-16 h-16 mx-auto mb-4 ${
                        isDarkMode ? 'text-white/40' : 'text-gray-400'
                      }`} />
                      <p className={isDarkMode ? 'text-white/60' : 'text-gray-600'}>
                        Analytics chart will be rendered here
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Recent Activities
                  </h2>
                  
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={index}
                        className={`flex items-center justify-between p-4 rounded-xl ${
                          isDarkMode ? 'bg-white/5' : 'bg-gray-50'
                        }`}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                      >
                        <div>
                          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {activity.action}
                          </p>
                          <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                            by {activity.user}
                          </p>
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                          {activity.time}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {viewMode === 'student' && (
              <>
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

                <div className="glass-card p-6 rounded-2xl">
                  <h2 className="text-2xl font-bold text-white mb-6">Recent Activities</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div>
                        <p className="text-white font-medium">Completed Module 2: Ideation</p>
                        <p className="text-white/60 text-sm">2 hours ago</p>
                      </div>
                      <div className="text-amber-400 font-semibold">+50 XP</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div>
                        <p className="text-white font-medium">Earned "Problem Solver" Badge</p>
                        <p className="text-white/60 text-sm">1 day ago</p>
                      </div>
                      <div className="text-amber-400 font-semibold">+25 XP</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {viewMode === 'mentor' && (
              <>
                <div className="glass-card p-6 rounded-2xl mb-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Upcoming Sessions</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">Alex Kumar</h3>
                          <p className="text-white/60 text-sm">Business Model Canvas Review</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white/80 text-sm">Today, 2:00 PM</p>
                        <p className="text-violet-400 text-xs">Video Call</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <h2 className="text-2xl font-bold text-white mb-6">Pending Reviews</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div>
                        <h3 className="text-white font-semibold">Maria Garcia</h3>
                        <p className="text-white/60 text-sm">Module 3: Business Model</p>
                        <p className="text-white/40 text-xs">Submitted 2 hours ago</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                          high
                        </span>
                        <button className="btn-primary text-sm px-4 py-2">
                          Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {viewMode === 'institution' && (
              <>
                <div className="glass-card p-6 rounded-2xl mb-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Cohort Management</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">Cohort 2024-A</h3>
                          <p className="text-white/60 text-sm">156 students</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-white/80 text-sm">85% completion</p>
                          <div className="w-24 bg-white/10 rounded-full h-2 mt-1">
                            <div className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full transition-all duration-500" style={{ width: '85%' }} />
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-mint-500/20 text-mint-400 border border-mint-500/30">
                          active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <h2 className="text-2xl font-bold text-white mb-6">Compliance Reports</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">NAAC Report</span>
                      <span className="text-mint-400">Ready</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">NBA Report</span>
                      <span className="text-mint-400">Ready</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Progress Report</span>
                      <span className="text-amber-400">In Progress</span>
                    </div>
                  </div>
                </div>
              </>
            )}
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
                {viewMode === 'admin' && (
                  <>
                    <button className="w-full btn-primary flex items-center space-x-3">
                      <Users className="w-5 h-5" />
                      <span>Manage Users</span>
                    </button>
                    
                    <button className="w-full btn-secondary flex items-center space-x-3">
                      <BookOpen className="w-5 h-5" />
                      <span>Edit Modules</span>
                    </button>
                    
                    <button className="w-full btn-secondary flex items-center space-x-3">
                      <Award className="w-5 h-5" />
                      <span>Manage Badges</span>
                    </button>
                    
                    <button className="w-full btn-secondary flex items-center space-x-3">
                      <Settings className="w-5 h-5" />
                      <span>Platform Settings</span>
                    </button>
                  </>
                )}

                {viewMode === 'student' && (
                  <>
                    <button className="w-full btn-primary flex items-center space-x-3">
                      <BookOpen className="w-5 h-5" />
                      <span>Continue Learning</span>
                    </button>
                    
                    <button className="w-full btn-secondary flex items-center space-x-3">
                      <Users className="w-5 h-5" />
                      <span>Join Community</span>
                    </button>
                    
                    <button className="w-full btn-secondary flex items-center space-x-3">
                      <Award className="w-5 h-5" />
                      <span>View Badges</span>
                    </button>
                    
                    <button className="w-full btn-secondary flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5" />
                      <span>Track Progress</span>
                    </button>
                  </>
                )}

                {viewMode === 'mentor' && (
                  <>
                    <button className="w-full btn-primary flex items-center space-x-3">
                      <Users className="w-5 h-5" />
                      <span>Schedule Session</span>
                    </button>
                    
                    <button className="w-full btn-secondary flex items-center space-x-3">
                      <BookOpen className="w-5 h-5" />
                      <span>Review Assignments</span>
                    </button>
                    
                    <button className="w-full btn-secondary flex items-center space-x-3">
                      <Award className="w-5 h-5" />
                      <span>Award Badges</span>
                    </button>
                    
                    <button className="w-full btn-secondary flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5" />
                      <span>View Analytics</span>
                    </button>
                  </>
                )}

                {viewMode === 'institution' && (
                  <>
                    <button className="w-full btn-primary flex items-center space-x-3">
                      <Users className="w-5 h-5" />
                      <span>Create Cohort</span>
                    </button>
                    
                    <button className="w-full btn-secondary flex items-center space-x-3">
                      <BookOpen className="w-5 h-5" />
                      <span>Generate Reports</span>
                    </button>
                    
                    <button className="w-full btn-secondary flex items-center space-x-3">
                      <Award className="w-5 h-5" />
                      <span>Issue Certificates</span>
                    </button>
                    
                    <button className="w-full btn-secondary flex items-center space-x-3">
                      <Settings className="w-5 h-5" />
                      <span>Set Goals</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* System Status */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">System Status</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">API Status</span>
                  <span className="text-mint-400">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Database</span>
                  <span className="text-mint-400">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">AI Services</span>
                  <span className="text-mint-400">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Storage</span>
                  <span className="text-amber-400">75% Used</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
