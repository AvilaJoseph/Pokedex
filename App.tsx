import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Pokedex from './src/screens/Home/Pokedex';
import RegionsScreen from './src/screens/Home/RegionsScreen';

export default function App() {
  return (
    <RegionsScreen></RegionsScreen>
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
