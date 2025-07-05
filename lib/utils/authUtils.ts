const BASE_URL = "http://127.0.0.1:8080";

export async function request(
    path: string,
    options: RequestInit = {},
    authorized: boolean = false,
    token?: string
) {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
    };
    if (authorized && token) {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
    });
    console.log(res,'res')
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `Request failed: ${res.status}`);
    }

    return res.json();
}