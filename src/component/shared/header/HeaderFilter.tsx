import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';

// Define filter options
const filterOptions = [
    { id: '1', label: 'All Conversations' },
    { id: '2', label: 'Unread' },
    { id: '3', label: 'Société' },
    { id: '4', label: 'Jardin' },
    { id: '5', label: 'Garage' },
    { id: '6', label: 'Recent' },
];

export default function HeaderFilter() {
    const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelectFilter = (filter) => {
        setSelectedFilter(filter);
        setModalVisible(false);
        // You would typically trigger a filter function here
        // onFilterChange(filter.id);
    };

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.selectedFilterText}>{selectedFilter.label}</Text>
                <Ionicons name="chevron-down" size={16} color="#1a73e8" />
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={filterOptions}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.filterOption,
                                        selectedFilter.id === item.id && styles.selectedOption
                                    ]}
                                    onPress={() => handleSelectFilter(item)}
                                >
                                    <Text
                                        style={[
                                            styles.filterOptionText,
                                            selectedFilter.id === item.id && styles.selectedOptionText
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                    {selectedFilter.id === item.id && (
                                        <Ionicons name="checkmark" size={16} color="#1a73e8" />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>

            <View style={styles.additionalFilters}>
                <TouchableOpacity style={styles.iconFilter}>
                    <Ionicons name="funnel-outline" size={20} color="#555" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconFilter}>
                    <Ionicons name="search-outline" size={20} color="#555" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f3f4',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    selectedFilterText: {
        fontSize: 14,
        marginRight: 4,
        color: '#1a73e8',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        maxHeight: '60%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 4,
        elevation: 5,
    },
    filterOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    filterOptionText: {
        fontSize: 16,
        color: '#202124',
    },
    selectedOption: {
        backgroundColor: '#f1f8ff',
    },
    selectedOptionText: {
        color: '#1a73e8',
        fontWeight: '500',
    },
    additionalFilters: {
        flexDirection: 'row',
    },
    iconFilter: {
        padding: 8,
        marginLeft: 8,
    },
});