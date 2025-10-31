import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import { Sparkles, ArrowLeft, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const FAQPage = () => {
  const { isDarkMode } = useThemeStore()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    { q: "What is Innosthan?", a: "Innosthan is an AI-powered entrepreneurship education platform that helps aspiring entrepreneurs transform their ideas into successful startups through structured learning, mentorship, and community support." },
    { q: "How much does it cost?", a: "We offer flexible pricing plans starting from free access to premium features. Check our pricing page for detailed information on plans and features." },
    { q: "Do I need prior business experience?", a: "No prior experience is required! Our curriculum is designed for beginners to advanced entrepreneurs, with personalized learning paths based on your skill level." },
    { q: "How long does the program take?", a: "The program is self-paced. Most students complete the core curriculum in 3-6 months, but you can take as much time as you need." },
    { q: "Will I get a certificate?", a: "Yes! Upon completing each module and the overall program, you'll receive industry-recognized certificates to showcase your achievements." },
    { q: "Can I get help from mentors?", a: "Absolutely! We have a network of experienced entrepreneurs and industry experts who provide mentorship, feedback, and guidance throughout your journey." }
  ]

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
            <span className="gradient-text">Frequently Asked Questions</span>
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-white/80' : 'text-gray-600'} mb-8 max-w-3xl mx-auto`}>
            Find answers to common questions about Innosthan
          </p>
        </motion.div>
      </section>

      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-2xl overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{faq.q}</h3>
                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>{faq.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default FAQPage

