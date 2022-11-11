/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  Platform,
  UIManager,
  LayoutAnimation,
  Alert,
  BackHandler,
} from 'react-native';
import GradientTopNavBar from '../../../components/molecules/TopNavBar/GradientTopNavBar';
import NotFound from '../../../components/organisms/NotFound/NotFound';
import {useSelector, useDispatch} from 'react-redux';
import {
  GetPatientInfo,
  GetFamilyMember,
  AddFamilyMember,
} from '../../../redux/action/patientAccountAction';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Overlay from '../../../components/atoms/Overlay/Overlay';
import BasicCard from '../../../components/atoms/BasicCard/BasicCard';
import AnimInput from '../../../components/molecules/AnimInput/AnimInput';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import FancyHeaderLite from '../../../components/organisms/FancyHeaderLite/FancyHeaderLite';
import Container from '../../../components/organisms/Container/Container';
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-community/picker';
import Moment from 'moment';
import {Local, setLocale} from '../../../i18n';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const FamilyMember = ({navigation}) => {
  const {familyMember, isPatientAccountReducerLoading, patient} = useSelector(
    (state) => state.PatientAccountReducer,
  );
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    metaId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    birthdate: '',
    relationship: '',
  });

  useEffect(() => {
    // dispatch(GetPatientInfo(patient._id));
    // console.log(patient.metaId);
    !isPatientAccountReducerLoading && dispatch(GetFamilyMember(patient.meta));
  }, []);

  // BackHandler.addEventListener('hardwareBackPress', () => {
  //   navigation.navigate('pageNavigation', {}, navigation.navigate('Home'));
  // });

  const onOpenPopup = () => {
    setState({...state, metaId: patient.meta});
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setShowPopup(true);
  };

  const onClosePopup = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setShowPopup(false);
  };

  const onSubmit = () => {
    const reg = new RegExp(
      // /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
      /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/,
    );
    const reg2 = new RegExp(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    );
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      birthdate,
      relationship,
    } = state;
    if (
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      phone !== '' &&
      gender !== '' &&
      birthdate !== '' &&
      relationship !== '' &&
      reg.test(birthdate) &&
      reg2.test(email) &&
      phone.length == 10
    ) {
      dispatch(AddFamilyMember(state, () => onClosePopup()));
    } else {
      firstName == '' &&
      lastName == '' &&
      email == '' &&
      phone == '' &&
      gender == '' &&
      birthdate == '' &&
      relationship == ''
        ? Alert.alert('One or more fields empty')
        : phone.length != 10
        ? Alert.alert('Incorrect Phone No.')
        : !reg.test(birthdate)
        ? Alert.alert('Incorrect Date')
        : !reg2.test(email)
        ? Alert.alert('Invalid Email')
        : null;
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FancyHeaderLite
        navigation={navigation}
        isClap={true}
        onLeftButtonPress={() => navigation.goBack(null)}
        headerText={'Family Member'}
        style={{
          Section: {overflow: 'hidden', height: '20%', marginBottom: 0},
        }}
      />
      <Container
        style={{
          height: '75%',
          transform: [{translateY: -30}],
          zIndex: 999,
          backgroundColor: '#fff',
          paddingTop: 15,
        }}>
        <ScrollView style={{flex: 1}}>
          <View style={Styles.FamilyCardContainer}>
            <View
              style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              {familyMember === null ? (
                <Text>No member found</Text>
              ) : isPatientAccountReducerLoading ? (
                <ActivityIndicator
                  size={25}
                  color={'#000'}
                  style={{alignSelf: 'center', width: '100%'}}
                />
              ) : (
                familyMember.map(({firstName, relationship}) => (
                  <Person name={firstName} relationship={relationship} />
                ))
              )}
            </View>
            <View style={Styles.AddButton}>
              <TouchableOpacity
                onPress={onOpenPopup}
                style={Styles.AddButtonTouchable}>
                <FontAwesome name="plus" size={20} color="#ff1f75" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Container>
      {showPopup && (
        <Overlay style={Styles.Overlay}>
          <BasicCard
            style={{
              CardContainer: Styles.BasicCard,
            }}>
            <ScrollView>
              <DmzText
                type={4}
                style={Styles.OverlayHeader}
                text={`${Local("patient.familyMember.add_member")}`}
              />
              <View style={Styles.InputContainer}>
                <AnimInput
                  withAnim={false}
                  placeholder={`${Local("patient.my_family.first_name")}`}
                  style={{Container: Styles.AnimInputContainer}}
                  inputHandler={(txt) => setState({...state, firstName: txt})}
                />
              </View>
              <View style={Styles.InputContainer}>
                <AnimInput
                  withAnim={false}
                  placeholder={`${Local("patient.my_family.last_name")}`}
                  style={{Container: Styles.AnimInputContainer}}
                  inputHandler={(txt) => setState({...state, lastName: txt})}
                />
              </View>
              <View style={Styles.InputContainer}>
                <AnimInput
                  autoCapitalize="none"
                  withAnim={false}
                  placeholder={`${Local("patient.my_family.email")}`}
                  style={{Container: Styles.AnimInputContainer}}
                  inputHandler={(txt) => setState({...state, email: txt})}
                />
              </View>
              <View style={Styles.InputContainer}>
                <AnimInput
                  withAnim={false}
                  placeholder={`${Local("patient.my_family.phone_number")}`}
                  keyboardType={'number-pad'}
                  maxLength={10}
                  style={{Container: Styles.AnimInputContainer}}
                  inputHandler={(txt) => setState({...state, phone: txt})}
                />
              </View>
              <View style={Styles.InputContainer}>
                <Picker
                  selectedValue={state.gender}
                  onValueChange={(txt) => setState({...state, gender: txt})}>
                  <Picker.Item
                    color="#777"
                    label={`${Local("patient.familyMember.select_gender")}`}
                    value={null}
                  />
                  <Picker.Item label={`${Local("patient.familyMember.male")}`} value="Male" />
                  <Picker.Item label={`${Local("patient.familyMember.female")}`} value="Female" />
                </Picker>
              </View>
              <View style={Styles.InputContainer}>
                <DatePicker
                  date={state.birthdate}
                  mode="date"
                  placeholder={`${Local("patient.medical_history.select_date")}`}
                  format="MM/DD/YYYY"
                  minDate="01/01/1900"
                  maxDate={Moment(new Date(), 'MM/DD/YYYY')}
                  showIcon={false}
                  allowFontScaling={true}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      fontSize: 15,
                      height: 40,
                    },
                    placeholderText: {
                      color: '#77777795',
                      width: '100%',
                      marginLeft: 30,
                    },
                    dateText: {
                      color: '#000',
                      width: '100%',
                      marginLeft: 30,
                    },
                  }}
                  style={{
                    width: '100%',
                  }}
                  onDateChange={(txt) => setState({...state, birthdate: txt})}
                />
              </View>
              <View style={Styles.InputContainer}>
                <AnimInput
                  withAnim={false}
                  placeholder={`${Local("patient.my_family.relationship")}`}
                  style={{Container: Styles.AnimInputContainer}}
                  inputHandler={(txt) =>
                    setState({...state, relationship: txt})
                  }
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <DmzButton
                  onPress={onClosePopup}
                  text="Cancel"
                  style={{
                    Container: {
                      alignSelf: 'center',
                      marginTop: 30,
                      borderColor: '#ff1f75',
                      borderWidth: 1,
                    },
                    Text: {color: '#ff1f75'},
                  }}
                />
                <DmzButton
                  onPress={onSubmit}
                  text="Add"
                  isLoading={isPatientAccountReducerLoading}
                  style={{
                    Container: {
                      alignSelf: 'center',
                      marginTop: 30,
                      backgroundColor: '#ff1f75',
                      borderWidth: 0,
                    },
                    Text: {color: '#fafafa'},
                  }}
                />
              </View>
            </ScrollView>
          </BasicCard>
        </Overlay>
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  FamilyCardContainer: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    padding: 10,
    flexDirection: 'row',
  },
  CardContainer: {
    height: 120,
    width: 110,
    backgroundColor: '#fafafa',
    elevation: 2,
    paddingBottom: 5,
    borderRadius: 10,
    margin: 10,
  },
  ImageContainer: {height: '80%', width: '100%'},
  Image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  DetailsContainer: {
    height: '20%',
    width: '100%',
    padding: 5,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  AddButton: {
    height: 50,
    width: 50,
    borderRadius: 50,
    elevation: 8,
    backgroundColor: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    marginTop: 50,
  },
  AddButtonTouchable: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BasicCard: {
    height: '80%',
    width: '90%',
    marginRight: null,
    justifyContent: null,
    alignItems: null,
  },
  OverlayHeader: {
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#ff1f75',
  },
  Overlay: {justifyContent: 'center', alignItems: 'center'},
  InputContainer: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
  },
  AnimInputContainer: {borderBottomWidth: 0, height: 40},
});

const Person = ({name, relationship}) => (
  <View style={Styles.CardContainer}>
    <View style={Styles.ImageContainer}>
      <Image
        source={require('../../../assets/jpg/person1.jpg')}
        style={Styles.Image}
      />
    </View>
    <View style={Styles.DetailsContainer}>
      <DmzText
        text={name}
        type={1}
        semi_bold
        style={{lineHeight: 10, color: '#444'}}
      />
      <DmzText
        type={0}
        text={relationship}
        style={{lineHeight: 10, color: '#888'}}
      />
    </View>
  </View>
);

export default FamilyMember;
