import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'
import path from 'path'

// Load environment variables from the root directory
dotenv.config({ path: path.join(__dirname, '../../.env') })

// Import routes
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import moduleRoutes from './routes/modules'
import assignmentRoutes from './routes/assignments'
import mentorRoutes from './routes/mentor'
import leaderboardRoutes from './routes/leaderboard'
import analyticsRoutes from './routes/analytics'

// Import middleware
import { authenticateToken } from './middleware/auth'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/innosthan')
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
}

// Connect to database
connectDB()

// Socket.io for real-time features
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId)
    console.log(`User ${socket.id} joined room ${roomId}`)
  })
  
  socket.on('leave-room', (roomId) => {
    socket.leave(roomId)
    console.log(`User ${socket.id} left room ${roomId}`)
  })
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// Make io available to routes
app.set('io', io)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/users', authenticateToken, userRoutes)
app.use('/api/modules', authenticateToken, moduleRoutes)
app.use('/api/assignments', authenticateToken, assignmentRoutes)
app.use('/api/mentor', authenticateToken, mentorRoutes)
app.use('/api/leaderboard', authenticateToken, leaderboardRoutes)
app.use('/api/analytics', authenticateToken, analyticsRoutes)

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
})

export { io }
