import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import SearchInput from '../../components/SearchInput';
import FilterButton from '../../components/FilterButton';

interface PokedexHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleTypeFilter: () => void;
  handleSortFilter: () => void;
  selectedTypeFilter: string | null;
  selectedSortFilter: string | null;
  filtersTranslateY: Animated.AnimatedInterpolation<string | number>;
  filtersOpacity: Animated.AnimatedInterpolation<string | number>;
}

const PokedexHeader: React.FC<PokedexHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  handleTypeFilter,
  handleSortFilter,
  selectedTypeFilter,
  selectedSortFilter,
  filtersTranslateY,
  filtersOpacity
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <SearchInput 
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />
      </View>
      
      <Animated.View 
        style={[
          styles.filtersContainer, 
          { 
            transform: [{ translateY: filtersTranslateY }],
            opacity: filtersOpacity
          }
        ]}
      >
        <FilterButton 
          title="Todos los tipos"
          onPress={handleTypeFilter}
          isActive={selectedTypeFilter === "Todos los tipos"}
          style={styles.filterButton}
        />
        
        <FilterButton 
          title="Menor número"
          onPress={handleSortFilter}
          isActive={selectedSortFilter === "Menor número"}
          style={styles.filterButton}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    zIndex: 10,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 4,
  }
});

export default PokedexHeader;