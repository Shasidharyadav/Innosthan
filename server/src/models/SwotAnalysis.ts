import mongoose from 'mongoose'

const swotAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ideaTitle: {
    type: String,
    required: true
  },
  strengths: [{
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  weaknesses: [{
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  opportunities: [{
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  threats: [{
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  aiSuggestions: {
    strengths: [String],
    weaknesses: [String],
    opportunities: [String],
    threats: [String]
  },
  status: {
    type: String,
    enum: ['draft', 'completed', 'archived'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

swotAnalysisSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.model('SwotAnalysis', swotAnalysisSchema)

