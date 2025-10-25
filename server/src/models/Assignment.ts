import mongoose, { Document, Schema } from 'mongoose'

export interface IAssignment extends Document {
  studentId: mongoose.Types.ObjectId
  moduleId: mongoose.Types.ObjectId
  title: string
  description: string
  type: 'assignment' | 'project' | 'reflection' | 'quiz'
  content: string
  attachments: Array<{
    filename: string
    url: string
    type: string
  }>
  status: 'draft' | 'submitted' | 'reviewed' | 'approved' | 'rejected'
  grade?: number
  feedback?: string
  mentorId?: mongoose.Types.ObjectId
  submittedAt?: Date
  reviewedAt?: Date
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
}

const assignmentSchema = new Schema<IAssignment>({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  moduleId: {
    type: Schema.Types.ObjectId,
    ref: 'Module',
    required: true
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
  type: {
    type: String,
    enum: ['assignment', 'project', 'reflection', 'quiz'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  attachments: [{
    filename: String,
    url: String,
    type: String
  }],
  status: {
    type: String,
    enum: ['draft', 'submitted', 'reviewed', 'approved', 'rejected'],
    default: 'draft'
  },
  grade: {
    type: Number,
    min: 0,
    max: 100
  },
  feedback: {
    type: String
  },
  mentorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  submittedAt: {
    type: Date
  },
  reviewedAt: {
    type: Date
  },
  dueDate: {
    type: Date
  }
}, {
  timestamps: true
})

// Index for performance
assignmentSchema.index({ studentId: 1 })
assignmentSchema.index({ moduleId: 1 })
assignmentSchema.index({ status: 1 })
assignmentSchema.index({ submittedAt: -1 })

export default mongoose.model<IAssignment>('Assignment', assignmentSchema)
