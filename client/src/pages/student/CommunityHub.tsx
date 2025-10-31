import { motion, AnimatePresence } from 'framer-motion'
import { Users, MessageCircle, Heart, Share, Search, Filter, Plus, TrendingUp, Award, Clock, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../stores/authStore'
import { useThemeStore } from '../../stores/themeStore'
import { useSocket } from '../../contexts/SocketContext'
import { Chat } from '../../components/Chat'
import BackButton from '../../components/BackButton'

interface Post {
  _id: string
  author: {
    _id: string
    name: string
    role: string
    avatar?: string
  }
  content: string
  likes: string[] | number
  comments: string[] | number
  tags: string[]
  category: string
  trending: boolean
  createdAt: string
}

interface Comment {
  _id: string
  author: {
    _id: string
    name: string
    role: string
    avatar?: string
  }
  content: string
  createdAt: string
}

const CommunityHub = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newPost, setNewPost] = useState({ content: '', tags: '', category: 'general' })
  const [creating, setCreating] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatRecipient, setChatRecipient] = useState<{ id: string, name: string, avatar?: string } | null>(null)
  const [showCommentsModal, setShowCommentsModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loadingComments, setLoadingComments] = useState(false)
  const [postingComment, setPostingComment] = useState(false)
  const { token, user } = useAuthStore()
  const { isDarkMode } = useThemeStore()
  const { socket } = useSocket()

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    fetchPosts()
  }, [])

  // Real-time updates via Socket.io
  useEffect(() => {
    if (!socket) return

    socket.on('new-post', (newPost: Post) => {
      setPosts(prev => {
        // Prevent duplicates - check if post already exists
        const exists = prev.some(p => p._id === newPost._id)
        if (exists) return prev
        
        // Only show toast if it's not your own post
        if (newPost.author._id !== user?._id) {
          toast.success(`New post from ${newPost.author.name}!`)
        }
        
        return [newPost, ...prev]
      })
    })

    socket.on('post-liked', ({ postId, likes }: { postId: string, likes: string[] | number }) => {
      setPosts(prev => prev.map(post => 
        post._id === postId ? { ...post, likes: likes } : post
      ))
    })

    return () => {
      socket.off('new-post')
      socket.off('post-liked')
    }
  }, [socket, user])

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/community/posts', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPosts(response.data.posts || [])
    } catch (error: any) {
      console.error('Fetch posts error:', error)
      toast.error('Failed to load community posts')
    } finally {
      setLoading(false)
    }
  }

  const createPost = async () => {
    if (!newPost.content.trim()) {
      toast.error('Please enter some content')
      return
    }

    setCreating(true)
    try {
      const tagsArray = newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      const response = await axios.post('/api/community/posts', {
        content: newPost.content,
        tags: tagsArray,
        category: newPost.category
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setPosts([response.data.post, ...posts])
      setShowCreateModal(false)
      setNewPost({ content: '', tags: '', category: 'general' })
      toast.success('Post created successfully!')
    } catch (error: any) {
      console.error('Create post error:', error)
      toast.error('Failed to create post')
    } finally {
      setCreating(false)
    }
  }

  const likePost = async (postId: string) => {
    try {
      const response = await axios.put(`/api/community/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setPosts(prev => prev.map(post => 
        post._id === postId ? { ...post, likes: response.data.post.likes } : post
      ))
    } catch (error: any) {
      console.error('Like post error:', error)
      toast.error('Failed to like post')
    }
  }

  const openComments = async (post: Post) => {
    setSelectedPost(post)
    setShowCommentsModal(true)
    setLoadingComments(true)
    
    try {
      const response = await axios.get(`/api/community/posts/${post._id}/comments`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setComments(response.data.comments || [])
    } catch (error: any) {
      console.error('Fetch comments error:', error)
      toast.error('Failed to load comments')
    } finally {
      setLoadingComments(false)
    }
  }

  const postComment = async () => {
    if (!newComment.trim() || !selectedPost) return

    setPostingComment(true)
    try {
      const response = await axios.post(`/api/community/posts/${selectedPost._id}/comments`, {
        content: newComment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setComments([...comments, response.data.comment])
      setNewComment('')
      
      // Update comment count
      setPosts(prev => prev.map(post => 
        post._id === selectedPost._id 
          ? { ...post, comments: Array.isArray(post.comments) ? [...post.comments, response.data.comment._id] : (post.comments as number) + 1 } 
          : post
      ))
      
      toast.success('Comment added!')
    } catch (error: any) {
      console.error('Post comment error:', error)
      toast.error('Failed to post comment')
    } finally {
      setPostingComment(false)
    }
  }

  // Use real posts from backend, show message if empty
  const displayPosts = posts

  const categories = [
    { id: 'all', name: 'All Posts', count: displayPosts.length },
    { id: 'learning', name: 'Learning', count: displayPosts.filter(p => p.category === 'learning').length },
    { id: 'mentor-tip', name: 'Mentor Tips', count: displayPosts.filter(p => p.category === 'mentor-tip').length },
    { id: 'success', name: 'Success Stories', count: displayPosts.filter(p => p.category === 'success').length },
    { id: 'collaboration', name: 'Collaboration', count: displayPosts.filter(p => p.category === 'collaboration').length },
    { id: 'help', name: 'Help Needed', count: displayPosts.filter(p => p.category === 'help').length }
  ]

  const filteredPosts = displayPosts.filter(post => {
    const matchesFilter = activeFilter === 'all' || post.category === activeFilter
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full" />
      </div>
    )
  }

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
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <BackButton />

        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Community Hub 🌟</h1>
          <p className={`text-lg ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>Connect, learn, and grow with fellow entrepreneurs from around the world</p>
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
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1,247</div>
                <div className="text-sm text-gray-600 dark:text-white/60">Active Members</div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">3,421</div>
                <div className="text-sm text-gray-600 dark:text-white/60">Discussions</div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-mint-500 to-teal-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">89%</div>
                <div className="text-sm text-gray-600 dark:text-white/60">Helpful Posts</div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">156</div>
                <div className="text-sm text-gray-600 dark:text-white/60">Success Stories</div>
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/40" />
              <input
                type="text"
                placeholder="Search discussions, topics, or people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:border-violet-500 focus:bg-gray-50 dark:focus:bg-white/10 transition-all"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400 dark:text-white/40" />
              <span className="text-gray-600 dark:text-white/60 text-sm">Filter by:</span>
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
                    : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/60 hover:bg-gray-300 dark:hover:bg-white/20 hover:text-gray-900 dark:hover:text-white'
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
              key={post._id}
              className="glass-card glass-card-hover p-6 rounded-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {/* Post Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {post.author.avatar || post.author.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <button
                      onClick={() => {
                        if (post.author._id !== user?._id) {
                          setChatRecipient({ id: post.author._id, name: post.author.name, avatar: post.author.avatar })
                          setShowChat(true)
                        }
                      }}
                      className="text-gray-900 dark:text-white font-semibold hover:text-violet-500 transition-colors"
                    >
                      {post.author.name}
                    </button>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.author.role === 'mentor' 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                    }`}>
                      {post.author.role}
                    </span>
                    {post.trending && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        🔥 Trending
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-white/60 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-900 dark:text-white mb-4 leading-relaxed">{post.content}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/70 text-sm rounded-full hover:bg-gray-300 dark:hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => likePost(post._id)}
                    className="flex items-center space-x-2 text-gray-600 dark:text-white/60 hover:text-pink-400 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${Array.isArray(post.likes) && post.likes.includes(user?._id as any) ? 'fill-pink-400 text-pink-400' : ''}`} />
                    <span>{Array.isArray(post.likes) ? post.likes.length : post.likes}</span>
                  </button>
                  <button 
                    onClick={() => openComments(post)}
                    className="flex items-center space-x-2 text-gray-600 dark:text-white/60 hover:text-violet-400 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{Array.isArray(post.comments) ? post.comments.length : post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-white/60 hover:text-primary-400 transition-colors">
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
          <button 
            onClick={() => setShowCreateModal(true)}
            className="w-14 h-14 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <Plus className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Empty State */}
        {filteredPosts.length === 0 && !loading && (
          <div className="glass-card p-12 rounded-2xl text-center">
            <MessageCircle className="w-16 h-16 text-gray-400 dark:text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No posts yet</h3>
            <p className="text-gray-600 dark:text-white/60 mb-4">Be the first to start a conversation!</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Post</span>
            </button>
          </div>
        )}

        {/* Community Guidelines */}
        <motion.div
          className="mt-8 glass-card p-6 rounded-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🤝 Community Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-mint-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-mint-400 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold">Be Respectful</h3>
                  <p className="text-gray-600 dark:text-white/60 text-sm">Treat everyone with kindness and respect</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-violet-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold">Share Knowledge</h3>
                  <p className="text-gray-600 dark:text-white/60 text-sm">Help others by sharing your experiences</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold">Stay On Topic</h3>
                  <p className="text-gray-600 dark:text-white/60 text-sm">Keep discussions relevant to entrepreneurship</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold">Encourage Others</h3>
                  <p className="text-gray-600 dark:text-white/60 text-sm">Support fellow entrepreneurs in their journey</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chat Component */}
        <AnimatePresence>
          {showChat && chatRecipient && (
            <Chat
              recipientId={chatRecipient.id}
              recipientName={chatRecipient.name}
              recipientAvatar={chatRecipient.avatar}
              onClose={() => {
                setShowChat(false)
                setChatRecipient(null)
              }}
            />
          )}
        </AnimatePresence>

        {/* Comments Modal */}
        {showCommentsModal && selectedPost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              className="glass-card p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Comments</h2>
                <button 
                  onClick={() => {
                    setShowCommentsModal(false)
                    setSelectedPost(null)
                    setComments([])
                  }}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-white/60" />
                </button>
              </div>

              {/* Original Post */}
              <div className="mb-6 p-4 bg-gray-100 dark:bg-white/5 rounded-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedPost.author.avatar || selectedPost.author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-gray-900 dark:text-white font-semibold">{selectedPost.author.name}</div>
                    <div className="text-xs text-gray-600 dark:text-white/60">{new Date(selectedPost.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <p className="text-gray-900 dark:text-white">{selectedPost.content}</p>
              </div>

              {/* Comments List */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {loadingComments ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full" />
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-gray-400 dark:text-white/40 mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-white/60">No comments yet. Be the first to comment!</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment._id} className="flex space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {comment.author.avatar || comment.author.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-gray-900 dark:text-white font-semibold text-sm">{comment.author.name}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            comment.author.role === 'mentor' 
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                          }`}>
                            {comment.author.role}
                          </span>
                          <span className="text-xs text-gray-600 dark:text-white/60">
                            {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-gray-900 dark:text-white text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment */}
              <div className="border-t border-gray-200 dark:border-white/10 pt-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:border-violet-500 transition-all resize-none"
                />
                <div className="flex justify-end mt-3">
                  <button
                    onClick={postComment}
                    disabled={postingComment || !newComment.trim()}
                    className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {postingComment ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        <span>Post Comment</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Create Post Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              className="glass-card p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Post</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-white/60" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                    What's on your mind?
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="Share your thoughts, ideas, or questions..."
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:border-violet-500 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                    Category
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-violet-500 transition-all"
                  >
                    <option value="general">General</option>
                    <option value="learning">Learning</option>
                    <option value="mentor-tip">Mentor Tip</option>
                    <option value="success">Success Story</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="help">Help Needed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    placeholder="e.g., startup, ideation, marketing"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:border-violet-500 transition-all"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={createPost}
                    disabled={creating || !newPost.content.trim()}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {creating ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        <span>Post</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/60 rounded-xl hover:bg-gray-300 dark:hover:bg-white/20 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommunityHub
