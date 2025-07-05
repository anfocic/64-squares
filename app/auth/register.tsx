import React from "react";
import { StyleSheet } from "react-native";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { useRegister } from "@/hooks/auth/useRegister";

export default function RegisterScreen() {
    const { handleRegister, loading, error } = useRegister();

    return (
        <RegisterForm
            onRegister={handleRegister}
            loading={loading}
            error={error}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
    },
});