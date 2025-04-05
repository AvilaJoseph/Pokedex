import React, { useState, useEffect, useRef } from 'react';
import { 
  SafeAreaView, 
  View, 
  StyleSheet, 
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Animated
} from 'react-native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins';
import Ionicons from '@expo/vector-icons/Ionicons';

import SearchInput from '../../components/SearchInput';
import PokemonList from '../../components/Pokedex/ListCard';
import FilterModal from '../../components/FilterModal';

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
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  
  // Animated value for scroll
  const scrollY = useRef(new Animated.Value(0)).current;
  
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
    switch (selectedSortFilter) {
      case 'Menor número':
        result.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        break;
      case 'Maior número':
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'A-Z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z-A':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
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

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.searchFilterContainer}>
            <View style={styles.searchInputContainer}>
              <SearchInput 
                value={searchQuery}
                onChangeText={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />
            </View>
            <TouchableOpacity 
              style={styles.filterButtonContainer}
              onPress={() => setIsFilterModalVisible(true)}
            >
              <Ionicons 
                name="filter" 
                size={24} 
                color={selectedSortFilter ? "#007AFF" : "#8E8E93"} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <View style={styles.listWrapper}>
        <PokemonList 
          pokemons={displayedPokemons}
          onToggleFavorite={toggleFavorite}
          scrollY={scrollY}
          contentPaddingTop={10}
        />
      </View>

      <FilterModal 
        isVisible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onSelectFilter={setSelectedSortFilter}
        selectedFilter={selectedSortFilter}
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
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  filterButtonContainer: {
    padding: 8,
  },
  listWrapper: {
    flex: 1
  }
});