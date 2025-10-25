import { motion } from 'framer-motion'
import { Users, MessageCircle, Heart, Share, Search, Filter, Plus, TrendingUp, Award, Clock } from 'lucide-react'
import { useState } from 'react'

const CommunityHub = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const posts = [
    {
      id: 1,
      author: 'Sarah Chen',
      role: 'Student',
      avatar: 'SC',
      time: '2 hours ago',
      content: 'Just completed the ideation module! The problem-solution fit framework was incredibly helpful. Anyone else working on their value proposition? Would love to discuss different approaches!',
      likes: 12,
      comments: 5,
      tags: ['ideation', 'value-proposition', 'discussion'],
      category: 'learning',
      trending: true
    },
    {
      id: 2,
      author: 'Dr. Raj Patel',
      role: 'Mentor',
      avatar: 'RP',
      time: '4 hours ago',
      content: 'Pro tip: When validating your idea, talk to at least 50 potential customers before building anything. Quality over quantity in customer interviews! What questions do you ask during customer discovery?',
      likes: 28,
      comments: 8,
      tags: ['validation', 'customer-interviews', 'mentor-tip'],
      category: 'mentor-tip',
      trending: true
    },
    {
      id: 3,
      author: 'Alex Kumar',
      role: 'Student',
      avatar: 'AK',
      time: '1 day ago',
      content: 'Looking for a co-founder for my ed-tech startup. We have a solid MVP and initial traction. DM me if interested! Also open to feedback on our current approach.',
      likes: 15,
      comments: 12,
      tags: ['co-founder', 'ed-tech', 'startup', 'collaboration'],
      category: 'collaboration',
      trending: false
    },
    {
      id: 4,
      author: 'Maria Garcia',
      role: 'Student',
      avatar: 'MG',
      time: '2 days ago',
      content: 'Just got my first customer! 🎉 The validation process was tough but worth it. Here are the key lessons I learned...',
      likes: 45,
      comments: 18,
      tags: ['success-story', 'validation', 'customer-acquisition'],
      category: 'success',
      trending: true
    },
    {
      id: 5,
      author: 'John Smith',
      role: 'Student',
      avatar: 'JS',
      time: '3 days ago',
      content: 'Struggling with pricing strategy for my SaaS product. Any mentors or experienced founders who can share insights on pricing models?',
      likes: 8,
      comments: 6,
      tags: ['pricing', 'saas', 'help-needed'],
      category: 'help',
      trending: false
    }
  ]

  const categories = [
    { id: 'all', name: 'All Posts', count: posts.length },
    { id: 'learning', name: 'Learning', count: posts.filter(p => p.category === 'learning').length },
    { id: 'mentor-tip', name: 'Mentor Tips', count: posts.filter(p => p.category === 'mentor-tip').length },
    { id: 'success', name: 'Success Stories', count: posts.filter(p => p.category === 'success').length },
    { id: 'collaboration', name: 'Collaboration', count: posts.filter(p => p.category === 'collaboration').length },
    { id: 'help', name: 'Help Needed', count: posts.filter(p => p.category === 'help').length }
  ]

  const filteredPosts = posts.filter(post => {
    const matchesFilter = activeFilter === 'all' || post.category === activeFilter
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'learning': return 'bg-violet-500/20 text-violet-400 border-violet-500/30'
      case 'mentor-tip': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'success': return 'bg-mint-500/20 text-mint-400 border-mint-500/30'
      case 'collaboration': return 'bg-pink-500/20 text-pink-400 border-pink-500/30'
      case 'help': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      default: return 'bg-white/10 text-white/60 border-white/20'
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Community Hub 🌟</h1>
          <p className="text-white/60 text-lg">Connect, learn, and grow with fellow entrepreneurs from around the world</p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">1,247</div>
                <div className="text-sm text-white/60">Active Members</div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">3,421</div>
                <div className="text-sm text-white/60">Discussions</div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-mint-500 to-teal-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">89%</div>
                <div className="text-sm text-white/60">Helpful Posts</div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">156</div>
                <div className="text-sm text-white/60">Success Stories</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="glass-card p-6 rounded-2xl mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search discussions, topics, or people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-violet-500 focus:bg-white/10 transition-all"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-white/40" />
              <span className="text-white/60 text-sm">Filter by:</span>
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === category.id
                    ? 'bg-violet-500 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="glass-card glass-card-hover p-6 rounded-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {/* Post Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-white font-semibold">{post.author}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.role === 'Mentor' 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                    }`}>
                      {post.role}
                    </span>
                    {post.trending && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        🔥 Trending
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-white/60 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{post.time}</span>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-white mb-4 leading-relaxed">{post.content}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-white/10 text-white/70 text-sm rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-white/60 hover:text-pink-400 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-white/60 hover:text-violet-400 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-white/60 hover:text-primary-400 transition-colors">
                    <Share className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                  {post.category.replace('-', ' ')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Post Button */}
        <motion.div
          className="fixed bottom-8 right-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button className="w-14 h-14 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
            <Plus className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Community Guidelines */}
        <motion.div
          className="mt-8 glass-card p-6 rounded-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">🤝 Community Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-mint-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-mint-400 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Be Respectful</h3>
                  <p className="text-white/60 text-sm">Treat everyone with kindness and respect</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-violet-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Share Knowledge</h3>
                  <p className="text-white/60 text-sm">Help others by sharing your experiences</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Stay On Topic</h3>
                  <p className="text-white/60 text-sm">Keep discussions relevant to entrepreneurship</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Encourage Others</h3>
                  <p className="text-white/60 text-sm">Support fellow entrepreneurs in their journey</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CommunityHub
