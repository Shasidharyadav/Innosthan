import { motion } from 'framer-motion'
import { X, Send, Minimize2, Maximize2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthStore } from '../stores/authStore'
import { useSocket } from '../contexts/SocketContext'

interface Message {
  _id: string
  sender: {
    _id: string
    name: string
    avatar?: string
  }
  receiver?: {
    _id: string
    name: string
    avatar?: string
  }
  content: string
  createdAt: string
  read: boolean
}

interface ChatProps {
  recipientId: string
  recipientName: string
  recipientAvatar?: string
  onClose: () => void
}

export const Chat = ({ recipientId, recipientName, recipientAvatar, onClose }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const { token, user } = useAuthStore()
  const { socket } = useSocket()

  useEffect(() => {
    fetchMessages()
  }, [recipientId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Socket listeners
  useEffect(() => {
    if (!socket) return

    socket.on('new-message', (message: Message) => {
      // Only add messages relevant to this chat
      if (
        (message.sender._id === recipientId && message.receiver?._id === user?._id) ||
        (message.sender._id === user?._id && message.receiver?._id === recipientId)
      ) {
        // Prevent duplicates
        setMessages(prev => {
          const exists = prev.some(m => m._id === message._id)
          if (exists) return prev
          return [...prev, message]
        })
        
        // Mark as read if chat is open and from recipient
        if (message.sender._id === recipientId) {
          markAsRead(message._id)
        }
      }
    })

    socket.on('typing', ({ userId }: { userId: string }) => {
      if (userId === recipientId) {
        setIsTyping(true)
        setTimeout(() => setIsTyping(false), 3000)
      }
    })

    socket.on('stop-typing', ({ userId }: { userId: string }) => {
      if (userId === recipientId) {
        setIsTyping(false)
      }
    })

    return () => {
      socket.off('new-message')
      socket.off('typing')
      socket.off('stop-typing')
    }
  }, [socket, recipientId, user?._id])

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/messages/with/${recipientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('Fetched messages:', response.data)
      setMessages(response.data.messages || [])
    } catch (error: any) {
      console.error('Fetch messages error:', error)
      console.error('Error details:', error.response?.data)
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || sending) return

    setSending(true)
    const messageContent = newMessage
    setNewMessage('') // Clear input immediately
    
    try {
      const response = await axios.post('/api/messages/send', {
        receiverId: recipientId,
        content: messageContent,
        type: 'text'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      console.log('Message sent:', response.data)
      
      // Socket.io will handle broadcasting the 'new-message' event
      // No need to emit again here - that was causing duplicates
      
    } catch (error: any) {
      console.error('Send message error:', error)
      console.error('Error details:', error.response?.data)
      toast.error('Failed to send message')
      // Restore message on error
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

  const handleTyping = () => {
    if (socket) {
      socket.emit('typing', { receiverId: recipientId })
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        if (socket) {
          socket.emit('stop-typing', { receiverId: recipientId })
        }
      }, 1000)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (isMinimized) {
    return (
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="glass-card p-4 rounded-xl flex items-center space-x-3 hover:scale-105 transition-transform"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
            {recipientAvatar || recipientName.charAt(0)}
          </div>
          <div className="text-left">
            <div className="text-gray-900 dark:text-white font-semibold">{recipientName}</div>
            <div className="text-xs text-gray-600 dark:text-white/60">Click to open</div>
          </div>
          <Maximize2 className="w-5 h-5 text-gray-600 dark:text-white/60" />
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 w-96 h-[500px] glass-card rounded-2xl overflow-hidden z-50 flex flex-col"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-500 to-pink-500 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
            {recipientAvatar || recipientName.charAt(0)}
          </div>
          <div>
            <div className="text-white font-semibold">{recipientName}</div>
            {isTyping && (
              <div className="text-xs text-white/80">typing...</div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Minimize2 className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-4xl mb-2">👋</div>
            <div className="text-gray-900 dark:text-white font-semibold">Start a conversation</div>
            <div className="text-sm text-gray-600 dark:text-white/60">Say hi to {recipientName}!</div>
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
                    {isOwn && message.read && ' ✓✓'}
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-white/10">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value)
              handleTyping()
            }}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500"
            disabled={sending}
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || sending}
            className="p-2 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
