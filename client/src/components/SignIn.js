import React, { useState } from 'react';
import '../styles/Registration.css';

const SignInForm = () => {
    // State for each input field
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handler for the form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            email,
            password,
        };
        signIn(formData);
    };

    const signIn = async (credentials) => {
        try {
            const response = await fetch('http://localhost:8000/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Signed in:', data);
            // Handle further actions like redirecting the user or storing the session
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div className="registration-form-container" style={{ backgroundColor: '#f8bbd0' }}>
            <form onSubmit={handleSubmit} style={{ padding: '20px', backgroundColor: 'white' }}>
                <h2>Sign In</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">LogIn</button>
            </form>
        </div>
    );
};

export default SignInForm;
