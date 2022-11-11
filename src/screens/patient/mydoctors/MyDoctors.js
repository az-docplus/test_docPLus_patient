import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import { GREY_BACKGROUND } from '../../../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { GetRecentDoctor } from '../../../reduxV2/action/PatientAction';
import MyDoctorItem from '../../../components/molecules/MyDoctorItem/MyDoctorItem';
import { ListingWithThumbnailLoader } from '../../../components/atoms/Loader/Loader';
import LottieView from 'lottie-react-native';
import {
  NEW_PRIMARY_BACKGROUND,
  SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import {Local, setLocale} from '../../../i18n';
import {Colors} from '../../../styles/colorsV2';
// {Local("patient.my_profile.medical_history")}


const MyDoctors = ({ navigation }) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const {
    gettingRecentDoctors,
    recentDoctors,
    errorGettingRecentDoctors,
    patient,
  } = useSelector((state) => state.PatientReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    !gettingRecentDoctors && dispatch(GetRecentDoctor(patient._id));
  }, []);

  const [state, setState] = useState(recentDoctors);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setState(recentDoctors);
  }, [recentDoctors])

  const onEndEditing = (search) => {
    if (search === '') setState(recentDoctors)
    else {
      const c = recentDoctors.filter((p, id) => {
        if (
          p.doctor &&
          (`${p.doctor.firstName} ${p.doctor.lastName}`).toLowerCase().includes(search.toLowerCase())
          //  || (patient.lastName).toLowerCase().includes(search.toLowerCase())
        )
          return p
      })
      setState(c);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.secondary_background[theme] }}>
      <TopNavBar
        headerText={`${Local("patient.my_doctors.my_doctors")}`}
        onLeftButtonPress={() => navigation.navigate('PatientLandingScreen')}
        {...{ navigation }}
        style={{ Container: { paddingTop: 5, marginBottom: 10 } }}
      />
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

          style={{
            backgroundColor: Colors.search_background[theme],
            borderRadius: 10,
            elevation: 2,
          }}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: Colors.grey_background[theme] }}>
        {gettingRecentDoctors ? (
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
                  {Local("patient.my_doctors.no_doctors")}
										</Text>
                </View>
              }
              style={{ flex: 1, paddingHorizontal: '6%' }}
              renderItem={({ item }) => {
                if (item.doctor) return ((
                  <MyDoctorItem
                    data={{ canDoMessage: true }}
                    appointment={item.appointment}
                    doctor={item.doctor}
                    navigation={navigation}
                  />
                ))
              }}
            />
          )}
      </View>
    </View>
  );
};

export default MyDoctors;
