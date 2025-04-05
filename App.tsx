import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/auth/LoginScreen'
import RegisterScreen from './src/auth/RegisterScreen';
import LoginFormScreen from './src/auth/LoginFormScreen';

export default function App() {
  return (
    <LoginFormScreen></LoginFormScreen>
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
