import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  StatusBar,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
  Platform,
  Dimensions
} from 'react-native';
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';

// Importa el componente y su interfaz
import RegionCard, { RegionCardProps } from '../../components/RegionCard';
import MenuBar from '../../components/MenuBar';

// Define la interfaz para los datos de región
interface RegionData extends Omit<RegionCardProps, 'selected' | 'onPress'> {
  id: string;
}

// Mock data for regions
const regionData: RegionData[] = [
  {
    id: '1',
    name: 'Kanto',
    generation: '1ª Generación',
    backgroundImage: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_HGSS.png',
    starterImages: [
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'
    ],
  },
  {
    id: '2',
    name: 'Johto',
    generation: '2ª Generación',
    backgroundImage: 'https://archives.bulbagarden.net/media/upload/6/64/JohtoMap.png',
    starterImages: [
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/155.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png'
    ],
  },
  {
    id: '3',
    name: 'Hoenn',
    generation: '3ª Generación',
    backgroundImage: 'https://archives.bulbagarden.net/media/upload/8/85/Hoenn_ORAS.png',
    starterImages: [
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/252.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/255.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/258.png'
    ],
  },
  {
    id: '4',
    name: 'Sinnoh',
    generation: '4ª Generación',
    backgroundImage: 'https://archives.bulbagarden.net/media/upload/0/08/Sinnoh_BDSP_artwork.png',
    starterImages: [
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/387.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/390.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/393.png'
    ],
  },
  {
    id: '5',
    name: 'Unova',
    generation: '5ª Generación',
    backgroundImage: 'https://archives.bulbagarden.net/media/upload/f/fc/Unova_B2W2_map.png',
    starterImages: [
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/495.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/498.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/501.png'
    ],
  },
  {
    id: '6',
    name: 'Kalos',
    generation: '6ª Generación',
    backgroundImage: 'https://archives.bulbagarden.net/media/upload/8/8a/Kalos_alt.png',
    starterImages: [
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/650.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/653.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/656.png'
    ],
  },
  {
    id: '7',
    name: 'Alola',
    generation: '7ª Generación',
    backgroundImage: 'https://archives.bulbagarden.net/media/upload/0/0b/Alola_USUM_artwork.png',
    starterImages: [
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/722.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/725.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/728.png'
    ],
  },
  {
    id: '8',
    name: 'Galar',
    generation: '8ª Generación',
    backgroundImage: 'https://archives.bulbagarden.net/media/upload/c/ce/Galar_artwork.png',
    starterImages: [
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/810.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/813.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/816.png'
    ],
  },
];

export default function RegionsScreen() {
  const [selectedRegion, setSelectedRegion] = useState('1'); // Default to Kanto
  const [activeScreen, setActiveScreen] = useState('RegionsScreen');
  const [paddingBottom, setPaddingBottom] = useState(80); // Default padding
  
  // Get screen dimensions for responsive layout
  const { width, height } = useWindowDimensions();
  
  // Calculate dynamic font sizes and spacings based on screen width
  const headerFontSize = width < 350 ? 20 : 24;
  const headerPadding = {
    paddingVertical: width < 350 ? 12 : 16,
    paddingHorizontal: width < 350 ? 16 : 20,
  };
  
  // Recalculate padding for MenuBar based on screen size
  useEffect(() => {
    // Calculate MenuBar height for bottom padding - adjust for different screen sizes
    const MENU_BAR_HEIGHT = width < 350 ? 50 : 60;
    setPaddingBottom(MENU_BAR_HEIGHT + 20);
  }, [width]);
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  // Handle screen navigation (similar to Pokedex implementation)
  const handleScreenChange = (screenName: string) => {
    setActiveScreen(screenName);
    // Here you would normally navigate to the screen if using React Navigation
  };

  // Handle region selection
  const handleRegionPress = (regionId: string) => {
    setSelectedRegion(regionId);
    // Aquí podrías navegar a una vista detallada de la región si lo necesitas
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0075BE" />;
  }

  // Calculate horizontal padding based on screen width
  const horizontalPadding = width * 0.04; // 4% of screen width

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      
      <View style={[styles.headerContainer, headerPadding]}>
        <Text style={[styles.headerTitle, { fontSize: headerFontSize }]}>Regiones</Text>
      </View>
      
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
        {regionData.map(region => (
          <RegionCard
            key={region.id}
            name={region.name}
            generation={region.generation}
            backgroundImage={region.backgroundImage}
            starterImages={region.starterImages}
            selected={region.id === selectedRegion}
            onPress={() => handleRegionPress(region.id)}
          />
        ))}
      </ScrollView>
      
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
  },
  headerTitle: {
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