import { createContext, Dispatch, SetStateAction } from 'react';
import { AuthData } from '../interfaces/user.interface';

export default createContext<{
    auth: AuthData;
    setAuth: Dispatch<SetStateAction<AuthData>>;
}>({ auth: { isAuthenticated: false, user: null }, setAuth: () => {} });
