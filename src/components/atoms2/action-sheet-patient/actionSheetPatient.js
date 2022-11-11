import React, { useRef, useState } from 'react'
import { View, Text, Modal, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native'
import InsetShadow from 'react-native-inset-shadow';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const IoniconsIcon = ({ size, name, color = "#000" }) => (
    <Ionicons size={size} name={name} color={color} />
);
const EvilIconsIcon = ({ size, name, color = "#000" }) => (
    <EvilIcons size={size} name={name} color={color} />
);
export default function ActionSheetPatient() {

    const [modalVisible, setModalVisible] = useState(false)
    const [search, setSearch] = useState("")

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{
                    backgroundColor: "#fff",
                    flex: 1,
                    paddingHorizontal: 10,
                    paddingTop: 20
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 10
                    }}>
                        <TouchableOpacity style={{ marginLeft: -10 }} onPress={() => {
                            setModalVisible(false);
                        }}>
                            <IoniconsIcon name="ios-chevron-back-sharp" size={30} />
                        </TouchableOpacity>
                        <InsetShadow
                            shadowOpacity={1}
                            shadowOffset={15}
                            containerStyle={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: "center",
                                marginLeft: 10,
                                paddingHorizontal: 10,
                                borderRadius: 12,
                            }}
                            shadowOffset={10}
                            elevation={8}>
                            <EvilIconsIcon size={27} name="search" />
                            <TextInput
                                value={search}
                                placeholder="Health Concerns or Speciality"
                                onChangeText={(value) => setSearch(value)}
                            />
                        </InsetShadow>
                    </View>
                    <ScrollView style={{ marginTop: 20 }}>
                        <Text style={{ color: "#077EE9", fontFamily: "Montserrat-Regular", fontSize: 20, marginLeft: 10 }}>Your recent concerns</Text>
                        <View style={{ marginTop: 10 }}>
                            <FlatList
                                data={recentConcer}
                                keyExtractor={e => e.toString()}
                                numColumns={2}
                                renderItem={({ item, index }) => {
                                    return <View
                                        style={{
                                            elevation: 4,
                                            backgroundColor: "#fff",
                                            paddingVertical: 16,
                                            paddingHorizontal: 17,
                                            margin: 10,
                                            borderRadius: 23,
                                            flex: 1
                                        }}
                                        key={index}>
                                        <Text style={{ color: "#333333", fontFamily: "Montserrat-Regular", fontSize: 15, textAlign: "center" }}>{item}</Text>
                                    </View>
                                }}
                            />
                        </View>
                        <Text style={{ color: "#077EE9", fontFamily: "Montserrat-Regular", fontSize: 20, marginTop: 20, marginLeft: 10 }}>Specialities</Text>

                        <View style={{ marginTop: 10 }}>
                            <FlatList
                                data={specialities}
                                keyExtractor={e => e.toString()}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                renderItem={({ item, index }) => {
                                    return <View
                                        style={{
                                            elevation: 4,
                                            backgroundColor: "#fff",
                                            paddingVertical: 16,
                                            paddingHorizontal: 17,
                                            margin: 10,
                                            borderRadius: 15
                                        }}
                                        key={index}>
                                        <Text style={{ color: "#333333", fontFamily: "Montserrat-Regular", fontSize: 15 }}>{item}</Text>
                                    </View>
                                }}
                            />
                        </View>
                        <Text style={{ color: "#077EE9", fontFamily: "Montserrat-Regular", fontSize: 20, marginTop: 40, marginLeft: 10 }}>Most searched concerns</Text>
                        <View style={{ marginTop: 10 }}>
                            <FlatList
                                data={concern}
                                keyExtractor={e => e.toString()}
                                numColumns={2}
                                renderItem={({ item, index }) => {
                                    return <View
                                        style={{
                                            elevation: 4,
                                            backgroundColor: "#fff",
                                            paddingVertical: 16,
                                            paddingHorizontal: 17,
                                            margin: 10,
                                            borderRadius: 23,
                                            flex: 1
                                        }}
                                        key={index}>
                                        <Text style={{ color: "#333333", fontFamily: "Montserrat-Regular", fontSize: 15, textAlign: "center" }}>{item}</Text>
                                    </View>
                                }}
                            />
                        </View>
                    </ScrollView>




                </View>
            </Modal>
            <TouchableOpacity onPress={() => {
                setModalVisible(true)
            }} style={{
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <InsetShadow
                    shadowOpacity={1}
                    shadowOffset={15}
                    containerStyle={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: "center",
                        paddingHorizontal: 10,
                        borderRadius: 12,
                        paddingHorizontal: 20,
                        paddingVertical: 15
                    }}
                    shadowOffset={10}
                    elevation={8}>
                    <EvilIconsIcon size={27} name="search" />
                    <Text style={{ fontFamily: "Monserrat-Regular", color: "#7B7A79", marginLeft: 8 }}>Health Concerns or Speciality</Text>
                </InsetShadow>
            </TouchableOpacity>
        </View>
    )
}

const recentConcer = ["Fever", "Blocked Nose", "Cough", "Runny Nose"]
const specialities = ["General Physician", "Pediatrician", "Some thing", "Some thing two"]
const concern = ["Fever", "Blocked Nose", "Cough", "Runny Nose", "Throat Pain", "Headache", "Loose Motion", "Constipation", "Gas", "Nausea"]