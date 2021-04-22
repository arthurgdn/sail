import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import colors from '../styles/colors';
import sizes from '../styles/sizes';

export default (props: TextInputProps)=>(
    <TextInput {...props} style={{...styles.input}}/>
)

const styles = StyleSheet.create({
    input:{
        height:50,
        minWidth:200,
        borderColor:colors.azure,
        borderWidth:2,
        borderRadius:15,
        width:'100%',
        marginTop:sizes.sSize,
        paddingHorizontal:sizes.sSize,
        paddingVertical:sizes.xsSize,
        backgroundColor:'white'
    }
})