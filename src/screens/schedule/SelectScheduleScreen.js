import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, FlatList, StyleSheet, Image, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Card } from 'react-native-paper';
import AwesomeButton from 'react-native-really-awesome-button';
import SearchComponent from '../../components/SearchComponent';
import { availableTimeSlots, dummyDaysData, listOfPatients } from '../../constants/dummyData';
import { Colors } from '../../utils/Colors';
import { windowHeight, windowWidth } from '../../utils/utils';
import CustomTextComponent from '../../components/CustomTextComponent';

export default function SelectScheduleScreen({ navigation }) {

    const [day, setDay] = useState("");
    const [selectedValue, setSelectedValue] = useState("");

    const renderDaysCardComponent = () => {
        return (
            <>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <BuildTitleComponent title="November 2021" />
                    <Image
                        source={require('../../../assets/arrow-down.png')}
                        style={{
                            width: 13, height: 13,
                            marginLeft: 5
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {
                        dummyDaysData.map((data, index) => {
                            return (
                                <BuildDaysCardComponent key={index}
                                    data={data} index={index}
                                    day={day} setDay={setDay}
                                />
                            );
                        })
                    }
                </View>
            </>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, marginBottom: 60 }}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={{ marginHorizontal: 12 }}>
                <FlatList
                    columnWrapperStyle={{
                        flex: 1,
                        justifyContent: 'space-evenly',
                    }}
                    numColumns={4}
                    data={availableTimeSlots}
                    keyExtractor={item => `${item.id}`}
                    keyboardDismissMode="on-drag"
                    itemC
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={{ marginHorizontal: 10 }}>
                            <SearchComponent bgHeight={0} />
                            {renderDaysCardComponent()}
                            <Text />
                            <BuildTitleComponent title="Available Time" />
                        </View>
                    }
                    renderItem={({ item, index }) => {
                        return (
                            <Card key={index} style={{
                                elevation: 6, shadowColor: Colors.SILVER, marginTop: 16, borderRadius: 10
                            }}>
                                <AwesomeButton
                                    backgroundColor={day === item.time ? Colors.GREEN : Colors.WHITE}
                                    backgroundShadow={day === item.time ? Colors.GREEN2 : Colors.WHITE}
                                    activeOpacity={0.5} elevation={8} height={40} width={windowWidth / 4 - 18}
                                    backgroundDarker={day === item.time ? Colors.GREEN2 : Colors.WHITE}
                                    borderRadius={8} onPress={() => { setDay(item.time) }} raiseLevel={2.5}
                                >
                                    <Text style={{
                                        color: day === item.time ? Colors.WHITE : Colors.GREEN,
                                        marginTop: 4, fontFamily: 'Montserrat-Regular',
                                    }}>
                                        {item.time}
                                    </Text>
                                </AwesomeButton>
                            </Card>
                        );
                    }}
                    ListFooterComponent={
                        <View style={{ marginVertical: 30, paddingHorizontal: 10 }}>
                            <BuildTitleComponent title="Patient Details" color={Colors.BLUE2} />
                            <BuildPatientDetailsDropdown
                                selectedValue={selectedValue}
                                setSelectedValue={setSelectedValue}
                            />
                            <View style={{ height: 16 }} />
                            <Text style={{
                                fontSize: 15, fontWeight: '600', marginVertical: 10,
                                fontFamily: 'Montserrat-Regular', color: '#000',
                            }}>
                                Write your problem
                            </Text>
                            <Card style={styles.inputCardStyle}>
                                <TextInput
                                    style={styles.textareaInputStyle}
                                    onChangeText={(text) => { }}
                                    placeholder={"Write your problem"}
                                    placeholderTextColor={Colors.ICONCOLOR}
                                    numberOfLines={4} multiline={true}
                                />
                            </Card>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                                <AwesomeButton
                                    width={240} height={52} backgroundShadow={"#368edd"}
                                    backgroundColor={Colors.BLUE2} borderRadius={100}
                                    activeOpacity={0.5} backgroundDarker={"#3d7fba"}
                                    onPress={() => { }} raiseLevel={2.5}
                                >
                                    <CustomTextComponent
                                        text={"Book Appointment"} fs={16} fw={"normal"} textColor={"#fff"}
                                    />
                                </AwesomeButton>
                            </View>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    )
}


const BuildDaysCardComponent = ({ data, index, day, setDay }) => {
    return (
        <Card key={index} style={[styles.daysCardContainerStyle, {
            backgroundColor: day === data.name ? Colors.GREEN : Colors.WHITE
        }]}>
            <AwesomeButton
                backgroundColor={day === data.name ? Colors.GREEN : Colors.WHITE}
                backgroundShadow={day === data.name ? Colors.GREEN2 : Colors.WHITE}
                activeOpacity={0.5} width={50} elevation={8}
                backgroundDarker={day === data.name ? Colors.GREEN2 : Colors.WHITE}
                borderRadius={8} onPress={() => { setDay(data.name) }}
            >
                <View style={{ flexDirection: 'column' }}>
                    <Text style={[styles.daysCardNumberStyle, {
                        color: day === data.name ? Colors.WHITE : Colors.GREEN,
                        fontFamily: 'Montserrat-Regular',
                    }]}>
                        {data.id}
                    </Text>
                    <Text style={[styles.daysCardTextStyle, {
                        color: day === data.name ? Colors.WHITE : Colors.GREEN,
                        fontFamily: 'Montserrat-Regular',
                    }]}>
                        {data.name}
                    </Text>
                </View>
            </AwesomeButton>
        </Card>
    );
}


const BuildTitleComponent = ({ title, color }) => {
    return (
        <Text style={{
            color: color ? color : Colors.BLACK, fontSize: 20,
            fontFamily: 'Montserrat-Regular', fontWeight: '600',
        }}>
            {title}
        </Text>
    );
}


const BuildPatientDetailsDropdown = ({ selectedValue, setSelectedValue }) => {
    return (
        <>
            <Text style={{
                fontSize: 15, color: '#000', fontWeight: '600',
                fontFamily: 'Montserrat-Regular', marginVertical: 10,
            }}>
                Patient
            </Text>
            <View style={{
                backgroundColor: '#fff', shadowColor: "#999",
                borderRadius: 8, width: "100%", elevation: 4,
            }}>
                <Picker
                    selectedValue={selectedValue}
                    mode="modal"
                    style={{
                        color: selectedValue === undefined || selectedValue.length === 0 ? "#999" : '#000',
                        marginLeft: 10, fontFamily: 'Montserrat-Regular',
                    }}
                    itemStyle={{
                        fontFamily: 'Montserrat-Regular',
                    }}
                    dropdownIconColor={"white"}
                    onValueChange={(itemValue, itemIndex) => {
                        console.log("\n\n \n\n \n\n dfsdefgekfbnekfbekjbgekbgenhjb => ")
                        console.log(itemValue, itemIndex);
                        setSelectedValue(itemValue)
                    }}
                >
                    <Picker.Item label="Select patient details" style={{
                        fontSize: 14, marginLeft: 8
                    }} fontFamily='Montserrat-Regular' />
                    <Picker.Item label="Value 1" value="v1" style={{
                        fontSize: 14, marginLeft: 8
                    }} fontFamily='Montserrat-Regular' />
                    <Picker.Item label="Value 2" value="v2" style={{
                        fontSize: 14, marginLeft: 8
                    }} fontFamily='Montserrat-Regular' />
                    <Picker.Item label="Value 3" value="v3" style={{
                        fontSize: 14, marginLeft: 8
                    }} fontFamily='Montserrat-Regular' />
                    <Picker.Item label="Value 4" value="v4" style={{
                        fontSize: 14, marginLeft: 8
                    }} fontFamily='Montserrat-Regular' />
                    <Picker.Item label="Value 5" value="v5" style={{
                        fontSize: 14, marginLeft: 8
                    }} fontFamily='Montserrat-Regular' />
                    <Picker.Item label="Value 6" value="v6" style={{
                        fontSize: 14, marginLeft: 8
                    }} fontFamily='Montserrat-Regular' />
                    <Picker.Item label="Value 7" value="v7" style={{
                        fontSize: 14, marginLeft: 8
                    }} fontFamily='Montserrat-Regular' />
                    <Picker.Item label="Value 8" value="v8" style={{
                        fontSize: 14, marginLeft: 8
                    }} fontFamily='Montserrat-Regular' />
                </Picker>
                {/* <Image
                    source={require("../../../assets/arrow-down.png")}
                    style={{
                        width: 28, height: 28,
                        position: 'absolute',
                        right: 8, top: 12,
                        tintColor: '#999'
                    }}
                /> */}
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    daysCardContainerStyle: {
        elevation: 4, marginTop: 16, shadowColor: '#999',
        borderRadius: 8, padding: 1,
        justifyContent: 'center', alignItems: 'center',
    },
    daysCardNumberStyle: {
        color: Colors.GREEN, fontSize: 16,
        fontWeight: '600', textAlign: 'center',
    },
    daysCardTextStyle: {
        color: Colors.GREEN, fontSize: 11,
        marginTop: 4, fontWeight: '400',
    },
    inputCardStyle: {
        elevation: 5, shadowColor: '#999',
        borderRadius: 10, overflow: 'hidden',
    },
    textareaInputStyle: {
        width: '100%', height: 190,
        paddingHorizontal: 18, color: "black",
        borderRadius: 10, paddingBottom: 16,
        marginTop: -70, fontFamily: 'Montserrat-Regular',
    }
});


{/* <Card style={{ elevation: 5, shadowColor: "silver", borderRadius: 6 }}>
    <ModalDropdown
        style={{
            backgroundColor: 'white', width: '100%', height: 52,
            justifyContent: 'center', color: '#000', borderRadius: 6,
            paddingHorizontal: 16
        }}
        textStyle={{ color: '#000', fontSize: 16, fontWeight: '600' }}
        defaultTextStyle={{ color: '#999', fontSize: 15 }}
        dropdownStyle={{
            width: '81.6%', borderRadius: 8, borderWidth: 4,
            backgroundColor: '#f7f8f9', height: 300
        }}
        dropdownTextHighlightStyle={{ backgroundColor: "#dcdcdc" }}
        dropdownTextStyle={{
            fontSize: 16, marginLeft: 10, backgroundColor: '#eee',
            marginLeft: 0, paddingLeft: 20, paddingVertical: 16
        }}
        dropdownTextProps={{ fontSize: 14 }}
        options={listOfPatients}
        animated={true}
        onSelect={(value) => { }}
    />
    <Image
        source={require("../../assets/arrow-down.png")}
        style={{
            width: 28, height: 28,
            position: 'absolute',
            right: 8, top: 12,
            tintColor: '#999'
        }}
    />
</Card> */}

