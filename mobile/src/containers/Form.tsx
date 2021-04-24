import React, { FunctionComponent, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

export default (props: { children: ReactNode }) => (
    <View style={styles.form}>{props.children}</View>
);

const styles = StyleSheet.create({
    form: {
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 'auto',
        justifyContent: 'space-evenly'
    }
});
