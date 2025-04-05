import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity
} from 'react-native';
import Navbar from '../components/Navbar';

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium, // Added Medium
    Poppins_600SemiBold
} from '@expo-google-fonts/poppins';
import Button from '../components/Buttom';
import GoogleIcon from '../../assets/img/icons/GoogleIcon';
import AppleIcon from '../../assets/img/icons/AppleIcon';

export default function LoginScreen() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium, // Added Medium
        Poppins_600SemiBold,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Navbar title='Login' />
            <View style={styles.content}>
                <Image
                    source={require('./../../assets/img/banner/login.png')}
                    style={styles.bannerImage}
                />

                <Text style={styles.title}>Que bueno verte aqui nuevamente!</Text>
                <Text style={styles.subtitle}>Como deseas conectarte?</Text>

                <View style={styles.buttonsContainer}>
                    <Button
                        title="Continuar con Apple"
                        onPress={() => { }}
                        backgroundColor="white"
                        textColor="#333"
                        icon={<AppleIcon size={22} />}
                        borderColor="#E1E1E1"
                    />
                    <Button
                        title="Continuar con Google"
                        onPress={() => { }}
                        backgroundColor="white"
                        textColor="#333"
                        icon={<GoogleIcon size={22} />}
                        borderColor="#E1E1E1"
                    />
                    <Button
                        title="Continuar con un Email"
                        onPress={() => { }}
                        backgroundColor="#173EA5"
                        textColor="white"
                        borderColor="#173EA5"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
        paddingHorizontal: 30,
    },
    bannerImage: {
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontFamily: 'Poppins_500Medium', // Medium weight
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 30,
    },
    buttonsContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        borderRadius: 25,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E1E1E1',
    },
    buttonText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 20,
        color: '#333',
    },
    icon: {
        width: 22,
        height: 22,
        marginRight: 10,
    },
    emailButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2B5CD6',
        width: '100%',
        height: 50,
        borderRadius: 25,
        marginBottom: 15,
    },
    emailButtonText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: 'white',
    }
});