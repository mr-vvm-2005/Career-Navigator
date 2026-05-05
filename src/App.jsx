import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import ResumeAnalysis from './pages/ResumeAnalysis';
import ResumeManager from './pages/ResumeManager';
import SkillGap from './pages/SkillGap';
import Practice from './pages/Practice';
import MockInterview from './pages/MockInterview';
import Roadmap from './pages/Roadmap';
import Resources from './pages/Resources';

import { AppProvider, useApp } from './context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader2 } from 'lucide-react';

const AppRoutes = () => {
  const { loading } = useApp();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 size={48} className="text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-black uppercase tracking-widest text-[10px]">Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/resume" element={<ResumeAnalysis />} />
        <Route path="/versions" element={<ResumeManager />} />
        <Route path="/skill-gap" element={<SkillGap />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/mock-interview" element={<MockInterview />} />
        <Route path="/resources" element={<Resources />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AppProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <AppRoutes />
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="light"
      />
    </AppProvider>
  );
}

export default App;
