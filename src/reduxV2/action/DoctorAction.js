import axios from 'axios';
import { Alert } from 'react-native';
import { Host } from '../../utils/connection';

const save = 'SAVE_MY_DOCTOR';
const loading = 'START_MY_DOCTOR_REDUCER_LOADING';
const err = 'HAVEING_MY_DOCTOR_REDUCER_ERROR';
const RESET_DOCTOR_REDUCER = 'RESET_DOCTOR_REDUCER';
const APPOINTMENT_LOADING = 'APPOINTMENT_LOADING';
const APPOINTMENT_LOADED = 'APPOINTMENT_LOADED';
const ERROR_APPOINTMENT_FETCHING = 'ERROR_APPOINTMENT_FETCHING';
const ALL_APPOINTMENT_LOADING = 'ALL_APPOINTMENT_LOADING';
const APPOINTMENT_LOADED_ALL = 'APPOINTMENT_LOADED_ALL';
const ERROR_ALL_APPOINTMENT_FETCHING = 'ERROR_ALL_APPOINTMENT_FETCHING';
const SPECIALTY_LOADING = 'SPECIALTY_LOADING';
const SPECIALTY_LOADED = 'SPECIALTY_LOADED';
const SPECIALTY_ERROR = 'SPECIALTY_ERROR';
const UPDATING_DOCTOR_PROFILE = 'UPDATING_DOCTOR_PROFILE';
const UPDATED_DOCTOR_PROFILE = 'UPDATED_DOCTOR_PROFILE';
const UPDATING_DOCTOR_ERROR = 'UPDATING_DOCTOR_ERROR';
const GETTING_RECENT_PATIENTS = 'GETTING_RECENT_PATIENTS';
const GOT_RECENT_PATIENTS = 'GOT_RECENT_PATIENTS';
const GETTING_RECENT_PATIENTS_ERROR = 'GETTING_RECENT_PATIENTS_ERROR';
const SAVING_SLOTS = 'SAVING SLOTS';
const SLOT_ERROR = 'SLOT ERROR';

const savingSlots = (bool) => {
  return {
    type: SAVING_SLOTS,
    payload: bool,
  };
};

const setErrorInSlots = (err) => {
  return {
    type: SLOT_ERROR,
    payload: err,
  };
};
export const saveDoc = (data) => {
  return {
    type: save,
    payload: data,
  };
};

const startLoading = () => {
  return {
    type: loading,
  };
};

export const haveingError = (error) => {
  return {
    type: err,
    payload: error,
  };
};

export const resetDoctorReducer = () => {
  return {
    type: RESET_DOCTOR_REDUCER,
  };
};

const startAppointmentLoading = () => {
  return {
    type: APPOINTMENT_LOADING,
  };
};

const appointmentLoaded = (appointments) => {
  return {
    type: APPOINTMENT_LOADED,
    payload: appointments,
  };
};

const startAppointmentLoadingAll = () => {
  return {
    type: ALL_APPOINTMENT_LOADING,
  };
};
const appointmentLoadedAll = (appointments) => {
  return {
    type: APPOINTMENT_LOADED_ALL,
    payload: appointments,
  };
};
const errorFetchingAllAppointments = (err) => {
  return {
    type: ERROR_ALL_APPOINTMENT_FETCHING,
    payload: err,
  };
};
const errorFetchingAppointments = (err) => {
  return {
    type: ERROR_APPOINTMENT_FETCHING,
    payload: err,
  };
};

const specialtyLoading = () => {
  return {
    type: SPECIALTY_LOADING,
  };
};
const specialtyLoaded = (specialty) => {
  return {
    type: SPECIALTY_LOADED,
    payload: specialty,
  };
};
const specialtyError = (error) => {
  return {
    type: SPECIALTY_ERROR,
    payload: error,
  };
};

const updatingDoctorProfile = () => {
  return {
    type: UPDATING_DOCTOR_PROFILE,
  };
};
const updatingDoctorError = (err) => {
  return {
    type: UPDATING_DOCTOR_ERROR,
    payload: err,
  };
};
const updatedDoctorProfile = () => {
  return {
    type: UPDATED_DOCTOR_PROFILE,
  };
};

const gettingRecentPatient = () => {
  return {
    type: GETTING_RECENT_PATIENTS,
  };
};
const gotRecentPatients = (patients) => {
  return {
    type: GOT_RECENT_PATIENTS,
    payload: patients,
  };
};
const gettingRecentPatientError = (err) => {
  return {
    type: GETTING_RECENT_PATIENTS_ERROR,
    payload: err,
  };
};

/**
 *  Appointment list Action
 */

const GETTING_APPOINTMENT_LIST = 'GETTING_APPOINTMENT_LIST';
const GOT_APPOINTMENT_LIST = 'GOT_APPOINTMENT_LIST';
const ERROR_GETTING_APPOINTMENT = 'ERROR_GETTING_APPOINTMENT';

const gettingAppointments = () => {
  return {
    type: GETTING_APPOINTMENT_LIST,
  };
};
const gotAppointments = (appointments) => {
  return {
    type: GOT_APPOINTMENT_LIST,
    payload: appointments,
  };
};
const errorGettingAppointments = (e) => {
  return {
    type: ERROR_GETTING_APPOINTMENT,
    payload: e,
  };
};

export const GetAppointments =
  (patientId, success = () => {}) =>
  (dispatch) => {
    dispatch(gettingAppointments());
    axios
      .get(`${Host}/doctors/appointments/${patientId}`)
      .then((response) => {
        const { data, status } = response.data;
        if (status) {
          dispatch(gotAppointments(data));
          success(data);
          // console.log(data, "DLKFJDLKFJDLKFJ")
        } else throw new Error('Internal Error!! Try again.');
      })
      .catch((e) => {
        dispatch(errorGettingAppointments(e));
      });
  };

/**
 *  End Appointment list
 */

export const GetDoctorProfile = (
  id,
  success = () => {},
  failure = () => {},
  onBoarding = true,
) => {
  return (dispatch) => {
    dispatch(startLoading());

    axios.get(`${Host}/doctors/getdoc/${id}`).then((result) => {
      if (result.data.status) {
        dispatch(
          saveDoc({
            ...result.data.data,
            onBoarding: onBoarding,
          }),
        );
        success();
      } else {
        console.log('someting wrong');
        failure();
        dispatch(haveingError(result.data.message));
      }
    });
  };
};

export const FetchAppointments = (docId, date) => {
  return async (dispatch) => {
    const data = {
      docId,
      date,
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    dispatch(startAppointmentLoading());
    try {
      const req = await axios.post(
        `${Host}/doctors/appointment/next`,
        data,
        config,
      );
      const response = req.data;
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      let appointments = response.data.appointments;
      appointments = appointments
        .filter((item) => {
          // return true;
          const date = new Date(item.bookedFor);
          const bookedDate = date.getDate();
          const bookedYear = date.getFullYear();
          const bookedMonth = date.getMonth();
          const now = new Date();
          const nowDate = now.getDate();
          const nowYear = now.getFullYear();
          const nowMonth = now.getMonth();

          if (
            bookedDate === nowDate &&
            bookedYear === nowYear &&
            bookedMonth === nowMonth
          )
            return true;
          else return false;
        })
        .filter((item) => item.booked)
        .sort((a, b) => {
          return a.bookedFor - b.bookedFor;
        });
      dispatch(appointmentLoaded(appointments));
    } catch (e) {
      console.log(e);
      dispatch(errorFetchingAppointments(e));
    }
  };
};

export const FetchAllAppointments = (docId, date) => {
  return async (dispatch) => {
    const data = {
      docId,
      date,
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    dispatch(startAppointmentLoadingAll());
    try {
      const req = await axios.post(
        `${Host}/doctors/appointment/next`,
        data,
        config,
      );
      const response = req.data;
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      let appointments = response.data.appointments
        .filter((item) => item.booked)
        .reduce((acc, cur) => {
          const date = new Date(cur.bookedFor).getDate();
          if (!acc[date]) {
            acc[date] = [];
          }
          // if (cur.booked)
          acc[date].push(cur);
          return acc;
        }, []);

      // console.log(appointments);
      dispatch(appointmentLoadedAll(appointments));
    } catch (e) {
      console.log(e);
      dispatch(errorFetchingAllAppointments(e));
    }
  };
};

export const getSpecialty = (pageNo = 0, size = 60) => {
  return async (dispatch) => {
    const data = {
      pageNo,
      size,
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    dispatch(specialtyLoading());
    try {
      const req = await axios.post(
        `${Host}/patient/specialty/get`,
        data,
        config,
      );
      let response = req.data.data;
      // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', req);
      // response = response.map((item) => item.name);
      // console.log(response);
      dispatch(specialtyLoaded(response));
    } catch (e) {
      console.log(e);
      dispatch(specialtyError(e));
    }
  };
};
const SAVE_USER = 'SAVE_USER';

const saveNewUser = (data, type) => {
  return {
    type: SAVE_USER,
    userData: data,
    userType: type.localeCompare('doctor') === 0,
  };
};
export const UpdateDoctorProfile =
  (data, callback = () => {}, errorCallback = () => {}) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const dataObject = JSON.stringify(data);
    dispatch(updatingDoctorProfile());
    try {
      const response = await axios.post(
        `${Host}/doctors/profile/update`,
        dataObject,
        config,
      );
      console.log({ response });
      if (response) {
        dispatch(updatedDoctorProfile());
        const responseData = response.data.data;
        const _data = {
          id: responseData._id,
          name: responseData.basic.name,
          email: responseData.email,
          phone: responseData.phone,
          ...responseData,
        };
        dispatch(saveNewUser(_data, 'doctor'));
        dispatch(saveDoc(response.data.data));
        callback(response.data.data);
      } else {
        errorCallback(response);
      }
    } catch (e) {
      console.log('error ');
      Object.keys(e).forEach((val) => {
        console.log(val, ' : ', e[val]);
      });
      dispatch(updatingDoctorError(e));
      errorCallback(e);
    }
  };

export const GetRecentPatient = (docId) => (dispatch) => {
  dispatch(gettingRecentPatient());
  axios
    .get(`${Host}/doctors/recentpatients/${docId}`)
    .then((response) => {
      // console.log(response, "..........response")
      dispatch(gotRecentPatients(response.data.data));
    })
    .catch((e) => {
      console.log(e, '..........responserrrrrrrrrrrrrrrrrrrrrrre');
      dispatch(gettingRecentPatientError(e));
    });
};

/**
 * ========================= Upload profile picture ===========================
 */
const UPLOADING_IMAGE = 'UPLOADING_IMAGE';
const UPLOADED_IMAGE = 'UPLOADED_IMAGE';
const ERROR_UPLOADING_IMAGE = 'ERROR_UPLOADING_IMAGE';

const startUploadingImage = () => {
  return {
    type: UPLOADING_IMAGE,
  };
};
const uploadedImage = () => {
  return {
    type: UPLOADED_IMAGE,
  };
};
const errorUploadingImage = (e) => {
  return {
    type: ERROR_UPLOADING_IMAGE,
    payload: e,
  };
};

export const UploadProfilePic = (
  id,
  ImageData,
  success = () => {},
  failure = () => {},
) => {
  return (dispatch) => {
    dispatch(startUploadingImage());
    dispatch(startLoading());
    const Image = {
      uri: ImageData.uri,
      type: ImageData.type,
      name: ImageData.fileName,
    };
    const data = new FormData();
    data.append('image', Image);
    data.append('id', id);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${Host}/doctors/upload/image`, data, config)
      .then((responseStatus) => {
        dispatch(uploadedImage());
        success();
      })
      .catch((err) => {
        failure();
        dispatch(errorUploadingImage(err));
      });
  };
};

/**
 * ========================= Upload profile picture END===========================
 */
/**
 * ========================= Upload Signature START===========================
 */

export const UploadSignature = (
  id,
  ImageData,
  success = () => {},
  failure = () => {},
) => {
  return (dispatch) => {
    dispatch(startUploadingImage());
    dispatch(startLoading());
    const Image = {
      uri: ImageData.uri,
      type: ImageData.type,
      name: ImageData.fileName,
    };
    const data = new FormData();
    data.append('image', Image);
    data.append('id', id);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${Host}/doctors/upload/document`, data, config)
      .then((responseStatus) => {
        dispatch(uploadedImage());
        success({
          signature: responseStatus.data.data.document,
          id: responseStatus.data.data._id,
        });
      })
      .catch((err) => {
        console.log('error ', err);
        failure(err);
        dispatch(errorUploadingImage(err));
      });
  };
};

/**
 * ========================= Upload Signature END===========================
 */
/**
 * ========================= Upload Video START===========================
 */

export const UploadVideo = (
  id,
  ImageData,
  success = () => {},
  failure = () => {},
) => {
  return (dispatch) => {
    dispatch(startUploadingImage());
    dispatch(startLoading());
    const Image = {
      uri: ImageData.uri,
      type: 'video/mp4',
      name: `${new Date().getTime()}.mp4`,
    };

    // console.log(Image, 'Image');
    const data = new FormData();
    data.append('image', Image);
    data.append('id', id);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${Host}/doctors/upload/document`, data, config)
      .then((responseStatus) => {
        // console.log(responseStatus, 'responseStatus');
        dispatch(uploadedImage());
        success({
          video: responseStatus.data.data.document,
          id: responseStatus.data.data._id,
        });
      })
      .catch((err) => {
        console.log('error ', err.response.data);
        failure(err);
        dispatch(errorUploadingImage(err));
      });
  };
};

/**
 * ========================= Upload Video END===========================
 */

/**
 * ========================= Doctor block===========================
 */

const BLOCK_DOCTOR_LOADING = 'BLOCK_DOCTOR_LOADING';
const DOCTOR_BLOCKED = 'DOCTOR_BLOCKED';
const BLOCK_DOCTOR_ERROR = 'BLOCK_DOCTOR_ERROR';

const blockingDoctor = () => {
  return {
    type: BLOCK_DOCTOR_LOADING,
  };
};

const doctorBlocked = () => {
  return {
    type: DOCTOR_BLOCKED,
  };
};

const blockingDoctorError = (e) => {
  return {
    type: BLOCK_DOCTOR_ERROR,
    payload: e,
  };
};

export const BlockDoctor = (id, callback = () => {}, error = () => {}) => {
  return (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(blockingDoctor());
    axios
      .post(`${Host}/doctors/toggleblock`, { id }, config)
      .then((response) => {
        dispatch(doctorBlocked());
        // console.log(response.data.data, 'blocked??????????');
        dispatch(GetDoctorProfile(id));

        // dispatch(saveDoc(response.data.data));
        callback();
      })
      .catch((e) => {
        // console.log("error", e)
        dispatch(blockingDoctorError(e));
        error();
      });
  };
};

/**
 * ========================= Doctor block END ===========================
 */

/**
 * ========================= forNow ACTION for Onboarding ===========================
 */
const SET_FOR_NOW = 'SET_FOR_NOW';
const setForNow = (forNow) => ({
  type: SET_FOR_NOW,
  payload: forNow,
});
export const SetForNow =
  (forNow, callBack = () => {}) =>
  (dispatch) => {
    dispatch(setForNow(forNow));
    callBack();
  };

/**
 * ========================= forNow ACTION for Onboarding  END ===========================
 */

/**
 *  Clinic Actions
 */
const ADDING_CLINIC = 'ADDING_CLINIC';
const ADD_CLINIC = 'ADD_CLINIC';

const FETCHED_CLINICS = 'FETCHED CLINICS';
const GETTING_CLINICS = 'GETTING CLINICS';

const UPDATING_CLINICS = 'UPDATING_CLINICS';
const UPDATED_CLINICS = 'UPDATED_CLINICS';

const DELETING_CLINICS = 'DELETING_CLINICS';
const DELETED_CLINICS = 'DELETED_CLINICS';

const gettingClinic = (status) => {
  return {
    type: GETTING_CLINICS,
    payload: status,
  };
};
const doneGettingClinic = (clinics) => {
  return {
    type: FETCHED_CLINICS,
    payload: clinics,
  };
};

const addingClinic = (status) => ({
  type: ADDING_CLINIC,
  payload: status,
});
const addClinics = (clinic) => {
  return {
    type: ADD_CLINIC,
    payload: clinic,
  };
};

const updatingClinic = () => ({
  type: UPDATING_CLINICS,
});
const updatedClinic = (clinics) => ({
  type: UPDATED_CLINICS,
  payload: clinics,
});

const deletingClinic = () => ({
  type: DELETING_CLINICS,
});
const deletedClinic = (clinics) => ({
  type: DELETED_CLINICS,
  payload: clinics,
});

export const GetClinics = (metaId, success = () => {}) => {
  return async (dispatch) => {
    try {
      dispatch(gettingClinic(true));
      const res = await axios.get(`${Host}/clinic/bydoctor/${metaId}`);
      if (res.data.status) {
        dispatch(doneGettingClinic(res.data.data));
      } else {
        throw new Error('Error server response');
      }
    } catch (e) {
      console.log(e);
      dispatch(gettingClinic(false));
    }
  };
};
export const AddClinics = (data, success = () => {}) => {
  return async (dispatch) => {
    try {
      dispatch(addingClinic(true));
      const config = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      // console.log({ data });
      return await axios
        .post(`${Host}/clinic/add`, data, config)
        .then((res) => {
          // console.log({ res });
          dispatch(addClinics(res.data.data));
          success();
        })
        .catch((err) => {
          // console.log({ err: err.response.data });
          throw new Error('Error server response');
        });
    } catch (e) {
      console.log(e);
      dispatch(addingClinic(false));
    }
  };
};
export const UpdateClinic = () => {
  return async () => {};
};
export const DeleteClinic = () => {
  return async () => {};
};

/**
 * *******************************  Availibity Actions ******************************************
 */

export const SaveSlots =
  (payload, success = () => {}, error = () => {}) =>
  (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(savingSlots(true));
    axios
      .post(`${Host}/doctors/saveslots`, payload, config)
      .then((res) => {
        // console.log(res, '..........')
        dispatch(savingSlots(false));
        success(res.data.data);
      })
      .catch((e) => {
        dispatch(setErrorInSlots(e));
        error(e);
      });
  };

/**
 * *********************** Team Actions ******************************
 */

const ADD_TEAM = 'ADD TEAM';
const GETTING_TEAMS = 'GETTING TEAMS';
const SAVE_TEAMS = 'SAVE TEAMS';
const SENDING_REQUEST = 'SENDING REQUEST';
const PENDING_REQUEST = 'PENDING REQUESTS';
const SENT_REQUEST = 'SENT REQUESTS';
const GETTING_PENDING_REQUESTS = 'GETTING PENDING REQUESTS';

const gettingTeams = (bool) => {
  return {
    type: GETTING_TEAMS,
    payload: bool,
  };
};
const gotSentRequests = (data) => {
  return {
    type: SENT_REQUEST,
    payload: data,
  };
};
const gotRequests = (bool) => {
  return {
    type: PENDING_REQUEST,
    payload: bool,
  };
};
const gettingRequests = (bool) => {
  return {
    type: GETTING_PENDING_REQUESTS,
    payload: bool,
  };
};
const sendingRequest = (bool) => {
  return {
    type: SENDING_REQUEST,
    payload: bool,
  };
};
const doneGettingTeams = (teams) => {
  return {
    type: SAVE_TEAMS,
    payload: teams,
  };
};
const addTeam = (team) => {
  return {
    type: ADD_TEAM,
    payload: team,
  };
};

export const GetTeams = (id) => (dispatch) => {
  dispatch(gettingTeams(true));
  axios
    .get(`${Host}/doctors/team/get/${id}`)
    .then((res) => {
      dispatch(doneGettingTeams(res.data.teams));
    })
    .catch((e) => {
      dispatch(gettingTeams(false));
    });
};
export const GetSentRequests = (id) => (dispatch) => {
  dispatch(gettingRequests(true));
  axios
    .get(`${Host}/doctors/team/getsendingreq/${id}`)
    .then((res) => {
      // console.log(res, "pppppppppppppppppppppppppppppppppp")
      dispatch(gotSentRequests(res.data.sendingReq));
    })
    .catch((e) => {
      dispatch(gettingRequests(false));
    });
};
export const GetPendingRequests = (id) => (dispatch) => {
  dispatch(gettingRequests(true));
  axios
    .get(`${Host}/doctors/team/getpendingreq/${id}`)
    .then((res) => {
      // console.log(res, "pppppppppppppppppppppppppppppppppp")
      dispatch(gotRequests(res.data.pending));
    })
    .catch((e) => {
      dispatch(gettingRequests(false));
    });
};

export const AddTeam = (data) => (dispatch) => {
  const config = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  dispatch(gettingTeams(true));
  axios
    .post(`${Host}/doctors/team/create`, data, config)
    .then((res) => {
      dispatch(GetTeams(data.practiceid));
    })
    .catch((e) => {
      console.log(e, '.............ee');
      dispatch(gettingTeams(false));
    });
};

export const InviteDoctor = (data) => (dispatch) => {
  const config = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  dispatch(sendingRequest(true));
  axios
    .post(`${Host}/doctors/team/sendrequest`, data, config)
    .then((res) => {
      // console.log(res, '.........resss');
      dispatch(GetSentRequests(data.practiseid));
      dispatch(sendingRequest(false));
      Alert.alert('Success', 'Invite has been successfuly sent!');
    })
    .catch((e) => {
      console.log(e, '.............ee');
      dispatch(sendingRequest(false));
    });
};

export const AcceptRequest = (data) => (dispatch) => {
  const config = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  dispatch(sendingRequest(true));
  axios
    .post(`${Host}/doctors/team/acceptrequest`, data, config)
    .then((res) => {
      // console.log(res, ".........resss")
      dispatch(sendingRequest(false));
      dispatch(GetPendingRequests(data.practiseid));
    })
    .catch((e) => {
      console.log(e, '.............ee');
      dispatch(sendingRequest(false));
    });
};

export const SendInvitation = (data) => (dispatch) => {
  const config = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  dispatch(sendingRequest(true));

  axios
    .post(`${Host}/doctors/team/invite`, data, config)
    .then((res) => {
      // console.log(res.data, 'kldsfjsdklfjsdklfj');
    })
    .catch((err) => console.log(err));
};

/*
 * *************************** Staff **********************
 */

const GOT_STAFF = 'GOT STAFF';
const FETCHING_STAFF = 'FETCHING STAFF';

const saveStaff = (staff) => {
  return {
    type: GOT_STAFF,
    payload: staff,
  };
};

const fetchingStaff = (staff) => {
  return {
    type: FETCHING_STAFF,
    payload: staff,
  };
};

export const GetStaffMembers = (_id) => (dispatch) => {
  const config = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  dispatch(fetchingStaff(true));

  axios
    .get(`${Host}/staff/getmember/${_id}`, config)
    .then((res) => {
      // console.log(res, '99999999999999999999999999999999999999999')
      dispatch(saveStaff(res.data.data));
    })
    .catch((err) => {
      fetchingStaff(false);
      console.log('error');
    });
};

export const UpdateStaffMemberPermissions = (data) => (dispatch) => {
  const config = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  dispatch(fetchingStaff(true));
  axios
    .post(`${Host}/staff/updatepermission`, data, config)
    .then((res) => {
      dispatch(GetStaffMembers(data.doctor));
      // console.log(res, '333p333333333333333333333333333333')
      //  dispatch(saveStaff(res.data.data))
    })
    .catch((err) => {
      fetchingStaff(false);
      console.log('error');
    });
};

export const AddRecentPatient = (data, successCallback, errorCallback) => {
  return (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    console.log('adding recent patient');
    axios
      .post(`${Host}/doctors/addrecentpatient`, data, config)
      .then((result) => {
        // console.log({ result }, '{{{{{{{{Result________________}}}}}}}}-')
        if (result.data.status) {
          successCallback();
          // dispatch(haveingError('FakeError'));
        } else {
          errorCallback();
          dispatch(haveingError(result.data.message));
        }
      })
      .catch((err) => {
        console.log('{{___________________}}-', { err });
        errorCallback();
        dispatch(haveingError(err.message));
      });
  };
};

export const ManuallyAddRecentPatient = (
  data,
  successCallback,
  errorCallback,
) => {
  return (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*',
    };
    dispatch(startLoading());
    console.log('start loading');
    // console.log(data, "%%%%%%%%%%%%%%%%%%%%%%")
    axios
      .post(`${Host}/patient/register`, data, config)
      .then((result) => {
        // console.log(result, 'Result________________-');
        if (result.data.status) {
          dispatch(
            AddRecentPatient(
              { practise: data.doctor, patient: result.data.data._id },
              successCallback,
              errorCallback,
            ),
          );
          console.log('done');
        } else {
          errorCallback();
          dispatch(haveingError(result.data.message));
        }
      })
      .catch((err) => {
        console.log(err, 'err_____________');
        dispatch(haveingError(err.message));
        errorCallback(err.message);
      });
  };
};

export const AddNotification =
  (data, cb = () => {}) =>
  (dispatch) => {
    //data:{metaId,medicines}
    //dispatch(startLoading())
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    //dispatch(gettingSurguries(true));
    axios
      .post(`${Host}/doctors/notifications/add`, data, config)
      .then((res) => {
        // console.log({ res }, 'Diagnosis');
        cb(null, res.data.data);
        // dispatch(GetSurguries(data.id));
        //dispatch(addSurguries(data.metaId));
      })
      .catch((e) => {
        console.log({ e });
        cb(true, e);
        // dispatch(havingError())
        // dispatch(gettingSurguries(false));
      });
  };

/** -------------------------HOSPITAL API -------------------------- */

export const GetHospitals =
  (cb = () => {}) =>
  (dispatch) => {
    axios
      .get(`${Host}/hospitals`)
      .then((res) => cb(null, res.data.data))
      .catch((e) => cb(true, e));
  };

export const GetHospitalsOfDoctor =
  (data, cb = () => {}) =>
  (dispatch) => {
    axios
      .post(`${Host}/hospitals/doctor`, data)
      .then((res) => {
        // console.log({ search: res });
        cb(null, res.data.data);
      })
      .catch((e) => cb(true, e));
  };

export const AddHospital =
  (data, cb = () => {}) =>
  (dispatch) => {
    axios
      .post(`${Host}/hospitals`, data)
      .then((res) => {
        // console.log(res);
        cb(null, res.data.data);
      })
      .catch((e) => cb(true, e));
  };
