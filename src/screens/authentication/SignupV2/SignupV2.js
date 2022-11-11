import React, { createRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Image,
  BackHandler,
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import SignupSplash from './SignupSplash';
import SignUpStep1Screen from './SignUpStep1Screen';
import SignUpStep3Screen from './SignUpStep3Screen';
import SignUpStep4Screen from './SignUpStep4Screen';
import ImagePicker from 'react-native-image-picker';
import {
  signupDoctor,
  signupPatient,
  sendOTP,
  signupSocialDoctor,
  signupSocialPatient,
} from '../../../reduxV2/action/AuthAction';
import Toast from 'react-native-root-toast';
import { useDispatch, useSelector } from 'react-redux';
import { UploadProfilePic } from '../../../reduxV2/action/DoctorAction';
import { UploadProfilePicPatient } from '../../../reduxV2/action/PatientAction';
import SignUpStep2Screen from './SignUpStep2Screen';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import AlertModal from '../../../components/molecules/Modal/AlertModal';
import GenericError from '../../../components/molecules/Modal/GenericError';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';

// import Svg from 'react-native-svg';

function SignupV2(props) {
  const pagerRef = createRef();
  const nextpage = (page) => {
    pagerRef.current.setPage(page);
  };

  useEffect(() => {
    const backAction = () => {
      props.navigation.goBack();
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
  const initialCredential = credential;
  const dispatch = useDispatch();
  const { signingUp, userData } = useSelector((state) => state.AuthReducer);
  const signupAs = props.route.params.loginAs;
  const [imageData, setImageData] = useState(null);
  const [mount, setMount] = useState(false);
  const [modal, setModal] = useState({ visible: false, text: '' });
  const [credential, setCredential] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    registration_number: '',
    specialty: '',
    phone: '',
    city: '',
    country: '',
    basic: '{}',
    state: '',
    OTP: '',
  });
  const [error, setError] = useState({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    registration_number: true,
    specialty: true,
    phone: true,
    city: true,
    country: true,
    basic: true,
    state: true,
  });

  // const [loading, setLoading] = useState(false)

  const SetCredential = (credentialName, value, social = false, data) => {

    if (social) {
      setCredential({ ...credential, ...data });
      SignUpStep1OnPressHandler();
      return;
    }
    const nameReg = /^[a-zA-Z]+\s?[a-zA-Z ]+$/;
    const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#@.\-\$!])(?=.*[a-zA-Z]).{8,}$/;
    const phoneReg = /^[1-9]{1}\d{9}$/;
    const cityReg = /^[a-zA-Z]+\s?[a-zA-Z]+$/;
    const countryReg = /^[a-zA-Z]+\s?[a-zA-Z]+$/;

    let match = true;
    if (credentialName == 'address') {
      const AddressArray = value.split(',');
      const city = AddressArray[1].trim();

      const state_raw = AddressArray[2];
      const state = state_raw.substr(0, state_raw.indexOf('.')).trim();

      const country_raw = value.split('(')[1];
      const country = country_raw.substr(0, country_raw.length - 1).trim();
      setCredential({ ...credential, city, state, country });
      return;
    }
    switch (credentialName) {
      case 'firstName':
        match = nameReg.test(value);
        break;
      case 'lastName':
        match = nameReg.test(value);
        break;
      case 'email':
        match = emailReg.test(value);
        break;
      case 'password':
        match = value !== '';
        // match = passReg.test(value);
        break;
      case 'phone':
        // match = typeof(parseInt(value)) === "number";
        match = value !== '' && value.length == 13;
        // match = phoneReg.test(value);
        break;
      // case 'city':
      //   match = cityReg.test(value);
      //   break;
      case 'country':
        match = countryReg.test(value);
        break;
      case 'registration_number':
        match = value.length >= 8;
        break;
    }
    setError({ ...error, [`${credentialName}`]: match });
    setCredential({ ...credential, [`${credentialName}`]: value });
  };

  // const initialCredential = credential;
  /* signIn = async () => {
    setIsEmail(true)
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo, "::::::::::::")
      setCredential({ email: userInfo.email, password: "DemoDoc@1234" });
      handleLogin()
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(SIGN_IN_CANCELLED, "::::::::::::")
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(IN_PROGRESS, "::::::::::::")
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(PLAY_SERVICES_NOT_AVAILABLE, "::::::::::::")
      } else {
        // some other error happened
        console.log("some other error happened", "::::::::::::")
      }
    }
  }; */

  const handleSubmit = (OTP) => {
    signupAs === 'doctor'
      ? _handleDoctorSignup(OTP)
      : _handlePatientSignup(OTP);
  };
  const _handleDoctorSignup = (OTP) => {
    const _credential = {
      ...credential,
      email: credential.email.toLowerCase(),
    };
    dispatch(
      signupDoctor(
        _credential,
        imageData,
        successCallback,
        errorCallback,
        OTPnotVerifiedCallback,
        OTP,
      ),
    );
  };
  const _handlePatientSignup = (OTP) => {
    const _credential = {
      ...credential,
      email: credential.email.toLowerCase(),
    };
    dispatch(
      signupPatient(
        _credential,
        imageData,
        successCallback,
        errorCallback,
        OTPnotVerifiedCallback,
        OTP,
      ),
    );
  };
  const handleSocialSubmit = () => {
    console.log("clicked")
    signupAs === 'doctor'
      ? _handleDoctorSocialSignup()
      : _handlePatientSocialSignup();
  };
  const _handleDoctorSocialSignup = () => {
    const _credential = {
      ...credential,
      email: credential.email.toLowerCase(),
    };
    console.log(credential, "dlkfjsdlfj")
    dispatch(
      signupSocialDoctor(
        _credential,
        imageData,
        successCallback,
        errorCallback,
        OTPnotVerifiedCallback,
      ),
    );
  };
  const _handlePatientSocialSignup = () => {
    const _credential = {
      ...credential,
      email: credential.email.toLowerCase(),
    };
    dispatch(
      signupSocialPatient(
        _credential,
        imageData,
        successCallback,
        errorCallback,
        OTPnotVerifiedCallback,
      ),
    );
  };

  const successCallback = () => {
    showTost('account created successfully');
    props.navigation.navigate('MainController');
  };
  const errorCallback = (e) => {
    // console.log(e, 'show modal next');
    showModal(`${e?.response?.data?.message || e.data.message}`);
    //showModal(e);
  };
  const OTPnotVerifiedCallback = (err) => {
    /* showModal(
      'Invalid OTP, please enter a valid OTP number'
    ); */
    showModal(`Wrong OTP`);
  };
  const showTost = (msg = 'nothing') => {
    return Toast.show(msg, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      },
    });
  };

  const showModal = (text) => setModal({ text, visible: true });

  const onChoosePicture = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    console.log(granted);
    if (granted) {
      PickImage();
    } else {
      askPermission();
    }
  };
  const askPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'DocPlus needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        PickImage();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err, 'fjsdlfkjsdlkfjf');
    }
  };
  const PickImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // const source = {uri: response.uri};
        // console.log(source);
        // const path = response.uri;
        // setData({...data, imagePath: path});
        // console.log(path);
        setImageData(response);
      }
    });
  };

  // console.log('params: ' + JSON.stringify(props.navigation));
  const SignUpStep1OnPressHandler = () => {
    const {
      email,
      phone,
    } = credential;
    const OTP = {
      email: email,
      mobile: phone,
      checkUserExist:
        signupAs === 'patient' ? 'patient' : 'doctor',
    };
    dispatch(
      sendOTP(
        OTP,
        () => {
          nextpage(2);
          // setLoading(false)
          setMount(!mount);
        },
        (err) => {
          console.log('err ', err?.response?.data?.message);
          // setLoading(false)
          // console.log(err.response.data.message)
          // nextpage(0);
          showModal(err?.response?.data?.message || "Something went wrong!")
          // signupAs nextpage(2);
        },
      ),
    );
  }
 
  return (
    <>
      <GenericError
        {...modal}
        onCancel={() => {
          setModal({ text: '', visible: false });
        }}
      />
      <View style={{ backgroundColor: 'white', position: 'relative' }}>
        <TopNavBar
          hideRightComp={true}
          navigation={
            props.navigation
            // props.navigation.goBack()
          }
          style={{
            Container: {
              height: 'auto',
              marginTop: 5,
            },
          }}
        />
      </View>
      {signupAs === 'doctor' ? (
        <ViewPager
          ref={pagerRef}
          style={styles.viewPager}
          initialPage={0}
          scrollEnabled={false}>
          <View key="0">
            <SignUpStep1Screen
              onChoosePicture={onChoosePicture}
              imageData={imageData}
              credential={credential}
              error={error}
              setError={setError}
              setCredential={SetCredential}
              // isLoading={loading}
              isLoading={signingUp}
              signupAs={signupAs}
              navigation={props.navigation}
              onSocialPress={handleSocialSubmit}
              onPress={() => {
                const reg = new RegExp(
                  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                );
                const {
                  email,
                  password,
                  firstName,
                  lastName,
                  phone,
                } = credential;
                if (
                  email !== '' &&
                  password !== '' &&
                  phone !== '' &&
                  reg.test(email) &&
                  password.length >= 4 &&
                  lastName != '' &&
                  firstName != ''
                ) {
                  // setLoading(true)
                  // if (!imageData) {
                  //   setModal({ text: 'You must upload a Profile picture' });
                  // } else {
                  // nextpage(1);
                  SignUpStep1OnPressHandler()
                  // }
                } else {
                  // setLoading(false)
                  showModal(
                    lastName == '' && firstName == ''
                      ? 'One or more fields empty'
                      : password.length < 4
                        ? 'Password must be atleast 4 characters'
                        : reg.test(email)
                          ? 'One or more fields empty'
                          : 'Not a valid Email.',
                  );
                }
              }}
            />
          </View>
          <View key="1">
            <SignUpStep3Screen
              credential={credential}
              error={error}
              setCredential={SetCredential}
              onChoosePicture={onChoosePicture}
              imageData={imageData}
              onPress={() => {
                const { registration_number, specialty } = credential;
                if (
                  registration_number !== '' &&
                  specialty !== '' &&
                  registration_number.length >= 4 &&
                  registration_number.length <= 15
                ) {
                  nextpage(3);
                } else {
                  showModal(
                    registration_number == '' && specialty == ''
                      ? 'One or more fields empty'
                      : registration_number.length < 8
                        ? 'Registration No. must be atleast 8 characters'
                        : null,
                  );
                }
              }}
            />
          </View>
          <View key="2">
            <SignUpStep4Screen
              credential={credential}
              setCredential={SetCredential}
              error={error}
              isLoading={signingUp}
              onPressChangeEmail={() => nextpage(0)}
              onPress={() => {
                const { phone, city, country } = credential;
                console.log(signupAs, '::::::::::::::::::');
                if (
                  phone !== '' &&
                  city !== '' &&
                  country !== '' &&
                  phone.length >= 10
                ) {
                  const OTP = {
                    email: credential.email,
                    mobile: credential.phone,
                    checkUserExist:
                      signupAs === 'patient' ? 'patient' : 'doctor',
                  };
                  console.log(
                    OTP,
                    OTP.checkUserExist,
                    signupAs,
                    '::::::::::::::::::',
                  );
                  dispatch(
                    sendOTP(
                      OTP,
                      () => {
                        nextpage(3);
                        setMount(!mount);
                      },
                      (err) => {
                        console.log(err.response.data.message);
                        // console.log(err.response.data.message)
                        showModal(err.response.data.message);
                      },
                    ),
                  );
                  // nextpage(3);
                  // setMount(!mount)
                } else {
                  showModal(
                    country == '' && city == '' && phone == ''
                      ? 'One or more fields empty'
                      : phone.length < 10
                        ? 'Incorrect Phone No.'
                        : null,
                  );
                }
              }}
              onChoosePicture={onChoosePicture}
            />
          </View>
          <View key="3">
            <SignUpStep2Screen
              signupAs={signupAs}
              isLoading={signingUp}
              imageData={imageData}
              mount={mount}
              sendOTP={() => {
                const OTP = {
                  email: credential.email,
                  mobile: credential.phone,
                };
                dispatch(
                  sendOTP(
                    OTP,
                    () => { },
                    (err) => {
                      // showModal(err.response.data.message)
                    },
                  ),
                );
              }}
              setModal={setModal}
              onPressChangeEmail={() => nextpage(0)}
              onPress={(otp) => {
                setCredential({ ...credential, OTP: otp.join('') });
                handleSubmit(otp.join(''));
              }}
            />
          </View>
        </ViewPager>
      ) : (
        <ViewPager
          ref={pagerRef}
          style={styles.viewPager}
          initialPage={0}
          scrollEnabled={false}>
          <View key="0">
            <SignUpStep1Screen
              onChoosePicture={onChoosePicture}
              imageData={imageData}
              credential={credential}
              error={error}
              setError={setError}
              setCredential={SetCredential}
              // isLoading={loading}
              isLoading={signingUp}
              signupAs={signupAs}
              navigation={props.navigation}
              onSocialPress={handleSocialSubmit}
              onPress={() => {
                const reg = new RegExp(
                  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                );
                const {
                  email,
                  password,
                  firstName,
                  lastName,
                  phone,
                } = credential;
                if (
                  email !== '' &&
                  password !== '' &&
                  reg.test(email) &&
                  password.length >= 4 &&
                  lastName != '' &&
                  firstName != ''
                ) {
                  // setLoading(true)
                  // if (!imageData) {
                  //   setModal({ text: 'You must upload a Profile picture' });
                  // } else {
                  // nextpage(1);
                  const OTP = {
                    email: email,
                    mobile: phone,
                    checkUserExist:
                      signupAs === 'patient' ? 'patient' : 'doctor',
                  };
                  dispatch(
                    sendOTP(
                      OTP,
                      () => {
                        nextpage(2);
                        // setLoading(false)
                        setMount(!mount);
                      },
                      (err) => {
                        console.log('err ', err);
                        // setLoading(false)
                        // console.log(err.response.data.message)
                        // nextpage(0);
                        showModal(err?.response?.data?.message || "Something went wrong!"); 
                      },
                    ),
                  );
                  // }
                } else {
                  // setLoading(false)
                  showModal(
                    lastName == '' && firstName == ''
                      ? 'One or more fields empty'
                      : password.length < 4
                        ? 'Password must be atleast 4 characters'
                        : reg.test(email)
                          ? 'One or more fields empty'
                          : 'Not a valid Email.',
                  );
                }
              }}
            />
          </View>

          <View key="1">
            <SignUpStep4Screen
              credential={credential}
              setCredential={SetCredential}
              signupAs={signupAs}
              error={error}
              isLoading={signingUp}
              onPressChangeEmail={() => nextpage(0)}
              onPress={() => {
                const { phone, city, country, email } = credential;
                if (
                  phone !== '' &&
                  city !== '' &&
                  country !== '' &&
                  phone.length >= 10
                ) {
                  const OTP = {
                    email: email,
                    mobile: phone,
                    checkUserExist:
                      signupAs === 'patient' ? 'patient' : 'doctor',
                  };
                  dispatch(
                    sendOTP(
                      OTP,
                      () => {
                        nextpage(2);
                        setMount(!mount);
                      },
                      (err) => {
                        console.log(err.response.data.message);
                        // console.log(err.response.data.message)
                        // nextpage(1);
                        showModal(err.response.data.message);
                      },
                    ),
                  );
                } else {
                  showModal(
                    country == '' && city == '' && phone == ''
                      ? 'One or more fields empty'
                      : phone.length < 10
                        ? 'Incorrect Phone No.'
                        : null,
                  );
                }
              }}
              onChoosePicture={onChoosePicture}
            />
          </View>
          <View key="2">
            <SignUpStep2Screen
              signupAs={signupAs}
              isLoading={signingUp}
              imageData={imageData}
              mount={mount}
              setModal={setModal}
              sendOTP={() => {
                const OTP = {
                  email: credential.email,
                  mobile: credential.phone,
                };
                dispatch(
                  sendOTP(
                    OTP,
                    () => { },
                    (err) => {
                      // showModal(err.response.data.message)
                    },
                  ),
                );
              }}
              onPressChangeEmail={() => nextpage(0)}
              onPress={(otp) => {
                setCredential({ ...credential, OTP: otp.join('') });
                signupAs === 'doctor'
                  ? nextpage(2)
                  : handleSubmit(otp.join(''));
              }}
            />
          </View>
        </ViewPager>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});

export default SignupV2;