import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { FormField, FormSwitch } from '@/components/ui';
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth';

export default function EnhancedRegisterForm() {
  const { theme } = useTheme();
  const { register } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data.username, data.email, data.password);
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 24,
      width: '100%',
      maxWidth: 400,
      alignSelf: 'center',
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
    form: {
      gap: 16,
    },
    termsContainer: {
      marginVertical: 8,
    },
    submitButton: {
      backgroundColor: theme.primary,
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 16,
    },
    submitButtonDisabled: {
      backgroundColor: theme.textMuted,
    },
    submitButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 32,
      paddingTop: 24,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    loginText: {
      color: theme.textSecondary,
      fontSize: 14,
    },
    loginLink: {
      color: theme.primary,
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 4,
    },
    passwordRequirements: {
      backgroundColor: theme.cardBackground,
      borderRadius: 8,
      padding: 12,
      marginTop: 8,
    },
    requirementTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    requirement: {
      fontSize: 12,
      color: theme.textSecondary,
      marginBottom: 4,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>64 Squares</Text>
            <Text style={styles.subtitle}>Create your account</Text>
          </View>

          <View style={styles.form}>
            <FormField
              control={control}
              name="username"
              label="Username"
              placeholder="Choose a unique username"
              autoCapitalize="none"
              autoComplete="username"
              required
            />

            <FormField
              control={control}
              name="email"
              label="Email"
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              required
            />

            <FormField
              control={control}
              name="password"
              label="Password"
              placeholder="Create a strong password"
              secureTextEntry
              autoComplete="new-password"
              required
            />

            {/* Password Requirements */}
            <View style={styles.passwordRequirements}>
              <Text style={styles.requirementTitle}>Password Requirements:</Text>
              <Text style={styles.requirement}>• At least 6 characters long</Text>
              <Text style={styles.requirement}>• Contains uppercase and lowercase letters</Text>
              <Text style={styles.requirement}>• Contains at least one number</Text>
            </View>

            <FormField
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Re-enter your password"
              secureTextEntry
              autoComplete="new-password"
              required
            />

            <View style={styles.termsContainer}>
              <FormSwitch
                control={control}
                name="agreeToTerms"
                label="I agree to the Terms of Service and Privacy Policy"
                required
              />
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                isSubmitting && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
