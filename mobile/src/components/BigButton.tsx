import React from 'react'
import {StyleSheet,Text} from 'react-native'

import {TouchableOpacity} from 'react-native-gesture-handler'

import colors from '../styles/colors'
import sizes from '../styles/sizes'

export default ({title,onPressHandler}: {title: string; onPressHandler: ()=>void;})=>(
    <TouchableOpacity
        activeOpacity={0.8} 
        style={styles.button} 
        onPress={onPressHandler} 
    >
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button:{
        margin:sizes.lSize,
        height:'auto',
        minWidth:200,
        padding:sizes.lSize,
        borderWidth:0,
        borderRadius:50,
        backgroundColor:'white',
        color: colors.green,
        fontWeight:"600",
        fontSize:sizes.fontSizeSmall
    },buttonText:{
        color: colors.green,
        fontWeight:"900",
        fontSize:sizes.fontSizeMedium,
        textAlign:'center'
    }
})