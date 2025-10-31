import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useAuthStore } from '../../stores/authStore'
import { useThemeStore } from '../../stores/themeStore'
import BackButton from '../../components/BackButton'

const InstitutionProfile = () => {
  const { user } = useAuthStore()
  const { isDarkMode } = useThemeStore()

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        {!isDarkMode ? (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        <BackButton />
        
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Institution Profile
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
            Manage your institution's profile and settings
          </p>
        </motion.div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {user?.institution?.charAt(0) || 'I'}
            </div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {user?.institution || 'Institution'}
            </h2>
            <p className={`capitalize ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
              {user?.role}
            </p>
          </div>
          <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
            Institution profile page - Coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}

export default InstitutionProfile
