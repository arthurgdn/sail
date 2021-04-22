import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Response } from "../interfaces/response.interface";
import { AuthData } from '../interfaces/user.interface';
import { Dispatch, SetStateAction } from 'react';

export const signin = async (tag: string, password: string, setAuth: Dispatch<SetStateAction<AuthData>> ): Promise<Response> => {
    try{
        const res = await axios.post('/auth/login',{tag, password})
        if (res.data) {
            const auth = {isAuthenticated: true, user: res.data}
            await AsyncStorage.setItem('auth', JSON.stringify(auth))
            setAuth(auth)
            return {status: res.status, message:''}
        } else {
            return {status: 401, message: 'Invalid credentials'}
        }
    } catch(e){
        return {status: 400, message: e.message}
    }
}