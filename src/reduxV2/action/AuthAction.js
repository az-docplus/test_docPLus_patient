import axios from 'axios';
import { Host } from '../../utils/connection';
import {
  GetAppointments,
  GetPatientInfo,
  saveUserAccount,
  UploadProfilePicPatient,
} from '../action/PatientAction';
import {
  GetDoctorProfile,
  UploadProfilePic,
  haveingError,
  saveDoc,
} from '../action/DoctorAction';

import { resetDoctorReducer } from '../action/DoctorAction';
import { resetDoctorToPatientReducer } from '../action/DoctorToPatientAction';
import { resetPatientAccountReducer } from '../action/PatientAction';
import { resetQuestinnaireReducer } from '../action/QuestionnaireAction';
import { GetFamilyMember } from './PatientAction';
import { socket, WaitingRoomSocket } from '../../utils/socket';

// import {resetDataStore} from './dataStore';
// import {resetQuestion} from './questionAction';
const ISLOGGED_IN = 'ISLOGGED_IN';
const SAVE_USER = 'SAVE_USER';
const LOGGING_IN = 'LOGGING_IN';
const LOGGED_IN = 'LOGGED_IN';
const ERROR_LOGIN = 'ERROR_LOGIN';
const SIGNING_UP = 'SIGNING_UP';
const SIGNED_UP = 'SIGNED_UP';
const ERROR_SIGNUP = 'ERROR_SIGNUP';

const RESET_AUTH_REDUCER = 'RESET_AUTH_REDUCER';

const ERROR = 'HAVEING_ERROR';
const LOADING = 'LOADING';
const ADD_LAST_ROUTE_MEMORY = 'ADD LAST ROUTE MEMEORY';
// const CONTINUE_AS = 'CONTINUE_AS';

// export const ContinueAs = (data) => (dispatch) => {
//   dispatch({
//     type: 'CONTINUE_AS',
//     payload: data,
//   });
// };

export const AddLastRouteMemory = (RouteData) => (dispatch) => {
  dispatch({
    type: ADD_LAST_ROUTE_MEMORY,
    payload: RouteData,
  });
};
export const saveNewUser = (data, type) => {
  // console.log('userdata==========>>>>>>>>>>', data);
  return {
    type: SAVE_USER,
    userData: data,
    userType: type.localeCompare('doctor') === 0,
  };
};

const resetAuthReducer = () => ({
  type: RESET_AUTH_REDUCER,
});

export const resetStore = (callback = () => {}) => {
  return (dispatch) => {
    dispatch(resetAuthReducer());
    // dispatch(resetQuestinnaireReducer());
    dispatch(resetPatientAccountReducer());
    // dispatch(resetDoctorToPatientReducer());
    // dispatch(resetDoctorReducer());
    if (socket.connected) {
      socket.emit('force_disconnect');
    }
    if (WaitingRoomSocket.connected) {
      WaitingRoomSocket.emit('force_disconnect');
    }
    callback();
  };
};

export const UpdateDoctor = (data, success, failed) => {
  return (dispatch) => {
    // dispatch(startLoading());//it was not defined
    // setting header
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    axios
      .post(`${Host}/doctors/profile/update`, data, config)
      .then((result) => {
        if (result.data.status) {
          const data = result.data.data;

          const _data = {
            id: data._id,
            name: data.basic.name,
            email: data.email,
            phone: data.phone,
            ...data,
          };

          dispatch(saveNewUser(_data, 'doctor'));
          success({
            status: true,
            message: 'Doctor Updated',
          });
        } else {
          failed({
            status: false,
            message: result.data.error.slice(0, 20),
          });
          dispatch(
            haveingError({
              error: 'something went wrong',
            }),
          );
        }
      })
      .catch((err) => {
        failed({
          status: false,
          message: 'something went wrong',
        });
        dispatch(haveingError(err));
      });
  };
};

/**
 * ====================== LOGIN ACTION ==============================
 */
export const isLoggedin = () => ({
  type: ISLOGGED_IN,
});
const loggingIn = () => ({
  type: LOGGING_IN,
});
export const loggedIn = () => ({
  type: LOGGED_IN,
});
const errorLogin = (err) => ({
  type: ERROR_LOGIN,
  payload: err,
});
export const LoginPatient = (data, success, failed) => {
  return (dispatch) => {
    dispatch(loggingIn());
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    axios
      .post(`${Host}/patient/authenticate`, data, config)
      .then((result) => {
        // console.log(result, '???????????????');
        if (result.data.status) {
          // console.log(result.data, '????????????????????');
          const data = result.data.user;
          const _data = {
            id: data._id,
            email: data.email,
            phone: data.phone,
            name: data.firstName === undefined ? 'No name' : data.firstName,
            ...data,
          };

          dispatch(loggedIn());
          dispatch(saveNewUser(_data, 'patient'));

          dispatch(saveUserAccount(_data));
          /* console.log(patient, "patient") */
          dispatch(
            GetPatientInfo(_data.id, null, () =>
              dispatch(
                GetFamilyMember(data.meta, (members) => {
                  success({
                    status: true,
                    message: 'Patient Login Successful',
                    members: members.length,
                  });
                }),
              ),
            ),
          );
        } else {
          failed({
            status: false,
            message: result.data.error.slice(0, 40),
          });
          dispatch(errorLogin(result.data.error.slice(0, 40)));
        }
      })
      .catch((err) => {
        console.log(err.response.data.error, '/////');
        console.log(err.response, '/////');
        failed({
          status: false,
          // message: 'something went wrong!! try again',
          message: err.response.data.error || err.response.data.message,
        });
        dispatch(errorLogin(err));
      });
  };
};

export const LoginDoctor = (data, success, failed) => {
  return (dispatch) => {
    dispatch(loggingIn());
    // setting header
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    axios
      .post(`${Host}/doctors/authenticate`, data, config)
      .then((result) => {
        if (result.data.status) {
          const data = result.data.user;
          const _data = {
            id: data._id,
            name: data.basic.name,
            email: data.email,
            phone: data.phone,
            ...data,
          };
          // dispatch(loggedIn());
          dispatch(saveNewUser(_data, 'doctor'));
          dispatch(saveDoc(_data));
          //get doctor info
          dispatch(GetDoctorProfile(_data.id));
          success({
            status: true,
            message: 'Doctor Login successfully.',
          });
        } else {
          failed({
            status: false,
            message: result.data.error.slice(0, 40),
          });
          dispatch(errorLogin(result.data.error.slice(0, 40)));
        }
      })
      .catch((err) => {
        failed({
          status: false,
          // message: 'Something went wrong!! Try again',
          message: err.response.data.error || err.response.data.message,
        });
        dispatch(errorLogin(err));
      });
  };
};
/**
 * ====================== LOGIN ACTION END==============================
 */

/**
 * ====================== SIGNUP ACTION ==============================
 */

const signingUp = () => ({
  type: SIGNING_UP,
});
export const signedUp = () => ({
  type: SIGNED_UP,
});
const errorSignup = (err) => ({
  type: ERROR_SIGNUP,
  payload: err,
});
export const signupPatient = (
  data,
  imageData,
  successCallback,
  errorCallback,
  OTPnotVerifiedCallback,
  OTP,
) => {
  return (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    // console.log(data, '.......................................................')
    dispatch(signingUp());
    const _OTP = {
      otp: OTP,
      email: data.email,
    };
    axios
      .post(`${Host}/otp/verify`, _OTP)
      .then((res) => {
        // console.log(res, 'OTP varified');
        if (res.data.status) {
          axios
            .post(`${Host}/patient/register`, data, config)
            .then((result) => {
              if (result.data.status) {
                const _data = result.data.data;
                const __data = {
                  email: _data.email,
                  name: _data.firstName,
                  phone: _data.phone,
                  id: _data._id,
                  ..._data,
                };
                dispatch(signedUp());
                dispatch(saveNewUser(__data, 'patient'));

                dispatch(
                  imageData
                    ? UploadProfilePicPatient(__data.id, imageData, () => {
                        dispatch(
                          GetPatientInfo(__data.id, () => {
                            successCallback();
                          }),
                        );
                      })
                    : dispatch(
                        GetPatientInfo(__data.id, () => {
                          successCallback();
                        }),
                      ),
                );
              } else {
                dispatch(errorSignup('Something Went Wrong'));
                errorCallback('Something Went Wrong');
              }
            })
            .catch((err) => {
              dispatch(errorSignup(err.message));
              errorCallback(err);
            });
        } else {
          dispatch(errorSignup(res.data.message));
          OTPnotVerifiedCallback(res.data.message);
          errorCallback(res.data.message);
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        // console.log(err.response, 'OTP not verified');
        OTPnotVerifiedCallback(err.response.data.message);
        dispatch(errorSignup(err));
        errorCallback(err);
      });
  };
};
export const signupSocialPatient = (
  data,
  imageData,
  successCallback,
  errorCallback,
  OTPnotVerifiedCallback,
  OTP,
) => {
  return (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    // console.log(data, '.......................................................')
    dispatch(signingUp());

    axios
      .post(`${Host}/patient/register`, data, config)
      .then((result) => {
        if (result.data.status) {
          const _data = result.data.data;
          const __data = {
            email: _data.email,
            name: _data.firstName,
            phone: _data.phone,
            id: _data._id,
            ..._data,
          };
          dispatch(signedUp());
          dispatch(saveNewUser(__data, 'patient'));

          dispatch(
            imageData
              ? UploadProfilePicPatient(__data.id, imageData, () => {
                  dispatch(
                    GetPatientInfo(__data.id, () => {
                      successCallback();
                    }),
                  );
                })
              : dispatch(
                  GetPatientInfo(__data.id, () => {
                    successCallback();
                  }),
                ),
          );
        } else {
          dispatch(errorSignup('Something Went Wrong'));
          errorCallback('Something Went Wrong');
        }
      })
      .catch((err) => {
        dispatch(errorSignup(err.message));
        errorCallback(err);
      });
    // })
    // .catch((err) => {
    //   console.log(err.response, 'OTP not verified');
    //   OTPnotVerifiedCallback(err.response.data.message);
    //   dispatch(errorSignup(err));
    //   errorCallback(err);
    // });
  };
};

export const signupDoctor = (
  data,
  imageData,
  successCallback,
  errorCallback,
  OTPnotVerifiedCallback,
  OTP,
) => {
  return (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    // console.log(data);
    dispatch(signingUp());
    const _OTP = {
      otp: OTP,
      email: data.email,
    };
    axios
      .post(`${Host}/otp/verify`, _OTP)
      .then((res) => {
        // console.log(res, 'OTP varified');
        if (res.data.status) {
          axios
            .post(`${Host}/doctors/register`, data, config)
            .then((result) => {
              // console.log(result, '.....................result');
              const _data = result.data.data;
              const __data = {
                mode: 'doctor',
                email: _data.email,
                name: _data.basic.name,
                phone: _data.phone,
                id: _data._id,
                ..._data,
              };
              // dispatch(signedUp());
              dispatch(saveNewUser(__data, 'doctor'));
              dispatch(
                imageData
                  ? UploadProfilePic(__data.id, imageData, () => {
                      dispatch(
                        GetDoctorProfile(__data.id, () => {
                          successCallback('Doctor Signup successful');
                        }),
                      );
                    })
                  : dispatch(
                      GetDoctorProfile(__data.id, () => {
                        successCallback('Doctor Signup successful');
                      }),
                    ),
              );
            })
            .catch((err) => {
              // console.log(err.response, '.....................eerrrr');
              dispatch(haveingError(''));
              dispatch(errorSignup(err));
              errorCallback(err);
            });
        } else {
          // dispatch(errorSignup(err));
          // errorCallback(res);
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        // console.log(err, 'OTP not verified')
        dispatch(errorSignup(err));
        OTPnotVerifiedCallback(err);
        errorCallback(err);
      });
  };
};
export const signupSocialDoctor = (
  data,
  imageData,
  successCallback,
  errorCallback,
  OTPnotVerifiedCallback,
  OTP,
) => {
  return (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    // console.log(data);
    dispatch(signingUp());

    axios
      .post(`${Host}/doctors/register`, data, config)
      .then((result) => {
        // console.log(result, '.....................result');
        const _data = result.data.data;
        const __data = {
          mode: 'doctor',
          email: _data.email,
          name: _data.basic.name,
          phone: _data.phone,
          id: _data._id,
          ..._data,
        };
        dispatch(signedUp());
        dispatch(saveNewUser(__data, 'doctor'));
        dispatch(
          imageData
            ? UploadProfilePic(__data.id, imageData, () => {
                dispatch(
                  GetDoctorProfile(__data.id, () => {
                    successCallback('Doctor Signup successful');
                  }),
                );
              })
            : dispatch(
                GetDoctorProfile(__data.id, () => {
                  successCallback('Doctor Signup successful');
                }),
              ),
        );
      })
      .catch((err) => {
        // console.log(err.response, '.....................eerrrr');
        dispatch(haveingError(''));
        dispatch(errorSignup(err));
        errorCallback(err);
      });

    // .catch((err) => {
    //   // console.log(err, 'OTP not verified')
    //   dispatch(errorSignup(err));
    //   OTPnotVerifiedCallback(err);
    //   errorCallback(err);
    // });
  };
};

/**
 * ====================== SIGNUP ACTION END==============================
 */

/**
 * ====================== THEME ACTION ==============================
 */
// const CHANGING_THEME = 'CHANGING_THEME';
const CHANGE_THEME = 'CHANGE_THEME';

// export const changingTheme = () => ({
//   type: CHANGING_THEME,
// });
export const themeChanged = (theme) => {
  return {
    type: CHANGE_THEME,
    payload: theme,
  };
};
/**
 * ====================== THEME ACTION END ==============================
 */

/**
 * ====================== LANGUAGE ACTION ==============================
 */
const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export const languageChanged = (language) => {
  return {
    type: CHANGE_LANGUAGE,
    payload: language,
  };
};
/**
 * ====================== LANGUAGE ACTION END ==============================
 */

export const signupStaff = (
  data,
  imageData,
  successCallback,
  errorCallback,
) => {
  return (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    // console.log(data)
    dispatch(signingUp());
    axios
      .post(`${Host}/staff/register`, data, config)
      .then((result) => {
        // console.log(result, '.....................result')
        const _data = result.data.data.practice;
        const { access_type, email, name } = result.data.data;
        const memberDetails = {
          name,
          email: email,
        };
        const __data = {
          access_type: access_type,
          memberDetails,
          mode: 'doctor',
          email: _data.email,
          name: _data.basic.name,
          phone: _data.phone,
          id: _data._id,
          ..._data,
        };
        dispatch(signedUp());
        dispatch(saveNewUser(__data, 'doctor'));
        successCallback('Doctor Signup successful');
        // dispatch(
        //   UploadProfilePic(__data.id, imageData, () => {
        //     dispatch(
        //       GetDoctorProfile(__data.id, () => {
        //         successCallback('Doctor Signup successful');
        //       }),
        //     );
        //   }),
        //);
      })
      .catch((err) => {
        // console.log(err.response, '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        dispatch(errorSignup(err));
        errorCallback(err);
      });
  };
};

export const signInStaff = (
  data,
  imageData,
  successCallback,
  errorCallback,
) => {
  return (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    dispatch(signingUp());
    axios
      .post(`${Host}/staff/login`, data, config)
      .then((result) => {
        // console.log(result, '.....................result')
        const _data = result.data.user.practice;
        const { email, access_type, name } = result.data.user;
        const memberDetails = {
          email: email,
          name,
        };
        const __data = {
          access_type: access_type,
          memberDetails: memberDetails,
          mode: 'doctor',
          email: _data.email,
          name: _data.basic.name,
          phone: _data.phone,
          id: _data._id,
          ..._data,
        };
        dispatch(signedUp());
        dispatch(saveNewUser(__data, 'doctor'));
        // dispatch(
        //   UploadProfilePic(__data.id, imageData, () => {
        //     dispatch(
        //       GetDoctorProfile(__data.id, () => {
        //         successCallback('Doctor Signup successful');
        //       }),
        //     );
        //   }),
        //);
      })
      .catch((err) => {
        dispatch(errorSignup(err));
        errorCallback(err);
      });
  };
};

/**
 *  ***************** OTP ***********************
 */

export const sendOTP = (body, success = () => {}, error = () => {}) => {
  return (dispatch) => {
    if (body.phone) body.mobile = body.phone;
    // console.log(body, '?????????inside action??????????');
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    console.log('==============>>>>>>>>>>>>>body', body);
    axios
      .post(`${Host}/otp/create`, body)
      .then((res) => {
        // console.log(res, 'OTP sent');
        success(res);
      })
      .catch((err) => {
        // console.log('Error : ', err);
        error(err);
      });
  };
};

export const GetReviews = (practiceID, onSuccess) => {
  return (dispatch) => {
    axios
      .get(`${Host}/doctors/getReview/${practiceID}`)
      .then((res) => {
        // console.log(res, 'Fetched')
        onSuccess(res.data.data);
      })
      .catch((err) => console.log(err.response));
  };
};

export const AddReviews = (body, onSuccess) => {
  return (dispatch) => {
    axios
      .post(`${Host}/doctors/addReview`, body)
      .then((res) => {
        dispatch(GetReviews(body.doctorid, onSuccess));
      })
      .catch((err) => console.log(err.response));
  };
};

//////////////////// SIGNUP /////////////////////////////

export const signupDoctor2 = (data, successCallback, errorCallback) => {
  return (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    dispatch(signingUp());
    // console.log({ data });
    axios
      .post(`${Host}/doctors/register`, data, config)
      .then((result) => {
        // console.log(result, '.....................result');
        const _data = result.data.data;
        const __data = {
          mode: 'doctor',
          email: _data.email,
          name: _data.basic.name,
          phone: _data.phone,
          id: _data._id,
          onBoarding: data.onBoarding ? true : false,
          ..._data,
        };
        dispatch(signedUp());
        dispatch(saveNewUser(__data, 'doctor'));
        dispatch(isLoggedin());
        dispatch(
          dispatch(
            GetDoctorProfile(
              __data.id,
              () => successCallback(_data._id, _data),
              () => {},
              data.onBoarding ? true : false,
            ),
          ),
        );
      })
      .catch((err) => {
        // console.log(err.response, '.....................eerrrr');
        dispatch(haveingError(''));
        dispatch(errorSignup(err));
        errorCallback(err);
      });
  };
};

export const signupPatient2 = (data, successCallback, errorCallback) => {
  return (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    console.log('==============body', data);
    axios
      .post(`${Host}/patient/register`, data, config)
      .then((result) => {
        if (result.data.status) {
          const _data = result.data.data;
          const __data = {
            email: _data.email,
            name: _data.firstName,
            phone: _data.phone,
            id: _data._id,
            ..._data,
          };
          console.log('==============b_dataody', _data);
          dispatch(signedUp());
          dispatch(saveNewUser(__data, 'patient'));
          dispatch(isLoggedin());
          dispatch(
            dispatch(
              GetPatientInfo(__data.id, () => {
                successCallback();
              }),
            ),
          );
        } else {
          dispatch(errorSignup('Something Went Wrong'));
          errorCallback('Something Went Wrong');
        }
      })
      .catch((err) => {
        // console.log('================>>>>>>>>>>>eeeeeeeee', err.response.data);
        dispatch(errorSignup(err.message));
        errorCallback(err);
      });
  };
};
