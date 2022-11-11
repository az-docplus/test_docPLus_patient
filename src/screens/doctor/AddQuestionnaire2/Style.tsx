import { StyleSheet } from 'react-native'
import { hp, wp } from '../../../components/Scalling'
import { Colors } from '../../../styles/colorsV3'
import { Fonts } from '../../../styles/Fonts'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color3,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: wp(6),
    },
    addCategoryBtnContainer: {
        alignItems: 'center',
        marginVertical: hp(2)
    },
    addCategoryImage: {
        width: wp(100),
        height: hp(17),
        marginBottom: hp(-2)
    },
    addCategoryBtn: {
        borderWidth: 0,
        width: wp(80),
        height: hp(11),
        top: hp(1.2),
        borderRadius: 16,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: wp(3)
    },
    addCategoryBtnText: {
        fontSize: wp(4.35),
        marginLeft:5,
        color: Colors.color13,
        fontFamily: Fonts.semi_bold.en
    }
})