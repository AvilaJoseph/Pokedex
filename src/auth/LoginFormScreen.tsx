import {
    SafeAreaView,
    StyleSheet,
    Dimensions,
    View,
    Text,
    StatusBar,
    TextInput,
    PixelRatio
} from "react-native";
import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
} from '@expo-google-fonts/poppins';
import Button from "../components/Buttom";

const { width, height } = Dimensions.get('window');

// Función para hacer el texto responsivo basado en el tamaño de la pantalla
const normalizeFont = (size:number) => {
    const scale = width / 375; // 375 es el ancho base de diseño (iPhone X)
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Función para hacer paddings y margins responsivos
const normalizeSpace = (size:number) => {
    const scale = Math.min(width / 375, height / 812); // Considerar altura también
    return Math.round(size * scale);
};

export default function LoginFormScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFormFilled, setIsFormFilled] = useState(false);
    
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
    });

    useEffect(() => {
        // Check if both email and password fields are filled
        setIsFormFilled(email.trim() !== '' && password.trim() !== '');
    }, [email, password]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />

            <View style={styles.header}>
                <Navbar title='Crear Cuenta' />
            </View>

            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.subtitle}>Bienvenido de vuelta!</Text>
                    <Text style={styles.title}>Completa los datos</Text>
                </View>
                
                <View style={styles.formContainer}>
                    <Text style={styles.inputLabel}>E-mail</Text>
                    <TextInput
                        style={[
                            styles.input, 
                            email.trim() !== '' && styles.filledInput
                        ]}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Ingresa tu E-mail"
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text style={styles.inputLabel}>Contraseña</Text>
                    <TextInput
                        style={[
                            styles.input, 
                            password.trim() !== '' && styles.filledInput
                        ]}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Ingresa tu Contraseña"
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />
                    <Text style={styles.ForgetPassword}>¿Olvidé Contraseña?</Text>
                </View>
                
                {/* Spacer with minimum height to ensure good spacing */}
                <View style={[styles.spacer, { minHeight: normalizeSpace(80) }]} />
                
                {/* Button at the bottom */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Iniciar Sesión"
                        onPress={() => {}}
                        backgroundColor={isFormFilled ? "#173EA5" : "#E6E6E6"}
                        textColor={isFormFilled ? "white" : "#999999"}
                        borderColor={isFormFilled ? "#2B5CD6" : "transparent"}
                        borderWidth={1}
                    />
                </View>
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
    content: {
        flex: 1,
        paddingHorizontal: normalizeSpace(24),
        paddingBottom: normalizeSpace(24),
        display: 'flex',
        flexDirection: 'column',
    },
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
        fontSize: normalizeFont(22),
        color: '#888888',
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
    ForgetPassword:{
        fontFamily: 'Poppins_500Medium',
        fontSize: normalizeFont(16),
        color: '#173EA5',
        marginTop: normalizeSpace(25),
        textAlign: 'center',
    },
    spacer: {
        flex: 1,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: normalizeSpace(20),
    }
});