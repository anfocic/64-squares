import {CheckBox, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import {Link} from "expo-router";

import styles from "@/app/auth/login/styles";

type Props = {
    onLogin: (email: string, password: string) => void;
    loading?: boolean;
    error?: string | null;
};

export function LoginForm({ onLogin, loading, error }: Props) {const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);


    return (
        <View style={styles.background}>
            <View style={styles.card}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    {/*<Image source={require("@/assets/chess-logo.png")} style={styles.logoImage} />*/}
                    <Text style={styles.logoText}>Knightly Feud</Text>
                </View>

                {/* Inputs */}
                <View style={styles.inputContainer}>
                    <FontAwesome name="user" size={18} color="#888" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Username, Phone, or Email"
                        placeholderTextColor="#888"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={18} color="#888" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye-off" : "eye"} size={18} color="#888" />
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <View style={styles.rememberMe}>
                        <CheckBox
                            value={rememberMe}
                            onValueChange={setRememberMe}
                            tintColors={{ true: "#8bc34a", false: "#888" }}
                        />
                        <Text style={styles.rememberMeText}>Remember me</Text>
                    </View>
                    <Link href="/auth/forgot-password" style={styles.forgotPassword}>
                        Forgot Password?
                    </Link>
                </View>

                {/* Log In Button */}
                <TouchableOpacity style={styles.loginButton} onPress={() => onLogin(email, password)}>
                    <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerRow}>
                    <View style={styles.divider} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.divider} />
                </View>

                {/* Social Buttons */}
                <TouchableOpacity style={styles.socialButton}>
                    <AntDesign name="apple1" size={20} color="#fff" />
                    <Text style={styles.socialButtonText}>Log in with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <AntDesign name="google" size={20} color="#fff" />
                    <Text style={styles.socialButtonText}>Log in with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <FontAwesome name="facebook" size={20} color="#fff" />
                    <Text style={styles.socialButtonText}>Log in with Facebook</Text>
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