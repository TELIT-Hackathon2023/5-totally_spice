import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import '../styles/App.css';
import Registration from './SignUp';
import SignInForm from "./SignIn";
import NavBar from "./NavBar";
import backgroundImage from "../assets/thumb_40661_properties_big.jpg";
import BodyPage from "./BodyPage";
import RegistrationCard from './RegistrationCard';
import {AuthProvider, useAuth} from './AuthContext';
import UserCard from './User';
import AdminPanel from './AdminPanel';
import ReservationPage from './ReservationPage';
import reservationPage from "./ReservationPage";
function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <NavBar />
                    <Content />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

function Content() {
    const { isLoggedIn } = useAuth();
    const location = useLocation();
    const isSignInPage = location.pathname === '/signin';
    const isSignUpPage = location.pathname === '/registration';
    const isAdminPage = location.pathname === '/admin'; // Add this line
    const isReservationPage = location.pathname === '/reservationPage'; // Add this line

    return (
        <div className="content">
            <div className="card-container">
            {!isReservationPage && isLoggedIn && !isSignInPage && !isSignUpPage && !isAdminPage && <UserCard />}
            {!isReservationPage && !isSignInPage && !isSignUpPage && !isAdminPage && <RegistrationCard />}
            <Routes>
                <Route path="/" element={<BodyPage />} />
                <Route path="/signin" element={<SignInForm />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/reservationPage" element={<ReservationPage />} />
            </Routes>
            </div>
        </div>
    );
}


export default App;
