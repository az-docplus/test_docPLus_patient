import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {BLACK, GREY_BACKGROUND} from '../../../styles/colors';
import ClinicList from '../../../components/molecules/Clincs/Clinic';
import NewItem from '../../../components/molecules/MedicalHistory/CustomTextButton';
//import AddClinic from '../../../components/molecules/Modal/AddClinic';
import {useSelector, useDispatch} from 'react-redux';
import {GetClinics, AddClinics} from '../../../reduxV2/action/DoctorAction';
import {ListingWithThumbnailLoader} from '../../../components/atoms/Loader/Loader';
import LottieView from 'lottie-react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';
import {Local, setLocale} from '../../../i18n';
import {Colors} from '../../../styles/colorsV2';
// {Local("patient.my_profile.medical_history")}

const Logs = ({navigation, route}) => {
  const { theme } = useSelector(
    (state) => state.AuthReducer,
  );
  const {item, unit} = route.params;
  let {meta} = route.params;
  console.log(meta, 'mmmmmmmmmmmmmm');
  if (meta && item === 'Blood Pressure') {
    meta = meta.filter((item) => {
      if (item.systolic && item.dialostic) return item;
    });
  }

  if (meta && item === 'Blood Sugar') {
    meta = meta.filter((item) => {
      if (JSON.parse(item.value).mg) return item;
    });
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.primary_background[theme]}}>
      <TopNavBar
        navigation={navigation}
        headerText={`${Local("patient.medical_history.medical_history")}`}></TopNavBar>
      {/* <AddClinic
        visible={modalVisible}
        onCancel={() => setVisible(false)}
        onUpdate={onUpdate}
      /> */}
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}>
        {meta &&
          meta.map((w, i) => (
            <View
              key={i}
              style={{
                // backgroundColor: 'white',
                backgroundColor: Colors.secondary_background[theme],
                paddingHorizontal: 20,
                borderRadius: 13,
                marginVertical: 10,
                elevation: 2,
                flexDirection: 'row',
                paddingVertical: 15,
              }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      color: Colors.primary_text_color[theme],
                      fontSize: 16,
                      paddingVertical: 4,
                    }}>
                    {item === 'Weight' ||
                    item === 'Temperature' ||
                    item == 'Heart Rate'
                      ? `${item} : ${w.value} ${unit}`
                      : item === 'Blood Pressure'
                      ? `Systolic : ${w.systolic}, Diastolic : ${w.dialostic} `
                      : item === 'Blood Sugar'
                      ? `BloodSugar : ${JSON.parse(w.value).mg} mg/dL`
                      : ''}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      color: Colors.primary_text_color[theme],
                      fontSize: 11,
                      paddingVertical: 4,
                    }}>
                    {Local("patient.medical_history.recorded_on")} : {moment(w.date).format("DD MMM 'YY")}
                  </Text>
                </View>

                <View
                  style={{
                    marginLeft: 'auto',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      color: Colors.primary_text_color[theme],
                      fontSize: 11,
                      paddingVertical: 4,
                    }}>
                    {Local("patient.medical_history.modified_by")} : {w.modifiedBy}
                  </Text>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default Logs;
