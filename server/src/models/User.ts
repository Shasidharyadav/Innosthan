import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'student' | 'mentor' | 'admin' | 'institution'
  avatar?: string
  xp: number
  level: number
  badges: string[]
  institution?: string
  isVerified: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'mentor', 'admin', 'institution'],
    default: 'student'
  },
  avatar: {
    type: String,
    default: null
  },
  xp: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  badges: [{
    type: String
  }],
  institution: {
    type: String,
    required: function() {
      return this.role === 'institution'
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
})

// Index for performance (email already has unique index from schema definition)
userSchema.index({ role: 1 })
userSchema.index({ xp: -1 }) // For leaderboard

export default mongoose.model<IUser>('User', userSchema)
