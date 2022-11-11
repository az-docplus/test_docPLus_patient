import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import {
  GREY_BACKGROUND,
  NEW_PRIMARY_BACKGROUND,
  NEW_HEADER_TEXT,
  INPUT_PLACEHOLDER,
  GREY_CARD,
} from '../../../styles/colors';
import SignleField from '../../../components/molecules/Modal/SingleField';
import ThreeField from '../../../components/molecules/Modal/ThreeField';
import moment from 'moment';
import Graph from '../../../components/atoms/Graphs/Graphs';
import { UpdateVitals } from '../../../reduxV2/action/PatientAction';
import { LineChart } from 'react-native-chart-kit';
import AddHeight from '../../../components/molecules/Modal/AddHeight';
import AddHeartRate from '../../../components/molecules/Modal/AddHeartRate';
import AddWeight from '../../../components/molecules/Modal/AddWeight';
import AddTemperature from '../../../components/molecules/Modal/AddTemperature';
import BlurSpinner from '../../../components/molecules/Modal/BlurLoadingOverlay';
import AddBloodPressure from '../../../components/molecules/Modal/AddBloodPressure';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Colors } from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';

const PADDING = 10;

const Vitals = ({ navigation }) => {
  // const { theme } = useSelector((state) => state.AuthReducer);
  const [heightModal, setHeightModal] = useState(false);
  const [heartModal, setHeartModal] = useState(false);
  const [weightModal, setWeightModal] = useState(false);
  const [sugarModal, setSugarModal] = useState(false);
  const [tempModal, setTempModal] = useState(false);
  const [bpModal, setBpModal] = useState(false);
  const [graphData, setGraphData] = useState([]);

  const { patient,
    isPatientAccountReducerLoading,
    doctorToPatient,
    isPatientFamilyMember,
    patientFamilyMemberDetails } = useSelector((state) => state.PatientReducer);
  const dispatch = useDispatch();
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [vitalsInfo, setVitalsInfo] = useState({
    height: '',
    weight: '',
    temperature: '',
    oxygen: '',
    heartRate: [],
    bloodPressure: [],
    respiration: '',
    bloodSugar: {},
    fatMass: ''
  });
  const [SysBloodPressure, setSysBloodPressure] = useState([]);
  const [DiaBloodPressure, setDiaBloodPressure] = useState([]);
  const [bloodPressure, setbloodPressure] = useState({});

  const cmToFeet = (val) => {
    var realFeet = (parseInt(val, 10) * 0.3937) / 12;
    var feet = Math.floor(realFeet);
    var inches = ((realFeet - feet) * 12).toPrecision(3);
    const res = {
      feet: feet,
      inches: inches,
    };
    return res;
  };
  useEffect(() => {
    setVitalsInfo({
      height: patient?.height?.value ? patient.height : '',
      weight: patient?.weight?.value ? patient.weight : '',
      fatMass: patient?.fatMass?.value ? patient.fatMass : '',
      temperature: patient?.temperature?.value ? patient.temperature : '',
      oxygen: patient?.oxygen?.value ? patient.oxygen : '',
      heartRate: patient?.meta?.heartRate,
      bloodPressure: patient?.meta?.bloodPressure,
      respiration: patient?.respiration?.value ? patient.respiration : '',
      bloodSugar: patient?.bloodSugar?.value ? JSON.parse(patient.bloodSugar.value) : {},
    });
    setGraphData(patient?.meta?.heartRate.map((item) => Number(item.value)));
  }, [patient]);

  const updateVitals = (res, callback = () => { }) => {
    dispatch(
      UpdateVitals(
        res,
        isPatientFamilyMember ? patientFamilyMemberDetails.id : patient._id,
        isPatientFamilyMember ? patientFamilyMemberDetails.meta : patient.meta,
      ));
    callback();
  };
  const [heartRate, setheartRate] = useState('')
  useEffect(() => {
    vitalsInfo.heartRate
      &&
      vitalsInfo.heartRate.length
      &&
      vitalsInfo.heartRate[vitalsInfo.heartRate.length - 1]
      &&
      setheartRate(vitalsInfo.heartRate[vitalsInfo.heartRate.length - 1].value)
  }, [vitalsInfo.heartRate]);

  useEffect(() => {
    const ar = vitalsInfo?.bloodPressure?.map((item) => Number(item.systolic));
    if (Array.isArray(ar)) setSysBloodPressure(ar);

    const dia = vitalsInfo?.bloodPressure?.map((item) => Number(item.dialostic));
    if (Array.isArray(dia)) setDiaBloodPressure(dia);


    vitalsInfo.bloodPressure
      &&
      vitalsInfo.bloodPressure.length
      &&
      vitalsInfo.bloodPressure[vitalsInfo.bloodPressure.length - 1]
      &&
      setbloodPressure(vitalsInfo.bloodPressure[vitalsInfo.bloodPressure.length - 1])

  }, [vitalsInfo.bloodPressure]);

  const _heightInMeters = (value) => {
    return parseInt(value) / 100
  }
  return (
    <>
      {isPatientAccountReducerLoading && (<BlurSpinner visible={isPatientAccountReducerLoading}>
        <ActivityIndicator color={NEW_PRIMARY_BACKGROUND} size="large" />
      </BlurSpinner>)}
      <AddHeight
        visible={heightModal}
        vitalsInfo={vitalsInfo}
        onCancel={() => setHeightModal(false)}
        unit="cm"
        onUpdate={(temp) => {
          updateVitals(
            {
              field: 'height',
              data: {
                value: temp,
                modifiedBy: patient.doctorToPatient ? 'doctor' : 'patient',
                date: new Date().toISOString(),
              },
            },
            () => setHeightModal(false),
          );
        }}
      />
      <AddHeartRate
        visible={heartModal}
        vitalsInfo={vitalsInfo}
        onCancel={() => setHeartModal(false)}
        onUpdate={(temp) => {
          updateVitals(
            {
              field: 'heartRate',
              data: {
                value: temp,
                modifiedBy: patient.doctorToPatient ? 'doctor' : 'patient',
                date: new Date().toISOString(),
              },
            },
            () => setHeartModal(false),
          );
        }}
      />
      <AddWeight
        visible={weightModal}
        vitalsInfo={vitalsInfo}
        onCancel={() => setWeightModal(false)}
        onUpdate={(weight, unit, date) => {
          updateVitals(
            {
              field: 'weight',
              data: {
                value: weight,
                modifiedBy: patient.doctorToPatient ? 'doctor' : 'patient',
                date: new Date().toISOString(),
              },
            },
            () => setWeightModal(false),
          );
          updateVitals(
            {
              field: 'fatMass',
              data: {
                value: unit,
                modifiedBy: patient.doctorToPatient ? 'doctor' : 'patient',
                date: new Date().toISOString(),
              },
            },
            () => setWeightModal(false),
          );
        }}
      />
      <AddTemperature
        visible={tempModal}
        vitalsInfo={vitalsInfo}
        onCancel={() => setTempModal(false)}
        onUpdate={(celcius, faren, date) => {
          updateVitals(
            {
              field: 'temperature',
              data: {
                value: celcius,
                modifiedBy: patient.doctorToPatient ? 'doctor' : 'patient',
                date: new Date().toISOString(),
              },
            },
            () => setTempModal(false),
          );
        }}
      />
      <AddBloodPressure
        visible={bpModal}
        onCancel={() => setBpModal(false)}
        vitalsInfo={vitalsInfo}
        onUpdate={(sys, dia) => {
          updateVitals(
            {
              field: 'bloodPressure',
              data: {
                systolic: sys,
                dialostic: dia,
                value: sys,
                modifiedBy: patient.doctorToPatient ? 'doctor' : 'patient',
                date: new Date().toISOString(),
              },
            },
            () => setBpModal(false),
          );
        }}
      />
      <ThreeField
        visible={sugarModal}
        vitalsInfo={vitalsInfo}
        onCancel={() => setSugarModal(false)}
        headingText="Add Blood Sugar"
        labelText={['mg/dL', 'Mmol/L']}
        onUpdate={(mg, mole, date) => {
          updateVitals(
            {
              field: 'bloodSugar',
              data: {
                value: JSON.stringify({
                  mg, mmol: mole
                }),
                modifiedBy: patient.doctorToPatient ? 'doctor' : 'patient',
                date: new Date().toISOString(),
              },
            },
            () => setSugarModal(false),
          );
        }}
      />

      <ScrollView
        contentContainerStyle={{
          padding: PADDING,
          
        }}>
        <View style={{ flexDirection: 'row',  }}>
          <View style={[styles.card, { flex: 1, backgroundColor: Colors.secondary_background[theme],  }]}>
            <TouchableOpacity onPress={() => setWeightModal(true)}>

              <Text style={styles.cardHeaderText}>{Local("doctor.medical_history.weight")}</Text>
              <Text style={[styles.text1, { color: Colors.primary_text_color[theme],}]}>
                {vitalsInfo.weight.value ? vitalsInfo.weight.value : '--'} kg
               </Text>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={[styles.text2, {color: Colors.primary_text_color[theme],}]}>BMI {" "}
                    {
                      vitalsInfo.weight.value && vitalsInfo.height.value ?
                        ((
                          parseInt(vitalsInfo.weight.value) /
                          (_heightInMeters(vitalsInfo.height.value) * _heightInMeters(vitalsInfo.height.value))
                        )
                          .toFixed(2) || 0)
                        :
                        0
                    }</Text>
                  <Text style={[styles.text3, { color: Colors.patient_time[theme],}]}>
                  {Local("doctor.medical_history.recorded_on")} :{' '}
                    {moment(vitalsInfo.weight?.date).format("DD MMM 'YY")}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MedicalLogs', { meta: patient.meta.weight, item: "Weight", unit: 'Kg' })}>
                  <Image
                    source={require('../../../assets/icons/back.png')}
                    style={{
                      height: 20,
                      width: 20,
                      transform: [{ rotateZ: '180deg' }],
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

          </View>

          <View style={[styles.card, { flex: 1, backgroundColor: Colors.secondary_background[theme], }]}>
            <TouchableOpacity onPress={() => setHeightModal(true)}>

              <Text style={styles.cardHeaderText}>{Local("doctor.medical_history.height")}</Text>
              <Text style={[styles.text1, { color: Colors.primary_text_color[theme],}]}>
                {vitalsInfo.height.value
                  ? cmToFeet(vitalsInfo.height.value).feet
                  : '--'}{' '}
              ft , {" "}
                {vitalsInfo.height.value
                  ? Math.floor(cmToFeet(vitalsInfo.height.value).inches)
                  : ' --'}{' '}
              in
            </Text>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between',  }}>
                <View>
                  <Text style={[styles.text2, { color: Colors.primary_text_color[theme],}]}>({vitalsInfo.height.value} cm)</Text>
                  <Text style={[styles.text3, { color: Colors.patient_time[theme],}]}>
                  {Local("doctor.medical_history.recorded_on")} :{' '}
                    {moment(vitalsInfo.height?.date).format("DD MMM 'YY")}
                  </Text>
                </View>
                {/* <TouchableOpacity onPress={() => setHeightModal(true)}>
                  <Image
                    source={require('../../../assets/icons/back.png')}
                    style={{
                      height: 20,
                      width: 20,
                      transform: [{ rotateZ: '180deg' }],
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity> */}
              </View>
            </TouchableOpacity>

          </View>
        </View>

        <TouchableOpacity onPress={() => setBpModal(true)}>
          <View style={[styles.card, { backgroundColor: Colors.secondary_background[theme],}]}>
            <Text style={styles.cardHeaderText}>{Local("doctor.medical_history.blood_pressure")}</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 3, marginRight: 12 }}>
                {/*  {SysBloodPressure.length !== 0 && (
                  <LineChart
                    bezier
                    data={{
                      datasets: [
                        {
                          data: SysBloodPressure.filter((item) => { if (item) return item }),
                          color: (opacity = 1) => `#077EE9`,
                          strokeWidth: 3,
                          withDots: false,
                        },
                        {
                          data: DiaBloodPressure.filter((item) => { if (item) return item }),
                          color: (opacity = 1) => `#f8d7b6`,
                          strokeWidth: 3,
                          withDots: false,
                        },

                      ],
                    }}
                    fromZero
                    withVerticalLabels={false}
                    withInnerLines={false}
                    withOuterLines={false}
                    width={250}
                    height={150}
                    chartConfig={{
                      backgroundGradientFrom: '#fff',
                      backgroundGradientFromOpacity: 0,
                      backgroundGradientTo: '#fff',
                      backgroundGradientToOpacity: 1,
                      color: (opacity = 1) => `#a3a3a3`,
                      fillShadowGradientOpacity: 0,
                      propsForBackgroundLines: {
                        // fill: '#b2f5f5',
                        // // stroke: 'blue',
                      },
                    }}
                  />
                )} */}

                <Text style={[styles.text3, { color: Colors.patient_time[theme],}]}>
                {Local("doctor.medical_history.recorded_on")} :
                {moment(vitalsInfo.bloodPressure?.date).format("DD MMM 'YY")}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={[styles.text1, { padding: 1, color: Colors.primary_text_color[theme], }]}>
                    {
                      bloodPressure.systolic
                        ? bloodPressure.systolic
                        : ''
                    }
                    {' '}/{' '}
                    {

                      bloodPressure.dialostic
                        ? bloodPressure.dialostic
                        : 0
                    }
                  </Text>


                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 16,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: '#077EE9',
                        marginRight: 5,
                      }}
                    />
                    <Text style={[styles.text3, { color: Colors.primary_text_color[theme], }]}>
                      SBP
                    </Text>
                    {
                      bloodPressure.systolic && (
                        <Text style={[styles.text3, { color: Colors.primary_text_color[theme], }]}> : {
                          bloodPressure.systolic < 120
                            ? 'Normal'
                            : bloodPressure.systolic >= 120 && bloodPressure.systolic <= 129
                              ? 'Elevated'
                              : bloodPressure.systolic >= 130 && bloodPressure.systolic <= 139
                                ? 'High'
                                : bloodPressure.systolic >= 140 && bloodPressure.systolic <= 180
                                  ? "Very High"
                                  : "Critical"
                        }
                        </Text>
                      )
                    }
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: '#f8d7b6',
                        marginRight: 5,
                      }}
                    />
                    <Text style={[styles.text3, { color: Colors.primary_text_color[theme], }]}>
                      DBP
                  </Text>
                    {
                      bloodPressure.dialostic && (
                        <Text style={[styles.text3, { color: Colors.primary_text_color[theme], }]}> : {
                          bloodPressure.dialostic < 80
                            ? 'Normal'
                            : bloodPressure.dialostic >= 80 && bloodPressure.dialostic <= 89
                              ? 'High'
                              : bloodPressure.dialostic >= 90 && bloodPressure.dialostic <= 120
                                ? "Very High"
                                : "Critical"}</Text>
                      )
                    }
                  </View>
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <TouchableOpacity onPress={() => navigation.navigate('MedicalLogs', { meta: patient.meta.bloodPressure, item: "Blood Pressure" })}>
                    <Image
                      source={require('../../../assets/icons/back.png')}
                      style={{
                        height: 20,
                        width: 20,
                        marginTop: 3,
                        transform: [{ rotateZ: '180deg' }],
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setHeartModal(true)}>
          <View style={[styles.card, { backgroundColor: Colors.secondary_background[theme],}]}>
            <Text style={styles.cardHeaderText}>{Local("doctor.medical_history.heart_rate")}</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 3 }}>
                <View style={{ flex: 2, width: "90%" }}>
                  <LottieView
                    style={{ height: '100%', width: '100%' }}
                    source={require('../../../assets/anim_svg/heart_rate.json')}
                    autoPlay
                    loop
                    speed={0.65}
                  />
                </View>

                <Text style={[styles.text3, {color: Colors.patient_time[theme],}]}>
                {Local("doctor.medical_history.recorded_on")} :{' '}
                  {moment(vitalsInfo.heartRate?.date).format("DD MMM 'YY")}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={[styles.text1, { padding: 1, color: Colors.primary_text_color[theme], }]}>{
                    // vitalsInfo.heartRate ?
                    heartRate
                      ? heartRate
                      : 0
                  } BPM</Text>
                  {
                    heartRate != '' && (
                      <Text style={[styles.text2, {color: Colors.primary_text_color[theme],}]}>
                        { heartRate < 60
                          ? "Low"
                          : heartRate >= 60
                            && heartRate <= 100
                            ? "Normal"
                            : heartRate > 100
                              ? "High"
                              : ""
                        }
                      </Text>
                    )
                  }
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('MedicalLogs',
                      { meta: patient.meta.heartRate, item: "Heart Rate", unit: 'BPM' })}>
                    <Image
                      source={require('../../../assets/icons/back.png')}
                      style={{
                        height: 20,
                        width: 20,
                        transform: [{ rotateZ: '180deg' }],
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>


        <View style={{ flexDirection: 'row', marginBottom: 50 }}>

          <View style={[styles.card, { flex: 1, backgroundColor: Colors.secondary_background[theme], }]}>
            <TouchableOpacity onPress={() => setTempModal(true)}>

              <Text style={styles.cardHeaderText}>{Local("doctor.medical_history.temperature")}</Text>
              <Text style={[styles.text1, { color: Colors.primary_text_color[theme], }]}>
                {vitalsInfo.temperature.value
                  ? vitalsInfo.temperature.value
                  : '--'}{' '}
              °C
            </Text>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>

                  {vitalsInfo.temperature.value && (<Text style={[styles.text2, {color: Colors.primary_text_color[theme],}]}>
                    {
                      vitalsInfo.temperature.value > 38
                        ? "Fever"
                        : "Normal"

                    }
                  </Text>)}
                  <Text style={[styles.text3, {color: Colors.patient_time[theme],}]}>
                  {Local("doctor.medical_history.recorded_on")} :{' '}
                    {moment(vitalsInfo.temperature?.date).format("DD MMM 'YY")}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MedicalLogs',
                    { meta: patient.meta.temperature, item: "Temperature", unit: '°C' })}>
                  <Image
                    source={require('../../../assets/icons/back.png')}
                    style={{
                      height: 20,
                      width: 20,
                      transform: [{ rotateZ: '180deg' }],
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

          </View>

          <View style={[styles.card, { flex: 1, backgroundColor: Colors.secondary_background[theme], }]}>
            <TouchableOpacity
              onPress={() => setSugarModal(true)}>

              <Text style={styles.cardHeaderText}>{Local("doctor.medical_history.glucose")}</Text>
              <Text style={[styles.text1, { color: Colors.primary_text_color[theme],}]}>{vitalsInfo.bloodSugar.mg ? vitalsInfo.bloodSugar.mg : 0} mg/dL</Text>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  {
                    vitalsInfo.bloodSugar.mg && (
                      <Text style={[styles.text2, { color: Colors.primary_text_color[theme],}]}>
                        {vitalsInfo.bloodSugar.mg < 140
                          ? "Normal"
                          : vitalsInfo.bloodSugar.mg >= 140 && vitalsInfo.bloodSugar.mg < 200
                            ? "Prediabetes"
                            : vitalsInfo.bloodSugar.mg >= 200
                              ? "Diabetes"
                              : ""
                        }
                      </Text>
                    )
                  }
                  
                  <Text style={[styles.text3, { color: Colors.patient_time[theme],}]}>{Local("doctor.medical_history.recorded_on")} :{' '}
                    {moment(vitalsInfo.bloodSugar.date).format("DD MMM 'YY")}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MedicalLogs',
                    { meta: patient.meta.bloodSugar, item: "Blood Sugar" })}
                >
                  <Image
                    source={require('../../../assets/icons/back.png')}
                    style={{
                      height: 20,
                      width: 20,
                      transform: [{ rotateZ: '180deg' }],
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

          </View>

        </View>
      </ScrollView>
    </>
  );
};

export default Vitals;

const styles = StyleSheet.create({
  card: {
    padding: 12,
    margin: PADDING,
    backgroundColor: 'white',
    borderRadius: 13,
    elevation: 2,
  },
  cardHeaderText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
    color: NEW_PRIMARY_BACKGROUND,
    padding: 5,
  },
  text1: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: NEW_HEADER_TEXT,
    padding: 5,
  },
  text2: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
    color: NEW_HEADER_TEXT,
    padding: 1,
  },
  text3: {
    fontFamily: 'Montserrat-Regu;ar',
    fontSize: 9,
    color: INPUT_PLACEHOLDER,
    padding: 1,
  },
});
