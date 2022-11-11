import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';

const LoadingButton = ({
  isLoading = false,
  text = 'no text',
  onClick = () => console.log('Click on empty Loading button.'),
}) => {
  const Dimen = useWindowDimensions();
  const screenWidth = Dimen.width;
  return (
    <TouchableOpacity
      style={{
        width: screenWidth * 0.8,
        height: 52,
        backgroundColor: '#EB4B2B',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '10%',
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'row',
      }}
      onPress={() => (isLoading ? null : onClick())}>
      <Text style={[{color: '#f1f1f1'}, isLoading && {opacity: 0.5}]}>
        {text}
      </Text>
      {isLoading && (
        <ActivityIndicator color={'#fff'} style={{marginLeft: 5}} />
      )}
    </TouchableOpacity>
  );
};

export default LoadingButton;
