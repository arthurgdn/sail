import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Button } from 'react-native';
import Form from '../containers/Form';
import TextInput from '../components/TextInput';
import BigButton from '../components/BigButton';
import AuthContext from '../contexts/auth.context';
import { signin } from '../services/auth.service';

export default () => {
    const navigation = useNavigation();
    const [tag, setTag] = useState<string>('');
    const { setAuth } = useContext(AuthContext);
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSignin = async () => {
        const response = await signin(tag, password, setAuth);
        if (response.status !== 200) {
            setError(response.message);
        } else {
            navigation.navigate('conversations');
        }
    };

    return (
        <View>
            <Text>Log in to sail !</Text>
            <Form>
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
                <BigButton title="Sign In" onPressHandler={handleSignin} />
            </Form>
            <Text>{error}</Text>
            <Button
                title="I don't have an account"
                onPress={() => navigation.navigate('signup')}
            />
        </View>
    );
};
