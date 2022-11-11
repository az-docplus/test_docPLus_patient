import React, { useState, useReducer, createRef } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import { hp, wp } from '../../../../../components/Scalling'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../../../../styles/colorsV3'
import { Fonts } from '../../../../../styles/Fonts'


const CheckBoxList = (props) => {
    var flatListRef: any = createRef()
    const [input, setInput] = useState({ text: '', index: null })
    const [checkBoxList, setCheckBoxList] = useState([])
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const updateData = (checkBoxList) => {
        props.checkBoxList(checkBoxList)
    }

    const onAddOtherPress = () => {
        if(input.text.length !== 0) {
            onInputSubmit(input.index)
        }
        if(checkBoxList.length !== 0 && checkBoxList[checkBoxList.length - 1].text.length === 0) {
            Alert.alert("Can't add new option because previous is empty")
        }
        else {
            var item = {
                id: checkBoxList.length + 1, text: ''
                // check: false 
            }
            checkBoxList.push(item)
            setCheckBoxList(checkBoxList)
            setInput({ index: item.id, text: item.text })
            forceUpdate()
        }

    }

    const onInputClosePress = (index) => {
        checkBoxList.splice(index, 1)
        setCheckBoxList(checkBoxList)
        forceUpdate()
        updateData(checkBoxList)
    }

    const onInputSubmit = (index) => {
        if(input.text.length !== 0) {
            checkBoxList[index].text = input.text
            // checkBoxList[index].check = true
            setCheckBoxList(checkBoxList)
            setInput({ text: '', index: null })
            forceUpdate()
            updateData(checkBoxList)
        }
        else {
            onInputClosePress(index)
        }
    }

    const onChangeText = (index, text) => setInput({ text: text, index: index })
    const onInputFocus = (item, index) => {
        setInput({ index: index, text: item.text })
    }

    const onCheckPress = (index, item) => {
        // checkBoxList[index].check = !item.check
        setCheckBoxList(checkBoxList)
        forceUpdate()
        updateData(checkBoxList)
    }

    const renderCheckBox = ({ item, index }) => {
        return (
            <View style={Style.listItemContainer} >
                <TouchableOpacity onPress={onCheckPress.bind(null, index, item)}>
                    <Image source={require('../../../../../assets/png/unCheck.png')}
                        resizeMode='contain'
                        style={Style.checkImage}
                    />
                    {/* {
                        item.check ?
                            <View style={Style.checkBoxView}>
                                <Entypo name='check' size={wp(5.5)} color={Colors.color12} />
                            </View>
                            : null
                    } */}
                </TouchableOpacity>
                <View style={Style.inputContainer}>
                    {
                        <TextInput
                            style={{ ...Style.input, borderBottomWidth: input.index === index ? 1 : 0 }}
                            onFocus={onInputFocus.bind(null, item, index)}
                            onSubmitEditing={onInputSubmit.bind(null, index, item)}
                            value={input.index === index ? input.text : item.text}
                            onChangeText={onChangeText.bind(null, index)}
                            autoFocus
                        />
                    }
                    <AntDesign name='close' size={wp(6)} color={Colors.color8}
                        onPress={onInputClosePress.bind(null, index)}
                    />
                </View>
            </View>
        )
    }

    const RenderListFooter = () => {
        return (
            <TouchableOpacity style={Style.listItemContainer}
                onPress={onAddOtherPress}
                activeOpacity={1}
            >
                <Image source={require('../../../../../assets/png/unCheck.png')}
                    style={Style.checkImage}
                    resizeMode='contain'
                />

                <Text style={Style.addOptionButton}>Add option
                    <Text style={{ ...Style.addOptionButton, color: Colors.black }}> or </Text>
                    <Text style={{ ...Style.addOptionButton, color: Colors.color10 }}>add "Other"</Text>
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={Style.container}>
            <FlatList
                data={checkBoxList}
                renderItem={renderCheckBox}
                keyExtractor={(item: any) => item.id.toString()}
                style={Style.listContainer}
                ref={ref => flatListRef = ref}
                onContentSizeChange={() => flatListRef.scrollToEnd({ animated: true })}
                onLayout={() => flatListRef.scrollToEnd({ animated: true })}
            />
            <RenderListFooter />
        </View>
    )
}

export default CheckBoxList


const Style = StyleSheet.create({
    container: {
        borderWidth: 0,
        paddingBottom: hp(2.4)
    },
    listContainer: {
        borderWidth: 0,
        marginVertical: hp(2),
        maxHeight: hp(30)
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(1.5)
    },
    checkImage: {
        width: wp(7),
        height: hp(4.4),
    },
    checkBoxView: {
        position: 'absolute',
        width: wp(7),
        height: hp(4.4),
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addOptionButton: {
        fontSize: wp(4.5),
        marginLeft: wp(3),
        color: Colors.color6,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: wp(58),
        paddingLeft: wp(2.5)
    },
    input: {
        width: wp(48),
        fontSize: wp(4),
        fontFamily: Fonts.regular.en,
        color: Colors.black,
    }
})