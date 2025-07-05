import {Stack} from 'expo-router';
import {AuthProvider, useAuth} from "@/context/AuthContext";
import React from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/react-query";
import {GameProvider} from "@/context/GameContext";
import {ThemeProvider} from "@/context/ThemeContext";
import {StatusBar} from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function RootLayoutNav() {

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="auth/login" options={{headerShown: false}}/>
            <Stack.Screen name="league" options={{headerShown: false}}/>
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <AuthProvider>
                    <GameProvider>
                        <QueryClientProvider client={queryClient}>
                            <StatusBar style="auto" />
                            <RootLayoutNav/>
                        </QueryClientProvider>
                    </GameProvider>
                </AuthProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}