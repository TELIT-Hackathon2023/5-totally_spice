import React, { useContext } from 'react';
import { useAuth } from './AuthContext';
import '../styles/User.css';

const UserCard = () => {
    const { user } = useAuth(); // Assuming you store the user data in the context after login

    console.log("user", user);

    if (!user) {
        return null; // If there is no user data, don't render the component
    }



    return (
        <div className="user-card">
            <h3>User Profile</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Surname:</strong> {user.surname}</p>
            <p><strong>Score:</strong> {user.social_score}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
};

export default UserCard;
