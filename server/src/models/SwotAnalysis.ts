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
  description: {
    type: String,
    default: ''
  },
  strengths: [{
    text: String,
    impact: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    evidence: String,
    tags: [String],
    priority: { type: Number, default: 5 },
    createdAt: { type: Date, default: Date.now }
  }],
  weaknesses: [{
    text: String,
    impact: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    evidence: String,
    mitigation: String,
    tags: [String],
    priority: { type: Number, default: 5 },
    createdAt: { type: Date, default: Date.now }
  }],
  opportunities: [{
    text: String,
    timeframe: { type: String, enum: ['short_term', 'medium_term', 'long_term'], default: 'medium_term' },
    evidence: String,
    tags: [String],
    priority: { type: Number, default: 5 },
    createdAt: { type: Date, default: Date.now }
  }],
  threats: [{
    text: String,
    likelihood: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    evidence: String,
    mitigation: String,
    tags: [String],
    priority: { type: Number, default: 5 },
    createdAt: { type: Date, default: Date.now }
  }],
  aiSuggestions: {
    strengths: [String],
    weaknesses: [String],
    opportunities: [String],
    threats: [String]
  },
  insights: [{
    type: String,
    category: String,
    priority: Number,
    createdAt: { type: Date, default: Date.now }
  }],
  status: {
    type: String,
    enum: ['draft', 'completed', 'archived'],
    default: 'draft'
  },
  versions: [{
    versionNumber: Number,
    snapshot: mongoose.Schema.Types.Mixed,
    changedAt: { type: Date, default: Date.now },
    changeDescription: String
  }],
  tags: [String],
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

