import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { SubQuestionDropDown } from '.'
import { hp, wp } from '../../../../../components/Scalling'
import { Colors } from '../../../../../styles/colorsV3'

const ShortLongAnswer = (props) => {
    const [input, setInput] = useState('')
    const {
        question = 'short',
        questionsList = [],
        onSubQuestionPress
    } = props

    const onChangeText = (text) => {
        setInput(text)
        props.onChangeText(text)
    }
    return (
        <View style={Style.container}>
            <TextInput
                value={input}
                onChangeText={onChangeText}
                style={Style.input}
                placeholder={question === 'short' ? 'Short answer text' : 'Long answer text'}
                placeholderTextColor={Colors.color6}
                multiline
            />
            <SubQuestionDropDown
                questionsList={questionsList}
                onPress={onSubQuestionPress}
            />
        </View>
    )
}

export default ShortLongAnswer

const Style = StyleSheet.create({
    container: {
        paddingVertical: hp(2),
        borderWidth: 0
    },
    input: {
        borderBottomWidth: 1,
        fontSize: wp(4.3),
        paddingVertical: hp(1),
        textAlignVertical: 'top',
        maxHeight: hp(25)
    }
})