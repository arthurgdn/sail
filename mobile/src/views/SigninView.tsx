import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import Form from '../containers/Form';

export default () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>Log in to sail !</Text>
            <Form>
                <Text>Form content</Text>
            </Form>
            <Button title="I don't have an account" onPress={()=>navigation.navigate('signup')} />

        </View>
    )
}