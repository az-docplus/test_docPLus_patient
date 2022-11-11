import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../../../styles/colorsV2';

function RadioBtnVertical({
  active,
  keyName,
  value = 'null',
  setKeyName = () => {},
}) {
  const {theme} = useSelector((state) => state.AuthReducer);
  const onPress = () => {
    setKeyName(keyName);
  };

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: '5%',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        paddingHorizontal: '5%',
      }}>
      <TouchableWithoutFeedback onPress={onPress} style={[Styles.Touchable, { borderColor: Colors.primary_color[theme]}]}>
        {active && (
          <View
            style={{
              backgroundColor: Colors.primary_color[theme],
              height: 12,
              width: 12,
              borderRadius: 12,
            }}></View>
        )}
      </TouchableWithoutFeedback>
      <Text style={[Styles.Text, {color: Colors.primary_text_color[theme],}]}>{value}</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  Touchable: {
    height: 18,
    width: 18,
    borderRadius: 18,
    borderWidth: 1,
    // borderColor: '#43A2A2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    // fontWeight: 'bold',
    fontSize: 16,
    marginLeft: '4%',
  },
});
export default RadioBtnVertical;
