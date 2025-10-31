import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import { motion } from 'framer-motion'

interface BackButtonProps {
  to?: string // Optional custom destination
  showHomeButton?: boolean // Show home button alongside back
}

export const BackButton = ({ to, showHomeButton = true }: BackButtonProps) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (to) {
      navigate(to)
    } else {
      navigate(-1)
    }
  }

  const handleHome = () => {
    navigate('/student/dashboard')
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
        className="group flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200 dark:border-white/10"
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

