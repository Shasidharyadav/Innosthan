import { motion } from 'framer-motion'
import { Brain, MessageCircle, Video, Calendar, Star, Clock, Users, BookOpen } from 'lucide-react'
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

  const mentorshipStats = [
    { label: 'Sessions Completed', value: 12, icon: <Video className="w-6 h-6" />, color: 'text-violet-400' },
    { label: 'Mentors Connected', value: 3, icon: <Users className="w-6 h-6" />, color: 'text-primary-400' },
    { label: 'Average Rating', value: '4.8', icon: <Star className="w-6 h-6" />, color: 'text-amber-400' },
    { label: 'Hours Invested', value: '18h', icon: <Clock className="w-6 h-6" />, color: 'text-mint-400' }
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
          <h1 className="text-4xl font-bold text-white mb-2">Mentorship Hub 🤝</h1>
          <p className="text-white/60 text-lg">Connect with expert mentors and accelerate your entrepreneurial growth</p>
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
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
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
              <h2 className="text-2xl font-bold text-white">AI Mentor Assistant</h2>
              <p className="text-white/60">Get instant guidance powered by advanced AI technology</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {aiMentorFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
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
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            Available Mentors
          </button>
          <button
            onClick={() => setActiveTab('sessions')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'sessions'
                ? 'bg-violet-500 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
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
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="glass-card p-6 rounded-2xl mb-6">
                <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
                
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
                <h2 className="text-2xl font-bold text-white mb-6">💡 Mentorship Tips</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-mint-500/20 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-mint-400 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">Prepare Questions</h3>
                      <p className="text-white/60 text-xs">Come with specific questions to maximize your session</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-violet-500/20 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">Be Open to Feedback</h3>
                      <p className="text-white/60 text-xs">Listen actively and implement suggestions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">Follow Up</h3>
                      <p className="text-white/60 text-xs">Send updates on your progress after sessions</p>
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
            <h2 className="text-2xl font-bold text-white mb-6">My Sessions</h2>
            
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
                      <h3 className="text-white font-semibold">{session.mentor}</h3>
                      <p className="text-white/60 text-sm">{session.topic}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
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
