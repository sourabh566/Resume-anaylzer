import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function History() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('/api/resume/history');
      setAnalyses(res.data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading your analysis history...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">
            Analysis History
          </h1>
          <p className="text-xl text-white/90">Track your previous resume analyses and progress</p>
        </div>

        {analyses.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-8 opacity-20">📋</div>
            <h2 className="text-3xl font-bold text-white/80 mb-4">No analyses yet</h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Upload your first resume to get started with AI-powered analysis
            </p>
            <a href="/analyze" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-12 py-5 rounded-2xl text-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all">
              Analyze First Resume
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyses.map((analysis) => (
              <div key={analysis._id} className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:scale-[1.02] transition-all duration-300 group">
                <div className="flex items-start justify-between mb-6">
                  <div className="font-mono text-sm text-white/60 truncate max-w-[200px]">
                    {analysis.filename}
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    {analysis.analysis.score?.toFixed(0)}%
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span className="text-white/80 font-medium">ATS Score:</span>
                    <span className="ml-2 text-blue-300 font-bold">{analysis.analysis.atsScore?.toFixed(0)}%</span>
                  </div>
                  
                  {analysis.analysis.matchPercentage && (
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <span className="text-white/80 font-medium">Job Match:</span>
                      <span className="ml-2 text-purple-300 font-bold">{analysis.analysis.matchPercentage.toFixed(0)}%</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                    <span className="text-white/80 font-medium">Skills Detected:</span>
                    <span className="ml-2 text-emerald-300 font-bold">{analysis.analysis.skills?.length || 0}</span>
                  </div>
                </div>

                <div className="text-xs text-white/60 mb-6">
                  {new Date(analysis.createdAt).toLocaleDateString()} • {new Date(analysis.createdAt).toLocaleTimeString()}
                </div>

                <div className="h-24 bg-gradient-to-r from-slate-800/50 to-gray-800/50 rounded-2xl p-4 overflow-hidden">
                  <div className="font-semibold text-white/90 mb-2 truncate">Recent Suggestion:</div>
                  <p className="text-white/70 text-sm leading-tight line-clamp-3">
                    {analysis.analysis.suggestions?.[0] || 'No suggestions available'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
