import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { hp, wp } from '../../../../../components/Scalling'
import { Colors } from '../../../../../styles/colorsV3'

// {"__v": 0, "_id": "61ddd6b6ba7c4109747ee857", "category": "61d5a6c140c0cc2eec704e20", "createdAt": "2022-01-11T19:12:54.554Z", "disabled": false, "option": [{"_id": "61ddd6b6ba7c4109747ee858", "linkedQuestion": [Array], "text": "Short answer text"}], "optionText": "", "root": true, "specialty": "", "superQuestion": false, "title": "This is short question ", "type": "ShortAnswer", "updatedAt": "2022-01-11T19:12:54.554Z"}

const ShortLongAnswer = (props) => {
    const {
        ShortLongAnswer = []
    } = props
    return (
        <View style={Style.container}>
            <TextInput
                placeholder='Answer text'
                placeholderTextColor={Colors.color22}
                style={Style.input}
            />
        </View>
    )
}

export default ShortLongAnswer

const Style = StyleSheet.create({
    container: {
        paddingBottom: hp(2.4)
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.color23,
        marginHorizontal: wp(7),
        paddingHorizontal: wp(3),
        color: Colors.color22,
        fontSize: wp(3.9)

    }
})
