const initialState = {
  doctors: [],
  loading: false,
  moreDoctorLoading: false,
  error: [],
  tmp: null,
  tmpLoading: true,
  searchedDoctors: [],
  searchDoctorsLoading: false,
  superDocs: [],
  superDocsLoading: false,
};

const DoctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DOCTORS':
      return {
        ...state,
        loading: false,
        doctors: action.payload,
        error: [],
      };
    case 'GETTING_DOCTORS':
      return {
        ...state,
        loading: true,
        tmpLoading: true,
      };
    case 'GETTING_MORE_DOCTORS':
      return {
        ...state,
        moreDoctorLoading: true,
      };
    case 'GET_MORE_DOCTORS':
      return {
        ...state,
        moreDoctorLoading: false,
        doctors: [...state.doctors, ...action.payload],
      };
    case 'ERROR':
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case 'TMP_DOC_STORE':
      return {
        ...state,
        tmp: action.payload,
        tmpLoading: false,
      };
    case 'SEARCHING_DOCTORS':
      return {
        ...state,
        searchDoctorsLoading: true,
      };
    case 'SEARCHED_DOCTORS':
      return {
        ...state,
        searchedDoctors: action.payload,
        searchDoctorsLoading: false,
      };
    case 'GETTING_SUPER_DOCS':
      return {
        ...state,
        superDocsLoading: true,
      };
    case 'SUPER_DOCS':
      return {
        ...state,
        superDocs: action.payload,
        superDocsLoading: false,
      };
    case 'RESET_DOCTOR_TO_PATIENT':
      return {
        ...state,
        doctors: [],
        loading: false,
        moreDoctorLoading: false,
        error: [],
        tmp: null,
        tmpLoading: true,
        searchedDoctors: [],
        searchDoctorsLoading: false,
        superDocs: [],
        superDocsLoading: false,
      };
    default:
      return state;
  }
};

export default DoctorReducer;
