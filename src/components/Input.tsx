import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Función para calcular tamaños de texto responsivos
const responsiveFontSize = (size:number) => {
  return Math.min(size, size * (width / 375));
};

const InputField = (props:any) => {
  const { 
    label, 
    value, 
    onChangeText, 
    placeholder, 
    keyboardType, 
    secureTextEntry, 
    autoCapitalize,
    rightIcon,
    style 
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[
        styles.inputContainer,
        isFocused ? styles.inputContainerFocused : {}
      ]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType || "default"}
          secureTextEntry={secureTextEntry || false}
          autoCapitalize={autoCapitalize || "none"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {rightIcon}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: width * 0.04,
  },
  label: {
    fontFamily: 'Poppins_500Medium',
    fontSize: responsiveFontSize(18),
    color: '#000',
    marginBottom: width * 0.02,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999999', // Color gris cuando no está enfocado
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: width * 0.03,
    height: width * 0.14,
  },
  inputContainerFocused: {
    borderColor: '#1A1A1A', // Color azul cuando está enfocado
    borderWidth: 2,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins_400Regular',
    fontSize: responsiveFontSize(18),
    color: '#000',
    height: '100%',
  }
});

export default InputField;