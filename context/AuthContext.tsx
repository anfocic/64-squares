import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from "react-native";

type AuthContextType = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    loadingAuthState: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loadingAuthState, setLoadingAuthState] = useState(true); // <-- New state

    useEffect(() => {
        // Check token on app startup
        const checkAuth = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Failed to load auth token", error);
            } finally {
                setLoadingAuthState(false); // <-- Important: stop loading
            }
        };

        checkAuth();
    }, []);

    const login = () => setIsAuthenticated(true);

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    if (loadingAuthState) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated,loadingAuthState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};