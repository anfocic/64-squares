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
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function ForgotPasswordScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleResetPassword = async () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        setLoading(true);
        try {
            // TODO: Implement forgot password API call
            // await forgotPassword(email);
            
            // Simulate API call for now
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setEmailSent(true);
        } catch (err: any) {
            Alert.alert('Error', err.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
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
        header: {
            alignItems: 'center',
            marginBottom: 32,
        },
        backButton: {
            position: 'absolute',
            left: 0,
            top: 0,
            padding: 8,
        },
        title: {
            color: theme.text,
            fontSize: 28,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        subtitle: {
            color: theme.textSecondary,
            fontSize: 16,
            textAlign: 'center',
            marginTop: 8,
            lineHeight: 22,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.cardBackground,
            borderRadius: 8,
            marginBottom: 24,
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
        resetButton: {
            backgroundColor: theme.primary,
            borderRadius: 8,
            paddingVertical: 14,
            alignItems: 'center',
            marginBottom: 24,
            opacity: loading ? 0.7 : 1,
        },
        resetButtonText: {
            color: theme.surface,
            fontWeight: 'bold',
            fontSize: 18,
        },
        successContainer: {
            alignItems: 'center',
            marginBottom: 24,
        },
        successIcon: {
            marginBottom: 16,
        },
        successTitle: {
            color: theme.success,
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 8,
        },
        successText: {
            color: theme.textSecondary,
            fontSize: 16,
            textAlign: 'center',
            lineHeight: 22,
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
    });

    if (emailSent) {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color={theme.text} />
                    </TouchableOpacity>

                    <View style={styles.successContainer}>
                        <View style={styles.successIcon}>
                            <Ionicons name="checkmark-circle" size={64} color={theme.success} />
                        </View>
                        <Text style={styles.successTitle}>Email Sent!</Text>
                        <Text style={styles.successText}>
                            We've sent a password reset link to {email}. 
                            Please check your email and follow the instructions to reset your password.
                        </Text>
                    </View>

                    <TouchableOpacity 
                        style={styles.resetButton}
                        onPress={() => setEmailSent(false)}
                    >
                        <Text style={styles.resetButtonText}>Send Another Email</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Remember your password? </Text>
                        <Link href="/auth/login" style={styles.footerLink}>
                            Sign in
                        </Link>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color={theme.text} />
                    </TouchableOpacity>
                    
                    <Text style={styles.title}>Forgot Password?</Text>
                    <Text style={styles.subtitle}>
                        No worries! Enter your email address and we'll send you a link to reset your password.
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <FontAwesome name="envelope" size={18} color={theme.textSecondary} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor={theme.textSecondary}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <TouchableOpacity 
                    style={styles.resetButton} 
                    onPress={handleResetPassword}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={theme.surface} />
                    ) : (
                        <Text style={styles.resetButtonText}>Send Reset Link</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Remember your password? </Text>
                    <Link href="/auth/login/index" style={styles.footerLink}>
                        Sign in
                    </Link>
                </View>
            </View>
        </View>
    );
}
