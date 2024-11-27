import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Use Expo's Ionicons or another icon library

const NavBar = () => {
  return (
    <View style={styles.navBar}>
      <Ionicons name="chatbubbles" size={24} color="black" />
      <Ionicons name="home" size={24} color="black" />
      <Ionicons name="settings" size={24} color="black" />
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
