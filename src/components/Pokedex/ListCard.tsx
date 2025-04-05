import React from 'react';
import { 
  FlatList, 
  StyleSheet, 
  Animated,
  Dimensions,
  View
} from 'react-native';
import PokemonCard from '../PokemonCard';

const { width } = Dimensions.get('window');

interface PokemonData {
  id: string;
  name: string;
  imageUrl: string;
  types: string[];
  isFavorite: boolean;
}

interface PokemonListProps {
  pokemons: PokemonData[];
  onToggleFavorite: (id: string) => void;
  scrollY: Animated.Value;
  contentPaddingTop?: number;
}

const PokemonList: React.FC<PokemonListProps> = ({ 
  pokemons, 
  onToggleFavorite,
  scrollY,
  contentPaddingTop = 16
}) => {
  if (pokemons.length === 0) {
    return <View style={styles.emptyContainer} />;
  }

  return (
    <Animated.FlatList
      data={pokemons}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[
        styles.listContainer,
        { paddingTop: contentPaddingTop }
      ]}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
      renderItem={({ item }) => (
        <PokemonCard
          id={item.id}
          name={item.name}
          imageUrl={item.imageUrl}
          types={item.types}
          isFavorite={item.isFavorite}
          onToggleFavorite={() => onToggleFavorite(item.id)}
        />
      )}
      showsVerticalScrollIndicator={false}
      bounces={false}
      removeClippedSubviews={true}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexGrow: 1
  },
  emptyContainer: {
    flex: 0
  }
});

export default PokemonList;