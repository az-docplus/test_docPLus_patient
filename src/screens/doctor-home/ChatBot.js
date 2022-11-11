import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { DialogFlowConifg } from './../../../env';
import TopNavBar from '../../components/molecules/TopNavBar/TopNavBar';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
const AvatarBot = require('../../assets/png/bot.png');
import { Avatar } from 'react-native-paper';
import { chatData } from './ChatBoatDummyData';

const ChatBot = ({ navigation, route }) => {
  const [boatData, setBoatData] = useState(false);
  const [secondQues, setSecondQues] = useState([chatData[0]]);
  const [thirdQues, setThirdQues] = useState(false);
  const [forthQues, setForthQues] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      DialogFlowConifg.client_email,
      DialogFlowConifg.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      DialogFlowConifg.project_id,
    );
  }, []);

  const Diseasedata = route.params.disease;

  const BOT = {
    _id: 2,
    name: 'Mr. Bot',
    avatar: AvatarBot,
  };

  useEffect(() => {
    setData({
      messages: [
        {
          _id: 1,
          text: 'Hi! I am the FAQ bot 🤖 from Jscrambler.\n\nHow may I help you with today?`,',
          createdAt: new Date(),
          user: BOT,
        },
      ],
      id: 1,
      name: '',
    });
  }, [isFocused]);
  const [data, setData] = useState({
    messages: [
      {
        _id: 1,
        text: 'Hi! I am the FAQ bot 🤖 from Jscrambler.\n\nHow may I help you with today?`,',
        createdAt: new Date(),
        user: BOT,
      },
      // {
      //   _id: 2,
      //   text: 'what is your consern',
      //   createdAt: new Date(),
      //   user: BOT,
      // },
    ],
    id: 1,
    name: '',
  });
  console.log('========xxxxxxxxx', data);

  const onSend = (messages = []) => {
    console.log('#############', messages);
    setData((PreviouseState) => ({
      messages: GiftedChat.append(PreviouseState.messages, messages),
    }));
    let message = messages[0].text;

    Dialogflow_V2.requestQuery(
      message,
      (result) => {
        handleGoogleResponse(result);
        console.log('###########', JSON.stringify(result));
      },
      (error) => console.log(error),
    );
  };

  const [sendHlo, setHlo] = useState([]);

  useEffect(() => {
    setHlo((PreviouseState) => ({
      messages: GiftedChat.append(PreviouseState.messages, Diseasedata),
    }));

    let message = Diseasedata;
    Dialogflow_V2.requestQuery(
      message,
      (result) => {
        console.log('###########', JSON.stringify(result));
        handleGoogleResponse(result);
      },
      (error) => console.log(error),
    );
  }, [Diseasedata, navigation]);

  const handleGoogleResponse = (result) => {
    let resultData = result?.queryResult.fulfillmentMessages;

    SendBotResponse(resultData);
  };

  const SendBotResponse = (resultData) => {
    // console.log(resultData.length);
    let msg;
    if (resultData === undefined) {
      msg = {
        _id: data?.messages.length + 1,
        text: "Hey i don't understand what you want to say 🤖!!",
        cretedAt: new Date(),
        user: BOT,
      };
    } else if (resultData.length < 2) {
      msg = {
        _id: data?.messages.length + 1,
        text: resultData[0].simpleResponses.simpleResponses[0].textToSpeech,
        cretedAt: new Date(),
        user: BOT,
      };
    } else {
      let chooseButton = [];

      resultData[1].suggestions.suggestions.map(({ title }) =>
        chooseButton.push({
          title: title,
          value: title,
          _id: Date.now() + Math.random(),
        }),
      );
      // console.log('========>>>>>>>>>>', chooseButton);
      // console.log(
      //   '========>>>>>>>>>>xxxxxxxxx',
      //   resultData[1].suggestions.suggestions,
      // );
      msg = {
        _id: data?.messages.length + 1,
        text: resultData[0].simpleResponses.simpleResponses[0].textToSpeech,
        cretedAt: new Date(),
        user: BOT,
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: chooseButton,
        },
      };
    }

    setData((PreviouseState) => ({
      messages: GiftedChat.append(PreviouseState.messages, [msg]),
    }));
  };
  const onQuickReply = (qkrl) => {
    setData((PreviouseState) => ({
      messages: GiftedChat.append(PreviouseState.messages, qkrl),
    }));

    let message = qkrl[0].value;

    Dialogflow_V2.requestQuery(
      message,
      (result) => handleGoogleResponse(result),
      (error) => console.log('@@@@@@@@@@@@@@', error),
    );
  };


  const nextQuestion = (e) => {
    if (chatData.length - 1 == secondQues.length - 1) {
      setThirdQues(true);
    } else {
      console.log(e, '==========e');
      setSecondQues((d) => [...d, chatData[e + 1]]);
    }

    // console.log(secondQues,'=======next question of chat data')
  };

  console.log(
    chatData.length - 1,
    secondQues.length - 1,
    '===========chatdata last object',
  );

  // const nextThirdQuestion = (e) => {
  //   console.log(e,'======value')
  //   // setSecondQues(d=>[...d, chatData[e+3]])
  // }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavBar navigation={navigation} headerText={'Consultation Room'} />
      <ImageBackground
        source={{
          uri: 'https://cdn.wallpapersafari.com/61/64/3QBHDv.png',
        }}
        style={{ flex: 1 }}>
        {/* <GiftedChat
          isTyping={true}
          scrollToBottom={true}
          quickReplyStyle={{ backgroundColor: '#fff' }}
          // isLoadingEarlier={true}
          // inverted={false}
          renderSend={(props) => (
            <Send
              {...props}
              containerStyle={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/png/telegram.png')}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </Send>
          )}
          messages={data?.messages}
          onSend={(msg) => onSend(msg)}
          onQuickReply={(qkrl) => onQuickReply(qkrl)}
          user={{ _id: 1 }}
        /> */}
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ paddingTop: 10 }}>
              <View>
                {secondQues.map((item) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      marginLeft: 10,
                    }}>
                    <Avatar.Image source={AvatarBot} size={40} />
                    <View>
                      <Text
                        style={{
                          color: 'black',
                          backgroundColor: '#fff',
                          margin: 15,
                          padding: 15,
                          alignSelf: 'flex-start',
                          borderRadius: 5,
                          maxWidth: '100%',
                          position: 'relative',
                          elevation: 5,
                        }}>
                        {item.question}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          maxWidth: 400,
                          marginLeft: 20,
                        }}>
                        {item.option.map((item) => (
                          <TouchableOpacity
                            onPress={() => nextQuestion(secondQues.length - 1)}>
                            <Text
                              style={{
                                color: '#fff',
                                backgroundColor: '#297281',
                                marginRight: 15,
                                padding: 15,
                                alignSelf: 'flex-start',
                                borderRadius: 5,
                                maxWidth: '100%',
                                position: 'relative',
                                elevation: 5,
                                marginBottom: 10,
                              }}>
                              {item.item}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </View>
                ))}

                {thirdQues ? (
                  <Text style={{
                    color: '#111',
                    backgroundColor: '#fff',
                    marginRight: 15,
                    padding: 15,
                    alignSelf: 'flex-end',
                    borderRadius: 5,
                    maxWidth: '100%',
                    position: 'relative',
                    elevation: 5,
                    marginTop: 10,
                  }}>U have Diabeties</Text>
                ) : (
                  <></>
                )}

                {/* {secondQues ? (
                  secondQues.map(item => (
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 10 }}>
                      <Avatar.Image source={AvatarBot} size={40} />
                      <View>
                        <Text
                          style={{
                            color: 'black',
                            backgroundColor: '#fff',
                            margin: 15,
                            padding: 15,
                            alignSelf: 'flex-start',
                            borderRadius: 5,
                            maxWidth: '100%',
                            position: 'relative',
                            elevation: 5
                          }}>
                          {item.question}
                        </Text>
                        <View style={{ flexDirection: 'row', flexWrap: "wrap", maxWidth: 500, marginLeft: 20 }}>
                          {item.option.map((item) => (
                            <TouchableOpacity onPress={() => nextThirdQuestion(secondQues.indexOf(item))}>
                              <Text style={{
                                color: '#fff',
                                backgroundColor: '#297281',
                                marginRight: 15,
                                padding: 15,
                                alignSelf: 'flex-start',
                                borderRadius: 5,
                                maxWidth: '100%',
                                position: 'relative',
                                elevation: 5,
                                marginTop: 10
                              }}>{item.item}</Text>

                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    </View>
                  ))
                ) : (
                  <></>
                )} */}
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              marginHorizontal: 20,
              borderRadius: 10,
              paddingHorizontal: 10,
              marginVertical: 10,
            }}>
            <TextInput
              style={{ flex: 1, backgroundColor: 'transparent', height: 50 }}
              placeholderTextColor="#E0E0E0"
              placeholder="Type here"
            />
            <Image
              source={require('../../assets/png/u_telegram.png')}
              style={{ height: 40, width: 40, resizeMode: 'contain' }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ChatBot;

const styles = StyleSheet.create({});
