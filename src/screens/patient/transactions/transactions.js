import React, { useEffect, useState } from 'react';
import { View, FlatList, Text , Image} from 'react-native';
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
import { 
  // BottomSheet,
   ListItem
 } from 'react-native-elements'
import DatePicker from 'react-native-datepicker';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';
import { BottomSheet } from 'react-native-btr';


const Transactions = ({ navigation }) => {
  const {userData, theme} = useSelector((state) => state.AuthReducer);
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
    console.log(transactions, "??????????????????", state)
  }, [transactions])

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
      title: `${Local("patient.transactions.latest_first")}`,
      titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
      onPress: handleSortByDate,
    },
    {
      title: `${Local("patient.transactions.high_to_low")}`,
      titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
      onPress: handleSortByPrice
    },
    {
      title: `${Local("patient.transactions.reset")}`,
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
      title: `${Local("patient.transactions.cancel")}`,
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
        headerText="Transactions"
        onLeftButtonPress={() => navigation.navigate('PatientLandingScreen')}
        {...{ navigation }}
        style={{ Container: { paddingTop: 5, marginBottom: 10 } }}
      />
      <BottomSheet
        onBackButtonPress={() => setIsVisible(false)}
        visible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        // isVisible={isVisible}
        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
      >
        <ListItem key={10} containerStyle={{ paddingBottom: 0, backgroundColor: Colors.bottom_sheet_bg[theme] }} onPress={handleCustomDates}>
          <ListItem.Content style={{ padding: 0 }}>

            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: NEW_PRIMARY_BACKGROUND,
                  borderBottomWidth: 1.5,
                  marginBottom: 15,
                }}>
                <DatePicker
                  style={[
                    { borderBottomWidth: 0, marginBottom: 0 },
                  ]}
                  date={customDates.startDate}
                  mode="date"
                  placeholder={`${Local("patient.medical_history.select_date")}`}
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    // dateInput:{borderWidth: 0},
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36,
                      borderWidth: 0
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(text) => { setcustomDates({ ...customDates, startDate: text }) }}
                />
              </View>
              <Text style={{
                marginHorizontal: 12,
                fontSize: 20,
                marginTop: 'auto',
                marginBottom: 'auto', fontFamily: 'Montserrat-Medium', color: Colors.primary_text_color[theme]
              }}>{Local("patient.transactions.to")}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: NEW_PRIMARY_BACKGROUND,
                  borderBottomWidth: 1.5,
                  marginBottom: 15,
                }}>
                <DatePicker
                  style={[
                    { borderBottomWidth: 0, marginBottom: 0 },
                  ]}
                  date={customDates.endDate}
                  mode="date"
                  placeholder={`${Local("patient.medical_history.select_date")}`}
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    // dateInput:{borderWidth: 0},
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36,
                      borderWidth: 0
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(text) => { setcustomDates({ ...customDates, endDate: text }) }}
                />
              </View>

            </View>
          </ListItem.Content>
        </ListItem>

        {list.map((l, i) => (
          <ListItem key={i} containerStyle={[l.containerStyle, {backgroundColor: Colors.bottom_sheet_bg[theme]}]} onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title style={[l.titleStyle, {color: Colors.primary_text_color[theme]}]}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      <View
        style={{
          paddingVertical: '4%',
          alignItems: 'center',
          //      backgroundColor: GREY_BACKGROUND ,
          justifyContent: 'center',
        }}>
        <SearchBarSolid
          withIcon={true}
          handleBottomList={() => setIsVisible(true)}
          onEndEditing={onEndEditing}
          placeholderTextColor={Colors.search_placeholder_text[theme]}
          placeholder={`${Local("doctor.appointments.search_by_name")}`}
          searchIcon={
            <Image
              source={require('../../../assets/icons/search.png')}
              style={{ height: 20, width: 18 }}
              color={Colors.search_placeholder_text[theme]}
            />
          }
          icon={
            <Image
              source={require('../../../assets/icons/configure.png')}
              style={{ height: 24, width: 24, marginLeft: 8 }}
            />
          }
          style={{
            backgroundColor: Colors.search_background[theme],
            borderRadius: 10,
            elevation: 2,
          }}
        />
      </View>

      <View style={{ flex: 1, backgroundColor: Colors.grey_background[theme] }}>
        {gettingtransactions ? (
          <ListingWithThumbnailLoader />
        ) : (
            <FlatList
              keyExtractor={(item) => item._id}
              data={state}
              ListEmptyComponent={
                <View
                  style={{
                    height: 260,
                    width: '70%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    paddingBottom: "12%",
                    alignItems: 'center',
                    marginTop: '12%'
                  }}>

                  <LottieView
                    style={{ height: '100%', width: '100%' }}
                    source={require('../../../assets/anim_svg/empty_bottle.json')}
                    autoPlay
                    loop
                  />
                  <Text style={{ textAlign: "center", fontFamily: "Montserrat-Medium", fontSize: 20, color: Colors.primary_text_color[theme] }}>
                  {Local("patient.transactions.transactions")}
											</Text>
                </View>
              }
              style={{ flex: 1, padding: '6%' }}
              renderItem={({ item }) => {
                if (item.doctor) return ((
                  <TransactionList
                    data={item}
                  />
                ))
              }}
            />
          )}
      </View>
    </View>
  );
};

export default Transactions;
