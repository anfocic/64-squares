import {Stack} from 'expo-router';
import {AuthProvider, useAuth} from "@/context/AuthContext";
import {UserProvider} from "@/context/UserContext";
import React from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/react-query";
import {GameProvider} from "@/context/GameContext";
import {ThemeProvider} from "@/context/ThemeContext";
import {BoardThemeProvider} from "@/context/BoardThemeContext";
import {StatusBar} from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function RootLayoutNav() {

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="auth/login/index" options={{headerShown: false}}/>
            <Stack.Screen name="auth/register" options={{headerShown: false}}/>
            <Stack.Screen name="auth/forgot-password" options={{headerShown: false}}/>
            <Stack.Screen name="league" options={{headerShown: false}}/>
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <BoardThemeProvider>
                    <AuthProvider>
                        <UserProvider>
                            <GameProvider>
                                <QueryClientProvider client={queryClient}>
                                    <StatusBar style="auto" />
                                    <RootLayoutNav/>
                                </QueryClientProvider>
                            </GameProvider>
                        </UserProvider>
                    </AuthProvider>
                </BoardThemeProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}