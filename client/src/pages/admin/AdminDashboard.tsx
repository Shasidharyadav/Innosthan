import { motion } from 'framer-motion'
import { useState } from 'react'
import { Users, BookOpen, TrendingUp, Award, Settings, BarChart3 } from 'lucide-react'

const AdminDashboard = () => {
  const [viewMode, setViewMode] = useState<'admin' | 'student' | 'mentor' | 'institution'>('admin')

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
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {viewMode === 'admin' && 'Admin Dashboard'}
                {viewMode === 'student' && 'Student View'}
                {viewMode === 'mentor' && 'Mentor View'}
                {viewMode === 'institution' && 'Institution View'}
              </h1>
              <p className="text-white/60 text-lg">
                {viewMode === 'admin' && 'Manage your Innosthan platform'}
                {viewMode === 'student' && 'Student perspective of the platform'}
                {viewMode === 'mentor' && 'Mentor perspective of the platform'}
                {viewMode === 'institution' && 'Institution perspective of the platform'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white/60 text-sm mr-4">View as:</span>
              <div className="flex bg-white/10 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('admin')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'admin' 
                      ? 'bg-violet-500 text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Admin
                </button>
                <button
                  onClick={() => setViewMode('student')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'student' 
                      ? 'bg-violet-500 text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => setViewMode('mentor')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'mentor' 
                      ? 'bg-violet-500 text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Mentor
                </button>
                <button
                  onClick={() => setViewMode('institution')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'institution' 
                      ? 'bg-violet-500 text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Institution
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {getStatsForView().map((stat, index) => (
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
                  <h2 className="text-2xl font-bold text-white mb-6">Platform Analytics</h2>
                  
                  <div className="h-64 bg-white/5 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-white/40 mx-auto mb-4" />
                      <p className="text-white/60">Analytics chart will be rendered here</p>
                    </div>
                  </div>
                </div>

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
                          <p className="text-white/60 text-sm">by {activity.user}</p>
                        </div>
                        <div className="text-white/60 text-sm">{activity.time}</div>
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
