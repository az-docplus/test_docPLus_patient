const inititalState = {
  isMyDoctorReducerLoading: false,
  doctorProfile: {},
  haveingMyDoctorReducerError: [],
  appointmentLoading: false,
  appointments: [],
  appointmentFetchError: '',
  allAppointmentLoading: false,
  allAppointments: [],
  allAppointmentFetchError: '',
  specialtyLoading: false,
  specialty: [],
  specialtyLoadingError: '',
  updatingDoctor: false,
  updatingDoctorError: '',
  recentPatientLoading: false,
  recentPatient: [],
  recentPatientError: '',
  gettingAppointment: false,
  errorGettingAppointment: '',
  uploadingImage: false,
  errorUploadingImage: '',
  blockingDoctor: false,
  blockingDoctorError: '',
  forNow: false,
  gettingClincs: false,
  Clinics: [],
  addingClinics: false,
  gettingSlots: false,
  errorGettingSlots: '',
  gettingTeams: false,
  Teams: [],
  sendingRequest: false,
  sentRequests: [],
  PendingRequests: [],
  gettingPendingRequests: false,
  staff: [],
  gettingStaff: false,
};
// SAVE_MY_DOCTOR
const MyDoctorReducer = (state = inititalState, action) => {
  switch (action.type) {
    case 'FETCHING STAFF':
      return {
        ...state,
        gettingStaff: action.payload,
      };
    case 'GOT STAFF':
      return {
        ...state,
        staff: action.payload,
        gettingStaff: false,
      };
    case 'SENT REQUESTS':
      return {
        ...state,
        sentRequests: action.payload,
        gettingPendingRequests: false,
      };
    case 'SENDING REQUEST':
      return {
        ...state,
        sendingRequest: action.payload,
      };
    case 'PENDING REQUESTS':
      if (Array.isArray(action.payload)) {
        const res = action.payload.filter((i) => i);
        return {
          ...state,
          PendingRequests: res,
          gettingPendingRequests: false,
        };
      }
      return state;
    case 'GETTING PENDING REQUESTS':
      return {
        ...state,
        gettingPendingRequests: action.payload,
      };
    case 'SAVE TEAMS':
      return {
        ...state,
        Teams: action.payload,
        gettingTeams: false,
      };
    case 'GETTING TEAMS':
      return {
        ...state,
        gettingTeams: action.payload,
      };
    case 'SAVING SLOTS':
      return {
        ...state,
        gettingSlots: action.payload,
      };
    case 'SLOT ERROR':
      return {
        ...state,
        gettingSlots: false,
        errorGettingSlots: action.payload,
      };
    case 'GETTING CLINICS':
      return {
        ...state,
        gettingClincs: action.payload,
      };
    case 'FETCHED CLINICS':
      return {
        ...state,
        gettingClincs: false,
        Clinics: action.payload,
      };
    case 'ADDING_CLINIC':
      return {
        ...state,
        addingClinics: action.payload,
      };
    case 'ADD_CLINIC':
      return {
        ...state,
        addingClinics: false,
        Clinics: [...state.Clinics, action.payload],
      };
    case 'SAVE_MY_DOCTOR':
      return {
        ...state,
        doctorProfile: action.payload,
        haveingMyDoctorReducerError: false,
        isMyDoctorReducerLoading: false,
      };
    case 'HAVEING_MY_DOCTOR_REDUCER_ERROR':
      return {
        ...state,
        error: action.payload,
        isMyDoctorReducerLoading: false,
      };
    case 'START_MY_DOCTOR_REDUCER_LOADING':
      return {
        ...state,
        isMyDoctorReducerLoading: true,
      };
    case 'RESET_DOCTOR_REDUCER':
      return {
        ...state,
        isMyDoctorReducerLoading: false,
        doctorProfile: {},
        haveingMyDoctorReducerError: [],
        appointmentLoading: false,
        appointments: [],
        appointmentFetchError: '',
        allAppointmentLoading: false,
        allAppointments: [],
        allAppointmentFetchError: '',
        specialtyLoading: false,
        specialty: [],
        specialtyLoadingError: '',
        updatingDoctor: false,
        updatingDoctorError: '',
        recentPatientLoading: false,
        recentPatient: [],
        recentPatientError: '',
        appointments: [],
        gettingAppointment: false,
        errorGettingAppointment: '',
        uploadingImage: false,
        errorUploadingImage: '',
        blockingDoctor: false,
        blockingDoctorError: '',
        forNow: false,
      };
    case 'APPOINTMENT_LOADING':
      return {
        ...state,
        appointmentLoading: true,
      };
    case 'APPOINTMENT_LOADED':
      return {
        ...state,
        appointments: action.payload,
        appointmentLoading: false,
      };
    case 'ERROR_APPOINTMENT_FETCHING':
      return {
        ...state,
        appointmentFetchError: action.payload,
        appointmentLoading: false,
      };
    case 'ALL_APPOINTMENT_LOADING': {
      return {
        ...state,
        allAppointmentLoading: true,
      };
    }
    case 'APPOINTMENT_LOADED_ALL':
      return {
        ...state,
        allAppointmentLoading: false,
        allAppointments: action.payload,
      };
    case 'ERROR_ALL_APPOINTMENT_FETCHING':
      return {
        ...state,
        allAppointmentLoading: false,
        allAppointmentFetchError: action.payload,
      };
    case 'SPECIALTY_LOADING':
      return {
        ...state,
        specialtyLoading: true,
      };
    case 'SPECIALTY_LOADED':
      return {
        ...state,
        specialtyLoading: false,
        specialty: action.payload,
      };
    case 'SPECIALTY_ERROR':
      return {
        ...state,
        specialtyLoading: false,
        specialtyLoadingError: action.payload,
      };
    case 'UPDATING_DOCTOR_PROFILE':
      return {
        ...state,
        updatingDoctor: true,
      };
    case 'UPDATED_DOCTOR_PROFILE':
      return {
        ...state,
        updatingDoctor: false,
        updatingDoctorError: '',
      };
    case 'UPDATING_DOCTOR_ERROR':
      return {
        ...state,
        updatingDoctor: false,
        updatingDoctorError: action.payload,
      };
    case 'GETTING_RECENT_PATIENTS':
      return {
        ...state,
        recentPatientLoading: true,
      };
    case 'GOT_RECENT_PATIENTS':
      return {
        ...state,
        recentPatientLoading: false,
        recentPatient: action.payload,
        recentPatientError: '',
      };
    case 'GETTING_RECENT_PATIENTS_ERROR':
      return {
        ...state,
        recentPatientLoading: false,
        recentPatientError: action.payload,
        isMyDoctorReducerLoading: false,
      };
    case 'GETTING_APPOINTMENT_LIST':
      return {
        ...state,
        gettingAppointment: true,
      };
    case 'GOT_APPOINTMENT_LIST':
      return {
        ...state,
        gettingAppointment: false,
        appointments: action.payload,
        errorGettingAppointment: '',
      };
    case 'ERROR_GETTING_APPOINTMENT':
      return {
        ...state,
        isMyDoctorReducerLoading: false,
        gettingAppointment: false,
        appointments: '',
        errorGettingAppointment: action.payload,
      };
    case 'UPLOADING_IMAGE':
      return {
        ...state,
        uploadingImage: true,
      };
    case 'UPLOADED_IMAGE':
      return {
        ...state,
        uploadingImage: false,
      };
    case 'ERROR_UPLOADING_IMAGE':
      return {
        ...state,
        uploadingImage: false,
        errorUploadingImage: action.payload,
      };
    case 'BLOCK_DOCTOR_LOADING':
      return {
        ...state,
        blockingDoctor: true,
      };
    case 'DOCTOR_BLOCKED':
      return {
        ...state,
        blockingDoctor: false,
        blockingDoctorError: '',
      };
    case 'BLOCK_DOCTOR_ERROR':
      return {
        ...state,
        blockingDoctor: false,
        blockingDoctorError: action.payload,
      };
    case 'SET_FOR_NOW':
      return {
        ...state,
        forNow: action.payload,
      };
    default:
      return state;
  }
};

export default MyDoctorReducer;
