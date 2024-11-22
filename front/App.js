import { StyleSheet} from 'react-native';
import SplashScreen from './app/screens/SplashScreen';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    // <LoginScreen/>
    // <RegistrationScreen/>
    // <LoginScreen/>
    <SplashScreen/>
    // <ProfileSetupScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
