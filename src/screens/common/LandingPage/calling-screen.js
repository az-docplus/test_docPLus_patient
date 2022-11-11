import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
const { width, height } = Dimensions.get("screen")
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const IoniconsIcon = ({ size, name, color = "#077EE9" }) => (
    <Ionicons size={size} name={name} color={color} />
);
const FontAwesomeIcon = ({ size, name, color = "#077EE9" }) => (
    <FontAwesome size={size} name={name} color={color} />
);
const FeatherIcon = ({ size, name, color = "#077EE9" }) => (
    <Feather size={size} name={name} color={color} />
);
export default function CallingScreen() {
    return (
        <View style={{
            flex: 1
        }}>

            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={["#36A7B7", "#0A81E6"]}
                style={{
                    flex: 1,
                    paddingVertical: 50,
                    paddingHorizontal: 50
                }}
            >
                <Text style={{
                    fontFamily: "Montserrat-SemiBold",
                    textAlign: 'center',
                    color: "#fff",
                    fontSize: 25
                }}>Dr. Anuj Verma</Text>
                <Text style={{
                    fontFamily: "Montserrat-Regular",
                    textAlign: 'center',
                    color: "#fff",
                    fontSize: 18,
                    marginTop: 15
                }}>ringing....</Text>
                <Image
                    source={require("../../../assets/png/doc-center-image.png")}
                    style={{
                        width: width * 0.7,
                        height: width * 0.7,
                        borderRadius: (width * 0.7) / 2,
                        alignSelf: 'center',
                        marginTop: 70
                    }}
                />
            </LinearGradient>



            <View style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: "space-evenly",
                paddingVertical: 22,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                marginTop: -20
            }}>
                <IconsCompo
                    Icon={() => <IoniconsIcon name={true ? "volume-high" : "ios-volume-high-outline"} size={28} color="#077EE9" />}
                />
                <IconsCompo
                    Icon={() => <FontAwesomeIcon name="video-camera" size={28} color="#077EE9" />}
                />
                <IconsCompo
                    Icon={() => <FeatherIcon name={true ? "mic" : "mic-off"} size={28} color="#077EE9" />}
                />
                <IconsCompo
                    Icon={() => <FeatherIcon name="phone" size={28} color="#fff" />}
                    bgColor="#FF3838"
                />

            </View>
        </View>
    )
}


const IconsCompo = ({
    Icon,
    bgColor
}) => {
    return <TouchableOpacity style={{
        backgroundColor: bgColor ? bgColor : '#fff',
        elevation: 4,
        borderRadius: 100,
        padding: 13
    }}>
        <Icon />
    </TouchableOpacity>
}