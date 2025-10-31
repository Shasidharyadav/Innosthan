import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useThemeStore } from '../stores/themeStore'
import { toast } from 'react-hot-toast'
import { Sparkles, Mail, Lock, Eye, EyeOff, User, Building2, Sun, Moon, ArrowLeft } from 'lucide-react'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register, isLoading, isAuthenticated } = useAuthStore()
  const { isDarkMode, toggleTheme } = useThemeStore()
  const navigate = useNavigate()

  // Apply theme on mount
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const { user } = useAuthStore.getState()
      switch (user?.role) {
        case 'admin':
          navigate('/admin/dashboard')
          break
        case 'mentor':
          navigate('/mentor/dashboard')
          break
        case 'institution':
          navigate('/institution/dashboard')
          break
        default:
          navigate('/student/dashboard')
      }
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role as any
      })
      toast.success('Account created successfully!')
      setTimeout(() => {
        const { user } = useAuthStore.getState()
        switch (user?.role) {
          case 'admin':
            navigate('/admin/dashboard')
            break
          case 'mentor':
            navigate('/mentor/dashboard')
            break
          case 'institution':
            navigate('/institution/dashboard')
            break
          default:
            navigate('/student/dashboard')
        }
      }, 100)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500 flex items-center justify-center p-6">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        {!isDarkMode ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50" />
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`orb-${i}`}
                className="absolute rounded-full blur-3xl"
                animate={{
                  x: [0, Math.random() * 200 - 100, 0],
                  y: [0, Math.random() * 200 - 100, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 15 + i * 3,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${10 + (i % 3) * 30}%`,
                  width: `${100 + i * 40}px`,
                  height: `${100 + i * 40}px`,
                  background: i % 3 === 0 
                    ? 'radial-gradient(circle, rgba(124, 58, 237, 0.3), transparent)' 
                    : i % 3 === 1 
                    ? 'radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent)'
                    : 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)',
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Back Button & Theme Toggle */}
      <div className="fixed top-6 left-6 right-6 z-20 flex items-center justify-between">
        <Link to="/" className={`flex items-center space-x-2 px-4 py-2 rounded-xl glass-card hover:opacity-80 transition-opacity`}>
          <ArrowLeft className="w-5 h-5" />
          <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Back to Home</span>
        </Link>
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-xl glass-card ${
            isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'
          } transition-colors`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
        </button>
      </div>

      {/* Register Form Container */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glass-card p-8 md:p-12 rounded-3xl">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold gradient-text">Innosthan</span>
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Create Account
            </h1>
            <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
              Start your entrepreneurial journey today
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                Full Name
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/40' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  } border focus:outline-none focus:border-violet-500 transition-colors`}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                Email Address
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/40' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  } border focus:outline-none focus:border-violet-500 transition-colors`}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                I am a
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                  <Building2 className="w-5 h-5" />
                </div>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-10 py-3 rounded-xl ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  } border focus:outline-none focus:border-violet-500 transition-colors appearance-none cursor-pointer`}
                  style={{
                    backgroundImage: isDarkMode 
                      ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")"
                      : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23374151' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    paddingRight: '2.5rem'
                  }}
                  required
                >
                  <option value="student" className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}>
                    Student / Entrepreneur
                  </option>
                  <option value="mentor" className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}>
                    Mentor
                  </option>
                  <option value="institution" className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}>
                    Institution
                  </option>
                </select>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 rounded-xl ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/40' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  } border focus:outline-none focus:border-violet-500 transition-colors`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-4 flex items-center ${isDarkMode ? 'text-white/40 hover:text-white/60' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                Confirm Password
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 rounded-xl ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/40' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                  } border focus:outline-none focus:border-violet-500 transition-colors`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute inset-y-0 right-0 pr-4 flex items-center ${isDarkMode ? 'text-white/40 hover:text-white/60' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                required
              />
              <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                I agree to the{' '}
                <Link to="/terms" className={`font-medium ${isDarkMode ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'}`}>
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className={`font-medium ${isDarkMode ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'}`}>
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3.5 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className={`absolute inset-0 flex items-center`}>
              <div className={`w-full border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`} />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-4 ${isDarkMode ? 'bg-black/50 text-white/60' : 'bg-white text-gray-500'}`}>
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className={`py-3 px-4 rounded-xl font-medium transition-all ${
              isDarkMode 
                ? 'bg-white/10 hover:bg-white/20 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}>
              Google
            </button>
            <button className={`py-3 px-4 rounded-xl font-medium transition-all ${
              isDarkMode 
                ? 'bg-white/10 hover:bg-white/20 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}>
              GitHub
            </button>
          </div>

          {/* Login Link */}
          <p className={`text-center text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <Link
              to="/login"
              className={`font-semibold transition-colors ${
                isDarkMode ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'
              }`}
            >
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default RegisterPage
