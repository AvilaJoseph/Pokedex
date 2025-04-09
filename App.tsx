import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Pokedex from './src/screens/Home/Pokedex';
import RegionsScreen from './src/screens/Home/RegionsScreen';
import FavoritesScreen from './src/screens/Home/FavoritesScreen';
import PokemonDetail from './src/screens/Home/PokemonDetail';

export default function App() {
  return (
    <PokemonDetail></PokemonDetail>
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
