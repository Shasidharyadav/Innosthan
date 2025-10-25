import { motion } from 'framer-motion'
import { Users, MessageCircle, Heart, Share, Search, Filter } from 'lucide-react'

const CommunityHub = () => {
  const posts = [
    {
      id: 1,
      author: 'Sarah Chen',
      role: 'Student',
      avatar: 'SC',
      time: '2 hours ago',
      content: 'Just completed the ideation module! The problem-solution fit framework was incredibly helpful. Anyone else working on their value proposition?',
      likes: 12,
      comments: 5,
      tags: ['ideation', 'value-proposition']
    },
    {
      id: 2,
      author: 'Dr. Raj Patel',
      role: 'Mentor',
      avatar: 'RP',
      time: '4 hours ago',
      content: 'Pro tip: When validating your idea, talk to at least 50 potential customers before building anything. Quality over quantity in customer interviews!',
      likes: 28,
      comments: 8,
      tags: ['validation', 'customer-interviews', 'mentor-tip']
    },
    {
      id: 3,
      author: 'Alex Kumar',
      role: 'Student',
      avatar: 'AK',
      time: '1 day ago',
      content: 'Looking for a co-founder for my ed-tech startup. We have a solid MVP and initial traction. DM me if interested!',
      likes: 15,
      comments: 12,
      tags: ['co-founder', 'ed-tech', 'startup']
    }
  ]

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Community Hub</h1>
          <p className="text-white/60 text-lg">Connect, learn, and grow with fellow entrepreneurs</p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="glass-card p-6 rounded-2xl mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search discussions, topics, or people..."
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-violet-500 focus:bg-white/10 transition-all"
              />
            </div>
            <button className="btn-secondary flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
        </motion.div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post, index) => (
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
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white font-semibold">{post.author}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.role === 'Mentor' 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                    }`}>
                      {post.role}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">{post.time}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-white mb-4 leading-relaxed">{post.content}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-white/10 text-white/70 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Post Actions */}
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
            <Users className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default CommunityHub
