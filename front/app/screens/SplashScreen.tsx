// app/screens/SplashScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
