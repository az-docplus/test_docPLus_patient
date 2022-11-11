import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const NotFound = () => {
  console.log('not found');
  return (
    <View style={[styles.container]}>
      <Image
        source={require('../../../assets/png/no_data_found.png')}
        style={styles.image}
      />
      <Text style={styles.text}>No Data Found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '53%',
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {},
});

export default NotFound;
