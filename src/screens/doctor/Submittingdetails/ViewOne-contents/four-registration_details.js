import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import { Host } from '../../../../utils/connection';

import MMaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

const MMaterialIconsIconsIcons = ({ name, size, color }) => (
  <MMaterialIconsIcons size={size} color={color} name={name} />
);
const AntDesignIconsIcons = ({ name, size, color }) => (
  <AntDesignIcons size={size} color={color} name={name} />
);
import RNFetchBlob from 'rn-fetch-blob';

const getExtention = (fileName) => {
  return /[.]/.exec(fileName) ? /[^.]+$/.exec(fileName) : undefined;
};
// Line
export default function Registration({ doctorProfile, editHandler }) {
  useEffect(() => {
    // Object.keys(doctorProfile).forEach((i, e) => {
    //     console.log(e + 1, " : ", i, " ::: ", doctorProfile[i])
    // })
  }, [doctorProfile]);

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
    const image_URL = `${Host}/${doctorProfile['document']}`;
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    const { config, fs } = RNFetchBlob;
    const PictureDir = fs.dirs.PictureDir;
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: PictureDir + '/image_' + 'docplus_document' + ext,
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
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: 'white',
        elevation: 15,
        marginVertical: 20,
        paddingTop: 15,
      }}>
      <View
        style={{
          marginTop: 15,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            marginHorizontal: 30,
          }}>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 20,
            }}>
            Registration Details
          </Text>
          <TouchableOpacity onPress={editHandler}>
            <Image
              style={{ height: 30, width: 30 }}
              source={require('../../../../assets/png/pencil.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 20, backgroundColor: 'white' }}></View>
        <Headerwithoutadd name="Registration Details"></Headerwithoutadd>
        <Text
          style={{
            fontFamily: 'Gilroy-Medium',
            fontSize: 16,
            marginLeft: 30,
            marginTop: 10,
          }}>
          {doctorProfile.registration.regNo}
        </Text>
        <Line />
        <Headerwithoutadd name="Registration Council"></Headerwithoutadd>
        <Text
          style={{
            fontFamily: 'Gilroy-Medium',
            fontSize: 16,
            marginLeft: 30,
            marginTop: 10,
          }}>
          {doctorProfile.registration.regCouncil}
        </Text>
        <Line />
        <Headerwithoutadd name="Registration Year"></Headerwithoutadd>
        <Text
          style={{
            fontFamily: 'Gilroy-Medium',
            fontSize: 16,
            marginLeft: 30,
            marginTop: 10,
          }}>
          {doctorProfile.registration.regYear}
        </Text>
        <Line />

        {/* <View><Text
                        style={{
                            fontFamily: 'Montserrat-Regular',
                            fontSize: 16,
                            marginLeft: 30,
                            marginTop: 0,
                        }}>
                        Upload
                    </Text>
                        <Greyboxwithupload
                            onDownload={() => {
                                documentDownloadHandler(doctorProfile["document"])
                            }}
                            name="Registration Documents"
                            gap={40} />
                        <View style={{ marginBottom: 30, backgroundColor: 'white' }}></View>
                    </View> */}
        {doctorProfile['document'] && (
          <View>
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
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 16,
                      marginRight: 5,
                    }}>
                    Registration Document
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 16,
                        marginRight: 6,
                      }}>
                      Proof
                    </Text>
                    <MMaterialIconsIconsIcons
                      name="info"
                      color="#51B7B7"
                      size={20}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    DownloadFunc();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    paddingVertical: 3,
                    paddingHorizontal: 6,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: '#EA1A65',
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 13,
                      marginRight: 4,
                    }}>
                    Download
                  </Text>
                  <AntDesignIconsIcons
                    name="download"
                    color="#EA1A65"
                    size={13}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const Headerwithoutadd = (props) => {
  return (
    <View style={{ marginTop: 10, flexDirection: 'row' }}>
      <Text
        style={{
          fontFamily: 'Gilroy-SemiBold',
          fontSize: 16,
          marginLeft: 30,
        }}>
        {props.name}
      </Text>
      {/* <TouchableOpacity>
                <Image
                    style={{ height: 20, width: 20, marginLeft: 20 }}
                    source={require('../../../../assets/png/information.png')}
                />
            </TouchableOpacity> */}
    </View>
  );
};
const Line = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#EEEEEE',
        marginVertical: 15,
      }}></View>
  );
};

const Greyboxwithupload = (props) => {
  const space = props.gap;
  return (
    <View
      style={{
        marginTop: 15,
        flexDirection: 'row',
        marginBottom: 5,
        height: 66,
        width: '88%',
        backgroundColor: '#EEEEEE',
        borderRadius: 15,
        alignItems: 'center',
        marginLeft: 20,
      }}>
      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 16,
          marginLeft: 10,
        }}>
        {props.name}
      </Text>
      <Image
        style={{ height: 20, width: 20, marginLeft: 10 }}
        source={require('../../../../assets/png/information.png')}
      />

      <TouchableOpacity
        onPress={() => {
          console.log(props);
          props.onDownload();
        }}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: space,
            height: 30,
            width: 80,
            borderRadius: 15,
            marginTop: -5,
            flexDirection: 'row',
            marginTop: 3,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 12,

              color: '#EE296E',
            }}>
            Download
          </Text>
          <Image
            style={{
              height: 14,
              width: 14,
              marginLeft: 10,
              color: '#EE296E',
            }}
            source={require('../../../../assets/png/upload.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
