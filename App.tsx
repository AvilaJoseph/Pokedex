import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Pokedex from './src/screens/Home/Pokedex';
import RegionsScreen from './src/screens/Home/RegionsScreen';
import FavoritesScreen from './src/screens/Home/FavoritesScreen';

export default function App() {
  return (
    <FavoritesScreen></FavoritesScreen>
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
