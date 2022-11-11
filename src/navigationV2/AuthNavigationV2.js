import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginV2 from '../screens/authentication/LoginV2/LoginV2';
import SignupV2 from '../screens/authentication/SignupV2/SignupV2';
import StaffRegister from '../screens/authentication/SignupV2/StaffRegister';
import forgotPassword from '../screens/authentication/LoginV2/forgotPassword';
import LoginOtp from '../screens/authentication/LoginV2/LoginOtp';
import DocRegistration from '../screens/doctor/DoctorRegistration/DocRegistration';
// import {forgotPasswordEmailOtp} from '../screens/authentication/LoginV2/forgotPasswordEmailOtp';
import Confirmyouridentity from '../screens/doctor/confirmyouridentity/Confirmyouridentity';
import AllDoctore from '../screens/doctor-home/AllDoctore';
import GetPlusNowScreen from '../screens/doctor-home/GetPlusNowScreen';

const Stack = createStackNavigator();

function AuthNavigationV2(parentProps) {
  console.log(parentProps.route.params, 'sdlkfjdlkfjdlkfj');
  return (
    <Stack.Navigator initialRouteName={'loginScreen'} headerMode={'none'}>
      {/* {props => <Home user={props.user} /> */}
      <Stack.Screen
        name="loginScreen"
        // options={{ headerShown: false }}
      >
        {(props) => (
          <LoginV2 {...props} signup={parentProps?.route?.params?.signup} />
        )}
      </Stack.Screen>
      {/* // <Stack.Screen name={'loginScreen'} component={LoginV2} /> */}
      <Stack.Screen name={'forgotPassword'} component={forgotPassword} />
      <Stack.Screen name={'LoginOtp'} component={LoginOtp} />
      <Stack.Screen name={'staffScreen'} component={StaffRegister} />
      <Stack.Screen name={'signupScreen'} component={SignupV2} />
      <Stack.Screen
        name={'docregistration'}
        component={DocRegistration}
        headerMode={'none'}
      />
      <Stack.Screen
        name={'confirmyouridentity'}
        component={Confirmyouridentity}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigationV2;
