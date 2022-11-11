import React, {createRef, useEffect, useRef, useState} from 'react';
import {Text, View, Animated, Easing} from 'react-native';
import LottieView from 'lottie-react-native';
function PasswordStrengthChecker({style = {}, password}) {
  const AnimatedCheckSvg = require('../../../assets/anim_svg/check_circle.json');
  const [validation, setValidation] = useState({
    upperCase: false,
    lowerCase: false,
    digit: false,
    sc: false,
  });
  const ucAnimation = useRef(new Animated.Value(0)).current;
  const lcAnimation = useRef(new Animated.Value(0)).current;
  const dAnimation = useRef(new Animated.Value(0)).current;
  const scAnimation = useRef(new Animated.Value(0)).current;
  const minNumAnimation = useRef(new Animated.Value(0)).current;
  const changeAnimation = (condition, animation) => {
    if (condition) {
      Animated.timing(animation, {
        toValue: 1,
        useNativeDriver: false,
        duration: 500,
        easing: Easing.ease,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        useNativeDriver: false,
        duration: 500,
        easing: Easing.ease,
      }).start();
    }
  };
  useEffect(() => {
    const ucReg = /[A-Z]+/.test(password);
    const lcReg = /[a-z]+/.test(password);
    const dReg = /\d+/.test(password);
    const scReg = /[#@.\-\$!]+/.test(password);
    changeAnimation(ucReg, ucAnimation);
    changeAnimation(lcReg, lcAnimation);
    changeAnimation(dReg, dAnimation);
    changeAnimation(scReg, scAnimation);
    changeAnimation(password.length >= 8, minNumAnimation);
  }, [password]);
  const interpolatedTextColor = {
    inputRange: [0, 0.5, 1],
    outputRange: ['#666', '#888', '#333'],
  };
  return (
    <View style={[{paddingHorizontal: '1%'}, style]}>
      <Text style={{color: '#777'}}>Password must contain :</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 22, height: 22}}>
          <LottieView
            progress={ucAnimation}
            source={AnimatedCheckSvg}
            loop={false}
          />
        </View>
        <Animated.Text
          style={{
            color: ucAnimation.interpolate(interpolatedTextColor),
            marginLeft: '1%',
          }}>
          It should contain an uppercase letter
        </Animated.Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 22, height: 22}}>
          <LottieView
            progress={lcAnimation}
            source={AnimatedCheckSvg}
            loop={false}
          />
        </View>
        <Animated.Text
          style={{
            color: lcAnimation.interpolate(interpolatedTextColor),
            marginLeft: '1%',
          }}>
          It should contain a lowercase letter
        </Animated.Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 22, height: 22}}>
          <LottieView
            progress={dAnimation}
            source={AnimatedCheckSvg}
            loop={false}
          />
        </View>
        <Animated.Text
          style={{
            color: dAnimation.interpolate(interpolatedTextColor),
            marginLeft: '1%',
          }}>
          It should contain a digit
        </Animated.Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 22, height: 22}}>
          <LottieView
            progress={scAnimation}
            source={AnimatedCheckSvg}
            loop={false}
          />
        </View>
        <Animated.Text
          style={{
            color: scAnimation.interpolate(interpolatedTextColor),
            marginLeft: '1%',
          }}>
          It should contain a special (#@.\-\$!) character
        </Animated.Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 22, height: 22}}>
          <LottieView
            progress={minNumAnimation}
            source={AnimatedCheckSvg}
            loop={false}
          />
        </View>
        <Animated.Text
          style={{
            color: minNumAnimation.interpolate(interpolatedTextColor),
            marginLeft: '1%',
          }}>
          It should be minimum 8 characters long
        </Animated.Text>
      </View>
    </View>
  );
}
export default PasswordStrengthChecker;
