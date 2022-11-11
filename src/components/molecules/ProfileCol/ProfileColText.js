import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ProfilePic from '../../atoms/ProfilePic/ProfilePic';
import DmzText from '../../atoms/DmzText/DmzText';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Profile({ sourceurl, ProfileName, ProfileEmail, trigger=() => console.log('Trigger to profileColText.') }) {
      return (
            <TouchableOpacity style={[Styles.Container, { marginRight: 20 }]} onPress={() => trigger()}>
                  <View style={{ backgroundColor: '#f6f6f6', paddingHorizontal: 20, paddingVertical: 10}}>
                        <Text style={{ fontSize: 20,fontWeight: 'bold', letterSpacing: 2,  textTransform: 'uppercase'}}>{ProfileName.slice(0, 2)}</Text>
                  </View>
                  <View style={Styles.ProfileDetail}>
                        <DmzText text={ProfileName} style={Styles.ProfileInfoTextPrimary} />
                        <DmzText text={ProfileEmail} style={Styles.ProfileInfoTextSecondary} />
                  </View>
            </TouchableOpacity>
      );
}

const Styles = StyleSheet.create({
      Container: {
            alignItems: 'flex-start',
      },
      ProfilePic: {
            width: 85,
            height: 57,
            borderRadius: 15,
      },
      ProfileDetail: {
            // marginLeft: 10,
      },
      ProfileInfoTextPrimary: {
            color: '#000',
            fontSize: 12,
            lineHeight: null,
            letterSpacing: 0.5,
      },
      ProfileInfoTextSecondary: {
            color: '#949494',
            fontWeight: '500',
            fontSize: 9,
            lineHeight: null,
      },
});
export default Profile;
