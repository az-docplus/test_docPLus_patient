import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BlurModal from './BlurModal';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';
import InsetShadow from 'react-native-inset-shadow';
import LinearGradient from 'react-native-linear-gradient';

const AddWeight = ({ onCancel, visible, onUpdate, vitalsInfo, setVisible }) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const { weight } = vitalsInfo;
  const [Weight, setWeight] = useState('');
  const [fatMass, setFatMass] = useState('');
  const [date, setDate] = useState('');
  const moreMargin = true;

  useEffect(() => {
    if (vitalsInfo.fatMass || vitalsInfo.weight) {
      setFatMass(vitalsInfo.fatMass ? vitalsInfo.fatMass.value : '');
      setWeight(weight.value);
    }
  }, [vitalsInfo]);

  const handleIncementWeight = () => {
    if (Weight == '') setWeight('1');
    else setWeight((parseInt(Weight) + 1).toString());
  };

  const handleDecrementWeight = () => {
    if (Weight > 0) setWeight((parseInt(Weight) - 1).toString());
  };

  const handleIncementFatMass = () => {
    if (fatMass == '') setFatMass('1');
    else setFatMass((parseInt(fatMass) + 1).toString());
  };

  const handleDecrementFatMass = () => {
    if (fatMass > 0) setFatMass((parseInt(fatMass) - 1).toString());
  };
  return (
    <BlurModal {...{ visible, onCancel, setVisible, moreMargin }}>
      <Text
        style={{
          fontFamily: 'Gilroy-SemiBold',
          fontSize: 20,
          color: '#297281',
          textAlign: 'center',
          // color: Colors.primary_text_color[theme],
          marginBottom: 20,
        }}>
        {Local('doctor.medical_history.add_weight')}
      </Text>

      <View
        style={{
          // marginHorizontal: 20,
          // flexDirection: 'row',
          // alignItems: 'center',
          marginBottom: 25,
        }}>
        <View>
          <Text style={[styles.smallText, { color: '#707585' }]}>
            {Local('doctor.medical_history.weight')} (
            <Text style={{ color: '#EA1A65' }}> in Kgs</Text> )
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <InsetShadow
              shadowOpacity={1}
              shadowOffset={15}
              containerStyle={styles.numberField}
              elevation={12}>
              <TextInput
                style={styles.input}
                // editable={open ? false : true}

                // onPress={() => setOpen(true)}
                onChangeText={(text) => setWeight(text)}
                value={Weight}
                placeholder="Weight"
                keyboardType="decimal-pad"
              />
            </InsetShadow>
            {/* <TextInput
              style={[
                styles.inputText,
                { color: Colors.primary_text_color[theme] },
              ]}
              value={Weight}
              onChangeText={(text) => setWeight(text)}
              keyboardType="decimal-pad"
            /> */}
            <View style={styles.icons}>
              <TouchableOpacity onPress={handleDecrementWeight}>
                <AntDesign color="#297281" name="minuscircle" size={35} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleIncementWeight}
                style={{ marginLeft: 12 }}>
                <AntDesign color="#297281" name="pluscircle" size={35} />
              </TouchableOpacity>
            </View>
          </View>
          {Weight > 500 && (
            <AnimatedErrorText
              style={{ width: '70%', alignSelf: 'center' }}
              text={'Please Enter the appropriate fields'}
            />
          )}
        </View>
        {/* <View style={{ marginTop: 12 }}>
          <Text style={[styles.smallText, { color: Colors.primary_text_color[theme],}]}>{Local('doctor.medical_history.fat_mass')} (kg)</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={[styles.inputText, { color: Colors.primary_text_color[theme],}]}
              value={fatMass}
              onChangeText={(text) => setFatMass(text)}
              keyboardType="decimal-pad"
            />
            <View style={styles.icons}>
              <TouchableOpacity onPress={handleDecrementFatMass} >
                <AntDesign color='#297281' name="minus" size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleIncementFatMass} style={{ marginLeft: 12 }}>
                <AntDesign color='#297281' name="plus" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View> */}
      </View>
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
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={Weight === '' || Weight == 0}
          onPress={() => {
            onUpdate(Weight, fatMass, date);
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
              Update
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* <DmzButton
        disabled={Weight === '' || Weight == 0}
        onPress={() => {
          onUpdate(Weight, fatMass, date);
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
            elevation: 3,
          },
        }}
        text="UPDATE"
      /> */}
    </BlurModal>
  );
};

export default AddWeight;

const styles = StyleSheet.create({
  icons: {
    marginHorizontal: 5,
    // position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    // left: '-18%',
  },
  smallText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    color: INPUT_PLACEHOLDER,
    marginLeft: 5,
    //alignSelf: 'flex-start',
  },
  input: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    color: '#000000',
  },
  numberField: {
    flex: 1,
    // width: '60%',
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
