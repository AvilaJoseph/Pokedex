import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Dimensions,
    StatusBar,
    TouchableOpacity
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

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
                <Navbar  title='Crear cuenta'/>
            </View>

            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('./../../assets/img/banner/login.png')}
                        style={styles.characterImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Que bueno verte aqui nuevamente!</Text>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 60,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 24,
        fontWeight: '300',
    },
    headerTitle: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 18,
    },
    content: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    imageContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    characterImage: {
        width: width * 0.5,
        height: width * 0.5,
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
    buttonsContainer: {
        flex: 2,
        width: '100%',
        justifyContent: 'flex-end',
    },
});