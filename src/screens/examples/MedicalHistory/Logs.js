import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, BackHandler} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import moment from 'moment';
import {Local, setLocale} from '../../../i18n';
import {Colors} from '../../../styles/colorsV2';
// {Local("patient.my_profile.medical_history")}

const Logs = ({navigation, route}) => {
  const {theme} = useSelector((state) => state.AuthReducer);
  const {item, unit} = route.params;
  let {meta} = route.params;
  if (meta && item === 'Blood Pressure') {
    meta = meta.filter((item) => {
      if (item.systolic && item.dialostic) return item;
    });
  }

  if (meta && item === 'Blood Sugar') {
    meta = meta.filter((item) => {
      if (item.mg) return item;
    });
  }

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={{flex: 1, backgroundColor: Colors.primary_background[theme]}}>
      <TopNavBar
        onLeftButtonPress={() => navigation.navigate('MedicalHistory')}
        navigation={navigation}
        headerText={`${Local(
          'patient.medical_logs.medical_logs',
        )}`}></TopNavBar>
      {/* <AddClinic
        visible={modalVisible}
        onCancel={() => setVisible(false)}
        onUpdate={onUpdate}
      /> */}
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          flex: 1,
        }}>
        {meta?.length > 0 ? (
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
                <View
                  style={
                    {
                      // paddingTop: 8
                    }
                  }>
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
                      ? `Blood Sugar : ${
                          // JSON.parse(w.value).mg
                          w.mg
                        } mg/dL`
                      : ''}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Regular',
                          color: Colors.primary_text_color[theme],
                          fontSize: 11,
                          paddingVertical: 4,
                        }}>
                        {Local('patient.medical_history.recorded_on')} :{' '}
                        {moment(w.date).format("DD MMM 'YY")}
                      </Text>
                    </View>
                    <View
                      style={{
                        left: 80,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Regular',
                          color: Colors.primary_text_color[theme],
                          // marginLeft: "auto",
                          fontSize: 11,
                          paddingVertical: 4,
                          // paddingBottom: 30
                        }}>
                        {Local('patient.medical_history.modified_by')} :{' '}
                        {w.modifiedBy}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* <View
                  style={{
                    marginLeft: 'auto',
                    
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      color: Colors.primary_text_color[theme],
                      fontSize: 11,
                      paddingVertical: 4,
                      // paddingBottom: 30
                    }}>
                    {Local("patient.medical_history.modified_by")} : {w.modifiedBy}
                  </Text>
                </View> */}
              </View>
            </View>
          ))
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>{`${Local('patient.medical_logs.no_log_found')}`}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Logs;
