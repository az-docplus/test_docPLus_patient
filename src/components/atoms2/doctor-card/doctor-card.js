import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ButtonCompo from '../button/button';

const EvilIconsIcon = ({ size, name, color = "#7B7A79" }) => (
    <EvilIcons size={size} name={name} color={color} />
);
const FontAwesomeIcon = ({ size, name, color = "#7B7A79" }) => (
    <FontAwesome size={size} name={name} color={color} />
);
const SimpleLineIconsIcon = ({ size, name, color = "#7B7A79" }) => (
    <SimpleLineIcons size={size} name={name} color={color} />
);
const FontAwesome5Icon = ({ size, name, color = "#7B7A79" }) => (
    <FontAwesome5 size={size} name={name} color={color} />
);
export default function DoctorCard(props) {
    console.log(props);
   // console.log("hekko");
    return (
        <View style={{ marginBottom: 20 }}>
            <View style={{
                position: "relative", 
            }}>
                <Text style={{
                    position: "absolute",
                    left: -4,
                    top: 17,
                    elevation: 3,
                    color: "#E0F4F4",
                    backgroundColor: "#077EE9",
                    paddingVertical: 7,
                    paddingHorizontal: 17,
                    borderRadius: 4,
                    fontFamily: "Montserrat-SemiBold",
                    fontSize: 14
                }}>PLUS</Text>
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        right: 14,
                        top: 14,
                        backgroundColor: "#fff",
                        borderRadius: 100,
                        width: 40,
                        height: 40,
                        elevation: 3,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <EvilIconsIcon name="heart" size={32} />
                </TouchableOpacity>
                <Image
                    style={{ width: '100%', height: 200, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                    
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderTopRightRadius: 15, borderBottomRightRadius: 15, position: "absolute", bottom: 20, left: 1, backgroundColor: "#EA1A65" }}>
                    <EvilIcons name='clock' color='#fff' size={28} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontFamily: "Montserrat-Regular", color: '#fff', fontSize: 14 }}>Available  </Text>
                        <Text style={{ fontFamily: "Montserrat-SemiBold", color: '#fff', fontSize: 14 }}>  Now</Text>
                    </View>
                </View>
            </View>

            <View style={{
                backgroundColor: "#fff",
                marginTop: -10,
                borderRadius: 16,
                elevation: 7,
                paddingVertical: 20,
                paddingHorizontal: 17
            }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 18 }}>{5}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <FontAwesomeIcon name="star" color='#FFBF46' size={18} />
                        <Text style={{ fontFamily: "Montserrat-Regular", marginLeft: 3 }}>{5}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                    <View style={{ marginRight: 5, }}>
                        <Text style={{
                            fontFamily: "Montserrat-Regular",
                            marginRight: 10,
                            paddingBottom: 7
                        }}>{55}</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: "#EEEEEE",
                            width: 80,
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            borderRadius: 5
                        }}>
                            <SimpleLineIconsIcon name="badge" color='#231F20' size={13} />
                            <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 12 }}>{2} Years</Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <ButtonCompo
                            textStyle={{
                                fontSize: 15
                            }}
                            title="Consult Now"
                        />
                    </View>
                </View>


                <View style={{ height: 1, backgroundColor: "#7B7A79", width: '100%' }} />
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                    <FontAwesome5Icon name="user-md" size={14} color='#077EE9' />
                    <Text style={{ fontFamily: "Montserrat-Regular", color: '#333333', marginLeft: 7, fontSize: 12 }}>Treated 800+ patients recently</Text>
                </View>
            </View>


        </View>
    )
}
