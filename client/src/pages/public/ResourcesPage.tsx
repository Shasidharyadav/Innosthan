import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import {
  Sparkles,
  ArrowLeft,
  Video,
  BookOpen,
  FileText,
  Code,
  Download,
  Play,
  Clock,
  Users,
  Star,
  Headphones
} from 'lucide-react'

const ResourcesPage = () => {
  const { isDarkMode } = useThemeStore()

  const resourceCategories = [
    {
      title: "Video Courses",
      icon: <Video className="w-8 h-8" />,
      description: "Comprehensive video tutorials covering every aspect of entrepreneurship",
      color: "from-purple-500 to-pink-500",
      items: [
        { title: "Introduction to Entrepreneurship", duration: "2h 30m", level: "Beginner", instructor: "Dr. Sarah Mitchell", rating: 4.8, students: "15k+" },
        { title: "Market Research & Analysis", duration: "3h 15m", level: "Intermediate", instructor: "Prof. James Wilson", rating: 4.9, students: "12k+" },
        { title: "Building Your MVP", duration: "4h 45m", level: "Advanced", instructor: "Alex Rodriguez", rating: 4.7, students: "10k+" },
        { title: "Pitching to Investors", duration: "2h 00m", level: "Intermediate", instructor: "Lisa Chen", rating: 4.9, students: "18k+" },
        { title: "Growth Hacking Strategies", duration: "3h 30m", level: "Advanced", instructor: "Mark Thompson", rating: 4.6, students: "8k+" }
      ]
    },
    {
      title: "Reading Materials",
      icon: <BookOpen className="w-8 h-8" />,
      description: "Curated ebooks, guides, and articles from industry experts",
      color: "from-blue-500 to-cyan-500",
      items: [
        { title: "The Lean Startup Handbook", pages: "250 pages", level: "Essential", author: "Innosthan Team", downloads: "25k+", format: "PDF, ePub" },
        { title: "Business Model Canvas Guide", pages: "120 pages", level: "Essential", author: "Dr. Emily Parker", downloads: "30k+", format: "PDF" },
        { title: "Customer Discovery Playbook", pages: "180 pages", level: "Intermediate", author: "John Davis", downloads: "15k+", format: "PDF, ePub" },
        { title: "Fundraising Strategies", pages: "200 pages", level: "Advanced", author: "Maria Garcia", downloads: "12k+", format: "PDF" },
        { title: "Scaling Your Startup", pages: "220 pages", level: "Advanced", author: "Robert Kim", downloads: "10k+", format: "PDF, ePub" }
      ]
    },
    {
      title: "Templates & Tools",
      icon: <FileText className="w-8 h-8" />,
      description: "Ready-to-use templates and tools to accelerate your startup journey",
      color: "from-amber-500 to-orange-500",
      items: [
        { title: "Business Model Canvas Template", downloads: "15k+", type: "PDF, Figma", category: "Planning", size: "2.5 MB" },
        { title: "Financial Projection Calculator", downloads: "12k+", type: "Excel, Google Sheets", category: "Finance", size: "5.2 MB" },
        { title: "Pitch Deck Template", downloads: "20k+", type: "PowerPoint, Keynote", category: "Pitching", size: "8.1 MB" },
        { title: "Market Research Framework", downloads: "8k+", type: "PDF, Word", category: "Research", size: "3.7 MB" },
        { title: "OKR Tracking Template", downloads: "10k+", type: "Excel, Google Sheets", category: "Management", size: "4.3 MB" }
      ]
    },
    {
      title: "Code Resources",
      icon: <Code className="w-8 h-8" />,
      description: "Open-source code, boilerplates, and development resources",
      color: "from-green-500 to-emerald-500",
      items: [
        { title: "MVP Starter Kits", repos: "50+", tech: "React, Node, Python", stars: "12k+", category: "Full Stack" },
        { title: "API Integration Guides", repos: "30+", tech: "REST, GraphQL", stars: "8k+", category: "Backend" },
        { title: "Mobile App Templates", repos: "40+", tech: "React Native, Flutter", stars: "15k+", category: "Mobile" },
        { title: "Authentication Boilerplates", repos: "25+", tech: "Auth0, JWT, OAuth", stars: "10k+", category: "Security" },
        { title: "Payment Integration Kits", repos: "20+", tech: "Stripe, PayPal", stars: "7k+", category: "Payments" }
      ]
    },
    {
      title: "Podcasts & Webinars",
      icon: <Headphones className="w-8 h-8" />,
      description: "Learn from successful entrepreneurs and industry experts",
      color: "from-red-500 to-pink-500",
      items: [
        { title: "Founder Stories Podcast", episodes: "150+", duration: "45 min avg", host: "Emma Watson", subscribers: "50k+" },
        { title: "Tech Talks Weekly", episodes: "200+", duration: "30 min avg", host: "David Lee", subscribers: "75k+" },
        { title: "Startup Success Webinar Series", episodes: "50+", duration: "90 min avg", host: "Various Experts", attendees: "100k+" },
        { title: "Investment Insights", episodes: "80+", duration: "60 min avg", host: "Michael Chen", subscribers: "40k+" }
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
            <span className="gradient-text">Resource Library</span>
          </h1>
          <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-white/80' : 'text-gray-600'} mb-8 max-w-3xl mx-auto`}>
            Comprehensive collection of tools, templates, and learning materials to accelerate your entrepreneurial journey
          </p>
        </motion.div>
      </section>

      {/* Resource Categories */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto space-y-20">
          {resourceCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Category Header */}
              <div className="flex items-center space-x-4 mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${category.color} text-white shadow-lg`}>
                  {category.icon}
                </div>
                <div>
                  <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {category.title}
                  </h2>
                  <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Category Items */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="glass-card glass-card-hover p-6 rounded-2xl"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className={`text-lg font-bold flex-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </h3>
                      {category.title === "Video Courses" && (
                        <Play className={`w-5 h-5 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                      )}
                      {category.title !== "Video Courses" && category.title !== "Podcasts & Webinars" && (
                        <Download className={`w-5 h-5 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      {Object.entries(item).slice(1).map(([key, value], i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className={isDarkMode ? 'text-white/60' : 'text-gray-500'}>{key}:</span>
                          <span className={`font-medium ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>{value}</span>
                        </div>
                      ))}
                    </div>

                    {category.title === "Video Courses" && item.rating && (
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(item.rating)
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          {item.rating}/5
                        </span>
                        <Users className="w-4 h-4 ml-2" />
                        <span className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          {item.students}
                        </span>
                      </div>
                    )}

                    <button className={`w-full py-2.5 rounded-xl font-semibold transition-all ${
                      isDarkMode 
                        ? 'bg-white/10 hover:bg-white/20 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}>
                      {category.title === "Video Courses" ? "Start Learning" : 
                       category.title === "Podcasts & Webinars" ? "Listen Now" : "Download"}
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button className="btn-secondary px-8 py-3">
                  View All {category.title}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className={`relative z-10 px-6 py-20 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Resource Library Stats</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Video Hours", value: "500+" },
              { label: "Ebooks", value: "200+" },
              { label: "Templates", value: "150+" },
              { label: "Code Repos", value: "300+" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 rounded-3xl">
            <h2 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Access All Resources</span>
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-white/80' : 'text-gray-600'} mb-8`}>
              Sign up now to unlock unlimited access to our entire resource library
            </p>
            <Link to="/register" className="btn-primary text-xl px-12 py-4 inline-block">
              Get Full Access
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ResourcesPage

