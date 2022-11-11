
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioGroup, { Radio } from 'react-native-radio-input';
import {
    View,
    ScrollView,
    Text,
    FlatList,
    Image,
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
    Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import { BlurView } from '@react-native-community/blur';
import {
    // BottomSheet,
    ListItem,
} from 'react-native-elements';
import { BottomSheet } from 'react-native-btr';
import axios from 'axios';

import BasicCard from '../../../components/atoms/BasicCard/BasicCard';
import { ListingWithThumbnailLoader } from '../../../components/atoms/Loader/Loader';
import NewToggleButton from '../../../components/molecules/ToggleButton/NewToggleButton';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import SearchBarLoc from '../../../components/molecules/SearchBarSolid/locSearch';
import AvailDoctorContainerV2 from '../../../components/molecules/AvailDoctorContainer/AvailDoctorContainerV2';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import FluidAnimation from '../../../components/molecules/Animation/FluidAnimation';
import BlurModal from '../../../components/molecules/Modal/BlurModal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DoctorCardCompo from '../../../components/atoms2/doctor-card/doctor-card';
const EvilIconsIcon = ({ size, name }) => (
    <EvilIcons size={size} name={name} color="#7B7A79" />
);
import {
    // fetchDoctorLite,
    // fetchMoreDoctorLite,
    searchDoctors,
    // fetchSuperDoc,
    fetchFilteredSuperDoc,
    fetchFilteredDoctors,
    // GetAllDoctors,
} from '../../../reduxV2/action/DoctorToPatientAction';
import { getSpecialty } from '../../../reduxV2/action/DoctorAction';

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
import { Colors } from '../../../styles/colorsV2';
import Slider from '@react-native-community/slider';

import {
    Local,
    // setLocale
} from '../../../i18n';

import { Host } from '../../../utils/connection';
// import DOMParser from 'react-native-html-parser';
// import Svg, {G, Path} from 'react-native-svg'; 
import RadioGroupV2 from '../../../components/molecules/RadioGroup/RadioGroupV2';
import BasicCardN from '../../../components/atoms/BasicCard/BasicCardN';
import ActionSheetPatientCompo from '../../../components/atoms2/action-sheet-patient/actionSheetPatient';
import ConsulnowCardCompo from '../../../components/atoms2/consult-now-card/consult-now-card';
// import { parse } from 'react-native-svg';

//TODO import only necessary component in all screens which are first screen of any navigator
//TODO call APIs only if AppState is focused

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

function LandingPage({ navigation }) {
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
    const { userData, theme } = useSelector((state) => state.AuthReducer);
    const {
        doctors,
        loading,
        moreDoctorLoading,
        searchDoctorsLoading,
        searchedDoctors,
        superDocsLoading,
        superDocs,
    } = useSelector((state) => state.DoctorToPatientReducer);
    const { lastRouteMemory, isLoggedin } = useSelector(
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
    const [ActiveSpeciality, setActiveSpeciality] = useState({ item: '', i: '' });
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
        setActiveSpeciality({ item: '', i: '' });
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
                // console.log('favourites ', favourites);
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
            // console.log(item, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
            try {
                const isSuperDoc = toggle === 1;
                console.log('called speciality filter');
                setActiveFilter(0); // this is to insure that all doctor card move to end
                setActiveSpeciality({ item, i }); //TODO update active filter,if any
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
                // console.log('fetching specialty doctor with superDoc ', isSuperDoc);
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

    const [sync, setSync] = useState(true)
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


    // useEffect(() => {
    //   if(activeFilter !== 0) {
    //     const temp = doctorLocalState.filter((item, index) => {
    //       console.log(item?.specialty, "%%%%%%%%%%%%%%%%%%%%")
    //       if(item?.specialty?.toLowerCase() == ActiveSpeciality.item.toLowerCase()) {
    //         return item
    //       }
    //     })

    //     setDoctorLocalState(temp)
    //   }
    // }, [activeFilter, doctors, superDocs, toggle])

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
                titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
                onPress: ResetDoctors,
            },
            {
                title: `${Local('patient.landing_page.female_doctors')}`,
                titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
                onPress: () => sortByGender('Female'),
            },
            {
                title: `${Local('patient.landing_page.male_doctors')}`,
                titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
                onPress: () => sortByGender('Male'),
            },
            {
                title: `${Local('patient.landing_page.favorites')}`,
                titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
                onPress: sortByFavorite,
            },
            {
                title: `${Local('patient.landing_page.sort_by_name')}`,
                titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
                onPress: handleSortByName,
            },
            {
                title: `${Local('patient.landing_page.cancel')}`,
                containerStyle: { backgroundColor: SECONDARY_BACKGROUND },
                titleStyle: { color: 'black', fontFamily: 'Montserrat-Regular' },
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
    useEffect(() => {
        if (lastRouteMemory && lastRouteMemory.routeName !== '') {
            navigation.navigate(lastRouteMemory.routeName, {
                data: lastRouteMemory.params,
            });
        }
    }, [lastRouteMemory
        // , navigation
    ]);
    useEffect(() => {
        if (doctors.length > 0) {
            console.log('doc length useeffect called');
            // setDoctorLocalState(doctors);
            const temp = doctors.filter((item, index) => {
                const name = `${item?.firstName} ${item?.lastName}`
                if (item?.specialty?.toLowerCase() == ActiveSpeciality.item.toLowerCase() && name.includes(searchKey)) {
                    return item
                }
            })
            if (ActiveSpeciality.item !== "") {
                setDoctorLocalState(temp);
            } else {
                setDoctorLocalState(doctors)
            }
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
            const temp = superDocs.filter((item, index) => {
                const name = `${item?.firstName} ${item?.lastName}`
                if (item?.specialty?.toLowerCase() == ActiveSpeciality.item.toLowerCase() && name.includes(searchKey)) {
                    return item
                }
            })
            if (ActiveSpeciality.item !== "") {
                setDoctorLocalState(temp);
            } else {
                setDoctorLocalState(doctors)
            }
            // setDoctorLocalState(superDocs);
        }
    }, [superDocs, toggle]);
    const onTopNavLeftButtonPress = useCallback(() => { }, []);
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
    const [fav, setFav] = useState(false);

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
        setFav(false);
    };

    const onToggleExpand = (key) => {
        let temp = chev;
        temp[`${key}`] = !chev[`${key}`];
        setChev({
            ...temp,
        });
        // console.log(temp);
    };

    const [visible, setVisible] = useState(false);

    const onCancel = () => {
        setVisible(false);
    };

    useEffect(() => {
        // console.log(RadioFiltervalueT);
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
        // console.log({payload});
        const config = {
            Accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        if (Object.keys(payload).length < 1) {
            payload.consultationType = 'Tele-consult';
        }

        params.match = JSON.stringify(payload);

        // console.log(patient?.favourites[0], 'sdlkfsdljfdsjfdslkfj')

        // return

        axios
            .post(`${Host}/doctors/filter`, params, config)
            .then((res) => {
                const data = res.data.data;

                // if(fav) {
                //   // data = data.map((item) => {
                //   //   if(patient?.favourites.includes(item?._id)) return item
                //   // })
                //   // data = patient?.favourites
                //   setDoctorLocalState(patient?.favourites)
                // }
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
                // setDoctorLocalState(data);

                if (fav) {
                    // setDoctorLocalState(patient?.favourites)
                    let result = data.filter(o1 => patient?.favourites.some(o2 => o1._id === o2._id));
                    setDoctorLocalState(result)
                }

                const temp = doctorLocalState.filter((item, index) => {
                    const name = `${item?.firstName} ${item?.lastName}`
                    if (item?.specialty?.toLowerCase() == ActiveSpeciality.item.toLowerCase() && name.includes(searchKey)) {
                        return item
                    }
                })
                if (ActiveSpeciality.item !== "") {
                    setDoctorLocalState(temp);
                } else {
                    // setDoctorLocalState(doctors)
                }

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
        setRadioFiltervalue([{ time: time, min: min, max: max }]);
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
        setRadioFiltervalueT([{ time: time, min: min, max: max }]);
    };

    const [filter, setFilter] = useState(0)

    useEffect(() => {
        applyAllFilter()
    }, [change])

    return (
      <>
        <View style={{ paddingHorizontal: 15, paddingVertical: 10, flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Image
                source={require('../../../assets/icons/hamburger_menu.png')}
                style={{
                  width: 26,
                  height: 26,
                  transform: [{ rotateY: '180deg' }],
                }}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity>
                <EvilIconsIcon name="heart" size={32} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 8 }}>
                <EvilIconsIcon name="bell" size={32} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 8 }}>
                <Image
                  source={require('../../../assets/images/doctorx.png')}
                  style={{ width: 50, height: 50, borderRadius: 100 }}
                />
                <Text style={{ fontFamily: 'Montserrat-Regular' }}>
                  Hi, Karan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              flex: 1,
              marginBottom: 80,
            }}>
            <View style={{ marginTop: 20 }}>
              <ActionSheetPatientCompo />
            </View>

            <View>
              <ConsulnowCardCompo />
            </View>

            <View>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 20,
                  marginLeft: 10,
                }}>
                Top Doctors
              </Text>
              <View style={{ marginTop: 10 }}>
                <FlatList
                  data={specialities}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  keyExtractor={(e) => e.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <View
                        style={{
                          elevation: 4,
                          backgroundColor: '#fff',
                          paddingVertical: 20,
                          paddingHorizontal: 22,
                          margin: 10,
                          borderRadius: 8,
                          flex: 1,
                        }}
                        key={index}>
                        <Text
                          style={{
                            color: '#333333',
                            fontFamily: 'Montserrat-Regular',
                            fontSize: 15,
                            textAlign: 'center',
                          }}>
                          {item}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>

            <View>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 20,
                  marginLeft: 10,
                  marginVertical: 20,
                }}>
                23 Doctors Available now
              </Text>

              <FlatList
                data={__DoctorArray}
                keyExtractor={(e) => e.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <View>
                      <DoctorCardCompo item={item} />
                    </View>
                  );
                }}
              />
            </View>
            {/* <Button
                        title="Call now"
                        onPress={() => {
                            navigation.navigate("Calling-Screen")
                        }}
                    /> */}
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              elevation: 4,
              backgroundColor: '#fff',
              paddingVertical: 20,
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
            }}>
            <BottomIconBars
              source={require('../../../assets/png/home-logo.png')}
              title="Home"
            />
            <BottomIconBars
              source={require('../../../assets/png/consult-png.png')}
              title="Consult"
            />
            <BottomIconBars
              source={require('../../../assets/png/appointment-png.png')}
              title="Appointments"
              onPress={() => {
                navigation.navigate('WaitingRoom');
              }}
            />
            <BottomIconBars
              title="Chat"
              source={require('../../../assets/png/chat-png.png')}
              onPress={() => {
                navigation.navigate('Chats');
              }}
            />
          </View>
        </View>
      </>
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
    basicCardImage: { margin: '1%', height: 50, width: 50 },
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
    toggleButton: { width: 200 },
    toggleButtonText: {
        fontSize: 16,
        color: NEW_PRIMARY_COLOR,
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
    },
});

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
    LottieView: { height: '100%', width: '100%' },
    text: {
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
    },
});

export default LandingPage;

const BottomIconBars = ({
    source,
    title,
    onPress
}) => {
    return <TouchableOpacity onPress={onPress} style={{
        alignItems: "center"
    }}>
        <Image
            source={source}
            style={{ width: 20, height: 20 }}
        />
        <Text style={{
            fontFamily: "Montserrat-Regular",
            marginTop: 6
        }}>{title}</Text>
    </TouchableOpacity>
}

const specialities = ["All", "General Physician", "Pediatrician", "Some thing", "Some thing two"]
const __DoctorArray = [{
    image: require("../../../assets/png/doc-center-image.png"),
    rate: 4.5,
    name: "Dr. Anuj Verma",
    specialty: "General Physician | MBBS, NBD",
    exp: 8
}, {
    image: require("../../../assets/png/doc-center-image.png"),
    rate: 4.6,
    name: "Dr. Vidya Bajpayee",
    specialty: "Dentist | BDS, NBD",
    exp: 8
}]