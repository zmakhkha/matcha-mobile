// app/screens/LoginScreen.tsx

import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        placeholder="Username"
        style={styles.input}
        placeholderTextColor={Colors.textPlaceholder}
      />
      
      <TextInput
        placeholder="Password"
        style={styles.input}
        placeholderTextColor={Colors.textPlaceholder}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.loginButton} onPress={() => {}}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => {}}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.registerButton} onPress={() => {}}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: Colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: Colors.surface,
    borderColor: Colors.primaryLight,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    color: Colors.textPrimary,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPasswordButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: Colors.accent,
    fontSize: 14,
    fontWeight: '500',
  },
  registerButton: {
    marginTop: 25,
    alignItems: 'center',
  },
  registerText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});
