import React from 'react';

import HeaderTitle from "@/src/component/shared/header/HeaderTitle";
import HeaderFilter from "@/src/component/shared/header/HeaderFilter";
import {StyleSheet, View} from "react-native";

export default function Header(){

    return(
        <View style={styles.header}>
            <HeaderTitle title={"Mes conversations"}/>
            <HeaderFilter></HeaderFilter>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#ffffff",
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
})