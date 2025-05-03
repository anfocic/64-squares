import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from "react-native";
import { refreshToken as apiRefreshToken, logout as apiLogout } from "@/services/authService";

type AuthContextType = {
    isAuthenticated: boolean;
    accessToken: string | null;
    login: (accessToken: string, refreshToken: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
    loadingAuthState: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loadingAuthState, setLoadingAuthState] = useState(true);

    const checkStoredToken = useCallback(async () => {
        try {
            const refreshToken = await AsyncStorage.getItem("refresh_token");
            if (refreshToken) {
                const newTokens = await apiRefreshToken(refreshToken);
                setAccessToken(newTokens.accessToken);
                await AsyncStorage.setItem("refresh_token", newTokens.refreshToken);
                setIsAuthenticated(true);
            }
        } catch (err) {
            console.error("Token refresh failed", err);
            await logout();
        } finally {
            setLoadingAuthState(false);
        }
    }, []);

    useEffect(() => {
        checkStoredToken();
    }, [checkStoredToken]);

    const login = async (accessToken: string, refreshToken: string) => {
        await AsyncStorage.setItem("refresh_token", refreshToken);
        setAccessToken(accessToken);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem("refresh_token");
            if (refreshToken) {
                await apiLogout(refreshToken);
            }
        } catch (err) {
            console.warn("Logout request failed", err);
        } finally {
            await AsyncStorage.removeItem("refresh_token");
            setAccessToken(null);
            setIsAuthenticated(false);
        }
    };

    const refreshToken = async () => {
        const refreshToken = await AsyncStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("No refresh token available");

        const newTokens = await apiRefreshToken(refreshToken);
        setAccessToken(newTokens.accessToken);
        await AsyncStorage.setItem("refresh_token", newTokens.refreshToken);
    };

    if (loadingAuthState) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                accessToken,
                login,
                logout,
                refreshToken,
                loadingAuthState,
            }}
        >
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