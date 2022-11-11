import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import BlurModal from './BlurModal';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
  NEW_PRIMARY_COLOR,
  NEW_HEADER_TEXT,
} from '../../../styles/colors';
import {useSelector, useDispatch} from 'react-redux';
import {CheckBox} from 'react-native-elements';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import AnimatedErrorText from '../../../components/atoms/animatedErrorText/AnimatedErrorText';
import TextInputIcon from '../../../components/atoms/TextInputCustom/TextInputIcon';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';

const InviteViaEmail = ({
  onCancel,
  visible,
  setVisible,
  onUpdate,
  errors,
  staff,
  data,
  editMode,
}) => {
  const {theme} = useSelector((state) => state.AuthReducer);
  const [permissions, setPermissions] = useState([]);
  const [checkb, setCheckb] = useState(false);

  const [error, setError] = useState({
    // name: true,
    phone: true,
    email: true,
  });

  const [credential, setCredential] = useState({
    // name: '',
    email: '',
    phone: '',
  });

  if (
    data &&
    data.access_type &&
    data.access_type.length &&
    data.access_type.length != permissions.length
  ) {
    setPermissions(data.access_type);
  }

  useEffect(() => {
    if (editMode) {
      setCredential({
        ...credential,
        ...data,
        email: data.email,
        // phone: data.phone,
      });
    } else {
      setCredential({
        // name: '',
        email: '',
        phone: '',
      });
    }
  }, [editMode || data]);

  const SetCredential = (credentialName, value) => {
    const nameReg = /^[a-zA-Z]+\s?[a-zA-Z]+$/;
    const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneReg = /^[1-9]{1}\d{9}$/;

    let match = true;

    switch (credentialName) {
      // case 'name':
      //   match = nameReg.test(value);
      //   break;
      case 'email':
        match = emailReg.test(value);
        break;
      case 'phone':
        match = phoneReg.test(value);
        break;
    }
    setError({...error, [`${credentialName}`]: match});
    setCredential({...credential, [`${credentialName}`]: value});
  };

  const handleCancel = () => {
    setPermissions([]);
    onCancel();
  };
  const useForceUpdate = () => {
    const [, updateState] = useState();
    return useCallback(() => updateState({}), []);
  };
  const forceUpdate = useForceUpdate();

  if (staff)
    return (
      <BlurModal {...{visible, setVisible, onCancel: handleCancel}}>
        {!editMode && (
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 13,
              color: Colors.input_placeholder_color[theme],
              alignSelf: 'flex-start',
              elevation: 10,
            }}>
            {Local('doctor.my_staff.invite_email')}
          </Text>
        )}
        {!editMode && (
          <View View>
            <TextInputIcon
              placeholder={`${Local('doctor.my_staff.email')}`}
              inputHandler={(text) => SetCredential('email', text)}
              autoCapitalize="none"
              keyboardType={'email-address'}
              placeholderTextColor={Colors.input_placeholder_color[theme]}
              // color={Colors.input_placeholder_color[theme]}
              style={[
                styles.inputStyle,
                !error.email && {borderBottomColor: 'red'},
                {color: Colors.primary_text_color[theme]},
              ]}
              textStyle={[
                styles.textStyle,
                {color: Colors.input_placeholder_color[theme]},
              ]}
              //validationCallback={() => reg.test(title)}
              value={credential.email}
            />
            {!error.email && (
              <AnimatedErrorText
                style={{width: '70%', alignSelf: 'center'}}
                text={'Email ID should be valid'}
              />
            )}
          </View>
        )}
        {/* 
        <View>
          <TextInputIcon
            placeholder="Name"
            inputHandler={(text) => SetCredential('name', text)}
            placeholderTextColor={INPUT_PLACEHOLDER}
            style={[
              styles.inputStyle,
              !error.name && { borderBottomColor: 'red' },
            ]}
            textStyle={styles.textStyle}
            value={error.name}
          />
          {!error.name && (
            <AnimatedErrorText
              style={{ width: '70%', alignSelf: 'center' }}
              text={'First Name should be valid'}
            />
          )}
        </View> */}

        {/* <View>
          <TextInputIcon
            placeholder="Last Name"
            inputHandler={(text) => SetCredential('lastName', text)}
            placeholderTextColor={INPUT_PLACEHOLDER}
            style={[
              styles.inputStyle,
              !error.lastName && { borderBottomColor: 'red' },
            ]}
            textStyle={styles.textStyle}
            value={error.lastName}
          />
          {!error.lastName && (
            <AnimatedErrorText
              style={{ width: '70%', alignSelf: 'center' }}
              text={'Last Name should be valid'}
            />
          )}
        </View> */}

        {/* {!editMode && <View style={{ marginBottom: "4%" }}>
          <TextInputIcon
            placeholder={`${Local("doctor.my_staff.phone_number")}`}
            keyboardType={'number-pad'}
            inputHandler={(text) => SetCredential('phone', text)}
            placeholderTextColor={Colors.input_placeholder_color[theme]}
            style={[
              styles.inputStyle,
              !error.phone && { borderBottomColor: 'red' },
            ]}
            textStyle={[styles.textStyle, {color: Colors.primary_text_color[theme]}]}
            value={credential.phone}
          />
          {!error.phone && (
            <AnimatedErrorText
              style={{ width: '70%', alignSelf: 'center' }}
              text={'Phone number should be valid'}
            />
          )}
        </View>} */}

        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 13,
            color: Colors.input_placeholder_color[theme],
            alignSelf: 'flex-start',
          }}>
          {Local('doctor.my_staff.permissions')} :
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginTop: '4%',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 16,
              color: Colors.primary_text_color[theme],
            }}>
            {Local('doctor.my_staff.my_appointments')} :
          </Text>
          <CheckBox
            name="My Appointments"
            containerStyle={{
              marginTop: '-4%',
            }}
            checked={
              checkb && permissions && permissions.includes('My Appointments')
            }
            onPress={(e) => {
              setCheckb(true);
              const _permissions = permissions;
              if (_permissions.includes('My Appointments')) {
                const index = _permissions.indexOf('My Appointments');
                _permissions.splice(index, 1);
              } else {
                _permissions.push('My Appointments');
              }
              setPermissions(_permissions);
              forceUpdate();
            }}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 16,
              color: Colors.primary_text_color[theme],
            }}>
            {Local('doctor.my_staff.questionnaire')} :
          </Text>
          <CheckBox
            containerStyle={{
              marginTop: '-4%',
            }}
            name="Questionnaire"
            checked={
              checkb && permissions && permissions.includes('Questionnaire')
            }
            onPress={(e) => {
              setCheckb(true);
              const _permissions = permissions;
              if (_permissions.includes('Questionnaire')) {
                const index = _permissions.indexOf('Questionnaire');
                _permissions.splice(index, 1);
              } else {
                _permissions.push('Questionnaire');
              }
              setPermissions(_permissions);
              forceUpdate();
            }}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 16,
              color: Colors.primary_text_color[theme],
            }}>
            {Local('doctor.my_staff.clinics')} :
          </Text>

          <CheckBox
            containerStyle={{
              marginTop: '-4%',
            }}
            name="Clinics"
            checked={checkb && permissions && permissions.includes('Clinics')}
            onPress={(e) => {
              setCheckb(true);
              const _permissions = permissions;
              if (_permissions.includes('Clinics')) {
                const index = _permissions.indexOf('Clinics');
                _permissions.splice(index, 1);
              } else {
                _permissions.push('Clinics');
              }
              setPermissions(_permissions);
              forceUpdate();
            }}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 16,
              color: Colors.primary_text_color[theme],
            }}>
            {Local('doctor.my_staff.availiblity')} :
          </Text>
          <CheckBox
            containerStyle={{
              marginTop: '-4%',
            }}
            name="Availiblity"
            checked={
              checkb && permissions && permissions.includes('Availiblity')
            }
            onPress={(e) => {
              setCheckb(true);
              const _permissions = permissions;
              if (_permissions.includes('Availiblity')) {
                const index = _permissions.indexOf('Availiblity');
                _permissions.splice(index, 1);
              } else {
                _permissions.push('Availiblity');
              }
              setPermissions(_permissions);
              forceUpdate();
            }}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 16,
              color: Colors.primary_text_color[theme],
            }}>
            {Local('doctor.my_staff.my_staff')} :
          </Text>
          <CheckBox
            containerStyle={{
              marginTop: '-4%',
            }}
            name="My Staff"
            checked={checkb && permissions && permissions.includes('My Staff')}
            onPress={(e) => {
              setCheckb(true);
              const _permissions = permissions;
              if (_permissions.includes('My Staff')) {
                const index = _permissions.indexOf('My Staff');
                _permissions.splice(index, 1);
              } else {
                _permissions.push('My Staff');
              }
              setPermissions(_permissions);
              forceUpdate();
            }}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 16,
              color: Colors.primary_text_color[theme],
            }}>
            {Local('doctor.my_staff.payment')} :
          </Text>
          <CheckBox
            containerStyle={{
              marginTop: '-4%',
            }}
            name="Payment"
            checked={checkb && permissions && permissions.includes('Payment')}
            onPress={(e) => {
              setCheckb(true);
              const _permissions = permissions;
              if (_permissions.includes('Payment')) {
                const index = _permissions.indexOf('Payment');
                _permissions.splice(index, 1);
              } else {
                _permissions.push('Payment');
              }
              setPermissions(_permissions);
              forceUpdate();
            }}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 16,
              color: Colors.primary_text_color[theme],
            }}>
            {Local('doctor.my_staff.my_teams')} :
          </Text>
          <CheckBox
            name="My Teams"
            containerStyle={{
              marginTop: '-4%',
            }}
            checked={checkb && permissions && permissions.includes('My Teams')}
            onPress={(e) => {
              setCheckb(true);
              const _permissions = permissions;
              if (_permissions.includes('My Teams')) {
                const index = _permissions.indexOf('My Teams');
                _permissions.splice(index, 1);
              } else {
                _permissions.push('My Teams');
              }
              setPermissions(_permissions);
              forceUpdate();
            }}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 16,
              color: Colors.primary_text_color[theme],
            }}>
            {Local('doctor.my_staff.skin')} :
          </Text>
          <CheckBox
            name="Skins"
            containerStyle={{
              marginTop: '-4%',
            }}
            checked={checkb && permissions && permissions.includes('Skins')}
            onPress={(e) => {
              setCheckb(true);
              const _permissions = permissions;
              if (_permissions.includes('Skins')) {
                const index = _permissions.indexOf('Skins');
                _permissions.splice(index, 1);
              } else {
                _permissions.push('Skins');
              }
              setPermissions(_permissions);
              forceUpdate();
            }}
          />
        </View>

        <DmzButton
          disabled={
            //    !error.name ||
            (!editMode && !error.email) ||
            // !editMode && !error.phone ||
            //    credential.name === '' ||
            (!editMode && credential.email === '')
            // !editMode && credential.phone === ''
          }
          onPress={() => {
            setCheckb(false);
            onUpdate(credential, permissions);
            setCredential({
              // name: '',
              email: '',
              phone: '',
            });
          }}
          style={{
            Text: {
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: 16,
              fontFamily: 'Montserrat-SemiBold',
            },
            Container: {
              width: '50%',
              height: 40,
              borderRadius: 25,
              backgroundColor: SECONDARY_COLOR,
              elevation: 3,
            },
          }}
          text={editMode ? 'UPDATE' : 'INVITE'}
        />
      </BlurModal>
    );

  if (!staff)
    return (
      <BlurModal {...{visible, onCancel}}>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 13,
            color: Colors.input_placeholder_color[theme],
            alignSelf: 'flex-start',
          }}>
          {Local('doctor.my_staff.invite_email')}
        </Text>
        <View>
          <TextInputIcon
            autoCapitalize="none"
            placeholder={`${Local('doctor.my_staff.email')}`}
            inputHandler={(text) => SetCredential('email', text)}
            keyboardType={'email-address'}
            placeholderTextColor={Colors.input_placeholder_color[theme]}
            style={[
              styles.inputStyle,
              !error.email && {borderBottomColor: 'red'},
            ]}
            textStyle={[
              styles.textStyle,
              {color: Colors.primary_text_color[theme]},
            ]}
            //validationCallback={() => reg.test(title)}
            value={credential.email}
          />
          {!error.email && (
            <AnimatedErrorText
              style={{width: '70%', alignSelf: 'center'}}
              text={'Email ID should be valid'}
            />
          )}
        </View>

        {/* <View style={{ marginBottom: "4%" }}>
          <TextInputIcon
            placeholder={`${Local("doctor.my_staff.phone_number")}`}
            keyboardType={'number-pad'}
            inputHandler={(text) => SetCredential('phone', text)}
            placeholderTextColor={Colors.input_placeholder_color[theme]}
            style={[
              styles.inputStyle,
              !error.phone && { borderBottomColor: 'red' },
            ]}
            textStyle={[styles.textStyle, {color: Colors.primary_text_color[theme]}]}
            value={credential.phone}
          />
          {!error.phone && (
            <AnimatedErrorText
              style={{ width: '70%', alignSelf: 'center' }}
              text={'Phone number should be valid'}
            />
          )}
        </View> */}

        <DmzButton
          disabled={
            !error.email ||
            // !error.phone ||
            credential.email === ''
            // credential.phone === ''
          }
          onPress={() => {
            onUpdate(credential, permissions);
            setCredential({
              // name: '',
              email: '',
              phone: '',
            });
          }}
          style={{
            Text: {
              width: '100%',
              textAlign: 'center',
              // color: '#fff',
              color: Colors.primary_text_color[theme],
              fontSize: 16,
              fontFamily: 'Montserrat-SemiBold',
            },
            Container: {
              width: '50%',
              height: 40,
              borderRadius: 25,
              backgroundColor: Colors.ctx_primary_color[theme],
              elevation: 3,
            },
          }}
          text="INVITE"
        />
      </BlurModal>
    );
};

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    borderBottomColor: NEW_PRIMARY_COLOR,
    borderBottomWidth: 1,
    height: 'auto',
    alignSelf: 'center',
    marginBottom: '2%',
  },
  textStyle: {
    // color: NEW_HEADER_TEXT,
    fontSize: 14,
    width: '100%',
    fontFamily: 'Montserrat-Medium',
  },
});

export default InviteViaEmail;
