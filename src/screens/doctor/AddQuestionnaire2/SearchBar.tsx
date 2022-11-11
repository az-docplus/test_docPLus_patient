import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import { hp, wp } from '../../../components/Scalling'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../../styles/colorsV3'
import { Fonts } from '../../../styles/Fonts'

const SearchBar = (props) => {
    const [searchText, setSearchText] = useState('')
    const onChangeSearchText = (text) => {
        setSearchText(text)
        props.onChangeText(text)
    }
    return (
        <View style={Style.container}>
            <Image source={require('../../../assets/png/searchBar.png')}
                resizeMode='stretch'
                style={Style.searchBarImage}
            />
            <View style={Style.searchBarContainer}>
                <AntDesign name='search1' color={Colors.color7} size={wp(6)} />
                <TextInput
                    style={Style.searchInput}
                    placeholder='Search'
                    placeholderTextColor={Colors.color6}
                    value={searchText}
                    onChangeText={onChangeSearchText}
                />
            </View>
        </View>
    )
}

export default SearchBar

const Style = StyleSheet.create({
    container: {
        marginVertical: hp(1)
    },
    searchBarImage: {
        width: wp(88),
        height: hp(7)
    },
    searchBarContainer: {
        position: 'absolute',
        width: wp(88),
        height: hp(7),
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: wp(5),
        paddingRight: wp(2)
    },
    searchInput: {
        width: wp(73),
        fontSize: wp(4.5),
        fontFamily: Fonts.medium.en
    }
})
