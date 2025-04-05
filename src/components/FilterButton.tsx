import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle 
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface FilterButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  isActive?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  title,
  onPress,
  style,
  isActive = false
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, style, isActive && styles.activeContainer]} 
      onPress={onPress}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>
        {title}
      </Text>
      <AntDesign 
        name="down" 
        size={12} 
        color={isActive ? "white" : "#333"}
        style={styles.icon} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C3E50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
  },
  activeContainer: {
    backgroundColor: '#1E293B',
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
  activeText: {
    fontFamily: 'Poppins_600SemiBold',
  },
  icon: {
    marginLeft: 8,
  }
});

export default FilterButton;