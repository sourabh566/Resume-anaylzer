import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnalysis(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert('Please select a resume file');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);
    if (jobDesc.trim()) formData.append('jobDescription', jobDesc);

    try {
      const res = await axios.post('/api/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progress) => {
          console.log('Upload progress:', progress);
        }
      });
      
      setAnalysis(res.data.analysis);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const chartData = analysis ? {
    labels: ['Score', 'ATS Score', 'Job Match'],
    datasets: [{
      data: [
        analysis.score || 0,
        analysis.atsScore || 0,
        analysis.matchPercentage || 0
      ],
      backgroundColor: [
        'rgb(34 197 94)',  // green
        'rgb(59 130 246)', // blue
        'rgb(251 191 36)'  // yellow
      ],
      borderWidth: 2
    }]
  } : null;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-6">
            AI Resume Analyzer
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Upload your resume for instant AI analysis, job matching, and personalized improvement suggestions
          </p>
        </div>

        {!analysis ? (
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Upload Section */}
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
              <div className="text-center mb-10">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Upload Resume</h2>
                <p className="text-white/90 mb-8">Supports PDF & DOCX files up to 10MB</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-3">Resume File</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                      className="w-full px-5 py-6 bg-white/10 border-2 border-dashed border-white/30 rounded-2xl text-white file:mr-5 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 file:text-white file:font-semibold hover:file:brightness-110 cursor-pointer transition-all"
                    />
                    {file && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl pointer-events-none">
                        <span className="text-green-400 font-semibold">{file.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">Job Description (Optional)</label>
                  <textarea
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    rows={4}
                    className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-vertical"
                    placeholder="Paste job description for matching score..."
                  />
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={!file || uploading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-6 px-8 rounded-3xl text-xl font-semibold hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {uploading ? (
                    <>
                      <svg className="animate-spin h-7 w-7" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      <span>Analyzing your resume...</span>
                    </>
                  ) : (
                    <>
                      <span>🚀 Analyze Resume</span>
                      <span className="text-sm">(AI Powered)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">✨ What you'll get</h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                    Overall Resume Score (0-100)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                    ATS Compatibility Score
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                    Skills extraction & gap analysis
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                    Job description matching
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                    Actionable improvement suggestions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* Analysis Results */
          <div className="space-y-12">
            {/* Score Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-xl rounded-3xl p-8 border border-green-500/30 text-center">
                <div className="text-5xl font-bold text-green-400 mb-2">
                  {analysis.score?.toFixed(0)}%
                </div>
                <div className="text-white/90 text-lg font-semibold">Resume Score</div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/30 text-center">
                <div className="text-5xl font-bold text-blue-400 mb-2">
                  {analysis.atsScore?.toFixed(0)}%
                </div>
                <div className="text-white/90 text-lg font-semibold">ATS Score</div>
              </div>
              
              {analysis.matchPercentage && (
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 text-center">
                  <div className="text-5xl font-bold text-purple-400 mb-2">
                    {analysis.matchPercentage.toFixed(0)}%
                  </div>
                  <div className="text-white/90 text-lg font-semibold">Job Match</div>
                </div>
              )}
            </div>

            {/* Charts */}
            {chartData && (
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">Performance Overview</h3>
                  <div className="w-full h-80">
                    <Pie data={chartData} options={{ maintainAspectRatio: false }} />
                  </div>
                </div>
              </div>
            )}

            {/* Skills Analysis */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">🎯 Skills Analysis</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-400 mb-3">Detected Skills</h4>
                    {analysis.skills?.map((skill, i) => (
                      <span key={i} className="inline-block bg-emerald-500/20 text-emerald-200 px-4 py-2 rounded-xl mr-2 mb-2 border border-emerald-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                  {analysis.sections?.skills?.missing?.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-orange-400 mb-3">Missing Skills</h4>
                      {analysis.sections.skills.missing.map((skill, i) => (
                        <span key={i} className="inline-block bg-orange-500/20 text-orange-200 px-4 py-2 rounded-xl mr-2 mb-2 border border-orange-500/30">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-h-96 overflow-y-auto">
                <h3 className="text-2xl font-bold text-white mb-6">💡 Improvement Tips</h3>
                <div className="space-y-4">
                  {analysis.suggestions?.map((suggestion, i) => (
                    <div key={i} className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-white/90 leading-relaxed">{suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setAnalysis(null);
                  setFile(null);
                  setJobDesc('');
                }}
                className="bg-gradient-to-r from-slate-500 to-gray-600 text-white px-12 py-4 rounded-2xl text-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                🔄 Analyze Another Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeAnalyzer;
