/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  // ScrollView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  BackHandler,
  // AppState,
} from 'react-native';
import { useSelector } from 'react-redux';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import {
  SEARCH_PLACEHOLDER_COLOR,
  // SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Host } from '../../../utils/connection';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import NetworkStatus from '../../../components/atoms/NetworkStatus/NetworkStatus';
import { socket } from '../../../utils/socket';
import { Colors } from '../../../styles/colorsV2';
import { Local } from '../../../i18n';
import InsetShadow from 'react-native-inset-shadow'

function ConversationsScreen({ navigation }) {
  const { theme } = useSelector((state) => state.AuthReducer);
  const Socket = useRef(socket).current;
  const [conversations, setConversations] = useState([]);
  const [allConversations, setAllConversations] = useState([]);
  const { userData, isDoctor } = useSelector((state) => state.AuthReducer);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      // setState(doctors);
      // setActive("allDoctors")

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const onEndEditing = (search) => {
    // console.log(search, 'searchLLLLLLLLLLLLLLLLL');
    if (search == '') {
      setConversations(allConversations);
      const bool = conversations === allConversations;
      // console.log(
      //   bool,
      //   conversations,
      //   allConversations,
      //   '..........................',
      // );
    } else {
      const c = allConversations.filter((p, id) => {
        if (!p.User) return;
        console.log(
          p?.User?.firstName,
          p?.User?.lastName,
          search,
          'ppppppppppppppppppppppppp',
        );
        if (
          (p?.User?.firstName).toLowerCase().includes(search.toLowerCase()) ||
          (p?.User?.lastName).toLowerCase().includes(search.toLowerCase())
        ) {
          return p;
        }
      });
      setConversations(c);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable) {
        setIsConnected(state.isConnected);
      } else {
        setIsConnected(state.isConnected);
      }
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    Socket.emit('get_conversation', {
      id: userData._id,
      type: isDoctor ? 'doctor' : 'patient',
    });
    // socket.on('call-made', function ({offer, fromSocket, User, type}) {
    //   console.log('call-made in socket');
    //   navigation.navigate('videoCall', {
    //     offer,
    //     fromSocket,
    //     mode: 'thatSide',
    //     User,
    //     type,
    //   });
    // });
    function fetchConversations(convo) {
      // console.log('fetched conversations');
      // console.log(convo.conversations);
      setConversations(convo.conversations);
      setAllConversations(convo.conversations);
    }
    function receiveConversation({ conversation }) {
      setConversations([...conversations, conversation]);
      setAllConversations([...allConversations, conversation]);
    }
    Socket.on('fetch_conversations', fetchConversations);
    Socket.on('receive_conversation', receiveConversation);
    return () => {
      Socket.off('fetch_conversations', fetchConversations);
      Socket.off('receive_conversation', receiveConversation);
    };
  }, [Socket, isDoctor, userData._id]);

  // useEffect(() => {
  //     console.log("socket changed")
  // }, [Socket])
  // useEffect(() => {
  //     console.log("allConversations changed")
  // }, [allConversations])
  // useEffect(() => {
  //     console.log("isDoctor changed")
  // }, [isDoctor])
  // useEffect(() => {
  //     console.log("userData changed")
  // }, [userData._id])

  return (
    <>
      <NetworkStatus isConnected={isConnected} />
      <View
        style={[
          styles.Container,
          { backgroundColor: Colors.secondary_background[theme] },
        ]}>
        <TopNavBar
          style={{
            Container: {
              backgroundColor: Colors.secondary_background[theme],
              marginTop: 0,
            },
          }}
          navigation={navigation}
          headerText={`${Local('doctor.Chats.convers')}`}
        />

        <FlatList
          data={conversations}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{}}
          fadingEdgeLength={30}
          centerContent
          keyExtractor={(item) => item?._id}
          ListHeaderComponent={
            <View
              style={{
                // justifyContent: 'center',
                //  alignItems: 'center',
                marginHorizontal: 10,
                marginBottom: 20,
                marginTop: 15,
                backgroundColor: Colors.secondary_background[theme],
                height: 50,
              }}>
              <View
                // shadowOpacity={1}
                // shadowOffset={15}
                // containerStyle={{
                //   flexDirection: 'row',
                //   width: '100%',
                //   height: 50,
                //   borderRadius: 15,
                // }}
                // elevation={12}
                >
                <SearchBarSolid
                  withIcon
                  placeholder="Find in contacts" //{`${Local('doctor.Chats.search_chat')}`}
                  placeholderTextColor={Colors.search_placeholder_text[theme]}
                  searchIcon={
                    <AntIcon
                      name={'search1'}
                      size={24}
                      color={SEARCH_PLACEHOLDER_COLOR}
                    />
                  }
                  onEndEditing={onEndEditing}
                  onChangeText={onEndEditing}
                  style={{
                    backgroundColor: '#FFF', // Colors.search_background[theme],
                    borderRadius: 10,
                    //  elevation: 2,
                    height: '100%',
                    width: '100%',
                  }}
                />
              </View>
              <View>
                {conversations.length == 0 && (
                  <TouchableOpacity
                    style={{ marginTop: 50 }}
                    onPress={() => navigation.navigate('AppointmentsHome')}>
                    <Text>Book appointment to start chatting with doctor</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          }
          renderItem={({ item }) => {
            if (item.User)
              return (
                <Convo
                  conversation={item}
                  // newMessages={newMessages[item.User?._id]}
                />
              );
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
});

const Convo = ({
  conversation,
  //  newMessages
}) => {
  // console.log(conversation, 'lllllllllllllllllllllllllllllllllll');
  const navigation = useNavigation();
  const { Chats, User, fromWhom } = conversation;
  // const [lastMessage, setLastMessage] = useState({});
  // const {userData, isDoctor} = useSelector((state) => state.AuthReducer);
  // const handleSetLastMessage = (chats) => {
  //   if (chats.length !== 0) {
  //     const last = chats[0];
  //     setLastMessage(last);
  //   }
  // };
  // useEffect(() => {
  //   handleSetLastMessage(Chats);
  // }, [Chats]);
  // useEffect(() => {
  //   if (newMessages) handleSetLastMessage(newMessages);
  //   console.log('a new message arrived ', newMessages);
  //   //set current count of newMessages and set active/unread messages
  //   //read about setParams for not to use function as a prop,,or just updating any param of another screeen
  // }, [newMessages]);

  const onPressConvo = () => {
    navigation.navigate('Chats', {
      Chats,
      fromWhom: User?._id,
      User,
      type: fromWhom,
    });
  };
  let imageSource = require('../../../assets/images/dummy_profile.png');
  const { theme } = useSelector((state) => state.AuthReducer);

  if (Array.isArray(User?.picture)) {
    if (User?.picture.length !== 0) {
      imageSource = {
        uri: `${Host}${User?.coverPhoto?.replace('public', '')
          .replace('\\\\', '/')}`,
      };
    }
  } else {
    if (User?.picture && User?.picture !== '') {
      imageSource = {
        uri: `${Host}${User?.picture
          .replace('public', '')
          .replace('\\\\', '/')}`,
      };
    }
  }

  return (
    <View
      style={{
        backgroundColor: Colors.secondary_background[theme],
        width: '100%',
        marginVertical: '3%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: '4%',

      }}>
      <View
        style={{
          flex: 1,
          //   backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          paddingRight: '1.5%',
        }}>
        <Image
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
          }}
          loadingIndicatorSource={require('../../../assets/images/dummy_profile.png')}
          source={imageSource}
        />
      </View>
      <TouchableOpacity
        onPress={onPressConvo}
        style={{
          flex: 5,
          padding: '2%',
          borderBottomColor: '#dddbdb',
          borderBottomWidth: 0.5,
          paddingVertical: '4%',
        }}>
        <Text
          style={{
            color: Colors.primary_text_color[theme],
            fontFamily: "Montserrat-Regular"
          }}>{`${User?.firstName} ${User?.lastName}`}</Text>
        {/* <Text style={{ color: '#666' }}>
          {lastMessage && lastMessage.message}{' '}
        </Text> */}
      </TouchableOpacity>
    </View>
  );
};

export default ConversationsScreen;
