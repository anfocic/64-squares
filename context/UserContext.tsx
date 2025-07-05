import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { fetchMe } from "@/services/authService";

export interface User {
    id: string;
    username: string;
    email: string;
    rating: number;
    country?: string;
    avatar?: string;
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    gamesDrawn: number;
    createdAt: string;
    lastActive: string;
    isOnline: boolean;
}

type UserContextType = {
    user: User | null;
    loading: boolean;
    error: string | null;
    updateUser: (userData: Partial<User>) => void;
    refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated, accessToken } = useAuth();

    const fetchUserData = async () => {
        if (!accessToken || !isAuthenticated) {
            setUser(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const userData = await fetchMe(accessToken);
            setUser(userData);
        } catch (err: any) {
            console.error("Failed to fetch user data:", err);
            setError(err.message || "Failed to load user data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && accessToken) {
            fetchUserData();
        } else {
            setUser(null);
        }
    }, [isAuthenticated, accessToken]);

    const updateUser = (userData: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...userData });
        }
    };

    const refreshUser = async () => {
        await fetchUserData();
    };

    return (
        <UserContext.Provider
            value={{
                user,
                loading,
                error,
                updateUser,
                refreshUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
