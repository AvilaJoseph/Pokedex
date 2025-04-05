import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Dimensions,
    StatusBar
} from 'react-native';

import Navbar from '../components/Navbar';

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
} from '@expo-google-fonts/poppins';

import Button from '../components/Buttom';
import GoogleIcon from '../../assets/img/icons/GoogleIcon';
import AppleIcon from '../../assets/img/icons/AppleIcon';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen() {
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
                <Navbar title='Crear Cuenta'/>
            </View>

            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('./../../assets/img/banner/register.png')}
                        style={styles.characterImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Falta poco para explorar este mundo!</Text>
                        <Text style={styles.subtitle}>Como deseas conectarte?</Text>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <Button
                            title="Continuar con Apple"
                            onPress={() => { }}
                            backgroundColor="white"
                            textColor="#333"
                            icon={<AppleIcon size={20} />}
                            borderColor="#E1E1E1"
                        />

                        <Button
                            title="Continuar con Google"
                            onPress={() => { }}
                            backgroundColor="white"
                            textColor="#333"
                            icon={<GoogleIcon size={20} />}
                            borderColor="#E1E1E1"
                        />

                        <Button
                            title="Continuar con un e-mail"
                            onPress={() => { }}
                            backgroundColor="#173EA5"
                            textColor="white"
                        />
                    </View>
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
        paddingHorizontal: 32,
        justifyContent: 'space-between',
    },
    imageContainer: {
        height: height * 0.45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    characterImage: {
        width: width * 0.5,
        height: width * 0.5,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: height * 0.03,
    },
    title: {
        fontFamily: 'Poppins_500Medium',
        fontSize: Math.min(28, width * 0.07),
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: Math.min(18, width * 0.045),
        color: '#666666',
        textAlign: 'center',
    },
    buttonsContainer: {
        width: '100%',
        marginBottom: height * 0.05,
    },
});