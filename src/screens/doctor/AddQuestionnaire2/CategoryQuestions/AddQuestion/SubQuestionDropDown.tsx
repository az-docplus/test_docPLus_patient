import React, { createRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { wp, hp } from '../../../../../components/Scalling'
import { Colors } from '../../../../../styles/colorsV3'
import { Fonts } from '../../../../../styles/Fonts'
import { Animation } from '../../../../../animations'



const SubQuestionDropDown = (props) => {

    const {
        questionsList = []
    } = props
    var subQusDropDownRef: any = createRef()
    const [visible, setVisible] = useState(false)
    const [dropDownLayout, setDropDownLayout] = useState<any>('')

    const [dropDownItems] = useState(questionsList)
    const [activeItem, setActiveItem] = useState<any>({ item: {}, index: null })
    const closeDropDown = () => setVisible(false)
    const openDropDown = () => {
        if(subQusDropDownRef) {
            subQusDropDownRef.current.measure((x, y, width, height, pagex, pagey) => {
                setDropDownLayout({ pageX: pagex, pageY: pagey })
            })
        }
        setVisible(true)
    }

    const onItemPress = (item, index) => {
        setActiveItem({ item, index })
        props.onPress(item)
        setVisible(false)
    }


    const renderList = ({ item, index }) => {
        return (
            <TouchableOpacity style={Style.itemContainer}
                onPress={onItemPress.bind(null, item, index)}
            >
                <Text style={Style.itemQuestionNo}>
                    Q{index + 1} -
                </Text>
                <Text style={Style.itemQuestionText}>
                    {item.title}
                </Text>
            </TouchableOpacity>

        )
    }

    const renderHeader = () => {
        return (
            dropDownItems.length === 0 ?
                <Text style={Style.listHeader}>No question found</Text>
                :
                <Text style={Style.listHeader}>Go to Question</Text>
        )
    }


    return (
        <View style={{ ...Style.container, ...Style.shadow }}
            ref={subQusDropDownRef}
        >

            <TouchableOpacity style={Style.outerButtonDropDown}
                onPress={openDropDown}
            >
                <Text style={Style.outerButtonDropDownText}>
                    {
                        activeItem.index !== null ?
                            `Go to Q${activeItem.index + 1}`
                            :
                            'Add Sub-Question'
                    }
                </Text>
                <AntDesign name='caretdown' size={wp(3.5)} color={Colors.color18} />
            </TouchableOpacity>



            <Modal animationType='fade'
                visible={visible}
                transparent={true}
                onDismiss={closeDropDown}
                onRequestClose={closeDropDown}
            >
                {
                    dropDownLayout.length !== 0 &&
                    <TouchableOpacity style={Style.dropDownModal} activeOpacity={1} onPress={closeDropDown}>

                        <TouchableOpacity style={{
                            ...Style.dropDownContainer, ...Style.shadow,
                            top: dropDownLayout.length !== 0 ? dropDownLayout.pageY + hp(4) : null,
                            left: dropDownLayout.length !== 0 ? dropDownLayout.pageX : null
                        }}
                            activeOpacity={1}
                        >
                            <Animation animation='fadeInDown' duration={200} >
                                <FlatList
                                    data={dropDownItems}
                                    renderItem={renderList}
                                    keyExtractor={(item: any) => item._id}
                                    ListHeaderComponent={renderHeader}
                                    style={{ maxHeight: hp(27) }}
                                />
                            </Animation>
                        </TouchableOpacity>

                    </TouchableOpacity>

                }
            </Modal>


        </View>
    )
}

export default SubQuestionDropDown

const Style = StyleSheet.create({
    container: {
        marginVertical: hp(3)
    },
    outerButtonDropDown: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    outerButtonDropDownText: {
        fontSize: wp(4),
        color: Colors.color18,
        marginRight: wp(3),
    },
    dropDownModal: {
        flex: 1,
    },
    dropDownContainer: {
        borderWidth: 0.5,
        backgroundColor: Colors.color14,
        borderColor: Colors.color15,
        width: wp(66),
        borderRadius: 10,
        paddingVertical: hp(1),
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    listHeader: {
        marginVertical: hp(1),
        fontSize: wp(4.5),
        color: Colors.color19,
        fontFamily: Fonts.semi_bold.en,
        paddingHorizontal: wp(3),
    },
    itemContainer: {
        marginVertical: hp(1),
        paddingHorizontal: wp(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemQuestionNo: {
        fontSize: wp(4.2),
        color: Colors.color18,
    },
    itemQuestionText: {
        fontSize: wp(4.2),
        color: Colors.color18,
        width: wp(50),
    }

})
