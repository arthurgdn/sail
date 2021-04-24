import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FunctionComponent, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import AuthContext from '../contexts/auth.context';

interface PublicRouteProps {
    navigation: StackNavigationProp<ParamListBase>;
    component: FunctionComponent;
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        alignContent: 'center',
        flex: 1,
        height: '100%'
    },
    contentContainer: {
        width: '100%',
        backgroundColor: 'white',
        height: 500,
        flex: 1
    }
});

const PublicRoute: FunctionComponent<PublicRouteProps> = ({
    navigation,
    component: Component
}: PublicRouteProps) => {
    const { auth } = useContext(AuthContext);
    if (auth.isAuthenticated) {
        navigation.navigate('conversations');
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <Component />
            </View>
        </View>
    );
};

export default PublicRoute;
