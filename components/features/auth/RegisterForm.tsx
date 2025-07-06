import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

type Props = {
    onRegister: (username: string, email: string, password: string) => void;
    loading?: boolean;
    error?: string | null;
};

export function RegisterForm({ onRegister, loading, error }: Props) {
    const { theme } = useTheme();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const handleRegister = () => {
        // Validation
        if (!username.trim()) {
            Alert.alert('Error', 'Username is required');
            return;
        }
        if (!email.trim()) {
            Alert.alert('Error', 'Email is required');
            return;
        }
        if (!password) {
            Alert.alert('Error', 'Password is required');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }
        if (!agreeToTerms) {
            Alert.alert('Error', 'Please agree to the terms and conditions');
            return;
        }

        onRegister(username.trim(), email.trim(), password);
    };

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
        termsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
        },
        checkbox: {
            width: 18,
            height: 18,
            borderWidth: 2,
            borderColor: theme.border,
            borderRadius: 3,
            marginRight: 12,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
        },
        checkboxChecked: {
            backgroundColor: theme.primary,
            borderColor: theme.primary,
        },
        termsText: {
            color: theme.textSecondary,
            fontSize: 14,
            flex: 1,
        },
        termsLink: {
            color: theme.primary,
            textDecorationLine: 'underline',
        },
        registerButton: {
            backgroundColor: theme.primary,
            borderRadius: 8,
            paddingVertical: 14,
            alignItems: 'center',
            marginBottom: 24,
            opacity: loading ? 0.7 : 1,
        },
        registerButtonText: {
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
                    <Text style={styles.subtitle}>Join the chess community</Text>
                </View>

                {/* Error Message */}
                {error && <Text style={styles.errorText}>{error}</Text>}

                {/* Username Input */}
                <View style={styles.inputContainer}>
                    <FontAwesome name="user" size={18} color={theme.textSecondary} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor={theme.textSecondary}
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <FontAwesome name="envelope" size={18} color={theme.textSecondary} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={theme.textSecondary}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
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

                {/* Confirm Password Input */}
                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={18} color={theme.textSecondary} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor={theme.textSecondary}
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Ionicons 
                            name={showConfirmPassword ? "eye-off" : "eye"} 
                            size={18} 
                            color={theme.textSecondary} 
                        />
                    </TouchableOpacity>
                </View>

                {/* Terms and Conditions */}
                <View style={styles.termsContainer}>
                    <TouchableOpacity
                        style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}
                        onPress={() => setAgreeToTerms(!agreeToTerms)}
                    >
                        {agreeToTerms && (
                            <Ionicons name="checkmark" size={12} color={theme.surface} />
                        )}
                    </TouchableOpacity>
                    <Text style={styles.termsText}>
                        I agree to the{' '}
                        <Text style={styles.termsLink}>Terms of Service</Text>
                        {' '}and{' '}
                        <Text style={styles.termsLink}>Privacy Policy</Text>
                    </Text>
                </View>

                {/* Register Button */}
                <TouchableOpacity 
                    style={styles.registerButton} 
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={theme.surface} />
                    ) : (
                        <Text style={styles.registerButtonText}>Create Account</Text>
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
                    <Text style={styles.socialButtonText}>Sign up with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                    <AntDesign name="apple1" size={20} color={theme.text} />
                    <Text style={styles.socialButtonText}>Sign up with Apple</Text>
                </TouchableOpacity>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <Link href="/auth/login" style={styles.footerLink}>
                        Sign in
                    </Link>
                </View>
            </View>
        </View>
    );
}
