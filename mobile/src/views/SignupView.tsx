import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import Form from '../containers/Form';

export default () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>Join Sail Now !</Text>
            <Form>
                <Text>Form content</Text>
            </Form>
            <Button title="I already have an account" onPress={()=>navigation.navigate('signin')} />

        </View>
    )
}