import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router"; // ✅ use expo-router's router

type ProtectedRouteProps = {
    children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, loadingAuthState } = useAuth();
    const router = useRouter();
    console.log(isAuthenticated, 'isAuthenticated', router);

    useEffect(() => {
        if (!loadingAuthState && !isAuthenticated) {
            router.replace("/login");
        }
    }, [loadingAuthState, isAuthenticated, router]);

    // While checking auth state, show loading spinner
    if (loadingAuthState || (!isAuthenticated && typeof window !== "undefined")) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // If user is authenticated, render the protected content
    return <>{children}</>;
};