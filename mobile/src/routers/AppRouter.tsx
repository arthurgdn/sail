import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import SignupView from '../views/SignupView';
import SigninView from '../views/SigninView';
import ConversationsView from '../views/ConversationsView';

const Stack = createStackNavigator();

const AppRouter = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="signup" options={{ headerShown: false }}>
                {(props) => <PublicRoute {...props} component={SignupView} />}
            </Stack.Screen>
            <Stack.Screen name="signin" options={{ headerShown: false }}>
                {(props) => <PublicRoute {...props} component={SigninView} />}
            </Stack.Screen>
            <Stack.Screen name="conversations" options={{ headerShown: false }}>
                {(props) => (
                    <PrivateRoute {...props} component={ConversationsView} />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppRouter;
