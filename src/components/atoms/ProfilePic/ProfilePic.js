import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

function ProfilePic({sourceurl, style}) {
  return (
    <View style={[ProfilePicStyles.Container, style ? style.Container : null]}>
      <Image
        source={sourceurl}
        style={[ProfilePicStyles.Picture, style ? style.Image : null]}
      />
    </View>
  );
}

const ProfilePicStyles = StyleSheet.create({
  Container: {
    height: 90,
    width: 86,
    borderRadius: 20,
  },
  Picture: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
});
export default ProfilePic;
