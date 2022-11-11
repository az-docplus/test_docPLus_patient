import React, {useRef, useEffect} from 'react';
import {Button, View} from 'react-native';
// import {useSelector} from 'react-redux';
// import {socket} from '../../../utils/socket';
export default function Testing({navigation}) {
  // const Socket = useRef(socket);
  // const {userData} = useSelector((state) => state.AuthReducer);
  // useEffect(() => {
  // console.log('set online ', userData._id);
  //   Socket.current.emit('set_online', {
  //     id: userData._id,
  //     type: 'doctor',
  //   });
  // }, []);
  return (
    <View>
      <Button
        title={'go to call'}
        onPress={() => {
          navigation.navigate('videoCall');
        }}></Button>
    </View>
  );
}
