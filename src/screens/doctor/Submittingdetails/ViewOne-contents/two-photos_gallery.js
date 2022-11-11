import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import { useDispatch } from 'react-redux';
import PersonImage from '../../../../assets/jpg/person2.jpg';
import { Host } from '../../../../utils/connection';
import { UpdateDoctorProfile } from '../../../../reduxV2/action/DoctorAction';

export default function PhotosGallery({ doctorProfile, editHandler }) {
  const dispatch = useDispatch();
  const [selectedPhotoCover, setSelectedPhotoCover] = useState(
    doctorProfile['coverPhoto'],
  );

  console.log('=====================')

  useEffect(() => {
    // Object.keys(doctorProfile).forEach((e, i) => {
    //     console.log(i + 1, " : ", e, " :: ", doctorProfile[e])
    // })
    //  console.log("doctorProfile : ", doctorProfile.picture)
  }, []);

  return (
    <View>
      <View
        style={{
          marginTop: -15,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          backgroundColor: 'white',
          elevation: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
            marginTop: 20,
            marginHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 18,
              }}>
              Photos and Videos
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-Medium',
                fontSize: 14,
                marginLeft: 10,
                color: '#999999',
                marginTop: 2,
              }}>
              {doctorProfile['picture']?.length} added
            </Text>
          </View>

          <TouchableOpacity onPress={editHandler}>
            <View
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
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{ marginBottom: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {doctorProfile['picture'].map((val, index) => {
            {
              /* console.log('url : ', val); */
            }
            {
              /* if (index === 0) {
                return (
                  <View>
                    <Imagesrectangle imgs={val} />
                    <Text
                      style={{
                        position: 'absolute',
                        top: 30,
                        left: 30,
                        backgroundColor: '#fff',
                        color: '#FF7AA2',
                        paddingVertical: 3,
                        paddingHorizontal: 8,
                        borderRadius: 4,
                      }}>
                      Cover Photo
                    </Text>
                  </View>
                );
              } else if (val !== doctorProfile['coverPhoto']) */
            }
            return (
              <Imagesrectangle
                imgs={val}
                coverPhoto={val === selectedPhotoCover}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const Imagesrectangle = ({coverPhoto, imgs}) => {
  return (
    <View style={{ marginTop: 10, marginBottom: 20, position: 'relative' }}>
      {/* <View style={{backgroundColor:'red'}}> */}
      <Image
        style={{
          height: 130,
          width: 180,
          marginLeft: 20,
          marginTop: 5,
          borderRadius: 13,
        }}
        source={{
          uri: `${Host}${imgs
            .toString()
            .replace('public','')
            .replace('\\\\', '')
            }`,
        }}
      />
      {/* </View> */}
      {coverPhoto ? (
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 10,
            paddingVertical: 5,
            left: 30,
            top: 20,
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: '#EA1A65',
              fontFamily: 'Gilroy-Medium',
              fontSize: 12,
              textAlign: 'center',
            }}>
            Cover Photo
          </Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
