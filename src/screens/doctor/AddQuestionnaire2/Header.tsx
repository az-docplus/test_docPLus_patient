import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { hp, wp } from '../../../components/Scalling'
import { Colors } from '../../../styles/colorsV3'
import { Fonts } from '../../../styles/Fonts'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Header = (props) => {
    const {
        back,
        left,
        title,
        right,
        navigation,
        containerStyle
    } = props
    const onBackPress = () => navigation.goBack()
    return (
        <View style={
            containerStyle ?
                { ...containerStyle, ...Style.headerContainer }
                : Style.headerContainer}
        >
            <View style={Style.leftContainer}>
                {
                    back ?
                        <TouchableOpacity style={Style.backContainer} activeOpacity={0.5}
                            onPress={onBackPress}
                        >
                            <AntDesign name='left' size={wp(7)} color={Colors.black} />
                            {/* <Text style={Style.backText}>Back</Text> */}
                        </TouchableOpacity>
                        :
                        left
                }
            </View>
            <View style={Style.centerContainer}>
                <Text style={Style.titleText}>{title}</Text>
                <Image source={require('../../../assets/png/caticon.png')} style={Style.centerIcon}
                    resizeMode='contain'
                />
            </View>
            <View style={Style.rightContainer}>
                {right}
            </View>
        </View>
    )
}

export default Header

const Style = StyleSheet.create({
    headerContainer: {
        width: wp(100),
        paddingVertical: hp(2),
        backgroundColor: Colors.color3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftContainer: {
        paddingHorizontal: wp(4),
        minWidth: wp(30),
        justifyContent: 'center'
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        minWidth: wp(40)
    },
    rightContainer: {
        paddingHorizontal: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: wp(30)
    },
    backContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backText: {
        fontSize: wp(5.5),
        fontFamily: Fonts.regular.en,
        color: Colors.black
    },
    titleText: {
        fontSize: wp(5.5),
        fontFamily: Fonts.semi_bold.en,
        color: Colors.black
    },
    centerIcon: {
        width: wp(5),
        height: hp(3),
        marginLeft: wp(2),
        marginTop: hp(0.5)
    }
})
