/* eslint-disable react-native/no-inline-styles */
// import BlurSpinner from '../../../components/molecules/Modal/BlurLoadingOverlay';
// import Section from '../../../components/molecules/Section/Section';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import DatePicker from 'react-native-datepicker';
// import {
//   GetReviews,
//   AddReviews,
//   AddLastRouteMemory,
//   saveNewUser,
// } from '../../../reduxV2/action/AuthAction';
// import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {GetPatientInfo} from '../../../reduxV2/action/PatientAction';
import React, {useState, useEffect, useMemo, useCallback} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import RadioGroup, {Radio} from 'react-native-radio-input';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  // Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Modal,
  StatusBar,
  RefreshControl,
  // TouchableHighlight,
  StyleSheet,
  Platform,
  UIManager,
  Easing,
  Animated,
  CheckBox,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {BlurView} from '@react-native-community/blur';
import {
  // BottomSheet,
  ListItem,
} from 'react-native-elements';
import {BottomSheet} from 'react-native-btr';
import axios from 'axios';

import BasicCard from '../../../components/atoms/BasicCard/BasicCard';
import {ListingWithThumbnailLoader} from '../../../components/atoms/Loader/Loader';
import NewToggleButton from '../../../components/molecules/ToggleButton/NewToggleButton';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import SearchBarLoc from '../../../components/molecules/SearchBarSolid/locSearch';
import AvailDoctorContainerV2 from '../../../components/molecules/AvailDoctorContainer/AvailDoctorContainerV2';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import FluidAnimation from '../../../components/molecules/Animation/FluidAnimation';
import BlurModal from '../../../components/molecules/Modal/BlurModal';

import {
  // fetchDoctorLite,
  // fetchMoreDoctorLite,
  searchDoctors,
  // fetchSuperDoc,
  fetchFilteredSuperDoc,
  fetchFilteredDoctors,
  // GetAllDoctors,
} from '../../../reduxV2/action/DoctorToPatientAction';
import {getSpecialty} from '../../../reduxV2/action/DoctorAction';

import {
  NEW_PRIMARY_COLOR,
  // NEW_HEADER_TEXT,
  // SEARCH_PLACEHOLDER_COLOR,
  // PRIMARY_BACKGROUND,
  // INPUT_PLACEHOLDER,
  SECONDARY_BACKGROUND,
  NEW_PRIMARY_BACKGROUND,
  PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import {Colors} from '../../../styles/colorsV2';
import Slider from '@react-native-community/slider';

import {
  Local,
  // setLocale
} from '../../../i18n';

import {Host} from '../../../utils/connection';
// import DOMParser from 'react-native-html-parser';
// import Svg, {G, Path} from 'react-native-svg';
import Image from 'react-native-remote-svg';
import RadioGroupV2 from '../../../components/molecules/RadioGroup/RadioGroupV2';
import BasicCardN from '../../../components/atoms/BasicCard/BasicCardN';

// import { parse } from 'react-native-svg';

//TODO import only necessary component in all screens which are first screen of any navigator
//TODO call APIs only if AppState is focused

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function LandingPage({navigation}) {
  const tempSpecialityIcons = useMemo(
    () => [
      require('../../../assets/icons/allDoctor.png'),
      require('../../../assets/icons/lungs.png'),
      require('../../../assets/icons/heart.png'),
      require('../../../assets/icons/physician.png'),
      require('../../../assets/icons/neuro.png'),
      require('../../../assets/icons/dermatologist.png'),
      require('../../../assets/icons/Eye_doctor.png'),
      require('../../../assets/icons/dentist.png'),
      require('../../../assets/icons/orthopedist.png'),
      require('../../../assets/icons/psychiatrist.png'),
    ],
    [],
  );

  const dispatch = useDispatch();
  const {userData, theme} = useSelector((state) => state.AuthReducer);
  const {
    doctors,
    loading,
    moreDoctorLoading,
    searchDoctorsLoading,
    searchedDoctors,
    superDocsLoading,
    superDocs,
  } = useSelector((state) => state.DoctorToPatientReducer);
  const {lastRouteMemory, isLoggedin} = useSelector(
    (state) => state.AuthReducer,
  );
  const {
    patient,
    // isPatientAccountReducerLoading
  } = useSelector((state) => state.PatientReducer);
  const {
    // specialtyLoading,
    specialty,
  } = useSelector((state) => state.DoctorReducer);
  const [doctorLocalState, setDoctorLocalState] = useState([]);
  const [localDoctorLoading, setLocalDoctorLoading] = useState(true);
  const [ActiveSpeciality, setActiveSpeciality] = useState({item: '', i: ''});
  const [toggle, setToggle] = useState(0); // 0 : all docs , 1 : super doc
  /**
   *  1 : allDoctors,
   *  2 : female doctors
   *  3 : male doctors
   *  4 : favorite doctors
   *  5 : sort by name
   */
  const [activeFilter, setActiveFilter] = useState(1);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [page, setPage] = useState(1);
  const [fetchingMoreData, setFetchingMoreData] = useState(false);
  const [consultLoading, setConsultLoading] = useState(false);
  const [allSpeciality, setAllSpeciality] = useState([]);

  const ResetDoctors = useCallback(() => {
    setIsBottomSheetVisible(false);
    setActiveFilter(1);
    setActiveSpeciality({item: '', i: ''});
    setDoctorLocalState(doctors);
  }, [doctors]);
  const sortByGender = useCallback(
    async (sex) => {
      setIsBottomSheetVisible(false);
      try {
        setActiveFilter(sex === 'Male' ? 3 : 2);
        const isSuperDoc = toggle === 1;
        // if (Active !== 'allDoctors') {
        //   const filteredDocs = tempState.filter((doc, id) => {
        //     if (doc.gender && doc.gender.toLowerCase() == sex.toLowerCase()) {
        //       return doc;
        //     }
        //   });
        //   setState(filteredDocs);
        setLocalDoctorLoading(true);
        const params = {
          match: JSON.stringify({
            gender: sex,
            is_superDoc: isSuperDoc,
          }),
        };
        const config = {
          Accept: '*/*',
          'Content-Type': 'application/x-www-form-urlencoded',
        };
        const result = await axios.post(
          `${Host}/doctors/filter`,
          params,
          config,
        );
        if (result.status) {
          setDoctorLocalState(result.data.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLocalDoctorLoading(false);
      }
    },
    [toggle],
  );

  useEffect(() => {
    const fetchAllSpeciality = async () => {
      const data = {
        // pageNo,
        // size,
      };
      const config = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      // dispatch(specialtyLoading());
      try {
        const req = await axios.post(
          `${Host}/patient/specialty/get`,
          data,
          config,
        );
        let response = req.data.data.filter(
          (item, index) => item.picture && item.popular,
        );
        setAllSpeciality(response);
        // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', req);
        // response = response.map((item) => item.name);
        // console.log(response);
        // dispatch(specialtyLoaded(response));
      } catch (e) {
        console.log(e);
        // dispatch(specialtyError(e));
      }
    };

    fetchAllSpeciality();
  }, []);
  const sortByFavorite = useCallback(() => {
    setIsBottomSheetVisible(false);
    setActiveFilter(4);
    if (!isLoggedin) {
      navigation.navigate('Auth');
    } else {
      try {
        setLocalDoctorLoading(true);
        let favourites;
        if (patient.favourites) {
          favourites =
            patient.favourites?.length > 0
              ? patient.favourites?.map((f, i) => f._id)
              : userData.favourites
              ? userData.favourites?.map((f, i) => f._id)
              : [];
        }
        console.log('favourites ', favourites);
        setDoctorLocalState((prevState) => {
          const filteredDocs = prevState.filter((doc, id) => {
            if (favourites?.includes(doc._id)) {
              return doc;
            }
          });
          if (filteredDocs.length > 0) {
            return filteredDocs;
          }
          return prevState;
        });
        // console.log(patient?.favourites?.length);
      } catch (e) {
        console.log(e);
      } finally {
        setLocalDoctorLoading(false);
      }
    }
  }, [isLoggedin, 
    // navigation,
     patient.favourites, userData.favourites]);
  const handleSortByName = useCallback(() => {
    setIsBottomSheetVisible(false);
    try {
      setLocalDoctorLoading(true);
      setActiveFilter(5);
      setDoctorLocalState((prevState) => {
        const sortedDoctors = prevState.sort((a, b) =>
          a.basic.name.localeCompare(b.basic.name),
        );
        return sortedDoctors;
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLocalDoctorLoading(false);
    }
  }, []);
  const onEndEditing = useCallback(
    (search) => {
      try {
        setLocalDoctorLoading(true);
        dispatch(searchDoctors(search, 1));
        setSearchKey(search);
      } catch (e) {
        console.log(e);
      } finally {
        console.log('finally called');
      }
    },
    [dispatch],
  );
  const handleSpecialtyFilter = useCallback(
    async (item, i) => {
      console.log(item, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
      try {
        const isSuperDoc = toggle === 1;
        console.log('called speciality filter');
        setActiveFilter(0); // this is to insure that all doctor card move to end
        setActiveSpeciality({item, i}); //TODO update active filter,if any
        setLocalDoctorLoading(true);
        let search = item.toLowerCase();
        const params = {
          match: JSON.stringify({
            specialty: item,
            // is_superDoc: isSuperDoc
          }),
          // pageNo: page.toString(),
          name: search,
          // size: '5',
        };
        const config = {
          Accept: '*/*',
          'Content-Type': 'application/x-www-form-urlencoded',
        };
        // dispatch(searchingDoctors());
        console.log('fetching specialty doctor with superDoc ', isSuperDoc);
        const result = await axios.post(
          `${Host}/doctors/searchlite`,
          params,
          config,
        );
        if (result.status) {
          console.log('got result on specialty');
          if (isSuperDoc) {
            console.log('is super doc specialty filtering data');
            const superDocListing = result.data.data.filter((_item, index) => {
              if (_item.is_superDoc) {
                // console.log(item.is_superDoc, "?????????????????????????????????????")
                return _item;
              }
            });
            console.log('got filtered data with specialty and superdoc ');
            setDoctorLocalState(superDocListing);
          } else {
            console.log('data if not superdoc specialty');
            setDoctorLocalState(result.data.data);
          }
        }
      } catch (e) {
        console.log('error occured ', e);
      } finally {
        console.log('finally called on specialty filter');
        setLocalDoctorLoading(false);
      }
    },
    [toggle],
  );
  const onToggle = useCallback(() => {
    // setActiveFilter(1);
    setToggle((prev) => (prev === 0 ? 1 : 0));
  }, []);
  useEffect(() => {
    if (toggle == 1) {
      const options = {};
      if (activeFilter == 2) {
        options.gender = 'Female';
      }
      if (activeFilter == 3) {
        options.gender = 'Male';
      }
      dispatch(fetchFilteredSuperDoc(options));
    } else {
      if (doctors.length > 0) {
        setDoctorLocalState(doctors);
      }
    }
  }, [activeFilter, dispatch, doctors, toggle]);

  const onSearchDoctorRefresh = useCallback(() => {
    dispatch(searchDoctors(searchKey, 1));
  }, [dispatch, searchKey]);
  const onDoctorsRefresh = useCallback(() => {
    const options = {};
    if (activeFilter == 2) {
      options.gender = 'Female';
    }
    if (activeFilter == 3) {
      options.gender = 'Male';
    }
    dispatch(fetchFilteredDoctors(options));
  }, [activeFilter, dispatch]);
  const onSuperDocRefresh = useCallback(() => {
    const options = {};
    if (activeFilter == 2) {
      options.gender = 'Female';
    }
    if (activeFilter == 3) {
      options.gender = 'Male';
    }
    dispatch(fetchFilteredSuperDoc(options));
  }, [activeFilter, dispatch]);
  const onRefresh = useCallback(() => {
    if (searchKey != '') {
      //load search docs
      onSearchDoctorRefresh();
    } else {
      if (toggle == 1) {
        //load superdoc
        onSuperDocRefresh();
      } else {
        //all docs
        onDoctorsRefresh();
      }
    }
  }, [
    onDoctorsRefresh,
    onSearchDoctorRefresh,
    onSuperDocRefresh,
    searchKey,
    toggle,
  ]);
  const _fetchMoreDoctorLite = useCallback(async () => {
    console.log('called more doctor lite');
    try {
      setFetchingMoreData(true);
      let val = page + 1;
      let doctorSize = val * 10;
      const options = {
        is_superDoc: toggle == 1 ? true : false,
      };
      if (activeFilter == 2) {
        options.gender = 'Female';
      }
      if (activeFilter == 3) {
        options.gender = 'Male';
      }
      const params = {
        match: JSON.stringify({
          ...options,
        }),
        // pageNo: page.toString(),
        size: doctorSize,
      };
      const config = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const searchParams = {
        match: JSON.stringify({
          city: searchKey,
          specialty: searchKey,
          state: searchKey,
          country: searchKey,
          firstName: searchKey,
          lastName: searchKey,
          name: searchKey,
        }),
        pageNo: page.toString(),
        name: searchKey,
        size: doctorSize,
      };
      let result;
      if (searchKey != '') {
        result = await axios.post(
          `${Host}/doctors/searchlite`,
          searchParams,
          config,
        );
      } else {
        result = await axios.post(`${Host}/doctors/filter`, params, config);
      }
      if (result.status) {
        let filteredDocs = [];
        if (activeFilter === 5) {
          const sortedDoctors = result.data.data.sort((a, b) =>
            a.basic.name.localeCompare(b.basic.name),
          );
          filteredDocs = sortedDoctors;
        } else {
          filteredDocs = result.data.data;
        }
        setDoctorLocalState(filteredDocs);
      }
      setPage(val);
    } catch (e) {
      console.log(e);
    } finally {
      setFetchingMoreData(false);
    }
  }, [activeFilter, page, searchKey, toggle]);

  const list = useMemo(() => {
    return [
      {
        title: `${Local('patient.landing_page.all_doctors')}`,
        titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
        onPress: ResetDoctors,
      },
      {
        title: `${Local('patient.landing_page.female_doctors')}`,
        titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
        onPress: () => sortByGender('Female'),
      },
      {
        title: `${Local('patient.landing_page.male_doctors')}`,
        titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
        onPress: () => sortByGender('Male'),
      },
      {
        title: `${Local('patient.landing_page.favorites')}`,
        titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
        onPress: sortByFavorite,
      },
      {
        title: `${Local('patient.landing_page.sort_by_name')}`,
        titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
        onPress: handleSortByName,
      },
      {
        title: `${Local('patient.landing_page.cancel')}`,
        containerStyle: {backgroundColor: SECONDARY_BACKGROUND},
        titleStyle: {color: 'black', fontFamily: 'Montserrat-Regular'},
        onPress: () => setIsBottomSheetVisible(false),
      },
    ];
  }, [ResetDoctors, handleSortByName, sortByFavorite, sortByGender]);
  useEffect(() => {
    //mapping global loading states to one local state
    // console.log(
    //   'useeffect of variable loading,moredoctorloading,searchdoctorloading etc called',
    // );
    if (
      loading ||
      moreDoctorLoading ||
      searchDoctorsLoading ||
      superDocsLoading
    ) {
      setLocalDoctorLoading(true);
    } else {
      setLocalDoctorLoading(false);
    }
  }, [loading, moreDoctorLoading, searchDoctorsLoading, superDocsLoading]);
  // useEffect(() => {
  //   if (lastRouteMemory && lastRouteMemory.routeName !== '') {
  //     navigation.navigate(lastRouteMemory.routeName, {
  //       data: lastRouteMemory.params,
  //     });
  //   }
  // }, [lastRouteMemory, navigation]);
  useEffect(() => {
    if (doctors.length > 0) {
      console.log('doc length useeffect called');
      setDoctorLocalState(doctors);
    }
  }, [doctors]);
  useEffect(() => {
    if (searchKey != '') {
      console.log('search doc length useeffect called');
      setDoctorLocalState(searchedDoctors);
    }
  }, [searchKey, searchedDoctors]);
  useEffect(() => {
    if (toggle == 1) {
      console.log('superdoc length useeffect called');
      setDoctorLocalState(superDocs);
    }
  }, [superDocs, toggle]);
  const onTopNavLeftButtonPress = useCallback(() => {}, []);
  const mainListExtraData = useMemo(
    () => ({
      theme,
      setIsBottomSheetVisible,
      onEndEditing,
      activeFilter,
      setActiveFilter,
      toggle,
      setDoctorLocalState,
      doctors,
      superDocs,
      tempSpecialityIcons,
      handleSpecialtyFilter,
      specialty,
      onToggle,
      ActiveSpeciality,
      setActiveSpeciality,
      localDoctorLoading,
      moreDoctorLoading,
    }),
    [
      theme,
      onEndEditing,
      activeFilter,
      toggle,
      doctors,
      superDocs,
      tempSpecialityIcons,
      handleSpecialtyFilter,
      specialty,
      onToggle,
      ActiveSpeciality,
      localDoctorLoading,
      moreDoctorLoading,
    ],
  );
  useEffect(() => {
    dispatch(fetchFilteredDoctors({}));
    dispatch(getSpecialty(0, 52));
  }, [dispatch]);
  const topNavStyle = useMemo(
    () => ({
      Container: {
        height: '5%',
        paddingVertical: '2%',
      },
    }),
    [],
  );

  const [GenderFilter, setGenderFilter] = useState('');
  const [RadioFiltervalue, setRadioFiltervalue] = useState([]);
  const [RadioFiltervalueT, setRadioFiltervalueT] = useState([]);
  const [conditionList, setConditionList] = useState([]);
  const [specialityList, setSpecialityList] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [NowFilter, setNowFilter] = useState('');
  const [ratings, setRatings] = useState('Any');
  const [exp, setExp] = useState('Any');
  const [sort, setSort] = useState('lowToHigh');
  const [location, setLocation] = useState('');

  const [chev, setChev] = useState({
    language: true,
    specialty: true,
    gender: true,
    loc: true,
    rating: true,
    exp: true,
    avail: true,
    timeOfDay: true,
    sort: true,
  });

  const clearAll = () => {
    setLanguages([]);
    setSpecialityList([]);
    setGenderFilter('');
    setRatings('Any');
    setExp('Any');
    setRadioFiltervalue([]);
    setRadioFiltervalueT([]);
    setSort('');
    setLocation('');
  };

  const onToggleExpand = (key) => {
    let temp = chev;
    temp[`${key}`] = !chev[`${key}`];
    setChev({
      ...temp,
    });
    console.log(temp);
  };

  const [visible, setVisible] = useState(false);

  const onCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    console.log(RadioFiltervalueT);
  }, [RadioFiltervalueT]);

  const [change, setChange] = useState(false)

  const applyAllFilter = (e) => {
    setLocalDoctorLoading(true);

    console.log('Applied');

    // onCancel();
    setIsBottomSheetVisible(false);
    let params = {};
    let payload = {};
    // if (conditionList.length > 0) payload.condition = conditionList.length == 2 ? 'Illness' : conditionList[0];
    if (typeFilter !== '') payload.consultationType = typeFilter;
    if (location !== '') {
      payload.city = location;
      payload.state = location;
      payload.country = location;
    }
    if (ratings !== 'Any') payload.ratings = ratings.split('+')[0];
    if (exp !== 'Any') payload.experience = exp.split('+')[0];
    if (GenderFilter !== '') payload.gender = GenderFilter;
    if (RadioFiltervalue.length > 0)
      payload.maxTime = new Date(RadioFiltervalue[0].max).getTime();
    if (RadioFiltervalue.length > 0)
      payload.minTime = new Date(RadioFiltervalue[0].min).getTime();
    if (RadioFiltervalueT.length > 0)
      payload.max_time_of_day = new Date(RadioFiltervalueT[0].max).getTime();
    if (RadioFiltervalueT.length > 0)
      payload.min_time_of_day = new Date(RadioFiltervalueT[0].min).getTime();
    if (specialityList.length > 0) payload.specialties = specialityList;
    if (languages.length > 0) payload.languages = languages;
    if (NowFilter !== '') payload.is_superDoc = NowFilter === 'Now';

    params.match = JSON.stringify(payload);
    console.log({payload});
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (Object.keys(payload).length < 1) {
      payload.consultationType = 'Tele-consult';
    }

    params.match = JSON.stringify(payload);

    // return

    axios
      .post(`${Host}/doctors/filter`, params, config)
      .then((res) => {
        const {data} = res.data;
        // console.log(data, '::::::::::::::::::');
        if (sort == 'lowToHigh') {
          console.log('lowTOHigh');
          const temp = data.sort((a, b) => {
            return a.fee - b.fee;
          });

          setDoctorLocalState(temp);
        } else if (sort == 'highToLow') {
          console.log('High');
          const temp = data.sort((a, b) => {
            return b.fee - a.fee;
          });
          setDoctorLocalState(temp);
        } else if (sort == 'earliest') {
          console.log('High');
          const temp = data.sort((a, b) => {
            return b.fee - a.fee;
          });
          setDoctorLocalState(temp);
        } else {
          console.log('in earliest');
          setDoctorLocalState(data);
        }

        console.log(Object.values(payload).flat());
        setDoctorLocalState(data);
        setLocalDoctorLoading(false);
      })
      .catch((err) => {
        console.log(err, '^^^^^^^^');
        setLocalDoctorLoading(false);
      });
  };

  const onChangeRadioFilter = (time, minTime, maxTime) => {
    // setAvailableClear(true);
    // console.log('radio checked', e.target.value);
    // setRadioFiltervalue(e.target.value)
    var min = new Date();
    // min.setHours(minTime);
    var max = new Date();
    if (time === 'Today') {
      max.setHours(maxTime);
    } else if (time === 'Next 3 Days') {
      max.setDate(max.getDate() + 3);
      max.setHours(maxTime);
    } else if (time === 'Next 7 Days') {
      max.setDate(max.getDate() + 7);
      max.setHours(maxTime);
    }
    setRadioFiltervalue([{time: time, min: min, max: max}]);
  };

  const onChangeRadioFilterT = (time, minTime, maxTime) => {
    // setAvailableClear(true);
    // console.log('radio checked', e.target.value);
    // setRadioFiltervalue(e.target.value)
    var min = new Date();
    // min.setHours(minTime);
    var max = new Date();
    if (time === 'Today') {
      max.setHours(maxTime);
    } else if (time === 'Next 3 Days') {
      max.setDate(max.getDate() + 3);
      max.setHours(maxTime);
    } else if (time === 'Next 7 Days') {
      max.setDate(max.getDate() + 7);
      max.setHours(maxTime);
    }
    setRadioFiltervalueT([{time: time, min: min, max: max}]);
  };

  useEffect(() => {
    applyAllFilter()
  }, [change])

  return (
    <>
      <StatusBar
        animated
        backgroundColor={Colors.secondary_background[theme]}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
      />
      <BlurModal visible={consultLoading} activity={true}>
        <ActivityIndicator color="#009387" size="large" />
      </BlurModal>
      {/* <BlurModal {...{ visible, onCancel, setVisible }}> */}
      <Modal
        onRequestClose={() => {
          setVisible(false);
        }}
        transparent={true}
        visible={visible}
        animationType="fade">
        <TouchableWithoutFeedback onPress={onCancel}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              // backgroundColor: Colors.secondary_background[theme]
            }}>
            <BlurView
              blurRadius={7}
              downsampleFactor={1}
              overlayColor={Colors.blur_overlay_color[theme]}
              blurAmount={1}
              style={StyleSheet.absoluteFill}
              blurType="light"
            />
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={{
                  // backgroundColor: 'white',
                  backgroundColor: Colors.secondary_background[theme],
                  // padding: '5%',
                  // paddingBottom: "0%",
                  // borderRadius: 15,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  alignSelf: 'center',
                  margin: '2%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  //   borderWidth: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 350,
                    borderBottomWidth: 1,
                    borderColor: '#eaeaea',
                    padding: '5%',
                    paddingBottom: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: '#009387',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    Filters
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(false);
                    }}>
                    <Text
                      style={{
                        color: '#009387',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      X
                    </Text>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  contentContainerStyle={{
                    // height:
                    width: 350,
                    paddingHorizontal: '5%',
                    // flexDirection: "column"
                  }}>
                  <View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#eaeaea',
                        paddingBottom: '2%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#000',
                            marginBottom: '2%',
                          }}>
                          Language
                        </Text>
                        {!chev[`language`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('language');
                            }}>
                            <MaterialIcon
                              name={'chevron-up'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                        {chev[`language`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('language');
                            }}>
                            <MaterialIcon
                              name={'chevron-down'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                      {!chev[`language`] && (
                        <ScrollView
                          horizontal
                          contentContainerStyle={{
                            width: 9 * 100,
                          }}
                          showsHorizontalScrollIndicator={false}>
                          {[
                            'Hindi',
                            'English',
                            'Arabic',
                            'Spanish',
                            'French',
                            'Marathi',
                            'Tamil',
                            'Burmese',
                            'Kannada',
                            'Telugu',
                          ].map((item, index) => {
                            return (
                              <TouchableOpacity
                                key={index}
                                style={{
                                  backgroundColor: languages.includes(item)
                                    ? '#009387'
                                    : '#eaeaea',
                                  paddingHorizontal: '6%',
                                  paddingVertical: '1%',
                                  borderRadius: 5,
                                  marginHorizontal: 2,
                                  marginVertical: 1,
                                }}
                                onPress={() => {
                                  if (!languages.includes(item)) {
                                    setLanguages([...languages, item]);
                                    // setSelectedSp(e.target.value);
                                    // setSpecialityList([e.target.value])
                                  } else {
                                    const selectedAcc = languages.filter(
                                      (a) => {
                                        if (a === item) return false;
                                        return true;
                                      },
                                    );
                                    setLanguages([...selectedAcc]);
                                    // setSelectedSp(specialityList[0]);
                                  }
                                }}>
                                <Text>{item}</Text>
                              </TouchableOpacity>
                            );
                          })}
                        </ScrollView>
                      )}
                    </View>

                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#eaeaea',
                        paddingBottom: '2%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: '2%',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#000',
                            marginBottom: '2%',
                          }}>
                          Speciality
                        </Text>
                        {!chev[`specialty`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('specialty');
                            }}>
                            <MaterialIcon
                              name={'chevron-up'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                        {chev[`specialty`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('specialty');
                            }}>
                            <MaterialIcon
                              name={'chevron-down'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                      {!chev[`specialty`] && (
                        <ScrollView
                          horizontal
                          contentContainerStyle={{
                            width: specialty.length * 20,
                            height: 40,
                          }}
                          showsHorizontalScrollIndicator={false}>
                          {specialty.map((item, index) => {
                            return (
                              <TouchableOpacity
                                key={index}
                                style={{
                                  backgroundColor: specialityList.includes(item)
                                    ? '#009387'
                                    : '#eaeaea',
                                  paddingHorizontal: '6%',
                                  paddingVertical: '1%',
                                  borderRadius: 5,
                                  marginHorizontal: 2,
                                  marginVertical: 1,
                                }}
                                onPress={() => {
                                  if (!specialityList.includes(item)) {
                                    setSpecialityList([
                                      ...specialityList,
                                      item,
                                    ]);
                                    // setSelectedSp(e.target.value);
                                    // setSpecialityList([e.target.value])
                                  } else {
                                    const selectedAcc = specialityList.filter(
                                      (a) => {
                                        if (a === item) return false;
                                        return true;
                                      },
                                    );
                                    setSpecialityList([...selectedAcc]);
                                    // setSelectedSp(specialityList[0]);
                                  }
                                }}>
                                <Text>{item}</Text>
                              </TouchableOpacity>
                            );
                          })}
                        </ScrollView>
                      )}
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#eaeaea',
                        paddingBottom: '2%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: '2%',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#000',
                            marginBottom: '2%',
                          }}>
                          Gender
                        </Text>
                        {!chev[`gender`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('gender');
                            }}>
                            <MaterialIcon
                              name={'chevron-up'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                        {chev[`gender`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('gender');
                            }}>
                            <MaterialIcon
                              name={'chevron-down'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                      </View>

                      {!chev[`gender`] && (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}>
                          {['Male', 'Female'].map((item, index) => {
                            return (
                              <TouchableOpacity
                                key={index}
                                style={{
                                  backgroundColor:
                                    GenderFilter === item
                                      ? '#009387'
                                      : '#eaeaea',
                                  paddingHorizontal: '8%',
                                  paddingVertical: '1%',
                                  borderRadius: 5,
                                  marginHorizontal: 2,
                                  marginVertical: 1,
                                }}
                                onPress={() => {
                                  setGenderFilter(item);
                                }}>
                                <Text>{item}</Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      )}
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#eaeaea',
                        paddingBottom: '2%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: '2%',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#000',
                            marginBottom: '2%',
                          }}>
                          Location
                        </Text>
                        {!chev[`loc`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('loc');
                            }}>
                            <MaterialIcon
                              name={'chevron-up'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                        {chev[`loc`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('loc');
                            }}>
                            <MaterialIcon
                              name={'chevron-down'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                      </View>

                      {!chev[`loc`] && (
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                          }}>
                          <SearchBarLoc
                            // withIcon
                            handleBottomList={() => {
                              // setVisible(true);
                            }}
                            // handleBottomList={handleBottomList}
                            placeholderTextColor={'#009387'}
                            placeholder={`Search Location`}
                            // icon={
                            //   <Image
                            //     source={require('../../../assets/icons/configure.png')}
                            //     style={{height: 24, width: 24}}
                            //   />
                            // }
                            searchIcon={
                              <Image
                                source={require('../../../assets/icons/search.png')}
                                style={{height: 20, width: 20}}
                                color={Colors.search_placeholder_text[theme]}
                              />
                            }
                            onEndEditing={(value) => {
                              setLocation(value);
                              console.log(value, 'dlkfjdskfj');
                            }}
                            onChangeText={(value) => {
                              setLocation(value);
                              console.log(value, 'dlkfjdskfj');
                            }}
                            style={{
                              backgroundColor: '#e0f2f2',
                              color: '#009387',
                              borderRadius: 5,
                              marginLeft: '5%',
                            }}
                          />
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginLeft: '5%',
                            }}>
                            <CheckBox
                              title="value1"
                              checkedIcon="dot-circle-o"
                              uncheckedIcon="circle-o"
                              checked={location === ''}
                              onPress={() => setLocation('')}></CheckBox>
                            <Text
                              style={{
                                color: '#009387',
                              }}>
                              Any Location
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#eaeaea',
                        paddingBottom: '2%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: '2%',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#000',
                            marginBottom: '2%',
                          }}>
                          Ratings: {`${ratings}`}
                        </Text>
                        {!chev[`rating`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('rating');
                            }}>
                            <MaterialIcon
                              name={'chevron-up'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                        {chev[`rating`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('rating');
                            }}>
                            <MaterialIcon
                              name={'chevron-down'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                      </View>

                      {!chev[`rating`] && (
                        <Slider
                          // style={{width: 280, height: 40}}
                          minimumValue={3}
                          maximumValue={5}
                          thumbTintColor="#009387"
                          maximumTrackTintColor="#009387"
                          minimumTrackTintColor="#009387"
                          tapToSeek={true}
                          // inverted
                          style={{
                            width: 300,
                            opacity: 1,
                            height: 50,
                            marginTop: 10,
                          }}
                          step={0.5}
                          onValueChange={(value) => {
                            console.log(value);
                            if (value != 3) {
                              setRatings(`${value}+`);
                            } else {
                              setRatings(`Any`);
                            }
                          }}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#eaeaea',
                        paddingBottom: '2%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: '2%',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#000',
                            marginBottom: '2%',
                          }}>
                          Experience: {`${exp}`}
                        </Text>
                        {!chev[`exp`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('exp');
                            }}>
                            <MaterialIcon
                              name={'chevron-up'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                        {chev[`exp`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('exp');
                            }}>
                            <MaterialIcon
                              name={'chevron-down'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                      </View>

                      {!chev[`exp`] && (
                        <Slider
                          // style={{width: 280, height: 40}}
                          minimumValue={0}
                          maximumValue={15}
                          thumbTintColor="#009387"
                          maximumTrackTintColor="#009387"
                          minimumTrackTintColor="#009387"
                          tapToSeek={true}
                          // inverted
                          style={{
                            width: 300,
                            opacity: 1,
                            height: 50,
                            marginTop: 10,
                          }}
                          step={3}
                          onValueChange={(value) => {
                            console.log(value);
                            if (value != 0) {
                              setExp(`${value}+`);
                            } else {
                              setExp(`Any`);
                            }
                          }}
                        />
                      )}
                    </View>

                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#eaeaea',
                        paddingBottom: '2%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: '2%',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#000',
                            marginBottom: '2%',
                          }}>
                          Availability
                        </Text>
                        {!chev[`avail`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('avail');
                            }}>
                            <MaterialIcon
                              name={'chevron-up'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                        {chev[`avail`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('avail');
                            }}>
                            <MaterialIcon
                              name={'chevron-down'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                      </View>

                      {!chev[`avail`] && (
                        <RadioGroup
                          getChecked={(value) => {
                            if (value !== 'Now') {
                              if (value === 'Next 3 Days') {
                                onChangeRadioFilter(value, 0, 24);
                              } else {
                                if (value === 'Next 7 Days') {
                                  onChangeRadioFilter(value, 0, 24);
                                }
                              }
                              setNowFilter('');
                            } else {
                              setNowFilter('Now');
                              setRadioFiltervalue([]);
                            }
                          }}>
                          <Radio
                            iconName={'lens'}
                            label={'Now'}
                            value={'Now'}
                          />
                          <Radio
                            iconName={'lens'}
                            label={'Next 3 Days'}
                            value={'Next 3 Days'}
                          />
                          <Radio
                            iconName={'lens'}
                            label={'Next 7 Days'}
                            value={'Next 7 Days'}
                          />
                        </RadioGroup>
                      )}
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#eaeaea',
                        paddingBottom: '2%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: '2%',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#000',
                            marginBottom: '2%',
                          }}>
                          Time of the Day
                        </Text>
                        {!chev[`timeOfDay`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('timeOfDay');
                            }}>
                            <MaterialIcon
                              name={'chevron-up'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                        {chev[`timeOfDay`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('timeOfDay');
                            }}>
                            <MaterialIcon
                              name={'chevron-down'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                      </View>

                      {!chev[`timeOfDay`] && (
                        <RadioGroup
                          getChecked={(value) => {
                            if (value === 'Early Morning') {
                              onChangeRadioFilterT(value, 0, 10);
                            } else if (value === 'Morning') {
                              onChangeRadioFilterT(value, 0, 12);
                            } else if (value === 'Afternoon') {
                              onChangeRadioFilterT(value, 12, 24);
                            } else {
                              onChangeRadioFilterT(value, 17, 24);
                            }
                          }}>
                          <Radio
                            iconName={'lens'}
                            label={'Early Morning'}
                            value={'Early Morning'}
                          />
                          {/* <Radio iconName={"lens"} label={"Early Morning"} value={["Early Morning", 0, 24]} /> */}
                          <Radio
                            iconName={'lens'}
                            label={'Morning'}
                            value={'Morning'}
                          />
                          <Radio
                            iconName={'lens'}
                            label={'Afternoon'}
                            value={'Afternoon'}
                          />
                          <Radio
                            iconName={'lens'}
                            label={'Evening'}
                            value={'Evening'}
                          />
                        </RadioGroup>
                      )}
                    </View>

                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#eaeaea',
                        paddingBottom: '2%',
                        marginBottom: '2%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: '2%',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#000',
                            marginBottom: '2%',
                          }}>
                          Sort by
                        </Text>
                        {!chev[`sort`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('sort');
                            }}>
                            <MaterialIcon
                              name={'chevron-up'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                        {chev[`sort`] && (
                          <TouchableOpacity
                            onPress={() => {
                              onToggleExpand('sort');
                            }}>
                            <MaterialIcon
                              name={'chevron-down'}
                              size={30}
                              color={'#43A2A2'}
                            />
                          </TouchableOpacity>
                        )}
                      </View>

                      {!chev[`sort`] && (
                        <RadioGroup
                          getChecked={(value) => {
                            setSort(value);
                          }}>
                          <Radio
                            iconName={'lens'}
                            label={'Price: High to Low'}
                            value={'highToLow'}
                          />
                          <Radio
                            iconName={'lens'}
                            label={'Price: Low to High'}
                            value={'lowToHigh'}
                          />
                          <Radio
                            iconName={'lens'}
                            label={'Earliest Available'}
                            value={'earliest'}
                          />
                        </RadioGroup>
                      )}
                    </View>
                  </View>
                </ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#e0f2f2',
                    padding: '5%',
                    width: 350,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      clearAll();
                    }}
                    style={{
                      // backgroundColor: "#009387",
                      // elevation: 1,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: '#c7c7c7',
                        paddingVertical: '2%',
                        paddingHorizontal: '8%',
                      }}>
                      Clear all
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      applyAllFilter();
                    }}
                    style={{
                      backgroundColor: '#009387',
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: '#ffffff',
                        paddingVertical: '2%',
                        paddingHorizontal: '8%',
                      }}>
                      Apply
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* </BlurModal> */}
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.primary_background[theme],
        }}>
        <BottomSheet
          modalProps={{
            touc: () => {
              setIsBottomSheetVisible(false);
            },
          }}
          onBackButtonPress={() => setIsBottomSheetVisible(false)}
          visible={isBottomSheetVisible}
          onBackdropPress={() => setIsBottomSheetVisible(false)}>
          <View
            style={{
              // backgroundColor: 'white',
              backgroundColor: Colors.secondary_background[theme],
              // padding: '5%',
              // paddingBottom: "0%",
              // borderRadius: 15,
              width: '100%',
              height: '70%',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              alignSelf: 'center',
              margin: '2%',
              justifyContent: 'center',
              alignItems: 'center',
              //   borderWidth: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // width: 350,
                width: '100%',
                borderBottomWidth: 1,
                borderColor: '#eaeaea',
                padding: '5%',
                paddingBottom: 10,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  color: '#009387',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Filters
              </Text>
              <TouchableOpacity
                onPress={() => {
                  // setVisible(false);
                  setIsBottomSheetVisible(false);
                }}>
                <Text
                  style={{
                    color: '#009387',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  X
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={{
                // height:
                // width: 350,
                width: '100%',
                paddingHorizontal: '5%',
                // flexDirection: "column"
              }}>
              <View
                style={{
                  width: '100%',
                }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#eaeaea',
                    paddingBottom: '2%',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000',
                        marginBottom: '2%',
                      }}>
                      Language
                    </Text>
                    {!chev[`language`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('language');
                        }}>
                        <MaterialIcon
                          name={'chevron-up'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                    {chev[`language`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('language');
                        }}>
                        <MaterialIcon
                          name={'chevron-down'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  {!chev[`language`] && (
                    <ScrollView
                      horizontal
                      contentContainerStyle={{
                        width: 9 * 100,
                      }}
                      showsHorizontalScrollIndicator={false}>
                      {[
                        'Hindi',
                        'English',
                        'Arabic',
                        'Spanish',
                        'French',
                        'Marathi',
                        'Tamil',
                        'Burmese',
                        'Kannada',
                        'Telugu',
                      ].map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              backgroundColor: languages.includes(item)
                                ? '#e0f2f2'
                                : '#eaeaea',
                              paddingHorizontal: '6%',
                              paddingVertical: '1%',
                              borderRadius: 5,
                              marginHorizontal: 2,
                              marginVertical: 1,
                            }}
                            onPress={() => {
                              if (!languages.includes(item)) {
                                setLanguages([...languages, item]);
                                // setSelectedSp(e.target.value);
                                // setSpecialityList([e.target.value])
                              } else {
                                const selectedAcc = languages.filter((a) => {
                                  if (a === item) return false;
                                  return true;
                                });
                                setLanguages([...selectedAcc]);
                                // setSelectedSp(specialityList[0]);
                              }
                            }}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  )}
                </View>

                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#eaeaea',
                    paddingBottom: '2%',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: '2%',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000',
                        marginBottom: '2%',
                      }}>
                      Speciality
                    </Text>
                    {!chev[`specialty`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('specialty');
                        }}>
                        <MaterialIcon
                          name={'chevron-up'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                    {chev[`specialty`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('specialty');
                        }}>
                        <MaterialIcon
                          name={'chevron-down'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  {!chev[`specialty`] && (
                    <ScrollView
                      horizontal
                      contentContainerStyle={{
                        width: specialty.length * 20,
                        height: 40,
                      }}
                      showsHorizontalScrollIndicator={false}>
                      {specialty.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              backgroundColor: specialityList.includes(item)
                                ? '#e0f2f2'
                                : '#eaeaea',
                              paddingHorizontal: '6%',
                              paddingVertical: '1%',
                              borderRadius: 5,
                              marginHorizontal: 2,
                              marginVertical: 1,
                            }}
                            onPress={() => {
                              if (!specialityList.includes(item)) {
                                setSpecialityList([...specialityList, item]);
                                // setSelectedSp(e.target.value);
                                // setSpecialityList([e.target.value])
                              } else {
                                const selectedAcc = specialityList.filter(
                                  (a) => {
                                    if (a === item) return false;
                                    return true;
                                  },
                                );
                                setSpecialityList([...selectedAcc]);
                                // setSelectedSp(specialityList[0]);
                              }
                            }}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  )}
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#eaeaea',
                    paddingBottom: '2%',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: '2%',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000',
                        marginBottom: '2%',
                      }}>
                      Gender
                    </Text>
                    {!chev[`gender`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('gender');
                        }}>
                        <MaterialIcon
                          name={'chevron-up'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                    {chev[`gender`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('gender');
                        }}>
                        <MaterialIcon
                          name={'chevron-down'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  {!chev[`gender`] && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        paddingBottom: '2%',
                      }}>
                      {['Male', 'Female'].map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              backgroundColor:
                                GenderFilter === item ? '#e0f2f2' : '#eaeaea',
                              paddingHorizontal: '6%',
                              paddingVertical: '1%',
                              paddingBottom: '3%',
                              borderRadius: 5,
                              marginHorizontal: 2,
                              marginVertical: 3,
                            }}
                            onPress={() => {
                              setGenderFilter(item);
                            }}>
                            <Text>{item}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#eaeaea',
                    paddingBottom: '2%',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: '2%',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000',
                        marginBottom: '2%',
                      }}>
                      Location
                    </Text>
                    {!chev[`loc`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('loc');
                        }}>
                        <MaterialIcon
                          name={'chevron-up'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                    {chev[`loc`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('loc');
                        }}>
                        <MaterialIcon
                          name={'chevron-down'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  {!chev[`loc`] && (
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                      }}>
                      <SearchBarLoc
                        // withIcon
                        handleBottomList={() => {
                          // setVisible(true);
                        }}
                        // handleBottomList={handleBottomList}
                        placeholderTextColor={'#009387'}
                        placeholder={`Search Location`}
                        // icon={
                        //   <Image
                        //     source={require('../../../assets/icons/configure.png')}
                        //     style={{height: 24, width: 24}}
                        //   />
                        // }
                        searchIcon={
                          <Image
                            source={require('../../../assets/icons/search.png')}
                            style={{height: 20, width: 20}}
                            color={Colors.search_placeholder_text[theme]}
                          />
                        }
                        onEndEditing={(value) => {
                          setLocation(value);
                          console.log(value, 'dlkfjdskfj');
                        }}
                        onChangeText={(value) => {
                          setLocation(value);
                          console.log(value, 'dlkfjdskfj');
                        }}
                        style={{
                          backgroundColor: '#e0f2f2',
                          color: '#009387',
                          borderRadius: 5,
                          marginLeft: '5%',
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginLeft: '5%',
                        }}>
                        <CheckBox
                          title="value1"
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="circle-o"
                          checked={location === ''}
                          onPress={() => setLocation('')}></CheckBox>
                        <Text
                          style={{
                            color: '#009387',
                          }}>
                          Any Location
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#eaeaea',
                    paddingBottom: '2%',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: '2%',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000',
                        marginBottom: '2%',
                      }}>
                      Ratings: {`${ratings}`}
                    </Text>
                    {!chev[`rating`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('rating');
                        }}>
                        <MaterialIcon
                          name={'chevron-up'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                    {chev[`rating`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('rating');
                        }}>
                        <MaterialIcon
                          name={'chevron-down'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  {!chev[`rating`] && (
                    <Slider
                      // style={{width: 280, height: 40}}
                      minimumValue={3}
                      maximumValue={5}
                      thumbTintColor="#009387"
                      maximumTrackTintColor="#009387"
                      minimumTrackTintColor="#009387"
                      tapToSeek={true}
                      // inverted
                      style={{
                        width: 300,
                        opacity: 1,
                        height: 50,
                        marginTop: 10,
                      }}
                      step={0.5}
                      onValueChange={(value) => {
                        console.log(value);
                        if (value != 3) {
                          setRatings(`${value}+`);
                        } else {
                          setRatings(`Any`);
                        }
                      }}
                    />
                  )}
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#eaeaea',
                    paddingBottom: '2%',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: '2%',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000',
                        marginBottom: '2%',
                      }}>
                      Experience: {`${exp}`}
                    </Text>
                    {!chev[`exp`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('exp');
                        }}>
                        <MaterialIcon
                          name={'chevron-up'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                    {chev[`exp`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('exp');
                        }}>
                        <MaterialIcon
                          name={'chevron-down'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  {!chev[`exp`] && (
                    <Slider
                      // style={{width: 280, height: 40}}
                      minimumValue={0}
                      maximumValue={15}
                      thumbTintColor="#009387"
                      maximumTrackTintColor="#009387"
                      minimumTrackTintColor="#009387"
                      tapToSeek={true}
                      // inverted
                      style={{
                        width: 300,
                        opacity: 1,
                        height: 50,
                        marginTop: 10,
                      }}
                      step={3}
                      onValueChange={(value) => {
                        console.log(value);
                        if (value != 0) {
                          setExp(`${value}+`);
                        } else {
                          setExp(`Any`);
                        }
                      }}
                    />
                  )}
                </View>

                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#eaeaea',
                    paddingBottom: '2%',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: '2%',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000',
                        marginBottom: '2%',
                      }}>
                      Availability
                    </Text>
                    {!chev[`avail`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('avail');
                        }}>
                        <MaterialIcon
                          name={'chevron-up'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                    {chev[`avail`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('avail');
                        }}>
                        <MaterialIcon
                          name={'chevron-down'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  {!chev[`avail`] && (
                    <RadioGroup
                      getChecked={(value) => {
                        if (value !== 'Now') {
                          if (value === 'Next 3 Days') {
                            onChangeRadioFilter(value, 0, 24);
                          } else {
                            if (value === 'Next 7 Days') {
                              onChangeRadioFilter(value, 0, 24);
                            }
                          }
                          setNowFilter('');
                        } else {
                          setNowFilter('Now');
                          setRadioFiltervalue([]);
                        }
                      }}>
                      <Radio iconName={'lens'} label={'Now'} value={'Now'} />
                      <Radio
                        iconName={'lens'}
                        label={'Next 3 Days'}
                        value={'Next 3 Days'}
                      />
                      <Radio
                        iconName={'lens'}
                        label={'Next 7 Days'}
                        value={'Next 7 Days'}
                      />
                    </RadioGroup>
                  )}
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#eaeaea',
                    paddingBottom: '2%',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: '2%',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000',
                        marginBottom: '2%',
                      }}>
                      Time of the Day
                    </Text>
                    {!chev[`timeOfDay`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('timeOfDay');
                        }}>
                        <MaterialIcon
                          name={'chevron-up'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                    {chev[`timeOfDay`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('timeOfDay');
                        }}>
                        <MaterialIcon
                          name={'chevron-down'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  {!chev[`timeOfDay`] && (
                    <RadioGroup
                      getChecked={(value) => {
                        if (value === 'Early Morning') {
                          onChangeRadioFilterT(value, 0, 10);
                        } else if (value === 'Morning') {
                          onChangeRadioFilterT(value, 0, 12);
                        } else if (value === 'Afternoon') {
                          onChangeRadioFilterT(value, 12, 24);
                        } else {
                          onChangeRadioFilterT(value, 17, 24);
                        }
                      }}>
                      <Radio
                        iconName={'lens'}
                        label={'Early Morning'}
                        value={'Early Morning'}
                      />
                      {/* <Radio iconName={"lens"} label={"Early Morning"} value={["Early Morning", 0, 24]} /> */}
                      <Radio
                        iconName={'lens'}
                        label={'Morning'}
                        value={'Morning'}
                      />
                      <Radio
                        iconName={'lens'}
                        label={'Afternoon'}
                        value={'Afternoon'}
                      />
                      <Radio
                        iconName={'lens'}
                        label={'Evening'}
                        value={'Evening'}
                      />
                    </RadioGroup>
                  )}
                </View>

                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#eaeaea',
                    paddingBottom: '2%',
                    marginBottom: '2%',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: '2%',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000',
                        marginBottom: '2%',
                      }}>
                      Sort by
                    </Text>
                    {!chev[`sort`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('sort');
                        }}>
                        <MaterialIcon
                          name={'chevron-up'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                    {chev[`sort`] && (
                      <TouchableOpacity
                        onPress={() => {
                          onToggleExpand('sort');
                        }}>
                        <MaterialIcon
                          name={'chevron-down'}
                          size={30}
                          color={'#43A2A2'}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  {!chev[`sort`] && (
                    <RadioGroup
                      getChecked={(value) => {
                        setSort(value);
                      }}>
                      <Radio
                        iconName={'lens'}
                        label={'Price: High to Low'}
                        value={'highToLow'}
                      />
                      <Radio
                        iconName={'lens'}
                        label={'Price: Low to High'}
                        value={'lowToHigh'}
                      />
                      <Radio
                        iconName={'lens'}
                        label={'Earliest Available'}
                        value={'earliest'}
                      />
                    </RadioGroup>
                  )}
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#e0f2f2',
                padding: '5%',
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  clearAll();
                }}
                style={{
                  // backgroundColor: "#009387",
                  // elevation: 1,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    color: '#c7c7c7',
                    paddingVertical: '2%',
                    paddingHorizontal: '8%',
                  }}>
                  Clear all
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  applyAllFilter();
                }}
                style={{
                  backgroundColor: '#009387',
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    color: '#ffffff',
                    paddingVertical: '2%',
                    paddingHorizontal: '8%',
                  }}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* {list.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={[
                l.containerStyle,
                {backgroundColor: Colors.bottom_sheet_bg[theme]},
              ]}
              onPress={l.onPress}>
              <ListItem.Content>
                <ListItem.Title
                  style={[
                    l.titleStyle,
                    {color: Colors.primary_text_color[theme]},
                  ]}>
                  {l.title}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))} */}
        </BottomSheet>
        <TopNavBar
          onLeftButtonPress={onTopNavLeftButtonPress}
          // onRightButtonPress={() => {}}
          LeftComp={<View></View>}
          navigation={navigation}
          style={topNavStyle}
          headerText={`${Local('patient.landing_page.search_for_doctor')}`}
        />
        <FlatList
          ListHeaderComponent={
            <LandingPageHeader
            setLanguages={setLanguages}
            languages={languages}
    setSpecialityList={setSpecialityList}
    specialityList={specialityList}
    setGenderFilter={setGenderFilter}
            GenderFilter={GenderFilter}
            NowFilter={NowFilter}
            setNowFilter={setNowFilter}
    setRatings={setRatings}
    ratings={ratings}
    setRatings={setRatings}
    exp={exp}
    setExp={setExp}
    RadioFiltervalue={RadioFiltervalue}
    setRadioFiltervalue={setRadioFiltervalue}
    setRadioFiltervalueT={setRadioFiltervalueT}
    RadioFiltervalueT={RadioFiltervalueT}
    sort={sort}
    setSort={setSort}
    location={location}
    setLocation={setLocation}
    change={change}
    setChange={setChange}
    applyAllFilter={applyAllFilter}
              setVisible={setVisible}
              theme={theme}
              setIsBottomSheetVisible={setIsBottomSheetVisible}
              onEndEditing={onEndEditing}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              toggle={toggle}
              setDoctorLocalState={setDoctorLocalState}
              doctors={doctors}
              superDocs={superDocs}
              tempSpecialityIcons={tempSpecialityIcons}
              ActiveSpeciality={ActiveSpeciality}
              setActiveSpeciality={setActiveSpeciality}
              handleSpecialtyFilter={handleSpecialtyFilter}
              specialty={specialty}
              allSpeciality={allSpeciality}
              onToggle={onToggle}
            />
          }
          ListFooterComponent={
            <ListFooterComponent loading={fetchingMoreData} />
          }
          ListEmptyComponent={() => {
            return (
              <EmptyListComponent theme={theme} loading={localDoctorLoading} />
            );
          }}
          extraData={mainListExtraData}
          data={doctorLocalState}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={localDoctorLoading}
              onRefresh={onRefresh}
            />
          }
          refreshing={localDoctorLoading}
          onRefresh={onRefresh}
          renderItem={({item, index}) => {
            console.log(item?.deviceToken, "klsdfjsdklfjsdfjdskjdklf")
            if (!localDoctorLoading) {
              return (
                <FluidAnimation
                  delay={index < 10 ? index * 30 : (index - 10) * 10}
                  duration={index < 10 ? 350 : 200}
                  scale={0.8}
                  opacity={0.5}>
                  <AvailDoctorContainerV2
                    toggle={toggle}
                    data={item}
                    navigation={navigation}
                    setConsultLoading={setConsultLoading}
                    name={
                      item?.basic?.name
                        ? item?.basic?.name
                        : item?.firstName + ' ' + item?.lastName
                    }
                    schedule={item.output}
                  />
                </FluidAnimation>
              );
            }
            return <ListingWithThumbnailLoader />;
          }}
          onEndReached={(res) => {
            if (res.distanceFromEnd < 150 && res.distanceFromEnd > 0) {
              _fetchMoreDoctorLite();
            }
          }}
          onEndReachedThreshold={0.1}
          onMomentumScrollEnd={(res) => {
            // console.log('momentuem end ', res.nativeEvent);
          }}
        />
      </View>
    </>
  );
}

function LandingPageHeader({
  setLanguages,
            languages,
    setSpecialityList,
    specialityList,
    setGenderFilter,
            GenderFilter,
    setRatings,
    ratings,
    exp,
    setExp,
    RadioFiltervalue,
    setRadioFiltervalue,
    setRadioFiltervalueT,
    RadioFiltervalueT,
    setSort,
    sort,
    NowFilter,
    setNowFilter,
    setLocation,
    location,
    change,
    setChange,

    applyAllFilter,
    setVisible,
  theme,
  setIsBottomSheetVisible,
  onEndEditing,
  activeFilter,
  setActiveFilter,
  toggle,
  setDoctorLocalState,
  doctors,
  superDocs,
  tempSpecialityIcons,
  handleSpecialtyFilter,
  specialty,

  allSpeciality,
  onToggle,
  ActiveSpeciality,
  setActiveSpeciality,
}) {
  const extStyle = useMemo(() => {
    return {
      container: {
        backgroundColor: Colors.primary_background[theme],
      },
      searchBarContainer: [
        LpHeaderStyles.searchBarContainer,
        {
          backgroundColor: Colors.secondary_background[theme],
        },
      ],
      searchBarStyle: [
        LpHeaderStyles.searchBarStyle,
        {
          backgroundColor: Colors.search_background[theme],
        },
      ],
      basicCardStyle: {
        CardContainer: {
          ...LpHeaderStyles.basicCard,
          borderColor: '#009387',
          borderWidth: theme === 'DARK' ? 2 : 0,
          backgroundColor: Colors.basic_card_bg[theme],
        },
      },
      basicCardStyleN: {
        CardContainer: {
          // ...LpHeaderStyles.basicCardN,
          elevation: 2,
          justifyContent: 'center',
          padding: '1%',
          height: 35,
          width: 120,
          borderRadius: 8,
          borderColor: '#009387',
          borderWidth: theme === 'DARK' ? 2 : 0,
          // backgroundColor: Colors.basic_card_bg[theme],
        },
      },
    };
  }, [theme]);
  const handleBottomList = useCallback(() => {
    setIsBottomSheetVisible(true);
  }, [setIsBottomSheetVisible]);
  const onPressNegateAllDoctorBasic = useCallback(() => {
    handleSpecialtyFilter(ActiveSpeciality.item, ActiveSpeciality.i);
  }, [ActiveSpeciality.i, ActiveSpeciality.item, handleSpecialtyFilter]);
  const onPressAllDoctorBasic = useCallback(() => {
    setActiveFilter(1);
    setActiveSpeciality({item: '', i: ''});
    if (toggle == 0) {
      setDoctorLocalState(doctors);
    } else {
      setDoctorLocalState(superDocs);
    }
  }, [
    doctors,
    setActiveFilter,
    setActiveSpeciality,
    setDoctorLocalState,
    superDocs,
    toggle,
  ]);

  const [filter, setFilter] = useState(0)
  
  useEffect(() => {
    let temp = 0
    if(languages.length > 0) {
      temp += languages.length
    }
    if(specialityList.length > 0) {
      temp += specialityList.length
    }
    if(RadioFiltervalue.length > 0) {
      temp += 1
    }
    if(RadioFiltervalueT.length > 0) {
      temp += 1
    }
    if(NowFilter !== "") {
      temp += 1
    }
    if(GenderFilter !== "") {
      temp += 1
    }
    if(location !== "") {
      temp += 1
    }
    if(exp !== "Any") {
      temp += 1
    }
    if(ratings !== "Any") {
      temp += 1
    }
    // if(sort !== "") {
    //   temp += 1
    // }

    setFilter(temp)
  }, [languages, specialityList, RadioFiltervalue, RadioFiltervalueT, NowFilter, GenderFilter, location, exp, ratings, sort])
  return (
    <View style={extStyle.container}>
      {
        filter > 0 && <View
        style={{
          ...extStyle.searchBarContainer,
          paddingVertical: 0,
          marginBottom: '-4%',
          flexDirection: "row",
          zIndex: 1000,
        }}>
        <ScrollView
          horizontal
          contentContainerStyle={LpHeaderStyles.scrollViewContentContainer}
          showsHorizontalScrollIndicator={false}>
          {
            languages.map((item, index) => {
              return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <BasicCardN
                  
                  style={{
                    CardContainer: {
                      elevation: 2,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: '1%',
                      height: 25,
                      width: 150,
                      borderRadius: 8,
                      borderColor: '#009387',
                      borderWidth: theme === 'DARK' ? 2 : 0,
                      // backgroundColor: Colors.basic_card_bg[theme],
                    },
                  }}
                  // style={extStyle.basicCardStyleN}
                  >
                  <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between'
                  }}>
                    <Text
                      minimumFontScale={0.8}
                      ellipsizeMode={'tail'}
                      lineBreakMode={'tail'}
                      textBreakStrategy={'balanced'}
                      numberOfLines={2}
                      style={{
                        ...LpHeaderStyles.basicCardTextN,
                        color: '#000',
                      }}>
                      Language: {item}
                    </Text>
                    {/* <Entypo
                              name={'cross'}
                              size={30}
                              color={'#43A2A2'}
                            /> */}
                    <TouchableOpacity style={{
                      marginLeft: '2%',
                      marginTop: "1%"
                    }} onPress={() => {
                      const temp = languages.filter((e, index) => {
                        if(item !== e) return item
                      })
                      setLanguages(temp)
                      setChange(!change)
                    }}>
                      <Text
                    minimumFontScale={0.8}
                    ellipsizeMode={'tail'}
                    lineBreakMode={'tail'}
                    textBreakStrategy={'balanced'}
                    numberOfLines={2}
                    style={{
                      ...LpHeaderStyles.basicCardTextN,
                      color: "#000"
                    }}>
                      x
                  </Text>
                    </TouchableOpacity>
                  </View>
                </BasicCardN>
              </TouchableOpacity>
              )
            })
          }
          {
            specialityList.map((item, index) => {
              return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <BasicCardN
                  
                  style={{
                    CardContainer: {
                      elevation: 2,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: '1%',
                      height: 25,
                      width: 150,
                      borderRadius: 8,
                      borderColor: '#009387',
                      borderWidth: theme === 'DARK' ? 2 : 0,
                      // backgroundColor: Colors.basic_card_bg[theme],
                    },
                  }}
                  // style={extStyle.basicCardStyleN}
                  >
                  <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between'
                  }}>
                    <Text
                      minimumFontScale={0.8}
                      ellipsizeMode={'tail'}
                      lineBreakMode={'tail'}
                      textBreakStrategy={'balanced'}
                      numberOfLines={2}
                      style={{
                        ...LpHeaderStyles.basicCardTextN,
                        color: '#000',
                      }}>
                      {item}
                    </Text>
                    {/* <Entypo
                              name={'cross'}
                              size={30}
                              color={'#43A2A2'}
                            /> */}
                    <TouchableOpacity style={{
                      marginLeft: '2%',
                      marginTop: "1%"
                    }} onPress={() => {
                      const temp = specialityList.filter((e, index) => {
                        if(item !== e) return item
                      })
                      setSpecialityList(temp)
                      setChange(!change)
                    }}>
                      <Text
                    minimumFontScale={0.8}
                    ellipsizeMode={'tail'}
                    lineBreakMode={'tail'}
                    textBreakStrategy={'balanced'}
                    numberOfLines={2}
                    style={{
                      ...LpHeaderStyles.basicCardTextN,
                      color: "#000"
                    }}>
                      x
                  </Text>
                    </TouchableOpacity>
                  </View>
                </BasicCardN>
              </TouchableOpacity>
              )
            })
          }
          {
            RadioFiltervalue.map((item, index) => {
              return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <BasicCardN
                  
                  style={{
                    CardContainer: {
                      elevation: 2,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: '1%',
                      height: 25,
                      width: 150,
                      borderRadius: 8,
                      borderColor: '#009387',
                      borderWidth: theme === 'DARK' ? 2 : 0,
                      // backgroundColor: Colors.basic_card_bg[theme],
                    },
                  }}
                  // style={extStyle.basicCardStyleN}
                  >
                  <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between'
                  }}>
                    <Text
                      minimumFontScale={0.8}
                      ellipsizeMode={'tail'}
                      lineBreakMode={'tail'}
                      textBreakStrategy={'balanced'}
                      numberOfLines={2}
                      style={{
                        ...LpHeaderStyles.basicCardTextN,
                        color: '#000',
                      }}>
                      {item.time}
                    </Text>
                    {/* <Entypo
                              name={'cross'}
                              size={30}
                              color={'#43A2A2'}
                            /> */}
                    <TouchableOpacity style={{
                      marginLeft: '2%',
                      marginTop: "1%"
                    }} onPress={() => {
                      // const temp = specialityList.filter((e, index) => {
                      //   if(item !== e) return item
                      // })
                      setRadioFiltervalue([])
                      setChange(!change)
                    }}>
                      <Text
                    minimumFontScale={0.8}
                    ellipsizeMode={'tail'}
                    lineBreakMode={'tail'}
                    textBreakStrategy={'balanced'}
                    numberOfLines={2}
                    style={{
                      ...LpHeaderStyles.basicCardTextN,
                      color: "#000"
                    }}>
                      x
                  </Text>
                    </TouchableOpacity>
                  </View>
                </BasicCardN>
              </TouchableOpacity>
              )
            })
          }
          {
            RadioFiltervalueT.map((item, index) => {
              return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <BasicCardN
                  
                  style={{
                    CardContainer: {
                      elevation: 2,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: '1%',
                      height: 25,
                      width: 150,
                      borderRadius: 8,
                      borderColor: '#009387',
                      borderWidth: theme === 'DARK' ? 2 : 0,
                      // backgroundColor: Colors.basic_card_bg[theme],
                    },
                  }}
                  // style={extStyle.basicCardStyleN}
                  >
                  <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between'
                  }}>
                    <Text
                      minimumFontScale={0.8}
                      ellipsizeMode={'tail'}
                      lineBreakMode={'tail'}
                      textBreakStrategy={'balanced'}
                      numberOfLines={2}
                      style={{
                        ...LpHeaderStyles.basicCardTextN,
                        color: '#000',
                      }}>
                      {item.time}
                    </Text>
                    {/* <Entypo
                              name={'cross'}
                              size={30}
                              color={'#43A2A2'}
                            /> */}
                    <TouchableOpacity style={{
                      marginLeft: '2%',
                      marginTop: "1%"
                    }} onPress={() => {
                      // const temp = specialityList.filter((e, index) => {
                      //   if(item !== e) return item
                      // })
                      setRadioFiltervalueT([])
                      setChange(!change)
                    }}>
                      <Text
                    minimumFontScale={0.8}
                    ellipsizeMode={'tail'}
                    lineBreakMode={'tail'}
                    textBreakStrategy={'balanced'}
                    numberOfLines={2}
                    style={{
                      ...LpHeaderStyles.basicCardTextN,
                      color: "#000"
                    }}>
                      x
                  </Text>
                    </TouchableOpacity>
                  </View>
                </BasicCardN>
              </TouchableOpacity>
              )
            })
          }
          {
            NowFilter !== "" &&
                <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <BasicCardN
                  
                  style={{
                    CardContainer: {
                      elevation: 2,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: '1%',
                      height: 25,
                      width: 150,
                      borderRadius: 8,
                      borderColor: '#009387',
                      borderWidth: theme === 'DARK' ? 2 : 0,
                      // backgroundColor: Colors.basic_card_bg[theme],
                    },
                  }}
                  // style={extStyle.basicCardStyleN}
                  >
                  <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between'
                  }}>
                    <Text
                      minimumFontScale={0.8}
                      ellipsizeMode={'tail'}
                      lineBreakMode={'tail'}
                      textBreakStrategy={'balanced'}
                      numberOfLines={2}
                      style={{
                        ...LpHeaderStyles.basicCardTextN,
                        color: '#000',
                      }}>
                      {NowFilter}
                    </Text>
                    {/* <Entypo
                              name={'cross'}
                              size={30}
                              color={'#43A2A2'}
                            /> */}
                    <TouchableOpacity style={{
                      marginLeft: '2%',
                      marginTop: "1%"
                    }} onPress={() => {
                      setNowFilter("")
                      setChange(!change)
                    }}>
                      <Text
                    minimumFontScale={0.8}
                    ellipsizeMode={'tail'}
                    lineBreakMode={'tail'}
                    textBreakStrategy={'balanced'}
                    numberOfLines={2}
                    style={{
                      ...LpHeaderStyles.basicCardTextN,
                      color: "#000"
                    }}>
                      x
                  </Text>
                    </TouchableOpacity>
                  </View>
                </BasicCardN>
              </TouchableOpacity>
          }
          {
            GenderFilter !== "" &&
                <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <BasicCardN
                  
                  style={{
                    CardContainer: {
                      elevation: 2,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: '1%',
                      height: 25,
                      width: 150,
                      borderRadius: 8,
                      borderColor: '#009387',
                      borderWidth: theme === 'DARK' ? 2 : 0,
                      // backgroundColor: Colors.basic_card_bg[theme],
                    },
                  }}
                  // style={extStyle.basicCardStyleN}
                  >
                  <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between'
                  }}>
                    <Text
                      minimumFontScale={0.8}
                      ellipsizeMode={'tail'}
                      lineBreakMode={'tail'}
                      textBreakStrategy={'balanced'}
                      numberOfLines={2}
                      style={{
                        ...LpHeaderStyles.basicCardTextN,
                        color: '#000',
                      }}>
                      {GenderFilter}
                    </Text>
                    {/* <Entypo
                              name={'cross'}
                              size={30}
                              color={'#43A2A2'}
                            /> */}
                    <TouchableOpacity style={{
                      marginLeft: '2%',
                      marginTop: "1%"
                    }} onPress={() => {
                      setGenderFilter("")
                      setChange(!change)
                    }}>
                      <Text
                    minimumFontScale={0.8}
                    ellipsizeMode={'tail'}
                    lineBreakMode={'tail'}
                    textBreakStrategy={'balanced'}
                    numberOfLines={2}
                    style={{
                      ...LpHeaderStyles.basicCardTextN,
                      color: "#000"
                    }}>
                      x
                  </Text>
                    </TouchableOpacity>
                  </View>
                </BasicCardN>
              </TouchableOpacity>
          }
          {
            location !== "" &&
                <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <BasicCardN
                  
                  style={{
                    CardContainer: {
                      elevation: 2,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: '1%',
                      height: 25,
                      width: 150,
                      borderRadius: 8,
                      borderColor: '#009387',
                      borderWidth: theme === 'DARK' ? 2 : 0,
                      // backgroundColor: Colors.basic_card_bg[theme],
                    },
                  }}
                  // style={extStyle.basicCardStyleN}
                  >
                  <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between'
                  }}>
                    <Text
                      minimumFontScale={0.8}
                      ellipsizeMode={'tail'}
                      lineBreakMode={'tail'}
                      textBreakStrategy={'balanced'}
                      numberOfLines={2}
                      style={{
                        ...LpHeaderStyles.basicCardTextN,
                        color: '#000',
                      }}>
                      Location: {location}
                    </Text>
                    {/* <Entypo
                              name={'cross'}
                              size={30}
                              color={'#43A2A2'}
                            /> */}
                    <TouchableOpacity style={{
                      marginLeft: '2%',
                      marginTop: "1%"
                    }} onPress={() => {
                      setLocation("")
                      setChange(!change)
                    }}>
                      <Text
                    minimumFontScale={0.8}
                    ellipsizeMode={'tail'}
                    lineBreakMode={'tail'}
                    textBreakStrategy={'balanced'}
                    numberOfLines={2}
                    style={{
                      ...LpHeaderStyles.basicCardTextN,
                      color: "#000"
                    }}>
                      x
                  </Text>
                    </TouchableOpacity>
                  </View>
                </BasicCardN>
              </TouchableOpacity>
          }
          {
            ratings !== "Any" &&
                <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <BasicCardN
                  
                  style={{
                    CardContainer: {
                      elevation: 2,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: '1%',
                      height: 25,
                      width: 150,
                      borderRadius: 8,
                      borderColor: '#009387',
                      borderWidth: theme === 'DARK' ? 2 : 0,
                      // backgroundColor: Colors.basic_card_bg[theme],
                    },
                  }}
                  // style={extStyle.basicCardStyleN}
                  >
                  <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between'
                  }}>
                    <Text
                      minimumFontScale={0.8}
                      ellipsizeMode={'tail'}
                      lineBreakMode={'tail'}
                      textBreakStrategy={'balanced'}
                      numberOfLines={2}
                      style={{
                        ...LpHeaderStyles.basicCardTextN,
                        color: '#000',
                      }}>
                      Ratings: {ratings}
                    </Text>
                    {/* <Entypo
                              name={'cross'}
                              size={30}
                              color={'#43A2A2'}
                            /> */}
                    <TouchableOpacity style={{
                      marginLeft: '2%',
                      marginTop: "1%"
                    }} onPress={() => {
                      setRatings("Any")
                      setChange(!change)
                    }}>
                      <Text
                    minimumFontScale={0.8}
                    ellipsizeMode={'tail'}
                    lineBreakMode={'tail'}
                    textBreakStrategy={'balanced'}
                    numberOfLines={2}
                    style={{
                      ...LpHeaderStyles.basicCardTextN,
                      color: "#000"
                    }}>
                      x
                  </Text>
                    </TouchableOpacity>
                  </View>
                </BasicCardN>
              </TouchableOpacity>
          }
          {
            exp !== "Any" &&
                <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <BasicCardN
                  
                  style={{
                    CardContainer: {
                      elevation: 2,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: '1%',
                      height: 25,
                      width: 150,
                      borderRadius: 8,
                      borderColor: '#009387',
                      borderWidth: theme === 'DARK' ? 2 : 0,
                      // backgroundColor: Colors.basic_card_bg[theme],
                    },
                  }}
                  // style={extStyle.basicCardStyleN}
                  >
                  <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between'
                  }}>
                    <Text
                      minimumFontScale={0.8}
                      ellipsizeMode={'tail'}
                      lineBreakMode={'tail'}
                      textBreakStrategy={'balanced'}
                      numberOfLines={2}
                      style={{
                        ...LpHeaderStyles.basicCardTextN,
                        color: '#000',
                      }}>
                      Experience: {exp}
                    </Text>
                    {/* <Entypo
                              name={'cross'}
                              size={30}
                              color={'#43A2A2'}
                            /> */}
                    <TouchableOpacity style={{
                      marginLeft: '2%',
                      marginTop: "1%"
                    }} onPress={() => {
                      setExp("Any")
                      setChange(!change)
                    }}>
                      <Text
                    minimumFontScale={0.8}
                    ellipsizeMode={'tail'}
                    lineBreakMode={'tail'}
                    textBreakStrategy={'balanced'}
                    numberOfLines={2}
                    style={{
                      ...LpHeaderStyles.basicCardTextN,
                      color: "#000"
                    }}>
                      x
                  </Text>
                    </TouchableOpacity>
                  </View>
                </BasicCardN>
              </TouchableOpacity>
          }
          {
            false && sort !== "" &&
                <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <BasicCardN
                  
                  style={{
                    CardContainer: {
                      elevation: 2,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: '1%',
                      height: 25,
                      width: 150,
                      borderRadius: 8,
                      borderColor: '#009387',
                      borderWidth: theme === 'DARK' ? 2 : 0,
                      // backgroundColor: Colors.basic_card_bg[theme],
                    },
                  }}
                  // style={extStyle.basicCardStyleN}
                  >
                  <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between'
                  }}>
                    <Text
                      minimumFontScale={0.8}
                      ellipsizeMode={'tail'}
                      lineBreakMode={'tail'}
                      textBreakStrategy={'balanced'}
                      numberOfLines={2}
                      style={{
                        ...LpHeaderStyles.basicCardTextN,
                        color: '#000',
                      }}>
                      Sort by: {sort}
                    </Text>
                    {/* <Entypo
                              name={'cross'}
                              size={30}
                              color={'#43A2A2'}
                            /> */}
                    <TouchableOpacity style={{
                      marginLeft: '2%',
                      marginTop: "1%"
                    }} onPress={() => {
                      setSort("highToLow")
                      setChange(!change)
                    }}>
                      <Text
                    minimumFontScale={0.8}
                    ellipsizeMode={'tail'}
                    lineBreakMode={'tail'}
                    textBreakStrategy={'balanced'}
                    numberOfLines={2}
                    style={{
                      ...LpHeaderStyles.basicCardTextN,
                      color: "#000"
                    }}>
                      x
                  </Text>
                    </TouchableOpacity>
                  </View>
                </BasicCardN>
              </TouchableOpacity>
          }
          {[].map((item, index) => {
            return (
              <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <BasicCardN
                  // style={{
                  //   ...extStyle.basicCardStyleN,
                  //   // marginHorizontal: '-4%',
                  //   backgroundColor: '#e0f2f2',
                  //   justifyContent: 'row',
                  //   alignSelf: 'flex-start',
                  //   width: 300,
                  // }}
                  style={{
                    CardContainer: {
                      // ...LpHeaderStyles.basicCardN,
                      elevation: 2,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      padding: '1%',
                      height: 25,
                      width: 150,
                      borderRadius: 8,
                      borderColor: '#009387',
                      borderWidth: theme === 'DARK' ? 2 : 0,
                      // backgroundColor: Colors.basic_card_bg[theme],
                    },
                  }}
                  // style={extStyle.basicCardStyleN}
                  >
                  <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between'
                  }}>
                    <Text
                      minimumFontScale={0.8}
                      ellipsizeMode={'tail'}
                      lineBreakMode={'tail'}
                      textBreakStrategy={'balanced'}
                      numberOfLines={2}
                      style={{
                        ...LpHeaderStyles.basicCardTextN,
                        color: '#000',
                      }}>
                      Language: Hindi
                    </Text>
                    {/* <Entypo
                              name={'cross'}
                              size={30}
                              color={'#43A2A2'}
                            /> */}
                    <TouchableOpacity style={{
                      marginLeft: '2%',
                      marginTop: "1%"
                    }} onPress={() => {

                    }}>
                      <Text
                    minimumFontScale={0.8}
                    ellipsizeMode={'tail'}
                    lineBreakMode={'tail'}
                    textBreakStrategy={'balanced'}
                    numberOfLines={2}
                    style={{
                      ...LpHeaderStyles.basicCardTextN,
                      color: "#000"
                    }}>
                      x
                  </Text>
                    </TouchableOpacity>
                  </View>
                </BasicCardN>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      <View style={{
        // backgroundColor: "#eaeaea",
        marginVertical: "2%",
        paddingHorizontal: "2%",
        marginTop: "3%",
        paddingBottom: "2%",
        alignItems: 'center'
      }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <BasicCardN
                  
                  style={{
                    CardContainer: {
                      elevation: 2,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      paddingVertical: '2%',
                      paddingHorizontal: '2%',
                      marginHorizontal: '-2%',
                      height: 25,
                      width: 70,
                      borderRadius: 0,
                      borderColor: '#009387',
                      backgroundColor: '#eaeaea',
                      borderWidth: theme === 'DARK' ? 2 : 0,
                      // backgroundColor: Colors.basic_card_bg[theme],
                    },
                  }}
                  // style={extStyle.basicCardStyleN}
                  >
                  <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between'
                  }}>
                    <Text
                      minimumFontScale={0.8}
                      ellipsizeMode={'tail'}
                      lineBreakMode={'tail'}
                      textBreakStrategy={'balanced'}
                      numberOfLines={2}
                      style={{
                        ...LpHeaderStyles.basicCardTextN,
                        color: '#000',
                      }}>
                      Filters({filter})
                    </Text>
                    {/* <Entypo
                              name={'cross'}
                              size={30}
                              color={'#43A2A2'}
                            /> */}
                    
                  </View>
                </BasicCardN>
              </TouchableOpacity>
      </View>
      </View>
      }

      <View style={extStyle.searchBarContainer}>
        <SearchBarSolid
          withIcon
          // handleBottomList={() => {
          //   setVisible(true);
          // }}
          handleBottomList={handleBottomList}
          placeholderTextColor={Colors.search_placeholder_text[theme]}
          icon={
            <Image
              source={require('../../../assets/icons/configure.png')}
              style={{height: 24, width: 24}}
            />
          }
          searchIcon={
            <Image
              source={require('../../../assets/icons/search.png')}
              style={{height: 20, width: 20}}
              color={Colors.search_placeholder_text[theme]}
            />
          }
          onEndEditing={onEndEditing}
          style={extStyle.searchBarStyle}
        />
      </View>
      <View style={LpHeaderStyles.specialityAndToggleContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={LpHeaderStyles.scrollViewContentContainer}
          showsHorizontalScrollIndicator={false}>
          {activeFilter === 1 ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPressAllDoctorBasic}>
              <BasicCard style={extStyle.basicCardStyle}>
                <Image
                  source={tempSpecialityIcons[0]}
                  resizeMode="contain"
                  style={LpHeaderStyles.basicCardImage}
                />
                <Text
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                  ellipsizeMode={'tail'}
                  lineBreakMode={'tail'}
                  textBreakStrategy={'balanced'}
                  numberOfLines={1}
                  style={LpHeaderStyles.basicCardText}>
                  {`${Local('patient.landing_page.all_doctors')}`}
                </Text>
              </BasicCard>
            </TouchableOpacity>
          ) : null}
          {activeFilter !== 1 && ActiveSpeciality.item !== '' ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPressNegateAllDoctorBasic}>
              <BasicCard style={extStyle.basicCardStyle}>
                {/* <Image
                  source={tempSpecialityIcons[ActiveSpeciality.i + 1]}
                  resizeMode="contain"
                  style={LpHeaderStyles.basicCardImage}
                /> */}
                {allSpeciality.map((item, index) => {
                  if (ActiveSpeciality.item == item.name) {
                    if (item?.picture) {
                      console.log(item, '^^^^^^^^^^^^^^^^^^^^^^^^^');

                      return (
                        <Image
                          style={LpHeaderStyles.basicCardImage}
                          source={{
                            uri:
                              'data:image/svg+xml;utf8,' +
                              item?.svg
                                ?.replace(/F09245/g, '37acac')
                                ?.replace(/efa860/g, '37acac')
                                ?.replace(/F8CEB1/g, '37acac'),
                            // uri: `${Host}${item?.picture?.replace('public', '')?.replace('\\\\', '/')}`,
                          }}
                        />
                      );
                    } else {
                      return (
                        <Image
                          source={tempSpecialityIcons[1]}
                          // source={tempSpecialityIcons[ActiveSpeciality.i + 1]}
                          resizeMode="contain"
                          style={LpHeaderStyles.basicCardImage}
                        />
                      );
                    }
                  }
                })}

                <View>
                  <Text
                    minimumFontScale={0.8}
                    ellipsizeMode={'tail'}
                    lineBreakMode={'tail'}
                    textBreakStrategy={'balanced'}
                    numberOfLines={2}
                    style={LpHeaderStyles.basicCardText}>
                    {ActiveSpeciality.item.length > 30
                      ? ActiveSpeciality.item.slice(0, 30).concat('...')
                      : ActiveSpeciality.item}
                  </Text>
                </View>
              </BasicCard>
            </TouchableOpacity>
          ) : null}
          {allSpeciality?.map((item, i) => {
            const u = item.name;

            if (ActiveSpeciality.item !== u) {
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.8}
                  onPress={() => handleSpecialtyFilter(u, i)}>
                  <BasicCard
                    key={i}
                    style={{
                      CardContainer: {
                        ...LpHeaderStyles.basicCard,
                        backgroundColor:
                          ActiveSpeciality.item === u
                            ? Colors.search_background[theme]
                            : Colors.revenue_background[theme],
                      },
                    }}>
                    {/* ^#(?:[0-9a-fA-F]{3}){1,2}$ */}

                    {item?.picture ? (
                      <Image
                        style={LpHeaderStyles.basicCardImage}
                        source={{
                          uri:
                            'data:image/svg+xml;utf8,' +
                            item?.svg
                              ?.replace(/F09245/g, '37acac')
                              ?.replace(/efa860/g, '37acac')
                              ?.replace(/F8CEB1/g, '37acac'),
                          // uri: `${Host}${item?.picture?.replace('public', '')?.replace('\\\\', '/')}`,F8CEB1
                        }}
                      />
                    ) : (
                      <Image
                        source={tempSpecialityIcons[0]}
                        resizeMode="contain"
                        style={LpHeaderStyles.basicCardImage}
                      />
                    )}

                    {/* <Image
                      // source={{
                      //   uri: `${Host}${item?.picture?.replace('public', '')?.replace('\\\\', '/')}`
                      // }}
                      source={tempSpecialityIcons[i + 1]}
                      resizeMode="contain"
                      style={LpHeaderStyles.basicCardImage}
                    /> */}

                    <View>
                      <Text
                        minimumFontScale={0.8}
                        ellipsizeMode={'tail'}
                        lineBreakMode={'tail'}
                        textBreakStrategy={'balanced'}
                        numberOfLines={2}
                        style={LpHeaderStyles.basicCardText}>
                        {u.length > 30 ? u.slice(0, 30).concat('...') : u}
                      </Text>
                    </View>
                  </BasicCard>
                </TouchableOpacity>
              );
            }
          })}
          {activeFilter === 0 ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPressAllDoctorBasic}>
              <BasicCard
                // style={{...extStyle.basicCardStyle, backgroundColor: Colors.search_background[theme]}}
                style={{
                  CardContainer: {
                    ...LpHeaderStyles.basicCard,
                    backgroundColor: false
                      ? Colors.search_background[theme]
                      : Colors.revenue_background[theme],
                  },
                }}>
                <Image
                  source={tempSpecialityIcons[0]}
                  resizeMode="contain"
                  style={LpHeaderStyles.basicCardImage}
                />
                <Text
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                  ellipsizeMode={'tail'}
                  lineBreakMode={'tail'}
                  textBreakStrategy={'balanced'}
                  numberOfLines={1}
                  style={LpHeaderStyles.basicCardText}>
                  {`${Local('patient.landing_page.all_doctors')}`}
                </Text>
              </BasicCard>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
        <View style={LpHeaderStyles.toggleButtonContainer}>
          <NewToggleButton
            toggle={toggle}
            onToggle={onToggle}
            text0={`${Local('patient.landing_page.now')}`}
            text1={`${Local('patient.landing_page.schedule')}`}
            style={LpHeaderStyles.toggleButton}
            textStyle={LpHeaderStyles.toggleButtonText}
          />
        </View>
      </View>
    </View>
  );
}

const LpHeaderStyles = StyleSheet.create({
  searchBarContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  searchBarStyle: {
    borderRadius: 10,
    elevation: 2,
  },
  specialityAndToggleContainer: {
    height: 'auto',
  },
  scrollViewContentContainer: {
    paddingVertical: '4%',
    paddingHorizontal: '6%',
  },
  basicCardImage: {margin: '1%', height: 50, width: 50},
  basicCardText: {
    fontSize: 13,
    color: NEW_PRIMARY_BACKGROUND,
    fontFamily: 'Montserrat-Medium',
    marginTop: '5%',
    textAlign: 'center',
  },
  basicCardTextN: {
    fontSize: 13,
    color: NEW_PRIMARY_BACKGROUND,
    fontFamily: 'Montserrat-Medium',
    marginTop: '2%',
    textAlign: 'center',
  },
  basicCard: {
    elevation: 6,
    justifyContent: 'center',
    padding: '1%',
    height: 120,
    width: 120,
    borderRadius: 13,
  },
  basicCardN: {
    elevation: 2,
    justifyContent: 'center',
    padding: '1%',
    height: 35,
    width: 120,
    borderRadius: 8,
  },
  toggleButtonContainer: {
    marginHorizontal: '6%',
    marginVertical: '1%',
    marginBottom: '4%',
  },
  toggleButton: {width: 200},
  toggleButtonText: {
    fontSize: 16,
    color: NEW_PRIMARY_COLOR,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
});

function EmptyListComponent({theme, loading}) {
  if (loading) {
    return <ListingWithThumbnailLoader />;
  }
  return (
    <View style={elStyles.container}>
      <LottieView
        style={elStyles.LottieView}
        source={require('../../../assets/anim_svg/empty_bottle.json')}
        autoPlay
        loop
      />
      <Text style={[elStyles.text, {color: Colors.primary_text_color[theme]}]}>
        {Local('patient.landing_page.no_doctor_found')}
      </Text>
    </View>
  );
}
const elStyles = StyleSheet.create({
  container: {
    height: 260,
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingBottom: '30%',
    alignItems: 'center',
    marginTop: '12%',
  },
  LottieView: {height: '100%', width: '100%'},
  text: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
  },
});

function ListFooterComponent({loading}) {
  if (!loading) {
    return null;
  }
  return (
    <View
      style={{
        marginTop: 10,
        marginBottom: '20%',
      }}>
      {<ActivityIndicator size={24} />}
    </View>
  );
}
export default LandingPage;

// <Toast
//   visible={toastVisible}
//   position={screenHeight * 0.9}
//   shadow={true}
//   animation={true}
//   hideOnPress={true}>
//   Press again to Exit
// </Toast>;

//  {
//    Active !== 'allDoctors' && (
//      <TouchableOpacity
//        activeOpacity={0.8}
//        onPress={onPressAllDoctorBasic}>
//        <BasicCard
//          style={{
//            CardContainer: {
//              ...LpHeaderStyles.basicCard,
//              backgroundColor:
//                Active === 'allDoctors'
//                  ? Colors.search_background[theme]
//                  : Colors.revenue_background[theme],
//            },
//          }}>
//          <Image
//            source={tempSpecialityIcons[1]}
//            resizeMode="contain"
//            style={LpHeaderStyles.basicCardImage}
//          />
//          <Text
//            adjustsFontSizeToFit
//            minimumFontScale={0.8}
//            ellipsizeMode={'tail'}
//            lineBreakMode={'tail'}
//            textBreakStrategy={'balanced'}
//            numberOfLines={1}
//            style={LpHeaderStyles.basicCardText}>
//            {`${Local('patient.landing_page.all_doctors')}`}
//          </Text>
//        </BasicCard>
//      </TouchableOpacity>
//    );
//  }

//  {consultLoading ? (
//         <BlurModal visible={consultLoading}>
//           <ActivityIndicator color="#009387" size="large" />
//         </BlurModal>
//       ) : (

// useEffect(() => {
//   const backAction = () => {
//     // navigation.navigate("LandingPage")
//     setState(doctors);
//     setActive('allDoctors');
//     return true;
//   };
//   const backHandler = BackHandler.addEventListener(
//     'hardwareBackPress',
//     backAction,
//   );
//   return () => backHandler.remove();
// }, [doctors]);

//  {
//    isSpecialityLoading ||
//    loading ||
//    searchDoctorsLoading ||
//    superDocsLoading ? (
//      <ListingWithThumbnailLoader />
//    ) : searchKey !== '' ? (
//      <FlatList
//  ListFooterComponent={
//    <View
//      style={{
//        marginBottom: '15%',
//      }}>
//      {/* {moreDoctorLoading && <ActivityIndicator />}
//         {state?.length > 7 && (
//           <TouchableOpacity onPress={_fetchMoreDoctorLite}>
//             <Text
//               style={{
//                 color: NEW_PRIMARY_BACKGROUND,
//                 fontFamily: 'Montserrat-Medium',
//                 fontSize: 18,
//                 marginLeft: 'auto',
//                 marginBottom: '92%',
//                 paddingHorizontal: '6%',
//               }}>
//               {Local("patient.landing_page.more")}
//             </Text>
//           </TouchableOpacity>
//         )} */}
//    </View>
//  }
//        keyExtractor={(item) => item._id}
//        data={searchedDoctors}
//        refreshControl={
//          <RefreshControl
//            refreshing={searchDoctorsLoading}
//            onRefresh={onSearchDoctorRefresh}
//          />
//        }
//        // nestedScrollEnabled
//        ListEmptyComponent={
//          <View
//            style={{
//              height: 260,
//              width: '70%',
//              alignSelf: 'center',
//              justifyContent: 'center',
//              paddingBottom: '30%',
//              alignItems: 'center',
//              marginTop: '12%',
//            }}>
//            <LottieView
//              style={{height: '100%', width: '100%'}}
//              source={require('../../../assets/anim_svg/empty_bottle.json')}
//              autoPlay
//              loop
//            />
//            <Text
//              style={{
//                textAlign: 'center',
//                fontFamily: 'Montserrat-Medium',
//                color: Colors.primary_text_color[theme],
//                fontSize: 20,
//              }}>
//              {Local('patient.landing_page.no_doctor_found')}
//            </Text>
//          </View>
//        }
//        renderItem={({item, index}) => (
//          <AvailDoctorContainerV2
//            setConsultLoading={setConsultLoading}
//            toggle={toggle}
//            data={item}
//            navigation={navigation}
//            onPress={() => onPress(item._id)}
//            id={item._id}
//            index={index}
//            name={
//              item?.basic?.name
//                ? item?.basic?.name
//                : item?.firstName + ' ' + item?.lastName
//            }
//            schedule={item.output}
//          />
//        )}
//      />
//    ) : !toggle ? (
//      <FlatList
//        ListFooterComponent={
//          <View>
//            {moreDoctorLoading && <ActivityIndicator />}
//            {moreLoading && <ActivityIndicator />}
//            {state?.length > 7 ? (
//              <TouchableOpacity onPress={_fetchMoreDoctorLite}>
//                <Text
//                  style={{
//                    color: NEW_PRIMARY_BACKGROUND,
//                    fontFamily: 'Montserrat-Medium',
//                    fontSize: 18,
//                    marginLeft: 'auto',
//                    marginBottom: '15%',
//                    paddingHorizontal: '6%',
//                  }}>
//                  {Local('patient.landing_page.more')}
//                </Text>
//              </TouchableOpacity>
//            ) : (
//              <View
//                style={{
//                  marginBottom: '15%',
//                }}></View>
//            )}
//          </View>
//        }
//        keyExtractor={(item) => String(item._id)}
//        ListEmptyComponent={
//          <View
//            style={{
//              height: 260,
//              width: '70%',
//              alignSelf: 'center',
//              justifyContent: 'center',
//              paddingBottom: '30%',
//              alignItems: 'center',
//              marginTop: '12%',
//            }}>
//            <LottieView
//              style={{height: '100%', width: '100%'}}
//              source={require('../../../assets/anim_svg/empty_bottle.json')}
//              autoPlay
//              loop
//            />
//            <Text
//              style={{
//                textAlign: 'center',
//                fontFamily: 'Montserrat-Medium',
//                color: Colors.primary_text_color[theme],
//                fontSize: 20,
//              }}>
//              {Local('patient.landing_page.no_doctor_found')}
//            </Text>
//          </View>
//        }
//        // extraData={doctors}
//        data={state}
//        refreshControl={
//          <RefreshControl refreshing={loading} onRefresh={onDoctorsRefresh} />
//        }
//        renderItem={({item, index}) => {
//          return (
//            <AvailDoctorContainerV2
//              setConsultLoading={setConsultLoading}
//              toggle={toggle}
//              data={item}
//              navigation={navigation}
//              onPress={() => onPress(item._id)}
//              id={item._id}
//              index={index}
//              // name={item.basic.name}
//              name={
//                item?.basic?.name
//                  ? item?.basic?.name
//                  : item?.firstName + ' ' + item?.lastName
//              }
//              schedule={item.output}
//            />
//          );
//        }}
//      />
//    ) : (
//      <FlatList
//        ListFooterComponent={
//          <View
//            style={{
//              marginBottom: '15%',
//            }}>
//            {/* {moreDoctorLoading && <ActivityIndicator />}
//               {state?.length > 7 && (
//                 <TouchableOpacity onPress={_fetchMoreDoctorLite}>
//                   <Text
//                     style={{
//                       color: NEW_PRIMARY_BACKGROUND,
//                       fontFamily: 'Montserrat-Medium',
//                       fontSize: 18,
//                       marginLeft: 'auto',
//                       marginBottom: '92%',
//                       paddingHorizontal: '6%',
//                     }}>
//                     {Local("patient.landing_page.more")}
//                   </Text>
//                 </TouchableOpacity>
//               )} */}
//          </View>
//        }
//        initialNumToRender={5}
//        ListEmptyComponent={
//          <View
//            style={{
//              height: 260,
//              width: '70%',
//              alignSelf: 'center',
//              justifyContent: 'center',
//              paddingBottom: '30%',
//              alignItems: 'center',
//              marginTop: '12%',
//            }}>
//            <LottieView
//              style={{height: '100%', width: '100%'}}
//              source={require('../../../assets/anim_svg/empty_bottle.json')}
//              autoPlay
//              loop
//            />
//            <Text
//              style={{
//                textAlign: 'center',
//                fontFamily: 'Montserrat-Medium',
//                color: Colors.primary_text_color[theme],
//                fontSize: 20,
//              }}>
//              {Local('patient.landing_page.no_doctor_found')}
//            </Text>
//          </View>
//        }
//        keyExtractor={(item) => item._id}
//        data={state}
//        refreshControl={
//          <RefreshControl
//            refreshing={superDocsLoading}
//            onRefresh={onSuperDocRefresh}
//          />
//        }
//        renderItem={({item}) => (
//          <AvailDoctorContainerV2
//            setConsultLoading={setConsultLoading}
//            toggle={toggle}
//            data={item}
//            navigation={navigation}
//            onPress={() => onPress(item._id)}
//            id={item._id}
//            // name={item.basic.name}
//            name={
//              item?.basic?.name
//                ? item?.basic?.name
//                : item?.firstName + ' ' + item?.lastName
//            }
//            schedule={item.output}
//          />
//        )}
//      />
//    );
//  }
