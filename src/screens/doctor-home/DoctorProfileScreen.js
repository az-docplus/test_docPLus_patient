import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import PicturelessAvatar from '../../components/atoms/PicturelessAvatar/PicturelessAvatar';
import {
  BuildIntoCardComponent,
  BuildIntroductionComponent,
  BuildPersonalInfoComponent,
  OverviewTabBlock,
} from '../../components/Components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomTextComponent from '../../components/CustomTextComponent';
import DoctorHeader from '../../components/DoctorHeader';
import { Colors } from '../../utils/Colors';
import AvailibilityTabComponent from './profile_component/AvailibilityTabComponent';
import {
  OverviewTabComponent,
  OverviewTabEducation,
  OverviewTabExperience,
  OverviewHospitalTab,
  OverviewTabSpecialtyComponent,
} from './profile_component/OverviewTabComponent';
import {
  PatientReviewCardComponent,
  PatientReviewsTitleComponent,
} from './profile_component/PatientReviewsTabComponent';
import {
  GetRecentPatient,
  GetHospitalsOfDoctor,
} from '../../reduxV2/action/DoctorAction';
import { GetReviews } from '../../reduxV2/action/AuthAction';
import { useSelector, useDispatch } from 'react-redux';
import ButtonCompo from '../../components/atoms2/button/button';
import { Host } from '../../utils/connection';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { windowWidth } from './../../utils/utils';
import moment from 'moment';
import { Local } from '../../i18n';
import QRCode from 'react-native-qrcode-svg';
import { GettingDoctorProfilesbySlug } from '../../reduxV2/action/DoctorToPatientAction';
const images = [
  require('../../assets/images/doc.jpg'),

  require('../../assets/images/doc_2.png'),
  require('../../assets/images/doc_3.jpg'),
];

export default function DoctorProfileScreen({ navigation, route }) {
  const [docData, setDocData] = useState({});
  const isFocused = useIsFocused();
  const { params } = route;
 console.log('========================>>>>>>>>>>>>>>>>>>>>.params?.slug', params);
  const type = params?.type;
  const dispatch = useDispatch();
  const { recentPatient } = useSelector((state) => state.DoctorReducer);
  // console.log('==================recentPatient', recentPatient.length);
  const [loading, setLoading] = useState(false);
  const [showOverviewTab, setShowOverviewTab] = useState(
    type === 'bookappointment' ? 'overview' : 'availibility',
  );
  const [Slot, setSlot] = useState(null);
  const [nextAvailableSlot, setNextAvailableSlot] = useState(null);
  const [AffiliatedHospitals, setAffiliatedHospitals] = useState([]);
  const [Reviews, setReviews] = useState([]);
  // console.log('========================>>>>>>>>>>>>>>>>>>>>.params?', params?);

   
  React.useEffect(() => {
    dispatch(GetRecentPatient(params?._id));
  }, [params?._id, dispatch]);

  const GetDoctorHospitals = (
    payload = {
      doctor: params?._id,
    },
  ) => {
    dispatch(
      GetHospitalsOfDoctor(payload, (err, response) => {
        console.log({ response });
        if (!err) setAffiliatedHospitals(response);
        // else console.log(response);
      }),
    );
  };

  React.useEffect(() => {
    GetDoctorHospitals();
    
    
  }, []);

  React.useEffect(() => {
   
    dispatch(
      GetReviews(params?._id, (result) => {
        setReviews(result);
        // console.log(result, 'LLLLLLFFFFFFFFFFFFFFFFFFFF');
      }),
    );
    // }, [data._id]);
  }, [params?._id, dispatch]);

  const name = params?.basic.name.split(' ');
  // console.log(type, '=====>>>>type');
  let education = '';
  let drInfo = '';
  if (params?.education) {
    params?.education.map((e, i) => (education += `${e.degree}, `));
    education.slice(0, education.length - 2);
  }
  if (params?.specialty || (params?.specialties && params?.specialties[0]))
    drInfo += params?.specialty || params?.specialties[0];
  if (education.length > 0 || (params?.specialties && params?.specialties[0]))
    drInfo += ' | ';
  if (education.length > 0) drInfo += education;

  console.log('======>>>>>coverPhoto', params?.picture);

  const img = params?.picture ? (
    params?.picture?.map((item) => (
      <Image
        source={{
          uri: `${Host}${item?.replace('public', '').replace('\\\\', '/')}`,
        }}
        resizeMode="cover"
        style={{ width: windowWidth, height: 250 }}
      />
    ))
  ) : (
    <PicturelessAvatar
      style={{
        color: '#000',
        backgroundColor: '#f9f9f9',
        height: 70,
        width: 70,
        borderRadius: 35,
      }}
      textStyle={{ fontSize: 32 }}
      text={`${name[0][0]}${name[1][0]}`}
    />
  );

  const availbaleTime = moment(Slot?.bookedFor).format('hh:mm A');
  const availbaleSlot = moment(Slot?.bookedFor).format('MM/DD/YYYY');

  const nowDate = moment().format('MM/DD/YYYY');
  const tomorrow = moment().add(1, 'day').format('MM/DD/YYYY');
  const nextAvailableSllot = moment(Slot?.bookedFor).format(
    'dddd, DD MMMM YYYY',
  );
  function TodayOrTomorrow() {
    if (availbaleSlot === nowDate) {
      return 'Today';
    }
    if (availbaleSlot === tomorrow) {
      return 'Tomorrow';
    }
    return nextAvailableSllot;
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 15,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-thin-left" color="black" size={27} />
        </TouchableOpacity>
        <Text
          style={{
            color: '#297281',
            fontSize: 23,

            fontFamily: 'Gilroy-SemiBold',
          }}>
          {`${Local('doctor.V2.DoctorProfileScreen.header')}`}
        </Text>
        {/* <Feather name="external-link" color="black" size={27} /> */}
        <View />
      </View>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ height: 10 }} />
        {/* <DoctorHeader showIcon={true} text="Doctor's Profile" /> */}
        <BuildIntroductionComponent
          setLoading={setLoading}
          _id={params?._id}
          image={img}
          doctor={params}
          name={`Dr. ${params?.basic.name}`}
          info={drInfo}
          location={`${params?.location || `${params?.city}, ${params?.state}`}`}
          imageLength={params?.picture.length}
          imageExceed={params?.picture.length > 1}
        />

        <BuildIntoCardComponent
          name={`Dr. ${params?.basic.name}`}
          info={drInfo}
        />

        <BuildPersonalInfoComponent
          text1={recentPatient?.length}
          image1={require('../../../assets/users.png')}
          text2={`${params?.experience ? params?.experience : '0'} Years`}
          image2={require('../../../src/assets/icons/path.png')}
          text3={params?.basic.rating ? params?.basic.rating : 'NA'}
          image3={require('../../../assets/star.png')}
        />
        <View style={{ height: 10 }} />

        {/* <Card style={{ elevation: 5, shadowColor: '#999', marginTop: 10, marginHorizontal: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <BuildTabCardComponent
                        showTab={showTab}
                        selectedVal="tab1"
                        onPress={() => { setShowTab("tab1"); setShowTimeTab("val1") }}
                        text="April"
                    />

                    <BuildTabCardComponent
                        showTab={showTab}
                        selectedVal="tab2"
                        onPress={() => { setShowTab("tab2"); setShowTimeTab("") }}
                        text="2021"
                    />

                    <CustomTextComponent
                        text={"₹ 500"} fs={20} fw={"normal"} textColor={Colors.BLUE2}
                    />
                </View>

                {showTab === "tab1"
                    ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <BuildTimeSlotsComponent
                            text1="Today"
                            text2="11 Slots"
                            selectedVal="val1"
                            showTimeTab={showTimeTab}
                            onPress={() => { setShowTimeTab("val1") }}
                        />

                        <BuildTimeSlotsComponent
                            text1="Tomorrow"
                            text2="40 Slots"
                            selectedVal="val2"
                            showTimeTab={showTimeTab}
                            onPress={() => { setShowTimeTab("val2") }}
                        />

                        <BuildTimeSlotsComponent
                            text1="10 May"
                            text2="No Slots"
                            selectedVal="val3"
                            showTimeTab={showTimeTab}
                            onPress={() => { setShowTimeTab("val3") }}
                        />
                    </View>
                    : <></>}

                {showTab === "tab2" ? <View style={styles.extraBlockStyle}>
                    <CustomTextComponent
                        text={"No data"} fs={20} fw={"normal"} textColor={Colors.BLACK90}
                    />
                </View> : <></>}

                {showTimeTab === "val1"
                    ? <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>
                        <BuildSlotsTabComponent
                            text="11:00 AM"
                            isSelected={true}
                            onPress={() => { }}
                        />

                        <BuildSlotsTabComponent
                            text="11:30 AM"
                            isSelected={false}
                            onPress={() => { }}
                        />

                        <BuildSlotsTabComponent
                            text="12:00 AM"
                            isSelected={false}
                            onPress={() => { }}
                        />
                    </View>
                    : <></>}

                {showTimeTab === "val2" ? <View style={styles.extraBlockStyle}>
                    <CustomTextComponent
                        text={"No Slots"} fs={20} fw={"normal"} textColor={Colors.BLACK90}
                    />
                </View> : <></>}

                {showTimeTab === "val3" ? <View style={styles.extraBlockStyle}>
                    <CustomTextComponent
                        text={"No Slots"} fs={20} fw={"normal"} textColor={Colors.BLACK90}
                    />
                </View> : <></>}
                <Text />
            </Card> */}
        {/* <Text /> */}

        <Card
          style={{
            elevation: 3,
            shadowColor: '#999',
            marginTop: 12,
            margin: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <OverviewTabBlock
              text={`${Local(
                'doctor.V2.DoctorProfileScreen.info_card.Titile.overview',
              )}`}
              width={Reviews.length > 0 ? 25 : 33}
              active={showOverviewTab === 'overview'}
              showTab={showOverviewTab}
              image={require('../../../assets/overview.png')}
              selectedVal="overview"
              onPress={() => {
                setShowOverviewTab('overview');
              }}
            />

            <OverviewTabBlock
              text={`${Local(
                'doctor.V2.DoctorProfileScreen.info_card.Titile.availibility',
              )}`}
              showTab={showOverviewTab}
              width={Reviews.length > 0 ? 25 : 33}
              image={require('../../../assets/availibility.png')}
              selectedVal="availibility"
              active={showOverviewTab === 'availibility'}
              onPress={() => {
                setShowOverviewTab('availibility');
              }}
            />

            <OverviewTabBlock
              text={`${Local(
                'doctor.V2.DoctorProfileScreen.info_card.Titile.fees',
              )}`}
              showTab={showOverviewTab}
              width={Reviews.length > 0 ? 25 : 33}
              image={require('../../../assets/fees.png')}
              active={showOverviewTab === 'fees'}
              selectedVal="fees"
              onPress={() => {
                setShowOverviewTab('fees');
              }}
            />

            {Reviews.length > 0 && (
              <OverviewTabBlock
                text="Reviews"
                showTab={showOverviewTab}
                width={Reviews.length > 0 ? 25 : 33}
                image={require('../../../assets/reviews.png')}
                selectedVal="reviews"
                active={showOverviewTab === 'reviews'}
                onPress={() => {
                  setShowOverviewTab('reviews');
                }}
              />
            )}
          </View>

          {showOverviewTab === 'overview' ? (
            <View style={{ padding: 16 }}>
              <OverviewTabComponent
                image={require('../../../assets/about.png')}
                title={`About Dr. ${params?.basic.name}`}
                info={`${params?.bio}`}
              />
              <View style={{ height: 24 }} />

              {AffiliatedHospitals.length > 0 && (
                <OverviewHospitalTab
                  image={require('../../../assets/hospitals.png')}
                  title={'Hospital Details'}
                  hospitals={AffiliatedHospitals}
                />
              )}

              <View style={{ height: 24 }} />
              <OverviewTabSpecialtyComponent
                image={require('../../../assets/specialize.png')}
                title={'Specializes In'}
                specialty={params?.specialty}
                specialties={params?.specialties}
              />
              <View style={{display:"flex", justifyContent:'center', alignItems:"center"}}>
                <View style={{marginVertical:50}}>
                <QRCode 

                logoSize={50}
                 logo={"https://play-lh.googleusercontent.com/3483VZPK9f0_noiUxNDR1bKta5D66tv641zMPOw1Sem7B5gr5SkSVwdFgDN1_oDmGQ"}
                  size={250}
                   value={`https://docplus.online/doctors/${params?.slug}`} />
                </View>
               
              </View>
              {/* <View style={{ height: 24 }} />

            <OverviewTabExperience
              image={require('../../../assets/experience.png')}
              title={'Experience'}
              year1={'Consultant'}
              year2={'Gynaec at Everything Gynaec'}
            /> */}

              <View style={{ height: 24 }} />
              {params?.education.length > 0 && (
                <OverviewTabEducation
                  image={require('../../../assets/education.png')}
                  title={'Education'}
                  education={params?.education}
                />
              )}
            </View>
          ) : (
            <></>
          )}

          {showOverviewTab === 'availibility' ? (
            <View style={{ paddingHorizontal: 8 }}>
              <AvailibilityTabComponent
                setSlot={(slot) => setSlot(slot)}
                setNextAvailableSlot={(next) => setNextAvailableSlot(next)}
                navigation={navigation}
                doctor={params}
                isFocused={isFocused}
              />
            </View>
          ) : (
            <></>
          )}

          {showOverviewTab === 'fees' ? (
            <Card
              style={{
                paddingHorizontal: 15,
                elevation: 5,
                shadowColor: '#999',
              }}>
              {/* <BuildFeesComponent
              title="In-Clinic Appointment"
              image={require('../../../assets/home-plus.png')}
              feesInDollar={'80.70'}
              feesInRupees={'1400'}
            /> */}
              <BuildFeesComponent
                title="Virtual Appointment"
                image={require('../../../assets/overview.png')}
                feesInDollar={'80.70'}
                feesInRupees={params?.fee || 'FREE'}
              />
              <Text />
            </Card>
          ) : (
            <></>
          )}

          {showOverviewTab === 'reviews' ? (
            <View style={{ paddingVertical: 16 }}>
              <PatientReviewsTitleComponent />

              <View
                style={{
                  backgroundColor: '#dcdcdc',
                  height: 1.4,
                  marginHorizontal: 22,
                }}
              />

              {Reviews.map((el) => (
                <PatientReviewCardComponent {...el} />
              ))}
              {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text />
              <TouchableOpacity>
                <Text
                  style={{
                    color: Colors.BLUE2,
                    fontSize: 18,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  See More
                </Text>
              </TouchableOpacity>
            </View> */}
              <View style={{ height: 6 }} />
            </View>
          ) : (
            <></>
          )}

          {/* {showTimeTab === "val1"
                    ? <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>
                        <BuildSlotsTabComponent
                            text="11:00 AM"
                            isSelected={true}
                            onPress={() => { }}
                        />

                        <BuildSlotsTabComponent
                            text="11:30 AM"
                            isSelected={false}
                            onPress={() => { }}
                        />

                        <BuildSlotsTabComponent
                            text="12:00 AM"
                            isSelected={false}
                            onPress={() => { }}
                        />
                    </View>
                    : <></>} */}
        </Card>

        <View style={{ height: 60 }} />
      </ScrollView>

      <LinearGradient
        colors={['#2D7D8E', '#246370']}
        // start={{ x: 0, y: 0 }}
        // end={{ x: 1, y: 0 }}
        style={{
          marginHorizontal: 20,
          // backgroundColor:
          //   (!modal && concernData.length > 0) || canSaveConcern
          //     ? '#2D7D8E'
          //     : '#789DA5',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 8,
          marginVertical: 10,
          elevation: 20,
        }}>
        <View>
          <Text
            style={{
              marginBottom: 5,
              color: '#FFFFFF',
              fontSize: 14,
              fontFamily: 'Gilroy-Medium',
            }}>
            {TodayOrTomorrow() === 'Today'
              ? nextAvailableSlot && nextAvailableSlot === availbaleTime
                ? `${Local(
                    'doctor.V2.DoctorProfileScreen.bottom_card.Next_available_slot',
                  )}`
                : `${Local(
                    'doctor.V2.DoctorProfileScreen.bottom_card.appointment_time',
                  )}`
              : `${Local(
                  'doctor.V2.DoctorProfileScreen.bottom_card.appointment_time',
                )}`}
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 'bold',
              fontFamily: 'Gilroy-SemiBold',
            }}>
            {availbaleTime}, {TodayOrTomorrow()}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (Slot)
              navigation.navigate('AppointmentDetails', {
                doctor: { ...params, img, educationDetails: education },
                Slot: Slot,
                nextSlot: nextAvailableSlot,
              });
            else setShowOverviewTab('availibility');
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                marginRight: 10,
                fontFamily: 'Gilroy-Bold',
              }}>
              {`${Local('doctor.V2.DoctorProfileScreen.bottom_card.book')}`}
            </Text>
            <AntDesign size={20} name="caretright" color="#FFFFFF" />
            {/* <Image
                source={require('../../../src/assets/icons/Polygon.png')}
                style={{ height: 20, width: 20, resizeMode: 'contain' }}
              /> */}
          </View>
        </TouchableOpacity>
      </LinearGradient>

      {/* <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          backgroundColor: '#2D7D8E',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 10,
          marginVertical: 5,
        }}> */}
      {/* <ButtonCompo
          title="Book Appointment"
          pressHandler={() => {
            if (Slot)
              navigation.navigate('DoctorProfileConfirmBooking', {
                doctor: { ...params?, image: img, educationDetails: education },
                Slot: Slot,
              });
            else setShowOverviewTab('availibility');
          }}
          textStyle={{
            fontSize: 14,
            fontFamily: 'Montserrat-SemiBold',
          }}
        /> */}
      {/* <View>
          <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Next Available</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' }}>
            Now
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (Slot)
              navigation.navigate('DoctorProfileConfirmBooking', {
                doctor: { ...params?, image: img, educationDetails: education },
                Slot: Slot,
              });
            else setShowOverviewTab('availibility');
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' }}>
              BOOK
            </Text>
            <Image
              source={require('../../../src/assets/icons/Polygon.png')}
              style={{ height: 20, width: 20, resizeMode: 'contain' }}
            />
          </View>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const BuildFeesComponent = ({ image, title, feesInDollar, feesInRupees }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <Card
        style={{
          elevation: 4,
          shadowColor: '#999',
          marginTop: 20,
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            paddingVertical: 10,
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 26,
                backgroundColor: '#eee',
                justifyContent: 'center',
                alignItems: 'center',
                height: 26,
                borderRadius: 200,
              }}>
              <Image
                source={image}
                style={{ width: 14, height: 14, tintColor: Colors.BLUE }}
              />
            </View>
            <Text
              style={{
                fontSize: 13,
                marginLeft: 6,
                fontFamily: 'Montserrat-Regular',
              }}>
              {title}
            </Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
            {/* <CustomTextComponent
              text={`Fees: $ ${feesInDollar}`}
              fs={12}
              fw={'300'}
              textColor={Colors.LIGHTGRAY}
            /> */}

            <CustomTextComponent
              text={`Fees: ₹ ${feesInRupees}`}
              fs={12}
              fw={'300'}
              textColor={Colors.LIGHTGRAY}
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  button_shadow: {
    flexDirection: 'row',
    shadowColor: '#999999',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    elevation: 4,
    borderRadius: 30,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  button_bookAppointment: {
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    elevation: 12,
    borderRadius: 30,
    backgroundColor: '#3893e4',
    paddingHorizontal: 32,
    paddingVertical: 18,
  },
});
