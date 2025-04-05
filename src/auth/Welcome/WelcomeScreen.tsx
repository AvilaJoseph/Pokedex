import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Animated } from 'react-native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins';

import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const handleNext = () => {
    setCurrentStep(1);
  };

  const handleFinish = () => {
    console.log('Onboarding completed');
    // Aquí puedes navegar a la siguiente pantalla o realizar otra acción
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {currentStep === 0 ? (
        <Step1 onNext={handleNext} />
      ) : (
        <Step2 onFinish={handleFinish} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});