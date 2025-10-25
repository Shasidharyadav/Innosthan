import { motion } from 'framer-motion'
import { useAuthStore } from '../stores/authStore'
import { User, Mail, Award, Calendar, Edit, Save, X } from 'lucide-react'
import { useState } from 'react'

const ProfilePage = () => {
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
    { name: 'First Steps', description: 'Completed Module 1', earned: true },
    { name: 'Problem Solver', description: 'Identified 5 problems', earned: true },
    { name: 'Team Player', description: 'Collaborated with peers', earned: false },
    { name: 'Innovator', description: 'Created unique solution', earned: false }
  ]

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
          <p className="text-white/60 text-lg">Manage your account and track your progress</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            className="lg:col-span-1"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-6 rounded-2xl">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {user?.name?.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                <p className="text-white/60 capitalize">{user?.role}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-white/60" />
                  <span className="text-white/80">{user?.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-white/60" />
                  <span className="text-white/80">Level {user?.level || 1}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-white/60" />
                  <span className="text-white/80">
                    Joined {new Date(user?.createdAt || '').toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-3">Progress</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-white/80 mb-1">
                      <span>XP Earned</span>
                      <span>{user?.xp || 0} XP</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${Math.min((user?.xp || 0) / 1000 * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Edit Profile & Badges */}
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

              <div className="space-y-4">
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
                    <p className="text-white">{user?.name}</p>
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
                    <p className="text-white">{user?.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Role
                  </label>
                  <p className="text-white capitalize">{user?.role}</p>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Badges & Achievements</h2>
              
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
                        <Award className={`w-6 h-6 ${
                          badge.earned ? 'text-white' : 'text-white/40'
                        }`} />
                      </div>
                      <div>
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
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
