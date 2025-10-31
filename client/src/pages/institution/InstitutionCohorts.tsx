import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useThemeStore } from '../../stores/themeStore'
import BackButton from '../../components/BackButton'

const InstitutionCohorts = () => {
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
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        <BackButton />
        
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Cohort Management
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
            Manage student cohorts and track progress
          </p>
        </motion.div>

        <div className="glass-card p-6 rounded-2xl">
          <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
            Cohort management page - Coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}

export default InstitutionCohorts
