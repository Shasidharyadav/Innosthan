import mongoose, { Schema, Document } from 'mongoose'

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId
  receiver: mongoose.Types.ObjectId
  content: string
  type: 'text' | 'image' | 'file' | 'system'
  isRead: boolean
  readAt?: Date
  sessionId?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const MessageSchema: Schema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver: {
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
      enum: ['text', 'image', 'file', 'system'],
      default: 'text'
    },
    isRead: {
      type: Boolean,
      default: false
    },
    readAt: {
      type: Date
    },
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: 'Session'
    }
  },
  {
    timestamps: true
  }
)

// Indexes for better query performance
MessageSchema.index({ sender: 1, receiver: 1, createdAt: -1 })
MessageSchema.index({ receiver: 1, isRead: 1 })

export default mongoose.model<IMessage>('Message', MessageSchema)

