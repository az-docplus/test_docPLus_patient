import React from 'react';
import {View, StyleSheet} from 'react-native';
import Profile from '../../molecules/Profile/Profile';
import DmzHeaderAtom from '../../atoms/DmzHeader/DmzHeaderAtom';
import Icon from '../../atoms/Icon/Icon';
import NavHam from '../../../assets/svg/nav_ham.svg';
function DmzHeader({style, name="Nicolas Dave", age="29"}) {
  return (
    <DmzHeaderAtom style={{...Styles.DmzHeaderAtom, ...style}}>
      <Profile
        sourceurl={require('../../../assets/jpg/person1.jpg')}
        ProfileName={name}
        Age={age}
      />
      {/* <Icon type={'svg'} Icon={<NavHam height={24} width={24} />} /> */}
    </DmzHeaderAtom>
  );
}
const Styles = StyleSheet.create({
  DmzHeaderAtom: {
    height: 200,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 40,
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 0,
  },
});

export default DmzHeader;
