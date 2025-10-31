import { motion } from 'framer-motion'
import { MessageCircle, Search, Send, X, Circle } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../stores/authStore'
import { useThemeStore } from '../../stores/themeStore'
import { useSocket } from '../../contexts/SocketContext'
import BackButton from '../../components/BackButton'

interface Conversation {
  _id: string
  name: string
  email: string
  avatar?: string
  role: string
  lastMessage: {
    content: string
    createdAt: string
    sender: string
    isRead: boolean
  }
  unreadCount: number
}

interface Message {
  _id: string
  sender: {
    _id: string
    name: string
    avatar?: string
  }
  receiver: {
    _id: string
    name: string
    avatar?: string
  }
  content: string
  createdAt: string
  isRead: boolean
}

const MessagesHub = () => {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [sending, setSending] = useState(false)
  const { token, user } = useAuthStore()
  const { isDarkMode } = useThemeStore()
  const { socket, isConnected } = useSocket()

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    fetchConversations()
  }, [])

  // Real-time message updates
  useEffect(() => {
    if (!socket) return

    socket.on('new-message', (message: Message) => {
      // Update conversations list
      fetchConversations()

      // If chat is open with this person, add message
      if (selectedConversation) {
        if (
          (message.sender._id === selectedConversation._id && message.receiver._id === user?._id) ||
          (message.sender._id === user?._id && message.receiver._id === selectedConversation._id)
        ) {
          setMessages(prev => {
            const exists = prev.some(m => m._id === message._id)
            if (exists) return prev
            return [...prev, message]
          })

          // Mark as read if from selected conversation
          if (message.sender._id === selectedConversation._id) {
            markAsRead(message._id)
          }
        }
      }

      // Show notification if not in chat with sender
      if (message.sender._id !== user?._id) {
        if (!selectedConversation || selectedConversation._id !== message.sender._id) {
          toast.success(`New message from ${message.sender.name}`)
        }
      }
    })

    return () => {
      socket.off('new-message')
    }
  }, [socket, selectedConversation, user])

  const fetchConversations = async () => {
    try {
      const response = await axios.get('/api/messages/conversations', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setConversations(response.data.conversations || [])
    } catch (error: any) {
      console.error('Fetch conversations error:', error)
      toast.error('Failed to load conversations')
    } finally {
      setLoading(false)
    }
  }

  const openConversation = async (conversation: Conversation) => {
    setSelectedConversation(conversation)
    setLoadingMessages(true)

    try {
      const response = await axios.get(`/api/messages/with/${conversation._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessages(response.data.messages || [])

      // Mark all messages as read
      response.data.messages.forEach((msg: Message) => {
        if (msg.sender._id === conversation._id && !msg.isRead) {
          markAsRead(msg._id)
        }
      })

      // Update conversation unread count
      setConversations(prev => prev.map(conv => 
        conv._id === conversation._id ? { ...conv, unreadCount: 0 } : conv
      ))
    } catch (error: any) {
      console.error('Fetch messages error:', error)
      toast.error('Failed to load messages')
    } finally {
      setLoadingMessages(false)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || sending) return

    setSending(true)
    const messageContent = newMessage
    setNewMessage('')

    try {
      await axios.post('/api/messages/send', {
        receiverId: selectedConversation._id,
        content: messageContent,
        type: 'text'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (error: any) {
      console.error('Send message error:', error)
      toast.error('Failed to send message')
      setNewMessage(messageContent)
    } finally {
      setSending(false)
    }
  }

  const markAsRead = async (messageId: string) => {
    try {
      await axios.put(`/api/messages/${messageId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (error) {
      console.error('Mark as read error:', error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <BackButton />

        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Messages 💬</h1>
              <p className="text-gray-600 dark:text-white/60 text-lg">
                {totalUnread > 0 ? `You have ${totalUnread} unread message${totalUnread > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`px-4 py-2 rounded-xl flex items-center space-x-2 ${
                isConnected 
                  ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                  : 'bg-red-500/20 text-red-600 dark:text-red-400'
              }`}>
                <Circle className={`w-2 h-2 ${isConnected ? 'fill-green-500' : 'fill-red-500'}`} />
                <span className="text-sm font-medium">{isConnected ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Messages Container */}
        <motion.div
          className="glass-card rounded-2xl overflow-hidden"
          style={{ height: 'calc(100vh - 250px)' }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex h-full">
            {/* Conversations Sidebar */}
            <div className="w-1/3 border-r border-gray-200 dark:border-white/10 flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-gray-200 dark:border-white/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:border-violet-500 transition-all"
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full" />
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <MessageCircle className="w-16 h-16 text-gray-400 dark:text-white/40 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No conversations yet</h3>
                    <p className="text-sm text-gray-600 dark:text-white/60">Start chatting from the Community Hub!</p>
                  </div>
                ) : (
                  filteredConversations.map((conversation) => (
                    <button
                      key={conversation._id}
                      onClick={() => openConversation(conversation)}
                      className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border-b border-gray-200 dark:border-white/10 ${
                        selectedConversation?._id === conversation._id 
                          ? 'bg-violet-500/10 border-l-4 border-l-violet-500' 
                          : ''
                      }`}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {conversation.avatar || conversation.name.charAt(0)}
                        </div>
                        {conversation.unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 text-left overflow-hidden">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-semibold text-gray-900 dark:text-white ${conversation.unreadCount > 0 ? 'font-bold' : ''}`}>
                            {conversation.name}
                          </h3>
                          <span className="text-xs text-gray-600 dark:text-white/60">
                            {new Date(conversation.lastMessage.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className={`text-sm text-gray-600 dark:text-white/60 truncate ${conversation.unreadCount > 0 ? 'font-semibold' : ''}`}>
                          {conversation.lastMessage.content}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {selectedConversation.avatar || selectedConversation.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{selectedConversation.name}</h3>
                        <p className="text-xs text-gray-600 dark:text-white/60 capitalize">{selectedConversation.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedConversation(null)
                        setMessages([])
                      }}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600 dark:text-white/60" />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                    {loadingMessages ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full" />
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <MessageCircle className="w-16 h-16 text-gray-400 dark:text-white/40 mb-4" />
                        <p className="text-gray-600 dark:text-white/60">No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      messages.map((message) => {
                        const isOwn = message.sender._id === user?._id
                        return (
                          <div
                            key={message._id}
                            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                                isOwn
                                  ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white'
                                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                              }`}
                            >
                              <div className="break-words">{message.content}</div>
                              <div
                                className={`text-xs mt-1 ${
                                  isOwn ? 'text-white/70' : 'text-gray-500 dark:text-white/50'
                                }`}
                              >
                                {new Date(message.createdAt).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                                {isOwn && message.isRead && ' ✓✓'}
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800">
                    <div className="flex items-end space-x-3">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        rows={1}
                        className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                        disabled={sending}
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim() || sending}
                        className="p-3 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <MessageCircle className="w-24 h-24 text-gray-400 dark:text-white/40 mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Select a conversation</h3>
                  <p className="text-gray-600 dark:text-white/60 max-w-md">
                    Choose a conversation from the sidebar to start chatting
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MessagesHub

