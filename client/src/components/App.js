import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import '../styles/App.css';
import Registration from './Registration';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav>
          <Link to="/">Home</Link>

        </nav>
        <Routes>
          

          <Route path="/registration" element={<Registration />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
