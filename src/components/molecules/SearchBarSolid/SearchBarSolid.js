import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Colors } from '../../../styles/colorsV2';
import { useSelector, useDispatch } from 'react-redux';
import { Local } from '../../../i18n';
import InsetShadow from 'react-native-inset-shadow';
import AntiDesingIcon from 'react-native-vector-icons/Feather';
import { StyleSheet } from 'react-native';
import { Easing } from 'react-native';
import { Animated } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
function SearchBarSolid({
  withIcon,
  icon,
  searchIcon,
  placeholder,
  placeholderTextColor,
  onChangeText = false,
  onEndEditing,
  style = {},
  handleBottomList,
  extTextChange = () => {},
}) {
  const { theme } = useSelector((state) => state.AuthReducer);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const inputTextRefMove = useRef(new Animated.Value(0)).current;
  const inputTextRefSize = useRef(new Animated.Value(1)).current;
  console.log('inputTextRefMove', searchText);
  const moveUp = () => {
    Animated.parallel([
      Animated.timing(inputTextRefMove, {
        toValue: -33,
        duration: 500,
        easing: Easing.elastic(),
        useNativeDriver: true,
      }),
      Animated.timing(inputTextRefSize, {
        toValue: 0.7,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      onEndEditing(searchText);
      setLoading(false);
    }, 1000);
  }, [searchText]);

  return (
    <View
      style={{
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Animated.View
        style={[
          styles.animatedText,
          {
            transform: [
              {
                translateY: -35,
                scale: inputTextRefSize,
                translateX: inputTextRefSize < 0.7 ? 22 : -40,
              },
            ],
          },
        ]}>
        <Feather
          // onPress={() => {
          //   // Keyboard.dismiss();
          //   setOpen(true);
          // }}
          name="search"
          size={25}
          style={{ color: '#767676' }}
        />
        <Text
          style={{
            marginLeft: 5,
            fontSize: 16,
            padding: 0,
            margin: 0,
            textAlignVertical: 'center',
            height: '100%',
            color: '#707585',
            fontFamily: 'Gilroy-Medium',
          }}>
          {`${Local('doctor.V2.meidcalHistory.search')}`} {placeholder} {`${Local('doctor.V2.meidcalHistory.by_name')}`}
        </Text>
      </Animated.View>
      <InsetShadow
        shadowOpacity={1}
        shadowOffset={15}
        containerStyle={styles.numberField}
        // shadowOffset={10}
        elevation={12}>
        {/* {searchIcon && (
          <TouchableOpacity style={{}} onPress={() => onEndEditing(searchText)}>
            {searchIcon ?? null}
          </TouchableOpacity>
        )} */}
        <TextInput
          style={{
            textDecorationLine: 'none',
            height: 40,
            lineHeight: 14,
            fontSize: 16,
            color: Colors.primary_text_color[theme],
            flex: 1,
            fontFamily: 'Gilroy-Medium',
          }}
          onTouchStart={(e) => {
            moveUp();
          }}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : 'black'
          }
          value={searchText}
          // placeholder={
          //   placeholder
          //     ? placeholder
          //     : `${Local('patient.landing_page.search_by_symptom')}`
          // }
          // onEndEditing={() => onEndEditing(searchText)}
          onChangeText={(text) => {
            setSearchText(text);
            // extTextChange(text);
            if (onChangeText) {
              // onEndEditing(searchText)
            }
          }}
          // enablesReturnKeyAutomatically
        />
        {searchText !== '' ? (
          <View>
            {loading ? (
              <ActivityIndicator color="gray" size="small" />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setSearchText('');
                }}>
                <AntDesign
                  name="closecircle"
                  size={20}
                  style={{ color: '#297281' }}
                />
              </TouchableOpacity>
            )}
          </View>
        ) : null}
      </InsetShadow>
    </View>
    //   <TouchableOpacity onPress={handleBottomList}>
    //     {withIcon && icon}
    //   </TouchableOpacity>
    // </View>
  );
}

export default SearchBarSolid;
const styles = StyleSheet.create({
  numberField: {
    flex: 1,
    borderRadius: 10,
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    height: 50,
    // width: '96%',
    marginHorizontal: 20,
    borderWidth: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  animatedText: {
    left: 10,
    flexDirection: 'row',
    color: '#707585',
    position: 'absolute',
    zIndex: -1,
    height: '100%',
    paddingLeft: 22,
    alignItems: 'center',
  },
});
