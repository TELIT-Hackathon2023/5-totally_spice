import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const loginUser = (userData) => {
        setIsLoggedIn(true);
        console.log(userData);
        setUser(userData);
    };

    const logoutUser = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
