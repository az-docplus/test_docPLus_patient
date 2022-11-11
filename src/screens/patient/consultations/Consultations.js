import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomNavigationComponent from '../../../components/old/BottomNavigation/BottomNavigation.component';

const Consultations = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Consult</Text>
      <BottomNavigationComponent activeOption={2} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Consultations;
