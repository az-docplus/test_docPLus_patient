import Axios from 'axios';
import React, { useCallback, useState } from 'react';
import {
  Image,
  Modal,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import MaterialAntDesign from 'react-native-vector-icons/AntDesign';
import MMaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';
import PersonImage from '../../../../assets/jpg/person2.jpg';
import { Host } from '../../../../utils/connection';
import dummy_profilePng from '../../../../assets/images/dummy_profile.png';
import DocumentPicker from 'react-native-document-picker';
import { types } from 'socket.io-parser';
import RNFetchBlob from 'rn-fetch-blob';
import { useDispatch, useSelector } from 'react-redux';
import { UploadProfilePic } from '../../../../reduxV2/action/DoctorAction';

const MMaterialIconsIconsIcons = ({ name, size, color }) => (
  <MMaterialIconsIcons size={size} color={color} name={name} />
);

const MaterialAntDesignIcon = ({ size, name, color }) => (
  <MaterialAntDesign size={size} name={name} color={color} />
);

export default function UploadDocs({
  title,
  desc,
  onSubmitGetUrl,
  preImage,
  Component,
}) {
  const [isUploadDocument, setIsUploadDocument] = useState(false);
  const [updatedImage, setUpdatedImage] = useState(null);
  const [isCameraGalleryModal, setIsCameraGalleryModal] = useState(false);
  const { doctorProfile } = useSelector((state) => state.DoctorReducer);
  const dispatch = useDispatch();
  // console.log("check url : ", `${Host}/${preImage}`)
  const UploadDocumentModal = useCallback(() => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isUploadDocument}
        onRequestClose={() => {
          setIsUploadDocument(false);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#5f5f5f88',
            flexDirection: 'column-reverse',
          }}>
          <View
            style={{
              flex: 0.8,
              alignContent: 'flex-end',
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 24,
            }}>
            <TouchableOpacity
              onPress={() => {
                setIsUploadDocument(false);
                setUpdatedImage(null);
              }}
              style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <MaterialAntDesignIcon name="left" size={24} color="#000" />
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 18,
                  marginLeft: 10,
                  marginLeft: 20,
                  marginRight: 10,
                }}>
                {desc}
              </Text>
            </TouchableOpacity>
            <Image
              source={
                updatedImage
                  ? { uri: updatedImage.uri }
                  : preImage
                  ? { uri: `${Host}/${preImage}` }
                  : dummy_profilePng
              }
              style={{
                flex: 1,
                width: '100%',
                marginTop: 50,
                borderRadius: 20,
              }}
            />
            <View></View>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 30,
                justifyContent: 'space-between',
                marginTop: 40,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsCameraGalleryModal(true);
                }}
                style={{
                  flex: 1,
                  marginHorizontal: 7,
                  borderWidth: 1,
                  borderColor: '#2E81CD',
                  borderRadius: 50,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#2E81CD',
                    fontFamily: 'Montserrat-SemiBold',
                    padding: 13,
                    fontSize: 17,
                  }}>
                  Change
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={!updatedImage}
                onPress={() => {
                  UpdateDocumentProfile();
                }}
                style={{ flex: 1, marginHorizontal: 7 }}>
                <LinearGradient
                  colors={['#94B9C0', '#2D7D8E']}
                  angle={0}
                  style={{ elevation: 10, borderRadius: 50 }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      padding: 13,
                      fontSize: 17,
                    }}>
                    Save
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }, [isUploadDocument, updatedImage]);

  const ChooseCameraOfGallerModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCameraGalleryModal}
        onRequestClose={() => {
          setIsCameraGalleryModal(false);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#44444488',
            flexDirection: 'column-reverse',
          }}>
          <View style={{ flex: 0.4, padding: 24, justifyContent: 'flex-end' }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 20,
                paddingVertical: 10,
              }}>
              <TouchableOpacity onPress={onChooseCamera}>
                <Text
                  style={{
                    textAlign: 'center',
                    paddingVertical: 17,
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 18,
                    borderRadius: 20,
                    borderBottomColor: '#077EE9',
                    borderBottomWidth: 1,
                    color: '#077EE9',
                  }}>
                  Take Photo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onChooseGallery}>
                <Text
                  style={{
                    textAlign: 'center',
                    paddingVertical: 17,
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 18,
                    borderRadius: 20,
                    color: '#077EE9',
                  }}>
                  Choose from Gallery
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsCameraGalleryModal(false);
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  backgroundColor: '#fff',
                  paddingVertical: 17,
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 18,
                  borderRadius: 20,
                  marginVertical: 10,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  const onChooseCamera = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted) {
      PickCamera();
    } else {
      askPermission(PickCamera);
    }
  };
  const onChooseGallery = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted) {
      PickGallery();
    } else {
      askPermission(PickGallery);
    }
  };

  const askPermission = async (launch) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'DocPlus needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launch();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err, 'sldkfjdslkfjsdlkfj');
    }
  };
  const PickCamera = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('CameraPicker Error: ', response.error);
      } else {
        // const source = {uri: response.uri};
        // console.log(source);
        // const path = response.uri;
        // setData({...data, imagePath: path});
        // console.log(path);
        // console.log(response, '...................');
        if (Component) {
          //  console.log('response : ', response.data);
          setIsCameraGalleryModal(false);
          getDocumentURL(response);
          // onSubmitGetUrl(response);
        } else {
          setUpdatedImage(response);
          setIsCameraGalleryModal(false);
        }
        // setToggleLoading(true);
        // dispatch(
        //     UploadProfilePic(
        //         userData._id,
        //         response,
        //         () => {
        //             setToggleLoading(false);
        //             setPopupVisible(!popupVisible);
        //             animateHeightOfPopup.setValue(0);
        //             dispatch(GetDoctorProfile(userData._id));
        //         },
        //         () => {
        //             setToggleLoading(false);
        //         },
        //     ),
        // );
      }
    });
  };
  const PickGallery = async () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // ImagePicker.launchImageLibrary(options, (response) => {
    //     console.log(response, '...................');
    //   if (response.didCancel) {
    //     console.log('User cancelled gallery picker');
    //   } else if (response.error) {
    //     console.log('Gallery picker Error: ', response.error);
    //   } else {
    //     console.log(response, '...................');
    //     if (Component) {
    //       getDocumentURL(response);
    //       setIsCameraGalleryModal(false);
    //     } else {
    //       setUpdatedImage(response);
    //       setIsCameraGalleryModal(false);
    //     }
    //     if (doctorProfile._id) {
    //         // setToggleLoading(true);
    //         dispatch(
    //             UploadProfilePic(
    //                 // userData._id,
    //                 response,
    //                 () => {
    //                     // setToggleLoading(false);
    //                     setPopupVisible(!popupVisible);
    //                     animateHeightOfPopup.setValue(0);
    //                     // dispatch(GetDoctorProfile(userData._id, () => {
    //                     //     setToggleLoading(false);
    //                     // }));
    //                 },
    //                 () => {
    //                     // setToggleLoading(false);
    //                 },
    //             ),
    //         );
    //     } else {
    //         alert('You need to login first');
    //     }
    //   }
    // });
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // console.log(file[0].name + ' ' + file[0].type + ' ' + file[0].uri + ' ');

      const path = await normalizePath(file[0].uri);
      // console.log('=========>>>>>>>>>>.path', path);
      const result = await RNFetchBlob.fs.readFile(path, 'base64');
      // console.log('==========>>>>>>>>>result',result);
      const response = {
        name: file[0].name,
        type: file[0].type,
        uri: file[0].uri,
      };
      if (file) {
        getDocumentURL(response, result);
        setIsCameraGalleryModal(false);
      } else {
        setUpdatedImage(response);
        setIsCameraGalleryModal(false);
      }
      //  if (doctorProfile._id) {
      //         //  setToggleLoading(true);
      //          dispatch(
      //              UploadProfilePic(
      //                 //  userData._id,
      //                  response,
      //                  () => {
      //                     //  setToggleLoading(false);
      //                      setPopupVisible(!popupVisible);
      //                      animateHeightOfPopup.setValue(0);
      //                     //  dispatch(GetDoctorProfile(userData._id, () => {
      //                     //      setToggleLoading(false);
      //                     //  }));
      //                  },
      //                  () => {
      //                     //  setToggleLoading(false);
      //                  },
      //              ),
      //          );
      //      } else {
      //          alert('You need to login first');
      //      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const normalizePath = async (path) => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      const filePrefix = 'content://' && 'file://';
      if (path.startsWith(filePrefix)) {
        path = path.substring(filePrefix.length);
        try {
          path = decodeURI(path);
        } catch (e) {}
      }
    }
    return path;
  };

  const UpdateDocumentProfile = () => {
    if (updatedImage) {
      const formData = new FormData();
      formData.s('image', {
        name: updatedImage.name,
        uri: updatedImage.uri,
        type: updatedImage.type,
      });
      Axios.put(`${Host}/content/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((e) => {
          onSubmitGetUrl(e.data.data);
          setIsCameraGalleryModal(false);
          setIsUploadDocument(false);
        })
        .catch((e) => {
          console.log('in catch -----------------------------', e);
        });
    } else {
      console.log('error');
    }
  };
  const getDocumentURL = async (imageData) => {
    const formData = new FormData();
    formData.append('image', imageData);
    formData.append('id', doctorProfile._id);
    const order = [];

    if (imageData.type === 'video/mp4') {
      order.push('video');
      formData.append('order', order);
    }

    Axios.post(`${Host}/doctors/upload/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        onSubmitGetUrl(res.data.data);
        // console.log('=============>>>>>>>>>>>res',res);
        setIsCameraGalleryModal(false);
      })
      .catch((e) => {
        console.log('******');
        console.log('catch : ', e);
      });
  };

  if (Component) {
    return (
      <View>
        <UploadDocumentModal />
        <ChooseCameraOfGallerModal />
        <Component openModal={() => setIsCameraGalleryModal(true)} />
      </View>
    );
  }
  return (
    <View>
      {/* modals */}
      <UploadDocumentModal />
      <ChooseCameraOfGallerModal />

      <View style={{ height: 1, backgroundColor: '#EEEEEE' }}></View>

      <View
        style={{ marginVertical: 20, marginHorizontal: 5, marginBottom: 20 }}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 18,
            marginLeft: 5,
          }}>
          {title}
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 16,
                marginRight: 5,
              }}>
              {desc}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsUploadDocument(true)}
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
              Upload
            </Text>
            <MaterialAntDesignIcon name="upload" color="#EA1A65" size={13} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
