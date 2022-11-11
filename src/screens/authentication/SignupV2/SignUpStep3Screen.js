import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import StepsTracker from '../../../components/atoms/StepsTracker/StepsTracker';
import TextInputIcon from '../../../components/atoms/TextInputCustom/TextInputIcon';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import ImagePlaceholder from '../../../assets/svg/imagePlaceholder.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  TERTIARY_TEXT,
  HEADER_TEXT,
  PRIMARY_COLOR,
  NEW_HEADER_TEXT,
  SECONDARY_COLOR,
  NEW_PRIMARY_COLOR,
  INPUT_PLACEHOLDER,
  PRIMARY_TEXT,
} from '../../../styles/colors';
import {Picker} from '@react-native-community/picker';
import {useSelector, useDispatch} from 'react-redux';
import {getSpecialty} from '../../../reduxV2/action/DoctorAction';

const height = Dimensions.get('screen').height;

export default function SignUpStep3Screen(props) {
  const {credential, setCredential, onChoosePicture, imageData, error} = props;
  const handleRegistrationNumber = (registration_number) => {
    setCredential('registration_number', registration_number);
  };
  const handleSpecialty = (specialty) => {
    setCredential('specialty', specialty);
  };
  const dispatch = useDispatch();
  const {specialty} = useSelector((state) => state.DoctorReducer);
  useEffect(() => {
    dispatch(getSpecialty());
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: height * 0.45,
            borderBottomRightRadius: 60,
            overflow: 'hidden',
          }}></View>
        <StepsTracker
          text="Step 2"
          textStyle={{
            fontSize: 16,
            color: TERTIARY_TEXT,
          }}
          completed={50}
          completedColor={TERTIARY_TEXT}
          incompletedColor={'#F8F7FF'}
        />
        <DmzText
          style={{
            fontSize: 35,
            fontFamily: 'Montserrat-SemiBold',
            color: NEW_HEADER_TEXT,
            marginTop: 40,
            width: '100%',
            textAlign: 'center',
            lineHeight: 50,
          }}
          text="Build your profile"
        />
        <TouchableOpacity
          onPress={onChoosePicture}
          style={{
            width: 180,
            height: 180,
            borderRadius: 14,
            backgroundColor: '#fff',
            alignSelf: 'center',
            marginTop: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {imageData?.uri ? (
            <Image
              source={{uri: imageData.uri}}
              style={{height: 200, width: 200}}
            />
          ) : (
            <>
              <ImagePlaceholder />
              <Text
                style={{
                  position: 'absolute',
                  textAlign: 'center',
                  fontSize: 18,
                  color: '#444',
                  fontWeight: 'bold',
                }}>
                Upload {'\n'}Picture/Video
              </Text>
            </>
          )}
        </TouchableOpacity>
        <TextInputIcon
          placeholder="Registration Number"
          keyboardType="number-pad"
          inputHandler={handleRegistrationNumber}
          placeholderTextColor={INPUT_PLACEHOLDER}
          style={[
            styles.inputStyle,
            {
              paddingLeft: '1.5%',
            },
            !error.registration_number && {borderBottomColor: 'red'},
          ]}
          textStyle={styles.textStyle}
          maxLength={15}
          validationCallback={() => credential.registration_number.length >= 8}
          value={credential.registration_number}
        />
        <View
          style={{
            width: '70%',
            alignSelf: 'center',
            borderBottomColor: NEW_PRIMARY_COLOR,
            borderBottomWidth: 1,
          }}>
          <Picker
            selectedValue={credential.specialty}
            style={{
              width: '100%',
            }}
            onValueChange={(itemValue, itemIndex) =>
              handleSpecialty(itemValue)
            }>
            <Picker.Item
              color={INPUT_PLACEHOLDER}
              label={'Speciality'}
              value={''}
            />
            {specialty?.map((item) => {
              return <Picker.Item label={item} value={item} />;
            })}
          </Picker>
        </View>
        <DmzButton
          onPress={props.onPress}
          disabled={
            !error.registration_number ||
            credential.registration_number === '' ||
            credential.specialty === ''
          }
          style={{
            Text: {
              width: '100%',
              textAlign: 'center',
              color: 'white',
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            },
            Container: {
              width: '70%',
              height: 46,
              borderRadius: 23,
              backgroundColor: SECONDARY_COLOR,
              alignSelf: 'center',
              marginTop: '10%',
              elevation: 2,
            },
          }}
          text="NEXT"
        />
        
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            paddingTop: '2%',
            paddingBottom: '5%',
            marginTop: '4%'
          }}>
          <Image
            // source={require('../../../assets/images/docplusIcon.png')}
            source={require('../../../assets/icons/new_docplus_log.png')}
            style={{ height: 30, width: 100 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    width: '70%',
    borderBottomColor: NEW_PRIMARY_COLOR,
    borderBottomWidth: 1,
    height: 'auto',
    alignSelf: 'center',
  },
  textStyle: {
    color: NEW_HEADER_TEXT,
    fontSize: 13,
    marginTop: 20,
  //  fontFamily: 'Montserrat-Medium',
  },
});
