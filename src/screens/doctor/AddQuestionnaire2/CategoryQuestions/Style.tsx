import { StyleSheet } from 'react-native'
import { hp, wp } from '../../../../components/Scalling'
import { Colors } from '../../../../styles/colorsV3'
import { Fonts } from '../../../../styles/Fonts'
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color3,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: wp(6),
    },
    catNameContainer: {
        marginVertical: hp(2.5),
        alignSelf: 'center',
        alignItems: 'center',

        paddingHorizontal: wp(10),
        paddingVertical: hp(2),
        backgroundColor: Colors.white,
        borderRadius: 18,

        shadowColor: Colors.color11,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 4,
    },
    catName: {
        fontSize: wp(4.5),
        textAlign: 'center',
        fontFamily: Fonts.semi_bold.en,
        color: Colors.color12,
        maxWidth: wp(40)
    },
    catNameQus: {
        fontSize: wp(3.8),
        color: Colors.color10,
        fontFamily: Fonts.regular.en,
        marginTop: hp(2)
    },
    addQuestionBtnContainer: {
        alignItems: 'center',
        marginVertical: hp(2)
    },
    addQuestionImage: {
        width: wp(100),
        height: hp(17),
        marginBottom: hp(-2)
    },
    addQuestionBtn: {
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
    addQuestionBtnText: {
        fontSize: wp(4.35),
        marginLeft:5,
        color: Colors.color13,
        fontFamily: Fonts.semi_bold.en
    },
    suggestedQuestionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(7),
        paddingVertical: hp(3)
    },
    suggestedText: {
        fontSize: wp(4),
        color: Colors.color13,
        fontFamily: Fonts.medium.en
    },
    disableAll: {
        fontSize: wp(4),
        color: Colors.color1,
        fontFamily: Fonts.medium.en
    },
    updateButton: {
        paddingVertical: hp(2),
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(65),
        borderRadius: 30,
        alignSelf: 'center'
    },
    updateText: {
        color: Colors.white,
        fontFamily: Fonts.semi_bold.en,
        fontSize: wp(4)
    }
})