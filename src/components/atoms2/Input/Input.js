import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  Easing,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InsetShadow from 'react-native-inset-shadow';
import AntiDesingIcon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Animated } from 'react-native';
import { Local } from '../../../i18n';
const DownIcon = () => (
  <AntiDesingIcon name="caretdown" size={10} color="#000" />
);

const RegexCheck = (type) => {
  if (type === 'email') {
    return new RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    );
  } else if (type === 'phone') {
    return new RegExp('^[0-9]{10}$');
    // return new RegExp(
    //   /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
    // );
  }
};
export default function Input(props) {
  const { isLoading, value, type, preValue } = props;
  const [isCountryCodeList, setIsCountryCodeList] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [countryCodeSearch, setCountryCodeSearch] = useState('');
  const [inputHandler, setInputHandler] = useState(preValue ? preValue : '');
  const [animate, setAnimate] = useState(false);
  const InputTextHanlder = (e) => {
    if (RegexCheck('email').test(e)) {
      value({ email: e });
      setInputHandler(e);
    } else if (RegexCheck('phone').test(e)) {
      value({ phone: `${countryCode}${e}` });
      setInputHandler(e);
    } else {
      setInputHandler(e);
      value(null);
    }
  };
  const validateIsPhoneOrEmail = (e) => {
    if (RegexCheck('email').test(e)) {
      return '';
    }
    if (RegexCheck('phone').test(e)) {
      return '';
    }
    return 'Enter valid Email / Phone';
  };
  const inputTextRefMove = useRef(new Animated.Value(0)).current;
  const inputTextRefSize = useRef(new Animated.Value(1)).current;

  const moveUp = () => {
    setAnimate(true);
    Animated.parallel([
      Animated.timing(inputTextRefMove, {
        toValue: -33,
        duration: 500,
        easing: Easing.elastic(),
        useNativeDriver: true,
      }),
      Animated.timing(inputTextRefSize, {
        toValue: 0.7,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
        }}>
        {/* {type == 'phone' ? (
          <View
            style={{
              flexDirection: 'row',

              padding: 5,
            }}>
            <Ionicons
              name="call"
              size={25}
              color="#1685E9"
              style={{
                marginRight: 5,
              }}
              // style={{ color: '#EA1A65' }}
            />
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                fontFamily: 'Gilroy-Medium',
                paddingLeft: 8,
              }}>
              Phone
            </Text>
          </View>
        ) : type == 'email' ? (
          <View
            style={{
              flexDirection: 'row',

              padding: 5,
            }}>
            <Ionicons
              name="mail"
              size={25}
              color="#1685E9"
              style={{
                marginRight: 5,
              }}
              // style={{ color: '#EA1A65' }}
            />
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                fontFamily: 'Gilroy-Medium',
                paddingLeft: 8,
              }}>
              Email
            </Text>
          </View>
        ) : (
          <Text
            style={{
              fontSize: 11,
              color: '#707585',
              fontFamily: 'Gilroy-Medium',
              paddingLeft: 8,
            }}>
            Email / Phone
          </Text>
        )} */}
        {/* <Text
          style={{
            fontSize: 11,
            color: '#707585',
            fontFamily: 'Montserrat-Regular',
            paddingLeft: 8,
          }}>
          {type == 'phone'
            ? 'Mobile Number'
            : type == 'email'
            ? 'Email'
            : 'Email / Phone'}
        </Text> */}
      </View>

      {inputHandler.length > 0 && type === 'phone' ? (
        <Text style={styles.errorText}>
          {RegexCheck('phone').test(inputHandler) ? '' : 'Enter valid number'}
        </Text>
      ) : inputHandler.length > 0 && type === 'email' ? (
        <Text style={styles.errorText}>
          {RegexCheck('email').test(inputHandler)
            ? ''
            : 'Enter valid email number'}
        </Text>
      ) : (
        <Text style={styles.errorText}>
          {inputHandler.length > 0 && validateIsPhoneOrEmail(inputHandler)}
        </Text>
      )}
      <View style={{ position: 'relative' }}>
        {/* <View style={{ height: 50 }}> */}
        <Animated.View
          style={[
            styles.animatedText,
            {
              left: type === 'phone' ? (animate ? -10 : 55) : 0,
              transform: animate
                ? [
                    {
                      translateY: -35,
                      scale: inputTextRefSize,
                      translateX: inputTextRefSize < 0.7 ? 22 : -35,
                    },
                  ]
                : [],
            },
          ]}>
          <Text
            onPress={() => moveUp()}
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
            {type === 'phone'
              ? `${Local('doctor.Settings.phone')}`
              : type === 'email'
              ? `${Local('doctor.Settings.email')}`
              : `${Local('doctor.Settings.email')}` /
                `${Local('doctor.Settings.phone')}`}{' '}
            <Text style={{ color: '#F41212', position: 'absolute', top: 5 }}>
              *
            </Text>
          </Text>
        </Animated.View>

        <InsetShadow
          shadowOpacity={1}
          shadowOffset={15}
          containerStyle={styles.numberField}
          elevation={12}>
          {(RegexCheck('phone').test(inputHandler) || type === 'phone') &&
            type != 'email' && (
              <TouchableOpacity
                disabled={isLoading}
                style={{ flexDirection: 'row' }}
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
            editable={!isLoading}
            keyboardType={
              type === 'phone'
                ? 'number-pad'
                : type === 'email'
                ? 'email-address'
                : 'default'
            }
            maxLength={type === 'phone' ? 10 : type === 'email' ? 30 : 30}
            style={styles.numberFieldTextInput}
            // placeholder={
            //   type === 'phone'
            //     ? 'Mobile Number'
            //     : type === 'email'
            //     ? 'Email'
            //     : 'Enter Email / Phone'
            // }
            onTouchStart={(e) => {
              moveUp();
            }}
            //  placeholder={type == 'phone' ? 'Mobile Number' : type == 'email' ? 'Email' : 'Email / Phone'}
            onChangeText={InputTextHanlder}
            value={inputHandler}
          />
          <View style={{ paddingRight: 10 }}>
            {isLoading && <ActivityIndicator color="#000" />}
          </View>
        </InsetShadow>
        {/* </View> */}

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
            <View style={{ paddingTop: 4, height: '80%' }}>
              <FlatList
                data={
                  countryCodeSearch.length
                    ? _CountryCodeList.filter((e) => {
                        return (
                          e.dial_code
                            .slice(1, e.dial_code.length)
                            .includes(countryCodeSearch) ||
                          e.name
                            .toLocaleLowerCase()
                            .includes(countryCodeSearch.toLocaleLowerCase())
                        );
                      })
                    : _CountryCodeList
                }
                keyExtractor={(e) => e.dial_code}
                style={{ paddingLeft: 4 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setCountryCode(item.dial_code);
                      setIsCountryCodeList(false);
                      setCountryCodeSearch('');
                      value({ phone: `${item.dial_code}${inputHandler}` });
                    }}
                    key={item.dial_code}>
                    <Text
                      style={{
                        fontSize: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgb(238, 233, 233)',
                        paddingVertical: 11,
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      {item.name} ({item.dial_code})
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
    height: 50,
  },
  numberFieldText: {
    paddingLeft: 20,
    fontFamily: 'Gilroy-Medium',
  },
  numberFieldIcon: {
    paddingHorizontal: 10,
  },
  numberFieldTextInput: {
    flex: 1,
    // zIndex: 2,
    paddingHorizontal: 20,
    borderLeftWidth: 0.5,
    borderLeftColor: 'rgb(163, 154, 154)',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Gilroy-Medium',
  },
  countryCodeList: {
    height: 200,
    zIndex: 900,
    position: 'absolute',
    top: 52,
    backgroundColor: '#FFFFFF',
    width: 220,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  animatedText: {
    // flexDirection: 'row',
    color: '#707585',
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    paddingLeft: 22,
    // alignItems: 'center',
  },
  countryCodeList: {
    height: 200,
    zIndex: 900,
    position: 'absolute',
    overflow: 'scroll',
    top: 52,
    backgroundColor: '#FFFFFF',
    width: 220,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 10,
    borderRadius: 15,
  },
  errorText: {
    marginHorizontal: 5,
    marginBottom: 5,
    fontSize: 10.5,
    color: 'rgba(244, 18, 18, 0.7)',
    fontFamily: 'Gilroy-Medium',
    textAlign: 'right',
  },
});

const _CountryCodeList = [
  {
    name: 'Afghanistan',
    dial_code: '+93',
    code: 'AF',
  },
  {
    name: 'Aland Islands',
    dial_code: '+358',
    code: 'AX',
  },
  {
    name: 'Albania',
    dial_code: '+355',
    code: 'AL',
  },
  {
    name: 'Algeria',
    dial_code: '+213',
    code: 'DZ',
  },
  {
    name: 'AmericanSamoa',
    dial_code: '+1684',
    code: 'AS',
  },
  {
    name: 'Andorra',
    dial_code: '+376',
    code: 'AD',
  },
  {
    name: 'Angola',
    dial_code: '+244',
    code: 'AO',
  },
  {
    name: 'Anguilla',
    dial_code: '+1264',
    code: 'AI',
  },
  {
    name: 'Antarctica',
    dial_code: '+672',
    code: 'AQ',
  },
  {
    name: 'Antigua and Barbuda',
    dial_code: '+1268',
    code: 'AG',
  },
  {
    name: 'Argentina',
    dial_code: '+54',
    code: 'AR',
  },
  {
    name: 'Armenia',
    dial_code: '+374',
    code: 'AM',
  },
  {
    name: 'Aruba',
    dial_code: '+297',
    code: 'AW',
  },
  {
    name: 'Australia',
    dial_code: '+61',
    code: 'AU',
  },
  {
    name: 'Austria',
    dial_code: '+43',
    code: 'AT',
  },
  {
    name: 'Azerbaijan',
    dial_code: '+994',
    code: 'AZ',
  },
  {
    name: 'Bahamas',
    dial_code: '+1242',
    code: 'BS',
  },
  {
    name: 'Bahrain',
    dial_code: '+973',
    code: 'BH',
  },
  {
    name: 'Bangladesh',
    dial_code: '+880',
    code: 'BD',
  },
  {
    name: 'Barbados',
    dial_code: '+1246',
    code: 'BB',
  },
  {
    name: 'Belarus',
    dial_code: '+375',
    code: 'BY',
  },
  {
    name: 'Belgium',
    dial_code: '+32',
    code: 'BE',
  },
  {
    name: 'Belize',
    dial_code: '+501',
    code: 'BZ',
  },
  {
    name: 'Benin',
    dial_code: '+229',
    code: 'BJ',
  },
  {
    name: 'Bermuda',
    dial_code: '+1441',
    code: 'BM',
  },
  {
    name: 'Bhutan',
    dial_code: '+975',
    code: 'BT',
  },
  {
    name: 'Bolivia, Plurinational State of',
    dial_code: '+591',
    code: 'BO',
  },
  {
    name: 'Bosnia and Herzegovina',
    dial_code: '+387',
    code: 'BA',
  },
  {
    name: 'Botswana',
    dial_code: '+267',
    code: 'BW',
  },
  {
    name: 'Brazil',
    dial_code: '+55',
    code: 'BR',
  },
  {
    name: 'British Indian Ocean Territory',
    dial_code: '+246',
    code: 'IO',
  },
  {
    name: 'Brunei Darussalam',
    dial_code: '+673',
    code: 'BN',
  },
  {
    name: 'Bulgaria',
    dial_code: '+359',
    code: 'BG',
  },
  {
    name: 'Burkina Faso',
    dial_code: '+226',
    code: 'BF',
  },
  {
    name: 'Burundi',
    dial_code: '+257',
    code: 'BI',
  },
  {
    name: 'Cambodia',
    dial_code: '+855',
    code: 'KH',
  },
  {
    name: 'Cameroon',
    dial_code: '+237',
    code: 'CM',
  },
  {
    name: 'Canada',
    dial_code: '+1',
    code: 'CA',
  },
  {
    name: 'Cape Verde',
    dial_code: '+238',
    code: 'CV',
  },
  {
    name: 'Cayman Islands',
    dial_code: '+ 345',
    code: 'KY',
  },
  {
    name: 'Central African Republic',
    dial_code: '+236',
    code: 'CF',
  },
  {
    name: 'Chad',
    dial_code: '+235',
    code: 'TD',
  },
  {
    name: 'Chile',
    dial_code: '+56',
    code: 'CL',
  },
  {
    name: 'China',
    dial_code: '+86',
    code: 'CN',
  },
  {
    name: 'Christmas Island',
    dial_code: '+61',
    code: 'CX',
  },
  {
    name: 'Cocos (Keeling) Islands',
    dial_code: '+61',
    code: 'CC',
  },
  {
    name: 'Colombia',
    dial_code: '+57',
    code: 'CO',
  },
  {
    name: 'Comoros',
    dial_code: '+269',
    code: 'KM',
  },
  {
    name: 'Congo',
    dial_code: '+242',
    code: 'CG',
  },
  {
    name: 'Congo, The Democratic Republic of the Congo',
    dial_code: '+243',
    code: 'CD',
  },
  {
    name: 'Cook Islands',
    dial_code: '+682',
    code: 'CK',
  },
  {
    name: 'Costa Rica',
    dial_code: '+506',
    code: 'CR',
  },
  {
    name: "Cote d'Ivoire",
    dial_code: '+225',
    code: 'CI',
  },
  {
    name: 'Croatia',
    dial_code: '+385',
    code: 'HR',
  },
  {
    name: 'Cuba',
    dial_code: '+53',
    code: 'CU',
  },
  {
    name: 'Cyprus',
    dial_code: '+357',
    code: 'CY',
  },
  {
    name: 'Czech Republic',
    dial_code: '+420',
    code: 'CZ',
  },
  {
    name: 'Denmark',
    dial_code: '+45',
    code: 'DK',
  },
  {
    name: 'Djibouti',
    dial_code: '+253',
    code: 'DJ',
  },
  {
    name: 'Dominica',
    dial_code: '+1767',
    code: 'DM',
  },
  {
    name: 'Dominican Republic',
    dial_code: '+1849',
    code: 'DO',
  },
  {
    name: 'Ecuador',
    dial_code: '+593',
    code: 'EC',
  },
  {
    name: 'Egypt',
    dial_code: '+20',
    code: 'EG',
  },
  {
    name: 'El Salvador',
    dial_code: '+503',
    code: 'SV',
  },
  {
    name: 'Equatorial Guinea',
    dial_code: '+240',
    code: 'GQ',
  },
  {
    name: 'Eritrea',
    dial_code: '+291',
    code: 'ER',
  },
  {
    name: 'Estonia',
    dial_code: '+372',
    code: 'EE',
  },
  {
    name: 'Ethiopia',
    dial_code: '+251',
    code: 'ET',
  },
  {
    name: 'Falkland Islands (Malvinas)',
    dial_code: '+500',
    code: 'FK',
  },
  {
    name: 'Faroe Islands',
    dial_code: '+298',
    code: 'FO',
  },
  {
    name: 'Fiji',
    dial_code: '+679',
    code: 'FJ',
  },
  {
    name: 'Finland',
    dial_code: '+358',
    code: 'FI',
  },
  {
    name: 'France',
    dial_code: '+33',
    code: 'FR',
  },
  {
    name: 'French Guiana',
    dial_code: '+594',
    code: 'GF',
  },
  {
    name: 'French Polynesia',
    dial_code: '+689',
    code: 'PF',
  },
  {
    name: 'Gabon',
    dial_code: '+241',
    code: 'GA',
  },
  {
    name: 'Gambia',
    dial_code: '+220',
    code: 'GM',
  },
  {
    name: 'Georgia',
    dial_code: '+995',
    code: 'GE',
  },
  {
    name: 'Germany',
    dial_code: '+49',
    code: 'DE',
  },
  {
    name: 'Ghana',
    dial_code: '+233',
    code: 'GH',
  },
  {
    name: 'Gibraltar',
    dial_code: '+350',
    code: 'GI',
  },
  {
    name: 'Greece',
    dial_code: '+30',
    code: 'GR',
  },
  {
    name: 'Greenland',
    dial_code: '+299',
    code: 'GL',
  },
  {
    name: 'Grenada',
    dial_code: '+1473',
    code: 'GD',
  },
  {
    name: 'Guadeloupe',
    dial_code: '+590',
    code: 'GP',
  },
  {
    name: 'Guam',
    dial_code: '+1671',
    code: 'GU',
  },
  {
    name: 'Guatemala',
    dial_code: '+502',
    code: 'GT',
  },
  {
    name: 'Guernsey',
    dial_code: '+44',
    code: 'GG',
  },
  {
    name: 'Guinea',
    dial_code: '+224',
    code: 'GN',
  },
  {
    name: 'Guinea-Bissau',
    dial_code: '+245',
    code: 'GW',
  },
  {
    name: 'Guyana',
    dial_code: '+595',
    code: 'GY',
  },
  {
    name: 'Haiti',
    dial_code: '+509',
    code: 'HT',
  },
  {
    name: 'Holy See (Vatican City State)',
    dial_code: '+379',
    code: 'VA',
  },
  {
    name: 'Honduras',
    dial_code: '+504',
    code: 'HN',
  },
  {
    name: 'Hong Kong',
    dial_code: '+852',
    code: 'HK',
  },
  {
    name: 'Hungary',
    dial_code: '+36',
    code: 'HU',
  },
  {
    name: 'Iceland',
    dial_code: '+354',
    code: 'IS',
  },
  {
    name: 'India',
    dial_code: '+91',
    code: 'IN',
  },
  {
    name: 'Indonesia',
    dial_code: '+62',
    code: 'ID',
  },
  {
    name: 'Iran, Islamic Republic of Persian Gulf',
    dial_code: '+98',
    code: 'IR',
  },
  {
    name: 'Iraq',
    dial_code: '+964',
    code: 'IQ',
  },
  {
    name: 'Ireland',
    dial_code: '+353',
    code: 'IE',
  },
  {
    name: 'Isle of Man',
    dial_code: '+44',
    code: 'IM',
  },
  {
    name: 'Israel',
    dial_code: '+972',
    code: 'IL',
  },
  {
    name: 'Italy',
    dial_code: '+39',
    code: 'IT',
  },
  {
    name: 'Jamaica',
    dial_code: '+1876',
    code: 'JM',
  },
  {
    name: 'Japan',
    dial_code: '+81',
    code: 'JP',
  },
  {
    name: 'Jersey',
    dial_code: '+44',
    code: 'JE',
  },
  {
    name: 'Jordan',
    dial_code: '+962',
    code: 'JO',
  },
  {
    name: 'Kazakhstan',
    dial_code: '+77',
    code: 'KZ',
  },
  {
    name: 'Kenya',
    dial_code: '+254',
    code: 'KE',
  },
  {
    name: 'Kiribati',
    dial_code: '+686',
    code: 'KI',
  },
  {
    name: "Korea, Democratic People's Republic of Korea",
    dial_code: '+850',
    code: 'KP',
  },
  {
    name: 'Korea, Republic of South Korea',
    dial_code: '+82',
    code: 'KR',
  },
  {
    name: 'Kuwait',
    dial_code: '+965',
    code: 'KW',
  },
  {
    name: 'Kyrgyzstan',
    dial_code: '+996',
    code: 'KG',
  },
  {
    name: 'Laos',
    dial_code: '+856',
    code: 'LA',
  },
  {
    name: 'Latvia',
    dial_code: '+371',
    code: 'LV',
  },
  {
    name: 'Lebanon',
    dial_code: '+961',
    code: 'LB',
  },
  {
    name: 'Lesotho',
    dial_code: '+266',
    code: 'LS',
  },
  {
    name: 'Liberia',
    dial_code: '+231',
    code: 'LR',
  },
  {
    name: 'Libyan Arab Jamahiriya',
    dial_code: '+218',
    code: 'LY',
  },
  {
    name: 'Liechtenstein',
    dial_code: '+423',
    code: 'LI',
  },
  {
    name: 'Lithuania',
    dial_code: '+370',
    code: 'LT',
  },
  {
    name: 'Luxembourg',
    dial_code: '+352',
    code: 'LU',
  },
  {
    name: 'Macao',
    dial_code: '+853',
    code: 'MO',
  },
  {
    name: 'Macedonia',
    dial_code: '+389',
    code: 'MK',
  },
  {
    name: 'Madagascar',
    dial_code: '+261',
    code: 'MG',
  },
  {
    name: 'Malawi',
    dial_code: '+265',
    code: 'MW',
  },
  {
    name: 'Malaysia',
    dial_code: '+60',
    code: 'MY',
  },
  {
    name: 'Maldives',
    dial_code: '+960',
    code: 'MV',
  },
  {
    name: 'Mali',
    dial_code: '+223',
    code: 'ML',
  },
  {
    name: 'Malta',
    dial_code: '+356',
    code: 'MT',
  },
  {
    name: 'Marshall Islands',
    dial_code: '+692',
    code: 'MH',
  },
  {
    name: 'Martinique',
    dial_code: '+596',
    code: 'MQ',
  },
  {
    name: 'Mauritania',
    dial_code: '+222',
    code: 'MR',
  },
  {
    name: 'Mauritius',
    dial_code: '+230',
    code: 'MU',
  },
  {
    name: 'Mayotte',
    dial_code: '+262',
    code: 'YT',
  },
  {
    name: 'Mexico',
    dial_code: '+52',
    code: 'MX',
  },
  {
    name: 'Micronesia, Federated States of Micronesia',
    dial_code: '+691',
    code: 'FM',
  },
  {
    name: 'Moldova',
    dial_code: '+373',
    code: 'MD',
  },
  {
    name: 'Monaco',
    dial_code: '+377',
    code: 'MC',
  },
  {
    name: 'Mongolia',
    dial_code: '+976',
    code: 'MN',
  },
  {
    name: 'Montenegro',
    dial_code: '+382',
    code: 'ME',
  },
  {
    name: 'Montserrat',
    dial_code: '+1664',
    code: 'MS',
  },
  {
    name: 'Morocco',
    dial_code: '+212',
    code: 'MA',
  },
  {
    name: 'Mozambique',
    dial_code: '+258',
    code: 'MZ',
  },
  {
    name: 'Myanmar',
    dial_code: '+95',
    code: 'MM',
  },
  {
    name: 'Namibia',
    dial_code: '+264',
    code: 'NA',
  },
  {
    name: 'Nauru',
    dial_code: '+674',
    code: 'NR',
  },
  {
    name: 'Nepal',
    dial_code: '+977',
    code: 'NP',
  },
  {
    name: 'Netherlands',
    dial_code: '+31',
    code: 'NL',
  },
  {
    name: 'Netherlands Antilles',
    dial_code: '+599',
    code: 'AN',
  },
  {
    name: 'New Caledonia',
    dial_code: '+687',
    code: 'NC',
  },
  {
    name: 'New Zealand',
    dial_code: '+64',
    code: 'NZ',
  },
  {
    name: 'Nicaragua',
    dial_code: '+505',
    code: 'NI',
  },
  {
    name: 'Niger',
    dial_code: '+227',
    code: 'NE',
  },
  {
    name: 'Nigeria',
    dial_code: '+234',
    code: 'NG',
  },
  {
    name: 'Niue',
    dial_code: '+683',
    code: 'NU',
  },
  {
    name: 'Norfolk Island',
    dial_code: '+672',
    code: 'NF',
  },
  {
    name: 'Northern Mariana Islands',
    dial_code: '+1670',
    code: 'MP',
  },
  {
    name: 'Norway',
    dial_code: '+47',
    code: 'NO',
  },
  {
    name: 'Oman',
    dial_code: '+968',
    code: 'OM',
  },
  {
    name: 'Pakistan',
    dial_code: '+92',
    code: 'PK',
  },
  {
    name: 'Palau',
    dial_code: '+680',
    code: 'PW',
  },
  {
    name: 'Palestinian Territory, Occupied',
    dial_code: '+970',
    code: 'PS',
  },
  {
    name: 'Panama',
    dial_code: '+507',
    code: 'PA',
  },
  {
    name: 'Papua New Guinea',
    dial_code: '+675',
    code: 'PG',
  },
  {
    name: 'Paraguay',
    dial_code: '+595',
    code: 'PY',
  },
  {
    name: 'Peru',
    dial_code: '+51',
    code: 'PE',
  },
  {
    name: 'Philippines',
    dial_code: '+63',
    code: 'PH',
  },
  {
    name: 'Pitcairn',
    dial_code: '+872',
    code: 'PN',
  },
  {
    name: 'Poland',
    dial_code: '+48',
    code: 'PL',
  },
  {
    name: 'Portugal',
    dial_code: '+351',
    code: 'PT',
  },
  {
    name: 'Puerto Rico',
    dial_code: '+1939',
    code: 'PR',
  },
  {
    name: 'Qatar',
    dial_code: '+974',
    code: 'QA',
  },
  {
    name: 'Romania',
    dial_code: '+40',
    code: 'RO',
  },
  {
    name: 'Russia',
    dial_code: '+7',
    code: 'RU',
  },
  {
    name: 'Rwanda',
    dial_code: '+250',
    code: 'RW',
  },
  {
    name: 'Reunion',
    dial_code: '+262',
    code: 'RE',
  },
  {
    name: 'Saint Barthelemy',
    dial_code: '+590',
    code: 'BL',
  },
  {
    name: 'Saint Helena, Ascension and Tristan Da Cunha',
    dial_code: '+290',
    code: 'SH',
  },
  {
    name: 'Saint Kitts and Nevis',
    dial_code: '+1869',
    code: 'KN',
  },
  {
    name: 'Saint Lucia',
    dial_code: '+1758',
    code: 'LC',
  },
  {
    name: 'Saint Martin',
    dial_code: '+590',
    code: 'MF',
  },
  {
    name: 'Saint Pierre and Miquelon',
    dial_code: '+508',
    code: 'PM',
  },
  {
    name: 'Saint Vincent and the Grenadines',
    dial_code: '+1784',
    code: 'VC',
  },
  {
    name: 'Samoa',
    dial_code: '+685',
    code: 'WS',
  },
  {
    name: 'San Marino',
    dial_code: '+378',
    code: 'SM',
  },
  {
    name: 'Sao Tome and Principe',
    dial_code: '+239',
    code: 'ST',
  },
  {
    name: 'Saudi Arabia',
    dial_code: '+966',
    code: 'SA',
  },
  {
    name: 'Senegal',
    dial_code: '+221',
    code: 'SN',
  },
  {
    name: 'Serbia',
    dial_code: '+381',
    code: 'RS',
  },
  {
    name: 'Seychelles',
    dial_code: '+248',
    code: 'SC',
  },
  {
    name: 'Sierra Leone',
    dial_code: '+232',
    code: 'SL',
  },
  {
    name: 'Singapore',
    dial_code: '+65',
    code: 'SG',
  },
  {
    name: 'Slovakia',
    dial_code: '+421',
    code: 'SK',
  },
  {
    name: 'Slovenia',
    dial_code: '+386',
    code: 'SI',
  },
  {
    name: 'Solomon Islands',
    dial_code: '+677',
    code: 'SB',
  },
  {
    name: 'Somalia',
    dial_code: '+252',
    code: 'SO',
  },
  {
    name: 'South Africa',
    dial_code: '+27',
    code: 'ZA',
  },
  {
    name: 'South Sudan',
    dial_code: '+211',
    code: 'SS',
  },
  {
    name: 'South Georgia and the South Sandwich Islands',
    dial_code: '+500',
    code: 'GS',
  },
  {
    name: 'Spain',
    dial_code: '+34',
    code: 'ES',
  },
  {
    name: 'Sri Lanka',
    dial_code: '+94',
    code: 'LK',
  },
  {
    name: 'Sudan',
    dial_code: '+249',
    code: 'SD',
  },
  {
    name: 'Suriname',
    dial_code: '+597',
    code: 'SR',
  },
  {
    name: 'Svalbard and Jan Mayen',
    dial_code: '+47',
    code: 'SJ',
  },
  {
    name: 'Swaziland',
    dial_code: '+268',
    code: 'SZ',
  },
  {
    name: 'Sweden',
    dial_code: '+46',
    code: 'SE',
  },
  {
    name: 'Switzerland',
    dial_code: '+41',
    code: 'CH',
  },
  {
    name: 'Syrian Arab Republic',
    dial_code: '+963',
    code: 'SY',
  },
  {
    name: 'Taiwan',
    dial_code: '+886',
    code: 'TW',
  },
  {
    name: 'Tajikistan',
    dial_code: '+992',
    code: 'TJ',
  },
  {
    name: 'Tanzania, United Republic of Tanzania',
    dial_code: '+255',
    code: 'TZ',
  },
  {
    name: 'Thailand',
    dial_code: '+66',
    code: 'TH',
  },
  {
    name: 'Timor-Leste',
    dial_code: '+670',
    code: 'TL',
  },
  {
    name: 'Togo',
    dial_code: '+228',
    code: 'TG',
  },
  {
    name: 'Tokelau',
    dial_code: '+690',
    code: 'TK',
  },
  {
    name: 'Tonga',
    dial_code: '+676',
    code: 'TO',
  },
  {
    name: 'Trinidad and Tobago',
    dial_code: '+1868',
    code: 'TT',
  },
  {
    name: 'Tunisia',
    dial_code: '+216',
    code: 'TN',
  },
  {
    name: 'Turkey',
    dial_code: '+90',
    code: 'TR',
  },
  {
    name: 'Turkmenistan',
    dial_code: '+993',
    code: 'TM',
  },
  {
    name: 'Turks and Caicos Islands',
    dial_code: '+1649',
    code: 'TC',
  },
  {
    name: 'Tuvalu',
    dial_code: '+688',
    code: 'TV',
  },
  {
    name: 'Uganda',
    dial_code: '+256',
    code: 'UG',
  },
  {
    name: 'Ukraine',
    dial_code: '+380',
    code: 'UA',
  },
  {
    name: 'United Arab Emirates',
    dial_code: '+971',
    code: 'AE',
  },
  {
    name: 'United Kingdom',
    dial_code: '+44',
    code: 'GB',
  },
  {
    name: 'United States',
    dial_code: '+1',
    code: 'US',
  },
  {
    name: 'Uruguay',
    dial_code: '+598',
    code: 'UY',
  },
  {
    name: 'Uzbekistan',
    dial_code: '+998',
    code: 'UZ',
  },
  {
    name: 'Vanuatu',
    dial_code: '+678',
    code: 'VU',
  },
  {
    name: 'Venezuela, Bolivarian Republic of Venezuela',
    dial_code: '+58',
    code: 'VE',
  },
  {
    name: 'Vietnam',
    dial_code: '+84',
    code: 'VN',
  },
  {
    name: 'Virgin Islands, British',
    dial_code: '+1284',
    code: 'VG',
  },
  {
    name: 'Virgin Islands, U.S.',
    dial_code: '+1340',
    code: 'VI',
  },
  {
    name: 'Wallis and Futuna',
    dial_code: '+681',
    code: 'WF',
  },
  {
    name: 'Yemen',
    dial_code: '+967',
    code: 'YE',
  },
  {
    name: 'Zambia',
    dial_code: '+260',
    code: 'ZM',
  },
  {
    name: 'Zimbabwe',
    dial_code: '+263',
    code: 'ZW',
  },
];
