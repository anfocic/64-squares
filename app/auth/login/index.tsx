import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {useLogin} from "@/hooks/useLogin";
import {LoginForm} from "@/components/LoginForm";

const Login = () => {
    const { handleLogin, loading, error } = useLogin();

    const onLogin = (email: string, password: string) => {
        handleLogin(email, password).then(() => {});
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <LoginForm onLogin={onLogin} loading={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
    },
    error: {
        color: "red",
        marginTop: 16,
        textAlign: "center",
    },
    registerLink: {
        color: "#007AFF",
        marginTop: 24,
        textAlign: "center",
        textDecorationLine: "underline",
    },
});

export default Login;
