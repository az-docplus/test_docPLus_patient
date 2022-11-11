import React, { useState, createRef, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native'
import { wp, hp } from '../../../../../components/Scalling'
import { Colors } from '../../../../../styles/colorsV3'
import { Fonts } from '../../../../../styles/Fonts'
import { Animation } from '../../../../../animations'
import AntDesign from 'react-native-vector-icons/AntDesign'


const LinearScale = (props: any) => {
    var linDropDownRef: any = createRef()
    const [dropDownList, setDropDownList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const [start, setStart] = useState(dropDownList[0])
    const [end, setEnd] = useState(dropDownList[4])
    const [startLabel, setStartLabel] = useState('')
    const [endLabel, setEndLabel] = useState('')
    const [dropDownVisible, setDropDownVisible] = useState(false)
    const [dropDownLayout, setDropDownLayout] = useState<any>('')
    const [activeList, setActiveList] = useState('')


    useEffect(() => {
        const data = {
            start: start,
            end: end,
            startLabel: startLabel,
            endLabel: endLabel,
        }
        props.linearScaleList(data)
    }, [start, end, startLabel, endLabel])


    const closeDropDown = () => setDropDownVisible(false)
    const openDropDown = (item) => {
        if(linDropDownRef.current) {
            linDropDownRef.current.measure((x, y, width, height, pagex, pagey) => {
                setDropDownLayout({ pageX: pagex, pageY: pagey })
            })
            setActiveList(item)
            setDropDownVisible(true)
        }

    }

    const onChangeStartLabel = (text) => {
        setStartLabel(text)
    }
    const onChangeEndLabel = (text) => {
        setEndLabel(text)
    }


    const onItemPress = (item) => {
        activeList === 'start' ? setStart(item) : setEnd(item)
        setDropDownVisible(false)
    }
    const renderList = ({ item }) => {
        return (
            <TouchableOpacity style={Style.itemContainer}
                onPress={onItemPress.bind(null, item)}
            >
                <Text style={Style.itemText}>{item}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={Style.container}>
            <View style={Style.dropDownOuterContainer}
                ref={linDropDownRef}
            >
                <TouchableOpacity style={Style.dropDownButtonOuter}
                    onPress={openDropDown.bind(null, 'start')}
                >
                    <Text style={Style.dropDownOuterText}>{start}</Text>
                    <AntDesign name='caretdown' size={wp(3.5)} color={Colors.color18} />
                </TouchableOpacity>
                <Text style={Style.to}>to</Text>
                <TouchableOpacity style={Style.dropDownButtonOuter}
                    onPress={openDropDown.bind(null, 'end')}
                >
                    <Text style={Style.dropDownOuterText}>{end}</Text>
                    <AntDesign name='caretdown' size={wp(3.5)} color={Colors.color18} />
                </TouchableOpacity>
            </View>
            <View style={Style.inputContainer}>
                <Text style={Style.inputNo}>{start}</Text>
                <TextInput
                    style={Style.input}
                    placeholder='Label (optional)'
                    onChangeText={onChangeStartLabel}
                />
            </View>

            <View style={Style.inputContainer}>
                <Text style={Style.inputNo}>{end}</Text>
                <TextInput
                    style={Style.input}
                    placeholder='Label (optional)'
                    onChangeText={onChangeEndLabel}
                />
            </View>

            <Modal
                animationType='fade'
                visible={dropDownVisible}
                transparent={true}
                onDismiss={closeDropDown}
                onRequestClose={closeDropDown}
            >
                {
                    dropDownLayout.length !== 0 &&
                    <TouchableOpacity style={Style.dropDownModal} activeOpacity={1} onPress={closeDropDown}>

                        <TouchableOpacity style={{
                            ...Style.dropDownContainer, ...Style.shadow,
                            top: dropDownLayout.length !== 0 ? dropDownLayout.pageY + hp(5.5) : null,
                            left: dropDownLayout.length !== 0 ?
                                activeList === 'end' ? dropDownLayout.pageX + wp(30) : dropDownLayout.pageX
                                : null
                        }}
                            activeOpacity={1}
                        >
                            <Animation animation='fadeInDown' duration={200} >
                                <FlatList
                                    data={dropDownList}
                                    renderItem={renderList}
                                    keyExtractor={(item: any) => item.toString()}
                                    style={{ maxHeight: hp(36) }}
                                />
                            </Animation>
                        </TouchableOpacity>

                    </TouchableOpacity>

                }
            </Modal>


        </View>
    )
}

export default LinearScale

const Style = StyleSheet.create({
    container: {
        paddingVertical: hp(3),
    },
    dropDownOuterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: wp(45),
        paddingVertical: hp(1),
        paddingHorizontal: wp(3),
        borderWidth: 1,
        borderColor: Colors.white
    },

    dropDownContainer: {
        backgroundColor: Colors.white,
        width: wp(15),
    },
    dropDownButtonOuter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropDownOuterText: {
        fontSize: wp(4.5),
        color: Colors.black,
        marginRight: wp(3),
        fontFamily: Fonts.semi_bold.en
    },
    to: {
        fontSize: wp(4.5),
        color: Colors.black,
        fontFamily: Fonts.regular.hi
    },
    dropDownModal: {
        flex: 1,
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
    itemContainer: {
        borderWidth: 0,
        alignItems: 'center',
        paddingVertical: hp(1)
    },
    itemText: {
        color: Colors.black,
        fontSize: wp(4.2),
        fontFamily: Fonts.semi_bold.en
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(1)
    },
    inputNo: {
        fontSize: wp(4),
        color: Colors.color6,
        fontFamily: Fonts.regular.en
    },
    input: {
        borderBottomWidth: 1,
        width: wp(60),
        marginLeft: wp(3),
        paddingVertical: hp(1),
        fontSize: wp(4),
        color: Colors.color8,
        fontFamily: Fonts.regular.en
    }
})
