import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Section {
    name: string;
    items: string[];
}

export default function Sidebar(): React.ReactElement {
    const [expandedSections, setExpandedSections] = useState<string[]>([]);

    const toggleSection = (section: string) => {
        setExpandedSections((prev) =>
            prev.includes(section)
                ? prev.filter((item) => item !== section)
                : [...prev, section]
        );
    };

    const renderSection = (section: Section) => {
        return (
            <View style={styles.section} key={section.name}>
                <TouchableOpacity onPress={() => toggleSection(section.name)}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{section.name}</Text>
                        <Ionicons
                            name={expandedSections.includes(section.name) ? 'chevron-up' : 'chevron-down'}
                            size={20}
                            color="gray"
                        />
                    </View>
                </TouchableOpacity>

                {expandedSections.includes(section.name) && (
                    <FlatList
                        data={section.items}
                        renderItem={({ item }) => (
                            <Text style={styles.item}>{item}</Text>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>
        );
    };

    const data: Section[] = [
        {
            name: 'Conversations',
            items: ['By ID', 'By Contact', 'By Date'],
        },
        {
            name: 'Connect',
            items: ['Teams', 'Calendar'],
        },
    ];

    return (
        <View style={styles.container}>
            {data.map((section) => renderSection(section))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#201b54',
        paddingTop: 20,
    },
    section: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#201b54',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#201b54',

    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f2fcff',
        backgroundColor: '#201b54'
    },
    item: {
        padding: 10,
        fontSize: 16,
        color: '#ffffff',
        backgroundColor: '#292079',
    },
});