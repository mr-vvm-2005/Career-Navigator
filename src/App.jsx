import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import ResumeAnalysis from './pages/ResumeAnalysis';
import SkillGap from './pages/SkillGap';
import Practice from './pages/Practice';
import Roadmap from './pages/Roadmap';
import Resources from './pages/Resources';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/resume" element={<ResumeAnalysis />} />
            <Route path="/skill-gap" element={<SkillGap />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
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
