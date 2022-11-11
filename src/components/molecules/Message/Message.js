import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
const Message = ({Profile, Name, Time, Message, MessageCount}) => {
  return (
    <View style={MessageStyles.Container}>
      <View style={MessageStyles.ProfileContainer}>{Profile}</View>
      <View style={MessageStyles.MessageContent}>
        <View style={MessageStyles.CredentialContainer}>
          <Text style={MessageStyles.Name}>{Name}</Text>
          <Text style={MessageStyles.Time}>{Time}</Text>
        </View>
        <View style={MessageStyles.MessageContainer}>
          <Text style={MessageStyles.MessageText}>{Message}</Text>
          <View style={MessageStyles.MessageCount}>
            <Text style={MessageStyles.MessageCountText}>{MessageCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const MessageStyles = StyleSheet.create({
  Container: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ProfileContainer: {
    marginLeft: 5,
    marginRight: 15,
  },
  MessageContent: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
  },
  CredentialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  Time: {
    marginRight: 10,
  },
  MessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -5,
  },
  MessageText: {
    fontSize: 14,
    color: '#555',
  },
  MessageCount: {
    backgroundColor: '#22C663',
    height: 20,
    width: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MessageCountText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 12,
  },
});

export default Message;
