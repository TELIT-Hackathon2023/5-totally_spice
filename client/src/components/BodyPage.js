import React from 'react';
import '../styles/BodyPage.css';
import {useNavigate} from "react-router-dom";

function BodyPage() {
    const navigate = useNavigate();

    const goToAdminPage = () => {
        navigate('/admin'); // This will navigate to the Admin page
    };
    return (
        <div className="body-page">
            <button onClick={goToAdminPage}>Go to Admin Page</button>
        </div>
    );
}

export default BodyPage;