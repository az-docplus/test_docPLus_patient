import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  // Image,
  BackHandler,
  Alert,
} from 'react-native';
//import BlurModal from './BlurModal';
import {
  // INPUT_PLACEHOLDER,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  // SECONDARY_COLOR,
  // GREY_OUTLINE,
  NEW_HEADER_TEXT,
} from '../../../styles/colors';
// import {Picker} from '@react-native-community/picker';
// import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import Timings from '../../../components/molecules/Clincs/ClinicTimings';
import {useSelector, useDispatch} from 'react-redux';
import {AddClinics} from '../../../reduxV2/action/DoctorAction';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../../styles/colorsV2';
import AnimatedErrorText from '../../../components/atoms/animatedErrorText/AnimatedErrorText';
// import {Local, setLocale} from '../../../i18n';
const AddClinic = ({navigation}) => {
  const {theme, userData} = useSelector((state) => state.AuthReducer);
  const [details, setDetails] = useState({
    ClinicName: '',
    ClinicType: '',
    Fees: '',
    City: '',
    Locality: '',
    StreetAdrress: '',
    ClinicNumber: '',
    MapLocation: '',
  });
  const [isSubmit, setIsSubmit] = useState(false)
  const dispatch = useDispatch();
  const [addingTiming, setaddingTiming] = useState(false);
  const onUpdate = useCallback(
    (slots) => {
      setIsSubmit(true)
      if(details?.ClinicName?.length == 0) {
        return
      }
      if(details?.ClinicNumber?.length == 0) {
        return
      }
      if(details?.Fees?.length == 0) {
        return
      }
      if(details?.City?.length == 0) {
        return
      }
      if(details?.Locality?.length == 0) {
        return
      }
      if(details?.MapLocation?.length == 0) {
        return
      }
      if(details?.StreetAdrress?.length == 0) {
        return
      }
      const obj = {
        doctor: userData._id,
        ...details,
        ...slots,
        ClinicType: 'owned',
      };
      setIsSubmit(false)
      dispatch(
        AddClinics(obj, () => {
          navigation.navigate('Clincs');
          setDetails({
            ClinicName: '',
            ClinicType: '',
            Fees: '',
            City: '',
            Locality: '',
            StreetAdrress: '',
            ClinicNumber: '',
            MapLocation: '',
          })
        }),
      );
    },
    [details, dispatch, navigation, userData._id],
  );
  useEffect(() => {
    const backAction = () => {
      setIsSubmit(false)
      navigation.navigate('Clincs');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);
  const navigateToClinic = useCallback(() => {
    setIsSubmit(false)
    navigation.navigate('Clincs');
  }, [navigation]);
  const [timeValidation, settimeValidation] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.secondary_background[theme],
        paddingHorizontal: '4%',
      }}>
      <TopNavBar
        navigation={navigation}
        onLeftButtonPress={navigateToClinic}
        headerText={'Add Clinic'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
        }}>
        <View style={{paddingHorizontal: '4%', marginTop: '4%'}}>
          <TextInput
            value={details.ClinicName}
            maxLength={20}
            onChangeText={(text) => setDetails({...details, ClinicName: text})}
            placeholderTextColor={Colors.input_placeholder_color[theme]}
            placeholder="Clinic name"
            style={[styles.text, {color: Colors.primary_text_color[theme]}]}
          />
          {details.ClinicName.length == 0 && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center'}}
          text={'Clinic Name should not be empty'}
        />
      )}
          <TextInput
            value={details.City}
            onChangeText={(text) => setDetails({...details, City: text})}
            placeholderTextColor={Colors.input_placeholder_color[theme]}
            placeholder="City"
            maxLength={20}
            style={[styles.text, {color: Colors.primary_text_color[theme]}]}
          />
          {details.City.length == 0 && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center'}}
          text={'City should not be empty'}
        />
      )}
          <TextInput
            value={details.Locality}
            onChangeText={(text) => setDetails({...details, Locality: text})}
            placeholderTextColor={Colors.input_placeholder_color[theme]}
            maxLength={20}
            placeholder="Locality"
            style={[styles.text, {color: Colors.primary_text_color[theme]}]}
          />
          {details.Locality.length == 0 && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center'}}
          text={'Locality should not be empty'}
        />
      )}
          <TextInput
            value={details.StreetAdrress}
            onChangeText={(text) =>
              setDetails({...details, StreetAdrress: text})
            }
            placeholderTextColor={Colors.input_placeholder_color[theme]}
            placeholder="Street Address"
            style={[styles.text, {color: Colors.primary_text_color[theme]}]}
          />
          {details.StreetAdrress.length == 0 && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center'}}
          text={'Street Address should not be empty'}
        />
      )}
          <TextInput
            value={details.MapLocation}
            onChangeText={(text) => setDetails({...details, MapLocation: text})}
            placeholderTextColor={Colors.input_placeholder_color[theme]}
            placeholder="Pick a location"
            style={[styles.text, {color: Colors.primary_text_color[theme]}]}
          />
          {details.MapLocation.length == 0 && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center'}}
          text={'Location should not be empty'}
        />
      )}
          <TextInput
            value={details.ClinicNumber}
            onChangeText={(text) =>
              setDetails({...details, ClinicNumber: text})
            }
            placeholderTextColor={Colors.input_placeholder_color[theme]}
            placeholder="Clinic Number"
            maxLength={10}
            keyboardType={'numeric'}
            style={[styles.text, {color: Colors.primary_text_color[theme]}]}
          />
          {details.ClinicNumber.length == 0 && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center'}}
          text={'Clinic Number should not be empty'}
        />
      )}
          <TextInput
            value={details.Fees}
            onChangeText={(text) => setDetails({...details, Fees: text})}
            placeholderTextColor={Colors.input_placeholder_color[theme]}
            placeholder="Fees"
            style={[styles.text, {color: Colors.primary_text_color[theme]}]}
            keyboardType="number-pad"
          />
          {details.Fees.length == 0 && isSubmit && (
        <AnimatedErrorText
          style={{width: '100%', alignSelf: 'center'}}
          text={'Fess should not be empty'}
        />
      )}
        </View>
        <TouchableOpacity
          onPress={() => {
            setaddingTiming(!addingTiming);
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '8%',
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 18,
                color: Colors.primary_text_color[theme],
              }}>
              Add Clinic Timings
            </Text>
            <MaterialIcon
              style={{
                marginLeft: '4%',
                color: Colors.primary_text_color[theme],
              }}
              name={addingTiming ? 'chevron-up' : 'chevron-down'}
              size={20}
            />
          </View>
        </TouchableOpacity>
        <Timings
          addingTiming={addingTiming}
          onUpdate={onUpdate}
          details={details}
        />
      </ScrollView>
    </View>
  );
};

export default AddClinic;

const styles = StyleSheet.create({
  text: {
    marginTop: '4%',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    alignSelf: 'stretch',
    borderBottomWidth: 1.5,
    borderColor: NEW_PRIMARY_BACKGROUND,
    padding: 5,
    marginBottom: 7,
  },
  inputStyle: {
    width: '65%',
    borderBottomColor: NEW_PRIMARY_COLOR,
    borderBottomWidth: 1,
    height: 'auto',
    alignSelf: 'center',
  },
  textStyle: {
    color: NEW_HEADER_TEXT,
    fontSize: 13,
    marginTop: 20,
    fontFamily: 'Montserrat-Medium',
  },
  inputContainer: {},
});
