import React, { useContext, useState } from "react";
import {
    StyleSheet,
    TextInput,
    View,
    Image
} from "react-native";
import { Colors } from "../utils/Colors";


const SearchComponent = ({ title, icon, width, height, numberOfLines, bgHeight }) => {
    return (
        <View style={[styles.searchContainer, { height: bgHeight }]}>
            <TextInput
                style={styles.searchInput}
                onChangeText={(text) => { }}
                placeholder={title ? title : "Search by doctor name or location"}
                placeholderTextColor={Colors.ICONCOLOR}
                numberOfLines={numberOfLines ? numberOfLines : 1}
                multiline={true}
            />
            <Image
                source={icon ? icon : require("../../assets/mail-filter.png")}
                style={[styles.singleIcon, { width: width ? width : 28, height: height ? height : 28 }]}
            />
        </View>
    );
};

export default SearchComponent;

const styles = StyleSheet.create({
    searchInput: {
        backgroundColor: Colors.WHITE,
        color: "black", width: "100%", paddingLeft: 24,
        borderRadius: 10,
    },
    searchContainer: {
        flexDirection: 'row', alignItems: 'center', marginTop: 10,
        borderRadius: 10,
        elevation: 5, shadowColor: '#999', overflow: 'hidden',
    },
    singleIcon: {
        width: 28, height: 28, position: 'absolute',
        tintColor: Colors.BLACK, right: 20
    },
});