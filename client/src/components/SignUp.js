import React, { useState } from 'react';
import '../styles/Registration.css';

const RegistrationForm = () => {
  // State for each input field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('Female');
  const [subject, setSubject] = useState('');

  // Handler for the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      firstName,
      lastName,
      birthday,
      email,
      phoneNumber,
      gender,
      subject,
    };
    // Here you would typically send the formData to a server
    console.log(formData);
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
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
          />
          <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div>
            Gender:
            <label>
              <input
                  type="radio"
                  value="Female"
                  checked={gender === 'Female'}
                  onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            <label>
              <input
                  type="radio"
                  value="Male"
                  checked={gender === 'Male'}
                  onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                  type="radio"
                  value="Other"
                  checked={gender === 'Other'}
                  onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">Choose option</option>
            <option value="Subject 1">Subject 1</option>
            <option value="Subject 2">Subject 2</option>
            <option value="Subject 3">Subject 3</option>
          </select>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
  );
};

export default RegistrationForm;
