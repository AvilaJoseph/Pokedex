import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import TypeBadge from './TypeBadge';

const { width } = Dimensions.get('window');

interface PokemonCardProps {
  id: string;
  name: string;
  imageUrl: string;
  types: string[];
  isFavorite?: boolean;
  onPress?: () => void;
  onToggleFavorite?: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  name,
  imageUrl,
  types,
  isFavorite = false,
  onPress,
  onToggleFavorite
}) => {
  
  // Format Pokemon number (e.g., 1 -> "Nº001")
  const formattedNumber = `Nº${id.padStart(3, '0')}`;
  
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.number}>{formattedNumber}</Text>
        <Text style={styles.name}>{name}</Text>
        
        <View style={styles.typesContainer}>
          {types.map((type, index) => (
            <TypeBadge key={index} type={type as any} />
          ))}
        </View>
      </View>
      
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image}
          resizeMode="contain"
        />
        
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={onToggleFavorite}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AntDesign 
            name={isFavorite ? "heart" : "hearto"} 
            size={24} 
            color={isFavorite ? "#FF6B6B" : "white"} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8F5F0',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 12,
  },
  number: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    color: '#333',
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 12,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: '#67C23A',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '90%',
    height: '90%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    padding: 8,
    zIndex: 5,
  }
});

export default PokemonCard;