/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  // Image,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { GetQuestion } from '../../../reduxV2/action/QuestionnaireAction';
import AnimInput from '../../../components/molecules/AnimInput/AnimInput';
import RadioGroup from '../../../components/molecules/RadioGroup/RadioGroup';
// import RadioBtn from '../../../components/atoms/RadioBtn/RadioBtn';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
// import RadialGradient from 'react-native-radial-gradient';
import StepsTracker from '../../../components/atoms/StepsTracker/StepsTracker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRef } from 'react';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import ConfirmAppointmentModel from '../../../components/molecules/Modal/ConfirmAppointmentModel';
import LottieView from 'lottie-react-native';
import { Local, setLocale } from '../../../i18n';

import RazorpayCheckout from 'react-native-razorpay';
import {
  bookAppointment,
  AddTransactions,
  // GetAppointments,
} from '../../../reduxV2/action/PatientAction';
import { Colors } from '../../../styles/colorsV2';
import { socket } from '../../../utils/socket';
import BlurSpinner from '../../../components/molecules/Modal/BlurLoadingOverlay';
import { NEW_PRIMARY_BACKGROUND } from '../../../styles/colors';

function QuestionnairePP({ navigation, route }) {
  const Socket = useRef(socket).current;
  console.log(navigation.goBack)
  const { theme } = useSelector((state) => state.AuthReducer);
  const {
    gettingQuestionnaire,
    questions,
    // errorGettingQuestionnaire,
  } = useSelector((state) => state.QuestionnaireReducer);
  const [loading, setLoading] = useState(false);

  const { doctorData, appointmentBookingData } = route.params;

  const { appointments } = useSelector((state) => state.PatientReducer);
  const { userData } = useSelector((state) => state.AuthReducer);
  const [QandA, setQandA] = useState([]);
  const { _id } = doctorData;
  const dispatch = useDispatch();
  // const [localQuestion, setLocalQuestion] = useState([]);
  // const [questionCurrentId, setQuestionCurrentId] = useState('');
  const [showConfirmModel, setShowConfirmModel] = useState(false);

  useEffect(() => {
    // !gettingQuestionnaire && dispatch(GetQuestion(_id));
    dispatch(GetQuestion(_id));
    // dispatch(GetAppointments(userData._id))
  }, []);
  console.log('===========>>>>>>>>>>>>>>>>>>questions', doctorData._id);
  useEffect(() => {
    const _qandA = [];
    questions.map((q) => {
      _qandA.push({ question: q.title, answer: '' });
      q.option.map((o) => {
        o.linkedQuestion.map((l) =>
          _qandA.push({ question: l.title, answer: '' }),
        );
      });
    });
    setQandA(_qandA);
  }, [questions]);

  const onFinish = () => {
    setShowConfirmModel(true);
  };

  const isFollowUpAvaiable = () => {
    if (
      !doctorData.followUps ||
      appointments.length == 0 ||
      doctorData.followUps == 0
    )
      return false;

    const recentAppointments = appointments.filter((item) => {
      if (
        item.patient &&
        item.doctor &&
        item.patient._id === userData._id &&
        item.doctor._id === doctorData._id &&
        item.bookedOn
      )
        return item;
    });
    recentAppointments.sort(
      (b, a) => new Date(a.bookedOn).getTime() - new Date(b.bookedOn).getTime(),
    );
    recentAppointments.reverse();
    const IndexOf_last_paid_appointment = recentAppointments
      .map((x) => {
        return x.paid;
      })
      .indexOf(true);
    if (IndexOf_last_paid_appointment < doctorData.followUps) return true;

    return false;
  };

  const onYesConfirmModel = () => {
    setShowConfirmModel(false);
    const _isFollowUpAvaiable = isFollowUpAvaiable();
    console.log({ _isFollowUpAvaiable });
    // if (doctorData.payment && !_isFollowUpAvaiable) {
    //   var options = {
    //     key: 'rzp_test_hRsc7oAQ82vplt',
    //     amount: appointmentBookingData.fee
    //       ? parseInt(appointmentBookingData.fee) * 100
    //       : 500 * 100, //for rupees-paise conversion
    //     currency: 'INR',
    //     name: 'DocPlus', // company or merchant name
    //     description: 'Consultation fees',
    //     image: 'https://i.imgur.com/3g7nmJC.png',
    //     // order_id: 'order_DslnoIgkIDL8Zt',
    //     prefill: {
    //       email: userData.email,
    //       contact: userData.phone,
    //       name: `${userData.firstName} ${userData.lastName}`,
    //     },
    //     theme: {color: '#43A2A2'},
    //   };
    //   RazorpayCheckout.open(options)
    //     .then((response) => {
    //       // setLoading(true)
    //       // handle success
    //       console.log(
    //         response,
    //         `response______________________________________________________
    //     ========================================================`,
    //       );
    //       dispatch(
    //         bookAppointment(
    //           {
    //             ...appointmentBookingData,
    //             paid: true,
    //             razorpayPaymentId: response.razorpay_payment_id,
    //             // razorpayOrderId: response.razorpay_order_id,
    //             // razorpaySignature: response.razorpay_signature,
    //             amount: appointmentBookingData.fee,
    //             patientInfo: JSON.stringify({
    //               ...appointmentBookingData.patientInfo,
    //               QandA,
    //             }),
    //           },
    //           () => {
    //             dispatch(
    //               AddTransactions({
    //                 id: userData._id,
    //                 amount: appointmentBookingData.fee,
    //                 reason: appointmentBookingData.reasonForVisit,
    //                 date: new Date(),
    //                 doctor: appointmentBookingData.doctor,
    //               }),
    //             );
    //             //add empty convo
    //             Socket.current.emit('add_empty_convo', {
    //               from: userData._id,
    //               to: appointmentBookingData.doctor._id,
    //               message: '',
    //               toType: 'doctor',
    //               fromType: 'patient',
    //             });
    //             // navigation.navigate('Appointments');
    //           },
    //           // (id) => navigation.navigate('invoice', {id}),
    //           (id) => {
    //             setLoading(false);
    //             navigation.navigate('AppointmentsHome');
    //           },
    //         ),
    //       );
    //     })
    //     .catch((error) => {
    //       // handle failure
    //       setLoading(false);
    //       console.log('error:', error);
    //     });
    // } else {
    //   dispatch(
    //     bookAppointment(
    //       {
    //         ...appointmentBookingData,
    //         amount: '0',
    //         fee: '0',
    //         patientInfo: JSON.stringify({
    //           ...appointmentBookingData.patientInfo,
    //           QandA,
    //         }),
    //       },
    //       () => {
    //         dispatch(
    //           AddTransactions({
    //             id: userData._id,
    //             amount: appointmentBookingData.fee,
    //             reason: appointmentBookingData.reasonForVisit,
    //             date: new Date(),
    //             doctor: appointmentBookingData.doctor,
    //           }),
    //         );
    //         navigation.navigate('Appointments');
    //       },
    //     ),
    //   );
    // }
    navigation.navigate('Payments', {
      appointmentBookingData,
      _isFollowUpAvaiable,
      doctorDataPayment: doctorData.payment,
      QandA,
      currency: doctorData?.currency,
      deviceToken: doctorData?.deviceToken,
      payment: doctorData?.payment
    });
  };

  return (
    <View
      style={{
        backgroundColor: Colors.secondary_background[theme],
      }}>
      {loading && (
        <BlurSpinner visible={true}>
          <ActivityIndicator color={NEW_PRIMARY_BACKGROUND} size="large" />
        </BlurSpinner>
      )}
      <StatusBar
        animated
        backgroundColor={Colors.secondary_background[theme]}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
      />
      <ConfirmAppointmentModel
        data={{
          // payment: true
          payment: doctorData?.payment
        }}
        visible={showConfirmModel}
        onNo={() => { 
          setShowConfirmModel(false);
        }}
        onYes={onYesConfirmModel}
      />
      <TopNavBar navigation={navigation} headerText={'Questionnaire'} />
      <View
        style={{
          backgroundColor: Colors.secondary_background[theme],
          height: 150,
          width: '100%',
          flexDirection: 'row',
          paddingRight: '10%',
          justifyContent: 'space-between',
          paddingTop: 25,
          // paddingBottom: 100
        }}>
        <View
          style={{
            width: '45%',
            backgroundColor: Colors.secondary_background[theme],
          }}>
          <DmzButton
            onPress={() => {
              setShowConfirmModel(true);
              //navigation.navigate('Payments', { appointmentBookingData });
            }}
            style={{
              Container: {
                marginTop: 25,
                elevation: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
                backgroundColor: questions.length === 0 ? '#077EE9' : '#d6d6d6',
                paddingHorizontal: '8%',
                width: '100%',
              },
              Text: {
                fontFamily: 'Montserrat-Medium',
                color: questions.length === 0 ? '#fff' : '#4f4f4f',
              },
            }}
            text={'Skip Questionnaire'}
          />
        </View>
      </View>
      {gettingQuestionnaire && (
        <ActivityIndicator size={40} color={'#43A2A2'} />
      )}
      {questions.length === 0 ? (
        <View
          style={{
            height: 200,
            width: '70%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 350,
            backgroundColor: Colors.secondary_background[theme],
          }}>
          <LottieView
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: Colors.secondary_background[theme],
            }}
            source={require('../../../assets/anim_svg/empty_bottle.json')}
            autoPlay
            loop
          />
          <Text
            style={{
              textAlign: 'center',
              color: Colors.primary_text_color[theme],
              // marginBottom: "100%"
            }}>
            {Local('doctor.AddQuestionnaire.AddCategory.no_question_asked')}
            {'\n'}
            {Local('doctor.AddQuestionnaire.AddCategory.you_can_skip')}
          </Text>
        </View>
      ) : (
        <View
          style={
            {
              paddingBottom: 300
            }
          }>
          <QuestionController
            QandA={QandA}
            setQandA={setQandA}
            questions={questions}
            onFinish={onFinish}
          />
        </View>
      )}
    </View>
  );
}

export default QuestionnairePP;

const QuestionController = ({
  questions,
  nested,
  QandA,
  setQandA,
  nextQuestionParent,
  onFinish,
}) => {
  const { theme } = useSelector((state) => state.AuthReducer);
  const [count, setCount] = useState(0);
  const [root, setRoot] = useState(true);
  const ScrollRef = useRef(null);

  useEffect(() => {
    const root = questions.every((item) => item.root);
    setRoot(root);
  }, [questions, count]);

  const nextQuestion = () => {
    if (count < questions.length - 1) {
      // const root = questions.every((item) => item.root);
      setCount(count + 1);
    }
    if (count === questions.length - 1 && nested) {
      nextQuestionParent();
      setCount(count + 1);
    }
    if (count === questions.length - 1 && !nested) {
      onFinish();
    }
  };
  // const onContinue = () => {
  //   if (count < questions.length - 1) {
  //     setCount(count + 1);
  //   }
  //   if (count === questions.length - 1) {
  //     alert('answers submited');
  //   }
  // };
  const mode = [];
  for (let i = 0; i < questions.length; i++) {
    mode.push(100 / (questions.length - i));
  }

  return (
    <View
      style={{
        backgroundColor: Colors.secondary_background[theme],
        // paddingBottom: 25,
      }}>
      <ScrollView
        contentContainerStyle={
          {
            // paddingBottom: 100,
          }
        }
        ref={ScrollRef}
        onContentSizeChange={() => {
          ScrollRef.current.scrollToEnd({ animated: true });
        }}>
        <QuestionViewer
          onChange={(text, question) => {
            const index = QandA.map((x) => {
              return x.question;
            }).indexOf(question);
            let _qandA = QandA;
            _qandA[index].answer = text;
            setQandA(_qandA);
          }}
          QandA={QandA}
          setQandA={setQandA}
          question={questions[count]}
          nextQuestion={nextQuestion}
        />
      </ScrollView>
      <View style={{ marginBottom: '0%' }}>
        {root && (
          <TouchableOpacity
            style={{
              backgroundColor: '#919191',
              elevation: 0,
              alignSelf: 'center',
              borderRadius: 15,
              alignSelf: 'flex-end',
              marginRight: '10%',
              marginTop: 10,
              paddingVertical: '3%',
              paddingHorizontal: '6%',
            }}
            onPress={nextQuestion}>
            <Text
              style={{
                color: '#f8f7ff',
                fontFamily: 'Montserrat-Medium',

                fontSize: 16,
              }}>
              {/* {count + 1 == questions.length ? 'Next' : 'Skip'} */}
              {Local('doctor.AddQuestionnaire.AddCategory.next')}
            </Text>
          </TouchableOpacity>
        )}
        {root && (
          <StepsTracker
            incompletedColor={'#fff'}
            completedColor={'#9C77BC'}
            text={`Question ${count + 1} of ${questions.length}`}
            completed={((count + 1) / questions.length) * 100}
            textStyle={{ fontSize: 20, fontWeight: 'bold', color: '#9C77BC' }}
            mode={mode}
          />
        )}
      </View>
    </View>
  );
};
const QuestionViewer = ({
  question,
  nextQuestion,
  onChange,
  QandA,
  setQandA,
}) => {
  const [currentOptionId, setCurrentOptionId] = useState('');
  const [filteredLinkedQuestion, setFilteredLinkedQuestion] = useState([]);
  const { theme } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    setFilteredLinkedQuestion([]);
    ///deal with state,,
    //state is getting persist that's why the previous question is remains on there
  }, []);

  useEffect(() => {
    setFilteredLinkedQuestion([]);
  }, [question]);

  const onSetCurrentOptionId = (id) => {
    console.log(id);
    // onChange(id)
    setCurrentOptionId(id);
    const OptionQues = question.option.find((item) => item._id === id);
    onChange(OptionQues.text, question.title);
    setFilteredLinkedQuestion(OptionQues.linkedQuestion);
    if (OptionQues.linkedQuestion.length === 0) {
      nextQuestion();
    }
  };

  // console.log('&&&&&&&&&@@@@@@@@@@&&&&&&&&&&&&&&&@@@@@@@@@@@@@@@7');
  // console.log(filteredLinkedQuestion);
  const customViewStyle = [
    {
      width: question && question.root ? '80%' : '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  ];
  const customTitleStyle = [
    {
      fontSize: question && question.root ? 38 : 20,
      lineHeight: question && question.root ? 40 : 22,
      fontFamily: 'Montserrat-Bold',
      color: '#43A2A2',
      marginTop: question && question.root ? 0 : 24,
    },
  ];

  return (
    <View
      style={[
        customViewStyle,
        {
          backgroundColor: Colors.secondary_background[theme],
          //  paddingBottom: 50,
        },
      ]}>
      <Text style={customTitleStyle}>{question ? question.title : ''}</Text>
      <RadioGroup
        Item={
          question &&
          question.option.map((item) => {
            if (item.optionType === 'radio')
              return {
                id: item._id,
                value: item.text,
              };
          })
        }
        setActiveKey={onSetCurrentOptionId}
        activeKey={currentOptionId}
      />
      {question &&
        question.option.map((item) => {
          if (item.optionType === 'text' || item.optionType === 'h6')
            return (
              <View
                style={
                  {
                    // paddingBottom: 50,
                  }
                }>
                <AnimInput
                  inputHandler={(txt) => onChange(txt, question.title)}
                  placeholder={item.text}
                />
              </View>
            );
        })}
      {filteredLinkedQuestion.length
        ? filteredLinkedQuestion.map((q) => (
          <QuestionController
            questions={[q]}
            nested
            QandA={QandA}
            setQandA={setQandA}
            nextQuestionParent={nextQuestion}
          />
        ))
        : null}
      {/* {(() => {
        if (filteredLinkedQuestion.length)
          return <QuestionController questions={filteredLinkedQuestion} />;
        else return null;
      })()} */}
    </View>
  );
};
