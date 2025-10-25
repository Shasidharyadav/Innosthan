import mongoose, { Document, Schema } from 'mongoose'

export interface IXP extends Document {
  userId: mongoose.Types.ObjectId
  source: 'module_completion' | 'assignment_submission' | 'peer_review' | 'mentorship' | 'community_engagement' | 'badge_earned'
  amount: number
  description: string
  moduleId?: mongoose.Types.ObjectId
  assignmentId?: mongoose.Types.ObjectId
  badgeId?: string
  createdAt: Date
}

const xpSchema = new Schema<IXP>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  source: {
    type: String,
    enum: ['module_completion', 'assignment_submission', 'peer_review', 'mentorship', 'community_engagement', 'badge_earned'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  description: {
    type: String,
    required: true
  },
  moduleId: {
    type: Schema.Types.ObjectId,
    ref: 'Module'
  },
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Assignment'
  },
  badgeId: {
    type: String
  }
}, {
  timestamps: true
})

// Index for performance
xpSchema.index({ userId: 1 })
xpSchema.index({ source: 1 })
xpSchema.index({ createdAt: -1 })

export default mongoose.model<IXP>('XP', xpSchema)
