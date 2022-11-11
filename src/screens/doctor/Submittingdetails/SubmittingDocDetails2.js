import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { UpdateDoctorProfile } from '../../../reduxV2/action/DoctorAction';
import ViewPager from '@react-native-community/viewpager';
import LinearGradient from 'react-native-linear-gradient';
import HeadersCompo from './__Components/Header';

import SecOnePhoto from './ViewOne-contents/one-photo';
import SecTwoPhotoGallery from './ViewOne-contents/two-photos_gallery';
import SecThreePersonalInfo from './ViewOne-contents/three-personal_info';
import SecFourRegistrationDetail from './ViewOne-contents/four-registration_details';
import SecAvailablityCompo from './ViewOne-contents/Availablity';
import SpecialitiesCompo from './ViewOne-contents/five-specialCompo';
import HospitalAffiliationCompo from './ViewOne-contents/Hospital-affiliation';
import ClinicsCompo from './ViewOne-contents/Clinic';
import EducationDetailCompo from './ViewOne-contents/Education-detail';

// edit components
import EditSecTwoPhotoGallery from './ViewTwo-contents/Edit-two-Photo_gallery';
import EditSecThreePersonalInfo from './ViewTwo-contents/Edit-three-personal_info';
import EditSecRegistrationDetails from './ViewTwo-contents/Edot-four-registration_details';
import EditSecTimeAavailablity from './ViewTwo-contents/Edit-availabilty-times';
import EditSecSpeciality from './ViewTwo-contents/Edit-speciality';
import EditHospitalAffiliations from './ViewTwo-contents/Edit-hospital-affiliation';
import EditLanguageCompo from './ViewTwo-contents/Edit-languages';
import EditClinicCompo from './ViewTwo-contents/Edit-clinic';
import EditEducationDetail from './ViewTwo-contents/Educations-edits/Edit-education';
import EditQualificationEducation from './ViewTwo-contents/Educations-edits/edit-qualification';

export default function SubmittingDocDetails2({ navigation }) {
  const { doctorProfile } = useSelector((state) => state.DoctorReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [updateComponent, setUpdateComponent] = useState(false);
  const pagerRef = useRef(null);
  const nextpage = (page) => {
    if (pagerRef) {
      pagerRef.current.setPage(page);
    }
  };
  // whatToEdituseEffect(() => {
  //     console.log("doctorProfile : ", Object.keys(doctorProfile))
  // }, [])
  const updateDoctorInfo = () => {
    setLoading(true);
    const dataToUpdate = {
      id: doctorProfile?._id,
      onBoarding: true,
    };
    dispatch(
      UpdateDoctorProfile(
        dataToUpdate,
        () => {
          //   setPhotoList([...doctorProfile['picture'], imgURL]);
          setLoading(false);
        },
        (e) => {
          console.log('error in saving :::::>>> ', e);
          setLoading(false);
        },
      ),
    );
  };
  console.log('==============>>>>>>>>>>>>>>', doctorProfile);
  const [whatToEdit, setWhatToEdit] = useState(null);
  const [lastScreen, setLastScreen] = useState(null);
  const [education, setEducation] = useState(null);
  const [editQualification, setEditQualification] = useState({
    isEdit: false,
    title: '',
    university: '',
    year: '',
  });
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const handleBackButtonClick = (page) => {
    nextpage(page ? page : 0);
    return true;
  };

  const backAction = () => {
    if (doctorProfile?.onBoarding) navigation.goBack();
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <ViewPager
      ref={pagerRef}
      style={{ flex: 1 }}
      initialPage={0}
      scrollEnabled={false}>
      <View key="0">
        <ScrollView style={{ backgroundColor: '#fff' }}>
          {/* {doctorProfile?.onBoarding && (
            <HeadersCompo
              title="Profile"
              hideIcon
              viewStyle={{
                marginVertical: 20,
                marginTop: 30,
              }}
              backHandler={() => {
                navigation.goBack();
              }}
            />
          )} */}
          <SecOnePhoto doctorProfile={doctorProfile} />
          <SecTwoPhotoGallery
            editHandler={() => {
              nextpage(1);
              setWhatToEdit('photo-gallery');
            }}
            doctorProfile={doctorProfile}
          />
          <SecThreePersonalInfo
            editLanguage={() => {
              nextpage(1);
              setWhatToEdit('edit-languages');
              setLastScreen('one');
            }}
            editHandler={() => {
              nextpage(1);
              setWhatToEdit('personal-info');
            }}
            doctorProfile={doctorProfile}
          />
          <SpecialitiesCompo
            editHandler={() => {
              nextpage(1);
              setWhatToEdit('edit-speciality');
            }}
            doctorProfile={doctorProfile}
          />
          <SecFourRegistrationDetail
            editHandler={() => {
              nextpage(1);
              setWhatToEdit('registration-details');
            }}
            doctorProfile={doctorProfile}
          />
          <EducationDetailCompo
            doctorProfile={doctorProfile}
            editQualification={(e) => {
              setWhatToEdit('edit-qualification-education');
              nextpage(1);
              setEducation(e);
            }}
            editCredentials={(e) => {
              setWhatToEdit('edit-credentials-education');
              nextpage(1);
              setEducation(e);
            }}
            goToEdit={() => {
              nextpage(1);
              setWhatToEdit('edit-qualification-education');
            }}
            setEditQualification={(e) => {
              setEditQualification(e);
            }}
          />
          <HospitalAffiliationCompo
            updateComponent={updateComponent}
            editHandler={() => {
              nextpage(1);
              setWhatToEdit('edit-hospital-affiliation');
            }}
            doctorProfile={doctorProfile}
          />
          <ClinicsCompo
            editHandler={() => {
              nextpage(1);
              setWhatToEdit('edit-clinic');
            }}
            doctorProfile={doctorProfile}
          />
          <SecAvailablityCompo
            editHandler={() => {
              nextpage(1);
              setWhatToEdit('edit-availabilty-times');
            }}
            doctorProfile={doctorProfile}
          />

          <LinearGradient
            start={{ x: 1, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[
              loading ? '#94B9C0' : '#2D7D8E',
              loading ? '#94B9C0' : '#246370',
            ]}
            style={{
              flex: 1,
              marginHorizontal: 40,
              borderRadius: 50,
              marginTop: 40,
              marginBottom: 60,
              elevation: 10,
            }}>
            <TouchableOpacity disabled={loading} onPress={updateDoctorInfo}>
              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  textAlign: 'center',
                  fontSize: 20,
                  color: '#fff',
                  paddingVertical: 15,
                }}>
                {doctorProfile.onBoarding ? 'Save' : 'Save & Continue'}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </View>

      <View key="1">
        {whatToEdit == 'photo-gallery' && (
          <EditSecTwoPhotoGallery
            backToPageOne={() => {
              nextpage(0);
              handleBackButtonClick();
            }}
            doctorProfile={doctorProfile}
          />
        )}
        {whatToEdit == 'personal-info' && (
          <EditSecThreePersonalInfo
            editLanguages={() => {
              nextpage(1);
              setWhatToEdit('edit-languages');
              setLastScreen('two');
            }}
            backToPageOne={() => {
              nextpage(0);
              handleBackButtonClick();
            }}
            doctorProfile={doctorProfile}
          />
        )}
        {whatToEdit == 'registration-details' && (
          <EditSecRegistrationDetails
            backToPageOne={() => {
              nextpage(0);
              handleBackButtonClick();
            }}
            doctorProfile={doctorProfile}
          />
        )}
        {whatToEdit == 'edit-availabilty-times' && (
          <EditSecTimeAavailablity
            backToPageOne={() => {
              nextpage(0);
              handleBackButtonClick();
            }}
            doctorProfile={doctorProfile}
          />
        )}
        {whatToEdit == 'edit-speciality' && (
          <EditSecSpeciality
            backToPageOne={() => {
              nextpage(0);
              handleBackButtonClick();
            }}
            doctorProfile={doctorProfile}
          />
        )}
        {whatToEdit == 'edit-hospital-affiliation' && (
          <EditHospitalAffiliations
            backToPageOne={() => {
              nextpage(0);
              handleBackButtonClick();
            }}
            setUpdateComponent={setUpdateComponent}
            updateComponent={updateComponent}
            doctorProfile={doctorProfile}
          />
        )}
        {whatToEdit == 'edit-clinic' && (
          <EditClinicCompo
            backToPageOne={() => {
              nextpage(0);
              handleBackButtonClick();
            }}
            doctorProfile={doctorProfile}
          />
        )}
        {whatToEdit == 'edit-languages' && (
          <EditLanguageCompo
            lastScreen={lastScreen}
            backToPageOne={(e) => {
              if (e == 'one') {
                nextpage(0);
                handleBackButtonClick();
              } else {
                nextpage(1);
                setWhatToEdit('personal-info');
                handleBackButtonClick(1);
              }
            }}
            doctorProfile={doctorProfile}
          />
        )}

        {whatToEdit == 'edit-qualification-education' && (
          <EditQualificationEducation
            backToPageOne={() => {
              nextpage(0);
              setEditQualification({
                isEdit: false,
                title: '',
                university: '',
                year: '',
              });
              handleBackButtonClick();
            }}
            doctorProfile={doctorProfile}
            setEditQualification={setEditQualification}
            editQualification={editQualification}
          />
        )}
        {whatToEdit == 'edit-credentials-education' && (
          <EditEducationDetail
            backToPageOne={() => {
              nextpage(0);
              handleBackButtonClick();
            }}
            doctorProfile={doctorProfile}
            education={education}
            setEducation={setEducation}
          />
        )}
      </View>
    </ViewPager>
  );
}
