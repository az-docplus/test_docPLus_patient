import React from 'react';
import { View, Text, SafeAreaView, FlatList, StatusBar, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import CustomButton from '../../components/CustomButton';
import CustomTextComponent from '../../components/CustomTextComponent';
import HeaderComponent from '../../components/HeaderComponent';
import SearchComponent from '../../components/SearchComponent';
import { dummyData } from '../../constants/dummyData';
import { Colors } from '../../utils/Colors';
import { windowWidth } from '../../utils/utils';
import DoctorSearch from './DoctorSearch';


export default function DoctorSearchScreen({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={{ marginHorizontal: 8 }}>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                    numColumns={2}
                    data={dummyData}
                    keyExtractor={item => `${item.id}`}
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={{ marginHorizontal: 10 }}>
                            <HeaderComponent text="Doctor's for 'Bad Stomach'" />
                            <DoctorSearch onPress={() => { navigation.navigate("DoctorSearchScreen2") }} />
                        </View>
                    }
                    renderItem={({ item }) => {
                        return (
                            <BuildDetailDoctorComponent
                                item={item} width={windowWidth / 2 - 22}
                                navigation={navigation}
                            />
                        );
                    }}
                    ListFooterComponent={
                        <Card style={{
                            justifyContent: 'center', alignItems: 'center', marginTop: 20,
                            elevation: 10, shadowColor: '#999', marginBottom: 58,
                            borderTopWidth: 8, borderColor: "#eee", borderRadius: 0
                        }}>
                            <View style={{ paddingTop: 10, alignItems: 'center', paddingBottom: 16 }}>
                                <CustomTextComponent
                                    text={"Not able to find your doctor?"}
                                    fs={18} textColor={"#000"}
                                />
                                <View style={{ height: 16 }} />
                                <CustomButton
                                    text="Call Now" fs={15}
                                    textColor={"white"}
                                    width={150} height={40}
                                    br={100} raiseLevel={4}
                                    bgColor={Colors.GREEN}
                                    shadowColor={"#57B1B1"}
                                    backgroundDarker="#57B1B1"
                                    icon={require("../../../assets/call.png")}
                                    tintColor="#fff" marginTop={5}
                                    onPress={() => { }}
                                />
                            </View>
                        </Card>
                    }
                />
            </View>
        </SafeAreaView>
    )
}


export const BuildDetailDoctorComponent = ({ item, width, cardFooter, navigation }) => {

    const renderDoctorImageComponent = (item, cardFooter) => {
        return (
            <Image
                source={{ uri: item.image }}
                resizeMode="cover"
                style={{
                    width: "100%", height: cardFooter ? 250 : 150,
                    borderTopLeftRadius: 8, borderTopRightRadius: 8
                }}
            />
        );
    }

    const renderHeartComponent = () => {
        return (
            <View style={styles.heartComponentStyle}>
                <Image
                    source={require("../../../assets/heart.png")}
                    style={{ width: 20, height: 20 }}
                />
            </View>
        );
    }

    return (
        <View style={{ marginTop: cardFooter ? 20 : 10, width: width }}>
            {renderDoctorImageComponent(item, cardFooter)}
            {renderHeartComponent()}

            <View style={[styles.imageAvailability, {
                top: cardFooter ? 180 : 98
            }]}>
                <Image
                    source={require("../../../assets/clock.png")}
                    style={{ width: 14, height: 14, marginRight: 7, tintColor: '#fff' }}
                />
                <CustomTextComponent
                    text={`Available in\n48 min`}
                    fs={10} fw="600" textColor={"#fff"}
                />
            </View>

            <BuildDoctorDetailsComponent item={item} cardFooter={cardFooter} navigation={navigation} />
        </View>
    );
}


export const BuildDoctorDetailsComponent = ({ item, cardFooter, navigation }) => {

    const renderDoctorNameComponent = (item) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                <CustomTextComponent
                    text={item.name}
                    fs={14} fw="700" textColor={"#000"}
                />
                <Card style={styles.doctorStatudcardStyle} />
            </View>
        );
    }

    const renderDoctorRatingComponent = (item) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', }}>
                <Image
                    source={require("../../../assets/star.png")}
                    style={{
                        width: 15, height: 15,
                        marginRight: 2
                    }}
                />
                <CustomTextComponent
                    text={item.name}
                    fs={12} fw="800" textColor={"#000"}
                />
            </View>
        );
    }

    const renderDoctorPriceComponent = (item, cardFooter) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <CustomTextComponent
                    text={`₹ ${item.price}`}
                    fs={20} fw="700" textColor={"#000"}
                />

                <CustomButton
                    text="Book" fs={12}
                    textColor={"white"}
                    width={cardFooter ? 90 : 65} height={cardFooter ? 30 : 26}
                    br={100} raiseLevel={2}
                    bgColor={Colors.BLUE2}
                    shadowColor={"#368edd"}
                    backgroundDarker="#3d7fba"
                    onPress={() => { navigation.navigate("ScheduleHomeScreen") }}
                />
            </View>
        );
    }


    const renderCardFooterComponent = () => {
        return (
            <View style={styles.cardFooterContainer}>
                <Image
                    source={require("../../../assets/heart-fill.png")}
                    style={{
                        width: 6, height: 6,
                        marginRight: -3,
                        tintColor: Colors.BLUE2,
                    }}
                />
                <Image
                    source={require("../../../assets/user.png")}
                    style={{
                        width: 18, height: 18,
                        marginRight: 2,
                        tintColor: Colors.BLUE2,
                    }}
                />
                <CustomTextComponent
                    text={`Treated 800+ patients`}
                    fs={14} fw="400" textColor={"#000"}
                />
            </View>
        );
    }

    return (
        <Card style={styles.doctorDetailsContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                {renderDoctorNameComponent(item)}
                {renderDoctorRatingComponent(item)}

            </View>
            <Text style={{ color: '#000', fontSize: 11, fontWeight: '300' }}>
                {item.info}
            </Text>
            <View style={{ height: 8 }} />
            {renderDoctorPriceComponent(item, cardFooter)}
            {/* cardFooter */}
            {cardFooter ? renderCardFooterComponent() : <></>}
        </Card>
    );
}


const styles = StyleSheet.create({
    doctorDetailsContainer: {
        marginTop: -10, elevation: 4,
        shadowColor: '#999', borderColor: "#fff",
        padding: 12, borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    imageAvailability: {
        position: 'absolute', top: 98,
        backgroundColor: '#57B1B1',
        padding: 3, width: 100,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        flexDirection: 'row',
        alignItems: "center",
        paddingLeft: 7,
    },
    cardFooterContainer: {
        borderTopWidth: 1, borderColor: "#dcdcdc",
        flexDirection: 'row', alignItems: "center",
        marginTop: 8, paddingTop: 8
    },
    heartComponentStyle: {
        position: 'absolute',
        top: 8, right: 8,
        width: 30, height: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    doctorStatudcardStyle: {
        backgroundColor: Colors.GREEN,
        width: 10, height: 10,
        borderRadius: 100, borderWidth: 2,
        borderColor: '#fff', marginLeft: 4
    }
});

