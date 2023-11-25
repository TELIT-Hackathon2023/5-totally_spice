import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../styles/App.css';
import Registration from './SignUp';
import SignInForm from "./SignIn";
import NavBar from "./NavBar";
import backgroundImage from "../assets/thumb_40661_properties_big.jpg";
import BodyPage from "./BodyPage";
import RegistrationCard from './RegistrationCard';
function App() {
    return (
        <BrowserRouter>
            <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <NavBar/>
                <div className="content">
                    <RegistrationCard />
                    <Routes>
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/signin" element={<SignInForm />} />
                        <Route index element={<BodyPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;