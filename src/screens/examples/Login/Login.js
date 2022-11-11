import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  useWindowDimensions,
} from 'react-native';
import DmzButton from '../../../components/atoms/SwitchButton/SwitchButton';
import LoginAsDoctor from '../../../components/organisms/LoginAsDoctor/LoginAsDoctor';
import LoginAsPatient from '../../../components/organisms/LoginAsPatient/LoginAsPatient';
import Fall from '../../../components/molecules/Fall/Fall';
import Otp from '../OTP/Otp';
import CurveGraphicBg from '../../../components/molecules/CurveGraphicBg/CurveGraphicBg';
function Login() {
  const dimen = useWindowDimensions();
  const screenWidth = dimen.width;
  const [loginClicked, setLoginClicked] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const switchPtoD = useRef(new Animated.Value(0)).current;
  const onPress = () => {
    Animated.timing(switchPtoD, {
      toValue: isDoctor ? 0 : 1,
      duration: 1200,
      delay: 300,
      easing: Easing.elastic(),
      useNativeDriver: true,
    }).start(() => setIsDoctor(!isDoctor));
  };
  return (
    <>
      <Fall start={loginClicked}>
        <Otp />
      </Fall>
      {!loginClicked && (
        <View style={Styles.Container}>
          <CurveGraphicBg />
          <View style={{flexDirection: 'row'}}>
            <LoginAsPatient
              onPressLogin={() => setLoginClicked(true)}
              style={{
                transform: [
                  {
                    translateX: switchPtoD.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -screenWidth],
                    }),
                  },
                ],
              }}
            />
            <LoginAsDoctor
              onPressLogin={() => setLoginClicked(true)}
              style={{
                transform: [
                  {
                    translateX: switchPtoD.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -screenWidth],
                    }),
                  },
                ],
              }}
            />
          </View>
          <DmzButton
            onPress={onPress}
            text={`Login as a ${!isDoctor ? 'doctor' : 'patient'}`}
            style={{
              Container: {
                ...Styles.switchPtoDButton,
                transform: [
                  {
                    rotate: switchPtoD.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['-90deg', '90deg'],
                    }),
                  },
                  {
                    translateY: switchPtoD.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, screenWidth - 80],
                    }),
                  },
                ],
              },
            }}
          />
        </View>
      )}
    </>
  );
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  switchPtoDButton: {
    width: 'auto',
    elevation: 3,
    backgroundColor: '#fff',
    position: 'absolute',
    right: 0,
    bottom: '10%',
    padding: 10,
    borderRadius: 30,
  },
});

export default Login;
