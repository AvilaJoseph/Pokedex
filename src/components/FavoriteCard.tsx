import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface PokemonType {
  name: string;
  color: string;
  textColor: string;
}

export interface FavoriteCardProps {
  id: string;
  name: string;
  imageUrl: string;
  types: PokemonType[];
  onRemove: (id: string) => void;
  onCardPress: (id: string) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  id,
  name,
  imageUrl,
  types,
  onRemove,
  onCardPress
}) => {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.pokemonId}>Nº{id}</Text>
        <Text style={styles.pokemonName}>{name}</Text>
        
        <View style={styles.typesContainer}>
          {types.map((type, index) => (
            <View
              key={index}
              style={[styles.typeTag, { backgroundColor: type.color }]}
            >
              <Text style={[styles.typeText, { color: type.textColor }]}>
                {type.name}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.imageSection}>
        <TouchableOpacity 
          style={styles.cardImage}
          onPress={() => onCardPress(id)}
        >
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.pokemonImage} 
            resizeMode="contain"
          />
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={() => onRemove(id)}
          >
            <Ionicons name="close-circle" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => onRemove(id)}
        >
          <View style={styles.deleteContainer}>
            <Ionicons name="trash-outline" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 12,
    backgroundColor: 'white',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingVertical: 10,
  },
  pokemonId: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  pokemonName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#212121',
    marginBottom: 8,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 4,
  },
  typeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
  },
  imageSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'visible',
  },
  pokemonImage: {
    width: 80,
    height: 80,
  },
  favoriteButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  deleteButton: {
    marginLeft: 8,
  },
  deleteContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoriteCard;