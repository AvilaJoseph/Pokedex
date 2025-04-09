import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  StatusBar,
  ActivityIndicator,
  useWindowDimensions,
  Dimensions
} from 'react-native';
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';

import PokemonCard from '../../components/PokemonCard';
import EmptyFavorites from '../../components/EmptyFavorites';
import MenuBar from '../../components/MenuBar';

// Mock data
const mockFavorites = [
  {
    id: '001',
    name: 'Bulbasaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    types: ['Grama', 'Venenoso'],
    generation: 'Geração I',
    isFavorite: false
  },
  {
    id: '002',
    name: 'Ivysaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
    types: ['noturno', 'Venenoso'],
    generation: 'Geração I',
    isFavorite: false
  },
  {
    id: '003',
    name: 'Venusaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
    types: ['Grama', 'Venenoso'],
    generation: 'Geração I',
    isFavorite: false
  },
  {
    id: '004',
    name: 'Charmander',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    types: ['Fuego'],
    generation: 'Geração I',
    isFavorite: false
  },
  {
    id: '005',
    name: 'Charmeleon',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
    types: ['Fuego'],
    generation: 'Geração I',
    isFavorite: false
  }
];

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState(mockFavorites);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to false to see the EmptyFavorites component
  const [activeScreen, setActiveScreen] = useState('FavoritesScreen');
  
  // Get screen dimensions
  const { width, height } = useWindowDimensions();
  const paddingBottom = width < 350 ? 70 : 80;
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  // Handle screen navigation
  const handleScreenChange = (screenName: string) => {
    setActiveScreen(screenName);
  };

  // Remove from favorites
  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => prev.filter(pokemon => pokemon.id !== id));
  };

  // View Pokemon details
  const handleViewPokemon = (id: string) => {
    console.log(`View Pokemon ${id} details`);
  };

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0075BE" />;
  }

  // Calculate horizontal padding based on screen width
  const horizontalPadding = width * 0.04; // 4% of screen width

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Favoritos</Text>
      </View>
      
      {isLoggedIn && favorites.length > 0 ? (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollViewContent,
            { 
              paddingBottom: paddingBottom,
              paddingHorizontal: horizontalPadding
            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {favorites.map(pokemon => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              imageUrl={pokemon.imageUrl}
              types={pokemon.types}
              isFavorite={pokemon.isFavorite}
              onPress={() => handleViewPokemon(pokemon.id)}
              onToggleFavorite={() => handleToggleFavorite(pokemon.id)}
            />
          ))}
        </ScrollView>
      ) : (
        <EmptyFavorites onLoginPress={handleLogin} />
      )}
      
      {/* Add the MenuBar component at the bottom */}
      <MenuBar 
        activeScreen={activeScreen}
        onScreenChange={handleScreenChange}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#212121',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 16,
  },
});