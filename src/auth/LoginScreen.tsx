import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Navbar from '../components/Navbar';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Navbar title='Login' />
            <View style={styles.content}>
                <Text style={styles.text}>Holaaaa</Text>
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
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
    }
});