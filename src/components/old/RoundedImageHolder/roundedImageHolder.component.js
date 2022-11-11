import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

function RoundedImageHolder({index = 0, sourceUrl, style}) {
  return (
    <View
      style={[
        RoundedImageHolderStyles.ImageWrapper,
        {
          transform: [
            {
              translateX: -(20 * index),
            },
          ],
          zIndex: -(20 * index),
        },
        style ? style.ImageWrapper : null,
      ]}>
      <Image
        source={sourceUrl}
        style={[RoundedImageHolderStyles.Image, style ? style.Image : null]}
      />
    </View>
  );
}

const RoundedImageHolderStyles = StyleSheet.create({
  ImageWrapper: {
    height: 50,
    width: 50,
    borderRadius: 50,
    overflow: 'hidden',
    borderColor: '#fff',
    borderWidth: 3,
  },
  Image: {height: '100%', width: '100%'},
});

export default RoundedImageHolder;
