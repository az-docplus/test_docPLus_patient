import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Permission,
  PermissionsAndroid,
} from 'react-native';
import PencilPng from '../../../../assets/png/pencil.png';
import MaterialEvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialFontawesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MMaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { FlatList } from 'react-native-gesture-handler';
import { Host } from '../../../../utils/connection';
import moment from 'moment';
import { UpdateDoctorProfile } from '../../../../reduxV2/action/DoctorAction';
import { useDispatch } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import QRCode from 'react-native-qrcode-svg';

const EvilIcons = ({ name, size, color }) => (
  <MaterialEvilIcons size={size} color={color} name={name} />
);
const MaterialFontawesomeIcons = ({ name, size, color }) => (
  <MaterialFontawesome size={size} color={color} name={name} />
);
const MaterialCommunityIconsIcons = ({ name, size, color }) => (
  <MaterialCommunityIcons size={size} color={color} name={name} />
);
const MMaterialIconsIconsIcons = ({ name, size, color }) => (
  <MMaterialIconsIcons size={size} color={color} name={name} />
);
const AntDesignIconsIcons = ({ name, size, color }) => (
  <AntDesignIcons size={size} color={color} name={name} />
);

const getExtention = (fileName) => {
  return /[.]/.exec(fileName) ? /[^.]+$/.exec(fileName) : undefined;
};
// const DownloadFunc = () => {
//   try {
//     // https://images.pexels.com/photos/10112955/pexels-photo-10112955.jpeg
//     RNFetchBlob
//       .config({
//         // add this option that makes response data to be stored as a file,
//         // this is much more performant.
//         fileCache: true,
//         appendExt: 'png',
//         path: RNFetchBlob.fs.dirs.DocumentDir + '/docplus_downloads'
//       })
//       .fetch('GET', 'https://images.pexels.com/photos/10112955/pexels-photo-10112955.jpeg', {
//         //some headers ..
//       })
//       .then((res) => {
//         // the temp file path
//         console.log('The file saved to ', res.path())
//       })
//   } catch (error) {
//     console.log("error : ", error)
//   }
// }
export default function ThreePersonalInfo({
  doctorProfile,
  editHandler,
  editLanguage,
}) {
  const dispatch = useDispatch();
  const [selectedLanguage, setSeletedLanguage] = useState(null);
  useEffect(() => {
    // Object.keys(doctorProfile).forEach((e, i) => {
    //   console.log(i, " :: ", e, " :::: ", doctorProfile[e])
    // })
    // console.log("doctorProfile : ", doctorProfile.bio)
  }, []);

  const documentDownloadHandler = () => {
    DownloadFunc();
  };
  // const documentDownloadHandler = () => {
  //   const documentImage = `${Host}/${doctorProfile['idProof']}`;
  //   Linking.canOpenURL(documentImage).then((supported) => {
  //     if (supported) {
  //       Linking.openURL(documentImage);
  //     } else {
  //       console.log("Don't know how to open URI: " + documentImage);
  //     }
  //   });
  // };
  const SaveLanguageListFunc = (language) => {
    const userData = {
      id: doctorProfile?._id,
      languages: doctorProfile['languages']?.filter((e) => e != language),
    };
    dispatch(
      UpdateDoctorProfile(
        userData,
        () => {
          console.log('done');
        },
        (e) => {
          console.log('error in saving :::::>>> ', e);
        },
      ),
    );
  };
  const DownloadFunc = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage permission required!',
          message: 'App needs acess',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('granted');
        downloadImage();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const downloadImage = () => {
    const image_URL = `${Host}/${doctorProfile['idProof']}`;
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    const { config, fs } = RNFetchBlob;
    const PictureDir = fs.dirs.PictureDir;
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: PictureDir + '/image_' + 'docplus_idProof' + ext,
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then((res) => {
        console.log('downloaded successfully');
      })
      .progress((received, total) => {
        console.log('progress', received / total);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        elevation: 15,
        marginTop: 30,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingTop: 15,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 30,
          alignItems: 'center',
        }}>
        <Text style={{ fontFamily: 'Gilroy-SemiBold', fontSize: 20 }}>
          Personal Info
        </Text>
        <TouchableOpacity onPress={editHandler}>
          <Image style={{ width: 34, height: 34 }} source={PencilPng} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#E5E5E5',
          marginHorizontal: 25,
          marginVertical: 30,
          borderRadius: 14,
          padding: 20,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text
            style={{
              fontFamily: 'Gilroy-Bold',
              fontSize: 20,
              textTransform: 'capitalize',
            }}>
            Dr. {doctorProfile.basic.name}
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 16,
              marginLeft: 20,
              color: '#999999',
            }}>
            {doctorProfile.dob &&
              `${moment().diff(doctorProfile.dob, 'years')},`}{' '}
            {doctorProfile.gender}
          </Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <EvilIcons name="location" color="#EA1A65" size={25} />
          {/* <Text> {doctorProfile.state},</Text> */}
          <Text>{doctorProfile.location}</Text>
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: '#EEEEEE' }}></View>
      <View style={{ marginVertical: 12, marginHorizontal: 35 }}>
        <Text style={{ fontFamily: 'Gilroy-SemiBold', fontSize: 16 }}>
          Phone
        </Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
          <MaterialFontawesomeIcons name="phone" color="#000" size={20} />
          <Text style={{ fontFamily: 'Montserrat-SemiBold', marginLeft: 12 }}>
            {doctorProfile.phone}
          </Text>
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: '#EEEEEE' }}></View>
      <View style={{ marginVertical: 12, marginHorizontal: 35 }}>
        <Text style={{ fontFamily: 'Gilroy-SemiBold', fontSize: 16 }}>
          Email
        </Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
          <MaterialCommunityIconsIcons name="email" color="#000" size={20} />
          <Text style={{ fontFamily: 'Gilroy-SemiBold', marginLeft: 12 }}>
            {doctorProfile.email}
          </Text>
        </View>
      </View>

      <View style={{ height: 1, backgroundColor: '#EEEEEE' }}></View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
            marginHorizontal: 35,
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 16,
                marginRight: 5,
              }}>
              Languages
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={editLanguage}
              style={{
                backgroundColor: '#E0F4F4',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 2,
              }}>
              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 24,
                  color: '#297281',
                }}>
                +
              </Text>
              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 12,
                  color: '#297281',
                  marginLeft: 7,
                }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginLeft: 16, marginBottom: 20 }}>
          <FlatList
            data={doctorProfile['languages'] ? doctorProfile['languages'] : []}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            key={(e) => e.toString()}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#FDE8F0',
                    alignItems: 'center',
                    marginLeft: 8,
                    borderRadius: 12,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => setSeletedLanguage(item)}
                    style={{}}>
                    <Text
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        fontSize: 14,
                        marginRight: 6,
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                  {selectedLanguage == item && (
                    <TouchableOpacity
                      onPress={() => {
                        SaveLanguageListFunc(item);
                      }}
                      style={{}}>
                      <MaterialCommunityIconsIcons
                        name="close"
                        color="#000"
                        size={30}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
          />
        </View>

        <View style={{ height: 1, backgroundColor: '#EEEEEE' }}></View>

        {!doctorProfile['idProof'] && (
          <View
            style={{
              marginVertical: 17,
              marginHorizontal: 25,
              marginBottom: 50,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 18,
                marginLeft: 5,
              }}>
              Upload
            </Text>
            <View
              style={{
                backgroundColor: '#EEEEEE',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 27,
                paddingHorizontal: 18,
                borderRadius: 15,
                marginTop: 20,
              }}>
              <View style={{}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Medium',
                      fontSize: 16,
                      marginRight: 5,
                      // width: '90%',
                    }}>
                    National Identity Proof
                  </Text>
                  <MMaterialIconsIconsIcons
                    name="info"
                    color="#51B7B7"
                    size={20}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={documentDownloadHandler}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  // paddingVertical: 3,
                  // paddingHorizontal: 6,
                  borderRadius: 10,
                  padding: 10,
                }}>
                <Text
                  style={{
                    color: '#EA1A65',
                    fontFamily: 'Gilroy-SemiBold',
                    fontSize: 16,
                    marginRight: 4,
                  }}>
                  Upload
                </Text>
                <AntDesignIconsIcons
                  name="download"
                  color="#EA1A65"
                  size={13}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={{display:'flex',justifyContent: 'center',alignItems: 'center',marginBottom:40}}>
          <Text style={{fontSize:20,fontWeight:'700', marginBottom:20}}>Scan the Code</Text>
        <QRCode

  logoSize={50}
  logo={"https://play-lh.googleusercontent.com/3483VZPK9f0_noiUxNDR1bKta5D66tv641zMPOw1Sem7B5gr5SkSVwdFgDN1_oDmGQ"}
  size={250}
   value={`https://docplus.online/doctors/${doctorProfile?.slug}`} />
        </View>
        
      </View>
    </View>
  );
}
