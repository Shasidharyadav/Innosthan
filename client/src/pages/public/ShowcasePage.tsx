import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import {
  Sparkles,
  ArrowLeft,
  TrendingUp,
  Users,
  DollarSign,
  Award,
  ExternalLink,
  Calendar
} from 'lucide-react'

const ShowcasePage = () => {
  const { isDarkMode } = useThemeStore()

  const showcaseProjects = [
    {
      name: "EcoTrack",
      founder: "Sarah Johnson",
      foundedYear: "2023",
      description: "AI-powered carbon footprint tracking app helping businesses reduce emissions by 40% through smart analytics and actionable insights.",
      longDescription: "EcoTrack revolutionizes how businesses approach sustainability by providing real-time carbon tracking, AI-powered recommendations, and seamless integration with existing business tools. The platform has helped over 50,000 businesses achieve their net-zero goals.",
      image: "🌱",
      metrics: { users: "50k+", funding: "$2M", growth: "+150%", team: "15" },
      tags: ["SaaS", "Climate Tech", "B2B", "AI"],
      website: "#"
    },
    {
      name: "HealthHub",
      founder: "Dr. Michael Chen",
      foundedYear: "2022",
      description: "Revolutionary telemedicine platform connecting patients with specialists using AI-powered diagnosis assistance and virtual consultations.",
      longDescription: "HealthHub is transforming healthcare access by leveraging AI to provide preliminary diagnoses, connect patients with the right specialists, and enable seamless virtual consultations. Available 24/7 in over 50 countries.",
      image: "🏥",
      metrics: { users: "100k+", funding: "$5M", growth: "+200%", team: "45" },
      tags: ["HealthTech", "AI", "Mobile", "B2C"],
      website: "#"
    },
    {
      name: "EduLearn",
      founder: "Priya Patel",
      foundedYear: "2023",
      description: "Personalized learning platform for K-12 students with adaptive curriculum that adjusts to each student's learning pace and style.",
      longDescription: "EduLearn uses advanced machine learning algorithms to create personalized learning paths for students, helping them master concepts at their own pace. Teachers get detailed insights into student progress and areas needing attention.",
      image: "📚",
      metrics: { users: "250k+", funding: "$3M", growth: "+180%", team: "30" },
      tags: ["EdTech", "AI", "Education", "Mobile"],
      website: "#"
    },
    {
      name: "FinWise",
      founder: "David Martinez",
      foundedYear: "2023",
      description: "Smart financial planning tool helping millennials and Gen-Z achieve financial goals through AI-driven insights and automated savings.",
      longDescription: "FinWise democratizes financial planning by making it accessible and easy to understand. The app provides personalized investment strategies, automated savings plans, and educational content to help users build wealth.",
      image: "💰",
      metrics: { users: "75k+", funding: "$1.5M", growth: "+120%", team: "20" },
      tags: ["FinTech", "Personal Finance", "Mobile", "B2C"],
      website: "#"
    },
    {
      name: "CodeCraft",
      founder: "Alex Kim",
      foundedYear: "2022",
      description: "Interactive coding platform teaching programming through gamification and real-world projects for aspiring developers.",
      longDescription: "CodeCraft makes learning to code fun and engaging through game-like challenges, interactive tutorials, and real-world projects. Students build a portfolio while learning multiple programming languages.",
      image: "💻",
      metrics: { users: "150k+", funding: "$4M", growth: "+220%", team: "35" },
      tags: ["EdTech", "Developer Tools", "Gamification"],
      website: "#"
    },
    {
      name: "FoodFlow",
      founder: "Maria Garcia",
      foundedYear: "2023",
      description: "Supply chain platform reducing food waste by connecting farms directly with restaurants using predictive analytics.",
      longDescription: "FoodFlow tackles the global food waste problem by optimizing the supply chain between farms and restaurants. AI predictions help match supply with demand, reducing waste by up to 60%.",
      image: "🍽️",
      metrics: { users: "30k+", funding: "$2.5M", growth: "+160%", team: "25" },
      tags: ["FoodTech", "Supply Chain", "Sustainability", "B2B"],
      website: "#"
    }
  ]

  const stats = [
    { label: "Total Startups", value: "500+", icon: <Award className="w-8 h-8" /> },
    { label: "Combined Funding", value: "$50M+", icon: <DollarSign className="w-8 h-8" /> },
    { label: "Active Users", value: "1M+", icon: <Users className="w-8 h-8" /> },
    { label: "Average Growth", value: "+165%", icon: <TrendingUp className="w-8 h-8" /> }
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
            <span className="gradient-text">Success Stories</span>
          </h1>
          <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-white/80' : 'text-gray-600'} mb-8 max-w-3xl mx-auto`}>
            Meet the innovative startups built by our community members who turned their dreams into thriving businesses
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-2xl text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`mb-3 flex justify-center ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {showcaseProjects.map((project, index) => (
              <motion.div
                key={index}
                className="glass-card glass-card-hover p-8 rounded-3xl"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="text-6xl">{project.image}</div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {project.name}
                    </h3>
                    <div className="flex items-center space-x-3 mb-3">
                      <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        Founded by {project.founder}
                      </p>
                      <span className={`flex items-center space-x-1 text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        <Calendar className="w-4 h-4" />
                        <span>{project.foundedYear}</span>
                      </span>
                    </div>
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
                
                <p className={`mb-4 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  {project.description}
                </p>

                <p className={`mb-6 text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
                  {project.longDescription}
                </p>

                <div className="grid grid-cols-4 gap-3 mb-6">
                  {Object.entries(project.metrics).map(([key, value], i) => (
                    <div key={i} className={`text-center p-3 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                      <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {value}
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-gray-500'} capitalize`}>
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                <a 
                  href={project.website}
                  className={`flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold transition-all ${
                    isDarkMode 
                      ? 'bg-white/10 hover:bg-white/20 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
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
              <span className="gradient-text">Your Success Story Starts Here</span>
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-white/80' : 'text-gray-600'} mb-8`}>
              Join our community and build the next big startup featured on this page
            </p>
            <Link to="/register" className="btn-primary text-xl px-12 py-4 inline-block">
              Start Building Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ShowcasePage

