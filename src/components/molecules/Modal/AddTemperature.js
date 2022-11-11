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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';
import AnimatedErrorText from '../../atoms/animatedErrorText/AnimatedErrorText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InsetShadow from 'react-native-inset-shadow';
import LinearGradient from 'react-native-linear-gradient';
const AddTemperature = ({
  onCancel,
  visible,
  onUpdate,
  vitalsInfo,
  setVisible,
}) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const [Cel, setCel] = useState('');
  const [Far, setFar] = useState('');
  const [date, setDate] = useState('');
  const moreMargin = true;

  useEffect(() => {
    if (vitalsInfo.temperature) {
      const { temperature } = vitalsInfo;
      setCel(temperature.value);
    }
  }, [vitalsInfo]);

  const handleIncementWeight = () => {
    if (Cel == '') setCel('1');
    else setCel((parseInt(Cel) + 1).toString());
  };
  const handleDecrementWeight = () => {
    if (Cel > 0) setCel((parseInt(Cel) - 1).toString());
  };
  const handleIncementFatMass = () => {
    if (Far == '') setFar('1');
    else setFar((parseInt(Far) + 1).toString());
  };
  const handleDecrementFatMass = () => {
    if (Far > 0) setFar((parseInt(Far) - 1).toString());
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
        {Local('doctor.medical_history.record_temperature')}
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
            Temperature (<Text style={{ color: '#EA1A65' }}> °C</Text> )
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
                value={Cel}
                onChangeText={(text) => {
                  setCel(Number(text));
                  setFar(Number(1.8 * text + 32));
                }}
                placeholder="Temperature"
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
          {Cel > 42.3 && (
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
          disabled={String(Cel) === '' || Cel == 0}
          onPress={() => {
            onUpdate(Cel, Far, date);
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

export default AddTemperature;

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
