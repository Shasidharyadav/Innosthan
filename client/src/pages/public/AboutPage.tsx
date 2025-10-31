import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useThemeStore } from '../../stores/themeStore'
import {
  Sparkles,
  ArrowLeft,
  Heart,
  Globe,
  Shield,
  Target,
  Users,
  Award,
  Rocket,
  TrendingUp,
  Zap,
  Lightbulb
} from 'lucide-react'

const AboutPage = () => {
  const { isDarkMode } = useThemeStore()

  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Founder & CEO",
      image: "👨‍💼",
      bio: "Former startup founder with 15+ years in entrepreneurship education. Previously led accelerator programs at Y Combinator and Techstars.",
      expertise: ["EdTech", "Mentorship", "Strategy"],
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Emily Thompson",
      role: "Chief Learning Officer",
      image: "👩‍🏫",
      bio: "PhD in Education from Stanford, specialized in gamified learning systems. Published researcher with 50+ papers on adaptive learning.",
      expertise: ["Curriculum Design", "Gamification", "AI Learning"],
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Alex Rodriguez",
      role: "Head of Technology",
      image: "👨‍💻",
      bio: "Former Google engineer with expertise in AI/ML. Built recommendation systems serving 100M+ users.",
      expertise: ["AI/ML", "Platform Engineering", "Innovation"],
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Lisa Wang",
      role: "Community Director",
      image: "👩‍💼",
      bio: "Built communities for 100k+ entrepreneurs globally. Former community lead at LinkedIn and Product Hunt.",
      expertise: ["Community Building", "Networking", "Events"],
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Michael Chen",
      role: "Chief Product Officer",
      image: "👨‍💼",
      bio: "Product leader with experience at Airbnb and Uber. Launched products used by millions worldwide.",
      expertise: ["Product Strategy", "UX Design", "Growth"],
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Sarah Mitchell",
      role: "VP of Partnerships",
      image: "👩‍💼",
      bio: "Former venture capitalist with $500M+ in deals. Extensive network of investors and corporate partners.",
      expertise: ["Fundraising", "Partnerships", "BD"],
      linkedin: "#",
      twitter: "#"
    }
  ]

  const timeline = [
    { year: "2020", title: "Founded", description: "Innosthan was born from a vision to democratize entrepreneurship education" },
    { year: "2021", title: "First 1,000 Students", description: "Reached our first milestone with students from 50+ countries" },
    { year: "2022", title: "Series A Funding", description: "Raised $10M to scale our platform and expand globally" },
    { year: "2023", title: "100+ Startups Launched", description: "Our community launched over 100 successful startups" },
    { year: "2024", title: "10,000+ Active Students", description: "Growing community with $50M+ in total funding raised" }
  ]

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation First",
      description: "We constantly push boundaries to create better learning experiences and tools for entrepreneurs"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Student Success",
      description: "Your success is our success. We're committed to helping every student achieve their entrepreneurial dreams"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Power",
      description: "We believe in the power of community and collaboration to drive innovation and growth"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Integrity & Trust",
      description: "We operate with transparency, honesty, and the highest ethical standards in everything we do"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Impact",
      description: "Making entrepreneurship education accessible to everyone, everywhere, regardless of background"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Continuous Learning",
      description: "We practice what we teach - constantly learning, iterating, and improving our platform"
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
            <span className="gradient-text">About Innosthan</span>
          </h1>
          <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-white/80' : 'text-gray-600'} mb-8 max-w-3xl mx-auto`}>
            Empowering the next generation of entrepreneurs to build innovative solutions that change the world
          </p>
        </motion.div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <motion.div
              className="glass-card p-8 rounded-3xl text-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Our Mission
              </h3>
              <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
                To provide accessible, high-quality entrepreneurship education that transforms ideas into successful ventures and empowers individuals to create positive change in the world.
              </p>
            </motion.div>

            <motion.div
              className="glass-card p-8 rounded-3xl text-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Our Vision
              </h3>
              <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
                A world where anyone with a great idea has the resources, support, and knowledge to bring it to life, regardless of their background or location.
              </p>
            </motion.div>

            <motion.div
              className="glass-card p-8 rounded-3xl text-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Our Impact
              </h3>
              <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
                500+ startups launched, $50M+ in funding raised, 10,000+ entrepreneurs empowered, and communities transformed across 100+ countries worldwide.
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Our Core Values</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="glass-card glass-card-hover p-6 rounded-2xl"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`mb-4 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                  {value.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {value.title}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={`relative z-10 px-6 py-20 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="gradient-text">Our Journey</span>
          </h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-2xl"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 flex-shrink-0 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {item.year}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </h3>
                    <p className={isDarkMode ? 'text-white/70' : 'text-gray-600'}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Meet Our Team</span>
          </h2>
          <p className={`text-center text-lg ${isDarkMode ? 'text-white/70' : 'text-gray-600'} mb-16 max-w-2xl mx-auto`}>
            Passionate innovators, educators, and entrepreneurs committed to your success
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="glass-card glass-card-hover p-8 rounded-3xl text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {member.name}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-violet-400' : 'text-violet-600'} mb-4`}>
                  {member.role}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'} mb-4`}>
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.expertise.map((skill, i) => (
                    <span 
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
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
      </section>

      {/* Stats Section */}
      <section className={`relative z-10 px-6 py-20 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Our Impact in Numbers</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Rocket className="w-8 h-8" />, value: "500+", label: "Startups Launched" },
              { icon: <TrendingUp className="w-8 h-8" />, value: "$50M+", label: "Funding Raised" },
              { icon: <Users className="w-8 h-8" />, value: "10,000+", label: "Active Students" },
              { icon: <Award className="w-8 h-8" />, value: "85%", label: "Success Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-2xl text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className={`mb-3 flex justify-center ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>{stat.label}</div>
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
              <span className="gradient-text">Join Our Mission</span>
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-white/80' : 'text-gray-600'} mb-8`}>
              Be part of a global community transforming entrepreneurship education
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/register" className="btn-primary text-xl px-12 py-4">
                Start Your Journey
              </Link>
              <Link to="/contact" className="btn-secondary text-xl px-12 py-4">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage

