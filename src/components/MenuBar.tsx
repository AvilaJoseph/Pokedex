import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// Remove SafeAreaContext dependency

interface MenuBarProps {
  activeScreen: string;
  onScreenChange?: (screenName: string) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ activeScreen = 'PokedexScreen', onScreenChange }) => {

  // Menu items configuration
  const menuItems = [
    {
      id: 'pokedex',
      icon: require('../../assets/img/icons/MenuBar/Inactive/pokeball-inactive.png'), // Replace with your actual icon paths
      activeIcon: require('../../assets/img/icons/MenuBar/Active/pokeball-active.png'),
      label: 'Pokedéx',
      screen: 'PokedexScreen',
    },
    {
      id: 'search',
      icon: require('../../assets/img/icons/MenuBar/Inactive/PokePin-inactive.png'), // Replace with your actual icon paths
      activeIcon: require('../../assets/img/icons/MenuBar/Active/location-active.png'),
      label: '',
      screen: 'SearchScreen',
    },
    {
      id: 'favorites',
      icon: require('../../assets/img/icons/MenuBar/Inactive/PokeHeart-inactive.png'), // Replace with your actual icon paths
      activeIcon: require('../../assets/img/icons/MenuBar/Active/hearth-active.png'),
      label: '',
      screen: 'FavoritesScreen',
    },
    {
      id: 'profile',
      icon: require('../../assets/img/icons/MenuBar/Inactive/group-inactive.png'), // Replace with your actual icon paths
      activeIcon: require('../../assets/img/icons/MenuBar/Active/user-active.png'),
      label: '',
      screen: 'ProfileScreen',
    },
  ];

  const handlePress = (screenName: string) => {
    if (onScreenChange) {
      onScreenChange(screenName);
    }
  };

  return (
    <View style={styles.container}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItem}
          onPress={() => handlePress(item.screen)}
        >
          {item.id === 'pokedex' ? (
            <View style={styles.logoContainer}>
              <Image
                source={activeScreen === item.screen ? item.activeIcon : item.icon}
                style={styles.logoImage}
              />
              <Text 
                style={[
                  styles.logoText, 
                  activeScreen === item.screen && styles.activeLogoText
                ]}
              >
                Pokedéx
              </Text>
            </View>
          ) : (
            <Image
              source={activeScreen === item.screen ? item.activeIcon : item.icon}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    paddingBottom: 20, // Add some padding at the bottom
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logoText: {
    marginTop: 4,
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: 'bold',
  },
  activeLogoText: {
    color: '#3B5BA7',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default MenuBar;