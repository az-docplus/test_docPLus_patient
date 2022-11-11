/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
  PermissionsAndroid,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import {
  saveUserAccount,
  GetPatientInfo,
} from '../../../reduxV2/action/PatientAction';
import moment from 'moment';
import InsetShadow from 'react-native-inset-shadow';

import {
  GetReviews,
  AddReviews,
  AddLastRouteMemory,
  saveNewUser,
} from '../../../reduxV2/action/AuthAction';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { AddMedicine } from '../../../reduxV2/action/PatientAction';
import InCallManager from 'react-native-incall-manager';
import { Host } from '../../../utils/connection';
import AddMed from '../../../components/molecules/Modal/AddMed';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { socket } from '../../../utils/socket';
import { showMessage } from 'react-native-flash-message';
// import moment from 'moment';

import {
  NEW_PRIMARY_LIGHT_BG,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import {
  Local,
  //  setLocale
} from '../../../i18n';
import FeedbackModal from '../../../components/molecules/Modal/FeebackModal';
import ReferModal from '../../../components/molecules/Modal/ReferModal';
import { AddNotification } from '../../../reduxV2/action/DoctorAction';
import ChatsComo from './Chats';

const { width, height } = Dimensions.get('window');

const offerDetailsInit = {
  offer_received: false,
  offer_answered: false,
  offer: {},
};

function offer_details_reducer(state, action) {
  switch (action.type) {
    case 'set_offer_received':
      return {
        ...state,
        offer_received: action.payload,
      };
    case 'set_offer_answered':
      return {
        ...state,
        offer_answered: action.payload,
      };
    case 'set_offer':
      return {
        ...state,
        offer: action.payload,
      };
    default:
      return state;
  }
}

export default function VideoCallScreen({ route, navigation }) {
  const { mode, User, type, room, autoAnswer, callType } = route.params;
  console.log(
    'Yes user Mil rha hai@@@@@@@@@@@######################',
    mode,
    User,
    type,
    room,
    autoAnswer,
    callType,
  );
  const panelRef = useRef();
  const [openChat, setOpenChat] = useState(false);
  const [showControl, setShowControl] = useState(false);
  useEffect(() => {
    dispatch(
      GetPatientInfo(User._id, true, () =>
        console.log('PATIENT INFO FETCHED<<<<<<<<<<<<<<<<'),
      ),
    );
  }, []);

  const Socket = useRef(socket);
  const _engine = useRef(null);
  const [joinSucceed, setJoinSucceed] = useState(false);
  const [remoteJoined, setRemoteJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState(null);
  const [channelName, setChannelName] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('');
  const { userData, isDoctor } = useSelector((state) => state.AuthReducer);
  const { patient } = useSelector((state) => state.PatientReducer);
  const dispatch = useDispatch();
  const [modalVisible, setVisible] = useState(false);
  const [editMode, seteditMode] = useState(false);
  const [editingData, seteditingData] = useState({});

  const [offerDetails, setOfferDetails] = useReducer(
    offer_details_reducer,
    offerDetailsInit,
  );
  const [answer_details, setAnswerDetails] = useState({
    answer_recevied: false,
  });
  const [video_on, setVideoOn] = useState(true);
  const [audio_on, setAudioOn] = useState(true);
  const [isFront, setIsFront] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const peer = useRef(null);
  const [imageSource, setImagesource] = useState(() => {
    let initialState = require('../../../assets/images/dummy_profile.png');
    // if (Array.isArray(User.picture)) {
    //     if (User.picture.length !== 0)
    //         initialState = {
    //             uri: `${Host}${User.coverPhoto?.replace('public', '')
    //                 .replace('\\\\', '/')}`,
    //         };
    // } else {
    //     if (User.picture && User.picture !== '')
    //         initialState = {
    //             uri: `${Host}${User.picture
    //                 .replace('public', '')
    //                 .replace('\\\\', '/')}`,
    //         };
    // }
    return initialState;
  });

  async function fetchTokenAndCreateRoom({ roomName }) {
    try {
      const identity = userData._id;
      const res = await fetch(
        `${Host}/agoraToken?identity=${identity}${
          roomName && '&room=' + roomName
        }`,
      );
      const { token, room, uid } = await res.json();
      return { token, room, uid };
    } catch (e) {
      console.error(e);
    }
  }

  const onHangUp = async () => {
    console.log('type', type);
    Socket.current.emit('hangUpCall', {
      to: User._id,
      type: type === 'patient' ? 'patient' : 'doctor',
    });
    setIsModalVisible(true);
    // InCallManager.stopRingtone(); //when users picks cal
    InCallManager.stop(); //stop call
    await _engine.current?.leaveChannel();
    _engine.current?.destroy();
    setJoinSucceed(false);
    setRemoteJoined(false);
    setRemoteUid(null);
    setChannelName('');
    if (isDoctor) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.replace('MainController');
      }
    }
  };
  useEffect(() => {
    Socket.current.on('handUpCallReceived', onHangUp);
    Socket.current.on('answer-made-from-another-peer', onHangUp);
    return () => {
      Socket.current.off('handUpCallReceived', onHangUp);
      Socket.current.off('answer-made-from-another-peer', onHangUp);
    };
  }, [onHangUp]);

  useEffect(() => {
    //   panelRef.current.show(100)

    async function init() {
      _engine.current = await RtcEngine.create(
        '17456c548156499ca940d0580469ad0f',
      );
      if (callType === 'video') await _engine.current.enableVideo();
      if (callType === 'audio') await _engine.current.enableAudio();

      if (mode === 'thisSide') {
        const {
          token,
          room: channel,
          uid,
        } = await fetchTokenAndCreateRoom({
          roomName: '',
        });
        //join channel

        await _engine.current.joinChannel(
          token,
          channel,
          null,
          uid, //uid
        );
      } else {
        //enable acccept button
        //check for autoAnser and call handleAnswer
        if (autoAnswer) {
          handleAnswer();
        } else {
          setOfferDetails({
            type: 'set_offer_received',
            payload: true,
          });
          setOfferDetails({
            type: 'set_offer_answered',
            payload: false,
          });
          if (callType == 'video')
            InCallManager.start({ media: 'video', ringback: '_DEFAULT_ ' });
          if (callType == 'audio')
            InCallManager.start({ media: 'audio', ringback: '_DEFAULT_ ' });
        }
      }

      // This callback occurs when the remote user successfully joins the channel.
      _engine.current.addListener('UserJoined', (uid, elapsed) => {
        console.log('UserJoined', uid, elapsed);
        // const {peerIds} = this.state;
        // if (peerIds.indexOf(uid) === -1) {
        //   this.setState({
        //     peerIds: [...peerIds, uid],
        //   });
        // }
        setRemoteUid(uid);
        setRemoteJoined(true);
        InCallManager.stopRingback(); //callee answered stop ringback
      });

      // This callback occurs when the remote user leaves the channel or drops offline.
      _engine.current.addListener('UserOffline', (uid, reason) => {
        console.log('UserOffline', uid, reason);
        // const {peerIds} = this.state;
        // this.setState({
        //   // Remove peer ID from state array
        //   peerIds: peerIds.filter((id) => id !== uid),
        // });
      });

      // This callback occurs when the local user successfully joins the channel.
      _engine.current.addListener(
        'JoinChannelSuccess',
        (channel, uid, elapsed) => {
          console.log('JoinChannelSuccess', channel, uid, elapsed);
          //send socket event call-user
          setChannelName(channel);
          setJoinSucceed(true);
          setShowControl(true);

          if (callType == 'video')
            InCallManager.start({ media: 'video', ringback: '_DEFAULT_ ' });
          if (callType == 'audio')
            InCallManager.start({ media: 'audio', ringback: '_DEFAULT_ ' });

          // InCallManager.startRingtone('_BUNDLE_');

          if (mode == 'thisSide') {
            Socket.current.emit('call-user', {
              room: channel,
              to: User._id,
              type:
                type.toLowerCase() === 'practise' ||
                type.toLowerCase() === 'doctor'
                  ? 'doctor'
                  : 'patient',
              User: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                picture: userData.picture,
                _id: userData.id,
              },
              UserType: isDoctor ? 'Practise' : 'patient',
              callType,
            });
          }
        },
      );
    }

    //checkpermission
    const requestCameraAndAudioPermission = async () => {
      try {
        let granted;
        if (callType === 'video') {
          granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);
        }
        if (callType === 'audio') {
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          );
        }

        if (callType === 'video') {
          if (
            granted['android.permission.RECORD_AUDIO'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.CAMERA'] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('You can use the cameras & mic');
          } else {
            console.log('Permission denied');
          }
        }

        if (callType === 'audio') {
          if (
            granted['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('You can use the mic');
          } else {
            console.log('Permission denied');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestCameraAndAudioPermission().then(init).catch(console.warn);
  }, []);

  const handleAnswer = async () => {
    if (!autoAnswer) {
      setOfferDetails({
        type: 'set_offer_received',
        payload: true,
      });
      setOfferDetails({
        type: 'set_offer_answered',
        payload: true,
      });
      InCallManager.stopRingback();
    }

    try {
      const {
        token,
        room: channel,
        uid,
      } = await fetchTokenAndCreateRoom({
        roomName: room,
      });
      //join channel

      await _engine.current.joinChannel(
        token,
        channel,
        null,
        uid, //uid
      );
    } catch (e) {
      console.log(e);
    }
  };
  function disableTrack(kind) {
    return async () => {
      switch (kind) {
        case 'audio':
          try {
            console.log('audio');
            if (audio_on) await _engine.current.enableLocalAudio(false);
            else await _engine.current.enableLocalAudio(true);
            setAudioOn(!audio_on);
          } catch (e) {
            console.log(e);
          }
          break;
        case 'video':
          try {
            console.log('video');
            if (video_on) await _engine.current.enableLocalVideo(false);
            else await _engine.current.enableLocalVideo(true);
            setVideoOn(!video_on);
          } catch (e) {
            console.log(e);
          }
          break;
      }
    };
  }
  async function switchCamera() {
    try {
      await _engine.current?.switchCamera();
      setIsFront(!isFront);
    } catch (e) {
      console.log(e);
    }
  }

  const HandleSubmit = (args) => {
    const paylaod = {
      doctorid: User._id,
      patientid: userData._id,
      ...args,
    };
    console.log(paylaod);
    dispatch(
      AddReviews(paylaod, (result) => {
        // setFeebacks(result);
        setIsModalVisible(false);
        // setloading(false);
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.replace('MainController');
        }
      }),
      () => {
        // setloading(false);
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.replace('MainController');
        }
      },
    );
  };

  const handleRefer = (doctorId, reason) => {
    const payload = {
      by: userData?._id,
      to: User._id,
      for: doctorId,
      appointment: patient?.appointments.reverse()[0]?._id,
      reason,
    };
    dispatch(
      AddNotification(payload, (err, response) => {
        console.log(response, 'sdlkfjdslj');
        setVisible(false);
      }),
    );
    console.log({ payload });
  };

  const onCancelFeedback = () => {
    setIsModalVisible(false);
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace('MainController');
    }
  };

  return (
    <LinearGradient
      colors={['#3EAEAE', '#077EE9']}
      angle={0}
      style={{
        flex: 1,
      }}>
      <ChatPanelCompo isOpen={openChat} setIsOpen={setOpenChat} />

      {!isDoctor && (
        <FeedbackModal
          visible={isModalVisible}
          onCancel={onCancelFeedback}
          onUpdate={HandleSubmit}
          setVisible={setIsModalVisible}
        />
      )}

      <ReferModal
        visible={modalVisible}
        vitalsInfo={[]}
        onCancel={() => setVisible(false)}
        unit="cm"
        handleRefer={handleRefer}
      />

      {/* <AddMed
        visible={modalVisible}
        editMode={editMode}
        data={editingData}
        onCancel={() => {
          seteditMode(false);
          setVisible(false);
          seteditingData({});
        }}
        onUpdate={onUpdate}
      /> */}
      {remoteJoined ? (
        <View style={{ width: width, height: height - 100 }}>
          <RtcRemoteView.SurfaceView
            uid={remoteUid}
            style={{ flex: 1 }}
            channelId={channelName}
            renderMode={VideoRenderMode.Hidden}
          />
        </View>
      ) : null}
      {!joinSucceed && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 120,
            right: 16,
            zIndex: 99999,
          }}
          // onPress={onSmallVidPress}
        >
          <RtcLocalView.SurfaceView
            style={{
              height: 150,
              width: 100,
            }}
            channelId={channelName}
            renderMode={VideoRenderMode.Hidden}
            zOrderMediaOverlay={true}
          />
        </TouchableOpacity>
      )}

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '7%',
        }}>
        {/* <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                    <IoniconsIcon name='person-add' color='#fff' size={30} />
                </TouchableOpacity> */}
        <Text
          style={{
            color: '#fff',
            fontFamily: 'Montserrat-SemiBold',
            textAlign: 'center',
            fontSize: 24,
            marginTop: 40,
          }}>
          {`${User.firstName} ${User.lastName}`.slice(0, 20)}
        </Text>
        <Image
          source={imageSource}
          style={{
            height: width * 0.4,
            width: width * 0.4,
            borderRadius: 100,
            alignSelf: 'center',
            marginTop: 40,
          }}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
        }}>
        {connectionStatus != '' && (
          <Text style={{ alignSelf: 'center', lineHeight: 25 }}>
            {connectionStatus}
          </Text>
        )}
        {isDoctor && (
          <TouchableOpacity
            // onPress={() => setVisible(true)}
            onPress={() => navigation.navigate('AddPrescription', { User })}
            // onPress={() => {
            //   dispatch(
            //     GetPatientInfo(userData.._id, true, () =>
            //       navigation.navigate('MedicalHistory'),
            //     ),
            //   );
            // }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              // zIndex: 999,
            }}>
            <Text style={{ fontFamily: 'Montserrat-Medium' }}>
              {`${Local('doctor.Chats.add_pres')}`}
            </Text>
          </TouchableOpacity>
        )}
        {/* {isDoctor && (
                    <TouchableOpacity
                        // onPress={() => setVisible(true)}
                        onPress={() => setVisible(true)}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            // zIndex: 999,
                        }}>
                        <Text style={{ fontFamily: 'Montserrat-Medium' }}>
                            {`${Local("doctor.Chats.refer")}`}
                        </Text>
                    </TouchableOpacity>
                )} */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingVertical: '5%',
          }}>
          {showControl && (
            <TouchableOpacity
              onPress={disableTrack('audio')} // on press audio toggle
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // zIndex: 999,
                backgroundColor: audio_on ? '#DADADA' : '#fff',
                borderRadius: 100,
                padding: 10,
              }}>
              <MaterialIcon name="mic" size={34} color="#0585F3" />
            </TouchableOpacity>
          )}
          {/* {(offerDetails.offer_answered || !offerDetails.offer_received) && ( */}
          <TouchableOpacity
            onPress={onHangUp} // on press hangup
            style={{
              backgroundColor: '#ef0000',
              padding: '3%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              zIndex: 999,
            }}>
            <MaterialIcon
              style={{
                transform: [
                  {
                    rotate: '135deg',
                  },
                ],
              }}
              name="call"
              size={32}
              color={'#bbb'}
            />
          </TouchableOpacity>
          {/* )} */}

          {offerDetails.offer_received && !offerDetails.offer_answered && (
            <TouchableOpacity
              onPress={handleAnswer} // on press hangup
              style={{
                backgroundColor: '#1f912a',
                padding: '3%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
                zIndex: 999,
              }}>
              <MaterialIcon name="call" size={32} color={'#bbb'} />
            </TouchableOpacity>
          )}
          {showControl && (
            <TouchableOpacity
              onPress={disableTrack('video')} // on press video toggle
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // zIndex: 999,
                backgroundColor: video_on ? '#DADADA' : '#fff',
                borderRadius: 100,
                padding: 10,
              }}>
              <MaterialIcon name="videocam" size={38} color="#0585F3" />
            </TouchableOpacity>
          )}
          {/* {showControl && (
                        <TouchableOpacity
                            onPress={switchCamera} // on press switch camera
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                // zIndex: 999,
                                backgroundColor: isFront ? '#DADADA' : '#fff',
                                borderRadius: 100,
                                padding: 10
                            }}>
                            <MaterialIcon
                                name={isFront ? 'camera-front' : 'camera-rear'}
                                size={32}
                                color={'#0585F3'}
                            />
                        </TouchableOpacity>
                    )} */}
          <TouchableOpacity
            onPress={() => setOpenChat(true)} // on press switch camera
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              // zIndex: 999,
              backgroundColor: isFront ? '#DADADA' : '#fff',
              borderRadius: 100,
              padding: 10,
            }}>
            <EntypoIcon name="chat" size={32} color={'#0585F3'} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});

const ChatPanelCompo = ({ isOpen, setIsOpen }) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {}}>
        <View
          style={{
            backgroundColor: '#fff',
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: '85%',
            width: '100%',
            borderTopLeftRadius: 14,
            borderTopRightRadius: 14,
            paddingVertical: 20,
            paddingBottom: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 17,
              marginBottom: 20,
            }}>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <IoniconsIcon name="chevron-back" color="#000" size={29} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 22,
              }}>
              Chat
            </Text>
            <Text style={{ width: 30 }}></Text>
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                backgroundColor: '#A7C8E6',
                paddingVertical: 10,
                elevation: 10,
              }}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 1.1,
                  borderColor: '#2E3D65',
                }}
                source={{
                  uri: 'https://images.pexels.com/photos/6311995/pexels-photo-6311995.jpeg',
                }}
              />
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 18,
                  color: '#2E3D65',
                }}>
                Dr. Co Ekatarine
              </Text>
              <Text style={{ width: 30 }}></Text>
            </View>
            <View
              style={{
                flex: 1,
                marginBottom: 10,
              }}>
              <FlatList
                data={__Chats}
                showsVerticalScrollIndicator={false}
                // stickyHeaderIndices={[0]}
                inverted
                // initialNumToRender={15}
                // contentContainerStyle={{}}
                // fadingEdgeLength={10}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => {
                  return <Message chat={item} to={1} />;
                }}
              />
            </View>

            <View
              style={{
                // backgroundColor: Colors.secondary_background[theme],
                // elevation: 6,
                borderRadius: 15,
                // height: 45,
                alignSelf: 'center',
                // position: 'absolute',
                marginHorizontal: 10,

                bottom: 10,
                flexDirection: 'row',
              }}>
              <InsetShadow
                shadowOpacity={0.4}
                containerStyle={{
                  flexDirection: 'row',
                  width: '100%',
                  borderRadius: 15,
                  paddingLeft: 10,
                  borderWidth: 0.1,
                }}
                shadowOffset={3}
                elevation={3}>
                <View
                  style={{
                    flex: 5,
                    // backgroundColor: 'yellow',
                    flexDirection: 'row',
                  }}>
                  <TextInput
                    placeholder={`Type a message`}
                    // placeholderTextColor={'#8e9393'}
                    //  placeholderTextColor={Colors.input_placeholder_color[theme]}
                    multiline
                    style={{
                      maxHeight: 100,
                      // color: Colors.primary_text_color[theme],
                    }}
                    // ref={textInputRef}
                    //     value={this.state.textMessage}
                    //  onChangeText={this.setTextMessage}
                  />
                </View>
                <View
                  style={{
                    flex: 2.4,
                    flexDirection: 'row',
                    marginRight: '2%',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity
                    //  onPress={this.handleSendMessage}
                    style={{
                      backgroundColor: '#3893E7',
                      height: 40,
                      width: 40,
                      alignSelf: 'center',
                      borderRadius: 100,
                      paddingRight: '3%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FeatherIcon
                      name={'send'}
                      style={{
                        transform: [
                          {
                            rotate: '45deg',
                          },
                        ],
                      }}
                      color={'#fafafa'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </InsetShadow>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const __Chats = [
  {
    message: 'First message',
    fromWhom: '1',
    timestamp: '42342342',
  },
  {
    message: 'First message 2',
    fromWhom: '2',
    timestamp: '42342342',
  },
  {
    message: 'First message 3',
    fromWhom: '1',
    timestamp: '42342342',
  },
  {
    message: 'First message 4',
    fromWhom: '2',
    timestamp: '42342342',
  },
];

const Message = React.memo(({ chat, to }) => {
  const { message, fromWhom, timestamp } = chat;
  //TODO use useeffect and evertime it is mounted send readReceipt set to 3 (seen)
  //TODO when sending message call achknowledgement callback to make this user set readreceipt to 1 that is send
  //TODO when deliverred that user will call achknowlegment on client side to let other that message is delivered
  //TODO send events to the other devices when same account is logged in on different devices that a message is send from there
  return (
    <View
      style={{
        width: '100%',
        // backgroundColor: 'red',
        paddingVertical: '2%',
        paddingHorizontal: '3%',
      }}>
      <View
        style={{
          backgroundColor: fromWhom == to ? '#E5E5E5' : '#9DCAF3',
          elevation: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomLeftRadius: fromWhom == to ? 0 : 12,
          borderBottomRightRadius: fromWhom == to ? 12 : 0,
          maxWidth: '80%',
          padding: '2%',
          paddingHorizontal: '4%',
          marginBottom: '1%',
          alignSelf: fromWhom == to ? 'flex-start' : 'flex-end',
        }}>
        <Text style={{ color: '#000' }}>{message}</Text>
        <Text
          style={{
            color: '#EA1A65',
            fontSize: 11,
            marginHorizontal: '4%',
            alignSelf: 'flex-end',
          }}>
          {moment(timestamp).format('hh:mm A')}
        </Text>
      </View>
    </View>
  );
});
