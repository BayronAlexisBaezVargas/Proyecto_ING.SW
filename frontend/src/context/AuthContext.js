import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        console.log("Contexto: Recibiendo datos para login", userData); // Debug: Para ver si los datos llegan aquí
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        isLoggedIn: !!user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};