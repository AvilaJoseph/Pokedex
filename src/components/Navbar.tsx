import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Dimensions } from 'react-native';
import NavbarProps from './../interfaces/navbar_intefaces';
import Ionicons from '@expo/vector-icons/Ionicons';

import { 
    useFonts,
    Poppins_400Regular,
    Poppins_600SemiBold 
} from '@expo-google-fonts/poppins';

// Get screen dimensions for responsive sizing
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Navbar({ title = "" }: NavbarProps) {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
    });

    if (!fontsLoaded) {
        return null; // or a simple loading view
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.leftSection}>
                    <Ionicons name='chevron-back-outline' size={SCREEN_WIDTH * 0.06} color="#333" />
                </View>
                <View style={styles.centerSection}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <View style={styles.rightSection}>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        marginTop: SCREEN_WIDTH * 0.05, // Responsive margin based on screen width
        width: '100%',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SCREEN_WIDTH * 0.04, // Responsive padding
        paddingHorizontal: SCREEN_WIDTH * 0.06, // Responsive horizontal padding
        height: SCREEN_WIDTH * 0.15, // Responsive height
        maxHeight: 70, // Maximum height cap
    },
    leftSection: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerSection: {
        flex: 3,
        alignItems: 'center',
    },
    rightSection: {
        flex: 1, // Keeping this to maintain balance
        alignItems: 'flex-end',
    },
    titleText: {
        fontSize: Math.max(16, SCREEN_WIDTH * 0.045), // Responsive font size with minimum
        fontFamily: 'Poppins_600SemiBold', // Changed from fontWeight to fontFamily
        color: '#333',
    },
})