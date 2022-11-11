import React, {useEffect} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import SolidHeader from '../../../components/organisms/SolidHeader/SolidHeader';
import ToggleButton from '../../../components/molecules/ToggleButton/ToggleButton';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import Filter from '../../../assets/svg/filter.svg';
import BasicCard from '../../../components/atoms/BasicCard/BasicCard';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Section from '../../../components/molecules/Section/Section';
import AvailDoctorContainerV2 from '../../../components/molecules/AvailDoctorContainer/AvailDoctorContainerV2';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDoctorLite} from '../../../redux/action/doctoreAction';

function FindADoctor() {
  const {loading, doctors} = useSelector((state) => state.DoctorReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    // !loading && dispatch(fetchDoctorLite({}, 0, false));
  });
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <SolidHeader
        style={{
          Container: {
            height: '40%',
            zIndex: 9999,
          },
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 25,
            marginBottom: 5,
            height: '25%',
          }}>
          <View style={{flex: 4}}>
            <Text
              style={{
                color: '#ddd',
                fontSize: 20,
                lineHeight: 32,
                letterSpacing: 0.8,
              }}>
              Find a
            </Text>
            <Text
              style={{
                color: '#fafafa',
                fontSize: 42,
                lineHeight: 48,
                fontWeight: 'bold',
                letterSpacing: 1,
              }}>
              Doctor
            </Text>
          </View>
          <View style={{flex: 2, justifyContent: 'flex-end'}}>
            <ToggleButton
              text0="schedule"
              text1="SCHEDULE"
              style={{paddingVertical: 4}}
              textStyle={{fontSize: 12, color: '#3873CD', fontWeight: '500'}}
              dotStyle={{backgroundColor: '#FF9B31', height: 25, width: 25}}
            />
          </View>
        </View>
        <View
          style={{
            height: '30%',
            paddingHorizontal: 25,
            justifyContent: 'center',
          }}>
          <SearchBarSolid withIcon icon={<Filter height={24} width={24} />} />
        </View>
        <View
          style={{
            height: '50%',
            position: 'absolute',
            bottom: '0%',
            transform: [{translateY: 80}],
          }}>
          <ScrollView
            horizontal
            style={{zIndex: 99999}}
            contentContainerStyle={{paddingVertical: 8, paddingHorizontal: 25}}>
            <BasicCard
              style={{
                CardContainer: {
                  elevation: 10,
                  justifyContent: 'space-around',
                  paddingHorizontal: 25,
                  height: 120,
                },
              }}>
              <Fontisto name="doctor" size={28} color={'#FF9B31'} />
              <Text
                style={{fontSize: 18, color: '#3873CD', fontWeight: 'bold'}}>
                Family physicians
              </Text>
            </BasicCard>

            <BasicCard
              style={{
                CardContainer: {
                  elevation: 10,
                  justifyContent: 'space-around',
                  paddingHorizontal: 25,
                  height: 120,
                },
              }}>
              <Fontisto name="doctor" size={28} color={'#FF9B31'} />
              <Text
                style={{fontSize: 18, color: '#3873CD', fontWeight: 'bold'}}>
                Family physicians
              </Text>
            </BasicCard>

            <BasicCard
              style={{
                CardContainer: {
                  elevation: 10,
                  justifyContent: 'space-around',
                  paddingHorizontal: 25,
                  height: 120,
                },
              }}>
              <Fontisto name="doctor" size={28} color={'#FF9B31'} />
              <Text
                style={{fontSize: 18, color: '#3873CD', fontWeight: 'bold'}}>
                Family physicians
              </Text>
            </BasicCard>
          </ScrollView>
        </View>
      </SolidHeader>
      <Section
        style={{
          Container: {marginTop: 80},
          Text: {
            letterSpacing: 0.5,
            fontWeight: '700',
          },
        }}
        HeaderText={'Our doctors'}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          doctors.map((item) => {
            <AvailDoctorContainerV2 />;
          })
        )}
      </Section>
    </View>
  );
}

export default FindADoctor;
