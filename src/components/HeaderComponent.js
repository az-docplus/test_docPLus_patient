import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HeaderComponent({ showIcon, text }) {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity>
        <Image
          source={require('../../assets/arrow-back.png')}
          style={{
            width: 12,
            height: 20,
            tintColor: showIcon ? '#000' : '#51B7B7',
          }}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.headerTextStyle,
          {
            color: showIcon ? '#000' : '#51B7B7',
            fontFamily: 'Montserrat-Regular',
          },
        ]}>
        {' '}
        {text}{' '}
      </Text>
      {showIcon ? (
        <TouchableOpacity
          style={styles.headerRightIconContainer}
          onPress={() => {
            navigation.navigate('ScreenTwo');
          }}>
          <Image
            source={require('../../assets/user.png')}
            style={styles.headerIconStyle}
          />
        </TouchableOpacity>
      ) : (
        <Image
          source={require('../../assets/user.png')}
          style={{ width: 22, height: 22, tintColor: '#fff' }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextStyle: {
    fontSize: 17,
    fontWeight: '600',
  },
  headerRightIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 100,
  },
  headerIconStyle: {
    width: 22,
    height: 22,
    tintColor: '#000',
  },
});
