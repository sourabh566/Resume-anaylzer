const express = require('express');
const multer = require('multer');
const path = require('path');
const ResumeAnalysis = require('../models/ResumeAnalysis');
const auth = require('../middleware/auth');
const { analyzeResume } = require('../utils/aiAnalyzer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// @route   POST api/resume/upload
// @desc    Upload and analyze resume
router.post('/upload', auth, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const text = await extractText(req.file);
    
    const analysis = await analyzeResume(text, req.body.jobDescription || '');
    
    const resumeAnalysis = new ResumeAnalysis({
      userId: req.user.userId,
      filename: req.file.originalname,
      originalText: text,
      analysis,
      jobDescription: req.body.jobDescription || ''
    });
    
    await resumeAnalysis.save();
    
    res.json(resumeAnalysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET api/resume/history
// @desc    Get user resume history
router.get('/history', auth, async (req, res) => {
  try {
    const analyses = await ResumeAnalysis.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function extractText(file) {
  const { pdfParse } = require('pdf-parse');
  const mammoth = require('mammoth');
  
  try {
    if (file.mimetype === 'application/pdf') {
      const dataBuffer = require('fs').readFileSync(file.path);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ path: file.path });
      return result.value;
    }
    return '';
  } catch (error) {
    throw new Error('Failed to extract text from file');
  }
}

module.exports = router;
