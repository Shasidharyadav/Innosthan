import mongoose, { Schema, Document } from 'mongoose'

export interface ISession extends Document {
  mentor: mongoose.Types.ObjectId
  student: mongoose.Types.ObjectId
  topic: string
  type: 'video' | 'chat' | 'in-person'
  scheduledAt: Date
  duration: number // in minutes
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  feedback?: {
    rating: number
    comment: string
  }
  createdAt: Date
  updatedAt: Date
}

const SessionSchema: Schema = new Schema(
  {
    mentor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['video', 'chat', 'in-person'],
      default: 'video'
    },
    scheduledAt: {
      type: Date,
      required: true
    },
    duration: {
      type: Number,
      required: true,
      default: 60
    },
    status: {
      type: String,
      enum: ['scheduled', 'confirmed', 'completed', 'cancelled'],
      default: 'scheduled'
    },
    notes: {
      type: String
    },
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: String
    }
  },
  {
    timestamps: true
  }
)

// Indexes for better query performance
SessionSchema.index({ mentor: 1, scheduledAt: -1 })
SessionSchema.index({ student: 1, scheduledAt: -1 })
SessionSchema.index({ status: 1, scheduledAt: 1 })

export default mongoose.model<ISession>('Session', SessionSchema)

