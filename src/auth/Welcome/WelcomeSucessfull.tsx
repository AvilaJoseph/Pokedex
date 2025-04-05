import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Dimensions,
    PixelRatio
} from 'react-native';
import Button from '../../components/Buttom';

const { width, height } = Dimensions.get('window');

// Normalization functions for responsiveness
const normalizeFont = (size:number) => {
    const scale = width / 375;
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const normalizeSpace = (size:number) => {
    const scale = Math.min(width / 375, height / 812);
    return Math.round(size * scale);
};

export default function WelcomeSucessfull() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('./../../../assets/img/banner/Welcome/welcome.png')}
                        style={styles.characterImage}
                        resizeMode="contain"
                    />
                </View>
                
                <View style={styles.textContainer}>
                    <Text style={styles.title}>¿Estás preparado para esta aventura?</Text>
                    <Text style={styles.subtitle}>¡Simplemente crea una cuenta y comienza a explorar el mundo de Pokémon hoy mismo!</Text>
                </View>
                
                <View style={styles.buttonsContainer}>
                    <Button
                        title="Crear una cuenta"
                        onPress={() => { }}
                        backgroundColor="#173EA5"
                        textColor="white"
                    />
                    <Button
                        title="Ya tengo una cuenta"
                        onPress={() => { }}
                        backgroundColor="white"
                        textColor="black"
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
    content: {
        flex: 1,
        paddingHorizontal: normalizeSpace(24),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: normalizeSpace(20),
        paddingBottom: normalizeSpace(24),
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalizeSpace(40),
    },
    characterImage: {
        width: width * 0.9,
        height: width * 0.8,
    },
    textContainer: {
        alignItems: 'center',
        paddingVertical: normalizeSpace(10),
    },
    title: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: normalizeFont(22),
        textAlign: 'center',
        marginBottom: normalizeSpace(8),
    },
    subtitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: normalizeFont(16),
        color: '#666666',
        textAlign: 'center',
        paddingVertical: normalizeSpace(8),
        paddingHorizontal: normalizeSpace(10),
    },
    buttonsContainer: {
        width: '100%',
        marginBottom: normalizeSpace(16),
        marginTop: normalizeSpace(20),
    },
});