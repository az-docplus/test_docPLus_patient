import React from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Card } from 'react-native-paper';
import CustomButton from '../../../components/CustomButton';
import CustomTextComponent from '../../../components/CustomTextComponent';
import { Colors } from '../../../utils/Colors';
import { windowHeight } from '../../../utils/utils';

export default function HomeScreen({ navigation }) {

    return (
        <View style={{ backgroundColor: '#fff', height: windowHeight }}>
            <View style={{ paddingHorizontal: 26, }}>
                <CustomHeader />
            </View>
            <ScrollView style={{ paddingBottom: 20 }}>
                <View style={{ paddingHorizontal: 26, }}>
                    {/* Search Block */}
                    <CustomSearch />
                    <View style={{ height: 20 }} />

                    {/* Top Image Background Image Block */}
                    {renderBgImageComponent()}
                    <View style={{ height: 20 }} />

                    {/* Common health Block */}
                    <BuildCommonTitleComponent
                        text="Commen Health Consern"
                        onPress={() => {
                            navigation.navigate("SearchDoctorScreen")
                        }}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <BuildCommonHealthComponent
                            text={`Bad\nStomach`}
                            icon={require("../../../../assets/bad-stomach.png")}
                        />

                        <BuildCommonHealthComponent
                            text={`Skin rash`}
                            icon={require("../../../../assets/skin-rash.png")}
                        />
                    </View>
                    <Text />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <BuildCommonHealthComponent
                            text={`Covid care`}
                            icon={require("../../../../assets/covid-care.png")}
                        />

                        <BuildCommonHealthComponent
                            text={`Cough &\ncold`}
                            icon={require("../../../../assets/cough-cold.png")}
                        />
                    </View>
                    <View style={{ height: 30 }} />

                    {/* Top Speciality */}
                    <BuildCommonTitleComponent
                        text="Top Speciality"
                        onPress={() => {
                            navigation.navigate("SearchDoctorScreen")
                        }}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <BuildTopSpecialityInfoBlock
                            text={`Opthamologist`}
                            icon={require("../../../../assets/opthamologist.png")}
                        />

                        <BuildTopSpecialityInfoBlock
                            text={`Pulmonogist`}
                            icon={require("../../../../assets/pulmonogist.png")}
                        />
                    </View>
                    <View style={{ height: 16 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <BuildTopSpecialityInfoBlock
                            text={`Covid care`}
                            icon={require("../../../../assets/covid-care.png")}
                        />

                        <BuildTopSpecialityInfoBlock
                            text={`Cough &\ncold`}
                            icon={require("../../../../assets/cough-cold.png")}
                        />
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    )
}


// 1.
const renderBgImageComponent = () => (
    <View style={styles.bgImageContainer}>
        <ImageBackground
            source={require("../../../../assets/s1.png")}
            resizeMode="contain"
            style={{
                width: 100, height: 200,
            }}
        />
        <View style={{ padding: 20, position: 'absolute', left: 6 }}>
            <Text style={{ fontSize: 22, color: Colors.GREEN, fontWeight: '600' }}>
                BIC MEDICAL SLOGAN NEDED
            </Text>
            <Text style={{ fontSize: 14, color: Colors.BLACK, width: '60%', marginTop: 8 }}>
                You can make some kind of subtitle if you want it here, something here
            </Text>
            <Text />
            <CustomButton
                text="Learn More" fw="500" fs={16} br={30}
                width={120} height={42} bgColor={Colors.BLUE2}
                shadowColor={"#368edd"} textColor={Colors.WHITE}
                backgroundDarker="#3d7fba"
                onPress={() => { }}
            />
        </View>
    </View>
);

// 2.
const BuildCommonTitleComponent = ({ text, onPress }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <CustomTextComponent
            text={text} fw="600"
            fs={18} textColor="black"
        />

        <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: Colors.BLUE2 }}>See All</Text>
        </TouchableOpacity>
    </View>
)


// 3
const BuildCommonHealthComponent = ({ text, icon }) => (
    <Card style={{
        width: '47%', elevation: 4, shadowColor: 'grey',
        borderRadius: 100, overflow: 'hidden', padding: 10,
    }}>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={styles.commenHealthIconStyle}>
                <Image
                    source={icon}
                    style={{ width: 24, height: 24, }}
                />
            </View>

            <CustomTextComponent
                text={text} fw="600" fs={14}
                textColor="black" lineHeight={16}
            />
        </TouchableOpacity>
    </Card>
);


// 4
const BuildTopSpecialityInfoBlock = ({ text, icon }) => (
    <Card style={{
        width: '48%', elevation: 4, shadowColor: '#000',
        borderRadius: 10, overflow: 'hidden', padding: 10,
    }}>
        <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50 }}
        >
            <Image
                source={icon}
                style={{ width: 42, height: 42, marginRight: 10 }}
            />

            <CustomTextComponent
                text={text} fw="600" textColor="black"
                fs={14} lineHeight={18}
            />
        </TouchableOpacity>
    </Card>
)

// 4.
const CustomHeader = () => (
    <View style={{
        flexDirection: 'row', alignItems: 'center', height: 50,
        justifyContent: 'space-between', width: '100%', marginVertical: 6,
    }}>
        <Image
            source={require('../../../../assets/logo.webp')}
            resizeMode="contain"
            style={{ width: 100, height: 60 }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image
                source={require('../../../../assets/location.png')}
                resizeMode="contain"
                style={{ width: 24, height: 24 }}
            />
            <Image
                source={require('../../../../assets/bell.png')}
                resizeMode="contain"
                style={{ width: 24, height: 24, marginHorizontal: 22 }}
            />
            <Image
                source={require('../../../../assets/menu.png')}
                resizeMode="contain"
                style={{ width: 24, height: 24 }}
            />
        </View>
    </View>
);


// 5.
const CustomSearch = () => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                onChangeText={(text) => { }}
                placeholder="Doctors, Medicines"
                placeholderTextColor={Colors.gray}
            />

            <Image
                source={require("../../../../assets/search.png")}
                style={{
                    width: 22, height: 22, position: 'absolute',
                    left: 12, tintColor: Colors.darkGreen
                }}
            />
            <View style={{
                width: 42, height: 42, position: 'absolute',
                right: 14, backgroundColor: Colors.BLUE2,
                borderRadius: 100, justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    source={require("../../../../assets/mail-filter.png")}
                    style={styles.singleIcon}
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    bgImageContainer: {
        borderRadius: 18,
        alignItems: 'flex-end',
        backgroundColor: '#f7f8f9',
        width: '100%', height: 190,
    },
    commenHealthIconStyle: {
        padding: 6,
        borderWidth: 1,
        marginRight: 16,
        borderRadius: 100,
        alignItems: 'center',
        width: 44, height: 44,
        justifyContent: 'center',
        borderColor: Colors.BLUE2,
    },
    searchInput: {
        backgroundColor: Colors.WHITE, height: 65, color: "white",
        width: "100%", paddingLeft: 46, borderRadius: 10,
    },
    searchContainer: {
        flexDirection: 'row', alignItems: 'center', marginTop: 10,
        borderRadius: 100,
        elevation: 5, shadowColor: '#999', overflow: 'hidden',
    },
    singleIcon: {
        width: 30, height: 30, tintColor: Colors.WHITE,
    },
});

