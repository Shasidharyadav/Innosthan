import { motion } from 'framer-motion'
import { Brain, MessageCircle, Video, Calendar, Star, Clock } from 'lucide-react'

const MentorshipHub = () => {
  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Serial Entrepreneur & VC',
      avatar: 'SJ',
      rating: 4.9,
      sessions: 150,
      specialties: ['Product Development', 'Fundraising', 'Scaling'],
      available: true
    },
    {
      id: 2,
      name: 'Raj Patel',
      title: 'Tech Startup Advisor',
      avatar: 'RP',
      rating: 4.8,
      sessions: 120,
      specialties: ['Technology', 'Market Entry', 'Operations'],
      available: true
    },
    {
      id: 3,
      name: 'Maria Garcia',
      title: 'Marketing & Growth Expert',
      avatar: 'MG',
      rating: 4.9,
      sessions: 95,
      specialties: ['Digital Marketing', 'Growth Hacking', 'Branding'],
      available: false
    }
  ]

  const upcomingSessions = [
    {
      id: 1,
      mentor: 'Dr. Sarah Johnson',
      type: 'Video Call',
      date: 'Tomorrow, 2:00 PM',
      topic: 'Product-Market Fit Discussion'
    },
    {
      id: 2,
      mentor: 'Raj Patel',
      type: 'Chat Session',
      date: 'Friday, 10:00 AM',
      topic: 'Technical Architecture Review'
    }
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
          <h1 className="text-4xl font-bold text-white mb-2">Mentorship Hub</h1>
          <p className="text-white/60 text-lg">Connect with expert mentors and accelerate your growth</p>
        </motion.div>

        {/* AI Mentor Chat */}
        <motion.div
          className="glass-card p-6 rounded-2xl mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">AI Mentor</h2>
              <p className="text-white/60">Get instant guidance powered by GPT-4</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <button className="btn-primary flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Start Chat</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Ask Question</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Video className="w-5 h-5" />
              <span>Video Call</span>
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Mentors */}
          <motion.div
            className="lg:col-span-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
                      
                      <p className="text-white/60 mb-3">{mentor.title}</p>
                      
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
                          <span>Available now</span>
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

          {/* Upcoming Sessions */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="glass-card p-6 rounded-2xl mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">Upcoming Sessions</h2>
              
              <div className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    className="p-4 bg-white/5 rounded-xl"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
                        {session.type === 'Video Call' ? <Video className="w-4 h-4 text-white" /> : <MessageCircle className="w-4 h-4 text-white" />}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{session.mentor}</h3>
                        <p className="text-white/60 text-sm">{session.topic}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{session.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-6 rounded-2xl">
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
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default MentorshipHub
