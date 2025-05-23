import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Define the route param types
type ConversationDetailRouteParams = {
    ConversationDetail: {
        id: string;
    };
};

// Define a conversation type with all required fields
interface ConversationDetail {
    id: string;
    title: string;
    responsable: string;
    lastInteraction: string;
    date: string;
    contact: string;
    category: string[];
    messages?: Message[];
}

interface Message {
    id: string;
    sender: string;
    timestamp: string;
    content: string;
    isRead: boolean;
}

export default function ConversationDetail() {
    const route = useRoute<RouteProp<ConversationDetailRouteParams, 'ConversationDetail'>>();
    const navigation = useNavigation();
    const { id } = route.params;
    const [conversation, setConversation] = useState<ConversationDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call to fetch conversation details
        const fetchConversation = async () => {
            setLoading(true);

            // Mock data - in a real app this would come from your API
            setTimeout(() => {
                const mockConversation: ConversationDetail = {
                    id: id,
                    title: "Discussion regarding project updates",
                    responsable: "AMIC",
                    date: "2023-09-15",
                    lastInteraction: new Date().toISOString().split('T')[0],
                    contact: "GDER",
                    category: ["Société", "Jardin", "Garage"],
                    messages: [
                        {
                            id: "1",
                            sender: "GDER",
                            timestamp: "2023-09-15 09:30",
                            content: "Hello team,\n\nI wanted to discuss the latest updates on our project. We need to address several key points before moving forward with implementation.\n\nPlease review the attached documents and let me know your thoughts.\n\nRegards,\nGDER",
                            isRead: true
                        },
                        {
                            id: "2",
                            sender: "AMIC",
                            timestamp: "2023-09-15 10:45",
                            content: "Hi GDER,\n\nThank you for bringing this up. I've reviewed the documents and have a few concerns about the timeline.\n\nCould we schedule a meeting to discuss this further?\n\nBest,\nAMIC",
                            isRead: true
                        },
                        {
                            id: "3",
                            sender: "FGOD",
                            timestamp: "2023-09-15 11:20",
                            content: "I agree with AMIC. The current timeline seems too aggressive given our resources. Let's discuss alternatives during our next meeting.\n\nFGOD",
                            isRead: true
                        },
                        {
                            id: "4",
                            sender: "GDER",
                            timestamp: "2023-09-16 08:15",
                            content: "I've scheduled a meeting for tomorrow at 10 AM. Please prepare your suggestions for a revised timeline.\n\nGDER",
                            isRead: false
                        }
                    ]
                };

                setConversation(mockConversation);
                setLoading(false);
            }, 500);
        };

        fetchConversation();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading conversation...</Text>
            </View>
        );
    }

    if (!conversation) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Conversation not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Email-like header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#1a73e8" />
                </TouchableOpacity>

                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="archive-outline" size={22} color="#555" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="trash-outline" size={22} color="#555" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="mail-outline" size={22} color="#555" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="ellipsis-vertical" size={22} color="#555" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Subject line */}
            <View style={styles.subjectContainer}>
                <Text style={styles.subjectText}>{conversation.title}</Text>
            </View>

            {/* Categories */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
                <View style={styles.categoriesContainer}>
                    {conversation.category.map((cat, index) => (
                        <View key={index} style={styles.categoryBadge}>
                            <Text style={styles.categoryText}>{cat}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Message thread */}
            <ScrollView style={styles.messageContainer}>
                <View style={styles.metadataContainer}>
                    <View style={styles.participantsContainer}>
                        <Text style={styles.participantsLabel}>From: </Text>
                        <Text style={styles.participantsValue}>{conversation.contact}</Text>
                    </View>
                    <View style={styles.participantsContainer}>
                        <Text style={styles.participantsLabel}>To: </Text>
                        <Text style={styles.participantsValue}>{conversation.responsable}</Text>
                    </View>
                    <View style={styles.participantsContainer}>
                        <Text style={styles.participantsLabel}>Date: </Text>
                        <Text style={styles.participantsValue}>{conversation.date}</Text>
                    </View>
                </View>

                {conversation.messages?.map((message, index) => (
                    <View key={message.id} style={styles.messageItem}>
                        <View style={styles.messageHeader}>
                            <View style={styles.senderContainer}>
                                <View style={styles.avatarContainer}>
                                    <Text style={styles.avatarText}>{message.sender.charAt(0)}</Text>
                                </View>
                                <Text style={styles.senderName}>{message.sender}</Text>
                            </View>
                            <Text style={styles.messageTime}>{message.timestamp}</Text>
                        </View>

                        <Text style={styles.messageContent}>{message.content}</Text>

                        <View style={styles.messageActions}>
                            <TouchableOpacity style={styles.replyButton}>
                                <Ionicons name="arrow-undo-outline" size={18} color="#1a73e8" />
                                <Text style={styles.replyText}>Reply</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.forwardButton}>
                                <Ionicons name="arrow-forward-outline" size={18} color="#1a73e8" />
                                <Text style={styles.replyText}>Forward</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Reply composer */}
            <View style={styles.replyComposer}>
                <TouchableOpacity style={styles.composerButton}>
                    <Ionicons name="create-outline" size={22} color="#1a73e8" />
                    <Text style={styles.composerText}>Reply to all</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: '#d32f2f',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        elevation: 2,
    },
    backButton: {
        padding: 8,
    },
    headerActions: {
        flexDirection: 'row',
    },
    iconButton: {
        padding: 8,
        marginLeft: 8,
    },
    subjectContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    subjectText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#202124',
    },
    categoriesScroll: {
        maxHeight: 50,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    categoriesContainer: {
        flexDirection: 'row',
        padding: 8,
    },
    categoryBadge: {
        backgroundColor: '#e8f0fe',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginRight: 8,
        marginBottom: 4,
    },
    categoryText: {
        fontSize: 13,
        color: '#1a73e8',
    },
    messageContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    metadataContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    participantsContainer: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    participantsLabel: {
        width: 50,
        color: '#5f6368',
        fontSize: 14,
    },
    participantsValue: {
        fontSize: 14,
        color: '#202124',
        flex: 1,
    },
    messageItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    senderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#1a73e8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    senderName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#202124',
    },
    messageTime: {
        fontSize: 12,
        color: '#5f6368',
    },
    messageContent: {
        fontSize: 14,
        lineHeight: 20,
        color: '#202124',
    },
    messageActions: {
        flexDirection: 'row',
        marginTop: 16,
    },
    replyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    forwardButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    replyText: {
        color: '#1a73e8',
        fontSize: 14,
        marginLeft: 4,
    },
    replyComposer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    composerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    composerText: {
        color: '#1a73e8',
        fontWeight: '500',
        marginLeft: 8,
    }
});
