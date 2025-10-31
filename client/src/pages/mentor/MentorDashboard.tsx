import { motion } from 'framer-motion'
<<<<<<< HEAD
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuthStore } from '../../stores/authStore'
import { useThemeStore } from '../../stores/themeStore'
import axios from 'axios'
=======
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
import { 
  Users, 
  Calendar, 
  CheckCircle,
  Star,
  MessageCircle,
  Award,
  TrendingUp,
  Clock,
  BookOpen,
<<<<<<< HEAD
  Video,
  Sun,
  Moon,
  Plus
} from 'lucide-react'

const MentorDashboard = () => {
  const { user, token } = useAuthStore()
  const { isDarkMode, toggleTheme } = useThemeStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    activeMentees: 0,
    sessionsThisMonth: 0,
    assignmentsReviewed: 0,
    averageRating: '0.0'
  })

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
      const [usersRes, sessionsRes] = await Promise.all([
        axios.get('/api/users', {
          headers: { Authorization: `Bearer ${token}` },
          params: { role: 'student' }
        }),
        axios.get('/api/sessions', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])

      setStats({
        activeMentees: usersRes.data.users?.length || 0,
        sessionsThisMonth: sessionsRes.data.sessions?.length || 0,
        assignmentsReviewed: 0,
        averageRating: '5.0'
      })
    } catch (error) {
      console.error('Fetch dashboard data error:', error)
    } finally {
      setLoading(false)
    }
  }

  const statsData = [
    { label: 'Active Mentees', value: stats.activeMentees, icon: <Users className="w-6 h-6" />, color: 'text-violet-400', change: 'Total students' },
    { label: 'Sessions This Month', value: stats.sessionsThisMonth, icon: <Calendar className="w-6 h-6" />, color: 'text-primary-400', change: 'All sessions' },
    { label: 'Assignments Reviewed', value: stats.assignmentsReviewed, icon: <CheckCircle className="w-6 h-6" />, color: 'text-mint-400', change: 'Pending review' },
    { label: 'Average Rating', value: stats.averageRating, icon: <Star className="w-6 h-6" />, color: 'text-amber-400', change: 'From students' }
=======
  Video
} from 'lucide-react'

const MentorDashboard = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const stats = [
    { label: 'Active Mentees', value: 12, icon: <Users className="w-6 h-6" />, color: 'text-violet-400', change: '+2 this month' },
    { label: 'Sessions This Month', value: 24, icon: <Calendar className="w-6 h-6" />, color: 'text-primary-400', change: '+5 from last month' },
    { label: 'Assignments Reviewed', value: 18, icon: <CheckCircle className="w-6 h-6" />, color: 'text-mint-400', change: '+3 pending' },
    { label: 'Average Rating', value: '4.9', icon: <Star className="w-6 h-6" />, color: 'text-amber-400', change: '156 reviews' }
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
  ]

  const upcomingSessions = [
    { 
      id: 1,
      mentee: 'Alex Kumar', 
      time: 'Today, 2:00 PM', 
      topic: 'Business Model Canvas Review', 
      type: 'Video Call',
      duration: '1 hour',
      status: 'confirmed',
      notes: 'Review BMC for SaaS startup'
    },
    { 
      id: 2,
      mentee: 'Sarah Chen', 
      time: 'Tomorrow, 10:00 AM', 
      topic: 'Pitch Deck Feedback', 
      type: 'Chat Session',
      duration: '45 minutes',
      status: 'pending',
      notes: 'First draft review'
    },
    { 
      id: 3,
      mentee: 'Raj Patel', 
      time: 'Friday, 3:00 PM', 
      topic: 'Market Validation Strategy', 
      type: 'Video Call',
      duration: '1 hour',
      status: 'confirmed',
      notes: 'Customer discovery approach'
    }
  ]

  const pendingReviews = [
    { 
      mentee: 'Maria Garcia', 
      assignment: 'Module 3: Business Model', 
      submitted: '2 hours ago', 
      priority: 'high',
      module: 3,
      deadline: 'Today'
    },
    { 
      mentee: 'John Doe', 
      assignment: 'Module 2: Ideation', 
      submitted: '1 day ago', 
      priority: 'medium',
      module: 2,
      deadline: 'Tomorrow'
    },
    { 
      mentee: 'Lisa Wang', 
      assignment: 'Module 4: MVP Development', 
      submitted: '2 days ago', 
      priority: 'low',
      module: 4,
      deadline: 'In 2 days'
    }
  ]

  const recentActivities = [
    {
      action: 'Reviewed assignment',
      mentee: 'Alex Kumar',
      time: '2 hours ago',
      type: 'review',
      icon: <CheckCircle className="w-4 h-4 text-mint-400" />
    },
    {
      action: 'Completed session',
      mentee: 'Sarah Chen',
      time: '1 day ago',
      type: 'session',
      icon: <Video className="w-4 h-4 text-violet-400" />
    },
    {
      action: 'Awarded badge',
      mentee: 'Raj Patel',
      time: '2 days ago',
      type: 'badge',
      icon: <Award className="w-4 h-4 text-amber-400" />
    },
    {
      action: 'Sent feedback',
      mentee: 'Maria Garcia',
      time: '3 days ago',
      type: 'feedback',
      icon: <MessageCircle className="w-4 h-4 text-primary-400" />
    }
  ]

  const menteeProgress = [
    { name: 'Alex Kumar', progress: 75, modules: 6, xp: 850, trend: 'up' },
    { name: 'Sarah Chen', progress: 60, modules: 5, xp: 720, trend: 'up' },
    { name: 'Raj Patel', progress: 45, modules: 4, xp: 580, trend: 'stable' },
    { name: 'Maria Garcia', progress: 85, modules: 7, xp: 950, trend: 'up' }
  ]

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user?.name || 'Mentor'}! 🎓
            </h1>
            <p className="text-gray-600 dark:text-white/60 text-lg">
              Guide and inspire the next generation of entrepreneurs
            </p>
          </motion.div>
          
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 transition-colors shadow-md"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/mentor/courses" className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">My Courses</div>
                <div className="text-sm text-gray-600 dark:text-white/60">Create & manage</div>
              </div>
            </div>
          </Link>

          <Link to="/mentor/students" className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-mint-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">My Students</div>
                <div className="text-sm text-gray-600 dark:text-white/60">Guide & track</div>
              </div>
            </div>
          </Link>

          <Link to="/mentor/sessions" className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">Sessions</div>
                <div className="text-sm text-gray-600 dark:text-white/60">Schedule meetings</div>
              </div>
            </div>
          </Link>

          <Link to="/mentor/profile" className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">Profile</div>
                <div className="text-sm text-gray-600 dark:text-white/60">View & edit</div>
              </div>
            </div>
          </Link>
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
            Welcome back, {user?.name || 'Mentor'}! 🎓
          </h1>
          <p className="text-white/60 text-lg">
            Guide and inspire the next generation of entrepreneurs
          </p>
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
<<<<<<< HEAD
          {statsData.map((stat, index) => (
=======
          {stats.map((stat, index) => (
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
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
            {/* Upcoming Sessions */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Upcoming Sessions</h2>
                <button 
                  className="btn-secondary text-sm"
                  onClick={() => navigate('/mentor/sessions')}
                >
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
                        {session.type === 'Video Call' ? <Video className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{session.mentee}</h3>
                        <p className="text-white/60 text-sm">{session.topic}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1 text-white/50 text-xs">
                            <Clock className="w-3 h-3" />
                            <span>{session.duration}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            session.status === 'confirmed' 
                              ? 'bg-mint-500/20 text-mint-400 border border-mint-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {session.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/80 text-sm font-medium">{session.time}</p>
                      <p className="text-violet-400 text-xs">{session.type}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pending Reviews */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Pending Reviews</h2>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {pendingReviews.length} pending
                </span>
              </div>
              
              <div className="space-y-4">
                {pendingReviews.map((review, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {review.mentee.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{review.mentee}</h3>
                          <p className="text-white/60 text-sm">{review.assignment}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 ml-11">
                        <p className="text-white/40 text-xs">Submitted {review.submitted}</p>
                        <p className="text-white/40 text-xs">Due: {review.deadline}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        review.priority === 'high' 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : review.priority === 'medium'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {review.priority}
                      </span>
                      <button className="btn-primary text-sm px-4 py-2">
                        Review
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mentee Progress */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Mentee Progress</h2>
                <button 
                  className="btn-secondary text-sm"
                  onClick={() => navigate('/mentor/students')}
                >
                  View All Students
                </button>
              </div>
              
              <div className="space-y-4">
                {menteeProgress.map((mentee, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {mentee.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{mentee.name}</h3>
                          <p className="text-white/60 text-sm">{mentee.modules} modules • {mentee.xp} XP</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className={`w-4 h-4 ${
                          mentee.trend === 'up' ? 'text-mint-400' : 'text-white/40'
                        }`} />
                        <span className="text-white font-semibold">{mentee.progress}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${mentee.progress}%` }}
                      />
                    </div>
                  </div>
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
                <button 
                  className="w-full btn-primary flex items-center space-x-3"
                  onClick={() => navigate('/mentor/sessions')}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Session</span>
                </button>
                
                <button className="w-full btn-secondary flex items-center space-x-3">
                  <BookOpen className="w-5 h-5" />
                  <span>Review Assignments</span>
                </button>
                
                <button className="w-full btn-secondary flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5" />
                  <span>Message Students</span>
                </button>
                
                <button className="w-full btn-secondary flex items-center space-x-3">
                  <Award className="w-5 h-5" />
                  <span>Award Badges</span>
                </button>

                <button 
                  className="w-full btn-secondary flex items-center space-x-3"
                  onClick={() => navigate('/mentor/students')}
                >
                  <Users className="w-5 h-5" />
                  <span>Manage Students</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'review' ? 'bg-mint-500/20' :
                      activity.type === 'session' ? 'bg-violet-500/20' :
                      activity.type === 'badge' ? 'bg-amber-500/20' :
                      'bg-primary-500/20'
                    }`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{activity.action}</p>
                      <p className="text-white/60 text-xs">{activity.mentee}</p>
                      <p className="text-white/40 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* This Week's Summary */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">This Week</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Sessions Conducted</span>
                  <span className="text-white font-semibold">6</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Assignments Reviewed</span>
                  <span className="text-white font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Badges Awarded</span>
                  <span className="text-white font-semibold">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Hours Mentored</span>
                  <span className="text-white font-semibold">18h</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default MentorDashboard
