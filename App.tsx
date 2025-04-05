import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/auth/Login/LoginScreen'
import RegisterScreen from './src/auth/Register/RegisterScreen';
import LoginFormScreen from './src/auth/Login/LoginFormScreen';
import LoginSucessful from './src/auth/Login/LoginSucessful';
import RegisterSucessfull from './src/auth/Register/RegisterSucessfull';
import RegisterFormScreen from './src/auth/Register/RegisterFormScreen';

export default function App() {
  return (
    <RegisterFormScreen></RegisterFormScreen>
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
