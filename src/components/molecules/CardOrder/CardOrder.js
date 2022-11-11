import React from 'react';
import {View, StyleSheet} from 'react-native';
import Card from '../../atoms/Card/Card';
import DmzText from '../../atoms/DmzText/DmzText';
import ProfilePic from '../../atoms/ProfilePic/ProfilePic';
import ProgressTrack from '../../atoms/ProgressTrack/ProgressTrack';

function CardOrder({active = false, style}) {
  const propStyle = active
    ? {...style, backgroundColor: '#fff', elevation: 10}
    : {...style, backgroundColor: '#DED7D7', elevation: 1};
  return (
    <Card style={{...Styles.Container, ...propStyle}}>
      <View style={Styles.Header}>
        <DmzText
          text="2d ago"
          style={{...Styles.CommonText, ...Styles.PrimaryText}}
        />
      </View>
      <View style={Styles.Profile}>
        <ProfilePic
          sourceurl={require('../../../assets/jpg/person4.jpg')}
          style={{
            Container: {
              height: 64,
              width: 64,
              borderRadius: 64,
            },
            Image: {
              borderRadius: 64,
            },
          }}
        />
      </View>
      <View style={Styles.Info}>
        <DmzText
          text="Medicine Name"
          style={{...Styles.CommonText, ...Styles.PrimaryText}}
        />
        <DmzText
          text="Prescribed by"
          style={{
            ...Styles.CommonText,
            ...Styles.SecondaryText,
            ...Styles.BoldText,
          }}
        />
      </View>
      <View style={Styles.Progress}>
        <ProgressTrack ProgressVal={60} progressColor="#252393" />
        <DmzText
          text="track"
          style={{
            ...Styles.CommonText,
            ...Styles.PrimaryText,
            ...Styles.BoldText,
          }}
        />
      </View>
    </Card>
  );
}

const Styles = StyleSheet.create({
  Container: {
    height: 200,
    width: 180,
    borderRadius: 16,
    padding: 15,
    marginRight: 20,
  },
  CommonText: {
    lineHeight: null,
    fontWeight: '500',
    fontSize: 12,
  },
  PrimaryText: {
    color: '#000',
  },
  SecondaryText: {
    color: '#949494',
  },
  BoldText: {
    fontWeight: 'bold',
  },
  Header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Profile: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Info: {
    flex: 2,
    marginTop: 5,
  },
  Progress: {
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
});
export default CardOrder;
