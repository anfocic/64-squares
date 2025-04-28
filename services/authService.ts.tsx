import {authorizedFetch} from "@/services/apiService";

const BASE_URL = "http://127.0.0.1:8080"; // <- Change if your API runs on different port/host

type LoginRequest = {
    email: string;
    password: string;
};

type RegistrationRequest = {
    email: string;
    password: string;
    username: string;
};

type OAuthPayload = {
    token: string; // From Google Sign In
};

export async function login(data: LoginRequest) {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    console.log(res)
    if (!res.ok) {
        throw new Error("Invalid credentials");
    }

    return res.json(); // usually returns JWT token or user data
}

export async function register(data: RegistrationRequest) {
    const res = await authorizedFetch(`${BASE_URL}/registration`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Registration failed");
    }

    return res.json();
}

export async function fetchMe(token: string) {
    const res = await authorizedFetch(`${BASE_URL}/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Unauthorized");
    }

    return res.json(); // returns Claims
}

export async function googleLogin(payload: OAuthPayload) {
    const res = await authorizedFetch(`${BASE_URL}/google`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Google login failed");
    }

    return res.json();
}