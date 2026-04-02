const mongoose = require('mongoose');

const resumeAnalysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  originalText: String,
  analysis: {
    skills: [String],
    experience: String,
    education: String,
    score: { type: Number, max: 100 },
    matchPercentage: Number,
    suggestions: [String],
    atsScore: { type: Number, max: 100 },
    keywords: [String],
    sections: {
      skills: { detected: [String], missing: [String] },
      experience: { years: Number, gaps: [String] }
    }
  },
  jobDescription: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
