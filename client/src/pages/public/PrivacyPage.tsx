import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import { Sparkles, ArrowLeft, Shield } from 'lucide-react'

const PrivacyPage = () => {
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
              <Shield className={`w-16 h-16 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
            </div>
            <h1 className="text-5xl font-bold mb-6 text-center">
              <span className="gradient-text">Privacy Policy</span>
            </h1>
            <p className={`text-center ${isDarkMode ? 'text-white/70' : 'text-gray-600'} mb-12`}>
              Last updated: January 2024
            </p>

            <div className="glass-card p-8 rounded-3xl space-y-8">
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>1. Introduction</h2>
                <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
                  At Innosthan, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>2. Information We Collect</h2>
                <p className={`mb-4 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  We collect information that you provide directly to us, including:
                </p>
                <ul className={`list-disc list-inside space-y-2 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  <li>Name, email address, and contact information</li>
                  <li>Profile information and preferences</li>
                  <li>Payment and billing information</li>
                  <li>Content you create or upload</li>
                  <li>Communications with us and other users</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>3. How We Use Your Information</h2>
                <p className={`mb-4 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  We use the information we collect to:
                </p>
                <ul className={`list-disc list-inside space-y-2 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  <li>Provide and improve our services</li>
                  <li>Personalize your learning experience</li>
                  <li>Process payments and transactions</li>
                  <li>Send you updates and notifications</li>
                  <li>Protect against fraud and abuse</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>4. Data Security</h2>
                <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>5. Contact Us</h2>
                <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
                  If you have questions about this Privacy Policy, please contact us at privacy@innosthan.com
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPage

