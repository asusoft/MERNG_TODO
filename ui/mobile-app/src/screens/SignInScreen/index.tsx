//import liraries
import {useNavigation} from '@react-navigation/native';
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';

// create a component
const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const onSubmit = () => {};
  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="soft@test.com"
        placeholderTextColor={'grey'}
        style={{
          height: 40,
          color: 'white',
          fontSize: 16,
          width: '100%',
          borderWidth: 1,
          borderColor: 'grey',
          paddingVertical: 8,
          paddingHorizontal: 6,
          borderRadius: 8,
        }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Your password"
        placeholderTextColor={'grey'}
        secureTextEntry
        style={{
          height: 40,
          color: 'white',
          fontSize: 16,
          width: '100%',
          borderWidth: 1,
          borderColor: 'grey',
          paddingVertical: 8,
          paddingHorizontal: 6,
          borderRadius: 8,
        }}
      />
      <Pressable
        onPress={onSubmit}
        style={{
          backgroundColor: '#e33062',
          height: 40,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 22,
        }}>
        <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>
          Sign In
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('SignUp')} 
        style={{
          height: 40,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 18,
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: 16, color: '#fff'}}>New here? </Text>
        <Text style={{fontSize: 16, color: '#e33062'}}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#2d2d30',
    gap: 12,
  },
});

//make this component available to the app
export default SignInScreen;
