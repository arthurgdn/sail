import React, { useContext, FunctionComponent, useEffect } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import {View,StyleSheet} from 'react-native'

import AuthContext from '../contexts/auth.context'
import { ParamListBase } from '@react-navigation/routers';

interface PrivateRouteProps {
    navigation: StackNavigationProp<ParamListBase>;
    component: FunctionComponent;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ navigation, component:Component, ...rest}: PrivateRouteProps)=>{
    const  { auth } = useContext(AuthContext);
    if(!auth.isAuthenticated){
        navigation.navigate('signin')
    }
    return (
        
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer}>  
                    <Component/>   
                </View>
            </View>        
    )}

const styles = StyleSheet.create({
    mainContainer:{
        flexDirection:'column',
        alignContent:'center',
        flex:1,
        height:'100%'
    },
    contentContainer:{
        width:'100%',
        backgroundColor:'white',
        height:500,
        flex:1
    }
})

export default PrivateRoute
