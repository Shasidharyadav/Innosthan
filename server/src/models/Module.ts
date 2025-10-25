import mongoose, { Document, Schema } from 'mongoose'

export interface IModule extends Document {
  moduleNumber: number
  title: string
  description: string
  content: {
    videos: Array<{
      title: string
      url: string
      duration: number
      description?: string
    }>
    chapters: Array<{
      title: string
      content: string
      order: number
    }>
    resources: Array<{
      title: string
      url: string
      type: 'pdf' | 'link' | 'video'
    }>
  }
  quizzes: Array<{
    question: string
    options: string[]
    correctAnswer: number
    explanation?: string
  }>
  deliverables: Array<{
    title: string
    description: string
    type: 'assignment' | 'project' | 'reflection'
    deadline?: Date
  }>
  prerequisites: number[]
  isUnlocked: boolean
  order: number
  estimatedHours: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const moduleSchema = new Schema<IModule>({
  moduleNumber: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    videos: [{
      title: String,
      url: String,
      duration: Number,
      description: String
    }],
    chapters: [{
      title: String,
      content: String,
      order: Number
    }],
    resources: [{
      title: String,
      url: String,
      type: {
        type: String,
        enum: ['pdf', 'link', 'video']
      }
    }]
  },
  quizzes: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    explanation: String
  }],
  deliverables: [{
    title: String,
    description: String,
    type: {
      type: String,
      enum: ['assignment', 'project', 'reflection']
    },
    deadline: Date
  }],
  prerequisites: [{
    type: Number
  }],
  isUnlocked: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    required: true
  },
  estimatedHours: {
    type: Number,
    default: 10
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
})

// Index for performance
moduleSchema.index({ moduleNumber: 1 })
moduleSchema.index({ order: 1 })
moduleSchema.index({ isUnlocked: 1 })

export default mongoose.model<IModule>('Module', moduleSchema)
