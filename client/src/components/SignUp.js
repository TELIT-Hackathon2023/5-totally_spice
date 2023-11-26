import React, { useState } from 'react';
import '../styles/Registration.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RegistrationForm = () => {
  // State for each input field
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [car_number, setCarNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [car_name, setCarName] = useState('');
  const [subject, setSubject] = useState('');
  const { loginUser } = useAuth();

  // Handler for the form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name: firstName,
      surname: lastName,
      email,
      car_number,
      car_name
    };
    register(formData);
  };
  const register = async (userData) => {
    try {
      const query = new URLSearchParams(userData).toString();
      const response = await fetch(`http://localhost:8000/api/auth/registration/add?${query}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === 'success') {
        // Make sure that `data.user` contains the user data you expect
        console.log(data);
        const user = {
          email : data.data.email,
          password : data.data.password,
          name : data.data.name,
          social_score: data.data.social_score,
          surname : data.data.surname,
          is_admin: data.data.is_admin,
        };
        loginUser(user);
        navigate('/');
      }
      console.log('Registered:', data);
      // Handle further actions like showing a success message or clearing the form
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
      <div className="registration-form-container" style={{ backgroundColor: '#f8bbd0' }}>
        <form onSubmit={handleSubmit} style={{ padding: '20px', backgroundColor: 'white' }}>
          <h2>Registration Form</h2>
          <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
          />
          <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
          />
          <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <input
              type="text"
              placeholder="Car Name"
              value={car_name}
              onChange={(e) => setCarName(e.target.value)}
          />
          <input
              type="text"
              placeholder="Car Number"
              value={car_number}
              onChange={(e) => setCarNumber(e.target.value)}
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
  );
};

export default RegistrationForm;
