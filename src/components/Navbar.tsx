import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import NavbarProps from './../interfaces/navbar_intefaces';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Navbar({ title }: NavbarProps) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Ionicons name="home" size={24} color="black" />
                <Text>{title}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        justifyContent: 'space-between',
    },
})