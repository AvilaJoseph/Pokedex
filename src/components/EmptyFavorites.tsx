import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, useWindowDimensions } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

interface EmptyFavoritesProps {
  onLoginPress?: () => void;
}

const EmptyFavorites: React.FC<EmptyFavoritesProps> = ({ onLoginPress }) => {
  const { height, width } = useWindowDimensions();
  const isSmallScreen = height < 700;
  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Calculamos tamaños basados en las dimensiones de la pantalla
  const imageHeight = isSmallScreen ? height * 0.35 : height * 0.35;
  const titleSize = isSmallScreen ? 20 : 18;
  const descSize = isSmallScreen ? 15 : 14;
  const spacing = isSmallScreen ? 8 : 12;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../assets/img/banner/NotExist.png')}
          style={[styles.pokemonImage, { height: imageHeight }]}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={[styles.titleText, { fontSize: titleSize, marginBottom: spacing }]}>
          No tienes ningún Pokémon favorito :(
        </Text>
        

          <Text style={[styles.descriptionText, { fontSize: descSize, marginBottom: spacing }]}>
          Haz clic en el icono del corazón de tu Pokémon favorito y aparecerá aquí.
          </Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    maxHeight: '50%',
  },
  pokemonImage: {
    width: '80%',
    aspectRatio: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  titleText: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#212121',
    textAlign: 'center',
  },
  descriptionText: {
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#0075BE',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 16,
  },
  loginButtonText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  }
});

export default EmptyFavorites;