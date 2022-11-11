import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import BlurModal from './BlurModal';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_BACKGROUND,
  NEW_PRIMARY_LIGHT_BG,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';
import { SearchHint } from '../SearchHint/SearchHindNew';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import InsetShadow from 'react-native-inset-shadow';
import Feather from 'react-native-vector-icons/Feather';
import AnimatedTextInput from './AnimatedTextInput';
const AddReport = ({
  visible,
  onCancel,
  onUpload,
  selectFile,
  editMode,
  testName,
  testType,
  setTestName,
  setTestType,
  fileName = '',
  disable,
  editDisable,
  setVisible,
}) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);

  const [focused, setFocused] = useState(true);
  const [topOffset, setTopOffset] = useState(100);
  const [medSelected, setMedSelected] = useState(false);
  const [availableMeds, setavailableMeds] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const temp = [
      'CBC Widal',
      'Haemoglobin Test',
      'Full Body Checkup',
      'Thyroid Checkup',
      'Blood Sugar Test',
    ].filter((item, index) => {
      if (
        testName.toLowerCase().includes(item.toLowerCase()) ||
        item.toLowerCase().includes(testName.toLowerCase())
      )
        return item;
    });
    setavailableMeds(temp);
  }, [testName]);

  /* useEffect(() => {
    const backAction = () => {

      navigation.goBack()
      // setState(doctors);
      // setActive("allDoctors")

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []); */
  return (
    <BlurModal {...{ visible, onCancel, setVisible }}>
      <Text
        style={{
          fontFamily: 'Gilroy-SemiBold',
          fontSize: 20,
          textAlign: 'center',
          // color: Colors.primary_text_color[theme],
          color: '#297281',
          marginBottom: 15,
        }}>
        {Local('doctor.medical_history.add_reports')}
      </Text>
      {/* {true ? ( */}
      {availableMeds.length > 0 &&
      testName.length > 0 &&
      !medSelected &&
      focused ? (
        // <TouchableWithoutFeedback
        // onPress={() => {setMedSelected(!medSelected)}}
        // // style={customTouchableStyle}
        // >
        <SearchHint
          onSelect={(text) => {
            console.log({ text });
            setMedSelected(true);
            setTestName(text);
          }}
          name={testName}
          topOffset={topOffset}
          data={availableMeds}
          setMedSelected={setMedSelected}
        />
      ) : // </TouchableWithoutFeedback>
      null}

      <AnimatedTextInput
        value={testName}
        onChangeText={(text) => setTestName(text)}
        placeholder={`${Local('patient.medical_history.name_of_report')}`}
        error={testName === '' && isSubmit}
      />

      <AnimatedTextInput
        value={testType}
        onChangeText={(text) => setTestType(text)}
        placeholder={`${Local('patient.medical_history.type_of_test')}`}
        error={testType == '' && isSubmit}
      />

      {/* <TextInput
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local('patient.medical_history.name_of_report')}`}
        style={[styles.TextInput, { color: Colors.primary_text_color[theme] }]}
      />
      {testName == '' && isSubmit && (
        <AnimatedErrorText
          style={{ width: '100%', alignSelf: 'center' }}
          text={'Report Name should not be empty'}
        />
      )}
      <TextInput
        value={testType}
        onChangeText={(text) => setTestType(text)}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local('patient.medical_history.type_of_test')}`}
        style={[styles.TextInput, { color: Colors.primary_text_color[theme] }]}
      />
      {testType == '' && isSubmit && (
        <AnimatedErrorText
          style={{ width: '100%', alignSelf: 'center' }}
          text={'Report Type should not be empty'}
        />
      )} */}
      <View>
        <View
          style={{
            backgroundColor: '#EEEEEE',
            // backgroundColor: NEW_PRIMARY_LIGHT_BG,
            paddingHorizontal: '5%',
            paddingVertical: '5%',
            marginVertical: '4%',
            borderRadius: 13,
            elevation: 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',
              fontSize: 16,
              paddingVertical: 4,
              color: Colors.primary_text_color[theme],
            }}>
            {fileName
              ? fileName
              : Local('doctor.medical_history.upload_report_file')}
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: '#FFFFFF',
              borderRadius: 15,
            }}
            onPress={selectFile}>
            <Text
              style={{
                color: '#EA1A65',
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 14,
                marginRight: 10,
              }}>
              {`${Local('doctor.Profile.upload')}`}
            </Text>
            <Feather name="upload" color="#EA1A65" size={15} />
          </TouchableOpacity>
        </View>
      </View>
      {fileName == '' && isSubmit && (
        <AnimatedErrorText
          style={{ width: '100%', alignSelf: 'center' }}
          text={'Please select a file'}
        />
      )}

      <View
        style={{
          marginTop: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => onCancel()}
          style={{
            marginRight: 5,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: '#297281',
            paddingVertical: 15,
            flex: 1,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#297281',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 20,
            }}>
            {`${Local('doctor.V2.booking_detail.button.cancel')}`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={fileName === '' ? true : false}
          onPress={() => {
            if (disable || !fileName) {
              setIsSubmit(true);
              return;
            }
            onUpload();
            setIsSubmit(false);
            onCancel();
          }}
          style={{ flex: 1, marginLeft: 5 }}>
          <LinearGradient
            colors={
              fileName !== '' ? ['#225F6B', '#2E8192'] : ['#95BCC3', '#96BCC4']
            }
            start={{ x: 1, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 30,

              paddingVertical: 15,
              elevation: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#FFFFFF',
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 20,
              }}>
              {`${Local("doctor.template.update")}`}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* 
      <DmzButton
        onPress={() => {
          if (disable || !fileName) {
            setIsSubmit(true);
            return;
          }
          onUpload();
          setIsSubmit(false);
          onCancel();
        }}
        // disabled={!editMode ? disable : disable}
        // disabled={!editMode ? disable : editDisable}
        style={{
          Text: {
            width: '100%',
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Montserrat-SemiBold',
          },
          Container: {
            width: '100%',
            height: 46,
            borderRadius: 25,
            backgroundColor: SECONDARY_COLOR,
            alignSelf: 'center',
            marginTop: 15,
            elevation: 3,
          },
        }}
        text="UPLOAD"
      /> */}
    </BlurModal>
  );
};

export default AddReport;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    padding: 5,
    marginTop: 7,
  },
  TextInput: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    width: '100%',
    // alignSelf: 'stretch',
    // borderBottomWidth: 1.5,
    // borderColor: NEW_PRIMARY_BACKGROUND,
    // padding: 5,
    // marginBottom: 7,
  },
  numberField: {
    // flex: 1,
    width: '100%',
    // alignSelf: 'stretch',
    borderRadius: 15,
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    height: 50,
    // marginHorizontal: 5,
    marginVertical: 5,
    // borderWidth: 0.1,
    marginRight: 20,
  },
});
