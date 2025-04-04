import { StyleSheet, Text, View } from 'react-native';
import Navbar from '../components/Navbar';


export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Navbar title='Hola'></Navbar>
            <Text>Holaaaa</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
});