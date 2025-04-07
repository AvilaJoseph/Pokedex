import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 360;

interface TypeBadgeProps {
  type: string;
}

// Componente para los badges de tipo
const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  // Mapeo de tipos a colores y íconos (solo los que se usan)
  const typeConfig: Record<string, { color: string, icon: any, background: string, iconType: string }> = {
    fuego: { color: '#FFF', icon: 'fire', background: '#F08030', iconType: 'material' },
    grama: { color: '#FFF', icon: 'leaf', background: '#78C850', iconType: 'ionicon' },
    venenoso: { color: '#FFF', icon: 'flask', background: '#A040A0', iconType: 'ionicon' },
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

  // Determinar el color de fondo de la imagen y la imagen de fondo según el tipo principal
  const getTypeInfo = () => {
    const primaryType = types[0]?.toLowerCase();
    
    // Definir las rutas de las imágenes de fondo sólo para los tipos que se usan
    // Nota: Reemplazar estas rutas con las ubicaciones reales de tus imágenes
    const typeBackgrounds = {
      fuego: require('../../assets/img/icons/pokemonCard/Types/fuego.png'),
      grama: require('../../assets/img/icons/pokemonCard/Types/planta.png'),
      noturno: require('../../assets/img/icons/pokemonCard/Types/nocturno.png'),
      venenoso: require('../../assets/img/icons/pokemonCard/Types/veneno.png'),
    };
    
    switch (primaryType) {
      case 'fuego':
        return {
          main: '#F08030',
          card: '#FEEAC9',
          backgroundImage: typeBackgrounds.fuego
        };
      case 'grama':
        return {
          main: '#78C850',
          card: '#E6F1E6',
          backgroundImage: typeBackgrounds.grama
        };
      case 'noturno':
        return {
          main: '#705848',
          card: '#EDEAE7',
          backgroundImage: typeBackgrounds.noturno
        };
      case 'venenoso':
        return {
          main: '#A040A0',
          card: '#F1E6F1',
          backgroundImage: typeBackgrounds.venenoso
        };
      default:
        // Usar fuego como fallback si el tipo no está en la lista
        return {
          main: '#F08030',
          card: '#FEEAC9',
          backgroundImage: typeBackgrounds.fuego
        };
    }
  };

  const typeInfo = getTypeInfo();
  
  // Calculate if we need more height due to stacked badges on small screens
  const needsExtraHeight = isSmallScreen && types.length > 1;
  const cardHeight = needsExtraHeight ? 180 : 165;

  return (
    <TouchableOpacity
      style={[
        styles.container, 
        { 
          backgroundColor: typeInfo.card,
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
          backgroundColor: typeInfo.main,
          height: cardHeight 
        }
      ]}>
        {/* Imagen de fondo según el tipo */}
        <Image
          source={typeInfo.backgroundImage}
          style={styles.backgroundTypeImage}
          resizeMode="contain"
        />
        
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
    borderRadius: 24,
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
    paddingTop: 5,
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
    width: 150,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius:18,
    borderBottomLeftRadius:18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    minWidth: 110,
    zIndex: 1,
    // height is now set dynamically in the component
  },
  backgroundTypeImage: {
    position: 'absolute',
    width: 110,
    height: 110,
    opacity: 0.8,
    zIndex: 1,
  },
  image: {
    width: '70%',
    height: '78%',
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
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },  
});

export default PokemonCard;