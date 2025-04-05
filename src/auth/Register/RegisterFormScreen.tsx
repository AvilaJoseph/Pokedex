import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Dimensions,
    View,
    StatusBar,
    PixelRatio
} from "react-native";
import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
} from '@expo-google-fonts/poppins';
import Navbar from "../../components/Navbar";
import EmailStep from './Steps/Email';
import PasswordStep from './Steps/PasswordStep';
import UsernameStep from './Steps/UsernameStep';

const { width, height } = Dimensions.get('window');

const normalizeSpace = (size: number) => {
    const scale = Math.min(width / 375, height / 812);
    return Math.round(size * scale);
};

export default function RegisterFormScreen() {
    // Estados para los campos del formulario
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    
    // Estado para controlar el paso actual del formulario
    const [currentStep, setCurrentStep] = useState<number>(1);
    
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
    });

    const handleNextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            // Formulario completado - enviar datos o navegar
            console.log('Formulario completado:', { email, password, username });
            // Aquí podrías llamar a tu API de registro o navegar a otra pantalla
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (!fontsLoaded) {
        return null;
    }

    // Renderizar el componente correspondiente al paso actual
    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <EmailStep 
                        email={email} 
                        setEmail={setEmail} 
                        onNext={handleNextStep} 
                    />
                );
            case 2:
                return (
                    <PasswordStep 
                        password={password} 
                        setPassword={setPassword} 
                        onNext={handleNextStep} 
                        onBack={handlePreviousStep} 
                    />
                );
            case 3:
                return (
                    <UsernameStep 
                        username={username} 
                        setUsername={setUsername} 
                        onNext={handleNextStep} 
                        onBack={handlePreviousStep} 
                    />
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />

            <View style={styles.header}>
                <Navbar title='Crear Cuenta' />
            </View>

            <View style={styles.content}>
                <View style={styles.stepsIndicator}>
                    <View style={[styles.stepDot, currentStep >= 1 && styles.activeStepDot]} />
                    <View style={styles.stepLine} />
                    <View style={[styles.stepDot, currentStep >= 2 && styles.activeStepDot]} />
                    <View style={styles.stepLine} />
                    <View style={[styles.stepDot, currentStep >= 3 && styles.activeStepDot]} />
                </View>

                {renderCurrentStep()}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: normalizeSpace(20),
        height: normalizeSpace(60),
    },
    stepsIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalizeSpace(20),
    },
    stepDot: {
        width: normalizeSpace(12),
        height: normalizeSpace(12),
        borderRadius: normalizeSpace(6),
        backgroundColor: '#E6E6E6',
    },
    activeStepDot: {
        backgroundColor: '#173EA5',
    },
    stepLine: {
        width: normalizeSpace(40),
        height: normalizeSpace(2),
        backgroundColor: '#E6E6E6',
        marginHorizontal: normalizeSpace(4),
    },
    content: {
        flex: 1,
        paddingHorizontal: normalizeSpace(24),
        paddingBottom: normalizeSpace(24),
        display: 'flex',
        flexDirection: 'column',
    }
});