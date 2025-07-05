import React from "react";
import {useLogin} from "@/hooks/auth/useLogin";
import {LoginForm} from "@/components/forms/LoginForm";

const Login = () => {
    const { handleLogin, loading, error } = useLogin();

    const onLogin = (email: string, password: string) => {
        handleLogin(email, password).then(() => {});
    };

    return (
        <LoginForm
            onLogin={onLogin}
            loading={loading}
            error={error}
        />
    );
};

export default Login;
