// app/screens/SettingsScreen.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Button title="Edit Profile" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 }
});
