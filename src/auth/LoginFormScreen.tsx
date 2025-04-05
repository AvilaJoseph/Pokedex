import {
    SafeAreaView,
    StyleSheet,
    Dimensions,
    View,
    Text,
    StatusBar,
    TextInput
} from "react-native";
import { useState } from 'react';
import Navbar from "../components/Navbar";
import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
} from '@expo-google-fonts/poppins';

const { width, height } = Dimensions.get('window');

export default function LoginFormScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
    });

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
                    <Text style={styles.title}>Bienvenido de vuelta!</Text>
                    <Text style={styles.subtitle}>Completa los datos</Text>
                </View>
                
                <View style={styles.formContainer}>
                    <Text style={styles.inputLabel}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Ingresa tu E-mail"
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text style={styles.inputLabel}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Ingresa tu Contraseña"
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        secureTextEntry={true}
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
        paddingHorizontal: 20,
        height: 60,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    titleContainer: {
        marginTop: height * 0.058,
        marginBottom: height * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 22,
        color: '#000000',
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 22,
        color: '#888888',
    },
    formContainer: {
        width: '100%',
    },
    inputLabel: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: '#000000',
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        width: '100%',
        height: 56,
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#333333',
    },
});