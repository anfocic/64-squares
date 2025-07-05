import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export function ProtectedRoute({ children, redirectTo = '/auth/login/index' }: ProtectedRouteProps) {
    const { isAuthenticated, loadingAuthState } = useAuth();
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background,
        },
    });

    if (loadingAuthState) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    if (!isAuthenticated) {
        return <Redirect href={redirectTo} />;
    }

    return <>{children}</>;
}
