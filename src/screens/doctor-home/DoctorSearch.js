import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Local } from '../../i18n';
import { Colors } from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import InsetShadow from 'react-native-inset-shadow';
const DoctorSearch = ({
  onPress,
  value,
  onTextChange,
  focusMode,
  onCancle,
}) => {
  return (
    <View>
      <InsetShadow
        shadowOpacity={1}
        shadowOffset={15}
        containerStyle={styles.numberField}
        // shadowOffset={10}
        elevation={12}>
        <Feather
          // onPress={() => {
          //   // Keyboard.dismiss();
          //   setOpen(true);
          // }}
          name="search"
          size={25}
          style={{ color: '#14142B', marginLeft: 10 }}
        />
        <TextInput
          onFocus={focusMode}
          style={styles.searchInput}
          onSubmitEditing={onPress}
          value={value}
          onChangeText={onTextChange}
          placeholder={`${Local('doctor.V2.doctor_home.search')}`}
          placeholderTextColor={Colors.ICONCOLOR}
        />

        {value !== '' && (
          <TouchableOpacity
            onPress={onCancle}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              right: 20,
            }}>
            <AntDesign
              name="closecircle"
              size={16}
              style={{ color: '#297281' }}
            />
            {/* <Image
          source={require('../../../assets/submit.png')}
          style={styles.singleIcon}
        /> */}
          </TouchableOpacity>
        )}
      </InsetShadow>
    </View>
  );
};

export default DoctorSearch;

const styles = StyleSheet.create({
  searchInput: {
    height: 50,
    // color: 'white',
    width: '100%',
    paddingLeft: 20,
    borderRadius: 40,
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
  },
  searchContainer: {
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 40,
    elevation: 5,
    shadowColor: '#999',
    overflow: 'hidden',
  },
  singleIcon: {
    width: 36,
    height: 36,
    // tintColor: Colors.BLUE2,
  },
  numberField: {
    alignSelf: 'stretch',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    textAlignVertical: 'center',
    paddingHorizontal: 5,
    height: 50,
    // marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
