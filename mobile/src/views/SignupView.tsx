import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import Form from '../containers/Form';
import BigButton from '../components/BigButton';
import TextInput from '../components/TextInput';
import AuthContext from '../contexts/auth.context';
import { signup } from '../services/auth.service';

export default () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [tag, setTag] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [error, setError] = useState('');
    const { setAuth } = useContext(AuthContext);

    const handleSignup = async () => {
        if (password !== verifyPassword) {
            setError('Passwords must match !');
        } else {
            const response = await signup(username, tag, password, setAuth);
            if (response.status !== 200) {
                setError(response.message);
            } else {
                navigation.navigate('conversations');
            }
        }
    };
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
            <Text>{error}</Text>
            <Button
                title="I already have an account"
                onPress={() => navigation.navigate('signin')}
            />
        </View>
    );
};
