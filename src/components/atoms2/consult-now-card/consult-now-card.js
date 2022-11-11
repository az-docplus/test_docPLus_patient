import React from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import ButtonCompo from '../button/button';

const imagesArray = [require("../../../assets/images/doc.jpg"), require("../../../assets/images/doc.jpg"), require("../../../assets/images/doc.jpg"), require("../../../assets/images/doc.jpg"), require("../../../assets/images/doc.jpg")]

export default function ConsulnowCard() {
    return (
        <View>
            <View style={{
                marginVertical: 30,
                marginHorizontal: 20,
                elevation: 7,
                paddingVertical: 15,
                paddingHorizontal: 58,
                backgroundColor: "#fff",
                borderRadius: 20,
                position: "relative"
            }}>
                <Text style={{
                    position: "absolute",
                    left: -4,
                    top: 5,
                    color: "#E0F4F4",
                    backgroundColor: "#077EE9",
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    borderRadius: 4
                }}>PLUS</Text>

                <View>
                    <ScrollView style={{}}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 20 }}>
                            {imagesArray.map((val, index) => { 
                                return <Image
                                    source={val}
                                    style={{
                                        width: index == 2 ? 70 : index < 2 ? (index + 1) * 20 : 40 - ((index - 3) * 20),
                                        height: index == 2 ? 70 : index < 2 ? (index + 1) * 20 : 40 - ((index - 3) * 20),
                                        zIndex: index > 2 ? (imagesArray.length - index) - 1 : index,
                                        borderRadius: 100,
                                        borderWidth: 1.4,
                                        borderColor: "#0D84E2",
                                        margin: -3,
                                        transform: [{ scale: 1.2 }]
                                    }}
                                />
                            })}
                        </View> 
                    </ScrollView>
                </View>
                <Text style={{
                    fontFamily: "Montserrat-SemiBold",
                    fontSize: 18,
                    textAlign: "center"
                }}>Healthcare</Text>
                <Text style={{
                    fontFamily: "Montserrat-SemiBold",
                    textAlign: "center",
                    fontSize: 18,
                }}>Team</Text>
                <Text style={{
                    fontFamily: "Montserrat-Regular",
                    textAlign: "center",
                    fontSize: 14,
                    color: "#666666",
                    paddingVertical: 12
                }}>Consult with Experts for your everyday health concerns</Text>
                <ButtonCompo
                    title="Consult Now"
                    pressHandler={() => {

                    }}
                />
            </View>
        </View>
    )
}
