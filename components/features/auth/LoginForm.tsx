import {Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import {Link} from "expo-router";
import { useTheme } from '@/context/ThemeContext';

type Props = {
    onLogin: (email: string, password: string) => void;
    loading?: boolean;
    error?: string | null;
};

export function LoginForm({ onLogin, loading, error }: Props) {
    const { theme } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        card: {
            backgroundColor: theme.surface,
            borderRadius: 16,
            padding: 24,
            width: '100%',
            maxWidth: 400,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
        },
        logoContainer: {
            alignItems: 'center',
            marginBottom: 32,
        },
        logoText: {
            color: theme.text,
            fontSize: 32,
            fontWeight: 'bold',
        },
        subtitle: {
            color: theme.textSecondary,
            fontSize: 16,
            textAlign: 'center',
            marginTop: 8,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderRadius: 8,
            marginBottom: 16,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: theme.border,
        },
        icon: {
            marginRight: 8,
        },
        input: {
            flex: 1,
            color: theme.text,
            height: 48,
            fontSize: 16,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
        },
        rememberMe: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        checkbox: {
            width: 18,
            height: 18,
            borderWidth: 2,
            borderColor: theme.border,
            borderRadius: 3,
            marginRight: 8,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
        },
        checkboxChecked: {
            backgroundColor: theme.primary,
            borderColor: theme.primary,
        },
        rememberMeText: {
            color: theme.textSecondary,
            fontSize: 14,
        },
        forgotPassword: {
            color: theme.primary,
            fontSize: 14,
            textDecorationLine: 'underline',
        },
        loginButton: {
            backgroundColor: theme.primary,
            borderRadius: 8,
            paddingVertical: 14,
            alignItems: 'center',
            marginBottom: 24,
            opacity: loading ? 0.7 : 1,
        },
        loginButtonText: {
            color: theme.surface,
            fontWeight: 'bold',
            fontSize: 18,
        },
        dividerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
        },
        divider: {
            flex: 1,
            height: 1,
            backgroundColor: theme.border,
        },
        orText: {
            color: theme.textSecondary,
            marginHorizontal: 12,
            fontSize: 14,
        },
        socialButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 16,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: theme.border,
        },
        socialButtonText: {
            color: theme.text,
            fontSize: 16,
            marginLeft: 12,
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 24,
        },
        footerText: {
            color: theme.textSecondary,
            fontSize: 14,
        },
        footerLink: {
            color: theme.primary,
            fontSize: 14,
            textDecorationLine: 'underline',
        },
        errorText: {
            color: theme.error,
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 16,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>64 Squares</Text>
                    <Text style={styles.subtitle}>Welcome back!</Text>
                </View>

                {/* Error Message */}
                {error && <Text style={styles.errorText}>{error}</Text>}

                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <FontAwesome name="user" size={18} color={theme.textSecondary} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Username, Phone, or Email"
                        placeholderTextColor={theme.textSecondary}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={18} color={theme.textSecondary} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={theme.textSecondary}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? "eye-off" : "eye"}
                            size={18}
                            color={theme.textSecondary}
                        />
                    </TouchableOpacity>
                </View>

                {/* Remember Me & Forgot Password */}
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.rememberMe}
                        onPress={() => setRememberMe(!rememberMe)}
                    >
                        <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                            {rememberMe && (
                                <Ionicons name="checkmark" size={12} color={theme.surface} />
                            )}
                        </View>
                        <Text style={styles.rememberMeText}>Remember me</Text>
                    </TouchableOpacity>
                    <Link href="/auth/forgot-password" style={styles.forgotPassword}>
                        Forgot Password?
                    </Link>
                </View>

                {/* Log In Button */}
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => onLogin(email, password)}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={theme.surface} />
                    ) : (
                        <Text style={styles.loginButtonText}>Log In</Text>
                    )}
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerRow}>
                    <View style={styles.divider} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.divider} />
                </View>

                {/* Social Buttons */}
                <TouchableOpacity style={styles.socialButton}>
                    <AntDesign name="google" size={20} color={theme.text} />
                    <Text style={styles.socialButtonText}>Log in with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <AntDesign name="apple1" size={20} color={theme.text} />
                    <Text style={styles.socialButtonText}>Log in with Apple</Text>
                </TouchableOpacity>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>New? </Text>
                    <Link href="/auth/register" style={styles.footerLink}>
                        Sign up – and start playing chess!
                    </Link>
                </View>
            </View>
        </View>

    );
}