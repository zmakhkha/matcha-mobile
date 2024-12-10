import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './app/screens/SplashScreen';
import HomeScreen from './app/screens/HomeScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import ChatScreen from './app/screens/ChatScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator  initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
