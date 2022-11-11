// import {Local} from '../../../i18n';
// import {
//   GetReviews,
//   AddReviews,
//   AddLastRouteMemory,
//   saveNewUser,
// } from '../../../reduxV2/action/AuthAction';
// import {GetPatientInfo} from '../../../reduxV2/action/PatientAction';
// import BasicCard from '../../atoms/BasicCard/BasicCard';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AvailDoctorContentV2 from '../AvailDoctorContent/AvailDoctorContentV2';
import ProfilePic from '../../atoms/ProfilePic/ProfilePic';
import { Host } from '../../../utils/connection';
import { useSelector } from 'react-redux';
import { Colors } from '../../../styles/colorsV2';
import PicturelessAvatar from '../../atoms/PicturelessAvatar/PicturelessAvatar';

function AvailDoctorContainerV2({
  name,
  schedule,
  navigation,
  data,
  toggle,
  setConsultLoading,
}) {
  const { theme } = useSelector((state) => state.AuthReducer);
  let imageSource = require('../../../assets/images/dummy_profile.png');
  return (
    <View
      style={[
        Styles.container,
        {
          backgroundColor: Colors.secondary_background[theme],
        },
      ]}>
      {/* {console.log(`${Host}${data?.coverPhoto??.replace('public', '')?.replace('\\\\', '/')}`, "sdklfjsdklfjskldfj")} */}
      {/* {console.log(data.picture)} */}
      <AvailDoctorContentV2
        toggle={toggle}
        DoctorName={`Dr. ${name}`}
        rating={4}
        Specialization={data.specialty || 'General Dentist'}
        schedule={schedule}
        navigation={navigation}
        data={data}
        setConsultLoading={setConsultLoading}
        Profile={
          data?.picture?.length ? (
            <ProfilePic
              sourceurl={
                data?.picture?.length > 0
                  ? {
                      uri: `${Host}${data?.coverPhoto?.replace('public', '')
                        .replace('\\\\', '/')}`,
                    }
                  : imageSource
              }
              style={{
                Container: {
                  height: 60,
                  width: 60,
                  borderRadius: 60,
                },
                Image: {
                  borderRadius: 60,
                },
              }}
            />
          ) : (
            <PicturelessAvatar
              style={{
                color: '#000',
                backgroundColor: '#f9f9f9',
                height: 65,
                width: 65,
                borderRadius: 60,
              }}
              text={`${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`}
            />
          )
        }
      />
      {/* {console.log(`${data?.name?.split(" ")[0]}${data?.name?.split(" ")[1]}`, "sldfjsdlkfjsdlkfjsdklfj")} */}
    </View>
  );
}

const Styles = StyleSheet.create({
  AvailableDoctorsCardContainer: {
    marginTop: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '93%',
    alignSelf: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#dddbdb',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginBottom: '3%',
    paddingVertical: '5%',
    paddingHorizontal: '2%',
  },
});
export default AvailDoctorContainerV2;
