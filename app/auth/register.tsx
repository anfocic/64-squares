import React from "react";
import { StyleSheet } from "react-native";
import { RegisterForm } from "@/components/features/auth";
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