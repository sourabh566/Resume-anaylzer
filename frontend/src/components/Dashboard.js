import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border border-white/20">
          <h1 className="text-4xl font-bold text-white mb-6">Welcome to Resume AI</h1>
          <p className="text-xl text-white/90 mb-8">
            Get instant AI-powered resume analysis and job matching
          </p>
          <div className="space-y-4">
            <Link
              to="/register"
              className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Get Started - Free
            </Link>
            <Link
              to="/login"
              className="block w-full bg-white/20 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-white/30 transition-all duration-200"
            >
              Have Account? Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-6">
            Welcome back, {user.name}!
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Upload your resume and get instant AI analysis, job matching, and improvement suggestions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:scale-[1.02] transition-all duration-300">
            <div className="text-5xl mb-6">📄</div>
            <h2 className="text-3xl font-bold text-white mb-4">Analyze Resume</h2>
            <p className="text-white/90 mb-8 text-lg">
              Upload PDF/DOCX resume for comprehensive AI analysis
            </p>
            <Link
              to="/analyze"
              className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              Start Analysis →
            </Link>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:scale-[1.02] transition-all duration-300">
            <div className="text-5xl mb-6">📊</div>
            <h2 className="text-3xl font-bold text-white mb-4">View History</h2>
            <p className="text-white/90 mb-8 text-lg">
              Track previous analyses and improvement progress
            </p>
            <Link
              to="/history"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              View History →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
