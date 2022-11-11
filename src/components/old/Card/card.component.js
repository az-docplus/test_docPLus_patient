import React from 'react';
import {View, StyleSheet, Text, Switch, Image} from 'react-native';

function Card({style, headercomponent, balance}) {
  return (
    <View style={[CardStyles.CardContainer, style]}>
      <View style={CardStyles.Header}>
        {headercomponent === 'switch' ? (
          <Switch
            trackColor={{false: '#767577', true: '#fff'}}
            thumbColor={'#f3f3f3'}
            ios_backgroundColor="#3e3e3e"
            value={true}
            style={{left: -10}}
          />
        ) : (
          <Image
            style={{height: 18, width: 60}}
            source={require('../../../assets/png/visa_logo.png')}
          />
        )}
        <Image
          source={require('../../../assets/png/pinktick.png')}
          style={{height: 24, width: 24}}
        />
      </View>
      <View style={CardStyles.Content}>
        <Text
          style={[
            CardStyles.SecondaryText,
            style ? style.SecondaryText : null,
          ]}>
          Balance
        </Text>
        <Text
          style={[CardStyles.PrimaryText, style ? style.PrimaryText : null]}>
          {balance}
        </Text>
      </View>
    </View>
  );
}

const CardStyles = StyleSheet.create({
  CardContainer: {
    width: '45%',
    elevation: 8,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Content: {
    marginTop: 10,
  },
  SecondaryText: {
    color: '#e9e9e9',
    fontSize: 12,
  },
  PrimaryText: {
    color: '#fefefe',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default Card;
