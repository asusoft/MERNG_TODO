//import liraries
import {useNavigation} from '@react-navigation/native';
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';

// create a component
const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const onSubmit = () => {
    navigation.navigate('SignIn');
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ivan Ivanovich"
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
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Your password"
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
          Sign Up
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('SignIn')}
        style={{
          height: 40,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 18,
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: 16, color: '#fff'}}>
          Already have an account?{' '}
        </Text>
        <Text style={{fontSize: 16, color: '#e33062'}}>Sign In</Text>
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
export default SignUpScreen;
