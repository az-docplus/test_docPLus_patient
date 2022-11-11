import React from 'react';
import {View, Text} from 'react-native';
import DmzHeader from '../../../components/organisms/DmzHeader/DmzHeader';
import Container from '../../../components/organisms/Container/Container';

import Section from '../../../components/molecules/Section/Section';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardOrder from '../../../components/molecules/CardOrder/CardOrder';
import FlatRow from '../../../components/molecules/FlatRow/FlatRow';
import DmzSwitch from '../../../components/molecules/DmzSwitch/DmzSwitch';
import ValSlider from '../../../components/molecules/ValSlider/ValSlider';

function PatientPurchase(props) {

  const { height = 0, weight = 0} = props


  return (
    <>
      <FlatRow>
        <CardOrder active />
        <CardOrder />
        <CardOrder />
        <CardOrder />
      </FlatRow>
      <Section HeaderText="My vitals" style={{marginTop: 20}}>
        <DmzSwitch
          tabOne={{
            title: 'Male',
            onPress: () => {},
            icon: <MaterialCommunityIcons name="gender-male" size={18} />,
          }}
          tabTwo={{
            title: 'Female',
            onPress: () => {},
            icon: <MaterialCommunityIcons name="gender-female" size={18} />,
          }}
        />
      </Section>
      <View style={{padding: 15}}>
        {/* <Section HeaderText="Weights(kgs)"> */}
        {/* </Section> */}

        <Text>Weights (kgs)</Text>
        <ValSlider value={height}/>
        <ValSlider value={weight}/>
      </View>
    </>
  );
}
export default PatientPurchase;
