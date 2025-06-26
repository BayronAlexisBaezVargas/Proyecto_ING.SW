// frontend/src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // 1. Nuevo estado para saber si estamos verificando la sesión inicial
    const [loading, setLoading] = useState(true);

    // 2. Este efecto se ejecuta UNA SOLA VEZ cuando la app carga
    useEffect(() => {
        const verifySession = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('http://localhost:8000/api/verify-session', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData); // Restauramos la sesión del usuario
                    } else {
                        localStorage.removeItem('token'); // El token es inválido o expiró
                    }
                } catch (error) {
                    console.error("Error al verificar la sesión:", error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false); // Terminamos de cargar
        };
        verifySession();
    }, []);

    const login = (userData) => {
        setUser(userData);
        // El token ya se guarda en localStorage desde la página de login
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Limpiamos el token al cerrar sesión
    };

    const value = {
        user,
        isLoggedIn: !!user,
        loading, // 3. Exportamos el estado de carga
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
