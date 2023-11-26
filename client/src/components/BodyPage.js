import React from 'react';
import '../styles/BodyPage.css';
import {useNavigate} from "react-router-dom";
import { useAuth } from './AuthContext';

function BodyPage() {
    const { user } = useAuth();



    return (
        <div className="body-page">

        </div>
    );
}

export default BodyPage;