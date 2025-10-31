import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { useThemeStore } from '../../stores/themeStore'
import { 
  Users, 
  TrendingUp, 
  Award,
  BarChart3,
  FileText,
  Target,
  GraduationCap,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react'

const InstitutionDashboard = () => {
  const { user } = useAuthStore()
  const { isDarkMode, toggleTheme } = useThemeStore()
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
    // Fetch institution data
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  const stats = [
    { label: 'Total Students', value: 1247, icon: <Users className="w-6 h-6" />, color: 'text-violet-400', change: '+12%' },
    { label: 'Active Cohorts', value: 8, icon: <GraduationCap className="w-6 h-6" />, color: 'text-primary-400', change: '+2' },
    { label: 'Completion Rate', value: '78%', icon: <TrendingUp className="w-6 h-6" />, color: 'text-mint-400', change: '+5%' },
    { label: 'Certificates Issued', value: 3421, icon: <Award className="w-6 h-6" />, color: 'text-amber-400', change: '+18%' }
  ]

  const cohorts = [
    { name: 'Cohort 2024-A', students: 156, completion: 85, status: 'active' },
    { name: 'Cohort 2024-B', students: 142, completion: 72, status: 'active' },
    { name: 'Cohort 2023-C', students: 128, completion: 95, status: 'completed' },
    { name: 'Cohort 2023-D', students: 134, completion: 88, status: 'completed' }
  ]

  const recentActivities = [
    { action: 'New student enrollment', cohort: 'Cohort 2024-A', time: '2 hours ago' },
    { action: 'Cohort completion', cohort: 'Cohort 2023-C', time: '1 day ago' },
    { action: 'Certificate generation', cohort: 'Cohort 2023-D', time: '2 days ago' },
    { action: 'Progress report generated', cohort: 'Cohort 2024-B', time: '3 days ago' }
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
              Institution • {user?.institution || 'Your Institution'}
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

          <Link to="/institution/profile" className="hidden md:block btn-primary px-6 py-2">
            Profile
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 p-6 max-w-7xl mx-auto">

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
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
          {/* Cohort Management */}
          <motion.div
            className="lg:col-span-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-card p-6 rounded-2xl mb-6">
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Cohort Management
              </h2>
              
              <div className="space-y-4">
                {cohorts.map((cohort, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      isDarkMode ? 'bg-white/5' : 'bg-gray-50'
                    }`}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {cohort.name}
                        </h3>
                        <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                          {cohort.students} students
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                          {cohort.completion}% completion
                        </p>
                        <div className={`w-24 rounded-full h-2 mt-1 ${
                          isDarkMode ? 'bg-white/10' : 'bg-gray-200'
                        }`}>
                          <div 
                            className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${cohort.completion}%` }}
                          />
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        cohort.status === 'active' 
                          ? isDarkMode 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-green-100 text-green-700'
                          : isDarkMode
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {cohort.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Analytics Chart */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Progress Analytics
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
          </motion.div>

          {/* Quick Actions & Reports */}
          <motion.div
            className="space-y-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="glass-card p-6 rounded-2xl">
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </h2>
              
              <div className="space-y-4">
                <Link to="/institution/cohorts" className="w-full btn-primary flex items-center space-x-3">
                  <Users className="w-5 h-5" />
                  <span>Create New Cohort</span>
                </Link>
                
                <Link to="/institution/reports" className="w-full btn-secondary flex items-center space-x-3">
                  <FileText className="w-5 h-5" />
                  <span>Generate Reports</span>
                </Link>
                
                <button className="w-full btn-secondary flex items-center space-x-3">
                  <Award className="w-5 h-5" />
                  <span>Issue Certificates</span>
                </button>
                
                <button className="w-full btn-secondary flex items-center space-x-3">
                  <Target className="w-5 h-5" />
                  <span>Set Goals</span>
                </button>
              </div>
            </div>

            {/* Recent Activities */}
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
                        {activity.cohort}
                      </p>
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                      {activity.time}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* NAAC/NBA Reports */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Compliance Reports
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={isDarkMode ? 'text-white/80' : 'text-gray-700'}>NAAC Report</span>
                  <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>Ready</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDarkMode ? 'text-white/80' : 'text-gray-700'}>NBA Report</span>
                  <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>Ready</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDarkMode ? 'text-white/80' : 'text-gray-700'}>Progress Report</span>
                  <span className={isDarkMode ? 'text-amber-400' : 'text-amber-600'}>In Progress</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDarkMode ? 'text-white/80' : 'text-gray-700'}>Certificate Report</span>
                  <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>Ready</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default InstitutionDashboard
