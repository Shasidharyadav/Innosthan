import { motion } from 'framer-motion'
import { useAuthStore } from '../../stores/authStore'

const InstitutionProfile = () => {
  const { user } = useAuthStore()

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Institution Profile 🏫</h1>
          <p className="text-white/60 text-lg">Manage your institution's profile and settings</p>
        </motion.div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {user?.institution?.charAt(0) || 'I'}
            </div>
            <h2 className="text-2xl font-bold text-white">{user?.institution || 'Institution'}</h2>
            <p className="text-white/60 capitalize">{user?.role}</p>
          </div>
          <p className="text-white">Institution profile page - Coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default InstitutionProfile
