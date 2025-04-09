import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions
} from 'react-native';
import { 
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Get screen dimensions for responsive design
const { width } = Dimensions.get('window');

// Type definitions
interface PokemonType {
  name: string;
  color: string;
  textColor: string;
}

interface PokemonWeakness {
  name: string;
  color: string;
  textColor: string;
}

interface PokemonEvolution {
  name: string;
  number: string;
  imageUrl: string;
  level?: number;
}

interface PokemonDetailProps {
  navigation?: any; // For navigation purposes
  route?: {
    params: {
      pokemonId: string;
    }
  };
}

// Mock data for the Bulbasaur example
const pokemonData = {
  id: '001',
  name: 'Bulbasaur',
  types: [
    { name: 'Grama', color: '#78C850', textColor: '#FFFFFF' },
    { name: 'Venenoso', color: '#A040A0', textColor: '#FFFFFF' }
  ],
  description: 'Há uma semente de planta nas costas desde o dia em que este Pokémon nasce. A semente cresce lentamente.',
  weight: '6.9 kg',
  height: '0.7 m',
  category: 'Seed',
  ability: 'Overgrow',
  gender: 'GÊNERO',
  genderRatio: '12.5%',
  imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  weaknesses: [
    { name: 'Fogo', color: '#F08030', textColor: '#FFFFFF' },
    { name: 'Psíquico', color: '#F85888', textColor: '#FFFFFF' },
    { name: 'Voador', color: '#A890F0', textColor: '#FFFFFF' },
    { name: 'Gelo', color: '#98D8D8', textColor: '#FFFFFF' }
  ],
  evolutions: [
    {
      name: 'Bulbasaur',
      number: 'N°001',
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    },
    {
      name: 'Ivysaur',
      number: 'N°002',
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
      level: 16
    },
    {
      name: 'Venusaur',
      number: 'N°003',
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
      level: 36
    }
  ]
};

// Type Badge Component
const TypeBadge = ({ type }: { type: PokemonType }) => (
  <View style={[styles.typeBadge, { backgroundColor: type.color }]}>
    <Text style={[styles.typeBadgeText, { color: type.textColor }]}>{type.name}</Text>
  </View>
);

// Weakness Badge Component
const WeaknessBadge = ({ weakness }: { weakness: PokemonWeakness }) => (
  <View style={[styles.weaknessBadge, { backgroundColor: weakness.color }]}>
    <Text style={[styles.weaknessBadgeText, { color: weakness.textColor }]}>{weakness.name}</Text>
  </View>
);

// Evolution Item Component
const EvolutionItem = ({ evolution, isLast }: { evolution: PokemonEvolution, isLast: boolean }) => (
  <View style={styles.evolutionItem}>
    <View style={styles.evolutionImageContainer}>
      <LinearGradient
        colors={['#8CD058', '#FFFFFF']}
        style={styles.evolutionGradient}
      >
        <Image 
          source={{ uri: evolution.imageUrl }} 
          style={styles.evolutionImage} 
          resizeMode="contain"
        />
      </LinearGradient>
      <Text style={styles.evolutionName}>{evolution.name}</Text>
      <Text style={styles.evolutionNumber}>{evolution.number}</Text>
    </View>
    
    {!isLast && (
      <View style={styles.evolutionArrow}>
        <Ionicons name="arrow-down" size={24} color="#3B4CCA" />
        <Text style={styles.evolutionLevel}>Nível {evolution.level}</Text>
      </View>
    )}
  </View>
);

// Main Component
export default function PokemonDetail({ navigation, route }: PokemonDetailProps) {
  // In a real app, you would fetch the pokemon data based on route.params.pokemonId
  // For this example, we'll use the mock data directly
  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with back button and favorite button */}
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation?.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        {/* Pokemon Image with Gradient Background */}
        <LinearGradient
          colors={['#8CD058', '#FFFFFF']}
          style={styles.gradientContainer}
        >
          <Image 
            source={{ uri: pokemonData.imageUrl }} 
            style={styles.pokemonImage} 
            resizeMode="contain"
          />
        </LinearGradient>
        
        {/* Pokemon Info Card */}
        <View style={styles.infoCard}>
          {/* Pokemon Name and Number */}
          <Text style={styles.pokemonName}>{pokemonData.name}</Text>
          <Text style={styles.pokemonNumber}>N°{pokemonData.id}</Text>
          
          {/* Pokemon Types */}
          <View style={styles.typesContainer}>
            {pokemonData.types.map((type, index) => (
              <TypeBadge key={index} type={type} />
            ))}
          </View>
          
          {/* Pokemon Description */}
          <Text style={styles.description}>{pokemonData.description}</Text>
          
          {/* Pokemon Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>PESO</Text>
              <Text style={styles.statValue}>{pokemonData.weight}</Text>
            </View>
            
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>ALTURA</Text>
              <Text style={styles.statValue}>{pokemonData.height}</Text>
            </View>
          </View>
          
          {/* Pokemon Category and Ability */}
          <View style={styles.categoryAbilityContainer}>
            <View style={styles.categoryBox}>
              <Text style={styles.categoryLabel}>CATEGORIA</Text>
              <Text style={styles.categoryValue}>{pokemonData.category}</Text>
            </View>
            
            <View style={styles.abilityBox}>
              <Text style={styles.abilityLabel}>HABILIDADE</Text>
              <Text style={styles.abilityValue}>{pokemonData.ability}</Text>
            </View>
          </View>
          
          {/* Gender Ratio */}
          <View style={styles.genderContainer}>
            <Text style={styles.genderLabel}>{pokemonData.gender}</Text>
            <View style={styles.genderRatioBar}>
              <View style={styles.genderRatioFill} />
            </View>
            <Text style={styles.genderRatioText}>{pokemonData.genderRatio}</Text>
          </View>
          
          {/* Weaknesses Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Fraquezas</Text>
            <View style={styles.weaknessesContainer}>
              {pokemonData.weaknesses.map((weakness, index) => (
                <WeaknessBadge key={index} weakness={weakness} />
              ))}
            </View>
          </View>
          
          {/* Evolutions Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Evoluções</Text>
            <View style={styles.evolutionsContainer}>
              {pokemonData.evolutions.map((evolution, index) => (
                <EvolutionItem 
                  key={index} 
                  evolution={evolution} 
                  isLast={index === pokemonData.evolutions.length - 1} 
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerButtons: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    height: width * 0.6,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  pokemonImage: {
    width: width * 0.4,
    height: width * 0.4,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  pokemonName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: '#212121',
    textAlign: 'center',
  },
  pokemonNumber: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 10,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  typeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  typeBadgeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
  },
  description: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginVertical: 15,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  statBox: {
    alignItems: 'center',
    width: '45%',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    padding: 15,
  },
  statLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#666666',
    marginBottom: 5,
  },
  statValue: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#212121',
  },
  categoryAbilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  categoryBox: {
    alignItems: 'center',
    width: '45%',
  },
  categoryLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#666666',
    marginBottom: 5,
  },
  categoryValue: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#212121',
  },
  abilityBox: {
    alignItems: 'center',
    width: '45%',
  },
  abilityLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#666666',
    marginBottom: 5,
  },
  abilityValue: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#212121',
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  genderLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#666666',
    width: '20%',
  },
  genderRatioBar: {
    height: 6,
    backgroundColor: '#F2F2F2',
    borderRadius: 3,
    width: '60%',
  },
  genderRatioFill: {
    height: 6,
    width: '12.5%',
    backgroundColor: '#3B4CCA',
    borderRadius: 3,
  },
  genderRatioText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#666666',
    width: '15%',
    textAlign: 'right',
  },
  sectionContainer: {
    marginTop: 25,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#212121',
    marginBottom: 15,
  },
  weaknessesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  weaknessBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  weaknessBadgeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
  },
  evolutionsContainer: {
    alignItems: 'center',
  },
  evolutionItem: {
    alignItems: 'center',
    marginBottom: 10,
  },
  evolutionImageContainer: {
    alignItems: 'center',
  },
  evolutionGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  evolutionImage: {
    width: 60,
    height: 60,
  },
  evolutionName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#212121',
  },
  evolutionNumber: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#666666',
  },
  evolutionArrow: {
    alignItems: 'center',
    marginVertical: 5,
  },
  evolutionLevel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#3B4CCA',
    marginTop: 2,
  },
});