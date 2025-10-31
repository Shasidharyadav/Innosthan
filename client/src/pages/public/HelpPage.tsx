import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import { Sparkles, ArrowLeft, HelpCircle, Book, Video, MessageCircle } from 'lucide-react'

const HelpPage = () => {
  const { isDarkMode } = useThemeStore()

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      <div className="fixed inset-0 z-0">
        {!isDarkMode ? (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        )}
      </div>

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
        <Link to="/register" className="btn-primary">Get Started</Link>
      </nav>

      <section className="relative z-10 px-6 py-20 text-center">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Help Center</span>
          </h1>
          <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-white/80' : 'text-gray-600'} mb-8 max-w-3xl mx-auto`}>
            Find answers, guides, and support to help you succeed
          </p>
        </motion.div>
      </section>

      <section className="relative z-10 px-6 py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <HelpCircle className="w-8 h-8" />, title: "FAQs", desc: "Common questions answered", link: "/faq" },
            { icon: <Book className="w-8 h-8" />, title: "Documentation", desc: "Detailed guides & tutorials", link: "/resources" },
            { icon: <Video className="w-8 h-8" />, title: "Video Tutorials", desc: "Learn through videos", link: "/resources" },
            { icon: <MessageCircle className="w-8 h-8" />, title: "Contact Support", desc: "Get personalized help", link: "/contact" }
          ].map((item, index) => (
            <Link key={index} to={item.link}>
              <motion.div
                className="glass-card glass-card-hover p-6 rounded-2xl text-center h-full"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className={`mb-4 flex justify-center ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                  {item.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>{item.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HelpPage

