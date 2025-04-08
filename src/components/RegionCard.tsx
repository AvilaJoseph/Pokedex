import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  useWindowDimensions 
} from 'react-native';
import { useFonts, Poppins_600SemiBold, Poppins_500Medium } from '@expo-google-fonts/poppins';

// Export interface para props
export interface RegionCardProps {
  name: string;
  generation: string;
  backgroundImage: string;
  starterImages: string[];
  selected?: boolean;
  onPress: () => void;
}

const RegionCard: React.FC<RegionCardProps> = ({
  name,
  generation,
  backgroundImage,
  starterImages,
  selected = false,
  onPress
}) => {
  // Obtenemos dimensiones de la pantalla para adaptarnos
  const { width } = useWindowDimensions();
  
  // Calculamos la altura basada en el ancho de la pantalla (proporción)
  const cardHeight = Math.min(100, width * 0.24);
  const imageSize = Math.min(40, width * 0.1);
  const fontSize = width < 350 ? 16 : 20;
  const subtitleSize = width < 350 ? 10 : 12;
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity 
      style={[styles.cardContainer, { height: cardHeight }]} 
      activeOpacity={0.9}
      onPress={onPress}
    >
      <ImageBackground
        source={{ uri: backgroundImage }}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={[styles.regionName, { fontSize }]}>{name}</Text>
            <Text style={[styles.generationText, { fontSize: subtitleSize }]}>{generation}</Text>
          </View>
          
          <View style={styles.startersContainer}>
            {starterImages.map((imageUrl, index) => (
              <Image 
                key={index} 
                source={{ uri: imageUrl }} 
                style={[styles.starterImage, { width: imageSize, height: imageSize }]}
                resizeMode="contain"
              />
            ))}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: '100%',
  },
  textContainer: {
    flex: 1,
  },
  regionName: {
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  generationText: {
    color: 'white',
    fontFamily: 'Poppins_500Medium',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  startersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starterImage: {
    marginLeft: 5,
  },
  selectedIndicator: {
    position: 'absolute',
    right: 16,
    bottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  selectedText: {
    color: '#0075BE',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default RegionCard;