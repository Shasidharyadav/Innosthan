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
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
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
      {/* Animated Background with 3D Effects */}
      <div className="fixed inset-0 z-0">
        {/* Interactive Gradient */}
        <div 
          className="absolute inset-0 opacity-40 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.4) 0%, rgba(236, 72, 153, 0.2) 30%, transparent 70%)`
          }}
        />
        
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent" />
        
        {/* 3D Floating Orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl"
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [1, 1.5, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${10 + (i % 3) * 30}%`,
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              background: i % 3 === 0 
                ? 'radial-gradient(circle, rgba(124, 58, 237, 0.3), transparent)' 
                : i % 3 === 1 
                ? 'radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent)'
                : 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)',
            }}
          />
        ))}
        
        {/* Animated Particles with 3D effect */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            animate={{
              x: [0, Math.random() * 150 - 75, 0],
              y: [0, Math.random() * -150, 0],
              scale: [1, 1.8, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: i % 2 === 0 
                ? 'linear-gradient(135deg, #a78bfa, #ec4899)' 
                : 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
              boxShadow: '0 0 20px rgba(167, 139, 250, 0.5)',
            }}
          />
        ))}
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            transform: `perspective(1000px) rotateX(${scrollY * 0.05}deg)`,
          }}
        />
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

      {/* Hero Section with 3D Elements */}
      <section className="relative z-10 px-6 py-20 text-center">
        {/* 3D Floating Rocket Illustration */}
        <motion.div
          className="absolute top-10 right-[15%] hidden lg:block"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-32 h-32">
            {/* Rocket Body */}
            <motion.div
              className="absolute top-6 left-8 w-16 h-24 rounded-t-full rounded-b-lg"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                boxShadow: '0 10px 40px rgba(139, 92, 246, 0.6), inset -5px -5px 10px rgba(0,0,0,0.3)',
              }}
            >
              {/* Window */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-400 opacity-80"
                style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.8), inset 2px 2px 4px rgba(255,255,255,0.5)' }}
              />
              {/* Wing Left */}
              <div className="absolute bottom-0 -left-4 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[20px] border-b-pink-500"
                style={{ filter: 'drop-shadow(0 5px 15px rgba(236, 72, 153, 0.5))' }}
              />
              {/* Wing Right */}
              <div className="absolute bottom-0 -right-4 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[20px] border-b-pink-500"
                style={{ filter: 'drop-shadow(0 5px 15px rgba(236, 72, 153, 0.5))' }}
              />
            </motion.div>
            {/* Flames */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <div className="w-8 h-12 rounded-b-full bg-gradient-to-b from-amber-400 via-orange-500 to-red-500"
                style={{ filter: 'blur(2px)', boxShadow: '0 0 30px rgba(251, 191, 36, 0.8)' }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* 3D Brain/AI Illustration */}
        <motion.div
          className="absolute top-20 left-[10%] hidden lg:block"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -10, 10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-28 h-28">
            {/* Brain Shape */}
            <div className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
                boxShadow: '0 15px 50px rgba(236, 72, 153, 0.6), inset -8px -8px 16px rgba(0,0,0,0.3), inset 8px 8px 16px rgba(255,255,255,0.1)',
              }}
            >
              {/* Circuit Pattern */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle cx="30" cy="30" r="3" fill="#fbbf24" opacity="0.8">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="70" cy="40" r="3" fill="#06b6d4" opacity="0.8">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="60" r="3" fill="#a78bfa" opacity="0.8">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
                <line x1="30" y1="30" x2="50" y2="60" stroke="#fbbf24" strokeWidth="1" opacity="0.5" />
                <line x1="70" y1="40" x2="50" y2="60" stroke="#06b6d4" strokeWidth="1" opacity="0.5" />
              </svg>
            </div>
            {/* Glow particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-amber-400"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* 3D Trophy/Achievement */}
        <motion.div
          className="absolute bottom-10 left-[20%] hidden lg:block"
          animate={{
            y: [0, -10, 0],
            rotateY: [0, 360],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="relative w-20 h-24">
            {/* Trophy Cup */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-16 rounded-t-lg"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                boxShadow: '0 10px 30px rgba(251, 191, 36, 0.6), inset -4px -4px 8px rgba(0,0,0,0.3), inset 4px 4px 8px rgba(255,255,255,0.3)',
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
              }}
            />
            {/* Trophy Handles */}
            <div className="absolute bottom-6 -left-2 w-6 h-8 rounded-l-full border-4 border-amber-400"
              style={{ boxShadow: '0 5px 15px rgba(251, 191, 36, 0.4)' }}
            />
            <div className="absolute bottom-6 -right-2 w-6 h-8 rounded-r-full border-4 border-amber-400"
              style={{ boxShadow: '0 5px 15px rgba(251, 191, 36, 0.4)' }}
            />
            {/* Star on top */}
            <motion.div
              className="absolute -top-2 left-1/2 transform -translate-x-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-6 h-6 text-amber-400 fill-amber-400" style={{ filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))' }} />
            </motion.div>
          </div>
        </motion.div>

        {/* 3D Book/Learning Stack */}
        <motion.div
          className="absolute bottom-20 right-[20%] hidden lg:block"
          animate={{
            y: [0, -12, 0],
            rotateZ: [-2, 2, -2],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-24 h-24">
            {/* Book Stack */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute left-1/2 transform -translate-x-1/2"
                style={{
                  bottom: `${i * 8}px`,
                  width: '60px',
                  height: '12px',
                  background: i === 0 ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : i === 1 ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 'linear-gradient(135deg, #ec4899, #db2777)',
                  borderRadius: '2px',
                  boxShadow: `0 ${5 + i * 2}px ${15 + i * 5}px rgba(139, 92, 246, 0.4), inset -2px -2px 4px rgba(0,0,0,0.3)`,
                  transform: `rotateZ(${i * 3}deg)`,
                }}
              >
                {/* Book Pages */}
                <div className="absolute right-0 top-0 w-1 h-full bg-white opacity-30" />
              </div>
            ))}
            {/* Sparkles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-amber-400"
                style={{
                  top: `${10 + i * 20}%`,
                  right: `${-10 + i * 5}%`,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Existing 3D Floating Blobs */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 opacity-30 hidden md:block"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            filter: 'blur(2px)',
            boxShadow: '0 20px 60px rgba(139, 92, 246, 0.4)',
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 opacity-30 hidden md:block"
          animate={{
            y: [0, 30, 0],
            rotate: [360, 180, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
            borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
            filter: 'blur(2px)',
            boxShadow: '0 20px 60px rgba(6, 182, 212, 0.4)',
          }}
        />
        
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
            style={{
              textShadow: '0 0 80px rgba(139, 92, 246, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)',
            }}
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
                className="glass-card glass-card-hover p-6 rounded-2xl text-center relative overflow-hidden group"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                }}
              >
                {/* Animated Background Gradient on Hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: index % 4 === 0 
                      ? 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.2), transparent)'
                      : index % 4 === 1
                      ? 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.2), transparent)'
                      : index % 4 === 2
                      ? 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.2), transparent)'
                      : 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.2), transparent)',
                  }}
                />
                
                {/* 3D Icon Container */}
                <motion.div 
                  className="relative z-10 mb-4 flex justify-center"
                  whileHover={{ scale: 1.2, rotateZ: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: index % 4 === 0 
                        ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                        : index % 4 === 1
                        ? 'linear-gradient(135deg, #ec4899, #db2777)'
                        : index % 4 === 2
                        ? 'linear-gradient(135deg, #06b6d4, #0891b2)'
                        : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                      boxShadow: '0 10px 40px rgba(139, 92, 246, 0.4)',
                      transform: 'translateZ(20px)',
                    }}
                  >
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-3 text-white relative z-10">
                  {feature.title}
                </h3>
                <p className="text-white/70 relative z-10">
                  {feature.description}
                </p>
                
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
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
