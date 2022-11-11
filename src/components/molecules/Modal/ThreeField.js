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
  NEW_PRIMARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';
import InsetShadow from 'react-native-inset-shadow';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
const ThreeField = ({
  headingText,
  labelText,
  onCancel,
  visible,
  onUpdate,
  vitalsInfo,
  setVisible,
}) => {
  // const { value } = vitalsInfo.bloodSugar
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const moreMargin = true;

  useEffect(() => {
    if (vitalsInfo.bloodSugar) {
      const { bloodSugar } = vitalsInfo;
      setField1(bloodSugar.mg);
      setField2(bloodSugar.mmol);
      // setFar()
    }
  }, [vitalsInfo]);
  const handleIncementWeight = () => {
    if (field1 == '') setField1('1');
    else setField1((parseInt(field1) + 1).toString());
  };
  const handleDecrementWeight = () => {
    if (field1 > 0) setField1((parseInt(field1) - 1).toString());
  };
  const handleIncementFatMass = () => {
    if (field2 == '') setField2('1');
    else setField2((parseInt(field2) + 1).toString());
  };
  const handleDecrementFatMass = () => {
    if (field2 > 0) setField2((parseInt(field2) - 1).toString());
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
        {headingText}
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
            Blood sugar level (<Text style={{ color: '#EA1A65' }}> mg/dl</Text>{' '}
            )
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
                value={field1}
                onChangeText={(text) => setField1(text)}
                placeholder="Blood Sugar"
                keyboardType="decimal-pad"
              />
            </InsetShadow>

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
          {field1 > 500 && (
            <AnimatedErrorText
              style={{ width: '70%', alignSelf: 'center' }}
              text={'Please Enter the appropriate fields'}
            />
          )}
        </View>
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
          disabled={field1 == 0 || field2 == 0 || field1 == '' || field2 == ''}
          onPress={() => {
            onUpdate(field1, field2, date);
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
    </BlurModal>
  );
};

export default ThreeField;

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
