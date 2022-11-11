import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import BlurModal from './BlurModal';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import { useDispatch, useSelector } from 'react-redux';
// import DatePicker from 'react-native-datepicker';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import InsetShadow from 'react-native-inset-shadow';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SearchHint } from '../SearchHint/SearchHindNew';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';
import { BlurView } from '@react-native-community/blur';
import { Modal } from 'react-native';
import moment from 'moment';
import AnimatedTextInput from './AnimatedTextInput';

const AddSurgery = ({
  visible,
  onCancel,
  onUpdate,
  editMode,
  editingData,
  setVisible,
}) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const [date, setDate] = useState(new Date());
  const [details, setDetails] = useState({
    type: '',
    docName: '',
    otor: '',
    date: new Date(),
  });

  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(true);
  const [topOffset, setTopOffset] = useState(100);
  const [medSelected, setMedSelected] = useState(false);
  const [availableMeds, setavailableMeds] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  console.log('========>>>>>>>>>>>>', details.date, date);
  useEffect(() => {
    const temp = [
      'Tonsils Surgery',
      'Appendix Expulsion Surgery',
      'Knee Surgery',
    ].filter((item, index) => {
      if (
        details.type.toLowerCase().includes(item.toLowerCase()) ||
        item.toLowerCase().includes(details.type.toLowerCase())
      )
        return item;
    });
    setavailableMeds(temp);
  }, [details]);

  useEffect(() => {
    if (editMode) {
      setDetails({
        ...editingData,
        otor: editingData.otOR,
        docName: editingData.surgeonName,
        type: editingData.surgeryName,
      });
    } else {
      setDetails({
        type: '',
        docName: '',
        otor: '',
        date: new Date(),
      });
    }
  }, [editMode || editingData || editingData.surgeryName]);

  return (
    <BlurModal {...{ visible, onCancel, setVisible }}>
      <Text
        style={{
          fontFamily: 'Gilroy-SemiBold',
          fontSize: 20,
          color: '#297281',
          // color: Colors.primary_text_color[theme],
          marginBottom: 15,
          textAlign: 'center',
        }}>
        {Local('doctor.medical_history.add_surgery_details')}
      </Text>

      {availableMeds.length > 0 &&
      details.type.length > 0 &&
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
            setDetails({ ...details, type: text });
          }}
          name={details.type}
          topOffset={topOffset}
          data={availableMeds}
          setMedSelected={setMedSelected}
        />
      ) : // </TouchableWithoutFeedback>
      null}

      <AnimatedTextInput
        value={details.type}
        onChangeText={(text) => setDetails({ ...details, type: text })}
        placeholder={`${Local('patient.medical_history.surgery_type')}`}
        error={!details?.type && isSubmit}
      />

      <AnimatedTextInput
        value={details.docName}
        onChangeText={(text) => setDetails({ ...details, docName: text })}
        placeholder={`${Local('patient.medical_history.surgion_name')}`}
        error={!details?.docName && isSubmit}
      />

      <AnimatedTextInput
        value={details.otor}
        onChangeText={(text) => setDetails({ ...details, otor: text })}
        placeholder={`${Local('patient.medical_history.ot_or')}`}
        error={!details?.otor && isSubmit}
      />

      <Text style={[styles.smallText, { color: '#707585', marginLeft: 10 }]}>
        Date
      </Text>
      <InsetShadow
        shadowOpacity={1}
        shadowOffset={15}
        containerStyle={styles.numberField}
        elevation={12}>
        <TextInput
          style={styles.input}
          // editable={open ? false : true}
          onFocus={() => {
            // Keyboard.dismiss();
            setOpen(true);
          }}
          // onPress={() => setOpen(true)}
          // onChangeText={onChangeNumber}
          value={moment(details.date).format('YYYY-MM-DD')}
          placeholder="Date"
          keyboardType="numeric"
        />
        <MaterialCommunityIcons
          onPress={() => {
            // Keyboard.dismiss();
            setOpen(true);
          }}
          name="calendar-blank"
          size={35}
          style={{ color: '#297281' }}
        />
      </InsetShadow>
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: NEW_PRIMARY_BACKGROUND,
          borderBottomWidth: 1.5,
          marginBottom: 15,
        }}>
        <DatePicker
          mode="time"
          open={open}
          date={details.date}
          onCancel={() => {
            setOpen(false);
          }}
          onDateChange={(text) => setDetails({ ...details, date: text })}
        /> */}
      {/* <TextInput
          value={details.date}
          onChangeText={(text) => setDetails({ ...details, date: text })}
          placeholderTextColor={INPUT_PLACEHOLDER}
          placeholder="Date"
          style={[
            styles.text,
            { borderBottomWidth: 0, flex: 1, marginBottom: 0 },
          ]}
          editable={true}
        />
        <TouchableOpacity>
          <FontAwesome5
            name="calendar-alt"
            size={22}
            color={NEW_PRIMARY_COLOR}
            style={{ marginHorizontal: 5 }}
          />
        </TouchableOpacity> */}
      {/* </View> */}
      <Modal
        onRequestClose={() => {
          setOpen(false);
        }}
        transparent={true}
        visible={open}
        animationType="fade">
        <TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              // backgroundColor: Colors.secondary_background[theme]
            }}>
            <BlurView
              blurRadius={7}
              downsampleFactor={1}
              overlayColor={Colors.blur_overlay_color[theme]}
              blurAmount={1}
              style={StyleSheet.absoluteFill}
              blurType="light"
            />
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={{
                  // backgroundColor: 'white',
                  backgroundColor: Colors.secondary_background[theme],
                  padding: '8%',
                  borderRadius: 30,
                  marginHorizontal: 20,
                  // alignSelf: 'center',
                  // margin: !moreMargin ? '4%' : '8%',
                  justifyContent: 'center',
                  // alignItems: 'center',
                  //   borderWidth: 1,
                }}>
                <Text
                  style={{
                    fontFamily: 'Gilroy-SemiBold',
                    fontSize: 20,
                    color: '#297281',
                    // color: Colors.primary_text_color[theme],
                    marginBottom: 15,
                    textAlign: 'center',
                  }}>
                  Add Date of Surgery
                </Text>
                <DatePicker
                  mode="date"
                  open={open}
                  date={date}
                  onDateChange={(txt) =>
                    setDetails({
                      ...details,
                      date: moment(txt).format('YYYY-MM-DD'),
                    })
                  }
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
                <View style={{ marginHorizontal: 40, marginVertical: 15 }}>
                  <TouchableOpacity
                    onPress={() => {
                      // setDetails({
                      //   ...details,
                      //   date: date,
                      // });
                      setOpen(false);
                    }}>
                    <LinearGradient
                      colors={['#225F6B', '#2E8192']}
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
                        {`${Local('doctor.V2.doctor_home.Sidebar.confirm')}`}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View
        style={{
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
          onPress={() => {
            if (
              details.type === '' ||
              details.docName === '' ||
              details.otor === '' ||
              details.date === ''
            ) {
              setIsSubmit(true);
              return;
            }
            onUpdate(details);
            setIsSubmit(false);
            setDetails({
              type: '',
              docName: '',
              otor: '',
              date: new Date(),
            });
          }}
          style={{ flex: 1, marginLeft: 5 }}>
          <LinearGradient
            colors={['#225F6B', '#2E8192']}
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

      {/* <DmzButton
        // disabled={details.type === '' || details.docName === '' || details.otor === '' || details.date === ''}
        onPress={() => {
          if (
            details.type === '' ||
            details.docName === '' ||
            details.otor === '' ||
            details.date === ''
          ) {
            setIsSubmit(true);
            return;
          }
          onUpdate(details);
          setIsSubmit(false);
          setDetails({
            type: '',
            docName: '',
            otor: '',
            date: new Date(),
          });
        }}
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
            marginTop: 20,
            elevation: 3,
          },
        }}
        text="UPDATE"
      /> */}
    </BlurModal>
  );
};

export default AddSurgery;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    width: '100%',
    // borderBottomWidth: 1.5,
    // borderColor: NEW_PRIMARY_BACKGROUND,
    // padding: 5,
    // marginBottom: 7,
  },
  inputContainer: {},
  numberField: {
    alignSelf: 'stretch',
    borderRadius: 10,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
    height: 50,
    marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
