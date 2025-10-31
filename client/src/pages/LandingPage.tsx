import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Users, 
  Trophy, 
  Brain, 
  ArrowRight,
  Play,
  Target,
  Lightbulb,
  BookOpen,
  Video,
  FileText,
  Code,
  Mic,
  Award,
  Globe,
  Rocket,
  Heart,
  Shield,
  TrendingUp,
  CheckCircle,
  Download,
  Sun,
  Moon,
  Menu,
  X,
  Zap,
  Users2,
  Building2,
  GraduationCap
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useThemeStore } from '../stores/themeStore'

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isDarkMode, toggleTheme } = useThemeStore()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    // Apply theme on mount
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDarkMode])

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Personalized mentorship with GPT-4 integration for contextual guidance and real-time support"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Idea to Incubation",
      description: "Complete journey from concept validation to MVP development and scaling"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Hub",
      description: "Connect with mentors, peers, and potential co-founders in our vibrant ecosystem"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Gamified Progress",
      description: "XP system, badges, and leaderboards to track your growth and celebrate achievements"
    }
  ]

  const modules = [
    { id: 0, title: "Foundation", description: "Entrepreneurship basics and mindset", icon: <Building2 className="w-6 h-6" /> },
    { id: 1, title: "Ideation", description: "Problem identification and solution design", icon: <Lightbulb className="w-6 h-6" /> },
    { id: 2, title: "Validation", description: "Market research and customer discovery", icon: <CheckCircle className="w-6 h-6" /> },
    { id: 3, title: "Business Model", description: "Lean canvas and value proposition", icon: <FileText className="w-6 h-6" /> },
    { id: 4, title: "MVP Development", description: "Minimum viable product development", icon: <Code className="w-6 h-6" /> },
    { id: 5, title: "Pitch Preparation", description: "Investor pitch and presentation skills", icon: <Mic className="w-6 h-6" /> },
    { id: 6, title: "Funding", description: "Investment strategies and fundraising", icon: <TrendingUp className="w-6 h-6" /> },
    { id: 7, title: "Scaling", description: "Growth strategies and team building", icon: <Rocket className="w-6 h-6" /> },
    { id: 8, title: "Incubation", description: "Accelerator programs and mentorship", icon: <Award className="w-6 h-6" /> }
  ]

  const resources = [
    {
      category: "Video Courses",
      icon: <Video className="w-6 h-6" />,
      items: [
        { title: "Introduction to Entrepreneurship", duration: "2h 30m", level: "Beginner" },
        { title: "Market Research & Analysis", duration: "3h 15m", level: "Intermediate" },
        { title: "Building Your MVP", duration: "4h 45m", level: "Advanced" },
        { title: "Pitching to Investors", duration: "2h 00m", level: "Intermediate" }
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      category: "Reading Materials",
      icon: <BookOpen className="w-6 h-6" />,
      items: [
        { title: "The Lean Startup Handbook", pages: "250 pages", level: "Essential" },
        { title: "Business Model Canvas Guide", pages: "120 pages", level: "Essential" },
        { title: "Customer Discovery Playbook", pages: "180 pages", level: "Intermediate" },
        { title: "Fundraising Strategies", pages: "200 pages", level: "Advanced" }
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      category: "Templates & Tools",
      icon: <FileText className="w-6 h-6" />,
      items: [
        { title: "Business Model Canvas Template", downloads: "15k+", type: "PDF" },
        { title: "Financial Projection Calculator", downloads: "12k+", type: "Excel" },
        { title: "Pitch Deck Template", downloads: "20k+", type: "PowerPoint" },
        { title: "Market Research Framework", downloads: "8k+", type: "PDF" }
      ],
      color: "from-amber-500 to-orange-500"
    },
    {
      category: "Code Resources",
      icon: <Code className="w-6 h-6" />,
      items: [
        { title: "MVP Starter Kits", repos: "50+", tech: "React, Node" },
        { title: "API Integration Guides", repos: "30+", tech: "REST, GraphQL" },
        { title: "Mobile App Templates", repos: "40+", tech: "React Native" },
        { title: "Authentication Boilerplates", repos: "25+", tech: "Auth0, JWT" }
      ],
      color: "from-green-500 to-emerald-500"
    }
  ]

  const showcaseProjects = [
    {
      name: "EcoTrack",
      founder: "Sarah Johnson",
      description: "Carbon footprint tracking app helping businesses reduce emissions by 40%",
      image: "🌱",
      metrics: { users: "50k+", funding: "$2M", growth: "+150%" },
      tags: ["SaaS", "Climate Tech", "B2B"]
    },
    {
      name: "HealthHub",
      founder: "Michael Chen",
      description: "AI-powered telemedicine platform connecting patients with specialists",
      image: "🏥",
      metrics: { users: "100k+", funding: "$5M", growth: "+200%" },
      tags: ["HealthTech", "AI", "Mobile"]
    },
    {
      name: "EduLearn",
      founder: "Priya Patel",
      description: "Personalized learning platform for K-12 students with adaptive curriculum",
      image: "📚",
      metrics: { users: "250k+", funding: "$3M", growth: "+180%" },
      tags: ["EdTech", "AI", "Education"]
    },
    {
      name: "FinWise",
      founder: "David Martinez",
      description: "Smart financial planning tool helping millennials achieve financial goals",
      image: "💰",
      metrics: { users: "75k+", funding: "$1.5M", growth: "+120%" },
      tags: ["FinTech", "Personal Finance", "Mobile"]
    }
  ]

  const stats = [
    { label: "Active Students", value: "10,000+", icon: <Users2 className="w-8 h-8" /> },
    { label: "Startups Launched", value: "500+", icon: <Rocket className="w-8 h-8" /> },
    { label: "Total Funding Raised", value: "$50M+", icon: <TrendingUp className="w-8 h-8" /> },
    { label: "Success Rate", value: "85%", icon: <Award className="w-8 h-8" /> }
  ]

  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Founder & CEO",
      image: "👨‍💼",
      bio: "Former startup founder with 15+ years in entrepreneurship education",
      expertise: ["EdTech", "Mentorship", "Strategy"]
    },
    {
      name: "Emily Thompson",
      role: "Chief Learning Officer",
      image: "👩‍🏫",
      bio: "PhD in Education, specialized in gamified learning systems",
      expertise: ["Curriculum Design", "Gamification", "AI Learning"]
    },
    {
      name: "Alex Rodriguez",
      role: "Head of Technology",
      image: "👨‍💻",
      bio: "Former Google engineer, passionate about AI-powered education",
      expertise: ["AI/ML", "Platform Engineering", "Innovation"]
    },
    {
      name: "Lisa Wang",
      role: "Community Director",
      image: "👩‍💼",
      bio: "Built communities for 100k+ entrepreneurs globally",
      expertise: ["Community Building", "Networking", "Events"]
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black overflow-hidden transition-colors duration-500">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {!isDarkMode ? (
          <>
            {/* Light Mode Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50" />
            <div 
              className="absolute inset-0 opacity-20 transition-all duration-300"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.15) 0%, rgba(236, 72, 153, 0.1) 30%, transparent 70%)`
              }}
            />
            {/* Subtle Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
            />
          </>
        ) : (
          <>
            {/* Dark Mode Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div 
          className="absolute inset-0 opacity-40 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.4) 0%, rgba(236, 72, 153, 0.2) 30%, transparent 70%)`
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.4) 0%, rgba(236, 72, 153, 0.2) 30%, transparent 70%)`
          }}
        />
            {/* Floating Orbs in Dark Mode */}
            {[...Array(6)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl"
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl"
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
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

      {/* Navigation */}
      <motion.nav 
        className={`relative z-50 flex items-center justify-between p-6 backdrop-blur-md ${
          isDarkMode ? 'bg-black/50' : 'bg-white/80'
        } border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'} sticky top-0`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text">Innosthan</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/features" className={`${isDarkMode ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
            Features
          </Link>
          <Link to="/showcase" className={`${isDarkMode ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
            Showcase
          </Link>
          <Link to="/resources" className={`${isDarkMode ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
            Resources
          </Link>
          <Link to="/about" className={`${isDarkMode ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
            About
          </Link>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
          </button>
          <Link 
            to="/login" 
            className={`${isDarkMode ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
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

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors`}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-[73px] left-0 right-0 z-40 p-6 ${
            isDarkMode ? 'bg-black/95' : 'bg-white/95'
          } backdrop-blur-lg border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'} md:hidden`}
        >
          <div className="flex flex-col space-y-4">
            <Link to="/features" className={`${isDarkMode ? 'text-white/80' : 'text-gray-600'} hover:text-violet-600`} onClick={() => setMobileMenuOpen(false)}>
              Features
            </Link>
            <Link to="/showcase" className={`${isDarkMode ? 'text-white/80' : 'text-gray-600'} hover:text-violet-600`} onClick={() => setMobileMenuOpen(false)}>
              Showcase
            </Link>
            <Link to="/resources" className={`${isDarkMode ? 'text-white/80' : 'text-gray-600'} hover:text-violet-600`} onClick={() => setMobileMenuOpen(false)}>
              Resources
            </Link>
            <Link to="/about" className={`${isDarkMode ? 'text-white/80' : 'text-gray-600'} hover:text-violet-600`} onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/login" className={`${isDarkMode ? 'text-white/80' : 'text-gray-600'} hover:text-violet-600`} onClick={() => setMobileMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" className="btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>
              Get Started
            </Link>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
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
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              textShadow: '0 0 80px rgba(139, 92, 246, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)',
            }}
          >
            <span className="gradient-text">Transform Ideas</span>
            <br />
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Into Reality</span>
          </motion.h1>
          
          <motion.p 
            className={`text-xl md:text-2xl ${isDarkMode ? 'text-white/80' : 'text-gray-600'} mb-8 max-w-3xl mx-auto`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            From concept to incubation with AI-powered mentorship, gamified learning, 
            and a thriving entrepreneurial community. Join 10,000+ innovators building the future.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
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

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mt-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-2xl"
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className={`${isDarkMode ? 'text-violet-400' : 'text-violet-600'} mb-2 flex justify-center`}>
                  {stat.icon}
                </div>
                <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Why Choose Innosthan?</span>
          </h2>
            <p className={`text-lg ${isDarkMode ? 'text-white/70' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Everything you need to transform your entrepreneurial dreams into successful ventures
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card glass-card-hover p-6 rounded-2xl text-center relative overflow-hidden group"
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
                <motion.div 
                  className="mb-4 flex justify-center"
                  whileHover={{ scale: 1.2, rotateZ: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{
                      background: index % 4 === 0 
                        ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                        : index % 4 === 1
                        ? 'linear-gradient(135deg, #ec4899, #db2777)'
                        : index % 4 === 2
                        ? 'linear-gradient(135deg, #06b6d4, #0891b2)'
                        : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    }}
                  >
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                </motion.div>
                
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
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

      {/* Learning Journey/Modules Section */}
      <section className="relative z-10 px-6 py-20">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Your Learning Journey</span>
          </h2>
            <p className={`text-lg ${isDarkMode ? 'text-white/70' : 'text-gray-600'} max-w-2xl mx-auto`}>
              9 comprehensive modules designed to take you from ideation to incubation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
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
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                    {module.id}
                  </div>
                  <div className={isDarkMode ? 'text-violet-400' : 'text-violet-600'}>
                    {module.icon}
                  </div>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {module.title}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  {module.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className={`relative z-10 px-6 py-20 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Success Stories</span>
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-white/70' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Meet the innovative startups built by our community members
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {showcaseProjects.map((project, index) => (
              <motion.div
                key={index}
                className="glass-card glass-card-hover p-8 rounded-3xl"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="text-6xl">{project.image}</div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {project.name}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-500'} mb-3`}>
                      Founded by {project.founder}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isDarkMode ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className={`mb-6 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  {project.description}
                </p>

                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(project.metrics).map(([metricKey, value], i) => (
                    <div key={i} className={`text-center p-3 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                      <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {value}
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-gray-500'} capitalize`}>
                        {metricKey}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Resource Library Section */}
      <section id="resources" className="relative z-10 px-6 py-20">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Resource Library</span>
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-white/70' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Comprehensive collection of tools, templates, and learning materials to accelerate your journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 rounded-3xl"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${resource.color} text-white shadow-lg`}
                  >
                    {resource.icon}
                  </div>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {resource.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {resource.items.map((item, i) => (
                    <motion.div
                      key={i}
                      className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'} transition-colors cursor-pointer`}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </h4>
                        <Download className={`w-4 h-4 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        {Object.entries(item).slice(1).map(([, value], j) => (
                          <span key={j} className={isDarkMode ? 'text-white/60' : 'text-gray-500'}>
                            {value}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button className={`mt-6 w-full py-3 rounded-xl font-semibold transition-all ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}>
                  Browse All {resource.category}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section id="about" className={`relative z-10 px-6 py-20 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">About Innosthan</span>
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-white/70' : 'text-gray-600'} max-w-3xl mx-auto`}>
              We're on a mission to democratize entrepreneurship education and empower the next generation of innovators
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              className="glass-card p-8 rounded-3xl text-center"
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Our Mission
              </h3>
              <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
                To provide accessible, high-quality entrepreneurship education that transforms ideas into successful ventures
              </p>
            </motion.div>

            <motion.div
              className="glass-card p-8 rounded-3xl text-center"
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Our Vision
              </h3>
              <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
                A world where anyone with a great idea has the resources and support to bring it to life
              </p>
            </motion.div>

            <motion.div
              className="glass-card p-8 rounded-3xl text-center"
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Our Values
              </h3>
              <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
                Innovation, integrity, collaboration, and continuous learning drive everything we do
              </p>
            </motion.div>
          </div>

          {/* Team Section */}
          <div className="mb-12">
            <h3 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Meet Our Team
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="glass-card glass-card-hover p-6 rounded-2xl text-center"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h4 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-violet-400' : 'text-violet-600'} mb-3`}>
                    {member.role}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'} mb-4`}>
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((skill, i) => (
                      <span 
                        key={i}
                        className={`px-2 py-1 rounded-full text-xs ${
                          isDarkMode ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Impact Numbers */}
          <motion.div 
            className="glass-card p-12 rounded-3xl text-center"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Impact in Numbers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">500+</div>
                <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>Startups Launched</div>
              </div>
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">$50M+</div>
                <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>Funding Raised</div>
              </div>
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">10,000+</div>
                <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>Active Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">85%</div>
                <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>Success Rate</div>
              </div>
            </div>
          </motion.div>
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
              <Zap className={`w-16 h-16 mx-auto mb-6 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Ready to Build the Future?</span>
              </h2>
              <p className={`text-xl ${isDarkMode ? 'text-white/80' : 'text-gray-600'} mb-8`}>
                Join thousands of entrepreneurs who are already transforming their ideas into successful ventures.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                to="/register" 
                className="btn-primary text-xl px-12 py-4 inline-flex items-center space-x-3"
              >
                  <GraduationCap className="w-6 h-6" />
                  <span>Start Learning Today</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
                <button className="btn-secondary text-xl px-12 py-4 inline-flex items-center space-x-3">
                  <Play className="w-6 h-6" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 px-6 py-12 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">Innosthan</span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                Empowering the next generation of entrepreneurs with AI-powered learning.
              </p>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Platform</h4>
              <ul className="space-y-2">
                <li><Link to="/features" className={`text-sm ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Features</Link></li>
                <li><Link to="/showcase" className={`text-sm ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Showcase</Link></li>
                <li><Link to="/resources" className={`text-sm ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Resources</Link></li>
                <li><Link to="/about" className={`text-sm ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Support</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className={`text-sm ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Help Center</Link></li>
                <li><Link to="/showcase" className={`text-sm ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Community</Link></li>
                <li><Link to="/contact" className={`text-sm ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Contact Us</Link></li>
                <li><Link to="/faq" className={`text-sm ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className={`text-sm ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Privacy Policy</Link></li>
                <li><Link to="/terms" className={`text-sm ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Terms of Service</Link></li>
                <li><Link to="/cookies" className={`text-sm ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className={`text-center pt-8 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
            <p className={`${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
            © 2024 Innosthan. Empowering the next generation of entrepreneurs.
          </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
