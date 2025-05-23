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

export default function RegisterSucessfull() {
    return (
        <View style={styles.container}>
            {/* Fondo blanco */}
            <View style={styles.whiteBackground} />
            
            {/* Capa con el checkmark */}
            <Image
                source={require('./../../../assets/img/banner/Path.png')}
                style={styles.backgroundCheckmark}
                resizeMode="contain"
            />
            
            {/* Contenido principal */}
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('./../../../assets/img/banner/registerSucessfull.png')}
                            style={styles.characterImage}
                            resizeMode="contain"
                        />
                    </View>
                    
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>¡Su cuenta ha sido creada exitosamente!</Text>
                        <Text style={styles.subtitle}>¡Bienvenido, entrenador! Estamos emocionados de seguir su viaje.</Text>
                    </View>
                    
                    <View style={styles.buttonsContainer}>
                        <Button
                            title="Continuar"
                            onPress={() => { }}
                            backgroundColor="#173EA5"
                            textColor="white"
                        />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    whiteBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    safeArea: {
        flex: 1,
    },
    backgroundCheckmark: {
        position: 'absolute',
        width: '100%',
        height: width * 1.2,
        top: 0,
        left: 0,
        zIndex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: normalizeSpace(20),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: normalizeSpace(20),
        paddingBottom: normalizeSpace(24),
        zIndex: 2,
    },
    imageContainer: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalizeSpace(20),
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