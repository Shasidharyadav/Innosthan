import mongoose, { Schema, Document } from 'mongoose'

export interface IPost extends Document {
  author: mongoose.Types.ObjectId
  content: string
  likes: mongoose.Types.ObjectId[]
  comments: mongoose.Types.ObjectId[]
  tags: string[]
  category: 'general' | 'learning' | 'mentor-tip' | 'success' | 'collaboration' | 'help'
  trending: boolean
  createdAt: Date
  updatedAt: Date
}

const PostSchema: Schema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: 2000
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    tags: [{
      type: String,
      trim: true
    }],
    category: {
      type: String,
      enum: ['general', 'learning', 'mentor-tip', 'success', 'collaboration', 'help'],
      required: true
    },
    trending: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

// Index for better query performance
PostSchema.index({ category: 1, createdAt: -1 })
PostSchema.index({ author: 1 })
PostSchema.index({ tags: 1 })

export default mongoose.model<IPost>('Post', PostSchema)

