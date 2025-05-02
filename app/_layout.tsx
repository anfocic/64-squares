import { Stack } from 'expo-router';
import {AuthProvider, useAuth} from "@/context/AuthContext";
import React from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/react-query";

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
            <QueryClientProvider client={queryClient}>
                <RootLayoutNav />
            </QueryClientProvider>
        </AuthProvider>
    );
}