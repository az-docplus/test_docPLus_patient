import React, {useState} from 'react';
import {View, Text} from 'react-native';
import NotFound from '../../../../components/organisms/NotFound/NotFound';
import GradientTopNavBar from '../../../../components/molecules/TopNavBar/GradientTopNavBar';
import FancyHeaderLite from '../../../../components/organisms/FancyHeaderLite/FancyHeaderLite';
import Container from '../../../../components/organisms/Container/Container';
const Help = ({navigation}) => {
  const [isEmpty, setIsEmpty] = useState(true);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FancyHeaderLite
        navigation={navigation}
        isClap={true}
        onLeftButtonPress={() => navigation.goBack(null)}
        headerText={'Help'}
        style={{Section: {overflow: 'hidden', height: '20%', marginBottom: 0}}}
      />
      <Container
        style={{
          height: '75%',
          transform: [{translateY: -30}],
          zIndex: 999,
          backgroundColor: '#fff',
          padding: 5,
          paddingTop: 15,
        }}>
        {isEmpty ? <NotFound /> : <Text>Help</Text>}
      </Container>
    </View>
  );
};

export default Help;
