import { motion } from 'framer-motion'
import { Play, CheckCircle, Lock, Star, Clock, Users, Award, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const LearningHub = () => {
  const navigate = useNavigate()

  const modules = [
    { 
      id: 0, 
      title: 'Foundation', 
      description: 'Entrepreneurship basics and mindset', 
      status: 'completed', 
      progress: 100,
      duration: '2 hours',
      xp: 100,
      lessons: 5,
      difficulty: 'Beginner'
    },
    { 
      id: 1, 
      title: 'Ideation', 
      description: 'Problem identification and solution design', 
      status: 'completed', 
      progress: 100,
      duration: '3 hours',
      xp: 150,
      lessons: 7,
      difficulty: 'Beginner'
    },
    { 
      id: 2, 
      title: 'Validation', 
      description: 'Market research and customer discovery', 
      status: 'completed', 
      progress: 100,
      duration: '4 hours',
      xp: 200,
      lessons: 8,
      difficulty: 'Intermediate'
    },
    { 
      id: 3, 
      title: 'Business Model', 
      description: 'Lean canvas and value proposition', 
      status: 'in-progress', 
      progress: 60,
      duration: '3 hours',
      xp: 180,
      lessons: 6,
      difficulty: 'Intermediate'
    },
    { 
      id: 4, 
      title: 'MVP Development', 
      description: 'Minimum viable product development', 
      status: 'locked', 
      progress: 0,
      duration: '5 hours',
      xp: 250,
      lessons: 10,
      difficulty: 'Advanced'
    },
    { 
      id: 5, 
      title: 'Pitch Preparation', 
      description: 'Investor pitch and presentation skills', 
      status: 'locked', 
      progress: 0,
      duration: '4 hours',
      xp: 200,
      lessons: 8,
      difficulty: 'Advanced'
    },
    { 
      id: 6, 
      title: 'Funding', 
      description: 'Investment strategies and fundraising', 
      status: 'locked', 
      progress: 0,
      duration: '6 hours',
      xp: 300,
      lessons: 12,
      difficulty: 'Expert'
    },
    { 
      id: 7, 
      title: 'Scaling', 
      description: 'Growth strategies and team building', 
      status: 'locked', 
      progress: 0,
      duration: '5 hours',
      xp: 280,
      lessons: 11,
      difficulty: 'Expert'
    },
    { 
      id: 8, 
      title: 'Incubation', 
      description: 'Accelerator programs and mentorship', 
      status: 'locked', 
      progress: 0,
      duration: '4 hours',
      xp: 220,
      lessons: 9,
      difficulty: 'Expert'
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-mint-400 bg-mint-500/20'
      case 'Intermediate': return 'text-amber-400 bg-amber-500/20'
      case 'Advanced': return 'text-orange-400 bg-orange-500/20'
      case 'Expert': return 'text-red-400 bg-red-500/20'
      default: return 'text-white/60 bg-white/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-6 h-6 text-mint-400" />
      case 'in-progress': return <Play className="w-6 h-6 text-amber-400" />
      case 'locked': return <Lock className="w-6 h-6 text-white/40" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-mint-500/20 text-mint-400 border-mint-500/30'
      case 'in-progress': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'locked': return 'bg-white/10 text-white/40 border-white/20'
      default: return 'bg-white/10 text-white/40 border-white/20'
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Learning Hub 📚</h1>
          <p className="text-white/60 text-lg">Master entrepreneurship through structured, hands-on learning modules</p>
        </motion.div>

        {/* Learning Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">3/9</div>
                <div className="text-sm text-white/60">Modules Completed</div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">450</div>
                <div className="text-sm text-white/60">XP Earned</div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-mint-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">9h</div>
                <div className="text-sm text-white/60">Time Invested</div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">20</div>
                <div className="text-sm text-white/60">Lessons Completed</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              className="glass-card glass-card-hover p-6 rounded-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold">
                  {module.id}
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(module.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">{module.title}</h3>
              <p className="text-white/70 mb-4">{module.description}</p>

              {/* Module Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm text-white/60">Duration</div>
                  <div className="text-white font-semibold">{module.duration}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-white/60">XP Reward</div>
                  <div className="text-amber-400 font-semibold">{module.xp}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/60">Progress</span>
                  <span className="text-sm text-white/60">{module.progress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
              </div>

              {/* Module Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <div className="text-sm text-white/60">{module.lessons} lessons</div>
              </div>

              {/* Action Button */}
              <button 
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${getStatusColor(module.status)}`}
                disabled={module.status === 'locked'}
                onClick={() => {
                  if (module.status !== 'locked') {
                    // Navigate to module content
                    console.log(`Starting module: ${module.title}`)
                  }
                }}
              >
                {module.status === 'completed' ? 'Review Module' : 
                 module.status === 'in-progress' ? 'Continue Learning' : 'Locked'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Learning Tips */}
        <motion.div
          className="mt-8 glass-card p-6 rounded-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">💡 Learning Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-mint-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-mint-400 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Take Notes</h3>
                  <p className="text-white/60 text-sm">Keep detailed notes during each lesson to reinforce learning</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-violet-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Practice Regularly</h3>
                  <p className="text-white/60 text-sm">Consistent practice helps retain knowledge better</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Apply Learning</h3>
                  <p className="text-white/60 text-sm">Try to apply concepts to real-world scenarios</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Ask Questions</h3>
                  <p className="text-white/60 text-sm">Use the community and mentorship features for help</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LearningHub
