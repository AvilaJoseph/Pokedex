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
import MenuBar from '../../components/MenuBar';

// Mock data
const pokemons = [
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

interface PokemonData {
  id: string;
  name: string;
  imageUrl: string;
  types: string[];
  generation: string;
  isFavorite: boolean;
}

export default function Pokedex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedPokemons, setDisplayedPokemons] = useState<PokemonData[]>(pokemons);
  const [selectedTypeFilters, setSelectedTypeFilters] = useState<string[] | null>(null);
  const [selectedGenerationFilter, setSelectedGenerationFilter] = useState<string | null>(null);
  const [selectedSortFilter, setSelectedSortFilter] = useState<string | null>(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [activeScreen, setActiveScreen] = useState('PokedexScreen');
  
  // Animated value for scroll
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Calculate MenuBar height for bottom padding - 60px is a common height for tab bars
  const MENU_BAR_HEIGHT = 60;
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  // Handle screen navigation
  const handleScreenChange = (screenName: string) => {
    setActiveScreen(screenName);
    // Here you would normally navigate to the screen if using React Navigation
  };

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
    if (selectedTypeFilters && selectedTypeFilters.length > 0) {
      result = result.filter(pokemon => 
        selectedTypeFilters.some(type => pokemon.types.includes(type))
      );
    }
    
    // Apply generation filter
    if (selectedGenerationFilter) {
      result = result.filter(pokemon => 
        pokemon.generation === selectedGenerationFilter
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
  }, [searchQuery, selectedTypeFilters, selectedGenerationFilter, selectedSortFilter]);

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

  // Handle applying filters
  const handleApplyFilters = (
    typeFilters: string[] | null, 
    generationFilter: string | null, 
    sortFilter: string | null
  ) => {
    setSelectedTypeFilters(typeFilters);
    setSelectedGenerationFilter(generationFilter);
    setSelectedSortFilter(sortFilter);
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
                color={(selectedTypeFilters || selectedGenerationFilter || selectedSortFilter) ? "#007AFF" : "#8E8E93"} 
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
          contentPaddingBottom={MENU_BAR_HEIGHT + 20} // Add padding at the bottom for MenuBar
        />
      </View>

      <FilterModal 
        isVisible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onApplyFilters={handleApplyFilters}
        initialTypeFilters={selectedTypeFilters}
        initialGenerationFilter={selectedGenerationFilter}
        initialSortFilter={selectedSortFilter}
      />
      
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
    flex: 1,
  }
});