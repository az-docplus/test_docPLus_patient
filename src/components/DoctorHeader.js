import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { windowWidth } from '../utils/utils';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Host } from '../utils/connection';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
export default function DoctorHeader({
  showIcon,
  text,
  onPressLeftIcons,
  textStyle,
  name,
}) {
  const { patient } = useSelector((state) => state.PatientReducer);
  const navigation = useNavigation();
  const { isLoggedin, userData } = useSelector((state) => state.AuthReducer);
  const [imageSource, setImageSource] = useState(
    require('../assets/images/dummy_profile.png'),
  );
  useEffect(() => {
    if (patient?.picture) {
      setImageSource({
        uri: `${Host}${patient.picture.replace('public', '')}`,
      });
    } else {
      setImageSource(require('../assets/images/dummy_profile.png'));
    }
  }, [patient]);
  return (
    // <View
    //   style={{
    //     width: windowWidth,
    //     backgroundColor: 'white',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     height: 52,
    //     paddingHorizontal: 20,
    //     justifyContent: 'space-between',
    //   }}>
    //   <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    //     <TouchableOpacity
    //       onPress={() =>
    //         onPressLeftIcons ? onPressLeftIcons() : navigation.goBack()
    //       }>
    //       <Image
    //         source={require('../assets/icons/hamburger_menu.png')}
    //         style={{
    //           width: 20,
    //           height: 30,
    //           tintColor: '#51B7B7',
    //           resizeMode: 'contain',
    //         }}
    //       />
    //     </TouchableOpacity>
    //     <View style={{ width: showIcon ? '29%' : 20 }} />
    //     {/* <Text
    //       style={[
    //         {
    //           fontSize: 18,
    //           color: showIcon ? '#000' : '#51B7B7',
    //           fontFamily: 'Montserrat-Bold',
    //         },
    //         textStyle,
    //       ]}>
    //       {text}
    //     </Text> */}
    //   </View>
    //   {showIcon ? (
    //     <TouchableOpacity
    //       style={{
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         width: 32,
    //         height: 32,
    //         // borderWidth: 1,
    //         // borderColor: 'black',
    //         // borderRadius: 100,
    //       }}
    //       onPress={onPressLeftIcons}>
    //       <Image
    //         source={require('../../assets/user.png')}
    //         style={{ width: 30, height: 30, tintColor: '#000', resizeMode:'contain' }}
    //       />
    //       <Text></Text>
    //     </TouchableOpacity>
    //   ) : (
    //     <></>
    //   )}
    // </View>
    <View>
      <View
        style={{
          marginVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={() =>
            onPressLeftIcons ? onPressLeftIcons() : navigation.goBack()
          }>
          <Image
            source={require('../assets/icons/Hamburger.png')}
            style={{
              height: 25,
              width: 25,
              resizeMode: 'contain',
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('scancode')} style={{ position: 'relative' }}>
        <MaterialCommunityIcons name="qrcode-scan"  size={30} />
        </TouchableOpacity>
        </View>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('scancode')} style={{ position: 'relative' }}>
        <Image
              source={require('../assets/icons/bell.png')}
              style={{ height: 20, width: 20, resizeMode: 'contain' }}
            />
        </TouchableOpacity>
        </View> */}
        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
          {/* <TouchableOpacity style={{ position: 'relative' }}>
            <Image
              source={require('../assets/icons/bell.png')}
              style={{ height: 20, width: 20, resizeMode: 'contain' }}
            />
            <View
              style={{
                height: 7,
                width: 7,
                backgroundColor: '#EA1A65',
                position: 'absolute',
                top: 0,
                right: 2,
                borderRadius: 2,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/icons/favourite.png')}
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                marginHorizontal: 10,
                marginLeft: 15,
              }}
            />
          </TouchableOpacity> */}
          {/* {isLoggedin ? (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PatientSettings')}>
                {/* {patient?.picture ? ( */}
                {/* <Image
                  source={imageSource}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    resizeMode: 'cover',
                    marginHorizontal: 10,
                  }} */}
                {/* /> */} 
                {/* ) : (
                  <View
                    style={{
                      height: 70,
                      width: 70,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'lightgrey',
                      borderRadius: 50,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        padding: 1,
                      }}>
                      {userData?.firstName[0]} {userData?.lastName[0]}
                    </Text>
                  </View>
                )} */}
              {/* </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
        </View> */}
      </View>
    </View>
  );
}
