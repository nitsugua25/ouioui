import React from "react";
import { Text, StyleSheet } from "react-native";

interface HeaderTitleProps {
    title: string;
}

export default function HeaderTitle({ title }: HeaderTitleProps) {
    return (
        <Text style={styles.title}>{title}</Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "600",
        color: "#60cad8"
    }
})