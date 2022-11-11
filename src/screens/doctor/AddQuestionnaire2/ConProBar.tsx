import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../../../styles/colorsV3'
import { hp, wp } from '../../../components/Scalling'
import { Fonts } from '../../../styles/Fonts'

const ConProBar = (props) => {
    const [activeButton, setActiveButton] = useState('Conditions')

    const onConditionPress = () => {
        setActiveButton('Conditions')
        props.activeButton('Conditions')
    }
    const onProceduresPress = () => {
        setActiveButton('Procedures')
        props.activeButton('Procedures')
    }

    return (
        <View style={Style.container}>
            <TouchableOpacity style={
                activeButton === 'Conditions' ? { ...Style.barButton, ...Style.shadow }
                    : { ...Style.barButton, backgroundColor: 'transparent' }}
                onPress={onConditionPress}
                activeOpacity={0.6}
            >
                <Text style={activeButton === 'Conditions' ? { ...Style.barButtonText }
                    : { ...Style.barButtonTextTwo }}>Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={activeButton === 'Procedures' ? { ...Style.barButton, ...Style.shadow }
                : { ...Style.barButton, backgroundColor: 'transparent' }}
                onPress={onProceduresPress}
                activeOpacity={0.6}
            >
                <Text style={activeButton === 'Procedures' ? { ...Style.barButtonText }
                    : { ...Style.barButtonTextTwo }}>Procedures</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ConProBar

const Style = StyleSheet.create({
    container: {
        marginVertical: hp(3),
        backgroundColor: Colors.color4,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(1.3),
        paddingVertical: hp(0.8)
    },
    barButton: {
        paddingVertical: hp(1.5),
        borderRadius: 8,
        backgroundColor: Colors.white,
        width: wp(42),
        alignItems: 'center',
        justifyContent: 'center'
    },
    barButtonText: {
        fontSize: wp(4),
        fontFamily: Fonts.bold.en,
        color: Colors.color1
    },
    shadow: {
        shadowColor: Colors.color5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    barButtonTextTwo: {
        fontSize: wp(4),
        fontFamily: Fonts.regular.en,
        color: Colors.color6
    }
})