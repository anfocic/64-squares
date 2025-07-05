import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "@/context/AuthContext";
import { register as registerRequest } from "@/services/authService";
import { useRouter } from "expo-router";

export function useRegister() {
    const { login: loginContext } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (username: string, email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await registerRequest({ username, email, password });

            // Store tokens
            if (response?.access_token) {
                await AsyncStorage.setItem('token', response.access_token);
            }
            if (response?.refresh_token) {
                await AsyncStorage.setItem('refresh_token', response.refresh_token);
            }

            // Update auth context
            await loginContext(response.access_token, response.refresh_token);
            
            // Navigate to home
            router.replace("/(tabs)/home");
        } catch (err: any) {
            console.error("Registration error:", err);
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        handleRegister,
        loading,
        error,
    };
}
