
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Conversations from '../screens/common/Chats/Conversations';
import Chats from '../screens/common/Chats/Chats';

const Stack = createStackNavigator();

function Chatting() {
  return (
    <Stack.Navigator headerMode={'none'} initialRouteName={'Conversations'}>
      <Stack.Screen name={'Conversations'} component={Conversations} />
      <Stack.Screen options={{
        
      }} name={'Chats'} component={Chats} />
      {/* <Stack.Screen name="testing" component={Testing} /> */}
      {/* <Stack.Screen name={'videoCall'} component={VideoCallScreen} /> */}
    </Stack.Navigator>
  );
}
export default Chatting;
