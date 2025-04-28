import { View, Text, Button, StyleSheet } from 'react-native';
import {useAuth} from "@/context/AuthContext";

export default function HomeScreen() {
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Home 🎉</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 32, marginBottom: 20, textAlign: 'center' },
});