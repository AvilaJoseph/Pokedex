import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    PixelRatio
} from "react-native";
import Button from "./../../../components/Buttom";
import { EmailStepProps } from '../../../interfaces/steps-register/EmailStepProps';

const { width, height } = Dimensions.get('window');

const normalizeFont = (size:number) => {
    const scale = width / 375;
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const normalizeSpace = (size:number) => {
    const scale = Math.min(width / 375, height / 812);
    return Math.round(size * scale);
};

const EmailStep: React.FC<EmailStepProps> = ({ email, setEmail, onNext }) => {
    const isValid = email.trim() !== '' && /\S+@\S+\.\S+/.test(email);
    
    return (
        <>
            <View style={styles.titleContainer}>
                <Text style={styles.subtitle}>Paso 1 de 3</Text>
                <Text style={styles.title}>Ingresa tu email</Text>
            </View>
            
            <View style={styles.formContainer}>
                <Text style={styles.inputLabel}>E-mail</Text>
                <TextInput
                    style={[styles.input, email.trim() !== '' && styles.filledInput]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Ingresa tu E-mail"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
            </View>
            
            <View style={styles.spacer} />
            
            <View style={styles.buttonContainer}>
                <Button
                    title="Continuar"
                    onPress={onNext}
                    backgroundColor={isValid ? "#173EA5" : "#E6E6E6"}
                    textColor={isValid ? "white" : "#999999"}
                    borderColor={isValid ? "#2B5CD6" : "transparent"}
                    borderWidth={1}
                    disabled={!isValid}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: normalizeSpace(40),
        marginBottom: normalizeSpace(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: normalizeFont(22),
        color: '#000000',
        marginBottom: normalizeSpace(8),
    },
    subtitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: normalizeFont(16),
        color: '#888888',
        marginBottom: normalizeSpace(4),
    },
    formContainer: {
        width: '100%',
    },
    inputLabel: {
        fontFamily: 'Poppins_400Regular',
        fontSize: normalizeFont(16),
        color: '#000000',
        marginBottom: normalizeSpace(8),
        marginTop: normalizeSpace(16),
    },
    input: {
        width: '100%',
        height: normalizeSpace(56),
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: normalizeSpace(12),
        paddingHorizontal: normalizeSpace(16),
        fontSize: normalizeFont(16),
        fontFamily: 'Poppins_400Regular',
        color: '#333333',
    },
    filledInput: {
        borderColor: '#000000',
    },
    spacer: {
        flex: 1,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: normalizeSpace(20),
        flexDirection: 'row',
    }
});

export default EmailStep;