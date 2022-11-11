import React from 'react';
import {View, FlatList, Text} from 'react-native';

function VerticalSlider() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          height: 200,
          width: 50,
          borderRadius: 20,
        }}>
        <FlatList
          keyExtractor={item => `${item}`}
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          snapToInterval={67}
          renderItem={({item}) => (
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                height: 200 / 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default VerticalSlider;
