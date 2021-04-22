
import React, { useEffect, useState } from 'react';
import AppRouter from './src/routers/AppRouter';
import AuthContext from './src/contexts/auth.context';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthData } from './src/interfaces/user.interface';



export default function App(){

  const [auth, setAuth] = useState<AuthData>({ isAuthenticated: false, user: null });
  const getAuth = async () => {
    try{
      const storedAuthData = await AsyncStorage.getItem('auth')
      if(storedAuthData){
          setAuth(JSON.parse(storedAuthData));
      }
    }catch(e){
      console.log(e)
    }
  }
  
  useEffect(()=>{
    getAuth()
  },[])
  return (<AuthContext.Provider value={{ auth, setAuth }}><AppRouter/></AuthContext.Provider> )
}