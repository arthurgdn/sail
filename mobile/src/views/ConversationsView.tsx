import { useNavigation } from '@react-navigation/core';
import React, { useContext } from 'react'
import {View, Text, Button} from 'react-native';
import BigButton from '../components/BigButton';
import AuthContext from '../contexts/auth.context';
import { logout } from '../services/auth.service';

export default ()=>{ 
    const { setAuth } = useContext(AuthContext);
    const navigation = useNavigation()
    const handleLogout = () => {
        logout(setAuth);
        navigation.navigate('signin')
    }
    return (
        <View>
            <BigButton title={"Logout"} onPressHandler={handleLogout}/>
        </View>
        )}