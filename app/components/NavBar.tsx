import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const NavBar = () => {
  const navigation = useNavigation<NavigationProp>();

  // Define tabs with valid screen names and icon names
  const tabs: { name: keyof RootStackParamList; icon: React.ComponentProps<typeof Ionicons>['name'] }[] = [
    { name: 'ChatScreen', icon: 'chatbubbles' }, // Use valid Ionicons icon names
    { name: 'HomeScreen', icon: 'home' },
    { name: 'SettingsScreen', icon: 'settings' },
  ];

  return (
    <View style={styles.navBar}>
      {tabs.map(({ name, icon }) => (
        <TouchableOpacity
          key={name} // Use `name` as key since it's now a valid keyof RootStackParamList
          onPress={() => navigation.navigate(name)} // Navigate to the screen
        >
          <Ionicons name={icon} size={30} color="black" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default NavBar;
