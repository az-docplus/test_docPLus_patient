/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
// import Video from "react-native-video";

import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Animated,
  TextInput,
  Image,
  StatusBar,
  Easing,
  PermissionsAndroid,
  ActivityIndicator,
  Alert,
  // Picker
} from 'react-native';
import { Picker } from '@react-native-community/picker';
// "@react-native-community/picker": "^1.8.1",
// import {Picker} from '@react-native-community/picker';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  UploadProfilePic,
  // UpdateDoctorProfile,
  GetDoctorProfile,
  UploadVideo,
} from '../../../reduxV2/action/DoctorAction';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconsOriginal from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import { SECONDARY_COLOR, NEW_PRIMARY_BACKGROUND } from '../../../styles/colors';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import RadioGroupV2 from '../../../components/molecules/RadioGroup/RadioGroupV2';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSpecialty,
  UpdateDoctorProfile,
  UploadSignature,
  SetForNow,
} from '../../../reduxV2/action/DoctorAction';
import { Host } from '../../../utils/connection';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import AnimatedErrorText from '../../../components/atoms/animatedErrorText/AnimatedErrorText';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { countries } from '../../../utils/Months';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';
import yourhandle from 'countrycitystatejson';
import BlurSpinner from '../../../components/molecules/Modal/BlurLoadingOverlay';
import useLanguage from '../../../styles/language';
import { Fonts } from '../../../styles/Fonts';
import Axios from 'axios';
import TheIcon from 'react-native-radio-input/Components/TheIcon';
import PushNotification from 'react-native-push-notification';

export const currencyJson = [
  {
    symbol: '$',
    name: 'US Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'USD',
    name_plural: 'US dollars',
  },
  {
    symbol: 'CA$',
    name: 'Canadian Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'CAD',
    name_plural: 'Canadian dollars',
  },
  {
    symbol: '€',
    name: 'Euro',
    symbol_native: '€',
    decimal_digits: 2,
    rounding: 0,
    code: 'EUR',
    name_plural: 'euros',
  },
  {
    symbol: 'AED',
    name: 'United Arab Emirates Dirham',
    symbol_native: 'د.إ.‏',
    decimal_digits: 2,
    rounding: 0,
    code: 'AED',
    name_plural: 'UAE dirhams',
  },
  {
    symbol: 'Af',
    name: 'Afghan Afghani',
    symbol_native: '؋',
    decimal_digits: 0,
    rounding: 0,
    code: 'AFN',
    name_plural: 'Afghan Afghanis',
  },
  {
    symbol: 'ALL',
    name: 'Albanian Lek',
    symbol_native: 'Lek',
    decimal_digits: 0,
    rounding: 0,
    code: 'ALL',
    name_plural: 'Albanian lekë',
  },
  {
    symbol: 'AMD',
    name: 'Armenian Dram',
    symbol_native: 'դր.',
    decimal_digits: 0,
    rounding: 0,
    code: 'AMD',
    name_plural: 'Armenian drams',
  },
  {
    symbol: 'AR$',
    name: 'Argentine Peso',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'ARS',
    name_plural: 'Argentine pesos',
  },
  {
    symbol: 'AU$',
    name: 'Australian Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'AUD',
    name_plural: 'Australian dollars',
  },
  {
    symbol: 'man.',
    name: 'Azerbaijani Manat',
    symbol_native: 'ман.',
    decimal_digits: 2,
    rounding: 0,
    code: 'AZN',
    name_plural: 'Azerbaijani manats',
  },
  {
    symbol: 'KM',
    name: 'Bosnia-Herzegovina Convertible Mark',
    symbol_native: 'KM',
    decimal_digits: 2,
    rounding: 0,
    code: 'BAM',
    name_plural: 'Bosnia-Herzegovina convertible marks',
  },
  {
    symbol: 'Tk',
    name: 'Bangladeshi Taka',
    symbol_native: '৳',
    decimal_digits: 2,
    rounding: 0,
    code: 'BDT',
    name_plural: 'Bangladeshi takas',
  },
  {
    symbol: 'BGN',
    name: 'Bulgarian Lev',
    symbol_native: 'лв.',
    decimal_digits: 2,
    rounding: 0,
    code: 'BGN',
    name_plural: 'Bulgarian leva',
  },
  {
    symbol: 'BD',
    name: 'Bahraini Dinar',
    symbol_native: 'د.ب.‏',
    decimal_digits: 3,
    rounding: 0,
    code: 'BHD',
    name_plural: 'Bahraini dinars',
  },
  {
    symbol: 'FBu',
    name: 'Burundian Franc',
    symbol_native: 'FBu',
    decimal_digits: 0,
    rounding: 0,
    code: 'BIF',
    name_plural: 'Burundian francs',
  },
  {
    symbol: 'BN$',
    name: 'Brunei Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'BND',
    name_plural: 'Brunei dollars',
  },
  {
    symbol: 'Bs',
    name: 'Bolivian Boliviano',
    symbol_native: 'Bs',
    decimal_digits: 2,
    rounding: 0,
    code: 'BOB',
    name_plural: 'Bolivian bolivianos',
  },
  {
    symbol: 'R$',
    name: 'Brazilian Real',
    symbol_native: 'R$',
    decimal_digits: 2,
    rounding: 0,
    code: 'BRL',
    name_plural: 'Brazilian reals',
  },
  {
    symbol: 'BWP',
    name: 'Botswanan Pula',
    symbol_native: 'P',
    decimal_digits: 2,
    rounding: 0,
    code: 'BWP',
    name_plural: 'Botswanan pulas',
  },
  {
    symbol: 'Br',
    name: 'Belarusian Ruble',
    symbol_native: 'руб.',
    decimal_digits: 2,
    rounding: 0,
    code: 'BYN',
    name_plural: 'Belarusian rubles',
  },
  {
    symbol: 'BZ$',
    name: 'Belize Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'BZD',
    name_plural: 'Belize dollars',
  },
  {
    symbol: 'CDF',
    name: 'Congolese Franc',
    symbol_native: 'FrCD',
    decimal_digits: 2,
    rounding: 0,
    code: 'CDF',
    name_plural: 'Congolese francs',
  },
  {
    symbol: 'CHF',
    name: 'Swiss Franc',
    symbol_native: 'CHF',
    decimal_digits: 2,
    rounding: 0.05,
    code: 'CHF',
    name_plural: 'Swiss francs',
  },
  {
    symbol: 'CL$',
    name: 'Chilean Peso',
    symbol_native: '$',
    decimal_digits: 0,
    rounding: 0,
    code: 'CLP',
    name_plural: 'Chilean pesos',
  },
  {
    symbol: 'CN¥',
    name: 'Chinese Yuan',
    symbol_native: 'CN¥',
    decimal_digits: 2,
    rounding: 0,
    code: 'CNY',
    name_plural: 'Chinese yuan',
  },
  {
    symbol: 'CO$',
    name: 'Colombian Peso',
    symbol_native: '$',
    decimal_digits: 0,
    rounding: 0,
    code: 'COP',
    name_plural: 'Colombian pesos',
  },
  {
    symbol: '₡',
    name: 'Costa Rican Colón',
    symbol_native: '₡',
    decimal_digits: 0,
    rounding: 0,
    code: 'CRC',
    name_plural: 'Costa Rican colóns',
  },
  {
    symbol: 'CV$',
    name: 'Cape Verdean Escudo',
    symbol_native: 'CV$',
    decimal_digits: 2,
    rounding: 0,
    code: 'CVE',
    name_plural: 'Cape Verdean escudos',
  },
  {
    symbol: 'Kč',
    name: 'Czech Republic Koruna',
    symbol_native: 'Kč',
    decimal_digits: 2,
    rounding: 0,
    code: 'CZK',
    name_plural: 'Czech Republic korunas',
  },
  {
    symbol: 'Fdj',
    name: 'Djiboutian Franc',
    symbol_native: 'Fdj',
    decimal_digits: 0,
    rounding: 0,
    code: 'DJF',
    name_plural: 'Djiboutian francs',
  },
  {
    symbol: 'Dkr',
    name: 'Danish Krone',
    symbol_native: 'kr',
    decimal_digits: 2,
    rounding: 0,
    code: 'DKK',
    name_plural: 'Danish kroner',
  },
  {
    symbol: 'RD$',
    name: 'Dominican Peso',
    symbol_native: 'RD$',
    decimal_digits: 2,
    rounding: 0,
    code: 'DOP',
    name_plural: 'Dominican pesos',
  },
  {
    symbol: 'DA',
    name: 'Algerian Dinar',
    symbol_native: 'د.ج.‏',
    decimal_digits: 2,
    rounding: 0,
    code: 'DZD',
    name_plural: 'Algerian dinars',
  },
  {
    symbol: 'Ekr',
    name: 'Estonian Kroon',
    symbol_native: 'kr',
    decimal_digits: 2,
    rounding: 0,
    code: 'EEK',
    name_plural: 'Estonian kroons',
  },
  {
    symbol: 'EGP',
    name: 'Egyptian Pound',
    symbol_native: 'ج.م.‏',
    decimal_digits: 2,
    rounding: 0,
    code: 'EGP',
    name_plural: 'Egyptian pounds',
  },
  {
    symbol: 'Nfk',
    name: 'Eritrean Nakfa',
    symbol_native: 'Nfk',
    decimal_digits: 2,
    rounding: 0,
    code: 'ERN',
    name_plural: 'Eritrean nakfas',
  },
  {
    symbol: 'Br',
    name: 'Ethiopian Birr',
    symbol_native: 'Br',
    decimal_digits: 2,
    rounding: 0,
    code: 'ETB',
    name_plural: 'Ethiopian birrs',
  },
  {
    symbol: '£',
    name: 'British Pound Sterling',
    symbol_native: '£',
    decimal_digits: 2,
    rounding: 0,
    code: 'GBP',
    name_plural: 'British pounds sterling',
  },
  {
    symbol: 'GEL',
    name: 'Georgian Lari',
    symbol_native: 'GEL',
    decimal_digits: 2,
    rounding: 0,
    code: 'GEL',
    name_plural: 'Georgian laris',
  },
  {
    symbol: 'GH₵',
    name: 'Ghanaian Cedi',
    symbol_native: 'GH₵',
    decimal_digits: 2,
    rounding: 0,
    code: 'GHS',
    name_plural: 'Ghanaian cedis',
  },
  {
    symbol: 'FG',
    name: 'Guinean Franc',
    symbol_native: 'FG',
    decimal_digits: 0,
    rounding: 0,
    code: 'GNF',
    name_plural: 'Guinean francs',
  },
  {
    symbol: 'GTQ',
    name: 'Guatemalan Quetzal',
    symbol_native: 'Q',
    decimal_digits: 2,
    rounding: 0,
    code: 'GTQ',
    name_plural: 'Guatemalan quetzals',
  },
  {
    symbol: 'HK$',
    name: 'Hong Kong Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'HKD',
    name_plural: 'Hong Kong dollars',
  },
  {
    symbol: 'HNL',
    name: 'Honduran Lempira',
    symbol_native: 'L',
    decimal_digits: 2,
    rounding: 0,
    code: 'HNL',
    name_plural: 'Honduran lempiras',
  },
  {
    symbol: 'kn',
    name: 'Croatian Kuna',
    symbol_native: 'kn',
    decimal_digits: 2,
    rounding: 0,
    code: 'HRK',
    name_plural: 'Croatian kunas',
  },
  {
    symbol: 'Ft',
    name: 'Hungarian Forint',
    symbol_native: 'Ft',
    decimal_digits: 0,
    rounding: 0,
    code: 'HUF',
    name_plural: 'Hungarian forints',
  },
  {
    symbol: 'Rp',
    name: 'Indonesian Rupiah',
    symbol_native: 'Rp',
    decimal_digits: 0,
    rounding: 0,
    code: 'IDR',
    name_plural: 'Indonesian rupiahs',
  },
  {
    symbol: '₪',
    name: 'Israeli New Sheqel',
    symbol_native: '₪',
    decimal_digits: 2,
    rounding: 0,
    code: 'ILS',
    name_plural: 'Israeli new sheqels',
  },
  {
    symbol: 'Rs',
    name: 'Indian Rupee',
    symbol_native: 'টকা',
    decimal_digits: 2,
    rounding: 0,
    code: 'INR',
    name_plural: 'Indian rupees',
  },
  {
    symbol: 'IQD',
    name: 'Iraqi Dinar',
    symbol_native: 'د.ع.‏',
    decimal_digits: 0,
    rounding: 0,
    code: 'IQD',
    name_plural: 'Iraqi dinars',
  },
  {
    symbol: 'IRR',
    name: 'Iranian Rial',
    symbol_native: '﷼',
    decimal_digits: 0,
    rounding: 0,
    code: 'IRR',
    name_plural: 'Iranian rials',
  },
  {
    symbol: 'Ikr',
    name: 'Icelandic Króna',
    symbol_native: 'kr',
    decimal_digits: 0,
    rounding: 0,
    code: 'ISK',
    name_plural: 'Icelandic krónur',
  },
  {
    symbol: 'J$',
    name: 'Jamaican Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'JMD',
    name_plural: 'Jamaican dollars',
  },
  {
    symbol: 'JD',
    name: 'Jordanian Dinar',
    symbol_native: 'د.أ.‏',
    decimal_digits: 3,
    rounding: 0,
    code: 'JOD',
    name_plural: 'Jordanian dinars',
  },
  {
    symbol: '¥',
    name: 'Japanese Yen',
    symbol_native: '￥',
    decimal_digits: 0,
    rounding: 0,
    code: 'JPY',
    name_plural: 'Japanese yen',
  },
  {
    symbol: 'Ksh',
    name: 'Kenyan Shilling',
    symbol_native: 'Ksh',
    decimal_digits: 2,
    rounding: 0,
    code: 'KES',
    name_plural: 'Kenyan shillings',
  },
  {
    symbol: 'KHR',
    name: 'Cambodian Riel',
    symbol_native: '៛',
    decimal_digits: 2,
    rounding: 0,
    code: 'KHR',
    name_plural: 'Cambodian riels',
  },
  {
    symbol: 'CF',
    name: 'Comorian Franc',
    symbol_native: 'FC',
    decimal_digits: 0,
    rounding: 0,
    code: 'KMF',
    name_plural: 'Comorian francs',
  },
  {
    symbol: '₩',
    name: 'South Korean Won',
    symbol_native: '₩',
    decimal_digits: 0,
    rounding: 0,
    code: 'KRW',
    name_plural: 'South Korean won',
  },
  {
    symbol: 'KD',
    name: 'Kuwaiti Dinar',
    symbol_native: 'د.ك.‏',
    decimal_digits: 3,
    rounding: 0,
    code: 'KWD',
    name_plural: 'Kuwaiti dinars',
  },
  {
    symbol: 'KZT',
    name: 'Kazakhstani Tenge',
    symbol_native: 'тңг.',
    decimal_digits: 2,
    rounding: 0,
    code: 'KZT',
    name_plural: 'Kazakhstani tenges',
  },
  {
    symbol: 'L.L.',
    name: 'Lebanese Pound',
    symbol_native: 'ل.ل.‏',
    decimal_digits: 0,
    rounding: 0,
    code: 'LBP',
    name_plural: 'Lebanese pounds',
  },
  {
    symbol: 'SLRs',
    name: 'Sri Lankan Rupee',
    symbol_native: 'SL Re',
    decimal_digits: 2,
    rounding: 0,
    code: 'LKR',
    name_plural: 'Sri Lankan rupees',
  },
  {
    symbol: 'Lt',
    name: 'Lithuanian Litas',
    symbol_native: 'Lt',
    decimal_digits: 2,
    rounding: 0,
    code: 'LTL',
    name_plural: 'Lithuanian litai',
  },
  {
    symbol: 'Ls',
    name: 'Latvian Lats',
    symbol_native: 'Ls',
    decimal_digits: 2,
    rounding: 0,
    code: 'LVL',
    name_plural: 'Latvian lati',
  },
  {
    symbol: 'LD',
    name: 'Libyan Dinar',
    symbol_native: 'د.ل.‏',
    decimal_digits: 3,
    rounding: 0,
    code: 'LYD',
    name_plural: 'Libyan dinars',
  },
  {
    symbol: 'MAD',
    name: 'Moroccan Dirham',
    symbol_native: 'د.م.‏',
    decimal_digits: 2,
    rounding: 0,
    code: 'MAD',
    name_plural: 'Moroccan dirhams',
  },
  {
    symbol: 'MDL',
    name: 'Moldovan Leu',
    symbol_native: 'MDL',
    decimal_digits: 2,
    rounding: 0,
    code: 'MDL',
    name_plural: 'Moldovan lei',
  },
  {
    symbol: 'MGA',
    name: 'Malagasy Ariary',
    symbol_native: 'MGA',
    decimal_digits: 0,
    rounding: 0,
    code: 'MGA',
    name_plural: 'Malagasy Ariaries',
  },
  {
    symbol: 'MKD',
    name: 'Macedonian Denar',
    symbol_native: 'MKD',
    decimal_digits: 2,
    rounding: 0,
    code: 'MKD',
    name_plural: 'Macedonian denari',
  },
  {
    symbol: 'MMK',
    name: 'Myanma Kyat',
    symbol_native: 'K',
    decimal_digits: 0,
    rounding: 0,
    code: 'MMK',
    name_plural: 'Myanma kyats',
  },
  {
    symbol: 'MOP$',
    name: 'Macanese Pataca',
    symbol_native: 'MOP$',
    decimal_digits: 2,
    rounding: 0,
    code: 'MOP',
    name_plural: 'Macanese patacas',
  },
  {
    symbol: 'MURs',
    name: 'Mauritian Rupee',
    symbol_native: 'MURs',
    decimal_digits: 0,
    rounding: 0,
    code: 'MUR',
    name_plural: 'Mauritian rupees',
  },
  {
    symbol: 'MX$',
    name: 'Mexican Peso',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'MXN',
    name_plural: 'Mexican pesos',
  },
  {
    symbol: 'RM',
    name: 'Malaysian Ringgit',
    symbol_native: 'RM',
    decimal_digits: 2,
    rounding: 0,
    code: 'MYR',
    name_plural: 'Malaysian ringgits',
  },
  {
    symbol: 'MTn',
    name: 'Mozambican Metical',
    symbol_native: 'MTn',
    decimal_digits: 2,
    rounding: 0,
    code: 'MZN',
    name_plural: 'Mozambican meticals',
  },
  {
    symbol: 'N$',
    name: 'Namibian Dollar',
    symbol_native: 'N$',
    decimal_digits: 2,
    rounding: 0,
    code: 'NAD',
    name_plural: 'Namibian dollars',
  },
  {
    symbol: '₦',
    name: 'Nigerian Naira',
    symbol_native: '₦',
    decimal_digits: 2,
    rounding: 0,
    code: 'NGN',
    name_plural: 'Nigerian nairas',
  },
  {
    symbol: 'C$',
    name: 'Nicaraguan Córdoba',
    symbol_native: 'C$',
    decimal_digits: 2,
    rounding: 0,
    code: 'NIO',
    name_plural: 'Nicaraguan córdobas',
  },
  {
    symbol: 'Nkr',
    name: 'Norwegian Krone',
    symbol_native: 'kr',
    decimal_digits: 2,
    rounding: 0,
    code: 'NOK',
    name_plural: 'Norwegian kroner',
  },
  {
    symbol: 'NPRs',
    name: 'Nepalese Rupee',
    symbol_native: 'नेरू',
    decimal_digits: 2,
    rounding: 0,
    code: 'NPR',
    name_plural: 'Nepalese rupees',
  },
  {
    symbol: 'NZ$',
    name: 'New Zealand Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'NZD',
    name_plural: 'New Zealand dollars',
  },
  {
    symbol: 'OMR',
    name: 'Omani Rial',
    symbol_native: 'ر.ع.‏',
    decimal_digits: 3,
    rounding: 0,
    code: 'OMR',
    name_plural: 'Omani rials',
  },
  {
    symbol: 'B/.',
    name: 'Panamanian Balboa',
    symbol_native: 'B/.',
    decimal_digits: 2,
    rounding: 0,
    code: 'PAB',
    name_plural: 'Panamanian balboas',
  },
  {
    symbol: 'S/.',
    name: 'Peruvian Nuevo Sol',
    symbol_native: 'S/.',
    decimal_digits: 2,
    rounding: 0,
    code: 'PEN',
    name_plural: 'Peruvian nuevos soles',
  },
  {
    symbol: '₱',
    name: 'Philippine Peso',
    symbol_native: '₱',
    decimal_digits: 2,
    rounding: 0,
    code: 'PHP',
    name_plural: 'Philippine pesos',
  },
  {
    symbol: 'PKRs',
    name: 'Pakistani Rupee',
    symbol_native: '₨',
    decimal_digits: 0,
    rounding: 0,
    code: 'PKR',
    name_plural: 'Pakistani rupees',
  },
  {
    symbol: 'zł',
    name: 'Polish Zloty',
    symbol_native: 'zł',
    decimal_digits: 2,
    rounding: 0,
    code: 'PLN',
    name_plural: 'Polish zlotys',
  },
  {
    symbol: '₲',
    name: 'Paraguayan Guarani',
    symbol_native: '₲',
    decimal_digits: 0,
    rounding: 0,
    code: 'PYG',
    name_plural: 'Paraguayan guaranis',
  },
  {
    symbol: 'QR',
    name: 'Qatari Rial',
    symbol_native: 'ر.ق.‏',
    decimal_digits: 2,
    rounding: 0,
    code: 'QAR',
    name_plural: 'Qatari rials',
  },
  {
    symbol: 'RON',
    name: 'Romanian Leu',
    symbol_native: 'RON',
    decimal_digits: 2,
    rounding: 0,
    code: 'RON',
    name_plural: 'Romanian lei',
  },
  {
    symbol: 'din.',
    name: 'Serbian Dinar',
    symbol_native: 'дин.',
    decimal_digits: 0,
    rounding: 0,
    code: 'RSD',
    name_plural: 'Serbian dinars',
  },
  {
    symbol: 'RUB',
    name: 'Russian Ruble',
    symbol_native: '₽.',
    decimal_digits: 2,
    rounding: 0,
    code: 'RUB',
    name_plural: 'Russian rubles',
  },
  {
    symbol: 'RWF',
    name: 'Rwandan Franc',
    symbol_native: 'FR',
    decimal_digits: 0,
    rounding: 0,
    code: 'RWF',
    name_plural: 'Rwandan francs',
  },
  {
    symbol: 'SR',
    name: 'Saudi Riyal',
    symbol_native: 'ر.س.‏',
    decimal_digits: 2,
    rounding: 0,
    code: 'SAR',
    name_plural: 'Saudi riyals',
  },
  {
    symbol: 'SDG',
    name: 'Sudanese Pound',
    symbol_native: 'SDG',
    decimal_digits: 2,
    rounding: 0,
    code: 'SDG',
    name_plural: 'Sudanese pounds',
  },
  {
    symbol: 'Skr',
    name: 'Swedish Krona',
    symbol_native: 'kr',
    decimal_digits: 2,
    rounding: 0,
    code: 'SEK',
    name_plural: 'Swedish kronor',
  },
  {
    symbol: 'S$',
    name: 'Singapore Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'SGD',
    name_plural: 'Singapore dollars',
  },
  {
    symbol: 'Ssh',
    name: 'Somali Shilling',
    symbol_native: 'Ssh',
    decimal_digits: 0,
    rounding: 0,
    code: 'SOS',
    name_plural: 'Somali shillings',
  },
  {
    symbol: 'SY£',
    name: 'Syrian Pound',
    symbol_native: 'ل.س.‏',
    decimal_digits: 0,
    rounding: 0,
    code: 'SYP',
    name_plural: 'Syrian pounds',
  },
  {
    symbol: '฿',
    name: 'Thai Baht',
    symbol_native: '฿',
    decimal_digits: 2,
    rounding: 0,
    code: 'THB',
    name_plural: 'Thai baht',
  },
  {
    symbol: 'DT',
    name: 'Tunisian Dinar',
    symbol_native: 'د.ت.‏',
    decimal_digits: 3,
    rounding: 0,
    code: 'TND',
    name_plural: 'Tunisian dinars',
  },
  {
    symbol: 'T$',
    name: 'Tongan Paʻanga',
    symbol_native: 'T$',
    decimal_digits: 2,
    rounding: 0,
    code: 'TOP',
    name_plural: 'Tongan paʻanga',
  },
  {
    symbol: 'TL',
    name: 'Turkish Lira',
    symbol_native: 'TL',
    decimal_digits: 2,
    rounding: 0,
    code: 'TRY',
    name_plural: 'Turkish Lira',
  },
  {
    symbol: 'TT$',
    name: 'Trinidad and Tobago Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'TTD',
    name_plural: 'Trinidad and Tobago dollars',
  },
  {
    symbol: 'NT$',
    name: 'New Taiwan Dollar',
    symbol_native: 'NT$',
    decimal_digits: 2,
    rounding: 0,
    code: 'TWD',
    name_plural: 'New Taiwan dollars',
  },
  {
    symbol: 'TSh',
    name: 'Tanzanian Shilling',
    symbol_native: 'TSh',
    decimal_digits: 0,
    rounding: 0,
    code: 'TZS',
    name_plural: 'Tanzanian shillings',
  },
  {
    symbol: '₴',
    name: 'Ukrainian Hryvnia',
    symbol_native: '₴',
    decimal_digits: 2,
    rounding: 0,
    code: 'UAH',
    name_plural: 'Ukrainian hryvnias',
  },
  {
    symbol: 'USh',
    name: 'Ugandan Shilling',
    symbol_native: 'USh',
    decimal_digits: 0,
    rounding: 0,
    code: 'UGX',
    name_plural: 'Ugandan shillings',
  },
  {
    symbol: '$U',
    name: 'Uruguayan Peso',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'UYU',
    name_plural: 'Uruguayan pesos',
  },
  {
    symbol: 'UZS',
    name: 'Uzbekistan Som',
    symbol_native: 'UZS',
    decimal_digits: 0,
    rounding: 0,
    code: 'UZS',
    name_plural: 'Uzbekistan som',
  },
  {
    symbol: 'Bs.F.',
    name: 'Venezuelan Bolívar',
    symbol_native: 'Bs.F.',
    decimal_digits: 2,
    rounding: 0,
    code: 'VEF',
    name_plural: 'Venezuelan bolívars',
  },
  {
    symbol: '₫',
    name: 'Vietnamese Dong',
    symbol_native: '₫',
    decimal_digits: 0,
    rounding: 0,
    code: 'VND',
    name_plural: 'Vietnamese dong',
  },
  {
    symbol: 'FCFA',
    name: 'CFA Franc BEAC',
    symbol_native: 'FCFA',
    decimal_digits: 0,
    rounding: 0,
    code: 'XAF',
    name_plural: 'CFA francs BEAC',
  },
  {
    symbol: 'CFA',
    name: 'CFA Franc BCEAO',
    symbol_native: 'CFA',
    decimal_digits: 0,
    rounding: 0,
    code: 'XOF',
    name_plural: 'CFA francs BCEAO',
  },
  {
    symbol: 'YR',
    name: 'Yemeni Rial',
    symbol_native: 'ر.ي.‏',
    decimal_digits: 0,
    rounding: 0,
    code: 'YER',
    name_plural: 'Yemeni rials',
  },
  {
    symbol: 'R',
    name: 'South African Rand',
    symbol_native: 'R',
    decimal_digits: 2,
    rounding: 0,
    code: 'ZAR',
    name_plural: 'South African rand',
  },
  {
    symbol: 'ZK',
    name: 'Zambian Kwacha',
    symbol_native: 'ZK',
    decimal_digits: 0,
    rounding: 0,
    code: 'ZMK',
    name_plural: 'Zambian kwachas',
  },
  {
    symbol: 'ZWL$',
    name: 'Zimbabwean Dollar',
    symbol_native: 'ZWL$',
    decimal_digits: 0,
    rounding: 0,
    code: 'ZWL',
    name_plural: 'Zimbabwean Dollar',
  },
];

const languageJson = [
  'Hindi',
  'English',
  'Abkhazian',
  'Afar',
  'Afrikaans',
  'Akan',
  'Albanian',
  'Amharic',
  'Arabic',
  'Aragonese',
  'Armenian',
  'Assamese',
  'Avaric',
  'Avestan',
  'Aymara',
  'Azerbaijani',
  'Bambara',
  'Bashkir',
  'Basque',
  'Belarusian',
  'Bengali (Bangla)',
  'Bihari',
  'Bislama',
  'Bosnian',
  'Breton',
  'Bulgarian',
  'Burmese',
  'Catalan',
  'Chamorro',
  'Chechen',
  'Chichewa, Chewa, Nyanja',
  'Chinese',
  'Chinese (Simplified)',
  'Chinese (Traditional)',
  'Chuvash',
  'Cornish',
  'Corsican',
  'Cree',
  'Croatian',
  'Czech',
  'Danish',
  'Divehi, Dhivehi, Maldivian',
  'Dutch',
  'Dzongkha',
  'Esperanto',
  'Estonian',
  'Ewe',
  'Faroese',
  'Fijian',
  'Finnish',
  'French',
  'Fula, Fulah, Pulaar, Pular',
  'Galician',
  'Gaelic (Scottish)',
  'Gaelic (Manx)',
  'Georgian',
  'German',
  'Greek',
  'Greenlandic',
  'Guarani',
  'Gujarati',
  'Haitian Creole',
  'Hausa',
  'Hebrew',
  'Herero',
  'Hiri Motu',
  'Hungarian',
  'Icelandic',
  'Ido',
  'Igbo',
  'Indonesian',
  'Interlingua',
  'Interlingue',
  'Inuktitut',
  'Inupiak',
  'Irish',
  'Italian',
  'Japanese',
  'Javanese',
  'Kalaallisut, Greenlandic',
  'Kannada',
  'Kanuri',
  'Kashmiri',
  'Kazakh',
  'Khmer',
  'Kikuyu',
  'Kinyarwanda (Rwanda)',
  'Kirundi',
  'Kyrgyz',
  'Komi',
  'Kongo',
  'Korean',
  'Kurdish',
  'Kwanyama',
  'Lao',
  'Latin',
  'Latvian (Lettish)',
  'Limburgish ( Limburger)',
  'Lingala',
  'Lithuanian',
  'Luga-Katanga',
  'Luganda, Ganda',
  'Luxembourgish',
  'Manx',
  'Macedonian',
  'Malagasy',
  'Malay',
  'Malayalam',
  'Maltese',
  'Maori',
  'Marathi',
  'Marshallese',
  'Moldavian',
  'Mongolian',
  'Nauru',
  'Navajo',
  'Ndonga',
  'Northern Ndebele',
  'Nepali',
  'Norwegian',
  'Norwegian bokmål',
  'Norwegian nynorsk',
  'Nuosu',
  'Occitan',
  'Ojibwe',
  'Old Church Slavonic, Old Bulgarian',
  'Oriya',
  'Oromo (Afaan Oromo)',
  'Ossetian',
  'Pāli',
  'Pashto, Pushto',
  'Persian (Farsi)',
  'Polish',
  'Portuguese',
  'Punjabi (Eastern)',
  'Quechua',
  'Romansh',
  'Romanian',
  'Russian',
  'Sami',
  'Samoan',
  'Sango',
  'Sanskrit',
  'Serbian',
  'Serbo-Croatian',
  'Sesotho',
  'Setswana',
  'Shona',
  'Sichuan Yi',
  'Sindhi',
  'Sinhalese',
  'Siswati',
  'Slovak',
  'Slovenian',
  'Somali',
  'Southern Ndebele',
  'Spanish',
  'Sundanese',
  'Swahili (Kiswahili)',
  'Swati',
  'Swedish',
  'Tagalog',
  'Tahitian',
  'Tajik',
  'Tamil',
  'Tatar',
  'Telugu',
  'Thai',
  'Tibetan',
  'Tigrinya',
  'Tonga',
  'Tsonga',
  'Turkish',
  'Turkmen',
  'Twi',
  'Uyghur',
  'Ukrainian',
  'Urdu',
  'Uzbek',
  'Venda',
  'Vietnamese',
  'Volapük',
  'Wallon',
  'Welsh',
  'Wolof',
  'Western Frisian',
  'Xhosa',
  'Yiddish',
  'Yoruba',
  'Zhuang, Chuang',
  'Zulu',
];

function Onboarding({ navigation }) {
  const { language } = useSelector((state) => state.AuthReducer);
  const setLanguage = useLanguage();

  const Array = useSelector((state) => state.DoctorReducer);

  const specialityArray = Array.specialty;

  const [lang, setLang] = useState('en');

  const SetLang = async (lan) => {
    setLang(lan);
    setLocale(lan);
    setLanguage(lan);
    await AsyncStorage.setItem('language', lan);
  };

  const [signaturePopupHeight, setSignaturePopupHeight] = useState(400);
  const [signaturePopupHeightL, setSignaturePopupHeightL] = useState(400);
  const [signaturePopupHeightV, setSignaturePopupHeightV] = useState(400);
  const animateHeightOfPopup = useRef(new Animated.Value(0)).current;
  const animateHeightOfPopupL = useRef(new Animated.Value(0)).current;
  const animateHeightOfPopupV = useRef(new Animated.Value(0)).current;
  const [signaturePopupVisible, setSignaturePopupVisible] = useState(false);
  const [signaturePopupVisibleL, setSignaturePopupVisibleL] = useState(false);
  const [signaturePopupVisibleV, setSignaturePopupVisibleV] = useState(false);

  const onSignaturePopupLayoutChange = (event) => {
    setSignaturePopupHeight(event.nativeEvent.layout.height);
  };
  const onSignaturePopupLayoutChangeL = (event) => {
    setSignaturePopupHeightL(event.nativeEvent.layout.height);
  };
  const onSignaturePopupLayoutChangeV = (event) => {
    setSignaturePopupHeightV(event.nativeEvent.layout.height);
  };

  const onPressSignature = () => {
    Animated.timing(animateHeightOfPopup, {
      useNativeDriver: true,
      toValue: signaturePopupVisible ? 0 : 1,
      easing: Easing.elastic(),
      duration: 500,
    }).start(() => {
      setSignaturePopupVisible(!signaturePopupVisible);
    });
  };

  const onPressSignatureL = () => {
    Animated.timing(animateHeightOfPopupL, {
      useNativeDriver: true,
      toValue: signaturePopupVisibleL ? 0 : 1,
      easing: Easing.elastic(),
      duration: 500,
    }).start(() => {
      setSignaturePopupVisibleL(!signaturePopupVisibleL);
    });
  };

  const onPressSignatureV = () => {
    Animated.timing(animateHeightOfPopupV, {
      useNativeDriver: true,
      toValue: signaturePopupVisibleV ? 0 : 1,
      easing: Easing.elastic(),
      duration: 500,
    }).start(() => {
      setSignaturePopupVisibleV(!signaturePopupVisibleV);
    });
  };

  const onChooseCamera = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted) {
      PickCamera();
    } else {
      askPermission(PickCamera);
    }
  };
  const onChooseGallery = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted) {
      PickGallery();
    } else {
      askPermission(PickGallery);
    }
  };

  const onChooseCameraL = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted) {
      PickCameraL();
    } else {
      askPermission(PickCameraL);
    }
  };
  const onChooseGalleryL = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted) {
      PickGalleryL();
    } else {
      askPermission(PickGalleryL);
    }
  };

  const onChooseCameraV = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted) {
      PickCameraV();
    } else {
      askPermission(PickCameraV);
    }
  };
  const onChooseGalleryV = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted) {
      PickGalleryV();
    } else {
      askPermission(PickGalleryV);
    }
  };
  const askPermission = async (launch) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'DocPlus needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launch();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err, 'sflskdfjsdklfjdsf');
    }
  };
  const PickCamera = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },

    };

    const options2 = {
      title: 'Select video',
      mediaType: 'video',
      path: 'video',
      quality: 0.1

    };


    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('CameraPicker Error: ', response.error);
      } else {
        setProfileLoading(true);
        console.log(response)
        if (userData?._id) {
          dispatch(
            UploadSignature(userData?._id, response, (res) => {
              animateHeightOfPopup.setValue(0);
              dispatch(
                UpdateDoctorProfile(
                  { signature: res.signature, id: res.id },
                  () => {
                    setProfileLoading(false);
                    console.log('UploadSuccess!');
                  },
                  (err) => {
                    setProfileLoading(false);

                    console.log('error ', err);
                  },
                ),
              );
            }, (err) => {
              console.log(err, "^^^^^^^^^")
              setProfileLoading(false)
            }),
          );
        } else {
          alert('You need to login first');
          setProfileLoading(false);
        }
      }
    });
  };
  const PickGallery = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery picker');
      } else if (response.error) {
        console.log('Gallery picker Error: ', response.error);
      } else {
        setProfileLoading(true);
        if (userData?._id) {
          console.log(response, "lfjdslfjds")
          dispatch(
            UploadSignature(userData?._id, response, (res) => {
              animateHeightOfPopup.setValue(0);
              dispatch(
                UpdateDoctorProfile(
                  { signature: res.signature, id: res.id },
                  () => {
                    setProfileLoading(false);
                    console.log('UploadSuccess!');
                  },
                  (err) => {
                    setProfileLoading(false);
                    console.log('error ', err);
                  },
                ),
              );
            }, (err) => {
              console.log(err, "^^^^^^^^")
              setProfileLoading(false)
            }),
          );
        } else {
          alert('You need to login first');
          setProfileLoading(false);
        }
      }
    });
  };
  const PickCameraL = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },

    };

    const options2 = {
      title: 'Select video',
      mediaType: 'video',
      path: 'video',
      quality: 0.1

    };


    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('CameraPicker Error: ', response.error);
      } else {
        setProfileLoading(true);
        console.log(response)
        if (userData?._id) {
          dispatch(
            UploadSignature(userData?._id, response, (res) => {
              animateHeightOfPopup.setValue(0);
              dispatch(
                UpdateDoctorProfile(
                  { letterhead: res.signature, id: res.id },
                  () => {
                    setProfileLoading(false);
                    console.log('UploadSuccess!');
                  },
                  (err) => {
                    setProfileLoading(false);

                    console.log('error ', err);
                  },
                ),
              );
            }, (err) => {
              console.log(err, "^^^^^^^^^")
              setProfileLoading(false)
            }),
          );
        } else {
          alert('You need to login first');
          setProfileLoading(false);
        }
      }
    });
  };
  const PickGalleryL = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery picker');
      } else if (response.error) {
        console.log('Gallery picker Error: ', response.error);
      } else {
        setProfileLoading(true);
        if (userData?._id) {
          console.log(response, "lfjdslfjds")
          dispatch(
            UploadSignature(userData?._id, response, (res) => {
              animateHeightOfPopup.setValue(0);
              dispatch(
                UpdateDoctorProfile(
                  { letterHead: res.signature, id: res.id },
                  (res) => {
                    setProfileLoading(false);
                    console.log(res?.letterHead, 'UploadSuccess!');
                  },
                  (err) => {
                    setProfileLoading(false);
                    console.log('error ', err);
                  },
                ),
              );
            }, (err) => {
              console.log(err, "^^^^^^^^")
              setProfileLoading(false)
            }),
          );
        } else {
          alert('You need to login first');
          setProfileLoading(false);
        }
      }
    });
  };



  const PickCameraV = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },

    };

    const options2 = {
      title: 'Select video',
      mediaType: 'video',
      includeBase64: true,
      path: 'video',
      quality: 0.1

    };


    ImagePicker.launchCamera(options2, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('CameraPicker Error: ', response.error);
      } else {
        console.log(response)
        setProfileLoading(true);
        if (userData?._id) {
          dispatch(
            UploadVideo(userData?._id, response, (res) => {
              animateHeightOfPopupV.setValue(0);
              console.log(res, "sdlkfjdslkfjdslfjdslfjdlfj%%%%%%%%%%")
              dispatch(
                UpdateDoctorProfile(
                  { video: res.video, id: res.id },
                  () => {
                    setProfileLoading(false);
                    console.log('UploadSuccess!');
                    Alert.alert("Success!", "Video Uploaded Successfully!")
                  },
                  (err) => {
                    setProfileLoading(false);

                    console.log('error ', err);
                  },
                ),
              );
            }, (err) => {
              console.log(err, "ldlfkjdklf")
              setProfileLoading(false)
            }),
          );
        } else {
          alert('You need to login first');
          setProfileLoading(false);
        }
      }
    });
  };
  const PickGalleryV = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const options2 = {
      title: 'Select video',
      mediaType: 'video',
      includeBase64: true,
      path: 'video',
      quality: 0.1

    };
    ImagePicker.launchImageLibrary(options2, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery picker');
      } else if (response.error) {
        console.log('Gallery picker Error: ', response.error);
      } else {
        setProfileLoading(true);
        if (userData?._id) {
          dispatch(
            UploadVideo(userData?._id, response, (res) => {
              animateHeightOfPopupV.setValue(0);
              dispatch(
                UpdateDoctorProfile(
                  { video: res.video, id: res.id },
                  () => {
                    setProfileLoading(false);
                    console.log('UploadSuccess!');
                  },
                  (err) => {
                    setProfileLoading(false);
                    console.log('error ', err);
                  },
                ),
              );
            }, (err) => {
              console.log(err, "^^^^^^^^^^^^^^^")
              setProfileLoading(false)
            }),
          );
        } else {
          alert('You need to login first');
          setProfileLoading(false);
        }
      }
    });
  };

  const [activeGender, setActiveGender] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [prevEmail, setPrevEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [prevPhone, setPrevPhone] = useState('');
  const [country, setCountry] = useState('');
  const [rlanguage, setRLanguage] = useState('');
  const [url, setUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [specialitySelected, setSpecialitySelected] = useState('');
  const [year, setYearSelected] = useState('');
  const [registrationCouncil, setRegistrationCouncil] = useState('');
  const [registrationYear, setRegistrationYear] = useState('');
  const [degree, setDegree] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [college, setCollege] = useState('');
  const [yearOfExperience, setYearOfExperience] = useState('');
  const [clinicAndHospital, setClinicAndHospital] = useState('');
  const [cancelationPolicy, setcancelationPolicy] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [ConsultationFee, setConsultationFee] = useState(500);
  const [followUps, setFollowUps] = useState('No');
  const [followUpsCount, setFollowUpsCount] = useState(1);
  const [currency, setCurrency] = useState('');
  const [Billing, setBilling] = useState([
    {
      fee: '',
      country: '',
    },
  ]);
  const [awards, setAwards] = useState([
    {
      name: '',
      year: '',
    },
  ]);
  const [education, setEducation] = useState([
    {
      degree: '',
      university: "",
      year: '',
    },
  ]);
  const [conditions, setConditions] = useState(["",]);
  const [address, setAddress] = useState(["",]);
  const [website, setWebsite] = useState("");
  const [Changed, setChanged] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [bio, setBio] = useState('');
  const dispatch = useDispatch();
  const { userData, theme } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    const language = async () => {
      const value = await AsyncStorage.getItem('language');
      if (value === null) {
        await AsyncStorage.setItem('language', 'en');
      } else {
        SetLang(value);
      }
    };

    language();
  }, [lang]);

  useEffect(() => {
    console.log(currency, '????????????????');
  }, [currency]);

  useEffect(() => {
    console.log(rlanguage, ':::::::::');
  }, [rlanguage]);

  useEffect(() => {
    // console.log({userData})
    const {
      email,
      phone,
      state,
      country,
      slug,
      language,
      city,
      sex,
      gender,
      specialty,
      education,
      registration,
      experience,
      fee,
      bio,
      cancelationPolicy,
      consultationType,
    } = userData;
    const ed = education[education.length - 1];
    setCity(city);
    // console.log(city, "::::::::::::::::::::::::::::")
    setEmail(email);
    setPrevEmail(email);
    setPhone(phone);
    setPrevPhone(phone);
    setState(state);
    setCountry(country);
    setRLanguage(language);
    setUrl(slug);
    setPrevUrl(slug);
    setActiveGender(sex || gender);
    setSpecialitySelected(specialty);
    setYearSelected(ed.year);
    setRegistrationCouncil(registration?.regCouncil);
    setRegistrationYear(registration?.regYear);
    setRegistrationNumber(registration?.regNo);
    setDegree(ed.degree);
    setCollege(ed.university);
    setYearOfExperience(experience);
    setConsultationFee(fee);
    setBio(bio);
    setBilling(
      userData?.billing ? userData?.billing : [{ fee: '', country: '' }],
    );
    setAwards(
      userData?.awards ? userData?.awards : [{ name: '', year: '' }],
    );
    setConditions(
      userData?.conditions?.length > 0 ? userData?.conditions : ["",],
    );
    setAddress(
      userData?.addresses?.length > 0 ? userData?.addresses : ["",],
    );
    setEducation(
      userData?.education ? userData?.education : [{ degree: "", university: '', year: "" }],
    );
    setcancelationPolicy(cancelationPolicy ? cancelationPolicy : '');
    setConsultationType(consultationType ? consultationType : 'Tele-consult');
    setCurrency(userData?.currency);
    setWebsite(userData?.website ?? "");

    handleState(userData?.state)

    // console.log(userData?.country, userData?.state, userData?.city,  "????????????????????????")
  }, [userData]);

  // console.log(city, "::::::::::::::::::::::::::::????")
  const { specialty, doctorProfile } = useSelector(
    (state) => state.DoctorReducer,
  );
  // console.log('doctor profile', doctorProfile);
  const [imageSource, setImageSource] = useState(
    require('../../../assets/images/dummy_profile.png'),
  );

  const [JSONdata, setJSONdata] = useState({
    countryArray: yourhandle.getCountries(),
    stateArray: yourhandle.getStatesByShort('IN'),
    cityArray: yourhandle.getCities('IN', userData?.state ?? 'Delhi'),
  });

  const handleCity = (city) => {
    setCity(city);
  };
  const handleCountry = (country) => {
    setCountry(country);
    let shortName = '';
    JSONdata.countryArray.map((c) => {
      if (c.name == country) {
        shortName = c.shortName;
      }
    });
    setJSONdata({
      ...JSONdata,
      stateArray: yourhandle.getStatesByShort(shortName),
    });
  };
  const handleState = (state) => {
    setState(state);
    if (country !== '') {
      let shortName = '';
      JSONdata.countryArray.map((c) => {
        if (c.name == country) {
          shortName = c.shortName;
        }
      });
      setJSONdata({
        ...JSONdata,
        cityArray: yourhandle.getCities(shortName, state),
      });
    }
  };

  // console.log(userData?.registration?.regNo, doctorProfile.registration?.regNo, "??????????????????????????")

  const [error, seterror] = useState({
    year: true,
    registrationYear: true,
    yearOfExperience: true,
  });

  const handleIncementExp = () => {
    if (yearOfExperience === '') {
      setYearOfExperience('1');
    } else {
      setYearOfExperience((parseInt(yearOfExperience) + 1).toString());
    }
  };

  const handleDecrementExp = () => {
    if (yearOfExperience > 0) {
      setYearOfExperience((parseInt(yearOfExperience) - 1).toString());
    }
  };


  useEffect(() => {
    console.log(education, "education")
  }, [education])
  useEffect(() => {
    console.log(awards, "awards")
  }, [awards])
  useEffect(() => {
    console.log(userData?.conditions, conditions, "conditions")
  }, [conditions])

  useEffect(() => {
    if (doctorProfile?.picture?.length) {
      setImageSource({
        uri: `${Host}${doctorProfile?.coverPhoto?.replace('public', '')
          .replace('\\\\', '/')}`,
      });
    } else {
      setImageSource(require('../../../assets/images/dummy_profile.png'));
    }
  }, [doctorProfile]);
  // if (forNow || doctorProfile.onboarding) {
  //   navigation.navigate('DoctorMain');
  // }

  useEffect(() => {
    dispatch(getSpecialty());
  }, []);

  const handleSubmit = () => {
    console.log(userData?.awards, awards, 'lksdfjsdlkfjsdfjdskfj')
    setProfileLoading(true);
    console.log('clicked');
    let temp = {
      id: userData?._id,
      gender: activeGender,
      // education: [
      //   {
      //     degree: degree,
      //     university: college,
      //     year: year,
      //   },
      // ],
      education: education,
      registration: {
        regNo: registrationNumber,
        regCouncil: registrationCouncil,
        regYear: registrationYear,
      },
      specialty: specialitySelected,
      experience: yearOfExperience,
      city: city,
      // email: email,
      // phone: phone,
      state: state,
      country: country,
      language: rlanguage,
      awards: awards,
      conditions: conditions,
      addresses: address,
      website,
      // slug: url,
      bio: bio,
      fee: ConsultationFee,
      onBoarding: true,
      cancelationPolicy: cancelationPolicy,
      consultationType: consultationType,
      followUps: followUpsCount,
      billing: Billing,
      currency: currency,
    };

    let obj = temp

    if ((url == prevUrl || url === "") || (email == prevEmail || email === "") || (phone == prevPhone || phone === "")) {
      if ((url == prevUrl || url === "") && (email == prevEmail || email === "") && (phone == prevPhone || phone === "")) {
        obj = {
          ...temp,
        }
      } else if ((url == prevUrl || slug === "") && (email == prevEmail || email === "")) {
        obj = {
          ...temp,
          phone
        }
      } else if ((url == prevUrl || slug === "") && (phone == prevPhone || phone === "")) {
        obj = {
          ...email,
          phone
        }
      } else if ((email == prevEmail || email === "") && (phone == prevPhone || phone === "")) {
        obj = {
          ...temp,
          url
        }
      } else if (email == prevEmail || email === "") {
        obj = {
          ...temp,
          phone,
          url
        }
      } else if (url == prevUrl || slug === "") {
        obj = {
          ...temp,
          phone,
          email
        }
      } else if (phone == prevPhone || phone === "") {
        obj = {
          ...temp,
          email,
          url
        }
      }

    } else {
      obj = {
        ...temp,
        phone,
        email,
        url
      }
    }
    /* if (prevUrl === url) {
      obj = {
        id: userData?._id,
        gender: activeGender,
        education: [
          {
            degree: degree,
            university: college,
            year: year,
          },
        ],
        registration: {
          regNo: registrationNumber,
          regCouncil: registrationCouncil,
          regYear: registrationYear,
        },
        specialty: specialitySelected,
        experience: yearOfExperience,
        city: city,
        // email: email,
        // phone: phone,
        state: state,
        country: country,
        language: rlanguage,
        awards: awards,
        // slug: url,
        bio: bio,
        fee: ConsultationFee,
        onBoarding: true,
        cancelationPolicy: cancelationPolicy,
        consultationType: consultationType,
        followUps: followUpsCount,
        billing: Billing,
        currency: currency,
      };
    } else {
      obj = {
        id: userData?._id,
        gender: activeGender,
        education: [
          {
            degree: degree,
            university: college,
            year: year,
          },
        ],
        registration: {
          regNo: registrationNumber,
          regCouncil: registrationCouncil,
          regYear: registrationYear,
        },
        specialty: specialitySelected,
        experience: yearOfExperience,
        city: city,
        // email: email,
        // phone: phone,
        state: state,
        country: country,
        language: rlanguage,
        awards: awards,
        slug: url,
        bio: bio,
        fee: ConsultationFee,
        onBoarding: true,
        cancelationPolicy: cancelationPolicy,
        consultationType: consultationType,
        followUps: followUpsCount,
        billing: Billing,
        currency: currency,
      };
    } */
    console.log(obj, 'OBJJJJJJJJJJJJJJJJJ');
    dispatch(
      UpdateDoctorProfile(
        obj,
        (res) => {
          setProfileLoading(false);
          console.log(res?.addresses, res?.website, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
          Alert.alert('Success!', 'Profile has been updated successfuly!');

          //update for now
          dispatch(
            SetForNow(true, () => {
              console.log('calling callback');
              console.log(navigation);
              // navigation.navigate('MainController');
            }),
          );
        },
        (err) => {
          setProfileLoading(false);
          console.log(err.response.data, '??????????');
          Alert.alert('Error!', err.response.data.message);
        },
      ),
    );
  };

  String.prototype.toTitleCase = function () {
    const splited = this.split(' ')
      .map((item) => {
        if (item[0]) return `${item[0].toUpperCase()}${item.slice(1)}`;
      })
      .join(' ');
    return splited;
  };

  const ConsultationFields = ({ value, index }) => (
    <View>
      {/* <StatusBar
        animated
        backgroundColor={Colors.secondary_background[theme]}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
      /> */}
      {console.log({ value })}
      <View
        style={{
          paddingHorizontal: '6%',
          borderBottomWidth: 1,
          borderColor: '#e0e0e0',
        }}>
        <Picker
          selectedValue={value.country}
          mode={'dropdown'}
          style={{
            width: '100%',
            color: Colors.primary_text_color[theme],
            backgroundColor: Colors.secondary_background[theme],
          }}
          // dropdownIconColor="rgba(40,250,40,30)"
          /* itemStyle={{
            backgroundColor: "red"
          }} */

          onValueChange={(itemValue, itemIndex) => {
            let bill = Billing;
            bill[index].country = itemValue;
            setChanged(!Changed);
            setBilling(bill);
          }}>
          <Picker.Item color={'#8e9393'} label="Select a country" value="" />
          {countries.map((c, i) => (
            <Picker.Item label={c.text} value={c.text} />
          ))}
        </Picker>
      </View>
      <View
        style={{
          paddingHorizontal: '7%',
          borderBottomWidth: 1,
          borderColor: '#e0e0e0',
        }}>
        <TextInput
          onChangeText={(text) => {
            // e.preventDefault()
            let bill = Billing;
            bill[index].fee = parseInt(text);
            setBilling(bill);
            // setChanged(!Changed);
          }}
          // keyboardShouldPersistTaps="always"
          style={{
            color: Colors.primary_text_color[theme],
          }}
          // onFocus={(e) => {
          //   e.preventDefault()
          // }}
          // onBlur={() => {}}
          // blurOnSubmit={false}
          // autoFocus
          //value={value.fee.toString()}
          keyboardType={'number-pad'}
          //style={{ fontSize: 16 }}
          placeholder={`${Local("doctor.Profile.fees")}`}
          placeholderTextColor={Colors.input_placeholder_color[theme]}
        />
      </View>
    </View>
  );

  
  return (
    <>
      {/* <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} /> */}
      <View
        style={[
          OnboardingStyle.Container,
          { backgroundColor: Colors.secondary_background[theme] },
        ]}>
        <TopNavBar
          navigation={navigation}
          headerText={`${Local('doctor.profile.profile')}`}
        />
        {profileLoading && (
          <BlurSpinner visible={true}>
            <ActivityIndicator color={NEW_PRIMARY_BACKGROUND} size="large" />
          </BlurSpinner>
        )}
        <ScrollView style={OnboardingStyle.ScrollView}>
          {/* <View
            style={{
              width: '90%',
              paddingVertical: 30,
              paddingTop: 40,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '500',
              }}>
              Welcome to
              <Text style={{ color: '#077EE9', fontWeight: 'bold' }}> DocPlus</Text>
            </Text>
            <Text
              style={{
                fontSize: 18,
                letterSpacing: 0.8,
              }}>
              Finish your profile to get started
            </Text>
          </View> */}
          <View
            style={{
              width: '90%',
              paddingVertical: 10,
              paddingBottom: 5,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
              }}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 100,
                  borderColor: '#dddddd',
                  borderWidth: 2,
                }}
                source={imageSource}
              />
            </View>
            {/* <TouchableOpacity onPress={() => {

              console.log("clicked", userData?.deviceToken)
              Axios.post(`${Host}/notification/send`, {
                deviceToken: userData?.deviceToken,
                data: {
                  title: "Appointment Booked!",
                  description: "Your Appointment has been booked"
                }
              }).then((res) => {
                PushNotification.localNotification({
                  channelId: "123456789",
                  title: "Appointment Booked!",
                  message: "Your Appointment has been booked"
                })
                console.log(res.data.data, "^^^^^^^^^^")
              }).catch((e) => {
                console.log(e.response.data, "KDLjfldksfjldksfjldfj")
              })
            }}> */}
              <Text
                style={{
                  fontSize: 22,
                  color: Colors.primary_text_color[theme],
                  fontWeight: '500',
                  letterSpacing: 1.2,
                  fontFamily: Fonts.default[language],
                  marginTop: '4%',
                }}>
                {`Dr. ${userData?.firstName.toTitleCase()} ${userData?.lastName.toTitleCase()}`}
              </Text>
            {/* </TouchableOpacity> */}
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
              marginTop: 20,
            }}>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: '8%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <RadioGroupV2
                horizontal
                activeKey={activeGender}
                setActiveKey={setActiveGender}
                Item={[
                  { value: `${Local('patient.familyMember.male')}`, id: 'male' },
                  { value: `${Local('patient.familyMember.female')}`, id: 'female' },
                ]}
              />
            </View>
            {/* <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                selectedValue={city}
                style={{width: '100%'}}
                onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
                <Picker.Item color={'#8e9393'} label="Select City" value="" />
                <Picker.Item label="Bangalore" value="bangalore" />
                <Picker.Item label="Pune" value="pune" />
              </Picker>
            </View> */}
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                selectedValue={specialitySelected}
                style={{
                  width: '100%',
                  color: specialitySelected
                    ? Colors.primary_text_color[theme]
                    : '#8e9393',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setSpecialitySelected(itemValue)
                }>
                <Picker.Item color="#8E9393" label="Speciality" value="" />
                {specialty.map((item) => {
                  return <Picker.Item label={item} value={item} />;
                })}
              </Picker>
            </View>

            {userData?.basic?.name !== '' ? (
              <View
                style={{
                  paddingHorizontal: '6%',
                }}>
                <Picker
                  mode={'dropdown'}
                  selectedValue={lang}
                  style={{
                    width: '100%',
                    color:
                      lang !== ''
                        ? Colors.primary_text_color[theme]
                        : '#8e9393',
                  }}
                  onValueChange={(itemValue, itemIndex) => SetLang(itemValue)}>
                  <Picker.Item
                    color="#8E9393"
                    label="Select Language"
                    value=""
                  />
                  <Picker.Item label="English" value="en" />
                  <Picker.Item label="Hindi" value="hi" />
                </Picker>
              </View>
            ) : null}
          </View>

          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 2,
              paddingLeft: '4%',
            }}>
            <TouchableOpacity onPress={onPressSignature}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.primary_text_color[theme],
                }}>
                {/* {Local('doctor.profile.registration_details')} */}
                {Local("doctor.Profile.upload_sign")}

              </Text>
            </TouchableOpacity>
            {doctorProfile.signature && (
              <Image
                style={{
                  marginVertical: 10,
                  height: 80,
                  width: '100%',
                }}
                source={{
                  uri: `${Host}${doctorProfile?.signature
                    .replace('public', '')
                    .replace('\\\\', '/')}`,
                }}
              />
            )}
          </View>



          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 2,
              paddingLeft: '4%',
            }}>
            <TouchableOpacity onPress={onPressSignatureL}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.primary_text_color[theme],
                }}>
                {/* {Local('doctor.profile.registration_details')} */}
                {Local("doctor.Profile.Upload Letterhead Logo")}

              </Text>
            </TouchableOpacity>
            {doctorProfile?.letterHead && (
              <Image
                style={{
                  marginVertical: 10,
                  height: 80,
                  width: '100%',
                }}
                source={{
                  uri: `${Host}${doctorProfile?.letterHead
                    .replace('public', '')
                    .replace('\\\\', '/')}`,
                }}
              />
            )}
          </View>


          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 2,
              paddingLeft: '4%',
            }}>
            <TouchableOpacity onPress={onPressSignatureV}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.primary_text_color[theme],
                }}>
                {Local("doctor.Profile.Upload Video")}

              </Text>
            </TouchableOpacity>
            
            {/* {doctorProfile?.video && (
              <Video
              source={
                {
                  uri: `${Host}${doctorProfile?.video
                    ?.replace("public", "")
                    ?.replace("\\\\", "/")}`
                }
              }
              style={{ width: "40px" }}
              muted={true}
              repeat={true}
              resizeMode={"cover"}
              rate={1.0}
              ignoreSilentSwitch={"obey"}
            />
            )} */}
          </View>
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 15,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {/* {Local('doctor.profile.registration_details')} */}
              {Local('doctor.Profile.pers_info')}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                // keyboardType={'text'}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                value={email}
                autoCapitalize="none"
                style={{
                  fontSize: 16,
                  marginLeft: '2%',
                  color: Colors.primary_text_color[theme],
                }}
                placeholder={`${Local("doctor.Profile.email")}`}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            </View>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                onChangeText={(itemValue, itemIndex) => setPhone(itemValue)}
                value={phone}
                style={{
                  fontSize: 16,
                  marginLeft: '2%',
                  color: Colors.primary_text_color[theme],
                }}
                keyboardType={'number-pad'}
                placeholder={`${Local("doctor.Profile.phone")}`}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            </View>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                placeholder="Country"
                mode={'dropdown'}
                style={{
                  color:
                    country !== ''
                      ? Colors.primary_text_color[theme]
                      : '#8e9393',
                }}
                onValueChange={handleCountry}
                selectedValue={country}>
                <Picker.Item label="Country" value="" color="#8e9393" />
                {JSONdata.countryArray?.length > 0 &&
                  JSONdata.countryArray?.map((country, index) => (
                    <Picker.Item
                      color="#000"
                      key={index}
                      label={country.name}
                      value={country.name}>
                      {country.name}
                    </Picker.Item>
                  ))}
              </Picker>
              {/* <TextInput
                onChangeText={(itemValue, itemIndex) =>
                  setState(itemValue)
                }
                value={state}
                style={{fontSize: 16, color: Colors.primary_text_color[theme]}}
                // keyboardType={'number-pad'}
                placeholder="State"
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              /> */}
            </View>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                placeholder="State"
                mode={'dropdown'}
                // placeholderTextColor={Colors.input_placeholder_color[theme]}
                style={{
                  color:
                    state !== '' ? Colors.primary_text_color[theme] : '#8e9393',
                }}
                onValueChange={handleState}
                selectedValue={state}
                itemStyle={{ fontFamily: 'Montserrat-Medium' }}>
                <Picker.Item label="State" value="" color="#8e9393" />
                {JSONdata.stateArray &&
                  JSONdata.stateArray?.length &&
                  JSONdata.stateArray?.length > 0 &&
                  JSONdata.stateArray?.map((city, index) => (
                    <Picker.Item color="#000" label={city} value={city} />
                  ))}
              </Picker>
              {/* <TextInput
                onChangeText={(itemValue, itemIndex) =>
                  setCountry(itemValue)
                }
                value={country}
                style={{fontSize: 16, color: Colors.primary_text_color[theme]}}
                // keyboardType={'number-pad'}
                placeholder="Country"
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              /> */}
            </View>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                placeholder="City of Residence"
                mode={'dropdown'}
                style={{
                  color:
                    city !== '' ? Colors.primary_text_color[theme] : '#8e9393',
                }}
                // placeholderTextColor={Colors.input_placeholder_color[theme]}
                onValueChange={handleCity}
                selectedValue={city}
                itemStyle={{ fontFamily: 'Montserrat-Medium' }}>
                {console.log('>>>>>>>>>>>>>>>>>>', city)}
                <Picker.Item
                  label="City of Residence"
                  value=""
                  color="#8e9393"
                />
                {JSONdata.cityArray?.length > 0 &&
                  JSONdata.cityArray?.map((city, index) => (
                    <Picker.Item color="#000" label={city} value={city} />
                  ))}
              </Picker>
              {/* <TextInput
                onChangeText={(itemValue, itemIndex) =>
                  setCountry(itemValue)
                }
                value={country}
                style={{fontSize: 16, color: Colors.primary_text_color[theme]}}
                // keyboardType={'number-pad'}
                placeholder="Country"
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              /> */}
            </View>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                placeholder="Language"
                mode={'dropdown'}
                style={{
                  color:
                    rlanguage !== ''
                      ? Colors.primary_text_color[theme]
                      : '#8e9393',
                }}
                // placeholderTextColor={Colors.input_placeholder_color[theme]}
                onValueChange={(itemValue, itemIndex) => {
                  setRLanguage(itemValue);
                }}
                selectedValue={rlanguage}
                itemStyle={{ fontFamily: 'Montserrat-Medium' }}>
                {/* {console.log('>>>>>>>>>>>>>>>>>>', city)} */}
                <Picker.Item label="Select Language" value="" color="#8e9393" />
                {languageJson.map((item, index) => (
                  <Picker.Item color="#000" label={item} value={item} />
                ))}
              </Picker>
            </View>
            {/* <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                onChangeText={(itemValue, itemIndex) => setRLanguage(itemValue)}
                value={rlanguage}
                style={{fontSize: 16, color: Colors.primary_text_color[theme]}}
                // keyboardType={'number-pad'}
                placeholder="Language"
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            </View> */}
          </View>
          {!error.registrationYear && (
            <AnimatedErrorText
              style={{ width: '84%', alignSelf: 'center' }}
              text={'Registration year should be valid'}
            />
          )}

          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('doctor.profile.bio')}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
              paddingHorizontal: '5%',
            }}>
            <TextInput
              onChangeText={(bio) => {
                setBio(bio);
              }}
              value={bio}
              multiline
              style={{ fontSize: 16, color: Colors.primary_text_color[theme] }}
              placeholder={`${Local("doctor.Profile.about_you")}`}
              placeholderTextColor={Colors.input_placeholder_color[theme]}
              textAlignVertical={'top'}
              numberOfLines={3}
            />
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: "flex-start"
              }}>
              <TextInput
                // onChangeText={(url) => {
                //   setUrl(url);
                // }}
                value={`https://docplus.online/doctors/`}
                style={{
                  fontSize: 15,
                  color: Colors.search_placeholder_text[theme],
                  marginRight: "-2%",
                }}
                // placeholder={'Url'}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
                // textAlignVertical={'top'}
                editable={false}
                selectTextOnFocus={false}
              />
              <TextInput
                onChangeText={(url) => {
                  setUrl(url);
                }}
                value={url}
                style={{
                  fontSize: 15,
                  color: Colors.primary_text_color[theme],
                  marginLeft: 0,
                }}
                placeholder={`${Local("doctor.Profile.url")}`}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              // textAlignVertical={'top'}
              />
            </View>
            <View
              style={{
                // flexDirection: 'row',
                // justifyContent: "flex-start"
              }}>
              {/* <TextInput
                // onChangeText={(url) => {
                //   setUrl(url);
                // }}
                value={`https://docplus.online/doctors/`}
                style={{
                  fontSize: 15,
                  color: Colors.search_placeholder_text[theme],
                  marginRight: "-2%",
                }}
                // placeholder={'Url'}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
                // textAlignVertical={'top'}
                editable={false}
                selectTextOnFocus={false}
              /> */}
              <TextInput
                onChangeText={(text) => {
                  setWebsite(text);
                }}
                value={website}
                style={{
                  fontSize: 15,
                  color: Colors.primary_text_color[theme],
                  marginLeft: 0,
                  // borderWidth: 1,
                }}
                placeholder={`${Local("doctor.Profile.Website")}`}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              // textAlignVertical={'top'}
              />
            </View>
          </View>


          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('doctor.profile.education_qualifications')}
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                // paddingVertical: 12,
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              {education?.map((value, index) => (
                <View>
                  <View
                    style={{
                      paddingHorizontal: '6%',
                      borderBottomWidth: 1,
                      borderColor: '#e0e0e0',
                    }}>
                    <Picker
                      selectedValue={education[index].degree}
                      // selectedValue={education[index].degree}

                      /* style={{
                        color: Colors.primary_text_color[theme]
                      }} */
                      mode={'dropdown'}
                      style={{
                        width: '100%',
                        color:
                          degree !== ''
                            ? Colors.primary_text_color[theme]
                            : '#8e9393',
                      }}
                      onValueChange={(itemValue, itemIndex) => {
                        let bill = education;
                        bill[index].degree = itemValue;
                        setEducation(bill);
                      }}>
                      <Picker.Item color={'#8e9393'} label="Degree" value="" />
                      <Picker.Item label="MBBS" value="MBBS" />
                      <Picker.Item label="BHMS" value="BHMS" />
                      <Picker.Item label="DHMS" value="DHMS" />
                      <Picker.Item label="B.V.Sc & AH" value="B.V.Sc & AH" />
                      <Picker.Item label="D.Pharma" value="D.Pharma" />
                      <Picker.Item label="BMLT" value="BMLT" />
                      <Picker.Item label="BDS" value="BDS" />
                      <Picker.Item label="BAMS" value="BAMS" />
                      <Picker.Item label="MS" value="MS" />
                    </Picker>
                  </View>

                  <View
                    style={{
                      paddingHorizontal: '7%',
                      borderBottomWidth: 1,
                      borderColor: '#e0e0e0',
                    }}>
                    <TextInput
                      onChangeText={(text) => {
                        // e.preventDefault()
                        let bill = education;
                        bill[index].university = text;
                        setEducation(bill);
                        // setChanged(!Changed);
                      }}
                      // keyboardShouldPersistTaps="always"
                      style={{
                        color: Colors.primary_text_color[theme],
                      }}
                      // onFocus={(e) => {
                      //   e.preventDefault()
                      // }}
                      // onBlur={() => {}}
                      // blurOnSubmit={false}
                      // autoFocus
                      // value={education[index].university}
                      // value={education[index].university}
                      defaultValue={education[index].university}
                      // value={index !==0 ? education[index].university : "dkfjd"}
                      // keyboardType={'number-pad'}
                      //style={{ fontSize: 16 }}
                      placeholder="College/University"
                      placeholderTextColor={
                        Colors.input_placeholder_color[theme]
                      }
                    />

                  </View>
                  <View
                    style={{
                      paddingHorizontal: '7%',
                      borderBottomWidth: 1,
                      borderColor: '#e0e0e0',
                    }}>
                    <TextInput
                      onChangeText={(text) => {
                        // e.preventDefault()
                        let bill = education;
                        bill[index].year = parseInt(text);
                        setEducation(bill);
                        // setChanged(!Changed);
                      }}
                      // keyboardShouldPersistTaps="always"
                      style={{
                        color: Colors.primary_text_color[theme],
                      }}
                      // onFocus={(e) => {
                      //   e.preventDefault()
                      // }}
                      // onBlur={() => {}}
                      // blurOnSubmit={false}
                      // autoFocus
                      defaultValue={education[index].year?.toString()}
                      // value={education[index].year?.toString()}
                      keyboardType={'number-pad'}
                      //style={{ fontSize: 16 }}
                      placeholder="Year"
                      placeholderTextColor={
                        Colors.input_placeholder_color[theme]
                      }
                    />
                  </View>
                </View>
              ))}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginVertical: 14,
                  marginHorizontal: 20,
                }}>
                <Text
                  style={{
                    marginRight: 'auto',
                    color: '#666',
                  }}>
                  Tap + to add Qualification
                </Text>
                {education.length > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      let bill = education;
                      bill.pop();
                      setEducation(bill);
                      setChanged(!Changed);
                    }}>
                    <FontAwesomeIcon
                      color={NEW_PRIMARY_BACKGROUND}
                      name="minus"
                      size={24}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    let bill = education;
                    bill.push({
                      degree: '',
                      university: '',
                      year: '',
                    });
                    setChanged(!Changed);
                    setEducation(bill);
                  }}
                  style={{ marginLeft: 18 }}>
                  <FontAwesomeIcon
                    color={NEW_PRIMARY_BACKGROUND}
                    name="plus"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>


          {/* <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('doctor.profile.education_qualifications')}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                selectedValue={degree}
                
                mode={'dropdown'}
                style={{
                  width: '100%',
                  color:
                    degree !== ''
                      ? Colors.primary_text_color[theme]
                      : '#8e9393',
                }}
                onValueChange={(itemValue, itemIndex) => setDegree(itemValue)}>
                <Picker.Item color={'#8e9393'} label="Degree" value="" />
                <Picker.Item label="MBBS" value="MBBS" />
                <Picker.Item label="BHMS" value="BHMS" />
                <Picker.Item label="DHMS" value="DHMS" />
                <Picker.Item label="B.V.Sc & AH" value="B.V.Sc & AH" />
                <Picker.Item label="D.Pharma" value="D.Pharma" />
                <Picker.Item label="BMLT" value="BMLT" />
                <Picker.Item label="BDS" value="BDS" />
                <Picker.Item label="BAMS" value="BAMS" />
                <Picker.Item label="MS" value="MS" />
              </Picker>
            </View>
            <View
              style={{
                paddingHorizontal: '7%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                onChangeText={(text) => {
                  setCollege(text);
                }}
                value={college}
                style={{fontSize: 16, color: Colors.primary_text_color[theme]}}
                placeholder="College/University"
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            </View>
            <View
              style={{
                paddingHorizontal: '6%',
              }}>
              <TextInput
                onChangeText={(itemValue, itemIndex) => {
                  const yearRegEX = /(?:(?:19|20)[0-9]{2})/;
                  const date = new RegExp(yearRegEX);
                  const valid = date.test(itemValue);
                  console.log(valid);
                  seterror({...error, year: valid});
                  setYearSelected(itemValue);
                }}
                value={year?.toString()}
                style={{fontSize: 16, color: Colors.primary_text_color[theme]}}
                keyboardType={'number-pad'}
                placeholder={`${Local("doctor.Profile.year")}`}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
              
            </View>
          </View> */}
          {/* {!error.year && (
            <AnimatedErrorText
              style={{width: '84%', alignSelf: 'center'}}
              text={'Year should be valid'}
            />
          )} */}
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('doctor.profile.registration_details')}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                onChangeText={(text) => {
                  setRegistrationNumber(text);
                }}
                value={registrationNumber}
                style={{
                  fontSize: 16,
                  marginLeft: '2%',
                  color: Colors.primary_text_color[theme],
                }}
                placeholder={`${Local("doctor.Profile.registration_no")}`}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            </View>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                onChangeText={(itemValue, itemIndex) =>
                  setRegistrationCouncil(itemValue)
                }
                value={registrationCouncil}
                style={{ fontSize: 16, color: Colors.primary_text_color[theme] }}
                // keyboardType={'number-pad'}
                placeholder={`${Local("doctor.Profile.registration_council")}`}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            </View>

            <View
              style={{
                paddingHorizontal: '6%',
              }}>
              <TextInput
                onChangeText={(itemValue, itemIndex) => {
                  const yearRegEX = /(?:(?:19|20)[0-9]{2})/;
                  const date = new RegExp(yearRegEX);
                  const valid = date.test(itemValue);
                  console.log(valid);
                  seterror({ ...error, registrationYear: valid });
                  setRegistrationYear(itemValue);
                }}
                value={registrationYear?.toString()}
                style={{ fontSize: 16, color: Colors.primary_text_color[theme] }}
                keyboardType={'number-pad'}
                placeholder={`${Local("doctor.Profile.registration_year")}`}
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            </View>
          </View>
          {!error.registrationYear && (
            <AnimatedErrorText
              style={{ width: '84%', alignSelf: 'center' }}
              text={'Registration year should be valid'}
            />
          )}
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('doctor.profile.payment')}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                onChangeText={(text) => {
                  setConsultationFee(text);
                }}
                value={ConsultationFee?.toString()}
                style={{
                  fontSize: 16,
                  marginLeft: '2%',
                  color: Colors.primary_text_color[theme],
                }}
                placeholder="Consultation fee"
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
            </View>

            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                // dropdownIconColor="red"
                /* itemStyle={{
                  backgroundColor: "#009387"
                }} */
                selectedValue={currency}
                mode={'dropdown'}
                style={{
                  width: '100%',
                  color:
                    currency !== ''
                      ? Colors.primary_text_color[theme]
                      : '#8e9393',
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setCurrency(itemValue);
                }}>
                <Picker.Item
                  color={'#8e9393'}
                  label="Select Currency"
                  value=""
                />
                {/* {console.log(currencyJson,"::::::::::")} */}
                {currencyJson.map((item, index) => {
                  // console.log(item.name, item.code, ":::::::::::::::")
                  return (
                    <Picker.Item
                      key={index}
                      label={item.name}
                      value={item.code}
                    />
                  );
                })}
                {/* <Picker.Item
                  label={`${Local('doctor.profile.strict')}`}
                  value="Strict"
                />
                <Picker.Item
                  label={`${Local('doctor.profile.moderate')}`}
                  value="Modarate"
                />
                <Picker.Item
                  label={`${Local('doctor.profile.flexible')}`}
                  value="Flexible"
                /> */}
              </Picker>
            </View>

            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                // dropdownIconColor="red"
                /* itemStyle={{
                  backgroundColor: "#009387"
                }} */
                selectedValue={cancelationPolicy}
                mode={'dropdown'}
                style={{
                  width: '100%',
                  color:
                    cancelationPolicy !== ''
                      ? Colors.primary_text_color[theme]
                      : '#8e9393',
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setcancelationPolicy(itemValue);
                }}>
                <Picker.Item color={'#8e9393'} label="Policy" value="" />
                <Picker.Item
                  label={`${Local('doctor.profile.strict')}`}
                  value="Strict"
                />
                <Picker.Item
                  label={`${Local('doctor.profile.moderate')}`}
                  value="Modarate"
                />
                <Picker.Item
                  label={`${Local('doctor.profile.flexible')}`}
                  value="Flexible"
                />
              </Picker>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('CancelationPolicy')}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  color: 'blue',
                  textAlign: 'right',
                  fontSize: 14,
                  color: Colors.primary_text_color[theme],
                  margin: 10,
                }}>
                {Local('doctor.profile.view_policy')}
              </Text>
            </TouchableOpacity>

            {/* <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TextInput placeholder="Add Payment"></TextInput>
              <TouchableOpacity>
                <Text style={{ fontSize: 18, color: '#8e9393' }}>+</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingHorizontal: '6%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TextInput placeholder="Add Schedule"></TextInput>
              <TouchableOpacity>
                <Text style={{ fontSize: 18, color: '#8e9393' }}>+</Text>
              </TouchableOpacity>
            </View>
          */}
          </View>

          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('doctor.profile.country_wise_fee')}
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                // paddingVertical: 12,
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              {Billing.map((value, index) => (
                // <ConsultationFields index={index} value={item} />
                <View>
                  {/* <StatusBar
        animated
        backgroundColor={Colors.secondary_background[theme]}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
      /> */}
                  <View
                    style={{
                      paddingHorizontal: '6%',
                      borderBottomWidth: 1,
                      borderColor: '#e0e0e0',
                    }}>
                    <Picker
                      selectedValue={value.country}
                      mode={'dropdown'}
                      style={{
                        width: '100%',
                        color: Colors.primary_text_color[theme],
                        backgroundColor: Colors.secondary_background[theme],
                      }}
                      // dropdownIconColor="rgba(40,250,40,30)"
                      /* itemStyle={{
            backgroundColor: "red"
          }} */

                      onValueChange={(itemValue, itemIndex) => {
                        let bill = Billing;
                        bill[index].country = itemValue;
                        setChanged(!Changed);
                        setBilling(bill);
                      }}>
                      <Picker.Item
                        color={'#8e9393'}
                        label="Select a country"
                        value=""
                      />
                      {countries.map((c, i) => (
                        <Picker.Item label={c.text} value={c.text} />
                      ))}
                    </Picker>
                  </View>
                  <View
                    style={{
                      paddingHorizontal: '7%',
                      borderBottomWidth: 1,
                      borderColor: '#e0e0e0',
                    }}>
                    <TextInput
                      onChangeText={(text) => {
                        // e.preventDefault()
                        let bill = Billing;
                        bill[index].fee = parseInt(text);
                        setBilling(bill);
                        // setChanged(!Changed);
                      }}
                      // keyboardShouldPersistTaps="always"
                      style={{
                        color: Colors.primary_text_color[theme],
                      }}
                      // onFocus={(e) => {
                      //   e.preventDefault()
                      // }}
                      // onBlur={() => {}}
                      // blurOnSubmit={false}
                      // autoFocus
                      //value={value.fee.toString()}
                      keyboardType={'number-pad'}
                      //style={{ fontSize: 16 }}
                      placeholder="Fees"
                      placeholderTextColor={
                        Colors.input_placeholder_color[theme]
                      }
                    />
                  </View>
                </View>
              ))}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginVertical: 14,
                  marginHorizontal: 20,
                }}>
                <Text
                  style={{
                    marginRight: 'auto',
                    color: '#666',
                  }}>
                  Tap + to add Country
                </Text>
                {Billing.length > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      let bill = Billing;
                      bill.pop();
                      setBilling(bill);
                      setChanged(!Changed);
                    }}>
                    <FontAwesomeIcon
                      color={NEW_PRIMARY_BACKGROUND}
                      name="minus"
                      size={24}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    let bill = Billing;
                    bill.push({
                      fee: '',
                      country: '',
                    });
                    setChanged(!Changed);
                    setBilling(bill);
                  }}
                  style={{ marginLeft: 18 }}>
                  <FontAwesomeIcon
                    color={NEW_PRIMARY_BACKGROUND}
                    name="plus"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>



          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('doctor.profile.Add Conditions')}
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                // paddingVertical: 12,
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              {conditions?.map((value, index) => (
                // <ConsultationFields index={index} value={item} />
                <View>
                  {/* <StatusBar
        animated
        backgroundColor={Colors.secondary_background[theme]}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
      /> */}
                  <View
                    style={{
                      paddingHorizontal: '7%',
                      borderBottomWidth: 1,
                      borderColor: '#e0e0e0',
                    }}>
                    <TextInput
                      onChangeText={(text) => {
                        // e.preventDefault()
                        let bill = conditions;
                        bill[index] = text;
                        setConditions(bill);
                        // setChanged(!Changed);
                      }}
                      // keyboardShouldPersistTaps="always"
                      style={{
                        color: Colors.primary_text_color[theme],
                      }}
                      // onFocus={(e) => {
                      //   e.preventDefault()
                      // }}
                      // onBlur={() => {}}
                      // blurOnSubmit={false}
                      // autoFocus
                      defaultValue={conditions[index]}
                      // value={conditions[index]}
                      // keyboardType={'number-pad'}
                      //style={{ fontSize: 16 }}
                      placeholder="Condition Name"
                      placeholderTextColor={
                        Colors.input_placeholder_color[theme]
                      }
                    />

                  </View>

                </View>
              ))}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginVertical: 14,
                  marginHorizontal: 20,
                }}>
                <Text
                  style={{
                    marginRight: 'auto',
                    color: '#666',
                  }}>
                  Tap + to add Condition
                </Text>
                {conditions?.length > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      let bill = conditions;
                      bill.pop();
                      setConditions(bill);
                      setChanged(!Changed);
                    }}>
                    <FontAwesomeIcon
                      color={NEW_PRIMARY_BACKGROUND}
                      name="minus"
                      size={24}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    let bill = conditions;
                    bill.push("");
                    setChanged(!Changed);
                    setConditions(bill);
                  }}
                  style={{ marginLeft: 18 }}>
                  <FontAwesomeIcon
                    color={NEW_PRIMARY_BACKGROUND}
                    name="plus"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('doctor.profile.Add Address')}
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                // paddingVertical: 12,
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              {address?.map((value, index) => (
                // <ConsultationFields index={index} value={item} />
                <View>
                  {/* <StatusBar
        animated
        backgroundColor={Colors.secondary_background[theme]}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
      /> */}
                  <View
                    style={{
                      paddingHorizontal: '7%',
                      borderBottomWidth: 1,
                      borderColor: '#e0e0e0',
                    }}>
                    <TextInput
                      onChangeText={(text) => {
                        // e.preventDefault()
                        let bill = address;
                        bill[index] = text;
                        setAddress(bill);
                        // setChanged(!Changed);
                      }}
                      // keyboardShouldPersistTaps="always"
                      style={{
                        color: Colors.primary_text_color[theme],
                      }}
                      // onFocus={(e) => {
                      //   e.preventDefault()
                      // }}
                      // onBlur={() => {}}
                      // blurOnSubmit={false}
                      // autoFocus
                      defaultValue={address[index]}
                      // value={conditions[index]}
                      // keyboardType={'number-pad'}
                      //style={{ fontSize: 16 }}
                      placeholder="Address"
                      placeholderTextColor={
                        Colors.input_placeholder_color[theme]
                      }
                    />

                  </View>

                </View>
              ))}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginVertical: 14,
                  marginHorizontal: 20,
                }}>
                <Text
                  style={{
                    marginRight: 'auto',
                    color: '#666',
                  }}>
                  Tap + to add another address
                </Text>
                {address?.length > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      let bill = address;
                      bill.pop();
                      setAddress(bill);
                      setChanged(!Changed);
                    }}>
                    <FontAwesomeIcon
                      color={NEW_PRIMARY_BACKGROUND}
                      name="minus"
                      size={24}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    let bill = address;
                    bill.push("");
                    setChanged(!Changed);
                    setAddress(bill);
                  }}
                  style={{ marginLeft: 18 }}>
                  <FontAwesomeIcon
                    color={NEW_PRIMARY_BACKGROUND}
                    name="plus"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('doctor.profile.Add Awards')}
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                // paddingVertical: 12,
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              {awards.map((value, index) => (
                <View>
                  {/* {console.log(value, "sfjsdlkfjsdlfkj")} */}
                  <View
                    style={{
                      paddingHorizontal: '7%',
                      borderBottomWidth: 1,
                      borderColor: '#e0e0e0',
                    }}>
                    <TextInput
                      onChangeText={(text) => {
                        // e.preventDefault()
                        let bill = awards;
                        bill[index].name = text;
                        setAwards(bill);
                        // setChanged(!Changed);
                      }}
                      // keyboardShouldPersistTaps="always"
                      style={{
                        color: Colors.primary_text_color[theme],
                      }}
                      // onFocus={(e) => {
                      //   e.preventDefault()
                      // }}
                      // onBlur={() => {}}
                      // blurOnSubmit={false}
                      // autoFocus
                      defaultValue={awards[index].name}
                      // value={awards[index].name}
                      // keyboardType={'number-pad'}
                      //style={{ fontSize: 16 }}
                      placeholder="Award Name"
                      placeholderTextColor={
                        Colors.input_placeholder_color[theme]
                      }
                    />

                  </View>
                  <View
                    style={{
                      paddingHorizontal: '7%',
                      borderBottomWidth: 1,
                      borderColor: '#e0e0e0',
                    }}>
                    {/* {console.log(awards)} */}
                    <TextInput
                      onChangeText={(text) => {
                        // e.preventDefault()
                        let bill = awards;
                        bill[index].year = parseInt(text);
                        setAwards(bill);
                        // setChanged(!Changed);
                      }}
                      // keyboardShouldPersistTaps="always"
                      style={{
                        color: Colors.primary_text_color[theme],
                      }}
                      // onFocus={(e) => {
                      //   e.preventDefault()
                      // }}
                      // onBlur={() => {}}
                      // blurOnSubmit={false}
                      // autoFocus
                      defaultValue={awards[index].year?.toString()}
                      // value={awards[index].year?.toString()}
                      keyboardType={'number-pad'}
                      //style={{ fontSize: 16 }}
                      placeholder="Year"
                      placeholderTextColor={
                        Colors.input_placeholder_color[theme]
                      }
                    />
                  </View>
                </View>
              ))}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginVertical: 14,
                  marginHorizontal: 20,
                }}>
                <Text
                  style={{
                    marginRight: 'auto',
                    color: '#666',
                  }}>
                  Tap + to add Award
                </Text>
                {awards.length > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      let bill = awards;
                      bill.pop();
                      setAwards(bill);
                      setChanged(!Changed);
                    }}>
                    <FontAwesomeIcon
                      color={NEW_PRIMARY_BACKGROUND}
                      name="minus"
                      size={24}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    let bill = awards;
                    bill.push({
                      name: '',
                      year: '',
                    });
                    setChanged(!Changed);
                    setAwards(bill);
                  }}
                  style={{ marginLeft: 18 }}>
                  <FontAwesomeIcon
                    color={NEW_PRIMARY_BACKGROUND}
                    name="plus"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              Consultation Type
              {/* {Local('doctor.profile.payment')} */}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                paddingHorizontal: '6%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <Picker
                // dropdownIconColor="red"
                /* itemStyle={{
                  backgroundColor: "#009387"
                }} */
                selectedValue={consultationType}
                mode={'dropdown'}
                style={{
                  width: '100%',
                  color:
                    consultationType !== ''
                      ? Colors.primary_text_color[theme]
                      : '#8e9393',
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setConsultationType(itemValue);
                }}>
                <Picker.Item
                  color={'#8e9393'}
                  label="Consultation Type"
                  value=""
                />
                <Picker.Item label={'Tele-consult'} value="Tele-consult" />
                <Picker.Item label={'In-person'} value="In-person" />
                <Picker.Item label={'Both'} value="Both" />
              </Picker>
            </View>
          </View>

          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('doctor.profile.practice')}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                paddingLeft: '5%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
                flexDirection: 'row',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                onChangeText={(text) => {
                  if (parseInt(text) < 0 || parseInt(text) > 99) {
                    seterror({ ...error, yearOfExperience: false });
                  } else {
                    seterror({ ...error, yearOfExperience: true });
                  }
                  setYearOfExperience(text);
                }}
                value={yearOfExperience}
                style={{
                  fontSize: 16,
                  marginLeft: '2%',
                  color: Colors.primary_text_color[theme],
                }}
                placeholder="Year of experience"
                placeholderTextColor={Colors.input_placeholder_color[theme]}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 'auto',
                  marginBottom: 'auto',
                  marginTop: 'auto',
                  marginRight: 20,
                }}>
                <TouchableOpacity onPress={handleDecrementExp}>
                  <FontAwesomeIcon
                    color={NEW_PRIMARY_BACKGROUND}
                    name="minus"
                    size={24}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleIncementExp}
                  style={{ marginLeft: 18 }}>
                  <FontAwesomeIcon
                    color={NEW_PRIMARY_BACKGROUND}
                    name="plus"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* <View
              style={{
                paddingHorizontal: '7%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TextInput
                onChangeText={(text) => {
                  setClinicAndHospital(text);
                }}
                value={clinicAndHospital}
                style={{ fontSize: 16 }}
                placeholder="Add Clinic/Hospital"></TextInput>
              <TouchableOpacity>
                <Text style={{ fontSize: 18, color: '#8e9393' }}>+</Text>
              </TouchableOpacity>
            </View> */}
          </View>
          {!error.yearOfExperience && (
            <AnimatedErrorText
              style={{ width: '84%', alignSelf: 'center' }}
              text={'Experience should be valid'}
            />
          )}

          <View
            style={{
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
              marginBottom: 10,
              paddingLeft: '4%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.primary_text_color[theme],
              }}>
              {Local('doctor.profile.follow_ups')}:
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              // backgroundColor: '#fcfcfc',
              backgroundColor: Colors.secondary_background[theme],
            }}>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: '8%',
                borderBottomWidth: 1,
                borderColor: '#e0e0e0',
              }}>
              <RadioGroupV2
                horizontal
                activeKey={followUps}
                setActiveKey={setFollowUps}
                Item={[
                  { value: `${Local('doctor.Profile.yes')}`, id: 'Yes' },
                  { value: `${Local('doctor.Profile.no')}`, id: 'No' },
                ]}
              />
            </View>

            {followUps === 'Yes' && (
              <View
                style={{
                  paddingHorizontal: '6%',
                  borderBottomWidth: 1,
                  borderColor: '#e0e0e0',
                }}>
                <TextInput
                  onChangeText={(itemValue, itemIndex) => {
                    setFollowUpsCount(itemValue);
                  }}
                  value={followUpsCount?.toString()}
                  style={{
                    fontSize: 16,
                    color: Colors.primary_text_color[theme],
                  }}
                  keyboardType={'number-pad'}
                  placeholder={`${Local('doctor.Profile.registration_year')}
                  `}
                  placeholderTextColor={Colors.input_placeholder_color[theme]}
                />
              </View>
            )}
          </View>

          <DmzButton
            onPress={handleSubmit}
            disabled={
              activeGender === '' ||
              specialitySelected === '' ||
              bio === '' ||
              // degree === '' ||
              // college === '' ||
              // year === '' ||
              registrationNumber === '' ||
              registrationCouncil === '' ||
              registrationYear === '' ||
              yearOfExperience === '' ||
              ConsultationFee == 0
            }
            style={{
              Text: {
                width: '100%',
                textAlign: 'center',
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              },
              Container: {
                width: 250,
                height: 46,
                borderRadius: 25,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                marginVertical: 20,
                elevation: 3,
              },
            }}
            text={`${Local("doctor.Settings.submit")}`}
          />
        </ScrollView>


        <Animated.View
          onLayout={onSignaturePopupLayoutChange}
          style={{
            width: '100%',
            height: '30%',
            backgroundColor: Colors.profile_popup_bg[theme],
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingVertical: '10%',
            paddingHorizontal: '10%',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: [
              {
                translateY: animateHeightOfPopup.interpolate({
                  inputRange: [0, 1],
                  outputRange: [signaturePopupHeight, 0],
                }),
              },
            ],
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: Colors.primary_text_color[theme],
            }}>
            {Local('doctor.Profile.upload_sign')}
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <TouchableOpacity
                onPress={onChooseGallery}
                style={{
                  backgroundColor: '#077EE9',
                  padding: '15%',
                  borderRadius: 100,
                }}>
                <FontAwesomeIcon name={'photo'} size={32} color={'#fff'} />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: '2%',
                  color: Colors.primary_text_color[theme],
                }}>
                {Local('doctor.Settings.gallery')}
              </Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1 }}>
              <TouchableOpacity
                onPress={onChooseCamera}
                style={{
                  backgroundColor: '#077EE9',
                  padding: '15%',
                  borderRadius: 100,
                }}>
                <FontAwesomeIcon name={'camera'} size={32} color={'#fff'} />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: '2%',
                  color: Colors.primary_text_color[theme],
                }}>
                {Local('doctor.Settings.camera')}
              </Text>
            </View>

            {/*           <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#077EE9',
                padding: '15%',
                borderRadius: 100,
              }}>
              <MaterialCommunityIcons
                name={'delete'}
                size={32}
                color={'#fff'}
              />
            </TouchableOpacity>
            <Text style={{ marginTop: '2%', color: Colors.primary_text_color[theme] }}>Remove</Text>
          </View> */}
          </View>
        </Animated.View>
        <Animated.View
          onLayout={onSignaturePopupLayoutChangeL}
          style={{
            width: '100%',
            height: '30%',
            backgroundColor: Colors.profile_popup_bg[theme],
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingVertical: '10%',
            paddingHorizontal: '10%',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: [
              {
                translateY: animateHeightOfPopupL.interpolate({
                  inputRange: [0, 1],
                  outputRange: [signaturePopupHeightL, 0],
                }),
              },
            ],
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: Colors.primary_text_color[theme],
            }}>
            {Local('doctor.Profile.Upload Letterhead Logo')}
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <TouchableOpacity
                onPress={onChooseGalleryL}
                style={{
                  backgroundColor: '#077EE9',
                  padding: '15%',
                  borderRadius: 100,
                }}>
                <FontAwesomeIcon name={'photo'} size={32} color={'#fff'} />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: '2%',
                  color: Colors.primary_text_color[theme],
                }}>
                {Local('doctor.Settings.gallery')}
              </Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1 }}>
              <TouchableOpacity
                onPress={onChooseCameraL}
                style={{
                  backgroundColor: '#077EE9',
                  padding: '15%',
                  borderRadius: 100,
                }}>
                <FontAwesomeIcon name={'camera'} size={32} color={'#fff'} />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: '2%',
                  color: Colors.primary_text_color[theme],
                }}>
                {Local('doctor.Settings.camera')}
              </Text>
            </View>

            {/*           <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#077EE9',
                padding: '15%',
                borderRadius: 100,
              }}>
              <MaterialCommunityIcons
                name={'delete'}
                size={32}
                color={'#fff'}
              />
            </TouchableOpacity>
            <Text style={{ marginTop: '2%', color: Colors.primary_text_color[theme] }}>Remove</Text>
          </View> */}
          </View>
        </Animated.View>
        <Animated.View
          onLayout={onSignaturePopupLayoutChangeV}
          style={{
            width: '100%',
            height: '30%',
            backgroundColor: Colors.profile_popup_bg[theme],
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingVertical: '10%',
            paddingHorizontal: '10%',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: [
              {
                translateY: animateHeightOfPopupV.interpolate({
                  inputRange: [0, 1],
                  outputRange: [signaturePopupHeightV, 0],
                }),
              },
            ],
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: Colors.primary_text_color[theme],
            }}>
            {Local('doctor.Profile.Upload Video')}
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <TouchableOpacity
                onPress={onChooseGalleryV}
                style={{
                  backgroundColor: '#077EE9',
                  padding: '15%',
                  borderRadius: 100,
                }}>
                <FontAwesomeIcon name={'photo'} size={32} color={'#fff'} />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: '2%',
                  color: Colors.primary_text_color[theme],
                }}>
                {Local('doctor.Settings.gallery')}
              </Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1 }}>
              <TouchableOpacity
                onPress={onChooseCameraV}
                style={{
                  backgroundColor: '#077EE9',
                  padding: '15%',
                  borderRadius: 100,
                }}>
                <FontAwesomeIcon name={'camera'} size={32} color={'#fff'} />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: '2%',
                  color: Colors.primary_text_color[theme],
                }}>
                {Local('doctor.Settings.camera')}
              </Text>
            </View>

            {/*           <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#077EE9',
                padding: '15%',
                borderRadius: 100,
              }}>
              <MaterialCommunityIcons
                name={'delete'}
                size={32}
                color={'#fff'}
              />
            </TouchableOpacity>
            <Text style={{ marginTop: '2%', color: Colors.primary_text_color[theme] }}>Remove</Text>
          </View> */}
          </View>
        </Animated.View>
      </View>
    </>
  );
}

const OnboardingStyle = StyleSheet.create({
  Container: {
    flex: 1,
    // backgroundColor: '#fff',
    height: '100%',
  },
  ScrollView: {
    flex: 1,
  },
});

export default Onboarding;
