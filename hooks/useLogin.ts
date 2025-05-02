import {useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from "@/context/AuthContext";
import {login as loginRequest} from "@/services/authService";
import {useRouter} from "expo-router";

export function useLogin() {
    const {login: loginContext} = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await loginRequest({email, password});

            if (response?.token) {
                await AsyncStorage.setItem('token', response.token);
            }

            loginContext(response.token, response.refreshToken); // Update auth context (you can pass response if needed)
            router.replace("/(tabs)/home");
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return {handleLogin, loading, error};
}