import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployerComponent = () => {
  const [employers, setEmployers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    about: '',
    password: '',
    confirmPassword: ''
  });

  // Fetch employers from the database with pagination
  const fetchEmployers = async (page) => {
    try {
      const response = await axios.get('http://localhost:5000/api/employers/admin');
      setEmployers(response.data.employers);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching employers:', error);
    }
  };

  useEffect(() => {
    fetchEmployers(currentPage);
  }, [currentPage]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post('/api/employers/register', formData);
      alert('Employer registered successfully!');
      // Reset form
      setFormData({
        companyName: '',
        email: '',
        phone: '',
        about: '',
        password: '',
        confirmPassword: ''
      });
      // Optionally, refetch employers
      fetchEmployers(currentPage);
    } catch (error) {
      console.error('Error registering employer:', error);
      alert('Failed to register employer.');
    }
  };

  return (
    <div>
      <h2>Employers</h2>
      <ul>
        {employers.map((employer, index) => (
          <li key={index}>
            <strong>{employer.companyName}</strong><br />
            Email: {employer.email}<br />
            Phone: {employer.phone}
          </li>
        ))}
      </ul>

      <div>
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <h2>Register New Employer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="about"
          placeholder="About"
          value={formData.about}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default EmployerComponent ;