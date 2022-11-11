import axios from 'axios';
import { Alert } from 'react-native';
import { Host } from '../../utils/connection';
import moment from 'moment';
const SAVE = 'SAVE_PATIENT_INFO';
const ERRORS = 'HAVEING_ERROR_IN_PATIENT_ACCOUNT_REDUCER';
const LOADING = 'START_PATIENT_ACCOUNT_LOADING';
const RESET = 'RESET_PATIENT_ACCOUNT_REDUCER';
const SAVE_FEV_DOC = 'SAVE_PATIENT_FEV_DOC';
const PROFILE_PIC_UPLOADED = 'PROFILE_PIC_UPLOADED';
const START_APPOINTMENT_SLOT_LOADING = 'START_APPOINTMENT_SLOT_LOADING';
const APPOINTMENT_SLOT_LOADED = 'APPOINTMENT_SLOT_LOADED';
const APPOINTMENT_SLOT_ERROR = 'APPOINTMENT_SLOT_ERROR';
const BOOKING_APPOINTMENT = 'BOOKING_APPOINTMENT';
const BOOKED_APPOINTMENT = 'BOOKED_APPOINTMENT';
const ERROR_BOOKING_APPOINTMENT = 'ERROR_BOOKING_APPOINTMENT';

const RECORDS_UPLOADING = 'RECORDS_UPLOADING';
const RECORDS_UPLOADED = 'RECORDS_UPLOADED';
const RECORDS_UPLOADING_ERROR = 'RECORDS_UPLOADING_ERROR';

const SAVE_TRANSACTIONS = 'SAVE TRANSACTIONS';
const ADD_TRANSACTIONS = 'ADD TRANSACTIONS';
// const CONTINUE_AS = 'CONTINUE_AS';
const CONTINUE_AS_OWNER = 'CONTINUE AS OWNER';
const SAVE_FAMILY_MEMBER_DETAILS = 'SAVE FAMILY MEMBER DETAILS';

// export const ContinueAs = (data) => (dispatch) => {
//   console.log('======================xxxxxxxxxxxxxxContinueAs', data);
//   dispatch({
//     type: 'CONTINUE_AS',
//     payload: data,
//   });
// };

export const ContinueAsOwner = (userDataId) => {
  return (dispatch) => {
    dispatch(
      GetPatientInfo(userDataId, null, (data) =>
        dispatch({
          type: 'CONTINUE_AS',
          payload: {
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age,
            sex: data.sex,
          },
        }),
      ),
    );
    dispatch({
      type: CONTINUE_AS_OWNER,
      payload: null,
    });
  };
};

export const SaveTransactions = (data) => ({
  type: SAVE_TRANSACTIONS,
  payload: data,
});

export const addTransactions = (data) => ({
  type: ADD_TRANSACTIONS,
  payload: data,
});
export const GetTransactions = (id, start = () => {}, stop = () => {}) => {
  return (dispatch) => {
    //dispatch(startLoading());
    start();
    dispatch(startLoading());
    axios
      .get(`${Host}/patient/transactions/get/${id}`)
      .then((response) => {
        // console.log(response);
        dispatch(SaveTransactions(response.data.data));
        // console.log(response.data.data, "//////////////////////////////////")
        stop();
      })
      .catch((err) => {
        dispatch(havingError());
        //  dispatch(havingError(err));
        stop();
      });
  };
};

export const AddTransactions = (
  data,
  success = () => {},
  failure = () => {},
) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios
      .post(`${Host}/patient/transactions/add`, data)
      .then((response) => {
        dispatch(addTransactions(response.data.data));
        success();
      })
      .catch((err) => {
        dispatch(havingError());
        failure();
      });
  };
};

export const saveUserAccount = (data) => {
  return {
    type: SAVE,
    payload: data,
  };
};

export const saveFamilyMemberDetails = (data) => {
  // console.log('============>>>>>>>>>>>>details', data);
  return {
    type: SAVE_FAMILY_MEMBER_DETAILS,
    payload: data,
  };
};

const saveFevDoc = (data) => {
  return {
    type: SAVE_FEV_DOC,
    payload: data,
  };
};

export const startLoading = () => {
  return {
    type: LOADING,
  };
};

export const havingError = (err) => {
  return {
    type: ERRORS,
    payload: err,
  };
};

export const profilePicUploaded = (data) => {
  return {
    type: PROFILE_PIC_UPLOADED,
    payload: data,
  };
};

const startAppointmentSlotLoading = () => {
  return {
    type: START_APPOINTMENT_SLOT_LOADING,
  };
};
const appointmentSlotLoaded = (appointmentSlot) => {
  return {
    type: APPOINTMENT_SLOT_LOADED,
    payload: appointmentSlot,
  };
};
const appointmentSlotError = (error) => {
  return {
    type: APPOINTMENT_SLOT_ERROR,
    payload: error,
  };
};

const bookingAppointment = () => {
  return {
    type: BOOKING_APPOINTMENT,
  };
};
const bookedAppointment = (data) => {
  return {
    type: BOOKED_APPOINTMENT,
    payload: data,
  };
};
const errorBookingAppointment = (err) => {
  return {
    type: ERROR_BOOKING_APPOINTMENT,
    payload: err,
  };
};

const uploadingRecords = () => {
  return {
    type: RECORDS_UPLOADING,
  };
};

const uploadedRecords = (data) => {
  return {
    type: RECORDS_UPLOADED,
    payload: data,
  };
};
const errorUploadingRecords = (err) => {
  return {
    type: RECORDS_UPLOADING_ERROR,
    payload: err,
  };
};
/**
 *  =============================== Allergy actions ====================================
 */

const ADD_ALLERY = 'ADD ALLERY';
const FETCHED_ALLERGY = 'FETCHED ALLERGY';
const GETTING_ALLERGY = 'GETTING ALLERGY';

const gettingAllery = (bool) => {
  return {
    type: GETTING_ALLERGY,
    payload: bool,
  };
};
const doneGettingAllery = (allergy) => {
  return {
    type: FETCHED_ALLERGY,
    payload: allergy,
  };
};
const addAllergies = (allergy) => {
  return {
    type: ADD_ALLERY,
    payload: allergy,
  };
};

export const GetAllergies = (metaId) => (dispatch) => {
  dispatch(gettingAllery(true));
  //dispatch(startLoading())
  axios
    .get(`${Host}/patient/allergies/get/${metaId}`)
    .then((res) => {
      // console.log(res);
      dispatch(doneGettingAllery(res.data.data));
    })
    .catch((e) => {
      dispatch(gettingAllery(false));
    });
};

export const AddAllergies = (data) => (dispatch) => {
  //data:{metaId,medicines}
  //dispatch(startLoading())
  const config = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  dispatch(gettingAllery(true));
  dispatch(startLoading());
  axios
    .post(`${Host}/patient/allergies/add`, data, config)
    .then((res) => {
      //dispatch(addAllergies());
      dispatch(GetAllergies(data.id));
    })
    .catch((e) => {
      dispatch(havingError());
      dispatch(gettingAllery(false));
    });
};
export const EditAllergies = (data) => (dispatch) => {
  //data:{metaId,medicines}
  dispatch(startLoading());
  const config = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  dispatch(gettingSurguries(true));
  axios
    .post(`${Host}/patient/allergies/edit`, data, config)
    .then((res) => {
      dispatch(GetAllergies(data.id));
      // console.log(res.data.data, ':::::::::::::::::::::::::::::::');
      //dispatch(addSurguries(data.metaId));
    })
    .catch((e) => {
      dispatch(havingError());
      dispatch(gettingSurguries(false));
      console.log(e.response.data, 'ERRRORRRRRRRRRRRRRRRRRRR');
    });
};

export const DeleteAllergies = (data) => (dispatch) => {
  //dispatch(gettingRecords());
  dispatch(startLoading());
  axios
    .get(`${Host}/patient/allergies/delete/${data.id}/${data.surgery}`)
    .then((res) => {
      if (res.data.status) {
        dispatch(GetAllergies(data.id));
      }
    })
    .catch((e) => {
      dispatch(havingError(e));
      dispatch(errorGettingRecords(e));
    });
};
/**
 *  =============================== Surguries actions ====================================
 */

const ADD_SURGURIES = 'ADD SURGURIES';
const FETCHED_SURGURIES = 'FETCHED SURGURIES';
const GETTING_SURGURIES = 'GETTING SURGURIES';

const gettingSurguries = (bool) => {
  return {
    type: GETTING_SURGURIES,
    payload: bool,
  };
};
const doneGettingSurguries = (allergy) => {
  return {
    type: FETCHED_SURGURIES,
    payload: allergy,
  };
};
const addSurguries = (allergy) => {
  return {
    type: ADD_SURGURIES,
    payload: allergy,
  };
};

export const DeleteSurguries = (data) => (dispatch) => {
  //dispatch(gettingRecords());
  dispatch(startLoading());
  axios
    .get(`${Host}/patient/surgeries/delete/${data.id}/${data.surgery}`)
    .then((res) => {
      if (res.data.status) {
        dispatch(GetSurguries(data.id));
      }
    })
    .catch((e) => {
      dispatch(havingError(e));
      dispatch(errorGettingRecords(e));
    });
};
export const GetSurguries = (metaId) => (dispatch) => {
  dispatch(gettingSurguries(true));
  //dispatch(startLoading())
  axios
    .get(`${Host}/patient/surgeries/get/${metaId}`)
    .then((res) => {
      dispatch(doneGettingSurguries(res.data.data));
    })
    .catch((e) => {
      dispatch(gettingSurguries(false));
    });
};
export const EditSurguries = (data) => (dispatch) => {
  //data:{metaId,medicines}
  dispatch(startLoading());
  const config = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  dispatch(gettingSurguries(true));
  axios
    .post(`${Host}/patient/surgeries/edit`, data, config)
    .then((res) => {
      dispatch(GetSurguries(data.id));
      //dispatch(addSurguries(data.metaId));
    })
    .catch((e) => {
      dispatch(havingError());
      dispatch(gettingSurguries(false));
    });
};
export const AddSurguries = (data) => (dispatch) => {
  //data:{metaId,medicines}
  dispatch(startLoading());
  const config = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  dispatch(gettingSurguries(true));
  axios
    .post(`${Host}/patient/surgeries/add`, data, config)
    .then((res) => {
      dispatch(GetSurguries(data.id));
      //dispatch(addSurguries(data.metaId));
    })
    .catch((e) => {
      dispatch(havingError());
      dispatch(gettingSurguries(false));
    });
};
/**
 *  =============================== medicine actions ====================================
 */

const ADD_MEDICINE_LOADING = 'ADD_MEDICINE_LOADING';
const MEDICINE_ADDED = 'MEDICINE_ADDED';
const ADD_MEDICINE_ERROR = 'ADD_MEDICINE_ERROR';
const GETTING_MEDICINE = 'GETTING_MEDICINE';
const DONE_GETTING_MEDICINE = 'DONE_GETTING_MEDICINE';
const ERROR_GETTING_MEDICINE = 'ERROR_GETTING_MEDICINE';
const DONE_GETTING_AVAILABLE_MEDICINE = 'DONE GETTING AVAILABLE MEDICINE';

const addingMedicine = () => {
  return {
    type: ADD_MEDICINE_LOADING,
  };
};
const medicineAdded = () => {
  return {
    type: MEDICINE_ADDED,
  };
};
const addingMedicineError = (e) => {
  return {
    type: ADD_MEDICINE_ERROR,
    payload: e,
  };
};
const gettingMedicine = () => {
  return {
    type: GETTING_MEDICINE,
  };
};
const doneGettingMedicine = (medicines) => {
  return {
    type: DONE_GETTING_MEDICINE,
    payload: medicines,
  };
};
const errorGettingMedicine = (e) => {
  return {
    type: ERROR_GETTING_MEDICINE,
    payload: e,
  };
};

const gotAvailableMed = (medicines) => {
  return {
    type: DONE_GETTING_AVAILABLE_MEDICINE,
    payload: medicines,
  };
};

export const AddDiagnosis =
  (data, onSuccess = () => {}, onError = () => {}) =>
  (dispatch) => {
    //data:{metaId,medicines}
    //dispatch(startLoading())
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    //dispatch(gettingSurguries(true));
    axios
      .post(`${Host}/doctors/diagnosis/add`, data, config)
      .then((res) => {
        // console.log(res.data, 'Diagnosis==========1234567890sxxxxxxxxxxxx');
        onSuccess();
        // dispatch(GetSurguries(data.id));
        //dispatch(addSurguries(data.metaId));
      })
      .catch((e) => {
        console.log({ e });
        onError();
        // dispatch(havingError())
        // dispatch(gettingSurguries(false));
      });
  };

export const GetDiagnosis =
  (id, onSuccess = () => {}, onError = () => {}) =>
  (dispatch) => {
    //data:{metaId,medicines}
    //dispatch(startLoading())
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    //dispatch(gettingSurguries(true));
    axios
      .get(`${Host}/doctors/diagnosis/get/${id}`)
      .then((res) => {
        // console.log({ res }, 'Diagnosis');
        onSuccess(res.data.data);
        // dispatch(GetSurguries(data.id));
        //dispatch(addSurguries(data.metaId));
      })
      .catch((e) => {
        console.log({ e });
        onError();
        // dispatch(havingError())
        // dispatch(gettingSurguries(false));
      });
  };

export const GetPatientDiagnosis =
  (id, onSuccess = () => {}, onError = () => {}) =>
  (dispatch) => {
    // console.log(id);
    //data:{metaId,medicines}
    //dispatch(startLoading())
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    //dispatch(gettingSurguries(true));
    axios
      .get(`${Host}/patient/diagnosis/get/${id}`)
      .then((res) => {
        onSuccess(res.data.data);
        // dispatch(GetSurguries(data.id));
        //dispatch(addSurguries(data.metaId));
      })
      .catch((e) => {
        console.log('=============error', e.response);
        onError();
        // dispatch(havingError())
        // dispatch(gettingSurguries(false));
      });
  };

export const GetNotification =
  (patient, cb = () => {}) =>
  (dispatch) => {
    //data:{metaId,medicines}
    //dispatch(startLoading())
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    //dispatch(gettingSurguries(true));
    axios
      .get(`${Host}/doctors/notifications/get/${patient}`, config)
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

export const DeleteNotification =
  (id, cb = () => {}) =>
  (dispatch) => {
    //data:{metaId,medicines}
    //dispatch(startLoading())
    // console.log('===========>>>>>>>>>>', id);
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    //dispatch(gettingSurguries(true));
    axios
      .delete(`${Host}/doctors/notifications/delete/${id}`, config)
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

export const GetMedicine = (metaId) => (dispatch) => {
  const config = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  dispatch(gettingMedicine());
  // dispatch(startLoading())
  axios
    .get(`${Host}/medicine/get/${metaId}`, config)
    .then((res) => {
      if (res.data.status) {
        dispatch(doneGettingMedicine(res.data.data));
      } else {
        throw new Error('Internal error.Try again!!');
      }
    })
    .catch((e) => {
      dispatch(havingError());
      dispatch(errorGettingMedicine(e));
    });
};

export const GetAvailableMedicines =
  (search, sucess = () => {}) =>
  (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    //dispatch(gettingMedicine());
    axios
      .get(
        `https://mera-rx.herokuapp.com/api/medicines/get-sugesstions?input=${search}`,
        config,
      )
      .then((res) => {
        // console.log(res)
        if (res.data) {
          sucess(res.data.data);
          //  dispatch(gotAvailableMed(res.data.data));
        } else {
          throw new Error('Internal error.Try again!!');
        }
      })
      .catch((e) => {
        dispatch(errorGettingMedicine(e));
      });
  };
export const AddMedicine =
  (data, success = () => {}) =>
  (dispatch) => {
    //data:{metaId,medicines}
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(startLoading());
    dispatch(addingMedicine());
    axios
      .post(`${Host}/medicine/addbypatient`, data, config)
      .then((res) => {
        if (res.data.status) {
          dispatch(medicineAdded());
          success(res.data.data);
          dispatch(GetMedicine(data.metaId));
        } else {
          throw new Error('Internal error.Try again!!');
        }
      })
      .catch((e) => {
        dispatch(havingError());
        dispatch(addingMedicineError(e));
      });
  };

export const EditMedicine =
  (data, success = () => {}) =>
  (dispatch) => {
    //data:{metaId,medicines}
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(startLoading());
    dispatch(addingMedicine());
    axios
      .post(`${Host}/medicine/edit`, data, config)
      .then((res) => {
        // console.log(res);
        if (res.data.status) {
          dispatch(medicineAdded());
          success();
          dispatch(GetMedicine(data.metaId));
        } else {
          throw new Error('Internal error.Try again!!');
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(havingError());
        dispatch(addingMedicineError(e));
      });
  };

export const DeleteMedicine =
  (data, meta, success = () => {}) =>
  (dispatch) => {
    //data:{metaId,medicines}
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(startLoading());
    //dispatch(addingMedicine());
    axios
      .post(`${Host}/medicine/delete`, data, config)
      .then((res) => {
        if (res.data.status) {
          // console.log(res);
          // dispatch(medicineAdded());
          success();
          dispatch(GetMedicine(meta._id));
        } else {
          throw new Error('Internal error.Try again!!');
        }
      })
      .catch((e) => {
        dispatch(havingError());
        dispatch(addingMedicineError(e));
      });
  };
/**
 *   END MEDICINE ACTIONS
 */

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

export const GetAppointments = (patientId) => (dispatch) => {
  dispatch(gettingAppointments());
  axios
    .get(`${Host}/patient/appointments/${patientId}`)
    .then((response) => {
      const { data, status } = response.data;
      if (status) {
        dispatch(gotAppointments(data));
      } else throw new Error('Internal Error!! Try again.');
    })
    .catch((e) => {
      dispatch(errorGettingAppointments(e));
    });
};

/**
 *  End Appointment list
 */

/**
 *  Recent doctor Action
 */

const GETTING_RECENT_DOCTORS = 'GETTING_RECENT_DOCTORS';
const GOT_RECENT_DOCTOR = 'GOT_RECENT_DOCTOR';
const ERROR_GETTING_RECENT_DOCTOR = 'ERROR_GETTING_RECENT_DOCTOR';

const gettingRecentDoctor = () => ({
  type: GETTING_RECENT_DOCTORS,
});
const gotRecentDoctor = (recentDoctors) => ({
  type: GOT_RECENT_DOCTOR,
  payload: recentDoctors,
});
const errorGettingRecentDoctor = (e) => ({
  type: ERROR_GETTING_RECENT_DOCTOR,
  payload: e,
});

export const GetRecentDoctor = (patientId) => (dispatch) => {
  dispatch(gettingRecentDoctor());
  axios
    .get(`${Host}/patient/recentdoctors/${patientId}`)
    .then((res) => {
      const { status, data } = res.data;
      if (status) dispatch(gotRecentDoctor(data));
      else throw new Error('Internal Error!!');
    })
    .catch((e) => {
      dispatch(errorGettingRecentDoctor(e));
    });
};

/**
 *  End Recent doctor action
 */

export const resetPatientAccountReducer = () => {
  return {
    type: RESET,
  };
};

export const GetPatientInfo = (
  id,
  doctorToPatient,
  success = () => {},
  failure = () => {},
) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios
      .get(`${Host}/patient/getfullinfo/${id}`)
      .then((result) => {
        if (result.data.status) {
          // console.log(result, '...........daata saved');
          let { data } = result.data;
          data.doctorToPatient = doctorToPatient ? true : false;
          if (typeof doctorToPatient === 'string') {
            const appointments = data.appointments.filter((d, i) => {
              if (d.doctor && d.doctor._id === doctorToPatient) return d;
            });
            data.appointments = appointments;
          }
          //data.appo
          dispatch(saveUserAccount(data));
          success(data);
        } else {
          throw new Error('Internal Error!!');
        }
      })
      .catch((err) => {
        failure();
        dispatch(havingError(err));
      });
  };
};
export const GetFamilyMeberInfo = (raw, owner) => {
  return (dispatch) => {
    dispatch(startLoading());
    // console.log('=====================rawwwwwwwwwwwwwwwwwwwww', raw);
    //
    axios
      .get(`${Host}/patient/getfullinfo/${raw.id}`)
      .then((result) => {
        if (result.data.status) {
          let { data } = result.data;

          //data.appo

          dispatch({
            type: 'CONTINUE_AS',
            payload: {
              firstName: raw.firstName,
              lastName: raw.lastName,
              age: moment().diff(raw.birthdate, 'years').toString(),
              sex: raw.gender,
            },
          });
          dispatch(
            saveFamilyMemberDetails({
              isPatientFamilyMember: true,
              patientFamilyMemberDetails: { ...raw },
              patient: {
                height: data.height,
                weight: data.weight,
                fatMass: data.fatMass,
                temperature: data.temperature,
                oxygen: data.oxygen,
                // heartRate: patient?.meta?.heartRate,
                // bloodPressure: patient?.meta?.bloodPressure,
                respiration: data.respiration,
                bloodSugar: data.bloodSugar,
                meta: {
                  ...data.meta,
                  _id: owner.meta._id ? owner.meta._id : owner.meta,
                },
              },
            }),
          );
          // console.log(data, '...........@@@@@@@@@@@@@@daata saved');
        } else {
          throw new Error('Internal Error!!');
        }
      })
      .catch((err) => {
        console.log(err, '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        dispatch(havingError(err));
      });
  };
};
export const UpdateVitals = (response, userID, metaId, error = () => {}) => {
  return (dispatch) => {
    dispatch(startLoading());
    const _data = {
      id: userID,
      meta: metaId._id ? metaId._id : metaId,
      ...response,
    };
    axios
      .post(`${Host}/patient/medicalInfo/add`, _data)
      .then((result) => {
        if (result.data.status) {
          if (metaId._id) dispatch(GetPatientInfo(userID));
          else dispatch(GetFamilyMeberInfo({ id: userID }));
        }
      })
      .catch((err) => {
        error(err);
        console.log(err.response.data.message);
        dispatch(havingError(err));
      });
  };
};

export const GetFevDoc = (docId) => {
  return async (dispatch) => {
    const preAdd = {
      specialty: 788,
      city: 'New York',
      _id: docId,
    };

    await axios
      .post(`${Host}/doctors/search`, preAdd)
      .then((res) => {
        console.log('************** patientAccotioon **********');
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const AddFevDoc = (
  docId,
  patientId,
  success = () => {},
  error = () => {},
) => {
  return async (dispatch) => {
    const config = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const _data = {
      id: patientId,
      docId: docId,
    };
    // console.log({ _data });

    await axios
      .post(`${Host}/patient/favourite/add`, _data, config)
      .then((result) => {
        if (result.status) {
          console.log('Successfully Add your fev doctor.');
          GetPatientInfo(patientId);
          success();
          // Alert.alert("Doctor Added!","Added to Favourites Successfuly!")
        }
      })
      .catch((err) => {
        dispatch(havingError(err));
        console.log('error adding to fav', err.response.data);
        error();
      });
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
export const UpdateProfile = (
  profileData,
  patientId,
  success = () => {},
  error = () => {},
) => {
  return async (dispatch) => {
    const config = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const _data = {
      id: patientId,
      ...profileData,
    };

    await axios
      .post(`${Host}/patient/update`, _data, config)
      .then((result) => {
        if (result.status) {
          // alert('Successfully Updated Profile.');
          // console.log('result========>>>>>>>>>>', result);
          const data = result.data.data;
          const _data = {
            id: data._id,
            email: data.email,
            phone: data.phone,
            name: data.firstName === undefined ? 'No name' : data.firstName,
            ...data,
          };
          dispatch(saveNewUser(_data, 'patient'));
          dispatch(saveUserAccount(result.data.data));
          success(result.data.data);
          //GetPatientInfo(patientId);
        }
      })
      .catch((err) => {
        error(err);
        console.log(err, '.........errrr');
        dispatch(havingError(err));
      });
  };
};
export const UpdatePatient = (
  profileData,
  patientId,
  success = () => {},
  error = () => {},
) => {
  return async (dispatch) => {
    const config = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const _data = {
      id: patientId,
      ...profileData,
    };

    // console.log("in update patient", _data)
    await axios
      .post(`${Host}/patient/update`, _data, config)
      .then((result) => {
        if (result.status) {
          Alert.alert('Success!', "Successfully Updated Patient's Profile.");

          const data = result.data.data;
          const _data = {
            id: data._id,
            email: data.email,
            phone: data.phone,
            name: data.firstName === undefined ? 'No name' : data.firstName,
            ...data,
          };
          // console.log(data, "dslfjdslkfjfj")
          // console.log(data?.followUps)
          // dispatch(saveNewUser(_data, 'patient'));
          // dispatch(saveUserAccount(result.data.data));
          success(result.data.data);
          GetPatientInfo(patientId);
        }
      })
      .catch((err) => {
        error(err);
        console.log(err, '.........errrr');
        // dispatch(havingError(err));
      });
  };
};

export const RemoveFevDoc = (
  docId,
  patientId,
  success = () => {},
  error = () => {},
) => {
  return async (dispatch) => {
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const _data = {
      id: patientId,
      docId: docId,
    };

    await axios
      .post(`${Host}/patient/favourite/remove`, _data, config)
      .then((result) => {
        if (result.status) {
          console.log('removed');
          dispatch(GetPatientInfo(patientId));
          // Alert.alert("Doctor Removed!","Removed From Favourites Successfuly!")
          success();
        }
      })
      .catch((e) => {
        console.log(e);
        console.log('removed error');
        error();
      });
  };
};

/**
 *  Family member actions
 */

const SAVE_PATIENT_FAMILY_MEMBER = 'SAVE_PATIENT_FAMILY_MEMBER';
const GETTING_PATIENT_FAMILY_MEMBER = 'GETTING_PATIENT_FAMILY_MEMBER';
const ERROR_GETTING_PATIENT_FAMILY_MEMBER =
  'ERROR_GETTING_PATIENT_FAMILY_MEMBER';
const ADDING_PATIENT_FAMILY_MEMBER = 'ADDING_PATIENT_FAMILY_MEMBER';
const ADD_PATIENT_FAMILY_MEMBER = 'ADD_PATIENT_FAMILY_MEMBER';
const ERROR_ADDING_PATIENT_FAMILY_MEMBER = 'ERROR_ADDING_PATIENT_FAMILY_MEMBER';
const gettingFamilyMember = () => ({
  type: GETTING_PATIENT_FAMILY_MEMBER,
});
const saveFamilyMember = (data) => {
  return {
    type: SAVE_PATIENT_FAMILY_MEMBER,
    payload: data,
  };
};
const errorGettingFamilyMember = (err) => ({
  type: ERROR_GETTING_PATIENT_FAMILY_MEMBER,
  payload: err,
});
const addingPatientFamilyMember = () => ({
  type: ADDING_PATIENT_FAMILY_MEMBER,
});
const addPatientFamilyMember = (member) => ({
  type: ADD_PATIENT_FAMILY_MEMBER,
  payload: member,
});
const errorAddingFamilyMember = (err) => ({
  type: ERROR_ADDING_PATIENT_FAMILY_MEMBER,
  payload: err,
});

export const GetFamilyMember = (id, onSuccess = () => {}) => {
  return async (dispatch) => {
    try {
      dispatch(gettingFamilyMember());
      const config = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const _data = {
        metaId: id,
      };
      const res = await axios.post(`${Host}/patient/member/get`, _data, config);
      onSuccess(res.data.data.members);
      dispatch(saveFamilyMember(res.data.data.members));
    } catch (e) {
      dispatch(errorGettingFamilyMember(e));
    } finally {
    }
  };
};

export const getpatientFamily = (id) =>
  axios.get(`${Host}/patient/familyhistory/get/${id}`);

export const AddFamilyMember = (obj, success = () => {}, failed = () => {}) => {
  return async (dispatch) => {
    try {
      dispatch(addingPatientFamilyMember());

      const config = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const result = await axios.post(
        `${Host}/patient/register`,
        { ...obj, password: '#Sample@123' },
        config,
      );
      if (result.data.status) {
        const { _id, meta } = result.data.data;

        const res = await axios.post(
          `${Host}/patient/member/add`,
          { ...obj, id: _id, meta: meta },
          config,
        );
        // console.log('data====================add ', res.data.data);
        // console.log('status ', res.data.status);
        if (res.data.status) {
          dispatch(addPatientFamilyMember(res.data.data));
          success();
        } else {
          throw new Error('Error adding new patient as family member');
        }
      } else {
        throw new Error('Error registering patient');
      }
    } catch (e) {
      console.log('error====================>>>>>>>>>>>>>>> ', e);
      dispatch(errorAddingFamilyMember(e));
    } finally {
    }
  };
};

export const updatePatientFamily = (data, success = () => {}) => {
  return async (dispatch) => {
    try {
      const config = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const _data = {
        ...data,
        _id: data._id,
      };

      const res = await axios.post(
        `${Host}/patient/member/update`,
        _data,
        config,
      );
      if (res) {
        success();
      }
    } catch (error) {
      dispatch(havingError('===========id problem', error.response.data));
    }
  };
};

export const deletePatientFamily = (data, success = () => {}) => {
  return async (dispatch) => {
    const config = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await axios
      .post(`${Host}/patient/member/delete`, data, config)
      .then((result) => {
        if (result.status) {
          success();
        }
      })
      .catch((err) => {
        dispatch(havingError(err));
      });
  };
};

export const RemoveFamilyMember = (docId, patientId) => {
  return async (dispatch) => {
    const config = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const _data = {
      id: patientId,
      docId: docId,
    };

    await axios
      .post(`${Host}/patient/favourite/remove`, _data, config)
      .then((result) => {
        if (result.status) {
          console.log('Successfully remove fev doctor.');
          // GetPatientInfo(patientId);
        }
      })
      .catch((err) => {
        dispatch(havingError(err));
      });
  };
};

export const UploadProfilePicPatient = (
  id,
  ImageData,
  success = () => {},
  failure = () => {},
) => {
  return (dispatch) => {
    dispatch(startLoading());
    const Image = {
      uri: ImageData.uri,
      type: ImageData.type,
      name: ImageData.fileName,
    };
    const data = new FormData();
    data.append('myFile', Image);
    data.append('id', id);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .post(`${Host}/patient/upload/image`, data, config)
      .then((responseStatus) => {
        dispatch(profilePicUploaded(Image));
        success(responseStatus, '%%%%%%%%%%%%%%%%%%%%%%%%%%');
      })
      .catch((err) => {
        dispatch(havingError(err));
        failure(err);
      });
  };
};

export const GetAppointmentSlot = (dates, id) => {
  // console.log('dates[[[[]]]]]][[[]]*****************', dates, id);
  return async (dispatch) => {
    dispatch(startAppointmentSlotLoading());
    const config = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const data = {
      dates,
      id,
    };
    await axios
      .post(`${Host}/doctors/appointment/date`, data, config)
      .then((result) => {
        // console.log(result.data, '..................ststus');
        if (result.status) {
          const response = result.data.data;

          if (response) {
            // console.log(response, '..........ressssssssssssssssssssssssssss');
            dispatch(appointmentSlotLoaded(response));
          } else {
            dispatch(appointmentSlotError(''));
          }
        }
      })
      .catch((err) => {
        console.log(err.response.data, '..................erooorrrrrrrrrrrrr');
        dispatch(appointmentSlotError(err));
      });
  };
};

export const GetAppointmentInpersonSlot = (dates, id) => {
  return async (dispatch) => {
    dispatch(startAppointmentSlotLoading());
    const config = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const data = {
      dates,
      id,
    };
    await axios
      .post(`${Host}/doctors/appointment/inperson/date`, data, config)
      .then((result) => {
        // console.log(result, '..................ststus');
        if (result.status) {
          const response = result.data.data;
          // console.log(response, '..........ressssssssssssssssssssssssssss');
          if (response) {
            dispatch(appointmentSlotLoaded(response));
          } else {
            dispatch(appointmentSlotError(''));
          }
        }
      })
      .catch((err) => {
        // console.log(err, "..................erooorrrrrrrrrrrrr")
        dispatch(appointmentSlotError(err));
      });
  };
};

export const CreateAppointment = (payload, cb = () => {}) => {
  return async (dispatch) => {
    const config = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    axios
      .post(`${Host}/appointment/create`, payload, config)
      .then((result) => {
        // console.log({ result });
        if (result.status) {
          cb(false, result.data.data);
          //GetPatientInfo(patientId);
        }
      })
      .catch((err) => {
        console.log(err, '.........errrr');
        cb(true);
      });
  };
};

export const bookAppointment = (
  data,
  success = () => {},
  handleInvoice = () => {},
) => {
  return async (dispatch) => {
    dispatch(bookingAppointment());
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    // console.log(data);
    dispatch(startLoading());
    await axios
      .post(`${Host}/appointment/book`, data, config)
      .then((result) => {
        // console.log('=============>>>>>>>>>>>>>>>>>', result);
        if (result.status) {
          data.razorpayPaymentId &&
            dispatch(
              CapturePayment(
                {
                  amount: data.amount,
                  razorpayPaymentId: data.razorpayPaymentId,
                },
                () => dispatch(bookedAppointment(result.message)),
                () => dispatch(errorBookingAppointment('')),
              ),
            );
          dispatch(bookedAppointment(result.message));
          handleInvoice(result.data.appointment._id);
          success(result.data.appointment._id);
        } else {
          dispatch(errorBookingAppointment(''));
        }
      })
      .catch((err) => {
        dispatch(havingError());
        dispatch(errorBookingAppointment(err));
      });
  };
};

export const CapturePayment = (data, success = () => {}, error = () => {}) => {
  return async (dispatch) => {
    const payload = {
      amount: data.amount * 100,
      currency: 'INR',
    };
    // console.log({ data }, { payload });

    //dispatch(startLoading())
    axios
      .post(
        `https://api.razorpay.com/v1/payments/${data.razorpayPaymentId}/capture`,
        payload,
        {
          auth: {
            username: 'rzp_test_hRsc7oAQ82vplt',
            password: 'UowG1nldLHqkcVfZgvsGgV6u',
          },
        },
      )
      .then((result) => {
        // console.log(result);
        success();
      })
      .catch((err) => {
        console.log(err.response);
        error();
        dispatch(havingError());
      });
  };
};

const cancelAppointmentTele = `${Host}/appointment/cancel`;
const cancelInPersonAppointment = `${Host}/appointment/cancel/inperson`;

export const cancelAppointment = (body) =>
  axios.post(
    body.type === 'In-person'
      ? cancelInPersonAppointment
      : cancelAppointmentTele,
    body,
  );

export const InitiateRefund = (data, success = () => {}) => {
  return async (dispatch, getState) => {
    const { cancelationPolicy } = data;
    const { hours, minutes } = data.ongoingTime;

    const percentage =
      cancelationPolicy === 'Strict'
        ? hours > 24 * 3
          ? 100
          : 60
        : cancelationPolicy === 'Moderate'
        ? hours > 24
          ? 100
          : 60
        : cancelationPolicy === 'Flexible'
        ? hours > 6
          ? 100
          : 60
        : 100;

    const payload = {
      amount: data.amount * 100 * (percentage / 100),
      receipt: `Refund ${data._id}`,
      notes: {
        notes_key_1: `Refund for appointment : ${data._id}`,
      },
    };
    // console.log({ data }, { payload }, { cancelationPolicy });

    //dispatch(startLoading())
    axios
      .post(
        `https://api.razorpay.com/v1/payments/${data.razorpayPaymentId}/refund`,
        payload,
        {
          auth: {
            username: 'rzp_test_hRsc7oAQ82vplt',
            password: 'UowG1nldLHqkcVfZgvsGgV6u',
          },
        },
      )
      .then((result) => {
        // console.log(result);
        success();
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(havingError());
      });
  };
};

export const RemoveAppointment = (data, onSuccess = () => {}) => {
  return async (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    try {
      axios
        .post(`${Host}/appointment/cancel`, data, config)
        .then((res) => {
          // console.log(res, 'resPPPPPPPPPPPPPPPPPPPPPPPP');
          onSuccess();
        })
        .catch((err) => {
          console.log(err.response, 'errPPPPPPPPPPPPPPPPPPPPPPPppp');
        });
    } catch (e) {
      console.log(e);
    }
  };
};

export const AddPrescription =
  (data, cb = () => {}) =>
  (dispatch) => {
    //data:{metaId,medicines}
    //dispatch(startLoading())
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    //dispatch(gettingSurguries(true));
    axios
      .post(`${Host}/patient/prescription/add`, data, config)
      .then((res) => {
        // console.log({ res }, 'prescription');
        cb(false, res.data.data);
        // dispatch(GetSurguries(data.id));
        //dispatch(addSurguries(data.metaId));
      })
      .catch((e) => {
        console.log({ e });
        cb(true);
        // dispatch(havingError())
        // dispatch(gettingSurguries(false));
      });
  };

export const ApproveAppointment = (data, onSuccess = () => {}) => {
  return async (dispatch) => {
    const config = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    try {
      axios
        .post(`${Host}/appointment/approve`, data, config)
        .then((res) => {
          // console.log(res, 'resPPPPPPPPPPPPPPPPPPPPPPPP');
          onSuccess();
        })
        .catch((err) => {
          console.log(err, 'errPPPPPPPPPPPPPPPPPPPPPPPppp');
        });
    } catch (e) {
      console.log(e);
    }
  };
};

/**
 *
 *  Records action
 */
const GETTING_RECORDS = 'GETTING_RECORDS';
const GOT_RECORDS = 'GOT_RECORDS';
const ERROR_GETTING_RECORDS = 'ERROR_GETTING_RECORDS';

const gettingRecords = () => ({
  type: GETTING_RECORDS,
});
const gotRecords = (records) => ({
  type: GOT_RECORDS,
  payload: records,
});
const errorGettingRecords = (err) => ({
  type: ERROR_GETTING_RECORDS,
  payload: err,
});
export const GetRecords = (metaId) => (dispatch) => {
  dispatch(gettingRecords());
  axios
    .get(`${Host}/patient/reports/get/${metaId}`)
    .then((res) => {
      if (res.data.status) {
        dispatch(gotRecords(res.data.data));
      }
    })
    .catch((e) => {
      dispatch(errorGettingRecords(e));
    });
};

export const DeleteRecords = (data) => (dispatch) => {
  dispatch(gettingRecords());
  dispatch(startLoading());
  axios
    .get(`${Host}/patient/reports/delete/${data.id}/${data.reportId}`)
    .then((res) => {
      if (res.data.status) {
        dispatch(GetRecords(data.id));
      }
    })
    .catch((e) => {
      dispatch(havingError(e));
      dispatch(errorGettingRecords(e));
    });
};
export const UploadRecords = (
  fileData,
  success = () => {},
  error = () => {},
) => {
  return (dispatch) => {
    // console.log('==========>>>>>>>>>>>>&&&&&&&%%%%%%%%', fileData);
    dispatch(uploadingRecords());
    let data = new FormData();
    data.append('id', fileData.id);
    data.append('data', JSON.stringify(fileData.data));
    data.append('files', fileData.files);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    dispatch(startLoading());
    axios
      .post(`${Host}/patient/reports/add`, data, config)
      .then((response) => {
        // console.log(response, '........res');
        if (response.data.status)
          dispatch(uploadedRecords(response.data.message));
        success();
        dispatch(GetRecords(fileData.id));
      })
      .catch((err) => {
        console.log(err.response, '>.....err');
        dispatch(havingError());
        error(err);
        dispatch(errorUploadingRecords(err));
      });
  };
};

export const EditRecords = (fileData, success = () => {}) => {
  return (dispatch) => {
    dispatch(uploadingRecords());
    let data = new FormData();
    // console.log(fileData);
    data.append('id', fileData.id);
    data.append('data', JSON.stringify(fileData.data));
    data.append('files', fileData.files);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    dispatch(startLoading());
    axios
      .post(`${Host}/patient/reports/edit`, data, config)
      .then((response) => {
        // console.log(response, '........res');
        if (response.data.status)
          dispatch(uploadedRecords(response.data.message));
        success();
        dispatch(GetRecords(fileData.id));
      })
      .catch((err) => {
        console.log(err, '>.....err');
        dispatch(havingError());
        dispatch(errorUploadingRecords(err));
      });
  };
};
