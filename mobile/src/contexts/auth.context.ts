import { createContext } from 'react';
import { AuthData } from '../interfaces/user.interface';

export default createContext<{auth : AuthData}>({ auth: { isAuthenticated: false, user: null }})