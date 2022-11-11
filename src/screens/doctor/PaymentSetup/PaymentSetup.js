import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  BackHandler,
} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import RadioGroupVertical from '../../../components/molecules/RadioGroup/RadioGroupVertical';
import {Picker} from '@react-native-community/picker';
import {useSelector, useDispatch} from 'react-redux';
import {UpdateDoctorProfile} from '../../../reduxV2/action/DoctorAction';
import {INPUT_PLACEHOLDER, SECONDARY_COLOR} from '../../../styles/colors';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import {Colors} from '../../../styles/colorsV2';
import {colors} from 'react-native-elements';
import { Alert } from 'react-native';
import AnimatedErrorText from '../../../components/atoms/animatedErrorText/AnimatedErrorText';

export const BanksArray = [
  "ABHYUDAYA CO-OP BANK LTD",
  "ABU DHABI COMMERCIAL BANK",
  "AKOLA DISTRICT CENTRAL CO-OPERATIVE BANK",
  "AKOLA JANATA COMMERCIAL COOPERATIVE BANK",
  "ALLAHABAD BANK",
  "ALMORA URBAN CO-OPERATIVE BANK LTD.",
  "ANDHRA BANK",
  "ANDHRA PRAGATHI GRAMEENA BANK",
  "APNA SAHAKARI BANK LTD",
  "AUSTRALIA AND NEW ZEALAND BANKING GROUP LIMITED.",
  "AXIS BANK",
  "BANK INTERNASIONAL INDONESIA",
  "BANK OF AMERICA",
  "BANK OF BAHRAIN AND KUWAIT",
  "BANK OF BARODA",
  "BANK OF CEYLON",
  "BANK OF INDIA",
  "BANK OF MAHARASHTRA",
  "BANK OF TOKYO-MITSUBISHI UFJ LTD.",
  "BARCLAYS BANK PLC",
  "BASSEIN CATHOLIC CO-OP BANK LTD",
  "BHARATIYA MAHILA BANK LIMITED",
  "BNP PARIBAS",
  "CALYON BANK",
  "CANARA BANK",
  "CAPITAL LOCAL AREA BANK LTD.",
  "CATHOLIC SYRIAN BANK LTD.",
  "CENTRAL BANK OF INDIA",
  "CHINATRUST COMMERCIAL BANK",
  "CITIBANK NA",
  "CITIZENCREDIT CO-OPERATIVE BANK LTD",
  "CITY UNION BANK LTD",
  "COMMONWEALTH BANK OF AUSTRALIA",
  "CORPORATION BANK",
  "CREDIT SUISSE AG",
  "DBS BANK LTD",
  "DENA BANK",
  "DEUTSCHE BANK",
  "DEUTSCHE SECURITIES INDIA PRIVATE LIMITED",
  "DEVELOPMENT CREDIT BANK LIMITED",
  "DHANLAXMI BANK LTD",
  "DICGC",
  "DOMBIVLI NAGARI SAHAKARI BANK LIMITED",
  "FIRSTRAND BANK LIMITED",
  "GOPINATH PATIL PARSIK JANATA SAHAKARI BANK LTD",
  "GURGAON GRAMIN BANK",
  "HDFC BANK LTD",
  "HSBC",
  "ICICI BANK LTD",
  "IDBI BANK LTD",
  "IDRBT",
  "INDIAN BANK",
  "INDIAN OVERSEAS BANK",
  "INDUSIND BANK LTD",
  "INDUSTRIAL AND COMMERCIAL BANK OF CHINA LIMITED",
  "ING VYSYA BANK LTD",
  "JALGAON JANATA SAHKARI BANK LTD",
  "JANAKALYAN SAHAKARI BANK LTD",
  "JANASEVA SAHAKARI BANK (BORIVLI) LTD",
  "JANASEVA SAHAKARI BANK LTD. PUNE",
  "JANATA SAHAKARI BANK LTD (PUNE)",
  "JPMORGAN CHASE BANK N.A",
  "KALLAPPANNA AWADE ICH JANATA S BANK",
  "KAPOL CO OP BANK",
  "KARNATAKA BANK LTD",
  "KARNATAKA VIKAS GRAMEENA BANK",
  "KARUR VYSYA BANK",
  "KOTAK MAHINDRA BANK",
  "KURMANCHAL NAGAR SAHKARI BANK LTD",
  "MAHANAGAR CO-OP BANK LTD",
  "MAHARASHTRA STATE CO OPERATIVE BANK",
  "MASHREQBANK PSC",
  "MIZUHO CORPORATE BANK LTD",
  "MUMBAI DISTRICT CENTRAL CO-OP. BANK LTD.",
  "NAGPUR NAGRIK SAHAKARI BANK LTD",
  "NATIONAL AUSTRALIA BANK",
  "NEW INDIA CO-OPERATIVE BANK LTD.",
  "NKGSB CO-OP BANK LTD",
  "NORTH MALABAR GRAMIN BANK",
  "NUTAN NAGARIK SAHAKARI BANK LTD",
  "OMAN INTERNATIONAL BANK SAOG",
  "ORIENTAL BANK OF COMMERCE",
  "PARSIK JANATA SAHAKARI BANK LTD",
  "PRATHAMA BANK",
  "PRIME CO OPERATIVE BANK LTD",
  "PUNJAB AND MAHARASHTRA CO-OP BANK LTD.",
  "PUNJAB AND SIND BANK",
  "PUNJAB NATIONAL BANK",
  "RABOBANK INTERNATIONAL (CCRB)",
  "RAJGURUNAGAR SAHAKARI BANK LTD.",
  "RAJKOT NAGARIK SAHAKARI BANK LTD",
  "RESERVE BANK OF INDIA",
  "SBERBANK",
  "SHINHAN BANK",
  "SHRI CHHATRAPATI RAJARSHI SHAHU URBAN CO-OP BANK LTD",
  "SOCIETE GENERALE",
  "SOLAPUR JANATA SAHKARI BANK LTD.SOLAPUR",
  "SOUTH INDIAN BANK",
  "STANDARD CHARTERED BANK",
  "STATE BANK OF BIKANER AND JAIPUR",
  "STATE BANK OF HYDERABAD",
  "STATE BANK OF INDIA",
  "STATE BANK OF MAURITIUS LTD",
  "STATE BANK OF MYSORE",
  "STATE BANK OF PATIALA",
  "STATE BANK OF TRAVANCORE",
  "SUMITOMO MITSUI BANKING CORPORATION",
  "SYNDICATE BANK",
  "TAMILNAD MERCANTILE BANK LTD",
  "THANE BHARAT SAHAKARI BANK LTD",
  "THE A.P. MAHESH CO-OP URBAN BANK LTD.",
  "THE AHMEDABAD MERCANTILE CO-OPERATIVE BANK LTD.",
  "THE ANDHRA PRADESH STATE COOP BANK LTD",
  "THE BANK OF NOVA SCOTIA",
  "THE BANK OF RAJASTHAN LTD",
  "THE BHARAT CO-OPERATIVE BANK (MUMBAI) LTD",
  "THE COSMOS CO-OPERATIVE BANK LTD.",
  "THE DELHI STATE COOPERATIVE BANK LTD.",
  "THE FEDERAL BANK LTD",
  "THE GADCHIROLI DISTRICT CENTRAL COOPERATIVE BANK LTD",
  "THE GREATER BOMBAY CO-OP. BANK LTD",
  "THE GUJARAT STATE CO-OPERATIVE BANK LTD",
  "THE JALGAON PEOPLES CO-OP BANK",
  "THE JAMMU AND KASHMIR BANK LTD",
  "THE KALUPUR COMMERCIAL CO. OP. BANK LTD.",
  "THE KALYAN JANATA SAHAKARI BANK LTD.",
  "THE KANGRA CENTRAL CO-OPERATIVE BANK LTD",
  "THE KANGRA COOPERATIVE BANK LTD",
  "THE KARAD URBAN CO-OP BANK LTD",
  "THE KARNATAKA STATE APEX COOP. BANK LTD.",
  "THE LAKSHMI VILAS BANK LTD",
  "THE MEHSANA URBAN COOPERATIVE BANK LTD",
  "THE MUNICIPAL CO OPERATIVE BANK LTD MUMBAI",
  "THE NAINITAL BANK LIMITED",
  "THE NASIK MERCHANTS CO-OP BANK LTD. NASHIK",
  "THE RAJASTHAN STATE COOPERATIVE BANK LTD.",
  "THE RATNAKAR BANK LTD",
  "THE ROYAL BANK OF SCOTLAND N.V",
  "THE SAHEBRAO DESHMUKH CO-OP. BANK LTD.",
  "THE SARASWAT CO-OPERATIVE BANK LTD",
  "THE SEVA VIKAS CO-OPERATIVE BANK LTD (SVB)",
  "THE SHAMRAO VITHAL CO-OPERATIVE BANK LTD",
  "THE SURAT DISTRICT CO OPERATIVE BANK LTD.",
  "THE SURAT PEOPLES CO-OP BANK LTD",
  "THE SUTEX CO.OP. BANK LTD.",
  "THE TAMILNADU STATE APEX COOPERATIVE BANK LIMITED",
  "THE THANE DISTRICT CENTRAL CO-OP BANK LTD",
  "THE THANE JANATA SAHAKARI BANK LTD",
  "THE VARACHHA CO-OP. BANK LTD.",
  "THE VISHWESHWAR SAHAKARI BANK LTD. PUNE",
  "THE WEST BENGAL STATE COOPERATIVE BANK LTD",
  "TJSB SAHAKARI BANK LTD.",
  "TUMKUR GRAIN MERCHANTS COOPERATIVE BANK LTD.",
  "UBS AG",
  "UCO BANK",
  "UNION BANK OF INDIA",
  "UNITED BANK OF INDIA",
  "UNITED OVERSEAS BANK",
  "VASAI VIKAS SAHAKARI BANK LTD.",
  "VIJAYA BANK",
  "WEST BENGAL STATE COOPERATIVE BANK",
  "WESTPAC BANKING CORPORATION",
  "WOORI BANK",
  "YES BANK LTD",
  "ZILA SAHKARI BANK LTD GHAZIABAD",
  "IDFC First Bank"
];

function PaymentSetup({navigation}) {
  const [paymentOption, setPaymentOption] = useState(
    'Payment after consultation',
  );
  const [paymentMethod, setPaymentMethod] = useState('CFA');
  const [isSubmit, setIsSubmit] = useState(false)
  const [bank, setBank] = useState({
    name: '',
    number: '',
    IFSC: '',
    type: '',
    bankName: '',
  });
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const {updatingDoctor} = useSelector((state) => state.DoctorReducer);

  useEffect(() => {
    const backAction = () => {
      setIsSubmit(false)
      navigation.goBack()
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


  useEffect(() => {
    
    if (userData.charity) setPaymentOption('Donate time');
    else {
      if (userData.payment) setPaymentMethod('Payment before consultation');
      else setPaymentMethod('Payment after consultation');
    }
    if (userData.accountDetails) setBank(userData.accountDetails);
  }, [userData]);

  const dispatch = useDispatch();
  const [amountForSlots, setAmountForSlots] = useState([
    {
      id: String(Date.now()),
      duration: '15',
      amount: '',
    },
  ]);
  const AddTimeSlotsForAmount = () => {
    const slot = {
      id: String(Date.now()),
      duration: '15',
      amount: '',
    };

    setAmountForSlots([...amountForSlots, slot]);
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: Colors.secondary_background[theme]}}>
      <StatusBar
        animated
        backgroundColor={Colors.secondary_background[theme]}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
      />
      <TopNavBar headerText={'Payment'} 
       navigation={navigation}
      //  onLeftButtonPress={onBackPress}
       onLeftButtonPress={() => {
        setIsSubmit(false)
        navigation.goBack()
      }} />
      <Text
        style={{
          fontSize: 18,
          color: Colors.primary_text_color[theme],
          fontWeight: 'bold',
          marginLeft: '8%',
          marginTop: '5%',
        }}>
        Select Payment Option
      </Text>
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
        <RadioGroupVertical
          activeKey={paymentOption}
          setActiveKey={setPaymentOption}
          Item={[
            {
              value: 'Payment after consultation',
              id: 'Payment after consultation',
            },
            {
              value: 'Payment before consultation',
              id: 'Payment before consultation',
            },
            {value: 'Donate time ', id: 'Donate time'},
          ]}
        />
      </View>
      {/* {paymentOption === 'PAC' || paymentOption === 'PBC' ? (
        <>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: '8%',
              marginTop: '5%',
            }}>
            Select Payment Method
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e0e0e0',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: '#fcfcfc',
              marginTop: 20,
              paddingVertical: '5%',
              // paddingHorizontal: '5%',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                elevation: 5,
                borderRadius: 15,
                paddingHorizontal: '3%',
                paddingVertical: '2%',
                marginHorizontal: '5%',
              }}>
              <Picker
                selectedValue={paymentMethod}
                style={{width: '100%'}}
                onValueChange={(itemValue, itemIndex) =>
                  setPaymentMethod(itemValue)
                }>
                <Picker.Item label="Charge Fixed Amount" value="CFA" />
                <Picker.Item label="Charge Based on Time" value="CBOT" />
              </Picker>
            </View>
            {paymentMethod === 'CFA' ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: '7%',
                    marginHorizontal: '5%',
                  }}>
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 15,
                      backgroundColor: '#077EE9',
                      marginRight: '5%',
                      marginLeft: '-2%',
                    }}></View>
                  <Text style={{fontSize: 16}}>Regular Clinic Hours</Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#fff',
                    elevation: 5,
                    borderRadius: 15,
                    paddingHorizontal: '5%',
                    paddingVertical: '2%',
                    marginHorizontal: '5%',
                  }}>
                  <TextInput
                    placeholderTextColor={'#8e9393'}
                    style={{fontSize: 16}}
                    placeholder={'Enter Amount (₹)'}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: '7%',
                    marginHorizontal: '5%',
                  }}>
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 15,
                      backgroundColor: '#077EE9',
                      marginRight: '5%',
                      marginLeft: '-2%',
                    }}></View>
                  <Text style={{fontSize: 16}}>Weekends & Holidays</Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#fff',
                    elevation: 5,
                    borderRadius: 15,
                    paddingHorizontal: '5%',
                    paddingVertical: '2%',
                    marginHorizontal: '5%',
                  }}>
                  <TextInput
                    placeholderTextColor={'#8e9393'}
                    style={{fontSize: 16}}
                    placeholder={'Enter Amount (₹)'}
                  />
                </View>
              </>
            ) : (
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: '10%',
                    marginVertical: '8%',
                  }}>
                  Select Time Slot & Amount
                </Text>
                {amountForSlots.map((item) => {
                  return (
                    <TimeSlotAndAmount
                      key={item.id}
                      item={item}
                      amountForSlots={amountForSlots}
                      setAmountForSlots={setAmountForSlots}
                    />
                  );
                })}

                <TouchableOpacity onPress={AddTimeSlotsForAmount}>
                  <Text
                    style={{
                      color: '#7B7A79',
                      alignSelf: 'flex-end',
                      marginRight: '5%',
                      borderBottomColor: '#7B7A79',
                      paddingHorizontal: '1%',
                      borderBottomWidth: 2,
                    }}>
                    Add Time Slot
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>
      ) : null} */}
      <Text
        style={{
          fontSize: 18,
          color: Colors.primary_text_color[theme],
          fontWeight: 'bold',
          marginLeft: '8%',
          marginTop: '5%',
        }}>
        Add Bank Details
      </Text>
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
          paddingVertical: '5%',
          paddingHorizontal: '5%',
        }}>
        <View
          style={{
            // backgroundColor: '#fff',
            backgroundColor: Colors.secondary_background[theme],
            elevation: 3,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            paddingHorizontal: '3%',
            paddingVertical: '2%',
            marginVertical: '4%',
          }}>
          <Picker
            selectedValue={bank.type}
            style={{width: '100%', 
            color :Colors.primary_text_color[theme] 
          }}
            onValueChange={(itemValue, itemIndex) =>
              setBank({...bank, type: itemValue})
            }>
            <Picker.Item
              color={Colors.input_placeholder_color[theme]}
              label="Account Type"
              value=""
            />
            <Picker.Item 
            // color={Colors.input_placeholder_color[theme]}
             label="Saving Account" value="Saving" />
            <Picker.Item 
            // color={Colors.input_placeholder_color[theme]}
             label="Current Account" value="Current" />
          </Picker>
        </View>
        {!bank?.type && isSubmit && (
            <AnimatedErrorText
              style={{width: '84%', alignSelf: 'center'}}
              text={'Please select a valid account type'}
            />
          )}
        <View
          style={{
            // backgroundColor: '#fff',
            backgroundColor: Colors.secondary_background[theme],
            elevation: 3,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            paddingHorizontal: '5%',
            paddingVertical: '2%',
            marginVertical: '4%',
          }}>
          <TextInput
            value={bank.name}
            onChangeText={(text) => setBank({...bank, name: text})}
            placeholderTextColor={Colors.input_placeholder_color[theme]}
            style={{
              color: Colors.primary_text_color[theme],
            }}
            placeholder="Account Name"
          />
        </View>
        {!bank?.name && isSubmit && (
            <AnimatedErrorText
              style={{width: '84%', alignSelf: 'center'}}
              text={'Please enter a valid Account name'}
            />
          )}
        <View
          style={{
            // backgroundColor: '#fff',
            backgroundColor: Colors.secondary_background[theme],
            elevation: 3,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            paddingHorizontal: '5%',
            paddingVertical: '2%',
            marginVertical: '4%',
          }}>
          <TextInput
            value={bank.number}
            keyboardType={'number-pad'}
            onChangeText={(text) => setBank({...bank, number: text})}
            placeholderTextColor={Colors.input_placeholder_color[theme]}
            style={{
              color: Colors.primary_text_color[theme],
            }}
            placeholder="Account Number"
          />
        </View>
        {!bank?.number && isSubmit && (
            <AnimatedErrorText
              style={{width: '84%', alignSelf: 'center'}}
              text={'Please enter a valid account code'}
            />
          )}
        <View
          style={{
            // backgroundColor: '#fff',
            backgroundColor: Colors.secondary_background[theme],
            elevation: 3,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            paddingHorizontal: '3%',
            paddingVertical: '2%',
            marginVertical: '4%',
          }}>
          <Picker
            selectedValue={bank.bankName}
            style={{width: '100%', 
            color: Colors.primary_text_color[theme]
          }}
            onValueChange={(itemValue, itemIndex) =>
              setBank({...bank, bankName: itemValue})
            }>
            <Picker.Item
              color={Colors.input_placeholder_color[theme]}
              label="Bank Name"
              value=""
            />
            {
              BanksArray.map((item, index) => {
                return <Picker.Item label={item} value={item} />
              })
            }
            {/* <Picker.Item label="State bank of India" value="SBI" />
            <Picker.Item label="AXIS Bank" value="AXIS" />
            <Picker.Item label="ICICI Bank" value="ICICI" />
            <Picker.Item label="Punjab National Bank" value="PNB" /> */}
          </Picker>
        </View>
        {!bank?.bankName && isSubmit && (
            <AnimatedErrorText
              style={{width: '84%', alignSelf: 'center'}}
              text={'Please select a Bank'}
            />
          )}
        <View
          style={{
            // backgroundColor: '#fff',
            backgroundColor: Colors.secondary_background[theme],
            elevation: 3,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            paddingHorizontal: '3%',
            paddingVertical: '2%',
            marginVertical: '4%',
          }}>
          <TextInput
            value={bank.IFSC}
            onChangeText={(text) => setBank({...bank, IFSC: text})}
            placeholderTextColor={Colors.input_placeholder_color[theme]}
            style={{
              color: Colors.primary_text_color[theme],
            }}
            placeholder="IFSC"
          />
          {/* <Picker
            selectedValue={branchName}
            style={{ width: '100%' }}
            onValueChange={(itemValue, itemIndex) => setBranchName(itemValue)}>
            <Picker.Item color={'#7B7A79'} label="Branch" value="" />
            <Picker.Item label="Main Branch" value="MB" />
            <Picker.Item label="Sub Branch" value="SB" />
          </Picker> */}
        </View>
        {!bank?.IFSC && isSubmit && (
            <AnimatedErrorText
              style={{width: '84%', alignSelf: 'center'}}
              text={'Please enter a valid IFSC code'}
            />
          )}
      </View>
      <DmzButton
        disabled={
          false
          // bank.name == '' ||
          // bank.number === '' ||
          // bank.IFSC === '' ||
          // bank.type == '' ||
          // bank.bankName === ''
        }
        isLoading={updatingDoctor}
        onPress={() => {
          if (!bank.name ||
          !bank.number ||
          !bank.IFSC ||
          !bank.type ||
          !bank.bankName) {
            setIsSubmit(true)
            return
          }
          const obj = {
            accountDetails: {
              ...bank,
            },
            id: userData._id,
            charity: paymentOption === 'Donate time' ? true : false,
            payment:
              paymentOption === 'Payment after consultation' ||
              paymentOption === 'Donate time'
                ? false
                : true,
          };
          console.log(paymentOption);
          console.log(
            obj,
            '...............oooooooooooooooooooooooooo..........',
          );
          dispatch(UpdateDoctorProfile(obj, () => {
            setIsSubmit(false)
            Alert.alert("Update Success!", "Your Payment settings has been updated successfuly!")
          }));
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
            width: '72%',
            height: 46,
            borderRadius: 25,
            backgroundColor: SECONDARY_COLOR,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 20,
            elevation: 3,
          },
        }}
        text="UPDATE"
      />
    </ScrollView>
  );
}

export default PaymentSetup;

const TimeSlotAndAmount = ({item, amountForSlots, setAmountForSlots}) => {
  const setDuration = (duration) => {
    const slots = amountForSlots.filter((i) => i.id != item.id);
    const slot = {
      id: item.id,
      duration,
      amount: item.amount,
    };
    setAmountForSlots([...slots, slot]);
  };
  const setAmount = (amount) => {
    const slots = amountForSlots.filter((i) => i.id != item.id);
    const slot = {
      id: item.id,
      duration: item.duration,
      amount,
    };
    setAmountForSlots([...slots, slot]);
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingRight: '5%',
        }}>
        <View
          style={{
            height: 8,
            width: 8,
            borderRadius: 15,
            backgroundColor: '#077EE9',
            marginHorizontal: '3%',
          }}></View>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 5,
            borderRadius: 15,
            paddingHorizontal: '5%',
            paddingVertical: '2%',
            flex: 1,
          }}>
          <Picker
            selectedValue={item.duration}
            style={{width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setDuration(itemValue)}>
            <Picker.Item color={'#8e9393'} label="Duration" value="" />
            <Picker.Item label="15 minutes" value="15" />
            <Picker.Item label="30 minutes" value="30" />
            <Picker.Item label="45 minutes" value="45" />
          </Picker>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          elevation: 5,
          borderRadius: 15,
          paddingHorizontal: '5%',
          paddingVertical: '2%',
          marginVertical: '5%',
          marginRight: '5%',
          marginLeft: '8%',
          flex: 1,
        }}>
        <TextInput
          onChangeText={(text) => {
            setAmount(text);
          }}
          placeholderTextColor={'#8e9393'}
          style={{fontSize: 16}}
          placeholder={'Enter Amount (₹)'}
        />
      </View>
    </>
  );
};
