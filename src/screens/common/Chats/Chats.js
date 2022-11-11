/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  VirtualizedList,
} from 'react-native';
import { useSelector, connect } from 'react-redux';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Host } from '../../../utils/connection';
import InsetShadow from 'react-native-inset-shadow'

import NetInfo from '@react-native-community/netinfo';
import { ToastAndroid } from 'react-native';
import NetworkStatus from '../../../components/atoms/NetworkStatus/NetworkStatus';
import FeedbackModal from '../../../components/molecules/Modal/FeebackModal';

import moment from 'moment';
import {
  GetReviews,
  AddReviews,
  AddLastRouteMemory,
  saveNewUser,
} from '../../../reduxV2/action/AuthAction';
import { socket } from '../../../utils/socket';
import { Colors } from '../../../styles/colorsV2';
import { Local, setLocale } from '../../../i18n';
import { Color } from 'react-native-agora';

class ChatsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textMessage: '',
      Messages: [],
      isConnected: true,
    };
    this.socket = socket;
    this.userData = this.props.userData;
    this.theme = this.props.theme;
    this.from = this.props.userData._id;
    this.to = this.props.route.params.fromWhom;
    this.User = this.props.route.params.User;
    this.type = this.props.route.params.type;
    this.Chats = this.props.route.params.Chats;
    // console.log('route prams ', this.props.route.params);

    if (Array.isArray(this.User?.picture)) {
      if (this.User?.picture.length !== 0)
        this.imageSource = {
          uri: `${Host}${this.User?.coverPhoto?.replace('public', '')
            .replace('\\\\', '/')}`,
        };
    } else {
      if (this.User?.picture && this.User?.picture !== '')
        this.imageSource = {
          uri: `${Host}${this.User?.picture
            .replace('public', '')
            .replace('\\\\', '/')}`,
        };
    }
  }

  setTextMessage = (text) => {
    this.setState({
      textMessage: text,
    });
  };
  sendMessage = (message, timestamp) => {
    console.log('in send message with ', {
      this: this.from,
      to: this.to,
      message: message,
      timestamp: timestamp,
      type: this.type,
      fromType: this.props.isDoctor,
    });
    this.socket.emit('send_message', {
      from: this.from,
      to: this.to,
      message: message,
      timestamp: timestamp,
      toType:
        this.type.toLowerCase() === 'practise' ||
          this.type.toLowerCase() === 'doctor'
          ? 'doctor'
          : 'patient',
      fromType: this.props.isDoctor ? 'doctor' : 'patient',
    });
  };
  handleSendMessage = () => {
    console.log('handle pressed');
    console.log('Messages now ', this.state.Messages);
    console.log('message ', this.state.textMessage);
    if (this.state.isConnected) {
      const trimmedMessage = this.state.textMessage.trim();

      // const messages = Array.from(Messages);
      // messages.unshift(chatMessage);
      console.log(this.state.Messages);
      const timestamp = Date.now();
      this.setState(
        {
          Messages: [
            {
              timestamp: timestamp,
              _id: `${Date.now().toString()}`,
              message: trimmedMessage,
              fromWhom: this.from,
              readReceipt: 1,
            },
            ...this.state.Messages,
          ],
          textMessage: '',
        },
        () => {
          console.log('after state update ', this.state.Messages);
          this.sendMessage(trimmedMessage, timestamp);
        },
      );

      // setPushedNewMessage(pushedNewMessage + 1);

      // textInputRef.current.clear();
      // textInputRef.current.focus();
    } else {
      ToastAndroid.show("Can't send message!!", ToastAndroid.LONG);
    }
  };

  onReceiveMessage = ({ from, message }) => {
    console.log(this.props.userData.firstName, ' receive_message');
    if (from == this.props.route.params.fromWhom) {
      // const messages = Array.from(Messages);
      // messages.unshift(chatMessage);
      console.log(this.state.Messages);
      this.setState({
        Messages: [
          {
            timestamp: Date.now(),
            _id: `${Date.now().toString()}`,
            message,
            fromWhom: from,
            readReceipt: 1,
          },
          ...this.state.Messages,
        ],
      });
      // setPushedNewMessage(pushedNewMessage + 1);
    }
  };
  componentDidMount() {
    this.socket.on('receive_message', this.onReceiveMessage);
    this.unsubscribeNetInfo = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable) {
        this.setState({
          isConnected: state.isConnected,
        });
      } else {
        this.setState({
          isConnected: state.isConnected,
        });
      }
    });
  }
  componentWillUnmount() {
    this.socket.off('receive_message', this.onReceiveMessage);
    this.unsubscribeNetInfo();
  }

  render() {
    // const HandleSubmit = (args) => {
    //   const paylaod = {
    //     doctorid: data._id,
    //     patientid: patient._id,
    //     ...args,
    //   };
    //   console.log(paylaod);
    //   dispatch(
    //     AddReviews(paylaod, (result) => {
    //       setFeebacks(result);
    //       setIsModalVisible(false);
    //       setloading(false);
    //     }),
    //     () => {
    //       setloading(false);
    //     },
    //   );
    // };

    const theme = this.props.theme;
    return (
      <>
        <NetworkStatus isConnected={this.state.isConnected} />
        <View
          style={[
            styles.Container,
            { backgroundColor: Colors.primary_background[theme] },
          ]}>
          <TopNavBar
            style={{
              Container: {
                backgroundColor: Colors.secondary_background[theme],
                marginTop: 0,
                paddingVertical: '2%',
              },
            }}
            navigation={this.props.navigation}
            headerText={`${Local('doctor.Chats.chat')}`}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.chat_bg[theme],
              marginBottom: 10,
            }}>
            <View
              style={{
                width: '100%',
                backgroundColor: '#A7C8E6',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flex: 1.5,
                  paddingVertical: '3%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 45,
                    margin: 0,
                  }}
                  loadingIndicatorSource={require('../../../assets/images/dummy_profile.png')}
                  source={this.imageSource}
                />
              </View>
              <View
                style={{
                  flex: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#2E3D65',
                    fontFamily: "Montserrat-SemiBold"
                  }}>{`${this.User?.firstName} ${this.User?.lastName}`}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  // backgroundColor: 'red',
                }}>
                {/* <TouchableOpacity
                  onPress={() => {
                    console.log(this.state.isConnected);
                    if (this.state.isConnected) {
                      this.props.navigation.navigate('videoCall', {
                        mode: 'thisSide',
                        User: this.User,
                        type: this.type,
                        callType: 'video',
                      });
                    } else {
                      ToastAndroid.show(
                        'Make sure you have stable internet connection!!',
                        ToastAndroid.LONG,
                      );
                    }
                  }}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FeatherIcon name={'video'} size={28} color={'#fafafa'} />
                </TouchableOpacity> */}
              </View>
            </View>
            <FlatList
              data={[...this.state.Messages, ...this.Chats]}
              showsVerticalScrollIndicator={false}
              // stickyHeaderIndices={[0]}
              inverted
              // initialNumToRender={15}
              // contentContainerStyle={{}}
              // fadingEdgeLength={10}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return <Message chat={item} to={this.to} />;
              }}
            />
          </View>




          <View
            style={{
              backgroundColor: Colors.secondary_background[theme],
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
                flexDirection: "row",
                width: "100%",
                borderRadius: 15,
                paddingLeft: 10,
                borderWidth: 0.1
              }}
              shadowOffset={3}
              elevation={3}
            >
              {/* <TouchableOpacity
              style={{
                flex: 1,
                // backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FeatherIcon name={'smile'} size={17} color={Colors.chat_icon_color[theme]} />
            </TouchableOpacity> */}
              <View
                style={{
                  flex: 5,
                  // backgroundColor: 'yellow',
                  flexDirection: "row"
                }}>

                <TextInput
                  placeholder={`${Local('doctor.Chats.type_a_message')}`}
                  // placeholderTextColor={'#8e9393'}
                  placeholderTextColor={Colors.input_placeholder_color[theme]}
                  multiline
                  style={{
                    maxHeight: 100,
                    color: Colors.primary_text_color[theme],
                  }}
                  // ref={textInputRef}
                  value={this.state.textMessage}
                  onChangeText={this.setTextMessage}
                />
              </View>
              <View
                style={{
                  flex: 2.4,
                  // backgroundColor: 'red',
                  flexDirection: 'row',
                  // alignItems: 'center',
                  marginRight: '2%',
                  justifyContent: 'flex-end',
                }}>
                {/* {this.state.textMessage === '' ? (
                <>
                  <TouchableOpacity style={{paddingHorizontal: '3%'}}>
                    <FeatherIcon
                      name={'paperclip'}
                      size={17}
                      color={Colors.chat_icon_color[theme]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{paddingHorizontal: '3%'}}>
                    <FeatherIcon name={'camera'} size={17} color={Colors.chat_icon_color[theme]} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{paddingHorizontal: '3%'}}>
                    <FeatherIcon name={'mic'} size={17} color={Colors.chat_icon_color[theme]} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.handleSendMessage}
                    style={{
                      backgroundColor: '#43A2A2',
                      height: 40,
                      width: 40,
                      // marginRight: 2,
                      // alignSelf: 'center',
                      paddingRight: '3%',
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {
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
                        size={17}
                      />
                    }
                  </TouchableOpacity>
                  <TouchableOpacity style={{paddingHorizontal: '3%'}}>
                    <FeatherIcon
                      name={'paperclip'}
                      size={17}
                      color={Colors.chat_icon_color[theme]}
                    />
                  </TouchableOpacity>
                </> */}

                <TouchableOpacity
                  onPress={this.handleSendMessage}
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
      </>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

const Message = React.memo(({ chat, to }) => {
  const { theme } = useSelector((state) => state.AuthReducer);
  const { message, fromWhom, readReceipt, timestamp } = chat;
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
          backgroundColor:
            fromWhom === to
              ? "#E5E5E5"
              : "#9DCAF3",
          elevation: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomLeftRadius: fromWhom === to ? 0 : 12,
          borderBottomRightRadius: fromWhom === to ? 12 : 0,
          maxWidth: '80%',
          padding: '2%',
          paddingHorizontal: '4%',
          marginBottom: '1%',
          alignSelf: fromWhom === to ? 'flex-start' : 'flex-end',
        }}>
        <Text style={{ color: Colors.primary_text_color[theme] }}>{message}</Text>
        <Text
          style={{
            color: "#EA1A65",
            fontSize: 11,
            marginHorizontal: '4%',
            alignSelf: 'flex-end',
          }}>
          {moment(timestamp).format('hh:mm A')}
        </Text>
      </View>

    </View >
  );
});

// function mapStateToProps(state) {
//   return state.AuthReducer;
// }

const mapProps = function (state) {
  return {
    userData: state.AuthReducer.userData,
    isDoctor: state.AuthReducer.isDoctor,
    theme: state.AuthReducer.theme,
  };
};

export default connect(mapProps)(ChatsComponent);
