import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import {
  Sparkles,
  ArrowLeft,
  Zap,
  Shield,
  Globe,
  Users,
  Code,
  TrendingUp,
  Award,
  BookOpen
} from 'lucide-react'

const PlatformPage = () => {
  const { isDarkMode } = useThemeStore()

  const sections = [
    {
      title: "AI-Powered Learning Engine",
      description: "Advanced algorithms personalize your learning journey based on your progress, goals, and learning style.",
      icon: <Zap className="w-12 h-12" />,
      features: ["Adaptive curriculum", "Real-time feedback", "Smart recommendations", "Progress tracking"]
    },
    {
      title: "Enterprise-Grade Security",
      description: "Your data is protected with bank-level encryption and security protocols.",
      icon: <Shield className="w-12 h-12" />,
      features: ["End-to-end encryption", "GDPR compliant", "Regular security audits", "Data privacy controls"]
    },
    {
      title: "Global Community Network",
      description: "Connect with entrepreneurs, mentors, and investors from around the world.",
      icon: <Globe className="w-12 h-12" />,
      features: ["Worldwide reach", "24/7 support", "Multi-language", "Cultural diversity"]
    },
    {
      title: "Collaborative Tools",
      description: "Work seamlessly with your team using integrated collaboration features.",
      icon: <Users className="w-12 h-12" />,
      features: ["Team workspaces", "Real-time collaboration", "Shared resources", "Group projects"]
    },
    {
      title: "Developer-Friendly APIs",
      description: "Build custom integrations and extend platform functionality with our robust APIs.",
      icon: <Code className="w-12 h-12" />,
      features: ["RESTful APIs", "Webhooks", "SDKs available", "Comprehensive docs"]
    },
    {
      title: "Analytics & Insights",
      description: "Make data-driven decisions with comprehensive analytics and reporting tools.",
      icon: <TrendingUp className="w-12 h-12" />,
      features: ["Performance metrics", "Custom reports", "Visual dashboards", "Export capabilities"]
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        {!isDarkMode ? (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        )}
      </div>

      {/* Navigation */}
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
        <Link to="/register" className="btn-primary">
          Get Started
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Platform Overview</span>
          </h1>
          <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-white/80' : 'text-gray-600'} mb-8 max-w-3xl mx-auto`}>
            A comprehensive ecosystem designed to transform entrepreneurial dreams into successful ventures
          </p>
        </motion.div>
      </section>

      {/* Platform Features Grid */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="glass-card glass-card-hover p-8 rounded-3xl"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className={`mb-6 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                  {section.icon}
                </div>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {section.title}
                </h2>
                <p className={`mb-6 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  {section.description}
                </p>
                <ul className="space-y-3">
                  {section.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <Award className={`w-5 h-5 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                      <span className={isDarkMode ? 'text-white/80' : 'text-gray-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Stack Section */}
      <section className={`relative z-10 px-6 py-20 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">
            <span className="gradient-text">Built with Modern Technology</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {['React', 'TypeScript', 'Node.js', 'MongoDB', 'AI/ML', 'WebSocket', 'Docker', 'AWS'].map((tech, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-2xl"
                whileHover={{ scale: 1.05 }}
              >
                <BookOpen className={`w-8 h-8 mx-auto mb-3 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{tech}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 rounded-3xl">
            <h2 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Ready to Experience Our Platform?</span>
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-white/80' : 'text-gray-600'} mb-8`}>
              Join thousands of entrepreneurs building the future on Innosthan
            </p>
            <Link to="/register" className="btn-primary text-xl px-12 py-4 inline-block">
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PlatformPage

