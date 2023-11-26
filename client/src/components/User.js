import React, { useContext } from 'react';
import { useAuth } from './AuthContext';
import '../styles/User.css';
import {useNavigate} from "react-router-dom";

const UserCard = () => {
    const { user } = useAuth(); // Assuming you store the user data in the context after login
    const navigate = useNavigate();
    console.log("user", user);

    if (!user) {
        return null; // If there is no user data, don't render the component
    }

    const goToAdminPage = () => {
        navigate('/admin'); // This will navigate to the Admin page
    };


    return (
        <div className="user-card">
            <h3>User Profile</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Surname:</strong> {user.surname}</p>
            <p><strong>Score:</strong> {user.social_score}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {user.is_admin && <button onClick={goToAdminPage}>Go to Admin Page</button>}
        </div>
    );
};

export default UserCard;
