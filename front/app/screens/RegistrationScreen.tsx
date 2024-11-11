// app/screens/RegistrationScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

export default function RegistrationScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleRegister = () => {
    // Placeholder for registration logic
  };

  const checkPasswordStrength = (password: string) => {
    // Simple password strength check
    if (password.length > 8) {
      setPasswordStrength('Strong');
    } else if (password.length > 5) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Weak');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor={Colors.textPlaceholder}
        keyboardType="email-address"
      />
      
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor={Colors.textPlaceholder}
      />
      
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
        placeholderTextColor={Colors.textPlaceholder}
      />

      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
        placeholderTextColor={Colors.textPlaceholder}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          checkPasswordStrength(text);
        }}
        style={styles.input}
        placeholderTextColor={Colors.textPlaceholder}
        secureTextEntry
      />
      
      {password && (
        <Text style={[styles.passwordStrength, styles[passwordStrength.toLowerCase()]]}>
          Password Strength: {passwordStrength}
        </Text>
      )}
      
      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>By signing up, you agree to our </Text>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Terms & Conditions</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}> and </Text>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
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
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.textPrimary,
    shadowColor: Platform.OS === 'ios' ? Colors.primary : Colors.textPlaceholder,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  passwordStrength: {
    marginVertical: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  weak: { color: Colors.error },
  medium: { color: Colors.warning },
  strong: { color: Colors.success },
  registerButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: Colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  footerLink: {
    fontSize: 14,
    color: Colors.accent,
    fontWeight: 'bold',
  },
});
