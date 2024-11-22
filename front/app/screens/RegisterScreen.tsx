import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const RegisterScreen = ({ navigation }) => {
    // Perform email/password authentication
  const handleEmailLogin = () => {
    navigation.navigate('UserInfoFlow');
  };

  // Perform Snapchat OAuth authentication
  const handleSnapchatLogin = () => {
    navigation.navigate('UserInfoFlow');
  };

  return (
    <View style={styles.container}>
      <Button title="Continue with Email" onPress={handleEmailLogin} />
      <Button title="Continue with Snapchat" onPress={handleSnapchatLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
});

export default RegisterScreen;
