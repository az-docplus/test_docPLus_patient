import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import PicturelessAvatar from '../../../../components/atoms/PicturelessAvatar/PicturelessAvatar';
import { UpdateDoctorProfile } from '../../../../reduxV2/action/DoctorAction';
import { Host } from '../../../../utils/connection';
import UploadDocsCompo from '../__Components/Upload-documents';
// import { Host } from '../../../../utils/connection';
export default function Photo({ doctorProfile }) {
  const dispatch = useDispatch();
  useEffect(() => {
    //console.log("doctorProfile : ", Object.keys(doctorProfile))
    Object.keys(doctorProfile).forEach((val) => {
      console.log(val, ' : ', doctorProfile[val]);
    });
  }, []);
  //   const [selectedCoverPhoto, setSelectedPhotoCover] = useState(
  //     doctorProfile['coverPhoto'],
  //   );
  console.log('=============>>>>>>>>>>>#########', doctorProfile);
  const updateProfilePicture = (url) => {
    // const imgURL = `${url?.replace('public', '')?.replace('\\\\', '/')}`;
    const dataToUpdate = {
      id: doctorProfile?._id,
      coverPhoto: url,
    };
    dispatch(
      UpdateDoctorProfile(
        dataToUpdate,
        () => {
          setSelectedPhotoCover(imgURL);
        },
        (e) => {
          console.log('error in saving :::::>>> ', e);
        },
      ),
    );
  };
  const image =
    doctorProfile?.picture?.length > 0 ? (
      <View
        style={{ elevation: 15, backgroundColor: 'red', borderRadius: 100 }}>
        <Image
          source={{
            uri: `${Host}${doctorProfile?.picture[0]
              ?.replace('public', '')
              .replace('\\\\', '/')}`,
          }}
          style={{ height: 120, width: 120, borderRadius: 100 }}
        />
      </View>
    ) : (
      <PicturelessAvatar
        style={{ height: 120, width: 120, borderRadius: 100 }}
        textStyle={{ fontSize: 32 }}
        text={`${doctorProfile.firstName[0]} ${doctorProfile.lastName[0]}`}
      />
    );
  return (
    <View>
      <View
        style={{
          backgroundColor: '#F9FAFD',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 40,
          paddingHorizontal: 25,
          paddingBottom: 50,
        }}>
        <View style={{}}>
          <Text style={{ fontFamily: 'Gilroy-Medium', fontSize: 20 }}>
            Perfect!
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 24,
              color: '#077EE9',
              textTransform: 'capitalize',
            }}>
            Dr. {doctorProfile.basic.name}
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontFamily: 'Gilroy-Medium', fontSize: 16 }}>
              Please
            </Text>
            <Text
              style={{
                color: '#EE296E',
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 16,
              }}>
              Complete your Profile
            </Text>
          </View>
        </View>
        <View>
          <View 
          style={{
            backgroundColor: 'lightgrey',
            borderRadius: 100,
          }}
          >{image}</View>
          <View>
            <UploadDocsCompo
              Component={({ openModal }) => (
                <TouchableOpacity onPress={openModal}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Medium',
                      fontSize: 16,
                      color: '#077EE9',
                      textAlign: 'center',
                      marginTop: 0,
                    }}>
                    Edit
                  </Text>
                </TouchableOpacity>
              )}
              onSubmitGetUrl={(e) => {
                updateProfilePicture(e.data);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
