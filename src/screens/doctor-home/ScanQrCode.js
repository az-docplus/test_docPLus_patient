import { Linking, StyleSheet, Text, TouchableOpacity, View, ToastAndroid} from 'react-native'
import React, { useEffect } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useDispatch } from 'react-redux';
import { GettingDoctorProfilesbySlug } from '../../reduxV2/action/DoctorToPatientAction';
import { useState } from 'react';
const ScanQrCode = ({navigation}) => {
  const [doctorFound, setDoctorFound] = useState(true);
 
  const dispatch = useDispatch();
   const onSuccess = e => {
    let url = "https://docplus.online/doctors/"
    if(e.data.slice(0,31) === url){
      let slug = e.data.replace("https://docplus.online/doctors/","")
      dispatch(GettingDoctorProfilesbySlug(slug, (data)=>{
       
        navigation.navigate('DoctorProfileScreen', data);
      }));
    }else{
      console.log("Doctor not found");
      ToastAndroid.show("Doctor not found !", ToastAndroid.SHORT);
     
      
    }
    
 
   
        // Linking.openURL(e.data).catch(err =>
        //   console.error('An error occured', err)
        // );
      };
  return (
    
      <QRCodeScanner
      styles={{height:'100%'}}
        onRead={onSuccess}
        reactivate={true}
        showMarker = {true}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>docplus.online</Text> for more Details
          </Text>
        }
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it</Text>
        //   </TouchableOpacity>
        // }
      />
  
  )
}

export default ScanQrCode

const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    }
  });