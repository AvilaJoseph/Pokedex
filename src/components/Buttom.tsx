import { TouchableOpacity, Text, StyleSheet, View, Image, StyleProp, TextStyle, ViewStyle, ImageStyle, TouchableOpacityProps, ImageSourcePropType } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import React, { ReactNode } from 'react';
import { ButtonProps } from '../interfaces/buttom.interfaces';

export default function Button({ 
  title, 
  onPress, 
  style, 
  textStyle,
  icon,
  iconStyle,
  backgroundColor = '#2B5CD6',
  textColor = 'white',
  borderColor = null,
  borderWidth = 0,
  iconPosition = 'left',
  disabled = false,
  ...rest
}: ButtonProps) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Determine border styling
  const borderStyle = borderColor ? {
    borderWidth: borderWidth || 1,
    borderColor: borderColor
  } : {};

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor }, 
        borderStyle,
        disabled && styles.disabledButton,
        style
      ]} 
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      {/* First content based on iconPosition */}
      {icon && iconPosition === 'left' && (
        <View style={styles.iconContainer}>
          {React.isValidElement(icon) ? (
            icon
          ) : typeof icon === 'number' || (typeof icon === 'object' && 'uri' in icon) ? (
            <Image source={icon as ImageSourcePropType} style={[styles.icon, iconStyle]} />
          ) : null}
        </View>
      )}
      
      {/* Button text */}
      <Text style={[
        styles.buttonText, 
        { color: textColor },
        disabled && styles.disabledText,
        textStyle
      ]}>
        {title}
      </Text>
      
      {/* Second content based on iconPosition */}
      {icon && iconPosition === 'right' && (
        <View style={[styles.iconContainer, styles.iconRight]}>
          {React.isValidElement(icon) ? (
            icon
          ) : typeof icon === 'number' || (typeof icon === 'object' && 'uri' in icon) ? (
            <Image source={icon as ImageSourcePropType} style={[styles.icon, iconStyle]} />
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderRadius: 25,
    marginBottom: 15,
  },
  buttonText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
  },
  iconContainer: {
    marginRight: 10,
  },
  iconRight: {
    marginRight: 0,
    marginLeft: 10,
  },
  icon: {
    width: 22,
    height: 22,
  },
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.8,
  }
});