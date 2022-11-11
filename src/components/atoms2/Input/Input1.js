import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import InsetShadow from 'react-native-inset-shadow';
import AntiDesingIcon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DownIcon = () => (
  <AntiDesingIcon name="caretdown" size={10} color="#000" />
);

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);

const validPhoneRegex = RegExp(
  /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
);

export default function Input(props) {
  const {isLoading, value, type, isError} = props;
  const [isCountryCodeList, setIsCountryCodeList] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [countryCodeSearch, setCountryCodeSearch] = useState('');
  const [inputHandler, setInputHandler] = useState('');
  const [handleplacholder, setHandleplaceholder] = useState(false);
  const Placeholderhandler = () => {
    inputHandler.length == 0
      ? setHandleplaceholder(false)
      : setHandleplaceholder(true);
  };
  const InputTextHanlder = (e) => {
    if (validEmailRegex.test(e)) {
      value({email: e});
      setInputHandler(e);
    } else if (validPhoneRegex.test(e)) {
      value({phone: `${countryCode}${e}`});
      setInputHandler(e);
    } else {
      setInputHandler(e);
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: '#707585',
            fontFamily: 'Montserrat-Regular',
          }}>
          {type == 'phone'
            ? 'Mobile Number'
            : type == 'email'
            ? 'Email'
            : type == 'registration'
            ? 'Registration Number'
            : type == 'year'
            ? 'Registration Year'
            : type == 'medical'
            ? 'Medical Council'
            : 'Email / Phone'}
        </Text>
        {isError && (
          <Text
            style={{
              fontSize: 16,
              color: '#F41212',
              fontFamily: 'Montserrat-Regular',
            }}>
            Enter Valid{' '}
            {type == 'phone'
              ? 'Number'
              : type == 'email'
              ? 'Email'
              : 'Email / Phone'}
          </Text>
        )}
      </View>

      <View style={{position: 'relative'}}>
        <View style={{height: 50}}>
          <InsetShadow
            shadowOpacity={1}
            shadowOffset={15}
            containerStyle={styles.numberField}
            shadowOffset={10}
            elevation={12}>
            {(validPhoneRegex.test(inputHandler) || type == 'phone') && (
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => {
                  setIsCountryCodeList(isLoading ? false : !isCountryCodeList);
                }}>
                <Text
                  style={{
                    ...styles.numberFieldText,
                    opacity: isLoading ? 0.3 : 1,
                  }}>
                  {countryCode}
                </Text>
                <Text
                  style={{
                    ...styles.numberFieldIcon,
                    opacity: isLoading ? 0.3 : 1,
                  }}>
                  {' '}
                  <DownIcon />
                </Text>
              </TouchableOpacity>
            )}
            <TextInput
              editable={isLoading ? false : true}
              keyboardType={
                type == 'phone'
                  ? 'default'
                  : type == 'email'
                  ? 'email-address'
                  : 'default'
              }
              maxLength={type == 'phone' ? 10 : type == 'email' ? 30 : 30}
              style={styles.numberFieldTextInput}
              placeholder={
                handleplacholder
                  ? null
                  : type == 'phone'
                  ? 'Mobile Number'
                  : type == 'email'
                  ? 'Email'
                  : type == 'registration'
                  ? 'Registration Number'
                  : type == 'year'
                  ? 'Registration Year'
                  : type == 'medical'
                  ? 'Medical Council'
                  : 'Email / Phone'
              }
              onChangeText={InputTextHanlder}
              onChange={() => {
                Placeholderhandler();
                console.log(handleplacholder);
              }}
              value={inputHandler}
            />
            <View style={{paddingRight: 10}}>
              {isLoading && <ActivityIndicator color="#000" />}
            </View>
          </InsetShadow>
        </View>

        {isCountryCodeList && (
          <View style={styles.countryCodeList}>
            <TextInput
              placeholder="Search by country or code"
              style={{
                width: '90%',
                height: '20%',
                fontSize: 10,
                fontFamily: 'Montserrat-Regular',
                borderWidth: 1,
                borderColor: 'rgb(238, 233, 233)',
                paddingVertical: 0,
                paddingHorizontal: 8,
                borderRadius: 10,
              }}
              value={countryCodeSearch}
              onChangeText={(e) => setCountryCodeSearch(e)}
            />
            <View style={{paddingTop: 4, height: '80%'}}>
              <FlatList
                data={
                  countryCodeSearch.length
                    ? CountryCodeList.filter((e) => {
                        return (
                          e.code
                            .slice(1, e.code.length)
                            .includes(countryCodeSearch) ||
                          e.country
                            .toLocaleLowerCase()
                            .includes(countryCodeSearch.toLocaleLowerCase())
                        );
                      })
                    : CountryCodeList
                }
                keyExtractor={(e) => e.id}
                style={{paddingLeft: 4}}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setCountryCode(item.code);
                      setIsCountryCodeList(false);
                      setCountryCodeSearch('');
                    }}
                    key={item.id}>
                    <Text
                      style={{
                        fontSize: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgb(238, 233, 233)',
                        paddingVertical: 11,
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      {item.country} ({item.code})
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  numberField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  numberFieldText: {
    paddingLeft: 20,
    fontFamily: 'Montserrat-Regular',
  },
  numberFieldIcon: {
    paddingHorizontal: 10,
  },
  numberFieldTextInput: {
    flex: 1,
    paddingHorizontal: 20,
    borderLeftWidth: 0.5,
    borderLeftColor: 'rgb(163, 154, 154)',
    backgroundColor: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
  countryCodeList: {
    height: 200,
    zIndex: 10,
    position: 'absolute',
    top: 52,
    backgroundColor: '#fff',
    width: 220,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 15,
  },
});
