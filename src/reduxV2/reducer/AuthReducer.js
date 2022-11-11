const initialState = {
  loggingIn: false,
  isLoggedin: false,
  errorLogin: '',
  signingUp: false,
  errorSingup: '',
  isDoctor: false,
  lastSearches: [],
  userData: {
    isPatientFamilyMember: false,
    accountDetails: {
      name: '',
      number: '',
      IFSC: '',
      type: '',
      bankName: '',
    },
  },
  // changingTheme: false,
  theme: 'PRIMARY',
  language: 'en',
  lastRouteMemory: {
    routeName: '',
    params: '',
  },
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD LAST ROUTE MEMEORY':
      return {
        ...state,
        lastRouteMemory: action.payload,
      };
    case 'CONTINUE_AS':
      return {
        ...state,
        userData: {
          ...state.userData,
          isPatientFamilyMember: true,
          ...action.payload,
        },
      };
    case 'SAVE_USER':
      return {
        ...state,
        isDoctor: action.userType,
        userData: action.userData,
        // isLoggedin: true,
      };
    case 'LOGGING_IN':
      return {
        ...state,
        loggingIn: true,
        errorLogin: '',
      };
    case 'ISLOGGED_IN':
      return {
        ...state,
        isLoggedin: true,
      };
    case 'LOGGED_IN':
      return {
        ...state,
        loggingIn: false,
        errorLogin: '',
      };
    case 'ERROR_LOGIN':
      return {
        ...state,
        loggingIn: false,
        errorLogin: action.payload,
      };
    case 'SIGNING_UP':
      return {
        ...state,
        signingUp: true,
        errorSingup: '',
      };
    case 'SIGNED_UP':
      return {
        ...state,
        signingUp: false,
        errorSingup: '',
      };
    case 'ERROR_SIGNUP':
      return {
        ...state,
        signingUp: false,
        errorSingup: action.payload,
      };
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'CHANGE_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };
    case 'RESET_AUTH_REDUCER':
      return {
        ...state,
        lastRouteMemory: {
          routeName: '',
          params: '',
        },
        loggingIn: false,
        isLoggedin: false,
        errorLogin: '',
        signingUp: false,
        errorSingup: '',
        isDoctor: false,
        lastSearches: [],
        userData: {},
        theme: 'PRIMARY',
        language: 'en',
      };

    case 'HAVEING_ERROR':
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    case 'LAST_SEARCHES': {
      return {
        ...state,
        lastSearches: [...state.lastSearches, action.payload],
      };
    }
    case 'DELETE_SEARCHES': {
      return {
        ...state,
        lastSearches: action.payload,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
