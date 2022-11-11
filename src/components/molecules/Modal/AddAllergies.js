import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import BlurModal from './BlurModal';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';
import { SearchHint } from '../SearchHint/SearchHindNew';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';
import InsetShadow from 'react-native-inset-shadow';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedTextInput from './AnimatedTextInput';
const AddAllergies = ({
  visible,
  onCancel,
  onUpdate,
  editMode,
  editingData,
  setVisible,
}) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const [details, setDetails] = useState({
    name: '',
    reaction: '',
    Severity: 'Low',
  });

  const [focused, setFocused] = useState(true);
  const [topOffset, setTopOffset] = useState(100);
  const [medSelected, setMedSelected] = useState(false);
  const [availableMeds, setavailableMeds] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const temp = ['Wheat', 'Pollen', 'Dust', 'Lactose'].filter(
      (item, index) => {
        if (
          details.name.toLowerCase().includes(item.toLowerCase()) ||
          item.toLowerCase().includes(details.name.toLowerCase())
        )
          return item;
      },
    );

    setavailableMeds(temp);
  }, [details]);

  useEffect(() => {
    console.log(editingData, editMode);
    if (editMode) {
      setDetails({
        ...editingData,
        name: editingData.allergyName,
        reaction: editingData.reaction,
        Severity: editingData.severity,
      });
    } else {
      setDetails({
        name: '',
        reaction: '',
        Severity: '',
      });
    }
  }, [editMode || editingData]);

  return (
    <BlurModal {...{ visible, onCancel, setVisible }}>
      <Text
        style={{
          fontFamily: 'Gilroy-SemiBold',
          fontSize: 20,
          marginBottom: 15,
          color: '#297281',
          textAlign: 'center',
          // color: Colors.primary_text_color[theme],
        }}>
        {Local('doctor.medical_history.add_allergies')}
      </Text>

      {availableMeds.length > 0 &&
      details.name.length > 0 &&
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
            setDetails({ ...details, name: text });
          }}
          name={details.name}
          topOffset={topOffset}
          data={availableMeds}
          setMedSelected={setMedSelected}
        />
      ) : // </TouchableWithoutFeedback>
      null}

      <AnimatedTextInput
        value={details.name}
        onChangeText={(text) => setDetails({ ...details, name: text })}
        placeholder={`${Local('doctor.medical_history.allergy_name_type')}`}
        error={!details?.name && isSubmit}
      />

      <AnimatedTextInput
        value={details.reaction}
        onChangeText={(text) => setDetails({ ...details, reaction: text })}
        placeholder={`${Local('doctor.medical_history.reaction')}`}
        error={!details?.reaction && isSubmit}
      />

      {/* <TextInput
        value={details.name}
        onChangeText={(text) => setDetails({ ...details, name: text })}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local('doctor.medical_history.allergy_name_type')}`}
        style={[styles.text, { color: Colors.primary_text_color[theme] }]}
      /> */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Text style={{ fontFamily: 'Gilroy-Medium', fontSize: 16 }}>
          {`${Local('doctor.V2.appointment_detail.question_card.q3')}`}
        </Text>
        {['Low', 'medium', 'High'].map((item, i) => (
          <TouchableOpacity
            onPress={() => setDetails({ ...details, Severity: item })}
            style={{
              backgroundColor:
                details.Severity === item ? '#297281' : '#EEEEEE',
              width: '20%',
              paddingVertical: 10,
              // paddingHorizontal: 15,
              borderRadius: 8,
            }}
            key={i}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Gilroy-SemiBold',
                color: details.Severity === item ? '#EEEEEE' : '#297281',
              }}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* <TextInput
        value={details.Severity}
        onChangeText={(text) => setDetails({ ...details, Severity: text })}
        placeholderTextColor={Colors.input_placeholder_color[theme]}
        placeholder={`${Local('doctor.medical_history.severity')}`}
        style={[styles.text, { color: Colors.primary_text_color[theme] }]}
      /> */}

      {!details?.Severity && isSubmit && (
        <AnimatedErrorText
          style={{ width: '70%', alignSelf: 'center' }}
          text={'Please Enter a Valid severity'}
        />
      )}

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
              details.name === '' ||
              details.Severity === '' ||
              details.reaction === ''
            ) {
              setIsSubmit(true);
              return;
            }
            onUpdate(details);
            setIsSubmit(false);
            setDetails({
              name: '',
              reaction: '',
              Severity: '',
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
        // disabled={details.name === '' || details.Severity === '' || details.reaction === ""}
        onPress={() => {
          if (
            details.name === '' ||
            details.Severity === '' ||
            details.reaction === ''
          ) {
            setIsSubmit(true);
            return;
          }
          onUpdate(details);
          setIsSubmit(false);
          setDetails({
            name: '',
            reaction: '',
            Severity: '',
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

export default AddAllergies;

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
