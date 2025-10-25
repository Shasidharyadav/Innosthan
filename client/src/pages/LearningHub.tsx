import { motion } from 'framer-motion'
import { BookOpen, Play, CheckCircle, Lock, Star } from 'lucide-react'

const LearningHub = () => {
  const modules = [
    { id: 0, title: 'Foundation', description: 'Entrepreneurship basics and mindset', status: 'completed', progress: 100 },
    { id: 1, title: 'Ideation', description: 'Problem identification and solution design', status: 'completed', progress: 100 },
    { id: 2, title: 'Validation', description: 'Market research and customer discovery', status: 'completed', progress: 100 },
    { id: 3, title: 'Business Model', description: 'Lean canvas and value proposition', status: 'in-progress', progress: 60 },
    { id: 4, title: 'MVP Development', description: 'Minimum viable product development', status: 'locked', progress: 0 },
    { id: 5, title: 'Pitch Preparation', description: 'Investor pitch and presentation skills', status: 'locked', progress: 0 },
    { id: 6, title: 'Funding', description: 'Investment strategies and fundraising', status: 'locked', progress: 0 },
    { id: 7, title: 'Scaling', description: 'Growth strategies and team building', status: 'locked', progress: 0 },
    { id: 8, title: 'Incubation', description: 'Accelerator programs and mentorship', status: 'locked', progress: 0 }
  ]

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Learning Hub</h1>
          <p className="text-white/60 text-lg">Master entrepreneurship through structured learning</p>
        </motion.div>

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
                <div className="flex items-center space-x-1">
                  {module.status === 'completed' && <CheckCircle className="w-6 h-6 text-mint-400" />}
                  {module.status === 'in-progress' && <Play className="w-6 h-6 text-amber-400" />}
                  {module.status === 'locked' && <Lock className="w-6 h-6 text-white/40" />}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">{module.title}</h3>
              <p className="text-white/70 mb-4">{module.description}</p>

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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    module.status === 'completed' 
                      ? 'bg-mint-500/20 text-mint-400 border border-mint-500/30' 
                      : module.status === 'in-progress'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-white/10 text-white/40 border border-white/20 cursor-not-allowed'
                  }`}
                  disabled={module.status === 'locked'}
                >
                  {module.status === 'completed' ? 'Completed' : 
                   module.status === 'in-progress' ? 'Continue' : 'Locked'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LearningHub
