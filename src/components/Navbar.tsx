import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Dimensions } from 'react-native';
import NavbarProps from './../interfaces/navbar_intefaces';
import Ionicons from '@expo/vector-icons/Ionicons';

// Get screen dimensions for responsive sizing
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Navbar({ title = "" }: NavbarProps) {
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
                    {/* Empty view to balance the layout */}
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
        fontWeight: '600',
        color: '#333',
    },
})