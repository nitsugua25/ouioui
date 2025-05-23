import React, {useState} from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

import Sidebar from "@/src/component/sidebar/Sidebar";
import Header from "@/src/component/header/Header";
import Conversation from "@/src/component/conversation/Conversation";

type RootStackParamList = {
    Index: undefined; // No parameters for the Index screen
    Login: undefined; // No parameters for the Login screen
    ConversationDetail: { id: string };
}
export default function Index() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false)
    const [isEditorVisible, setEditorVisible] = useState(false);
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    }

    // sample test
    const conversations = [
        {
            id: "1",
            title: "Meeting about Q3 projections",
            responsable: "AMIC",
            date: "2023-09-15",
            lastInteraction: "-",
            contact: "GDER",
            category: ["Société", "Jardin", "Garage"],
        },
        {
            id: "2",
            title: "New project kickoff",
            responsable: "CDEP",
            date: "2023-09-20",
            lastInteraction: "Admin",
            contact: "GDER",
            category: ["Société", "Jardin", "Garage"],
        },
        {
            id: "3",
            title: "Budget approval",
            responsable: "ARUC",
            date: "2023-09-25",
            lastInteraction: "root",
            contact: "FBLO",
            category: ["Société", "Jardin", "Garage"],
        }
    ];

    return (
        <View style={styles.container}>
            {sidebarVisible ? (
                <View style={styles.sidebarContainer}>
                    <Sidebar />
                </View>
            ) : null}

            <TouchableOpacity
                style={[
                    styles.toggleButton,
                    sidebarVisible && { left: '65%' } // or however wide your insideSidebar is
                ]}
                onPress={toggleSidebar}
            >
                <Ionicons name={sidebarVisible ? 'close' : 'menu'} size={28} color="black" />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
                <Header />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.conversationList}>
                        {conversations.map(conversation => (
                            <Conversation
                                key={conversation.id}
                                id={conversation.id}
                                title={conversation.title}
                                responsable={conversation.responsable}
                                date={conversation.date}
                                category={conversation.category}
                            />
                        ))}
                        <TouchableOpacity style={styles.addTextButton} onPress={() => setEditorVisible(true)}>
                            <Text style={styles.addTextButtonText}>+ Add Conversation</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    sidebarContainer: {
        width: '60%', // adjustable
        borderRightWidth: 1,
        borderRightColor: '#e0e0e0',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60, // Pushes content down so button doesn’t overlap
    },
    conversationList: {
        flex: 1,
        width: '100%',
    },
    toggleButton: {
        position: 'absolute',
        top: 115,
        left: 20,
        zIndex: 1,
        backgroundColor: '#ffffff',
        padding: 8,
        borderRadius: 20,
        elevation: 3,
    },
    addTextButton: {
        backgroundColor: '#34a853',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignSelf: 'center',
    },
    addTextButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
