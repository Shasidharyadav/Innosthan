import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import {
  Sparkles,
  ArrowLeft,
  Brain,
  Target,
  Users,
  Trophy,
  Zap,
  Shield,
  Rocket,
  Heart,
  Globe,
  Star
} from 'lucide-react'

const FeaturesPage = () => {
  const { isDarkMode } = useThemeStore()

  const features = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "AI-Powered Mentorship",
      description: "Get personalized guidance from our GPT-4 powered AI mentor that adapts to your learning style and needs.",
      benefits: [
        "24/7 availability for instant support",
        "Contextual learning recommendations",
        "Personalized feedback on projects",
        "Smart resource suggestions"
      ]
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Structured Learning Path",
      description: "Follow a proven curriculum that takes you from ideation to incubation with clear milestones.",
      benefits: [
        "9 comprehensive modules",
        "Hands-on projects and assignments",
        "Real-world case studies",
        "Industry-recognized certifications"
      ]
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Community & Networking",
      description: "Connect with like-minded entrepreneurs, mentors, and potential co-founders in our vibrant community.",
      benefits: [
        "Global network of 10,000+ members",
        "Weekly networking events",
        "Peer-to-peer learning groups",
        "Mentor matching program"
      ]
    },
    {
      icon: <Trophy className="w-12 h-12" />,
      title: "Gamification System",
      description: "Stay motivated with XP points, achievement badges, and leaderboards that track your progress.",
      benefits: [
        "Earn XP for completing tasks",
        "Unlock achievement badges",
        "Compete on global leaderboards",
        "Rewards and recognition programs"
      ]
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Real-Time Collaboration",
      description: "Work seamlessly with your team using integrated chat, video calls, and shared workspaces.",
      benefits: [
        "Team workspaces and channels",
        "Video conferencing integration",
        "Document collaboration",
        "Project management tools"
      ]
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Secure & Private",
      description: "Your data and intellectual property are protected with enterprise-grade security measures.",
      benefits: [
        "End-to-end encryption",
        "GDPR & CCPA compliant",
        "Regular security audits",
        "IP protection policies"
      ]
    },
    {
      icon: <Rocket className="w-12 h-12" />,
      title: "Startup Launch Support",
      description: "Get everything you need to launch your startup, from legal templates to pitch deck reviews.",
      benefits: [
        "Business plan templates",
        "Legal document library",
        "Pitch deck feedback",
        "Funding connections"
      ]
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Wellness & Support",
      description: "Mental health resources and support to help you maintain balance on your entrepreneurial journey.",
      benefits: [
        "Stress management resources",
        "Work-life balance guidance",
        "Peer support groups",
        "Professional counseling access"
      ]
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Global Accessibility",
      description: "Learn from anywhere with our mobile-friendly platform available in multiple languages.",
      benefits: [
        "Mobile app for iOS & Android",
        "Multi-language support",
        "Offline learning mode",
        "Cross-device synchronization"
      ]
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
            <span className="gradient-text">Features That Empower</span>
          </h1>
          <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-white/80' : 'text-gray-600'} mb-8 max-w-3xl mx-auto`}>
            Everything you need to transform your entrepreneurial journey from idea to successful startup
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
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
                  {feature.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`mb-6 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Star className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isDarkMode ? 'text-amber-400' : 'text-amber-500'}`} />
                      <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section className={`relative z-10 px-6 py-20 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Why Choose Innosthan?</span>
          </h2>
          <div className="glass-card p-8 rounded-3xl">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold gradient-text mb-2">100%</div>
                <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>Practical Learning</p>
              </div>
              <div>
                <div className="text-5xl font-bold gradient-text mb-2">24/7</div>
                <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>AI Support</p>
              </div>
              <div>
                <div className="text-5xl font-bold gradient-text mb-2">10k+</div>
                <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>Active Community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 rounded-3xl">
            <h2 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Experience All Features</span>
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-white/80' : 'text-gray-600'} mb-8`}>
              Start your free trial today and unlock access to all premium features
            </p>
            <Link to="/register" className="btn-primary text-xl px-12 py-4 inline-block">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeaturesPage

