import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import BlurModal from './BlurModal';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';
import {searchDoctors} from '../../../reduxV2/action/DoctorToPatientAction';
import SearchBarSolid from '../SearchBarSolid/SearchBarSolid';

const ReferModal = ({onCancel, visible, handleRefer}) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const [searchKey, setSearchKey] = useState('');
  const [searchedDoctor, setSearchedDoctor] = useState('');
  const [doctor, setDoctor] = useState('');
  const [reason, setReason] = useState('');

  const dispatch = useDispatch();

  const onEndEditing = (search) => {
    dispatch(searchDoctors(search, 1, (res) => {
      setDoctor(res[0]?.firstName ? `${res[0]?.firstName} ${res[0]?.lastName}` : res[0].basic.name)
      setSearchedDoctor(res[0])
      console.log(res[0], "^^^^^^^^^^^^^^^^^^^^^^")
    }));
    
    setSearchKey(search);
  };

  return (
    <BlurModal {...{visible, onCancel}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: 20,
          color: Colors.primary_text_color[theme],
        }}>
        Refer
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          //   borderColor: NEW_PRIMARY_BACKGROUND,
          //   borderBottomWidth: 1.5,
          marginBottom: 30,
        }}>
        <SearchBarSolid
          //   withIcon
          //   handleBottomList={() => setIsVisible(true)}
          placeholder={'Search Doctors'}
          placeholderTextColor={Colors.search_placeholder_text[theme]}
          icon={
            <Image
              source={require('../../../assets/icons/configure.png')}
              style={{height: 24, width: 24}}
            />
          }
          searchIcon={
            <Image
              source={require('../../../assets/icons/search.png')}
              style={{height: 20, width: 18}}
              color={Colors.search_placeholder_text[theme]}
            />
          }
          onEndEditing={onEndEditing}
          style={{
            // backgroundColor: SECONDARY_BACKGROUND,
            width: 320,
            backgroundColor: Colors.search_background[theme],
            borderRadius: 10,
            elevation: 2,
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: NEW_PRIMARY_BACKGROUND,
          borderBottomWidth: 1.5,
          marginBottom: 30,
        }}>
        <TextInput
          placeholder={`${Local("patient.doc_profile.Searched Doctor")}`}
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 20,
            color: Colors.primary_text_color[theme],
            padding: 4,
            flex: 1,
          }}
          // multiline
          // numberOfLines={2}
          value={doctor}
          onChangeText={(text) => setDoctor(text)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: NEW_PRIMARY_BACKGROUND,
          borderBottomWidth: 1.5,
          marginBottom: 30,
        }}>
        <TextInput
          placeholder={`${Local("patient.doc_profile.Reason")}`}
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 20,
            color: Colors.primary_text_color[theme],
            padding: 4,
            flex: 1,
          }}
          // multiline
          // numberOfLines={2}
          value={reason}
          onChangeText={(text) => setReason(text)}
        />
      </View>
      <DmzButton
        // disabled={height === '' || height == 0}
        onPress={() => {
          handleRefer(searchedDoctor?._id, reason);
        }}
        style={{
          Text: {
            width: '100%',
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Montserrat-SemiBold',
          },
          Container: {
            width: '100%',
            height: 46,
            borderRadius: 25,
            backgroundColor: SECONDARY_COLOR,
            alignSelf: 'center',
            elevation: 3,
          },
        }}
        text="Refer"
      />
    </BlurModal>
  );
};

export default ReferModal;
