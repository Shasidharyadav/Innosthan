import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Users, 
  Trophy, 
  Brain, 
  ArrowRight,
  Play,
  Star,
  Target,
  Lightbulb
} from 'lucide-react'
import { useState, useEffect } from 'react'

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Personalized mentorship with GPT-4 integration for contextual guidance"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Idea to Incubation",
      description: "Complete journey from concept validation to MVP development"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Hub",
      description: "Connect with mentors, peers, and potential co-founders"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Gamified Progress",
      description: "XP system, badges, and leaderboards to track your growth"
    }
  ]

  const modules = [
    { id: 0, title: "Foundation", description: "Entrepreneurship basics and mindset" },
    { id: 1, title: "Ideation", description: "Problem identification and solution design" },
    { id: 2, title: "Validation", description: "Market research and customer discovery" },
    { id: 3, title: "Business Model", description: "Lean canvas and value proposition" },
    { id: 4, title: "MVP Development", description: "Minimum viable product development" },
    { id: 5, title: "Pitch Preparation", description: "Investor pitch and presentation skills" },
    { id: 6, title: "Funding", description: "Investment strategies and fundraising" },
    { id: 7, title: "Scaling", description: "Growth strategies and team building" },
    { id: 8, title: "Incubation", description: "Accelerator programs and mentorship" }
  ]

  return (
    <div className="min-h-screen bg-dark-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.3) 0%, transparent 50%)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-violet-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav 
        className="relative z-10 flex items-center justify-between p-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text">Innosthan</span>
        </motion.div>

        <div className="flex items-center space-x-6">
          <Link 
            to="/login" 
            className="text-white/80 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="btn-primary"
          >
            Get Started
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 text-center">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="gradient-text">Transform</span>
            <br />
            <span className="text-white">Your Ideas</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            From concept to incubation with AI-powered mentorship, 
            gamified learning, and a thriving entrepreneurial community.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link 
              to="/register" 
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <button className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="gradient-text">Why Choose Innosthan?</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card glass-card-hover p-6 rounded-2xl text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className="text-violet-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-white/70">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Modules Section */}
      <section className="relative z-10 px-6 py-20">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="gradient-text">Learning Journey</span>
          </h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                className="glass-card glass-card-hover p-6 rounded-2xl"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold">
                    {module.id}
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {module.title}
                </h3>
                <p className="text-white/70 text-sm">
                  {module.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-12 rounded-3xl">
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Ready to Transform?</span>
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Join thousands of entrepreneurs who are already building the future.
              </p>
              <Link 
                to="/register" 
                className="btn-primary text-xl px-12 py-4 inline-flex items-center space-x-3"
              >
                <Lightbulb className="w-6 h-6" />
                <span>Start Your Journey Today</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Innosthan</span>
          </div>
          <p className="text-white/60">
            © 2024 Innosthan. Empowering the next generation of entrepreneurs.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
