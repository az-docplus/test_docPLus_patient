import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, Share } from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import { GREY_BACKGROUND, NEW_PRIMARY_COLOR, SECONDARY_COLOR } from '../../../styles/colors';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import {Local, setLocale} from '../../../i18n';
import {Colors} from '../../../styles/colorsV2';

const Refferal = ({ navigation }) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const {
    patient
  } = useSelector((state) => state.PatientReducer);
  
  const dispatch = useDispatch();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Hi, I care for your health. Use my Referral Code ‘${patient.referralId}’ and get FLAT INR 200 off on Health Checks on your first order! Download the DocPlus app for good health. I did too :) Visit : https://mddocz.com/${patient.referralId}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.chat_bg[theme] }}>
      <TopNavBar
        headerText={`${Local("patient.refferal.refferal")}`}
        onLeftButtonPress={() => navigation.navigate('PatientLandingScreen')}
        {...{ navigation }}
        style={{ Container: { paddingTop: 5, marginBottom: 10 } }}
      />
      {/* <BottomSheet
        isVisible={isVisible}
        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
      >
        <ListItem key={10} containerStyle={{ paddingBottom: 0 }} onPress={handleCustomDates}>
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
                  placeholder="Select date"
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
                marginBottom: 'auto', fontFamily: 'Montserrat-Medium'
              }}>to</Text>
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
                  placeholder="Select date"
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
          <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet> */}
      {/* <View
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
          placeholderTextColor={SEARCH_PLACEHOLDER_COLOR}
          placeholder={'Search by name'}
          searchIcon={
            <Image
              source={require('../../../assets/icons/search.png')}
              style={{ height: 20, width: 18 }}
              color={SEARCH_PLACEHOLDER_COLOR}
            />
          }
          icon={
            <Image
              source={require('../../../assets/icons/configure.png')}
              style={{ height: 24, width: 24, marginLeft: 8 }}
            />
          }
          style={{
            backgroundColor: SECONDARY_BACKGROUND,
            borderRadius: 10,
            elevation: 2,
          }}
        />
      </View> */}

      <View style={{ flex: 1, backgroundColor: Colors.primary_background[theme], paddingHorizontal: '4%' }}>
        <MaterialCommunityIcons
          style={{ fontSize: 120, color: NEW_PRIMARY_COLOR, marginLeft: 'auto', marginRight: 'auto', marginTop: '22%' }}
          name="gift">
        </MaterialCommunityIcons>
        <Text style={{ fontSize: 22, fontFamily: 'Montserrat-Bold', textAlign: 'center', marginTop: '8%', color: Colors.primary_text_color[theme], }}>
        {Local("patient.refferal.invite_friends")}
        </Text>
        <Text style={{ fontSize: 18, fontFamily: 'Montserrat-Medium', textAlign: 'center', marginTop: '8%', color: Colors.primary_text_color[theme], }}>
        {Local("patient.refferal.reward")}
        </Text>
        <DmzButton
          //  isLoading={doctor.gettingSlots}
          onPress={onShare}
          style={{
            Text: {
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: 22,
              fontFamily: 'Montserrat-SemiBold',
            },
            Container: {
              width: '60%',
              height: 46,
              borderRadius: 25,
              paddingHorizontal: '16%',
              backgroundColor: SECONDARY_COLOR,
              alignSelf: 'center',
              elevation: 3,
              marginTop: '12%'
            },
          }}
          icon={
            <MaterialCommunityIcons
              style={{ fontSize: 28, color: 'white' }}
              name="share-variant">
            </MaterialCommunityIcons>
          }
          text={`${Local("patient.refferal.invite")}`}
        />
      </View>


    </View>
  );
};

export default Refferal;
