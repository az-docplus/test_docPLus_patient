import React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { hp, wp } from '../../../../../components/Scalling'
import { Colors } from '../../../../../styles/colorsV3'
import { Fonts } from '../../../../../styles/Fonts'


const radio = require('../../../../../assets/png/radio.png')
const MultipleChoiceList = (props) => {
    const {
        multipleChoiceListData = []
    } = props

    const renderMultipleChoice = ({ item }) => {
        return (
            <View style={Style.listItemContainer} >
                <Image source={radio}
                    style={Style.radioImage}
                    resizeMode='contain'
                />
                <Text style={Style.itemLabel}>{item.text}</Text>
            </View>
        )
    }
    return (
        <View style={Style.container}>
            <FlatList
                data={multipleChoiceListData}
                renderItem={renderMultipleChoice}
                keyExtractor={(item: any) => item._id.toString()}
                style={Style.listContainer}
            />
        </View>
    )
}
export default MultipleChoiceList

const Style = StyleSheet.create({
    container: {
        borderWidth: 0,
        paddingBottom: hp(2.4)
    },
    listContainer: {
        borderWidth: 0,
        marginVertical: hp(2),
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(6)
    },
    radioImage: {
        width: wp(10),
        height: hp(6),
        marginTop: hp(1),
        marginRight: wp(-3)
    },
    itemLabel: {
        maxWidth: wp(60),
        marginLeft: wp(3),
        fontSize: wp(4),
        color: Colors.black,
        fontFamily: Fonts.regular.en
    }
})