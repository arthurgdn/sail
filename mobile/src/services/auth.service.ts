import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Dispatch, SetStateAction } from 'react';
import { Response } from '../interfaces/response.interface';
import { AuthData } from '../interfaces/user.interface';

export const signin = async (
    tag: string,
    password: string,
    setAuth: Dispatch<SetStateAction<AuthData>>
): Promise<Response> => {
    try {
        const res = await axios.post(
            '/auth/login',
            JSON.stringify({ user: { tag, password } })
        );
        if (res.data) {
            const { user } = res.data;
            const auth = { isAuthenticated: true, user };
            axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
            await AsyncStorage.setItem('auth', JSON.stringify(auth));
            setAuth(auth);
            return { status: res.status, message: '' };
        }
        return { status: 401, message: 'Invalid credentials' };
    } catch (e) {
        return { status: 400, message: e.message };
    }
};

export const signup = async (
    username: string,
    tag: string,
    password: string,
    setAuth: Dispatch<SetStateAction<AuthData>>
) => {
    try {
        const res = await axios.post(
            '/auth',
            JSON.stringify({ user: { username, tag, password } })
        );
        if (res.data) {
            const { user } = res.data;
            const auth = { isAuthenticated: true, user };
            axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
            await AsyncStorage.setItem('auth', JSON.stringify(auth));
            setAuth(auth);
            return { status: res.status, message: '' };
        }
        return { status: 401, message: 'Unable to sign up' };
    } catch (e) {
        return { status: 400, message: e.message };
    }
};

export const logout = async (setAuth: Dispatch<SetStateAction<AuthData>>) => {
    try {
        const auth = {
            isAuthenticated: false,
            user: { tag: '', username: '', token: '' }
        };
        axios.defaults.headers.common.Authorization = '';
        await AsyncStorage.setItem('auth', JSON.stringify(auth));
        setAuth(auth);
        return { message: '' };
    } catch (e) {
        return { message: e.message };
    }
};
