import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 360;

interface TypeBadgeProps {
  type: string;
}

// Componente para los badges de tipo
const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  // Mapeo de tipos a colores y íconos
  const typeConfig: Record<string, { color: string, icon: any, background: string, iconType: string }> = {
    fogo: { color: '#FFF', icon: 'fire', background: '#F08030', iconType: 'material' },
    fuego: { color: '#FFF', icon: 'fire', background: '#F08030', iconType: 'material' },
    grama: { color: '#FFF', icon: 'leaf', background: '#78C850', iconType: 'ionicon' },
    gelo: { color: '#FFF', icon: 'snowflake', background: '#98D8D8', iconType: 'material' },
    fantasma: { color: '#FFF', icon: 'ghost', background: '#705898', iconType: 'material' },
    venenoso: { color: '#FFF', icon: 'flask', background: '#A040A0', iconType: 'ionicon' },
    veneno: { color: '#FFF', icon: 'flask', background: '#A040A0', iconType: 'ionicon' },
    voador: { color: '#FFF', icon: 'paper-plane', background: '#89BDFF', iconType: 'ionicon' },
    normal: { color: '#FFF', icon: 'circle-outline', background: '#A8A878', iconType: 'material' },
    noturno: { color: '#FFF', icon: 'moon-waning-crescent', background: '#705848', iconType: 'material' },
  };

  const config = typeConfig[type.toLowerCase()] || { color: '#FFF', icon: 'help-circle', background: '#A8A878', iconType: 'ionicon' };

  const renderIcon = () => {
    if (config.iconType === 'ionicon') {
      return <Ionicons name={config.icon} size={16} color={config.color} />;
    } else if (config.iconType === 'material') {
      return <MaterialCommunityIcons name={config.icon} size={16} color={config.color} />;
    }
    return <Ionicons name="help-circle" size={16} color={config.color} />;
  };

  return (
    <View style={[styles.typeBadge, { backgroundColor: config.background }]}>
      {renderIcon()}
      <Text style={[styles.typeText, { color: config.color }]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Text>
    </View>
  );
};

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

  // Determinar el color de fondo de la imagen según el tipo principal
  const getTypeColors = () => {
    const primaryType = types[0]?.toLowerCase();
    switch (primaryType) {
      case 'fogo':
      case 'fuego':
        return {
          main: '#F08030',
          card: '#FEEAC9',
          circle: 'rgba(255, 156, 84, 0.7)'
        };
      case 'grama':
        return {
          main: '#78C850',
          card: '#E6F1E6', 
          circle: 'rgba(142, 214, 126, 0.7)'
        };
      case 'agua':
        return {
          main: '#6890F0',
          card: '#E6F1FF',
          circle: 'rgba(131, 169, 237, 0.7)'
        };
      case 'voador':
        return {
          main: '#89BDFF', 
          card: '#EAF4FF',
          circle: 'rgba(157, 195, 242, 0.7)'
        };
      case 'gelo':
        return {
          main: '#98D8D8',
          card: '#EBF7F7',
          circle: 'rgba(170, 224, 222, 0.7)'
        };
      case 'fantasma':
        return {
          main: '#705898',
          card: '#E8E4F1',
          circle: 'rgba(138, 119, 177, 0.7)'
        };
      case 'noturno':
        return {
          main: '#705848',
          card: '#EDEAE7',
          circle: 'rgba(133, 119, 108, 0.7)'
        };
      case 'venenoso':
      case 'veneno':
        return {
          main: '#A040A0',
          card: '#F1E6F1',
          circle: 'rgba(184, 106, 184, 0.7)'
        };
      default:
        return {
          main: '#A8A878',
          card: '#F0F0E5',
          circle: 'rgba(190, 190, 154, 0.7)'
        };
    }
  };

  const colors = getTypeColors();
  
  // Calculate if we need more height due to stacked badges on small screens
  const needsExtraHeight = isSmallScreen && types.length > 1;
  const cardHeight = needsExtraHeight ? 180 : 165;

  return (
    <TouchableOpacity
      style={[
        styles.container, 
        { 
          backgroundColor: colors.card,
          height: cardHeight 
        }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.backgroundStripes}>
        {/* Rayas verticales de fondo */}
        {[...Array(10)].map((_, i) => (
          <View key={i} style={styles.stripe} />
        ))}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.number}>{formattedNumber}</Text>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.typesContainer}>
          {types.map((type, index) => (
            <TypeBadge key={index} type={type} />
          ))}
        </View>
      </View>
      
      <View style={[
        styles.imageContainer, 
        { 
          backgroundColor: colors.main,
          height: cardHeight 
        }
      ]}>
        {/* Background circle */}
        <View style={[styles.backgroundCircle, { backgroundColor: colors.circle }]} />
        
        {/* Pokemon image */}
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
            size={18}
            color={isFavorite ? "#FF6B6B" : "#FFF"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
    flexDirection: 'row',
    // height is now set dynamically in the component
  },
  backgroundStripes: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    opacity: 0.05,
  },
  stripe: {
    width: 1,
    height: '100%',
    backgroundColor: '#6890F0',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    paddingLeft: 20,
    paddingRight: 10,
  },
  number: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins_600SemiBold',
  },
  name: {
    fontSize: 22,
    color: '#333',
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 8,
  },
  typesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginRight: 5,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 4,
  },
  typeText: {
    fontSize: isSmallScreen ? 12 : 14,
    marginLeft: 6,
    fontFamily: 'Poppins_500Medium',
  },
  imageContainer: {
    width: 130,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    minWidth: 110,
    zIndex: 1,
    // height is now set dynamically in the component
  },
  backgroundCircle: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    opacity: 0.8,
  },
  image: {
    width: '90%',
    height: '90%',
    zIndex: 2,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  }
});

export default PokemonCard;