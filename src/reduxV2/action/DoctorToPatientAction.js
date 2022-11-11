import axios from 'axios';
import { Host } from '../../utils/connection';

const GET_DOCTORS = 'GET_DOCTORS';
const GET_MORE_DOCTORS = 'GET_MORE_DOCTORS';
const GETTING_MORE_DOCTORS = 'GETTING_MORE_DOCTORS';
const GETTING_DOCTORS = 'GETTING_DOCTORS';
const ERROR = 'ERROR';
const RESET_DOCTOR_TO_PATIENT = 'RESET_DOCTOR_TO_PATIENT';
const TMP_DOC_STORE = 'TMP_DOC_STORE';
const SEARCHING_DOCTORS = 'SEARCHING_DOCTORS';
const SEARCHED_DOCTORS = 'SEARCHED_DOCTORS';
const GETTING_SUPER_DOC = 'GETTING_SUPER_DOCS';
const SUPER_DOCS = 'SUPER_DOCS';

const setDoctors = (doctors) => {
  return {
    type: GET_DOCTORS,
    payload: doctors,
  };
};
const setMoreDoctors = (doctors) => {
  return {
    type: GET_MORE_DOCTORS,
    payload: doctors,
  };
};
const startDoctorLoading = () => {
  return {
    type: GETTING_DOCTORS,
  };
};
const startMoreDoctorLoading = () => {
  return {
    type: GETTING_MORE_DOCTORS,
  };
};
const haveingError = (error) => {
  return {
    type: ERROR,
    error: error,
  };
};

const tempDocStore = (data) => {
  return {
    type: TMP_DOC_STORE,
    payload: data,
  };
};

const searchingDoctors = () => {
  return {
    type: SEARCHING_DOCTORS,
  };
};

export const setSearchedDoctors = (data) => {
  return {
    type: SEARCHED_DOCTORS,
    payload: data,
  };
};

const superDocLoading = () => {
  return {
    type: GETTING_SUPER_DOC,
  };
};

const setSuperDoc = (data) => {
  return {
    type: SUPER_DOCS,
    payload: data,
  };
};

export const resetDoctorToPatientReducer = () => {
  return {
    type: RESET_DOCTOR_TO_PATIENT,
  };
};

export const fetchDoctorLite = (search = {}, _page, mode) => {
  // console.log(`Search: ${search} and page: ${_page} and mode: ${mode}`);
  return (dispatch) => {
    const params = {
      match: JSON.stringify({
        is_superDoc: mode,
        ...search,
      }),
      pageNo: _page.toString(),
      size: '10',
      // name: 'sanj',
      // name: search.toString().split(' ')[0],
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(startDoctorLoading());
    axios
      .post(`${Host}/doctors/searchlite`, params, config)
      .then((result) => {
        if (result.status) {
          // console.log({ result })
          dispatch(setDoctors(result.data.data));
        }
      })
      .catch((err) => {
        console.log({ err });
        dispatch(haveingError(err));
      });
  };
};

export const fetchCustomDoctor = (search, _page, mode) => {
  // console.log(`Search: ${search} and page: ${_page} and mode: ${mode}`);
  const params = {
    match: JSON.stringify({
      is_superDoc: mode,
      city: search,
      specialty: search,
      state: search,
      country: search,
      firstName: search,
      lastName: search,
      name: search,
    }),
    name: search,
    pageNo: _page.toString(),
    size: '10',
    // name: 'sanj',
    // name: search.toString().split(' ')[0],
  };
  return (dispatch) => {
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(startDoctorLoading());
    axios
      .post(`${Host}/doctors/searchlite`, params, config)
      .then((result) => {
        if (result.status) {
          // console.log({ result })
          dispatch(setDoctors(result.data.data));
        }
      })
      .catch((err) => {
        console.log({ err });
        dispatch(haveingError(err));
      });
  };
};
export const fetchFilteredDoctors = (
  filterOption = {},
  page = 1,
  size = 10,
) => {
  return async (dispatch) => {
    try {
      const params = {
        match: JSON.stringify({
          is_superDoc: false,
          ...filterOption,
        }),
        pageNo: page,
        size: size,
        // name: 'sanj',
        // name: search.toString().split(' ')[0],
      };
      const config = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      dispatch(startDoctorLoading());
      const result = await axios.post(`${Host}/doctors/filter`, params, config);
      if (result.status) {
        // console.log({ result })
        dispatch(setDoctors(result.data.data));
      } else {
        throw new Error('Server bad response');
      }
    } catch (e) {
      console.log(e);
      dispatch(haveingError(e));
    }
  };
};

export const fetchMoreDoctorLite = (search = {}, _page, mode, callback) => {
  return (dispatch) => {
    const params = {
      match: JSON.stringify({
        is_superDoc: mode,
        ...search,
      }),
      pageNo: _page,
      size: '10',
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    dispatch(startMoreDoctorLoading());

    axios
      .post(`${Host}/doctors/searchlite`, params, config)
      .then((result) => {
        // console.log(result.data);
        if (result.status) {
          dispatch(setMoreDoctors(result.data.data));
        }
      })
      .catch((err) => {
        dispatch(haveingError(err));
      });
  };
};

export const GettingDoctorProfiles = (id,callback = () => {}) => {
  return (dispatch) => {
    dispatch(startDoctorLoading());
    axios
      .get(`${Host}/doctors/getdoc/${id}`)
      .then((result) => {
        if (result.status) {
          dispatch(tempDocStore(result.data.data));
          callback(result.data.data)
        }
      })
      .catch((err) => {
        dispatch(haveingError(err));
      });
  };
};

export const GettingDoctorProfilesbySlug = (slug,callback = () => {},err = ()=>{}) => {
  return (dispatch) => {
    dispatch(startDoctorLoading());
    axios
      .get(`${Host}/doctors/getbyslug/${slug}`)
      .then((result) => {
        if (result.status) {
          dispatch(tempDocStore(result.data.data));
          callback(result.data.data)
        }
      })
      .catch((err) => {
        err(err)
        dispatch(haveingError(err));
      });
  };
};


// !normal doctor by category
export const searchDoctors = (search, page = 1, callback = () => {}) => {
  return (dispatch) => {
    const params = {
      match: JSON.stringify({
        city: search,
        specialty: search,
        state: search,
        country: search,
        firstName: search,
        lastName: search,
        name: search,
      }),
      pageNo: page.toString(),
      name: search,
      size: page * 5,
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(searchingDoctors());
    axios
      .post(`${Host}/doctors/searchlite`, params, config)
      .then((result) => {
        // console.log('searching===========>>>>>>>>>>>', result.data.data);
        if (result.status) {
          dispatch(setDoctors(result.data.data));
          callback(result.data.data);
        }
      })
      .catch((err) => {
        dispatch(haveingError(err));
      });
  };
};

export const searchDoctorsBySpecialty = (search, page) => {
  return (dispatch) => {
    const params = {
      match: JSON.stringify({
        specialty: search,
      }),
      name: search,
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(searchingDoctors());
    axios
      .post(`${Host}/doctors/searchlite`, params, config)
      .then((result) => {
        if (result.status) {
          dispatch(setSearchedDoctors(result.data.data));
        }
      })
      .catch((err) => {
        dispatch(haveingError(err));
      });
  };
};

export const GetAllDoctors = (sucessCallback, errorCallback) => {
  return (dispatch) => {
    const params = {
      match: JSON.stringify({}),
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    //dispatch(searchingDoctors());
    axios
      .post(`${Host}/doctors/searchlite`, params, config)
      .then((result) => {
        if (result.status) {
          sucessCallback(result.data.data);
          //dispatch(setSearchedDoctors(result.data.data));
        }
      })
      .catch((err) => {
        //dispatch(haveingError(err));
      });
  };
};

export const fetchSuperDoc = (search, page, size) => {
  return (dispatch) => {
    const params = {
      match: JSON.stringify({
        is_superDoc: true,
        city: search,
        specialty: search,
        state: search,
        country: search,
        firstName: search,
        lastName: search,
        name: search,
      }),
      pageNo: page.toString(),
      name: search,
      size: 10,
    };
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    dispatch(superDocLoading());
    axios
      .post(`${Host}/doctors/searchlite`, params, config)
      .then((result) => {
        if (result.status) {
          dispatch(setSuperDoc(result.data.data));
        }
      })
      .catch((err) => {
        dispatch(haveingError(err));
      });
  };
};
export const fetchFilteredSuperDoc = (
  filterOption = {},
  page = 1,
  size = 10,
) => {
  return async (dispatch) => {
    try {
      const params = {
        match: JSON.stringify({
          is_superDoc: true,
          ...filterOption,
        }),
        pageNo: page,
        size: size,
      };
      const config = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      dispatch(superDocLoading());
      const result = await axios.post(`${Host}/doctors/filter`, params, config);
      if (result.status) {
        dispatch(setSuperDoc(result.data.data));
      } else {
        throw new Error('Server bad response');
      }
    } catch (e) {
      console.log(e);
      dispatch(haveingError(e));
    }
  };
};
