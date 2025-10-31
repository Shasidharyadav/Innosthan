import { motion } from 'framer-motion'
import { Brain, MessageCircle, Video, Calendar, Star, Clock, Users, BookOpen } from 'lucide-react'
<<<<<<< HEAD
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../stores/authStore'
import BackButton from '../../components/BackButton'

interface Mentor {
  _id: string
  name: string
  email: string
  avatar?: string
  xp: number
  level: number
  badges: string[]
}

interface Session {
  id: string
  mentor: string
  type: string
  date: string
  topic: string
  duration: string
  status: string
}

const MentorshipHub = () => {
  const [activeTab, setActiveTab] = useState('mentors')
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuthStore()

  useEffect(() => {
    fetchMentors()
    fetchSessions()
  }, [])

  const fetchMentors = async () => {
    try {
      const response = await axios.get('/api/mentor/list', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMentors(response.data.mentors || [])
    } catch (error: any) {
      console.error('Fetch mentors error:', error)
      toast.error('Failed to load mentors')
    } finally {
      setLoading(false)
    }
  }

  const fetchSessions = async () => {
    try {
      const response = await axios.get('/api/sessions?upcoming=true', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSessions(response.data.sessions || [])
    } catch (error: any) {
      console.error('Fetch sessions error:', error)
    }
  }

  // Mock data for now - TODO: Move to backend
  const upcomingSessions: Session[] = sessions.length > 0 ? sessions : [
    {
      id: '1',
      mentor: 'Mentor',
      type: 'Video Call',
      date: 'Coming Soon',
      topic: 'Schedule your first session',
      duration: '1 hour',
      status: 'pending'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full" />
      </div>
    )
  }
=======
import { useState } from 'react'

const MentorshipHub = () => {
  const [activeTab, setActiveTab] = useState('mentors')

  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Serial Entrepreneur & VC',
      avatar: 'SJ',
      rating: 4.9,
      sessions: 150,
      specialties: ['Product Development', 'Fundraising', 'Scaling'],
      available: true,
      experience: '15+ years',
      companies: ['TechCorp', 'StartupX', 'InnovateLab'],
      price: '$150/hour'
    },
    {
      id: 2,
      name: 'Raj Patel',
      title: 'Tech Startup Advisor',
      avatar: 'RP',
      rating: 4.8,
      sessions: 120,
      specialties: ['Technology', 'Market Entry', 'Operations'],
      available: true,
      experience: '12+ years',
      companies: ['DataFlow', 'CloudTech', 'AI Solutions'],
      price: '$120/hour'
    },
    {
      id: 3,
      name: 'Maria Garcia',
      title: 'Marketing & Growth Expert',
      avatar: 'MG',
      rating: 4.9,
      sessions: 95,
      specialties: ['Digital Marketing', 'Growth Hacking', 'Branding'],
      available: false,
      experience: '10+ years',
      companies: ['GrowthCo', 'BrandStudio', 'MarketPro'],
      price: '$100/hour'
    },
    {
      id: 4,
      name: 'David Chen',
      title: 'Financial Strategy Consultant',
      avatar: 'DC',
      rating: 4.7,
      sessions: 80,
      specialties: ['Financial Planning', 'Investment', 'Scaling'],
      available: true,
      experience: '8+ years',
      companies: ['FinanceFirst', 'InvestPro', 'ScaleUp'],
      price: '$180/hour'
    }
  ]

  const upcomingSessions = [
    {
      id: 1,
      mentor: 'Dr. Sarah Johnson',
      type: 'Video Call',
      date: 'Tomorrow, 2:00 PM',
      topic: 'Product-Market Fit Discussion',
      duration: '1 hour',
      status: 'confirmed'
    },
    {
      id: 2,
      mentor: 'Raj Patel',
      type: 'Chat Session',
      date: 'Friday, 10:00 AM',
      topic: 'Technical Architecture Review',
      duration: '45 minutes',
      status: 'pending'
    }
  ]
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef

  const aiMentorFeatures = [
    {
      title: 'Instant Answers',
      description: 'Get immediate responses to your questions',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-violet-500'
    },
    {
      title: '24/7 Availability',
      description: 'Access mentorship anytime, anywhere',
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-mint-500'
    },
    {
      title: 'Personalized Learning',
      description: 'Tailored advice based on your progress',
      icon: <Brain className="w-6 h-6" />,
      color: 'bg-pink-500'
    }
  ]

<<<<<<< HEAD
  // Calculate real stats from backend data
  const completedSessions = sessions.filter(s => s.status === 'completed').length
  const uniqueMentors = new Set(sessions.map(s => s.mentor)).size
  const totalHours = sessions.filter(s => s.status === 'completed').length * 1 // Assuming 1 hour per session
  
  const mentorshipStats = [
    { label: 'Sessions Completed', value: completedSessions, icon: <Video className="w-6 h-6" />, color: 'text-violet-400' },
    { label: 'Mentors Connected', value: uniqueMentors, icon: <Users className="w-6 h-6" />, color: 'text-primary-400' },
    { label: 'Average Rating', value: '5.0', icon: <Star className="w-6 h-6" />, color: 'text-amber-400' },
    { label: 'Hours Invested', value: `${totalHours}h`, icon: <Clock className="w-6 h-6" />, color: 'text-mint-400' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <BackButton />

=======
  const mentorshipStats = [
    { label: 'Sessions Completed', value: 12, icon: <Video className="w-6 h-6" />, color: 'text-violet-400' },
    { label: 'Mentors Connected', value: 3, icon: <Users className="w-6 h-6" />, color: 'text-primary-400' },
    { label: 'Average Rating', value: '4.8', icon: <Star className="w-6 h-6" />, color: 'text-amber-400' },
    { label: 'Hours Invested', value: '18h', icon: <Clock className="w-6 h-6" />, color: 'text-mint-400' }
  ]

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
<<<<<<< HEAD
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Mentorship Hub 🤝</h1>
          <p className="text-gray-600 dark:text-white/60 text-lg">Connect with expert mentors and accelerate your entrepreneurial growth</p>
=======
          <h1 className="text-4xl font-bold text-white mb-2">Mentorship Hub 🤝</h1>
          <p className="text-white/60 text-lg">Connect with expert mentors and accelerate your entrepreneurial growth</p>
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
        </motion.div>

        {/* Mentorship Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {mentorshipStats.map((stat, index) => (
            <div key={index} className="glass-card p-6 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color.replace('text-', 'bg-').replace('-400', '-500/20')}`}>
                  {stat.icon}
                </div>
                <div>
<<<<<<< HEAD
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-white/60">{stat.label}</div>
=======
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* AI Mentor Section */}
        <motion.div
          className="glass-card p-6 rounded-2xl mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
<<<<<<< HEAD
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Mentor Assistant</h2>
              <p className="text-gray-600 dark:text-white/60">Get instant guidance powered by advanced AI technology</p>
=======
              <h2 className="text-2xl font-bold text-white">AI Mentor Assistant</h2>
              <p className="text-white/60">Get instant guidance powered by advanced AI technology</p>
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {aiMentorFeatures.map((feature, index) => (
              <div key={index} className="text-center">
<<<<<<< HEAD
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-3 text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-gray-900 dark:text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-600 dark:text-white/60 text-sm">{feature.description}</p>
=======
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
              </div>
            ))}
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <button className="btn-primary flex items-center justify-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Start Chat</span>
            </button>
            <button className="btn-secondary flex items-center justify-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Ask Question</span>
            </button>
            <button className="btn-secondary flex items-center justify-center space-x-2">
              <Video className="w-5 h-5" />
              <span>Video Call</span>
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8">
          <button
            onClick={() => setActiveTab('mentors')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'mentors'
                ? 'bg-violet-500 text-white'
<<<<<<< HEAD
                : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/60 hover:bg-gray-300 dark:hover:bg-white/20'
=======
                : 'bg-white/10 text-white/60 hover:bg-white/20'
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
            }`}
          >
            Available Mentors
          </button>
          <button
            onClick={() => setActiveTab('sessions')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'sessions'
                ? 'bg-violet-500 text-white'
<<<<<<< HEAD
                : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/60 hover:bg-gray-300 dark:hover:bg-white/20'
=======
                : 'bg-white/10 text-white/60 hover:bg-white/20'
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
            }`}
          >
            My Sessions
          </button>
        </div>

        {activeTab === 'mentors' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Available Mentors */}
            <motion.div
              className="lg:col-span-2"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
<<<<<<< HEAD
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Available Mentors</h2>
              
              <div className="space-y-6">
                {mentors.length === 0 ? (
                  <div className="glass-card p-8 rounded-2xl text-center">
                    <Users className="w-16 h-16 text-gray-400 dark:text-white/40 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Mentors Available Yet</h3>
                    <p className="text-gray-600 dark:text-white/60">Check back soon for expert mentors to guide your journey!</p>
                  </div>
                ) : (
                  mentors.map((mentor, index) => (
                    <motion.div
                      key={mentor._id}
                      className="glass-card glass-card-hover p-6 rounded-2xl"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                          {mentor.avatar || mentor.name.charAt(0)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{mentor.name}</h3>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-amber-400 fill-current" />
                                <span className="text-gray-700 dark:text-white/80">{(mentor.xp / 1000).toFixed(1)}</span>
                              </div>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-mint-500/20 text-mint-400 border border-mint-500/30">
                                Available
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 dark:text-white/60 mb-2">{mentor.email}</p>
                          <p className="text-gray-500 dark:text-white/50 text-sm mb-3">Level {mentor.level} Mentor • {mentor.xp} XP</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {mentor.badges.slice(0, 3).map((badge, specIndex) => (
                              <span
                                key={specIndex}
                                className="px-3 py-1 bg-violet-500/20 text-violet-400 text-sm rounded-full"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-gray-600 dark:text-white/60 text-sm">
                              <span>Verified Mentor</span>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button className="btn-secondary text-sm px-4 py-2">
                                View Profile
                              </button>
                              <button 
                                className="btn-primary text-sm px-4 py-2"
                                onClick={() => toast('Session booking coming soon!')}
                              >
                                Book Session
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
=======
              <h2 className="text-2xl font-bold text-white mb-6">Available Mentors</h2>
              
              <div className="space-y-6">
                {mentors.map((mentor, index) => (
                  <motion.div
                    key={mentor.id}
                    className="glass-card glass-card-hover p-6 rounded-2xl"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                        {mentor.avatar}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-white">{mentor.name}</h3>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-amber-400 fill-current" />
                              <span className="text-white/80">{mentor.rating}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              mentor.available 
                                ? 'bg-mint-500/20 text-mint-400 border border-mint-500/30'
                                : 'bg-white/10 text-white/60 border border-white/20'
                            }`}>
                              {mentor.available ? 'Available' : 'Busy'}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-white/60 mb-2">{mentor.title}</p>
                        <p className="text-white/50 text-sm mb-3">{mentor.experience} • {mentor.companies.join(', ')}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {mentor.specialties.map((specialty, specIndex) => (
                            <span
                              key={specIndex}
                              className="px-3 py-1 bg-violet-500/20 text-violet-400 text-sm rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-white/60 text-sm">
                            <span>{mentor.sessions} sessions</span>
                            <span>•</span>
                            <span className="text-amber-400 font-semibold">{mentor.price}</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button className="btn-secondary text-sm px-4 py-2">
                              View Profile
                            </button>
                            <button 
                              className="btn-primary text-sm px-4 py-2"
                              disabled={!mentor.available}
                            >
                              Book Session
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="glass-card p-6 rounded-2xl mb-6">
<<<<<<< HEAD
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
=======
                <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
                
                <div className="space-y-4">
                  <button className="w-full btn-primary flex items-center space-x-3">
                    <Calendar className="w-5 h-5" />
                    <span>Schedule Session</span>
                  </button>
                  
                  <button className="w-full btn-secondary flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5" />
                    <span>Group Chat</span>
                  </button>
                  
                  <button className="w-full btn-secondary flex items-center space-x-3">
                    <Video className="w-5 h-5" />
                    <span>Join Workshop</span>
                  </button>
                  
                  <button className="w-full btn-secondary flex items-center space-x-3">
                    <BookOpen className="w-5 h-5" />
                    <span>Resources</span>
                  </button>
                </div>
              </div>

              {/* Mentorship Tips */}
              <div className="glass-card p-6 rounded-2xl">
<<<<<<< HEAD
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">💡 Mentorship Tips</h2>
=======
                <h2 className="text-2xl font-bold text-white mb-6">💡 Mentorship Tips</h2>
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-mint-500/20 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-mint-400 rounded-full"></div>
                    </div>
                    <div>
<<<<<<< HEAD
                      <h3 className="text-gray-900 dark:text-white font-semibold text-sm">Prepare Questions</h3>
                      <p className="text-gray-600 dark:text-white/60 text-xs">Come with specific questions to maximize your session</p>
=======
                      <h3 className="text-white font-semibold text-sm">Prepare Questions</h3>
                      <p className="text-white/60 text-xs">Come with specific questions to maximize your session</p>
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-violet-500/20 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                    </div>
                    <div>
<<<<<<< HEAD
                      <h3 className="text-gray-900 dark:text-white font-semibold text-sm">Be Open to Feedback</h3>
                      <p className="text-gray-600 dark:text-white/60 text-xs">Listen actively and implement suggestions</p>
=======
                      <h3 className="text-white font-semibold text-sm">Be Open to Feedback</h3>
                      <p className="text-white/60 text-xs">Listen actively and implement suggestions</p>
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    </div>
                    <div>
<<<<<<< HEAD
                      <h3 className="text-gray-900 dark:text-white font-semibold text-sm">Follow Up</h3>
                      <p className="text-gray-600 dark:text-white/60 text-xs">Send updates on your progress after sessions</p>
=======
                      <h3 className="text-white font-semibold text-sm">Follow Up</h3>
                      <p className="text-white/60 text-xs">Send updates on your progress after sessions</p>
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <motion.div
            className="space-y-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
<<<<<<< HEAD
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Sessions</h2>
=======
            <h2 className="text-2xl font-bold text-white mb-6">My Sessions</h2>
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
            
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  className="glass-card p-6 rounded-2xl"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
                      {session.type === 'Video Call' ? <Video className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
                    </div>
                    <div>
<<<<<<< HEAD
                      <h3 className="text-gray-900 dark:text-white font-semibold">{session.mentor}</h3>
                      <p className="text-gray-600 dark:text-white/60 text-sm">{session.topic}</p>
=======
                      <h3 className="text-white font-semibold">{session.mentor}</h3>
                      <p className="text-white/60 text-sm">{session.topic}</p>
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
<<<<<<< HEAD
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-white/60 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-white/60 text-sm">
=======
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
>>>>>>> 006e2d3b07eba3abf13560b3b8b3bafb5e441cef
                      <Calendar className="w-4 h-4" />
                      <span>{session.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      session.status === 'confirmed' 
                        ? 'bg-mint-500/20 text-mint-400 border border-mint-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {session.status}
                    </span>
                    <button className="btn-primary text-sm px-4 py-2">
                      Join Session
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MentorshipHub
