import { StyleSheet, Text, View } from 'react-native';
import NavbarProps from './../interfaces/navbar_intefaces';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Navbar({ title }: NavbarProps) {
    return(
        <View style={styles.container}>
            <Text>{title}</Text>
            <Ionicons name="home" size={24} color="black" />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 100
    }
})