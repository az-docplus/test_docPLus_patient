import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, ScrollView, BackHandler } from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import { GREY_BACKGROUND } from '../../../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { GetRecentDoctor, GetTransactions } from '../../../reduxV2/action/PatientAction';
import TransactionList from '../../../components/molecules/Transactions/transactionsList';
import { ListingWithThumbnailLoader } from '../../../components/atoms/Loader/Loader';
import LottieView from 'lottie-react-native';
import {
  SUCCESS,
  NEW_PRIMARY_BACKGROUND,
  SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import { BottomSheet, ListItem } from 'react-native-elements'
import DatePicker from 'react-native-datepicker';
import { Colors } from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';


const Transactions = ({ navigation }) => {
  const { theme } = useSelector((state) => state.AuthReducer);
  const {
    transactions,
    patient
  } = useSelector((state) => state.PatientReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetTransactions(patient._id, startLoading, stopLoading));
  }, []);
  const [gettingtransactions, setGettingTransactions] = useState(false)

  const startLoading = () => {
    setGettingTransactions(true)
  }

  const stopLoading = () => {
    setGettingTransactions(false)
  }
  const [state, setState] = useState(transactions);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setState(transactions);
  }, [transactions])

  useEffect(() => {
    const backAction = () => {
      // navigation.goBack()
      navigation.navigate('onboarding')
      // setState(doctors);
      // setActive("allDoctors")

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const onEndEditing = (search) => {
    if (search === '') setState(transactions)
    else {
      const c = transactions.filter((p, id) => {
        if (
          p.doctor &&
          (p.doctor.firstName + " " + p.doctor.lastName).toLowerCase().includes(search.toLowerCase())
          //  || (patient.lastName).toLowerCase().includes(search.toLowerCase())
        )
          return p
      })
      setState(c);
    }
  };

  const handleSortByDate = () => {
    const sortedStaff = transactions.sort((b, a) => new Date(a.createdDate) - new Date(b.createdDate))
    setState(sortedStaff)
    setIsVisible(false)
  }

  const handleSortByPrice = () => {
    const sortedStaff = transactions.sort((b, a) => a.amount - b.amount)
    setState(sortedStaff)
    setIsVisible(false)
  }

  const list = [
    {
      title: 'Latest first',
      titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
      onPress: handleSortByDate,
    },
    {
      title: 'High to low',
      titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
      onPress: handleSortByPrice
    },
    {
      title: 'Reset',
      titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
      onPress: () => {
        setIsVisible(false);
        setcustomDates({
          startDate: '',
          endDate: ''
        })
        setState(transactions)
      },
    },
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: SECONDARY_BACKGROUND },
      titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
      onPress: () => setIsVisible(false),
    },
  ];

  const handleCustomDates = () => {
    if (customDates.startDate !== '' && customDates.endDate !== '') {
      const c = transactions.filter((p, id) => {
        if (
          new Date(p.createdDate).getTime() > new Date(customDates.startDate).getTime() &&
          new Date(p.createdDate).getTime() < new Date(customDates.endDate).getTime()
        )
          return p
      })
      setcustomDates({
        startDate: '',
        endDate: ''
      })
      setState(c);
      setIsVisible(false);
    }
  }

  const [customDates, setcustomDates] = useState({
    startDate: '',
    endDate: ''
  })

  useEffect(() => {
    handleCustomDates()
  }, [customDates])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.secondary_background[theme] }}>
      <TopNavBar
        headerText={`${Local("doctor.view_policy.cancellation_policy")}`}
        onLeftButtonPress={() => navigation.navigate('onboarding')}
        {...{ navigation }}
        style={{ Container: { paddingTop: 5, marginBottom: 10 } }}
      />
      <ScrollView style={{ flex: 1, paddingHorizontal: '4%', }}>
        <Text style={{ fontFamily: 'Montserrat-Medium', textDecorationLine: 'underline', fontSize: 18, marginTop: '4%', color: Colors.primary_text_color[theme] }}>
        {Local("doctor.profile.flexible")}:
        </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 16, marginTop: '4%', color: Colors.primary_text_color[theme] }}>
        {Local("doctor.view_policy.flexible_para")}
        </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', textDecorationLine: 'underline', fontSize: 18, marginTop: '4%', color: Colors.primary_text_color[theme] }}>
        {Local("doctor.profile.moderate")}:
        </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 16, marginTop: '4%', color: Colors.primary_text_color[theme] }}>
        {Local("doctor.view_policy.moderate_para")}
        </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', textDecorationLine: 'underline', fontSize: 18, marginTop: '8%', color: Colors.primary_text_color[theme] }}>
        {Local("doctor.profile.strict")}:
        </Text>
        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 16, marginTop: '4%', color: Colors.primary_text_color[theme] }}>
        {Local("doctor.view_policy.strict_para")}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Transactions;
