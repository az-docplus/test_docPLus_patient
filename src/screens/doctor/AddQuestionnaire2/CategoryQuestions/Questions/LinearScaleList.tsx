import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions, Image } from 'react-native'
import { hp, wp } from '../../../../../components/Scalling'
import { Colors } from '../../../../../styles/colorsV3'
import { Fonts } from '../../../../../styles/Fonts'
import Slider from "react-native-slider";


const { height, width } = Dimensions.get('window');
const itemWidth = (width - 15) / 2;
const thumbImage = require('../../../../../assets/png/sliderThumb.png')

const LinearScaleList = (props) => {
    const [range, setRange] = useState<any>('')
    const { linearScaleListData } = props
    const { start, end, startLabel, endLabel } = linearScaleListData[0]


    const listWidth = itemWidth / range.length + range.length - 1
    const sliderWith = itemWidth + wp(range.length) + (range.length > 8 ? wp(8) : 0)


    useEffect(() => {
        setRange(Array(end - start + 1).fill(null).map((_, idx) => start + idx))
    }, [])


    const renderRange = ({ item }) => {
        return (
            <View style={{
                ...Style.itemContainer,
                width: listWidth,
            }}>
                <Text style={Style.itemText}>{item}</Text>
            </View>
        )
    }
    return (
        <View style={Style.container}>
            <FlatList
                data={range}
                renderItem={renderRange}
                key={'_'}
                keyExtractor={item => "_" + item}
                style={Style.listContainer}
            />
            <Slider
                style={{ width: sliderWith }}
                trackStyle={{ height: hp(1.6), borderRadius: 8 }}
                value={range.length / 2}
                minimumValue={0}
                maximumValue={range.length}
                minimumTrackTintColor={Colors.color20}
                maximumTrackTintColor={Colors.color21}
                thumbStyle={Style.thumbImage}
                thumbTintColor={Colors.white}
                // disabled
            />
            <View style={{ ...Style.sliderBelowLabelContainer, width: sliderWith }}>
                <Text style={Style.sliderBelowLabel}>{startLabel}</Text>
                <Text style={Style.sliderBelowLabel}>{endLabel}</Text>
            </View>

        </View>
    )
}

export default LinearScaleList

const Style = StyleSheet.create({
    container: {
        paddingBottom: hp(2.4),
        paddingHorizontal: wp(8)
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemContainer: {
        paddingVertical: hp(1),
        justifyContent: 'center',
    },
    itemText: {
        fontSize: wp(4.5),
        fontFamily: Fonts.semi_bold.en
    },
    thumbImage: {
        width: width * 0.08,
        height: width * 0.08 * 1,
        borderRadius: width * 0.08 * 1 / 2,
        borderWidth: 3,
        borderColor: Colors.color20
    },
    sliderBelowLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sliderBelowLabel: {
        fontSize: wp(4),
        color: Colors.black
    }
})
