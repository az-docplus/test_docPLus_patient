import React, {useState} from 'react';
import {View, Text} from 'react-native';
import GradientTopNavBar from '../../../../components/molecules/TopNavBar/GradientTopNavBar';
import NotFound from '../../../../components/organisms/NotFound/NotFound';
import FancyHeaderLite from '../../../../components/organisms/FancyHeaderLite/FancyHeaderLite';
import Container from '../../../../components/organisms/Container/Container';

const Settings = ({navigation}) => {
  const [isEmpty, setIsEmpty] = useState(true);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FancyHeaderLite
        navigation={navigation}
        isClap={true}
        onLeftButtonPress={() => navigation.goBack(null)}
        headerText={'Setting'}
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
        {isEmpty ? <NotFound /> : <Text>Settings</Text>}
      </Container>
    </View>
  );
};

export default Settings;
