import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Define available types and their colors
type PokemonType = 'Grama' | 'Venenoso' | 'Fogo' | 'Agua' | 'Eletrico' | 'Normal' | 'Voador' | 'Lutador';

interface TypeData {
  color: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

const typeData: Record<PokemonType, TypeData> = {
  'Grama': { color: '#78C850', icon: 'leaf' },
  'Venenoso': { color: '#A040A0', icon: 'skull-outline' },
  'Fogo': { color: '#F08030', icon: 'fire' },
  'Agua': { color: '#6890F0', icon: 'water' },
  'Eletrico': { color: '#F8D030', icon: 'lightning-bolt' },
  'Normal': { color: '#A8A878', icon: 'star' },
  'Voador': { color: '#A890F0', icon: 'bird' },
  'Lutador': { color: '#C03028', icon: 'karate' },
};

interface TypeBadgeProps {
  type: PokemonType;
  style?: ViewStyle;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type, style }) => {
  const { color, icon } = typeData[type] || typeData.Normal;
  
  return (
    <View style={[styles.badge, { backgroundColor: color }, style]}>
      <MaterialCommunityIcons name={icon} size={16} color="white" />
      <Text style={styles.text}>{type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    marginLeft: 4,
  }
});

export default TypeBadge;