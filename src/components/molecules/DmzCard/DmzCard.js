import React from 'react';
import {View, StyleSheet} from 'react-native';
import Card from '../../atoms/Card/Card';
import {hextorgba} from '../../../utils/hextorgba';
import DmzText from '../../atoms/DmzText/DmzText';
import Icon from '../../atoms/Icon/Icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SubSupScriptText from '../../atoms/SubSupScriptText/SubSupScriptText';
function DmzCard({title, titleSuper, icon, color}) {
  return (
    <>
      <Card
        style={{backgroundColor: hextorgba(color, 0.2), ...Styles.Container}}>
        <Icon
          type="svg"
          Icon={
            <MaterialCommunityIcons name="message" size={24} color={color} />
          }
          style={{alignSelf: 'flex-start'}}
        />
        <DmzText text="Messages" style={{color, fontSize: 16}}>
          <SubSupScriptText
            text={'+2'}
            type="sup"
            style={{fontSize: 14, color}}
          />
        </DmzText>
      </Card>
    </>
  );
}
const Styles = StyleSheet.create({
  Container: {justifyContent: 'flex-start', paddingLeft: 20, padding: 10},
});
export default DmzCard;
