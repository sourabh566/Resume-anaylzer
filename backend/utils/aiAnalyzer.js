const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function analyzeResume(resumeText, jobDescription = '') {
  try {
    const prompt = `
Analyze this resume comprehensively:

RESUME:
${resumeText.substring(0, 4000)}

${jobDescription ? `JOB DESCRIPTION:
${jobDescription}` : ''}

Provide JSON output with:
{
  "skills": ["skill1", "skill2"],
  "experience": "Summary of experience",
  "education": "Education summary", 
  "score": 85,
  "matchPercentage": ${jobDescription ? 78 : null},
  "suggestions": ["Add more projects", "Quantify achievements"],
  "atsScore": 92,
  "keywords": ["React", "Node.js"],
  "sections": {
    "skills": {
      "detected": ["JavaScript", "Python"],
      "missing": ["Docker", "AWS"]
    },
    "experience": {
      "years": 5,
      "gaps": ["2018-2019"]
    }
  }
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 2000
    });

    // Parse JSON from response
    const analysisText = completion.choices[0].message.content;
    const analysis = JSON.parse(analysisText.match(/\{.*\}/s)[0]);
    
    return analysis;
  } catch (error) {
    console.error('AI Analysis error:', error);
    return {
      skills: [],
      score: 50,
      suggestions: ['AI analysis temporarily unavailable'],
      atsScore: 70
    };
  }
}

module.exports = { analyzeResume };
