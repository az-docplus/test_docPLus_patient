import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import LogoImage from "../../assets/icons/new_docplus_log.png";
import SimpleButtonCompo from "../../components/atoms2/button/Simple-Button";

import Video from "react-native-video";
const styles = StyleSheet.create({
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default function WelcomeScreen({ navigation }) {
  return (
    <View style={{flex:1}}>
      <Video
        source={require('../../assets/Docplus.mp4')}
        rate={1.0}
        volume={1.0}
        muted={false}
        resizeMode={'cover'}
        repeat
        style={styles.video}
      />
      {/* <ImageBackground style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 35 }} source={require("../../assets2/image/backgroundImage.png")}> */}

      <Image
        style={{ width: 130, height: 40, margin: 20, marginTop: 30 }}
        source={LogoImage}
      />

      <View style={{ flex:1, justifyContent:"flex-end" }}>
        <View style={{ marginVertical: 50, marginHorizontal: 15 }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 28,
              fontFamily: 'Montserrat-Bold',
            }}>
            Welcome to
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 36,
              fontFamily: 'Montserrat-Bold',
            }}>
            Docplus
          </Text>

          <Text
            style={{
              color: '#fff',
              fontSize: 19,
              fontFamily: 'Montserrat-Regular',
              marginTop: 20,
            }}>
            Your access to the{' '}
            <Text style={{ fontSize: 20, fontFamily: 'Montserrat-SemiBold' }}>
              Doctors, Treatments
            </Text>{' '}
            and{' '}
            <Text style={{ fontSize: 20, fontFamily: 'Montserrat-SemiBold' }}>
              procedures
            </Text>{' '}
            around the Globe
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <SimpleButtonCompo
            title="Join us"
            pressHandler={() => {
              navigation.navigate('verify-signup-screen-v2');
              //  navigation.navigate("signup-onboarding")
            }}
          />
          <SimpleButtonCompo
            title="Sign in"
            isBackground={true}
            pressHandler={() => {
              navigation.navigate('verify-screen-v2');
            }}
          />
        </View>
        <View style={{height:20}}/>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
}
