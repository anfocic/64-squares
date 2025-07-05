import {request} from "@/lib/utils/authUtils";

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
    token: string; // From Google Sign-In
};

export async function login(data: LoginRequest) {
    console.log('login', data);
    return request("/login", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function register(data: RegistrationRequest, token?: string) {
    return request("/registration", {
        method: "POST",
        body: JSON.stringify(data),
    }, true, token);
}

export async function fetchMe(token: string) {
    return request("/me", {
        method: "GET",
    }, true, token);
}

export async function googleLogin(payload: OAuthPayload) {
    return request("/google", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function refreshToken(refreshToken: string) {
    return request("/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
    });
}

export async function logout(refreshToken: string) {
    return request("/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
    });
}

export async function authFetch(
    url: string,
    options: RequestInit,
    getAccessToken: () => Promise<string>,
    refresh: () => Promise<void>
): Promise<Response> {
    let token = await getAccessToken();

    let res = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.status === 401) {
        await refresh();
        token = await getAccessToken();

        res = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
        });
    }

    return res;
}