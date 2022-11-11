import React, {useRef, useEffect} from 'react';
import {StyleSheet, Text, Animated, Easing} from 'react-native';

export default function NetworkStatus({isConnected}) {
  const animateNoNetwork = useRef(new Animated.Value(0)).current;
  function onNetworkFailure() {
    Animated.timing(animateNoNetwork, {
      toValue: 1,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  }
  function onNetworkRestore() {
    Animated.timing(animateNoNetwork, {
      toValue: 0,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  }
  useEffect(() => {
    if (isConnected) {
      onNetworkRestore();
    } else {
      onNetworkFailure();
    }
  }, [isConnected]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff0000',
        height: 40,
        transform: [
          {
            translateY: animateNoNetwork.interpolate({
              inputRange: [0, 1],
              outputRange: [-100, 0],
            }),
          },
        ],
      }}>
      <Text style={{color: '#fafafa'}}>No Internet connection</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
