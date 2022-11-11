import React from 'react';
import {View, StyleSheet} from 'react-native';
import CardInRow from '../CardInRow/CardInRow';
import DmzCard from '../DmzCard/DmzCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
function CardGrid() {
  return (
    <View style={Styles.Container}>
      <CardInRow>
        <DmzCard
          title={'Message'}
          titleSuper={'+2'}
          icon={<MaterialCommunityIcons name="message" />}
          color={'#312EB7'}
        />
        <DmzCard
          title={'Message'}
          titleSuper={'+2'}
          icon={<MaterialCommunityIcons name="message" />}
          color={'#312EB7'}
        />
      </CardInRow>
      <CardInRow>
        <DmzCard
          title={'Message'}
          titleSuper={'+2'}
          icon={<MaterialCommunityIcons name="message" />}
          color={'#312EB7'}
        />
        <DmzCard
          title={'Message'}
          titleSuper={'+2'}
          icon={<MaterialCommunityIcons name="message" />}
          color={'#312EB7'}
        />
      </CardInRow>
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    width: '100%',
    padding: 20,
  },
});

export default CardGrid;
