import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/signin');  // Redirect to sign-in if no token
    }
  }, [navigate]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p>Welcome to the member dashboard!</p>
    </div>
  );
};

export default Dashboard;
