import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import '../styles/App.css';
import Registration from './SignUp';
import SignInForm from "./SignIn";
import NavBar from "./NavBar";
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar/>
        <Routes>
          

          <Route path="/registration" element={<Registration />} />
          <Route path="/signin" element={<SignInForm />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
