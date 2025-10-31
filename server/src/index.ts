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
import swotRoutes from './routes/swot'
import resourceRoutes from './routes/resources'
import communityRoutes from './routes/community'
import sessionRoutes from './routes/sessions'
import cohortRoutes from './routes/cohorts'
import messageRoutes from './routes/messages'

// Import middleware
import { authenticateToken } from './middleware/auth'

// Import Socket.io handlers
import { setupSocketHandlers } from './socket/handlers'

const app = express()
const server = createServer(app)

// Configure allowed origins for CORS
const allowedOrigins = process.env.CLIENT_URL 
  ? process.env.CLIENT_URL.split(',').map(url => url.trim())
  : ["http://localhost:3000", "https://innosthan.vercel.app"]

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

const io = new Server(server, {
  cors: corsOptions
})

// Security middleware
app.use(helmet())
app.use(cors(corsOptions))

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

// Setup Socket.io with comprehensive handlers
setupSocketHandlers(io)

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
app.use('/api/swot', authenticateToken, swotRoutes)
app.use('/api/resources', authenticateToken, resourceRoutes)
app.use('/api/community', authenticateToken, communityRoutes)
app.use('/api/sessions', authenticateToken, sessionRoutes)
app.use('/api/cohorts', authenticateToken, cohortRoutes)
app.use('/api/messages', authenticateToken, messageRoutes)

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
