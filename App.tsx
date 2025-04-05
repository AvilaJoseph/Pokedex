import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/auth/Login/LoginScreen'
import RegisterScreen from './src/auth/Register/RegisterScreen';
import LoginFormScreen from './src/auth/Login/LoginFormScreen';
import LoginSucessful from './src/auth/Login/LoginSucessful';
import RegisterSucessfull from './src/auth/Register/RegisterSucessfull';
import RegisterFormScreen from './src/auth/Register/RegisterFormScreen';
import WelcomeScreen from './src/auth/Welcome/WelcomeScreen';
import WelcomeSucessfull from './src/auth/Welcome/WelcomeSucessfull';

export default function App() {
  return (
    <WelcomeSucessfull></WelcomeSucessfull>
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
