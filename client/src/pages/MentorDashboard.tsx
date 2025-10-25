import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { 
  Users, 
  BookOpen, 
  MessageCircle, 
  Calendar,
  Award,
  CheckCircle,
  Star,
  ArrowLeft
} from 'lucide-react'

const MentorDashboard = () => {
  const { user } = useAuthStore()

  const stats = [
    { label: 'Active Mentees', value: 12, icon: <Users className="w-6 h-6" />, color: 'text-violet-400' },
    { label: 'Sessions This Month', value: 24, icon: <Calendar className="w-6 h-6" />, color: 'text-primary-400' },
    { label: 'Assignments Reviewed', value: 18, icon: <CheckCircle className="w-6 h-6" />, color: 'text-mint-400' },
    { label: 'Average Rating', value: '4.9', icon: <Star className="w-6 h-6" />, color: 'text-amber-400' }
  ]

  const upcomingSessions = [
    { mentee: 'Alex Kumar', time: 'Today, 2:00 PM', topic: 'Business Model Canvas Review', type: 'Video Call' },
    { mentee: 'Sarah Chen', time: 'Tomorrow, 10:00 AM', topic: 'Pitch Deck Feedback', type: 'Chat Session' },
    { mentee: 'Raj Patel', time: 'Friday, 3:00 PM', topic: 'Market Validation Strategy', type: 'Video Call' }
  ]

  const pendingReviews = [
    { mentee: 'Maria Garcia', assignment: 'Module 3: Business Model', submitted: '2 hours ago', priority: 'high' },
    { mentee: 'John Doe', assignment: 'Module 2: Ideation', submitted: '1 day ago', priority: 'medium' },
    { mentee: 'Lisa Wang', assignment: 'Module 4: MVP Development', submitted: '2 days ago', priority: 'low' }
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
                Welcome back, {user?.name || 'Mentor'}!
              </h1>
              <p className="text-white/60 text-lg">
                Guide and inspire the next generation of entrepreneurs
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
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Sessions */}
          <motion.div
            className="lg:col-span-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-card p-6 rounded-2xl mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">Upcoming Sessions</h2>
              
              <div className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{session.mentee}</h3>
                        <p className="text-white/60 text-sm">{session.topic}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/80 text-sm">{session.time}</p>
                      <p className="text-violet-400 text-xs">{session.type}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pending Reviews */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Pending Reviews</h2>
              
              <div className="space-y-4">
                {pendingReviews.map((review, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <div>
                      <h3 className="text-white font-semibold">{review.mentee}</h3>
                      <p className="text-white/60 text-sm">{review.assignment}</p>
                      <p className="text-white/40 text-xs">Submitted {review.submitted}</p>
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
                <button className="w-full btn-primary flex items-center space-x-3">
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Session</span>
                </button>
                
                <button className="w-full btn-secondary flex items-center space-x-3">
                  <BookOpen className="w-5 h-5" />
                  <span>Review Assignments</span>
                </button>
                
                <button className="w-full btn-secondary flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat with Mentees</span>
                </button>
                
                <button className="w-full btn-secondary flex items-center space-x-3">
                  <Award className="w-5 h-5" />
                  <span>Award Badges</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-mint-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-mint-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">Reviewed Alex's Business Model</p>
                    <p className="text-white/60 text-xs">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-violet-500/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">Completed session with Sarah</p>
                    <p className="text-white/60 text-xs">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">Awarded "Problem Solver" badge</p>
                    <p className="text-white/60 text-xs">2 days ago</p>
                  </div>
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
