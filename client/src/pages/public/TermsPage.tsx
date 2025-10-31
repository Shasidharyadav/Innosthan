import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import { Sparkles, ArrowLeft, FileText } from 'lucide-react'

const TermsPage = () => {
  const { isDarkMode } = useThemeStore()

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      <div className="fixed inset-0 z-0">
        {!isDarkMode ? (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        )}
      </div>

      <nav className={`relative z-10 flex items-center justify-between p-6 backdrop-blur-md ${
        isDarkMode ? 'bg-black/50' : 'bg-white/80'
      } border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-5 h-5" />
          <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Back to Home</span>
        </Link>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text">Innosthan</span>
        </div>
        <Link to="/register" className="btn-primary">Get Started</Link>
      </nav>

      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center mb-8">
              <FileText className={`w-16 h-16 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
            </div>
            <h1 className="text-5xl font-bold mb-6 text-center">
              <span className="gradient-text">Terms of Service</span>
            </h1>
            <p className={`text-center ${isDarkMode ? 'text-white/70' : 'text-gray-600'} mb-12`}>
              Last updated: January 2024
            </p>

            <div className="glass-card p-8 rounded-3xl space-y-8">
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>1. Agreement to Terms</h2>
                <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
                  By accessing or using Innosthan's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>2. Use License</h2>
                <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
                  Permission is granted to access and use Innosthan's services for personal, non-commercial purposes, subject to these Terms of Service.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>3. User Account</h2>
                <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>4. Intellectual Property</h2>
                <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
                  All content, features, and functionality are owned by Innosthan and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>5. Contact Information</h2>
                <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
                  Questions about the Terms of Service should be sent to legal@innosthan.com
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default TermsPage

