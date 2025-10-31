import { motion, AnimatePresence } from 'framer-motion'
import { Play, CheckCircle, Lock, Clock, Award, BookOpen, Zap, Trophy, Target, Flame, Sparkles, TrendingUp, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../stores/authStore'
import { useThemeStore } from '../../stores/themeStore'
import BackButton from '../../components/BackButton'

interface Module {
  _id: string
  title: string
  description: string
  moduleNumber: number
  isUnlocked: boolean
  duration?: string
  xpReward?: number
  lessons?: number
  difficulty?: string
  progress?: number
}

const LearningHub = () => {
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const { token, user } = useAuthStore()
  const { isDarkMode, toggleTheme } = useThemeStore()

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    fetchModules()
  }, [])

  const fetchModules = async () => {
    try {
      const response = await axios.get('/api/modules', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setModules(response.data.modules || [])
    } catch (error: any) {
      console.error('Fetch modules error:', error)
      toast.error('Failed to load modules')
    } finally {
      setLoading(false)
    }
  }

  const getModuleStatus = (module: Module) => {
    if (!module.isUnlocked) return 'locked'
    if (module.progress === 100) return 'completed'
    if (module.progress && module.progress > 0) return 'in-progress'
    return 'available'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-mint-400 bg-mint-500/20 border border-mint-500/30'
      case 'Intermediate': return 'text-amber-400 bg-amber-500/20 border border-amber-500/30'
      case 'Advanced': return 'text-orange-400 bg-orange-500/20 border border-orange-500/30'
      case 'Expert': return 'text-red-400 bg-red-500/20 border border-red-500/30'
      default: return 'text-gray-400 dark:text-white/60 bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-6 h-6 text-mint-400" />
      case 'in-progress': return <Play className="w-6 h-6 text-amber-400" />
      case 'locked': return <Lock className="w-6 h-6 text-gray-400 dark:text-white/40" />
      case 'available': return <Play className="w-6 h-6 text-violet-400" />
      default: return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  const completedModules = modules.filter(m => m.progress === 100).length
  const totalXP = modules.reduce((sum, m) => sum + (m.xpReward || 0), 0)
  const earnedXP = modules.filter(m => m.progress === 100).reduce((sum, m) => sum + (m.xpReward || 0), 0)
  const currentLevel = user?.level || 1
  const currentXP = user?.xp || 0
  const xpToNextLevel = currentLevel * 100
  const xpProgress = (currentXP % xpToNextLevel) / xpToNextLevel * 100
  const learningStreak = 7 // TODO: Calculate from backend

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Back Button and Theme Toggle */}
        <div className="flex items-center justify-between mb-6">
          <BackButton showHomeButton={true} />
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 transition-colors shadow-md"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Header with Level Progress */}
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Learning Hub 📚</h1>
              <p className="text-gray-600 dark:text-white/60 text-lg">Master entrepreneurship through gamified learning</p>
            </div>

            {/* Level Badge */}
            <motion.div
              className="glass-card p-6 rounded-2xl min-w-[200px]"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white dark:border-gray-800">
                    {currentLevel}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600 dark:text-white/60 mb-1">Level {currentLevel}</div>
                  <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2 mb-1">
                    <motion.div 
                      className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-white/50">{currentXP % xpToNextLevel}/{xpToNextLevel} XP</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Gamification Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Completed Modules */}
          <motion.div 
            className="glass-card p-6 rounded-2xl"
            whileHover={{ y: -5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{completedModules}</div>
              <div className="text-sm text-gray-600 dark:text-white/60">Completed</div>
              <div className="text-xs text-gray-500 dark:text-white/50 mt-1">of {modules.length}</div>
            </div>
          </motion.div>

          {/* XP Earned */}
          <motion.div 
            className="glass-card p-6 rounded-2xl"
            whileHover={{ y: -5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-amber-400 mb-1">{earnedXP}</div>
              <div className="text-sm text-gray-600 dark:text-white/60">XP Earned</div>
              <div className="text-xs text-gray-500 dark:text-white/50 mt-1">of {totalXP}</div>
            </div>
          </motion.div>

          {/* Learning Streak */}
          <motion.div 
            className="glass-card p-6 rounded-2xl"
            whileHover={{ y: -5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-3">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-400 mb-1">{learningStreak}</div>
              <div className="text-sm text-gray-600 dark:text-white/60">Day Streak</div>
              <div className="text-xs text-mint-400 mt-1">🔥 On Fire!</div>
            </div>
          </motion.div>

          {/* Success Rate */}
          <motion.div 
            className="glass-card p-6 rounded-2xl"
            whileHover={{ y: -5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-mint-500 to-teal-500 rounded-xl flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-mint-400 mb-1">{modules.length ? Math.round((completedModules / modules.length) * 100) : 0}%</div>
              <div className="text-sm text-gray-600 dark:text-white/60">Success Rate</div>
              <div className="text-xs text-gray-500 dark:text-white/50 mt-1">Great job!</div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div 
            className="glass-card p-6 rounded-2xl"
            whileHover={{ y: -5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-pink-400 mb-1">{user?.badges?.length || 0}</div>
              <div className="text-sm text-gray-600 dark:text-white/60">Badges</div>
              <div className="text-xs text-gray-500 dark:text-white/50 mt-1">Earned</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Daily Challenge Banner */}
        <motion.div
          className="glass-card p-6 rounded-2xl mb-8 bg-gradient-to-r from-violet-500/10 to-pink-500/10 border-2 border-violet-500/30"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">🎯 Daily Challenge</h3>
                <p className="text-gray-600 dark:text-white/60">Complete 2 lessons today to earn bonus XP!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600 dark:text-white/60">Bonus Reward</div>
                <div className="text-2xl font-bold text-amber-400">+50 XP</div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform">
                Start Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* Modules Grid */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📖 Your Learning Path</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const status = getModuleStatus(module)
            const isLocked = status === 'locked'
            const isCompleted = status === 'completed'
            
            return (
              <motion.div
                key={module._id}
                className={`glass-card p-6 rounded-2xl relative overflow-hidden ${isLocked ? 'opacity-60' : 'glass-card-hover'}`}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={!isLocked ? { y: -8, scale: 1.02 } : {}}
              >
                {/* Completion Celebration */}
                {isCompleted && (
                  <div className="absolute top-2 right-2 z-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="w-10 h-10 bg-mint-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                )}

                {/* Module Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {module.moduleNumber}
                  </motion.div>
                  <div className="flex flex-col items-end space-y-2">
                    {module.difficulty && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                        {module.difficulty}
                      </span>
                    )}
                    {getStatusIcon(status)}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{module.title}</h3>
                <p className="text-gray-600 dark:text-white/70 mb-4 line-clamp-2">{module.description}</p>

                {/* Module Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2 bg-gray-100 dark:bg-white/5 p-3 rounded-xl">
                    <Clock className="w-4 h-4 text-gray-600 dark:text-white/60" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-white/50">Duration</div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{module.duration || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-amber-500/10 p-3 rounded-xl">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs text-amber-400/70">XP Reward</div>
                      <div className="text-sm font-semibold text-amber-400">+{module.xpReward || 0}</div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-white/60 font-medium">Progress</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{module.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-violet-500 to-pink-500 h-3 rounded-full relative overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: `${module.progress || 0}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    >
                      {/* Animated shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ['-100%', '200%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    isLocked
                      ? 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-white/40 cursor-not-allowed'
                      : isCompleted
                      ? 'bg-mint-500/20 text-mint-400 border-2 border-mint-500/30 hover:bg-mint-500/30'
                      : 'bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:scale-105 hover:shadow-lg'
                  }`}
                  disabled={isLocked}
                >
                  {isLocked ? (
                    <span className="flex items-center justify-center space-x-2">
                      <Lock className="w-5 h-5" />
                      <span>Locked</span>
                    </span>
                  ) : isCompleted ? (
                    <span className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Review Module</span>
                    </span>
                  ) : status === 'in-progress' ? (
                    <span className="flex items-center justify-center space-x-2">
                      <TrendingUp className="w-5 h-5" />
                      <span>Continue Learning</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <Play className="w-5 h-5" />
                      <span>Start Module</span>
                    </span>
                  )}
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {modules.length === 0 && (
          <motion.div
            className="glass-card p-12 rounded-2xl text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <BookOpen className="w-16 h-16 text-gray-400 dark:text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Modules Available</h3>
            <p className="text-gray-600 dark:text-white/60">Check back soon for new learning content!</p>
          </motion.div>
        )}

        {/* Level Up Celebration */}
        <AnimatePresence>
          {showLevelUp && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="glass-card p-12 rounded-3xl text-center max-w-md"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity 
                  }}
                  className="w-24 h-24 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Trophy className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Level Up!</h2>
                <p className="text-xl text-gray-600 dark:text-white/60 mb-6">You've reached Level {currentLevel}!</p>
                <button
                  onClick={() => setShowLevelUp(false)}
                  className="px-8 py-3 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                >
                  Awesome!
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LearningHub
