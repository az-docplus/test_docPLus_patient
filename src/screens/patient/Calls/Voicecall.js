import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {
  NEW_PRIMARY_LIGHT_BG,
  NEW_HEADER_TEXT,
  NEW_PRIMARY_COLOR,
} from '../../../styles/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const VoiceCall = ({navigation}) => {
  const onSpeaker = () => {},
    onVideo = () => {},
    onMute = () => {},
    onChat = () => {},
    onEnd = () => {};

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TopNavBar
        hideRightComp
        navigation={navigation}
        headerText="Ongoing Appointment"
        style={{
          Container: {marginTop: 5, marginBottom: 10},
        }}
      />

      <View
        style={{
          paddingVertical: 25,
          backgroundColor: NEW_PRIMARY_LIGHT_BG,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 22,
            color: NEW_HEADER_TEXT,
            marginBottom: 10,
          }}>
          Dr. Co Ekatarine
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 18,
            color: NEW_HEADER_TEXT,
          }}>
          15:44
        </Text>
      </View>

      <Image
        source={require('../../../assets/jpg/person4.jpg')}
        style={{
          width: '100%',
          flex: 1,
        }}
        resizeMode="cover"
      />

      <View
        style={{
          height: 80,
          backgroundColor: NEW_PRIMARY_LIGHT_BG,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity onPress={onSpeaker}>
          <Image
            source={require('../../../assets/icons/call/speaker.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onVideo}>
          <Image
            source={require('../../../assets/icons/call/video.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onMute}>
          <Image
            source={require('../../../assets/icons/call/mute.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onChat}>
          <Image
            source={require('../../../assets/icons/call/chat.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={onEnd}
        style={{
          position: 'absolute',
          bottom: 90,
          alignSelf: 'center',
          borderRadius: 35,
        }}>
        <View
          style={{
            backgroundColor: '#EA1A65',
            borderRadius: 35,
            height: 65,
            width: 65,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome name="phone" color="white" size={40} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VoiceCall;

const styles = StyleSheet.create({
  icon: {
    height: 28,
    width: 28,
  },
});
