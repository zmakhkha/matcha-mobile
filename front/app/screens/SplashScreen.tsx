import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkAuth = async () => {
      // const isAuthenticated = await checkUserAuth(); // Check auth from local storage or backend
      const isAuthenticated = true;
      navigation.replace(isAuthenticated ? 'HomeScreen' : 'RegisterScreen');
    };
    setTimeout(checkAuth, 3000); 
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Welcome to SnapConnect</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { width: 200, height: 200 },
  text: { fontSize: 20, color: '#888', marginTop: 20 },
});

export default SplashScreen;
