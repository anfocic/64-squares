import AsyncStorage from '@react-native-async-storage/async-storage';

export async function authorizedFetch(url: string, options: RequestInit = {}) {
    const token = await AsyncStorage.getItem('token');

    const headers = {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : '',
    };

    return fetch(url, {
        ...options,
        headers,
    });
}