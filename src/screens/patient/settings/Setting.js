import React, {useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {View, SafeAreaView, Text} from 'react-native';
import _ from 'lodash';

import DmzHeader from '../../../components/organisms/DmzHeader/DmzHeader';
import CardGrid from '../../../components/molecules/CardGrid/CardGrid';
import CardInCol from '../../../components/molecules/CardInCol/CardInCol';
import CardInRow from '../../../components/molecules/CardInRow/CardInRow';
import CardBar from '../../../components/molecules/CardBar/CardBar';
import Section from '../../../components/molecules/Section/Section';
import ProfileCol from '../../../components/molecules/ProfileCol/ProfileCol';
import Container from '../../../components/organisms/Container/Container';

import PatientPurchase from './PatientPurchase.screen';
import PatientHealthInfo from './PatientHelthInfo';
import BottomNavigationComponent from '../../../components/old/BottomNavigation/BottomNavigation.component';

import {
  ListingWithThumbnailLoader,
  RowLoader,
} from '../../../components/atoms/Loader/Loader';

import {useDispatch, useSelector} from 'react-redux';
import {
  GetPatientInfo,
  resetUserAccountReducer,
} from '../../../redux/action/patientAccountAction';

const Setting = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    isPatientAccountReducerLoading,
    patient,
    patientFavDoc,
    errorInPatientAccountReducer,
  } = useSelector(state => state.PatientAccountReducer);
  const {isLogedin, isDoctor, data} = useSelector(state => state.AuthReducer);

  useEffect(() => {
    console.log(
      ',,,,,,,,,,,,,,,,,,,,,333333333333333333333333,,,,,,,,,,,,,,,,',
    );
    console.log('From Setting.', data.id);
    dispatch(GetPatientInfo(data.id));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {isPatientAccountReducerLoading ? (
          <RowLoader />
        ) : (
          <DmzHeader
            name={patient.firstName || 'loading...'}
            age={Math.abs(
              new Date().getFullYear() -
                parseInt(patient.dob ? patient.dob.slice(6, 10) : 0),
            )}
          />
        )}
        <Container
          style={{
            height: '100%',
            transform: [{translateY: -40}],
            zIndex: 999,
          }}>
          <CardGrid />
          <Section HeaderText="My Appointments">
            {isPatientAccountReducerLoading ? (
              <ListingWithThumbnailLoader />
            ) : (
              <CardInCol>
                {// TODO: now we r shoing the old appointments
                patient.appointments
                  .filter(row => new Date(row.bookedFor) < new Date())
                  .map(row => {
                    return <CardBar name={row.doctor.basic.first_name} />;
                  })}
              </CardInCol>
            )}
          </Section>
          <Section HeaderText="My Favourite Doctors">
            <ScrollView horizontal={true}>
              <CardInRow
                style={{
                  paddingTop: 15,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingBottom: 8,
                  borderTopWidth: 1,
                  BorderBottomWidth: 1,
                  borderColor: '#F2EBEB',
                }}>
                {/* {isPatientAccountReducerLoading ? (
                <RowLoader />
              ) : patientFavDoc.map(fev => (
                // <ProfileCol
                //   sourceurl={require('../../../assets/jpg/person1.jpg')}
                //   ProfileName={(fev.basic.first_name + ' ' + fev.basic.last_name)}
                //   ProfileEmail="scarlet123@gmail.com"
                // />
                <ProfileCol
                  sourceurl={require('../../../assets/jpg/person1.jpg')}
                  ProfileName="Scarlet Emini"
                  ProfileEmail="scarlet123@gmail.com"
                />
              ))
              } */}
                {patient.favourites
                  ? patient.favourites.map(fev => (
                      <ProfileCol
                        onPress={() =>
                          navigation.navigate('docPatientStrem', {data: fev})
                        }
                        sourceurl={require('../../../assets/jpg/person1.jpg')}
                        ProfileName={
                          fev.basic.first_name + ' ' + fev.basic.last_name
                        }
                        ProfileEmail={fev.basic.email}
                      />
                    ))
                  : null}
                <ProfileCol
                  sourceurl={require('../../../assets/jpg/person1.jpg')}
                  ProfileName={'just'}
                  ProfileEmail={'email'}
                />
                <ProfileCol
                  sourceurl={require('../../../assets/jpg/person1.jpg')}
                  ProfileName={'just'}
                  ProfileEmail={'email'}
                />
                <ProfileCol
                  sourceurl={require('../../../assets/jpg/person1.jpg')}
                  ProfileName={'just'}
                  ProfileEmail={'email'}
                />
                <ProfileCol
                  sourceurl={require('../../../assets/jpg/person1.jpg')}
                  ProfileName={'just'}
                  ProfileEmail={'email'}
                />
                <ProfileCol
                  sourceurl={require('../../../assets/jpg/person1.jpg')}
                  ProfileName={'just'}
                  ProfileEmail={'email'}
                />
              </CardInRow>
            </ScrollView>
          </Section>
          {isPatientAccountReducerLoading ? (
            <ListingWithThumbnailLoader />
          ) : (
            <PatientPurchase
              height={
                _.isUndefined(patient.height)
                  ? parseInt(patient.height.value.split(' ')[0])
                  : 0
              }
              weight={parseInt(patient.weight.value) || 0}
            />
          )}
          {isPatientAccountReducerLoading ? (
            <ListingWithThumbnailLoader />
          ) : (
            <PatientHealthInfo
              bloodPressure={patient.bloodPressure.value || 0}
              temperature={patient.temperature.value || 0}
              respiration={patient.respiration.value || 0}
              oxygen={patient.oxygen.value || 0}
              heartRate={patient.heartRate.value || 0}
            />
          )}
        </Container>
      </ScrollView>
      <BottomNavigationComponent activeOption={3} navigation={navigation} />
    </SafeAreaView>
  );
};

export default Setting;
