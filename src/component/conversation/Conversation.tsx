import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextStyle, Modal } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { WebView } from 'react-native-webview';

interface ConversationProps {
    id: string;
    title: string;
    responsable: string;
    lastInteraction: string;
    date: string;
    contact: string;
    category: string[];
}

type RootStackParamList = {
    ConversationDetail: { id: string };
};

export default function Conversation({
                                         id,
                                         title,
                                         responsable,
                                         lastInteraction,
                                         date,
                                         contact,
                                         category
                                     }: ConversationProps): React.ReactElement {
    const [expanded, setExpanded] = useState(false);
    const [isEditorVisible, setEditorVisible] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleOpen = () => {
        navigation.navigate('ConversationDetail', { id });
    };

    const dynamicStyles = StyleSheet.create({
        title: {
            marginBottom: expanded ? 8 : 0,
        } as TextStyle,
    });

    const quillHtml = `
<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Simple Test</title>
    </head>
    <body>
      <h1>Hello, World!</h1>
    </body>
  </html>
`;

    return (

        <>
            <TouchableOpacity
                style={styles.container}
                onPress={toggleExpand}
                activeOpacity={0.7}
            >
                {!expanded ? (
                    <View style={styles.collapsedView}>
                        <Text style={[styles.title, dynamicStyles.title]} numberOfLines={1}>{title}</Text>
                        <Text style={styles.responsable}>{responsable}</Text>
                    </View>
                ) : (
                    <View style={styles.expandedView}>
                        <Text style={[styles.title, dynamicStyles.title]}>{title}</Text>
                        <Text style={styles.infoText}><Text style={styles.label}>Responsable: </Text>{responsable}</Text>
                        <Text style={styles.infoText}><Text style={styles.label}>Contact: </Text>{contact}</Text>
                        <Text style={styles.infoText}><Text style={styles.label}>Last Interaction: </Text>{lastInteraction}</Text>
                        <Text style={styles.infoText}><Text style={styles.label}>Date: </Text>{date}</Text>

                        <View style={styles.categorySection}>
                            <Text style={styles.label}>Categories: </Text>
                            <View style={styles.categoryContainer}>
                                {category.map((cat, index) => (
                                    <View key={index} style={styles.categoryBadge}>
                                        <Text style={styles.categoryBadgeText}>{cat}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <TouchableOpacity style={styles.openButton} onPress={handleOpen}>
                            <Text style={styles.openButtonText}>OPEN</Text>
                        </TouchableOpacity>


                    </View>
                )}

            </TouchableOpacity>

            <Modal visible={isEditorVisible} animationType="slide">
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setEditorVisible(false)}>
                        <Text style={styles.openButtonText}>X</Text>
                    </TouchableOpacity>

                    <WebView
                        source={{ html: quillHtml }}
                        originWhitelist={['*']}
                        javaScriptEnabled
                        domStorageEnabled
                        style={{ flex: 1 }}
                        onMessage={(event) => {
                            console.log('Quill content:', event.nativeEvent.data);
                        }}
                    />
                </View>
            </Modal>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginVertical: 2,
        marginHorizontal: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    collapsedView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    expandedView: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    responsable: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
    },
    infoText: {
        fontSize: 14,
        marginBottom: 4,
    },
    categorySection: {
        marginTop: 8,
        marginBottom: 12,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
    },
    categoryBadge: {
        backgroundColor: '#e1f5fe',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 6,
        marginBottom: 6,
    },
    categoryBadgeText: {
        fontSize: 12,
        color: '#0288d1',
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
    },
    openButton: {
        backgroundColor: '#1a73e8',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignSelf: 'center',
        marginBottom: 10,
    },
    openButtonText: {
        color: 'white',
        fontWeight: 'bold',
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
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
        backgroundColor: '#000',
        borderRadius: 20,
        padding: 10,
    },
});
