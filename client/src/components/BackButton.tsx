import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../stores/authStore'
import { useThemeStore } from '../stores/themeStore'

interface BackButtonProps {
  to?: string // Optional custom destination
  showHomeButton?: boolean // Show home button alongside back
}

export const BackButton = ({ to, showHomeButton = true }: BackButtonProps) => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { isDarkMode } = useThemeStore()

  const getDashboardPath = () => {
    if (!user) return '/student/dashboard'
    
    switch (user.role) {
      case 'student':
        return '/student/dashboard'
      case 'mentor':
        return '/mentor/dashboard'
      case 'admin':
        return '/admin/dashboard'
      case 'institution':
        return '/institution/dashboard'
      default:
        return '/student/dashboard'
    }
  }

  const handleBack = () => {
    if (to) {
      navigate(to)
    } else {
      navigate(-1)
    }
  }

  const handleHome = () => {
    navigate(getDashboardPath())
  }

  return (
    <motion.div
      className="flex items-center space-x-3 mb-6"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={handleBack}
        className={`group flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md border ${
          isDarkMode
            ? 'bg-white/10 hover:bg-white/20 text-white border-white/10'
            : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
        }`}
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-medium">Back</span>
      </button>

      {showHomeButton && (
        <button
          onClick={handleHome}
          className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
          title="Go to Dashboard"
        >
          <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-medium">Home</span>
        </button>
      )}
    </motion.div>
  )
}

export default BackButton

