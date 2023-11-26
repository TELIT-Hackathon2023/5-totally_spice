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
import Table from './Table';
import AdminPanel from './AdminPanel';

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

    return (
        <div className="content">
            {isLoggedIn && !isSignInPage && !isSignUpPage && !isAdminPage && <UserCard />}
            {!isSignInPage && !isSignUpPage && !isAdminPage && <RegistrationCard />}
            <Routes>
                <Route path="/" element={<BodyPage />} />
                <Route path="/signin" element={<SignInForm />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </div>
    );
}


export default App;
