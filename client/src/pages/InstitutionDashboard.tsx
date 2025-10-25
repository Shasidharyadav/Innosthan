import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { 
  Users, 
  TrendingUp, 
  Award,
  BarChart3,
  FileText,
  Target,
  GraduationCap,
  ArrowLeft
} from 'lucide-react'

const InstitutionDashboard = () => {
  const { user } = useAuthStore()

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
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Institution Dashboard
              </h1>
              <p className="text-white/60 text-lg">
                Manage cohorts and track student progress for {user?.institution || 'your institution'}
              </p>
            </div>
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Student View</span>
            </Link>
          </div>
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
          {/* Cohort Management */}
          <motion.div
            className="lg:col-span-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-card p-6 rounded-2xl mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">Cohort Management</h2>
              
              <div className="space-y-4">
                {cohorts.map((cohort, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{cohort.name}</h3>
                        <p className="text-white/60 text-sm">{cohort.students} students</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-white/80 text-sm">{cohort.completion}% completion</p>
                        <div className="w-24 bg-white/10 rounded-full h-2 mt-1">
                          <div 
                            className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${cohort.completion}%` }}
                          />
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        cohort.status === 'active' 
                          ? 'bg-mint-500/20 text-mint-400 border border-mint-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
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
              <h2 className="text-2xl font-bold text-white mb-6">Progress Analytics</h2>
              
              <div className="h-64 bg-white/5 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-white/40 mx-auto mb-4" />
                  <p className="text-white/60">Analytics chart will be rendered here</p>
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
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              
              <div className="space-y-4">
                <button className="w-full btn-primary flex items-center space-x-3">
                  <Users className="w-5 h-5" />
                  <span>Create New Cohort</span>
                </button>
                
                <button className="w-full btn-secondary flex items-center space-x-3">
                  <FileText className="w-5 h-5" />
                  <span>Generate Reports</span>
                </button>
                
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
                      <p className="text-white/60 text-sm">{activity.cohort}</p>
                    </div>
                    <div className="text-white/60 text-sm">{activity.time}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* NAAC/NBA Reports */}
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
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Certificate Report</span>
                  <span className="text-mint-400">Ready</span>
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
