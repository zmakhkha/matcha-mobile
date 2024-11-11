// app/screens/EmailVerificationScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmailVerificationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>A verification email has been sent. Please check your inbox.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  message: { fontSize: 16, textAlign: 'center' }
});
