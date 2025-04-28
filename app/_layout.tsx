import { Stack } from 'expo-router';
import {AuthProvider, useAuth} from "@/context/AuthContext";
import React from "react";

function RootLayoutNav() {
    const { isAuthenticated } = useAuth();

    return (
        <Stack>
            {isAuthenticated ? (
                <Stack.Screen name="home/index" options={{ headerShown: false }} />
            ) : (
                <Stack.Screen name="auth/login" options={{ headerShown: false }} />
            )}
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootLayoutNav />
        </AuthProvider>
    );
}