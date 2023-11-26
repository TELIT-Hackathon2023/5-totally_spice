import React, { useState } from 'react';
import '../styles/Registration.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const SignInForm = () => {
    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();
    // State for each input field
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser } = useAuth();

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
        // Constructing the query string from credentials
        const query = new URLSearchParams(credentials).toString();

        try {
            const response = await fetch(`http://localhost:8000/api/auth/login?${query}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.status === 'success') {
                // Make sure that `data.user` contains the user data you expect
                console.log("DATA:", data);
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
