import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Vacancies from './components/Vacancies';
import Employers from './components/Employers';
import Cohorts from './components/Cohorts';
import SignIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/signin" element={<SignIn />} /> {/* Add SignIn route */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/" element={<Dashboard />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/cohorts" element={<Cohorts />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
