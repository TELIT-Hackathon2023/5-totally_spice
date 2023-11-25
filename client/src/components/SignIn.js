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
        // Here you would typically send the formData to a server
        console.log(formData);
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
