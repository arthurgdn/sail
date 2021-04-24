import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import Form from '../containers/Form';
import BigButton from '../components/BigButton';
import TextInput from '../components/TextInput';

export default () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [tag, setTag] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const handleSignup = () => {};
    return (
        <View>
            <Text>Join Sail Now !</Text>
            <Form>
                <TextInput
                    value={username}
                    blurOnSubmit
                    placeholder="Your name"
                    onChangeText={(value) => setUsername(value)}
                />
                <TextInput
                    value={tag}
                    blurOnSubmit
                    placeholder="Your Sail Tag"
                    onChangeText={(value) => setTag(value)}
                />
                <TextInput
                    value={password}
                    blurOnSubmit
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={(value) => setPassword(value)}
                />
                <TextInput
                    value={verifyPassword}
                    blurOnSubmit
                    placeholder="Verify your password"
                    secureTextEntry
                    onChangeText={(value) => setVerifyPassword(value)}
                />
                <BigButton title="Sign up" onPressHandler={handleSignup} />
            </Form>
            <Button
                title="I already have an account"
                onPress={() => navigation.navigate('signin')}
            />
        </View>
    );
};
