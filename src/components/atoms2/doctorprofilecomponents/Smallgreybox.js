import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Image,
  Animated,
  Easing,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';

const Smallgreybox = (props) => {
  const [hide, setHide] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setHide(!hide);
      }}>
      <View
        style={{
          height: 40,
          width: 120,
          backgroundColor: '#EEEEEE',
          marginTop: 10,
          marginLeft: 10,
          marginBottom: 5,
          flexDirection: 'row',

          borderRadius: 15,
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 16,
            marginLeft: 30,
            marginTop: 10,
          }}>
          {props.name}
        </Text>
        {hide && (
          <Image
            style={{
              height: 20,
              width: 20,
              marginLeft: 8,
              marginRight: 8,
              marginTop: 10,
            }}
            source={require('../../../assets/png/close.png')}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Smallgreybox;
