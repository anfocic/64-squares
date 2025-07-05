import {Stack} from 'expo-router';
import {AuthProvider, useAuth} from "@/context/AuthContext";
import React from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/react-query";
import {GameProvider} from "@/context/GameContext";

function RootLayoutNav() {
    const {isAuthenticated} = useAuth();

    return (
        <Stack>
            {isAuthenticated ? (
                <Stack.Screen name="home/index" options={{headerShown: false}}/>
            ) : (
                <Stack.Screen name="auth/login" options={{headerShown: false}}/>
            )}
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <GameProvider>
                <QueryClientProvider client={queryClient}>
                    <RootLayoutNav/>
                </QueryClientProvider>
            </GameProvider>
        </AuthProvider>
    );
}