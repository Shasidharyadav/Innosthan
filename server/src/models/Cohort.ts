import mongoose, { Schema, Document } from 'mongoose'

export interface ICohort extends Document {
  name: string
  institution: mongoose.Types.ObjectId
  students: mongoose.Types.ObjectId[]
  startDate: Date
  endDate: Date
  status: 'active' | 'completed' | 'archived'
  completionRate: number
  description?: string
  createdAt: Date
  updatedAt: Date
}

const CohortSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    institution: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    students: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'archived'],
      default: 'active'
    },
    completionRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

// Indexes for better query performance
CohortSchema.index({ institution: 1, status: 1 })
CohortSchema.index({ startDate: -1 })

export default mongoose.model<ICohort>('Cohort', CohortSchema)

