import mongoose, { Schema, Document } from 'mongoose'

export interface IComment extends Document {
  post: mongoose.Types.ObjectId
  author: mongoose.Types.ObjectId
  content: string
  likes: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const CommentSchema: Schema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: 500
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true
  }
)

// Index for better query performance
CommentSchema.index({ post: 1, createdAt: -1 })

export default mongoose.model<IComment>('Comment', CommentSchema)

