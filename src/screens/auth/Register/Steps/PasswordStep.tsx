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
import { PasswordStepProps } from '../../../interfaces/steps-register/PasswordStepProps';

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

const PasswordStep: React.FC<PasswordStepProps> = ({ password, setPassword, onNext, onBack }) => {
    const isValid = password.trim().length >= 6;
    
    return (
        <>
            <View style={styles.titleContainer}>
                <Text style={styles.subtitle}>Paso 2 de 3</Text>
                <Text style={styles.title}>Crea tu contraseña</Text>
            </View>
            
            <View style={styles.formContainer}>
                <Text style={styles.inputLabel}>Contraseña</Text>
                <TextInput
                    style={[styles.input, password.trim() !== '' && styles.filledInput]}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Crea tu contraseña"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
                <Text style={styles.helperText}>
                    La contraseña debe tener al menos 6 caracteres
                </Text>
            </View>
            
            <View style={styles.spacer} />
            
            <View style={styles.buttonContainer}>
                <Button
                    title="Atrás"
                    onPress={onBack}
                    backgroundColor="transparent"
                    textColor="#173EA5"
                    borderColor="#173EA5"
                    borderWidth={1}
                    style={styles.backButton}
                />
                <Button
                    title="Continuar"
                    onPress={onNext}
                    backgroundColor={isValid ? "#173EA5" : "#E6E6E6"}
                    textColor={isValid ? "white" : "#999999"}
                    borderColor={isValid ? "#2B5CD6" : "transparent"}
                    borderWidth={1}
                    style={styles.nextButton}
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
    helperText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: normalizeFont(14),
        color: '#888888',
        marginTop: normalizeSpace(8),
    },
    spacer: {
        flex: 1,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: normalizeSpace(20),
        flexDirection: 'row',
    },
    backButton: {
        flex: 1,
        marginRight: normalizeSpace(8),
    },
    nextButton: {
        flex: 2,
        marginLeft: normalizeSpace(8),
    }
});

export default PasswordStep;