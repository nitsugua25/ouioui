import React, {useState} from "react";
import { Text, View, Button, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import {NavigationProp, useNavigation} from "@react-navigation/native";

// Define the type for your navigation routes
type RootStackParamList = {
    Index: undefined; // No parameters for the Home screen
    Login: undefined; // No parameters for the Login screen
};

export default function Login() {
    // State for email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Use the typed navigation
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate("Index")}
            >
                <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            <Button title="Go to Home" onPress={() => navigation.navigate("Index")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
    },
    inputContainer: {
        width: "100%",
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontWeight: "500",
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
    },
    loginButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#3498db",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginVertical: 20,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    }
});