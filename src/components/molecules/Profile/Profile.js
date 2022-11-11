import React from 'react';
import {View, StyleSheet} from 'react-native';
import ProfilePic from '../../atoms/ProfilePic/ProfilePic';
import DmzText from '../../atoms/DmzText/DmzText';

function Profile({sourceurl, ProfileName, Age}) {
  return (
    <View style={Styles.Container}>
      <ProfilePic sourceurl={sourceurl} />
      <View style={Styles.ProfileDetail}>
        <DmzText text="Hi," style={Styles.ProfileInfoTextPrimary} />
        <DmzText text={ProfileName} style={Styles.ProfileInfoTextPrimary} />
        <DmzText text={`Age ${Age}`} style={Styles.ProfileInfoTextSecondary} />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ProfileDetail: {
    marginLeft: 10,
  },
  ProfileInfoTextPrimary: {
    color: '#fff',
    fontSize: 22,
  },
  ProfileInfoTextSecondary: {
    color: '#FFFDFD',
    fontWeight: '400',
  },
});
export default Profile;
