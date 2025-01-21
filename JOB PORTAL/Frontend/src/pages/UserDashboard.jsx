
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppliedJobs from './AppliedJobs';

const UserDashboard = () => {
  return (
    <Router>
      <Routes>
        <Route path="/applied-jobs" element={<AppliedJobs />} />
      </Routes>
    </Router>
  );
};

export default UserDashboard;