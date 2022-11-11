import React from 'react';
import {View, StyleSheet} from 'react-native';
import PicturelessAvatar from '../../atoms/PicturelessAvatar/PicturelessAvatar';
import DmzText from '../../atoms/DmzText/DmzText';
import DmzButton from '../../atoms/DmzButton/DmzButton';

function CardBar({name = "unknown", imageLink}) {
  return (
    <View style={Styles.Container}>
      <View style={[Styles.CenterRow, Styles.Info]}>
        <PicturelessAvatar text={name[0]} style={Styles.PicturelessAvatar} />
        <DmzText text={name} style={Styles.DmzText} />
      </View>
      <View style={[Styles.CenterRow, Styles.Actions]}>
        <DmzButton
          text="Details"
          style={{Container: Styles.DmzButton, Text: {fontWeight: '400'}}}
        />
        <DmzButton
          theme="dark"
          text="Join"
          style={{
            Container: {width: 53, height: 31, backgroundColor: '#6230CC'},
            Text: {fontWeight: '400'},
          }}
        />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    width: '100%',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CenterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  PicturelessAvatar: {backgroundColor: '#564455', height: 38, width: 38},
  DmzText: {fontSize: 14, marginLeft: 8},
  DmzButton: {width: 80, height: 31, marginRight: 10},
});
export default CardBar;
