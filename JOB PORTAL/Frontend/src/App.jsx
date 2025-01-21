
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


import Footer from './components/Footer';
import UserDashboard from './pages/UserDashboard';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BrowseJobs from './pages/BrowseJobs';
import TopGridBar from './components/TopGridBar';

import AddJobs from './pages/AddJobs';
import EditJobs from './pages/EditJobs';

import AppliedJobs from './pages/AppliedJobs';
import ViewJob from './pages/ViewJob';


function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/BrowseJobs" element={<BrowseJobs />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signupage" element={<SignupPage />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/admin/AddJobs" element={<AddJobs />} />
        <Route path="/EditJobs" element={<EditJobs />} />
        
        <Route path="/TopGridBar" element={<TopGridBar />} />
        <Route path="/AppliedJobs" element={<AppliedJobs />} />
        <Route path="/AddJobs" element={<AddJobs />} />

        <Route path="/ViewJob" element={<ViewJob />} />
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;




