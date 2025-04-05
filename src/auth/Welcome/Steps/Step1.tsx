import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    PixelRatio
} from 'react-native';
import Button from '../../../components/Buttom';

const { width } = Dimensions.get('window');

// Normalization functions for responsiveness
const normalizeFont = (size: number) => {
    const scale = width / 375;
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const normalizeSpace = (size: number) => {
    const scale = Math.min(width / 375, Dimensions.get('window').height / 812);
    return Math.round(size * scale);
};

interface Step1Props {
    onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ onNext }) => {
    return (
        <View style={styles.stepContent}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('./../../../../assets/img/banner/login.png')}
                    style={styles.characterImage}
                    resizeMode="contain"
                />
            </View>
            
            <View style={styles.textContainer}>
                <Text style={styles.title}>Todos los Pokémon en un solo lugar</Text>
                <Text style={styles.subtitle}>Accede a una amplia lista de Pokémon de todas las generaciones creada por Nintendo</Text>
            </View>
            
            <View style={styles.paginationContainer}>
                <View style={[styles.paginationDot, styles.activeDot]} />
                <View style={styles.paginationDot} />
            </View>
            
            <View style={styles.buttonsContainer}>
                <Button
                    title="Continuar"
                    onPress={onNext}
                    backgroundColor="#173EA5"
                    textColor="white"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    stepContent: {
        flex: 1,
        paddingHorizontal: normalizeSpace(24),
        display: 'flex',
        flexDirection: 'column',
        paddingTop: normalizeSpace(20),
        paddingBottom: normalizeSpace(24),
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalizeSpace(20),
        marginBottom: normalizeSpace(20),
    },
    characterImage: {
        width: width * 0.5,
        height: width * 0.9,
    },
    textContainer: {
        alignItems: 'center',
        paddingVertical: normalizeSpace(10),
    },
    title: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: normalizeFont(22),
        textAlign: 'center',
        marginBottom: normalizeSpace(16),
        color: '#000000',
    },
    subtitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: normalizeFont(16),
        color: '#666666',
        textAlign: 'center',
        paddingHorizontal: normalizeSpace(10),
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: normalizeSpace(24),
    },
    paginationDot: {
        width: normalizeSpace(8),
        height: normalizeSpace(8),
        borderRadius: normalizeSpace(4),
        backgroundColor: '#E6E6E6',
        marginHorizontal: normalizeSpace(4),
    },
    activeDot: {
        backgroundColor: '#173EA5',
        width: normalizeSpace(24),
    },
    buttonsContainer: {
        width: '100%',
        marginBottom: normalizeSpace(16),
    },
});

export default Step1;