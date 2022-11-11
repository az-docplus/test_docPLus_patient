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
  PermissionsAndroid,
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

import {
  GetReviews,
  AddReviews,
  AddLastRouteMemory,
  saveNewUser,
} from '../../../reduxV2/action/AuthAction';

import { useSelector, useDispatch } from 'react-redux';
import { AddMedicine } from '../../../reduxV2/action/PatientAction';
import InCallManager from 'react-native-incall-manager';
import { Host } from '../../../utils/connection';
import AddMed from '../../../components/molecules/Modal/AddMed';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
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
    if (Array.isArray(User.picture)) {
      if (User.picture.length !== 0)
        initialState = {
          uri: `${Host}${User.picture[0]
            .replace('public', '')
            .replace('\\\\', '/')}`,
        };
    } else {
      if (User.picture && User.picture !== '')
        initialState = {
          uri: `${Host}${User.picture
            .replace('public', '')
            .replace('\\\\', '/')}`,
        };
    }
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
      type: type == 'patient' ? 'patient' : 'doctor',
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
    async function init() {
      _engine.current = await RtcEngine.create(
        '17456c548156499ca940d0580469ad0f',
      );
      if (callType == 'video') await _engine.current.enableVideo();
      if (callType == 'audio') await _engine.current.enableAudio();

      if (mode == 'thisSide') {
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
        if (callType == 'video') {
          granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);
        }
        if (callType == 'audio') {
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          );
        }

        if (callType == 'video') {
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

        if (callType == 'audio') {
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
    <View style={{ flex: 1 }}>
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
      {joinSucceed && (
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
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#e6f7f5',
          paddingVertical: '2%',
        }}>
        <Image
          source={imageSource}
          style={{ height: 55, width: 55, borderRadius: 100 }}
        />
        <Text
          style={{
            color: '#111',
            fontWeight: 'bold',
            fontSize: 18,
            lineHeight: 30,
          }}>
          {`${User.firstName} ${User.lastName}`.slice(0, 20)}
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#e6f7f5',
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
              {/* {Local('doctor.medical_history.add_medications')} */}
              {`${Local('doctor.Chats.add_pres')}`}
            </Text>
          </TouchableOpacity>
        )}
        {isDoctor && (
          <TouchableOpacity
            // onPress={() => setVisible(true)}
            onPress={() => setVisible(true)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              // zIndex: 999,
            }}>
            <Text style={{ fontFamily: 'Montserrat-Medium' }}>
              {/* {Local('doctor.medical_history.add_medications')} */}
              {`${Local('doctor.Chats.refer')}`}
            </Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingVertical: '2%',
          }}>
          {showControl && (
            <TouchableOpacity
              onPress={disableTrack('audio')} // on press audio toggle
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // zIndex: 999,
              }}>
              <MaterialIcon
                name="mic"
                size={32}
                color={audio_on ? '#047b7b' : '#333'}
              />
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
              }}>
              <MaterialIcon
                name="videocam"
                size={32}
                color={video_on ? '#047b7b' : '#333'}
              />
            </TouchableOpacity>
          )}
          {showControl && (
            <TouchableOpacity
              onPress={switchCamera} // on press switch camera
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // zIndex: 999,
              }}>
              <MaterialIcon
                name={isFront ? 'camera-front' : 'camera-rear'}
                size={32}
                color={'#047b7b'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
