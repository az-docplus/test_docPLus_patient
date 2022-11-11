import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import BlurModal from './BlurModal';
import {
  NEW_HEADER_TEXT,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CallModal = ({
  visible,
  onCancel,
  onVoiceCall,
  onVideoCall,
  onCancelAppointment,
}) => (
  <BlurModal {...{visible, onCancel}}>
    <Text
      style={{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 23,
        color: NEW_HEADER_TEXT,
      }}>
      Call Now
    </Text>

    <TouchableOpacity
      onPress={onCancelAppointment}
      style={{
        marginTop: '6%',
        backgroundColor: '#4BB543',
        padding: '4%',
        borderRadius: 10,
      }}>
      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 14,
          color: '#fafafa',
        }}>
        Mark Appointment as complete
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      // onPress={onCancelAppointment}
      style={{
        marginTop: '6%',
        backgroundColor: 'transparent',
        borderColor: '#444',
        padding: '4%',
        borderRadius: 10,
        borderWidth: 1,
      }}>
      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 14,
          color: '#444',
        }}>
        View Profile
      </Text>
    </TouchableOpacity>

    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        marginTop: 25,
      }}>
      {/* <TouchableOpacity onPress={onVoiceCall}>
        <View
          style={{
            backgroundColor: NEW_PRIMARY_BACKGROUND,
            borderRadius: 35,
            height: 65,
            width: 65,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome name="phone" color="white" size={40} />
        </View>
      </TouchableOpacity> */}

      <TouchableOpacity onPress={onVideoCall}>
        <View
          style={{
            backgroundColor: NEW_PRIMARY_BACKGROUND,
            borderRadius: 35,
            height: 65,
            width: 65,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome5 name="video" color="white" size={35} />
        </View>
      </TouchableOpacity>
    </View>
  </BlurModal>
);

export default CallModal;
