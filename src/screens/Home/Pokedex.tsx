import React, { useState, useEffect, useRef } from 'react';
import { 
  SafeAreaView, 
  View, 
  StyleSheet, 
  StatusBar,
  ActivityIndicator,
  Animated
} from 'react-native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins';

import SearchInput from '../../components/SearchInput';
import FilterButton from '../../components/FilterButton';
import PokemonList from '../../components/Pokedex/ListCard';

// Mock data
const pokemons = [
  {
    id: '001',
    name: 'Bulbasaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    types: ['Grama', 'Venenoso'],
    isFavorite: false
  },
  {
    id: '002',
    name: 'Ivysaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
    types: ['Grama', 'Venenoso'],
    isFavorite: false
  },
  {
    id: '003',
    name: 'Venusaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
    types: ['Grama', 'Venenoso'],
    isFavorite: false
  },
  {
    id: '004',
    name: 'Charmander',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    types: ['Fuego'],
    isFavorite: false
  },
  {
    id: '005',
    name: 'Charmeleon',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
    types: ['Fuego'],
    isFavorite: false
  }
];

interface PokemonData {
  id: string;
  name: string;
  imageUrl: string;
  types: string[];
  isFavorite: boolean;
}

export default function Pokedex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedPokemons, setDisplayedPokemons] = useState<PokemonData[]>(pokemons);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string | null>(null);
  const [selectedSortFilter, setSelectedSortFilter] = useState<string | null>(null);
  
  // Animated value for filters container
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Translate Y animation for filters container
  const filtersTranslateY = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -60],
    extrapolate: 'clamp'
  });
  
  // Opacity animation for filters container
  const filtersOpacity = scrollY.interpolate({
    inputRange: [0, 30, 60],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp'
  });
  
  // Height animation for filters container
  const filtersHeight = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [60, 0],
    extrapolate: 'clamp'
  });
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  // Handle search and filter updates together
  useEffect(() => {
    let result = [...pokemons];
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      result = result.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pokemon.id.includes(searchQuery)
      );
    }
    
    // Apply type filter
    if (selectedTypeFilter && selectedTypeFilter !== "Todos los tipos") {
      result = result.filter(pokemon => 
        pokemon.types.includes(selectedTypeFilter)
      );
    }
    
    // Apply sort
    if (selectedSortFilter === "Menor número") {
      result.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    }
    
    setDisplayedPokemons(result);
  }, [searchQuery, selectedTypeFilter, selectedSortFilter]);

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setDisplayedPokemons(prevPokemons => 
      prevPokemons.map(pokemon => 
        pokemon.id === id 
          ? { ...pokemon, isFavorite: !pokemon.isFavorite } 
          : pokemon
      )
    );
  };

  // Handle type filter
  const handleTypeFilter = () => {
    // Toggle between "Todos los tipos" and null
    setSelectedTypeFilter(prevFilter => 
      prevFilter === "Todos los tipos" ? null : "Todos los tipos"
    );
  };

  // Handle sort filter
  const handleSortFilter = () => {
    // Toggle between "Menor número" and null
    setSelectedSortFilter(prevFilter => 
      prevFilter === "Menor número" ? null : "Menor número"
    );
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <SearchInput 
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />
        </View>
        
        <Animated.View 
          style={[
            styles.filtersContainer, 
            { 
              height: filtersHeight,
              opacity: filtersOpacity,
              overflow: 'hidden'
            }
          ]}
        >
          <FilterButton 
            title="Todos los tipos"
            onPress={handleTypeFilter}
            isActive={selectedTypeFilter === "Todos los tipos"}
            style={styles.filterButton}
          />
          
          <FilterButton 
            title="Menor número"
            onPress={handleSortFilter}
            isActive={selectedSortFilter === "Menor número"}
            style={styles.filterButton}
          />
        </Animated.View>
      </View>
      
      <View style={styles.listWrapper}>
        <PokemonList 
          pokemons={displayedPokemons}
          onToggleFavorite={toggleFavorite}
          scrollY={scrollY}
          contentPaddingTop={10}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    zIndex: 10,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  listWrapper: {
    flex: 1
  }
});