import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';  // Import sign-out icon from react-icons

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Redirect to sign-in page
    navigate('/signin');
  };

  const isAuthenticated = localStorage.getItem('token');  // Check if token exists

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Job Board</h1>
        <div className="flex-grow flex justify-center"> {/* Center the navbar items */}
          <ul className="flex space-x-8"> {/* Add space between items */}
            <li>
              <Link to="/" className="text-white">Dashboard</Link>
            </li>
            <li>
              <Link to="/vacancies" className="text-white">Vacancies</Link>
            </li>
            <li>
              <Link to="/employers" className="text-white">Employers</Link>
            </li>
            <li>
              <Link to="/cohorts" className="text-white">Cohorts</Link>
            </li>
          </ul>
        </div>
        {/* Show sign-out icon if user is authenticated */}
        {isAuthenticated && (
          <button onClick={handleSignOut} className="text-white flex items-center space-x-2">
            <FaSignOutAlt />  {/* Sign-out icon */}
            <span>Sign Out</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;