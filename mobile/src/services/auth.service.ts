import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Response } from "../interfaces/response.interface";
import { AuthData } from '../interfaces/user.interface';
import { Dispatch, SetStateAction } from 'react';

export const signin = async (tag: string, password: string, setAuth: Dispatch<SetStateAction<AuthData>> ): Promise<Response> => {
    try {
        const res = await axios.post('/auth/login',JSON.stringify({user: {tag, password}}))
        if (res.data) {
            const user = res.data.user
            const auth = {isAuthenticated: true, user }
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
            await AsyncStorage.setItem('auth', JSON.stringify(auth))
            setAuth(auth)
            return {status: res.status, message:''}
        } else {
            return {status: 401, message: 'Invalid credentials'}
        }
    } catch(e) {
        return {status: 400, message: e.message}
    }
}

export const logout = async (setAuth: Dispatch<SetStateAction<AuthData>>) => {
    try {
        const auth = {isAuthenticated: false, user: {tag:'', username:'', token:''} }
        axios.defaults.headers.common['Authorization'] = '';
        await AsyncStorage.setItem('auth', JSON.stringify(auth))
        setAuth(auth)
        return { message: ''}
    } catch (e) {
        return { message: e.message }
    }
}