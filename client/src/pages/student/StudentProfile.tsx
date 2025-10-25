import { motion } from 'framer-motion'
import { useAuthStore } from '../../stores/authStore'
import { Mail, Award, Calendar, Edit, Save, X, Trophy, Zap, BookOpen, Users, Target, Clock } from 'lucide-react'
import { useState } from 'react'

const StudentProfile = () => {
  const { user, updateProfile } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })

  const handleSave = async () => {
    try {
      await updateProfile(editData)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || ''
    })
    setIsEditing(false)
  }

  const badges = [
    { name: 'First Steps', description: 'Completed Module 1', earned: true, icon: <BookOpen className="w-6 h-6" />, xp: 50 },
    { name: 'Problem Solver', description: 'Identified 5 problems', earned: true, icon: <Target className="w-6 h-6" />, xp: 75 },
    { name: 'Team Player', description: 'Collaborated with peers', earned: false, icon: <Users className="w-6 h-6" />, xp: 100 },
    { name: 'Innovator', description: 'Created unique solution', earned: false, icon: <Trophy className="w-6 h-6" />, xp: 150 },
    { name: 'Mentorship Seeker', description: 'Completed 5 sessions', earned: true, icon: <Users className="w-6 h-6" />, xp: 125 },
    { name: 'Community Helper', description: 'Helped 10+ peers', earned: false, icon: <Award className="w-6 h-6" />, xp: 200 }
  ]

  const achievements = [
    { title: 'Learning Streak', value: '7 days', icon: <BookOpen className="w-5 h-5" />, color: 'text-violet-400' },
    { title: 'Community Posts', value: '12', icon: <Users className="w-5 h-5" />, color: 'text-pink-400' },
    { title: 'Mentorship Sessions', value: '8', icon: <Target className="w-5 h-5" />, color: 'text-primary-400' },
    { title: 'Assignments Submitted', value: '15', icon: <Award className="w-5 h-5" />, color: 'text-amber-400' }
  ]

  const progressData = [
    { label: 'Modules Completed', current: 3, total: 9, percentage: 33 },
    { label: 'XP Earned', current: user?.xp || 0, total: 1000, percentage: Math.min((user?.xp || 0) / 10, 100) },
    { label: 'Badges Earned', current: user?.badges?.length || 0, total: 20, percentage: Math.min((user?.badges?.length || 0) * 5, 100) },
    { label: 'Community Engagement', current: 12, total: 50, percentage: 24 }
  ]

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">My Profile 👤</h1>
          <p className="text-white/60 text-lg">Track your progress and manage your entrepreneurial journey</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            className="lg:col-span-1"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-6 rounded-2xl mb-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {user?.name?.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                <p className="text-white/60 capitalize">{user?.role}</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-400 font-semibold">Level {user?.level || 1}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-white/60" />
                  <span className="text-white/80">{user?.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-white/60" />
                  <span className="text-white/80">{user?.xp || 0} XP</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-white/60" />
                  <span className="text-white/80">
                    Joined {new Date(user?.createdAt || '').toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">🏆 Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${achievement.color.replace('text-', 'bg-').replace('-400', '-500/20')}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">{achievement.title}</div>
                      <div className="text-white/60 text-xs">{achievement.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Edit Profile */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-violet-500 focus:bg-white/10 transition-all"
                    />
                  ) : (
                    <p className="text-white py-3">{user?.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-violet-500 focus:bg-white/10 transition-all"
                    />
                  ) : (
                    <p className="text-white py-3">{user?.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Role
                  </label>
                  <p className="text-white py-3 capitalize">{user?.role}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Institution
                  </label>
                  <p className="text-white py-3">{user?.institution || 'Not specified'}</p>
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">📊 Progress Overview</h2>
              
              <div className="space-y-6">
                {progressData.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{item.label}</span>
                      <span className="text-white/60 text-sm">{item.current}/{item.total}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-violet-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="text-right text-sm text-white/60 mt-1">{item.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges & Achievements */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">🎖️ Badges & Achievements</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {badges.map((badge, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      badge.earned 
                        ? 'bg-mint-500/10 border-mint-500/30' 
                        : 'bg-white/5 border-white/20'
                    }`}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        badge.earned 
                          ? 'bg-gradient-to-r from-mint-500 to-mint-600' 
                          : 'bg-white/10'
                      }`}>
                        <div className={badge.earned ? 'text-white' : 'text-white/40'}>
                          {badge.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          badge.earned ? 'text-white' : 'text-white/60'
                        }`}>
                          {badge.name}
                        </h3>
                        <p className={`text-sm ${
                          badge.earned ? 'text-white/80' : 'text-white/40'
                        }`}>
                          {badge.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Zap className="w-3 h-3 text-amber-400" />
                          <span className="text-amber-400 text-xs">{badge.xp} XP</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Learning Statistics */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">📈 Learning Statistics</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-6 h-6 text-violet-400" />
                      <span className="text-white font-medium">Modules Completed</span>
                    </div>
                    <span className="text-2xl font-bold text-violet-400">3</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-6 h-6 text-mint-400" />
                      <span className="text-white font-medium">Hours Studied</span>
                    </div>
                    <span className="text-2xl font-bold text-mint-400">24</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6 text-pink-400" />
                      <span className="text-white font-medium">Community Posts</span>
                    </div>
                    <span className="text-2xl font-bold text-pink-400">12</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Target className="w-6 h-6 text-amber-400" />
                      <span className="text-white font-medium">Mentorship Sessions</span>
                    </div>
                    <span className="text-2xl font-bold text-amber-400">8</span>
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

export default StudentProfile
