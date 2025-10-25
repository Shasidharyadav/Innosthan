import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuthStore } from '../stores/authStore'
import { toast } from 'react-hot-toast'
import { Sparkles, Mail, Lock, Eye, EyeOff } from 'lucide-react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const { user } = useAuthStore.getState()
      switch (user?.role) {
        case 'admin':
          navigate('/admin')
          break
        case 'mentor':
          navigate('/mentor')
          break
        case 'institution':
          navigate('/institution')
          break
        default:
          navigate('/dashboard')
      }
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      toast.success('Welcome back!')
      // Add a small delay to ensure state is properly set
      setTimeout(() => {
        // Redirect based on user role
        const { user } = useAuthStore.getState()
        switch (user?.role) {
          case 'admin':
            navigate('/admin')
            break
          case 'mentor':
            navigate('/mentor')
            break
          case 'institution':
            navigate('/institution')
            break
          default:
            navigate('/dashboard')
        }
      }, 100)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="flex items-center justify-center space-x-2 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold gradient-text">Innosthan</span>
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/60">Sign in to continue your entrepreneurial journey</p>
        </div>

        {/* Login Form */}
        <motion.div
          className="glass-card p-8 rounded-2xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-violet-500 focus:bg-white/10 transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-violet-500 focus:bg-white/10 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-violet-500 bg-white/5 border-white/20 rounded focus:ring-violet-500" />
                <span className="ml-2 text-sm text-white/60">Remember me</span>
              </label>
              <a href="#" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60">
              Don't have an account?{' '}
              <Link to="/register" className="text-violet-400 hover:text-violet-300 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoginPage
