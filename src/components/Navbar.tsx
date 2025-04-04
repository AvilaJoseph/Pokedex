import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar } from 'react-native';
import NavbarProps from './../interfaces/navbar_intefaces';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Navbar({ title = "home" }: NavbarProps) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.leftSection}>
                    <Ionicons name='home' size={24} color="#333" />
                </View>
                <View style={styles.centerSection}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <View style={styles.rightSection}>
                    {/* You can add additional icons here */}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        marginTop: 20,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingHorizontal:25,
        height: 60,
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
        flex: 1,
        alignItems: 'flex-end',
    },
    titleText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
})