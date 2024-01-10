import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    async function checkUser() {
      if (await isAuthenticated()) {
        navigation.navigate('Root');
      } else {
        navigation.navigate('NoAuthStack');
      }
    }
    checkUser();
  }, []);

  const isAuthenticated = async (): Promise<boolean> => {
    //await AsyncStorage.removeItem('token')
    const token = await AsyncStorage.getItem('token');
    return !!token;
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#2d2d30',
      }}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default SplashScreen;
