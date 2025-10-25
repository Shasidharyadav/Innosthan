import mongoose, { Document, Schema } from 'mongoose'

export interface IFeedback extends Document {
  assignmentId: mongoose.Types.ObjectId
  mentorId: mongoose.Types.ObjectId
  studentId: mongoose.Types.ObjectId
  content: string
  type: 'general' | 'technical' | 'business' | 'presentation'
  rating: number
  isPublic: boolean
  attachments?: Array<{
    filename: string
    url: string
    type: string
  }>
  createdAt: Date
  updatedAt: Date
}

const feedbackSchema = new Schema<IFeedback>({
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true
  },
  mentorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['general', 'technical', 'business', 'presentation'],
    default: 'general'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  attachments: [{
    filename: String,
    url: String,
    type: String
  }]
}, {
  timestamps: true
})

// Index for performance
feedbackSchema.index({ assignmentId: 1 })
feedbackSchema.index({ mentorId: 1 })
feedbackSchema.index({ studentId: 1 })
feedbackSchema.index({ createdAt: -1 })

export default mongoose.model<IFeedback>('Feedback', feedbackSchema)
