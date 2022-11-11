import ViewPager from '@react-native-community/viewpager';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import InsetShadow from 'react-native-inset-shadow';
import MaterialAntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MMaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import PersonImage from '../../../../assets/jpg/person2.jpg';
import PencilPng from '../../../../assets/png/pencil.png';
import { UpdateDoctorProfile } from '../../../../reduxV2/action/DoctorAction';
import { Host } from '../../../../utils/connection';
import UploadDocsCompo from '../__Components/Upload-documents';
import TestCompo from './Drag-photo-arrange';
const { width, height } = Dimensions.get('screen');
const MMaterialIconsIconsIcons = ({ name, size, color }) => (
  <MMaterialIconsIcons size={size} color={color} name={name} />
);
const MaterialAntDesignIcon = ({ size, name, color }) => (
  <MaterialAntDesign size={size} name={name} color={color} />
);
const MaterialCommunityIconsIcons = ({ name, size, color }) => (
  <MaterialCommunityIcons size={size} color={color} name={name} />
);

export default function App({ backToPageOne, doctorProfile }) {
  const dispatch = useDispatch();
  const pagerRef = useRef(null);
  const nextpage = (page) => {
    if (pagerRef) {
      pagerRef.current.setPage(page);
    }
  };
  

  const [photosList, setPhotoList] = useState([...doctorProfile['picture']]);

  const [selectedPhotoCover, setSelectedPhotoCover] = useState(
    doctorProfile['coverPhoto'],
  );
  const [caption, setCaption] = useState('Hospital Reception');
  const [isEditing, setIsEditing] = useState(false);
  const [imageToEdit, setImageToEdit] = useState(null);
  const uploadImageHandler = (res) => {
    updateImageArray(res);
    // updateImageArray(
    //   `${res.data?.replace('public', '')?.replace('\\\\', '/')}`,
    // );
  };

  const updateImageArray = (imgURL) => {
    const dataToUpdate = {
      id: doctorProfile?._id,
      picture: [...doctorProfile['picture'], imgURL],
      coverPhoto: doctorProfile.coverPhoto ? doctorProfile.coverPhoto : imgURL,
    };
    // console.log({ dataToUpdate });
    dispatch(
      UpdateDoctorProfile(
        dataToUpdate,
        () => {
          setPhotoList([...doctorProfile['picture'], imgURL]);
        },
        (e) => {
          console.log('error in saving :::::>>> ', e);
        },
      ),
    );
  };
  const updateCoverPhoto = (item) => {
    const dataToUpdate = {
      id: doctorProfile?._id,
      coverPhoto: item,
      // picture: [item, ...photosList.filter((e) => e != 'to-add' && e != item)],
    };
    dispatch(
      UpdateDoctorProfile(
        dataToUpdate,
        () => {
          setSelectedPhotoCover(item);
          setPhotoList([item, ...photosList.filter((e) => e != item)]);
        },
        (e) => {
          console.log('error in saving :::::>>> ', e);
        },
      ),
    );
  };

  const ReArrangePhoto = (picture) => {
    const dataToUpdate = {
      id: doctorProfile?._id,
      picture,
    };
    dispatch(
      UpdateDoctorProfile(
        dataToUpdate,
        () => {
          setSelectedPhotoCover(item);
          // setPhotoList([item, ...photosList.filter((e) => e != item)]);
        },
        (e) => {
          console.log('error in saving :::::>>> ', e);
        },
      ),
    );
  };

  // console.log('==========================>>>>>>>>>>>>>>>>>>>>>>>>>>>photoslist',photosList)
  return (
    <ViewPager
      ref={pagerRef}
      style={{ flex: 1 }}
      initialPage={0}
      scrollEnabled={false}>
      <View
        key="0"
        style={{
          paddingVertical: 30,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={backToPageOne}>
              <MaterialAntDesignIcon name="left" size={30} color="#000" />
            </TouchableOpacity>
            <UploadDocsCompo
              Component={({ openModal }) => (
                <TouchableOpacity onPress={openModal}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 18,
                      color: '#077EE9',
                    }}>
                    Add
                  </Text>
                </TouchableOpacity>
              )}
              onSubmitGetUrl={uploadImageHandler}
            />
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 36,
                marginTop: 15,
              }}>
              Photos & Video
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 18,
                marginTop: 8,
              }}>
              {photosList.length} added
            </Text>
          </View>

          {selectedPhotoCover && (
            <View style={{ marginTop: 40 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 20,
                }}>
                <Text
                  style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 20 }}>
                  Cover Photo
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    nextpage(1);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 16,
                      color: '#FF7AA2',
                    }}>
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  nextpage(3);
                  setImageToEdit(PersonImage);
                }}>
                <Image
                  source={{
                    uri: `${Host}/${selectedPhotoCover
                      .replace('public', '')
                      .replace('\\\\', '/')}`,
                  }}
                  style={{
                    height: 260,
                    width: '100%',
                    borderRadius: 12,
                    marginTop: 20,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={{ marginTop: 60 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              }}>
              <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 20 }}>
                Media Order
              </Text>
              <TouchableOpacity onPress={() => nextpage(2)}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 16,
                    color: '#FF7AA2',
                  }}>
                  Change
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                // flexDirection: 'row',
                // alignItems: 'center',
                // justifyContent:'flex-start',
                // flexWrap: 'wrap',
              }}>
              <FlatList
                data={photosList}
                keyExtractor={(e) => e.toString()}
                numColumns={2}
                renderItem={({ item, index }) => {
                  if (item != 'to-add')
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          // nextpage(3);
                          // setImageToEdit(PersonImage);
                        }}
                        style={{ flex: 1, height: 150, mWidth: 100 }}>
                        <Image
                          source={{
                            uri: `${Host}/${item.toString()
                              .replace('public', '')
                              .replace('\\\\', '/')}`,
                          }}
                          style={{
                            height: 140,
                            borderRadius: 12,
                            maxWidth:200,
                            alignContent:'center',
                            margin: '2%',
                            flex:1
                          }}
                        />
                      </TouchableOpacity>
                    );
                }}
              />
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderWidth: 2,
                  borderStyle: 'dotted',
                  marginTop: '4%',
                  borderRadius: 12,
                  height: 150,
                  minWidth: 100,
                  justifyContent: 'center',
                }}>
                <UploadDocsCompo
                  Component={({ openModal }) => (
                    <TouchableOpacity onPress={openModal}>
                      <View style={{ alignItems: 'center' }}>
                        <MaterialAntDesignIcon
                          name="plus"
                          color="#339999"
                          size={28}
                        />
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Regular',
                            fontSize: 16,
                            color: '#339999',
                          }}>
                          Add
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  onSubmitGetUrl={uploadImageHandler}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      <View key="1">
        <ScrollView
          style={{
            backgroundColor: '#fff',
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}>
          <View style={{ marginBottom: 30 }}>
            <TouchableOpacity onPress={() => nextpage(0)}>
              <MaterialAntDesignIcon name="left" size={30} color="#000" />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 28,
                marginLeft: 23,
                marginRight: 80,
              }}>
              Select cover photo
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 16,
                marginTop: 8,
                marginLeft: 23,
              }}>
              Choose one that best highlights your facility
            </Text>
          </View>

          <View>
            <FlatList
              data={photosList}
              keyExtractor={(e) => e.toString()}
              numColumns={2}
              renderItem={({ item, index }) => {
                if (item != 'to-add') {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        updateCoverPhoto(item);
                      }}
                      style={{ flex: 1, position: 'relative' }}>
                      {/* <Image
                        source={{
                          uri: `${Host}/${item
                            .replace('public', '')
                            .replace('\\\\', '/')}`,
                        }}
                        style={{
                          height: 110,
                          borderRadius: 12,
                          width: '92%',
                          alignSelf: 'center',
                          marginTop: '6%',
                          borderWidth: 2,
                          borderColor:
                            selectedPhotoCover == item ? '#EA1A65' : '#fff',
                        }}
                      /> */}
                      {selectedPhotoCover == item && (
                        <View
                          style={{ position: 'absolute', top: 30, right: 26 }}>
                          <MaterialAntDesignIcon
                            name="checkcircle"
                            size={20}
                            color="#EA1A65"
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                }
              }}
            />
          </View>
        </ScrollView>
      </View>

      <View
        key="2"
        style={{
          backgroundColor: '#fff',
          paddingVertical: 20,
          // paddingHorizontal: 20,
        }}>
        <View style={{ marginBottom: 30, paddingHorizontal: 16 }}>
          <TouchableOpacity onPress={() => nextpage(0)}>
            <MaterialAntDesignIcon name="left" size={30} color="#000" />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 28,
              marginLeft: 23,
              marginRight: 80,
            }}>
            Change photo order
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 16,
              marginTop: 8,
              marginLeft: 23,
            }}>
            Drag {'&'} Drop photos to place them in order you’d like them to
            appear
          </Text>
        </View>

        <TestCompo
          ReArrangePhoto={ReArrangePhoto}
          setPhotos={setPhotoList}
          photos={photosList}
        />
      </View>

      <View key="3" style={{ paddingVertical: 20, backgroundColor: '#fff' }}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                nextpage(0);
                setImageToEdit(null);
              }}>
              <MaterialAntDesignIcon name="left" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 16,
                  marginLeft: 17,
                }}>
                Updated 2 months ago
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ position: 'relative' }}>
            <Image
              source={imageToEdit}
              style={{ width: '100%', marginTop: 30, height: 280 }}
            />
            <TouchableOpacity
              onPress={() => nextpage(1)}
              style={{ position: 'absolute', bottom: 15, right: 15 }}>
              <Image style={{ width: 44, height: 44 }} source={PencilPng} />
            </TouchableOpacity>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                marginHorizontal: 20,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 16,
                  marginLeft: 17,
                }}>
                Caption
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsEditing(!isEditing);
                  LayoutAnimation.easeInEaseOut();
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 16,
                    marginLeft: 17,
                    color: '#FF7AA2',
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
              {isEditing ? (
                <InsetShadow
                  shadowOpacity={1}
                  shadowOffset={15}
                  containerStyle={{
                    height: 100,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}
                  elevation={12}>
                  <TextInput
                    value={caption}
                    style={{
                      height: 100,
                      textAlignVertical: 'top',
                      color: '#666666',
                      fontFamily: 'Montserrat-Regular',
                    }}
                    onChange={(e) => setCaption(e)}
                  />
                </InsetShadow>
              ) : (
                <Text
                  style={{
                    color: '#666666',
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  {caption}
                </Text>
              )}
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: '#ABABAB',
                marginVertical: 20,
              }}
            />
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 20,
                  marginLeft: 25,
                  color: '#339999',
                }}>
                Delete this photo
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ViewPager>
  );
}
