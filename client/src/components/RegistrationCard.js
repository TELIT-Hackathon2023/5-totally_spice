// RegistrationCard.js
import React from 'react';
import '../styles/RegistrationCard.css';
import { useNavigate } from 'react-router-dom';

const RegistrationCard = () => {
    const navigate = useNavigate();
    const register =  () => {
        navigate('/reservationPage');
    };
    return (
        <div className="registration-card">
            <h3>Do you want to park?</h3>
            <button onClick={register}>Park</button>
        </div>
    );
};

export default RegistrationCard;
