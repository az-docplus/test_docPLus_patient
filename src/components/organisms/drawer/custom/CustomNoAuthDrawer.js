import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Local } from '../../../../i18n';
import { NEW_PRIMARY_COLOR } from '../../../../styles/colors';
function CustomNoAuthDrawer({ navigation }) {



  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{
          resizeMode: 'contain',
          width: '60%',
          height: "50%"
        }}
        // source={require('../../../../assets/images/docplusIcon.png')}
        source={require('../../../../assets/icons/new_docplus_log.png')}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('Auth', { signup: false });
          // navigation.navigate('loginScreen', {signup: false});
        }}
        style={{
          height: 40,
          width: '50%',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: NEW_PRIMARY_COLOR,
          borderRadius: 12,
        }}>
        <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Montserrat-SemiBold' }}>{`${Local("patient.signup.sign_in_caps")}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('Auth', { signup: true });
          // navigation.navigate('loginScreen', {signup: true});
        }}
        style={{
          height: 40,
          width: '50%',
          marginTop: "2%",
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: NEW_PRIMARY_COLOR,
          borderRadius: 12,
        }}>
        <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Montserrat-SemiBold' }}>{`${Local("patient.signup.SIGN UP")}`}</Text>
      </TouchableOpacity>



      {/* section 2 rahul need to remove  */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('screen-first');
        }}
        style={{
          height: 40,
          width: '50%',
          marginTop: "2%",
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: NEW_PRIMARY_COLOR,
          borderRadius: 12,
        }}>
        <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Montserrat-SemiBold' }}>Welcome screen</Text>
      </TouchableOpacity>

    </View>
  );
}

export default CustomNoAuthDrawer;