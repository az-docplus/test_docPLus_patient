import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  AddFevDoc,
  GetPatientInfo,
  RemoveFevDoc,
} from '../../../reduxV2/action/PatientAction';
import { useDispatch, useSelector } from 'react-redux';

const Favorites = ({ doctor, setLoading }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { isLoggedin } = useSelector((state) => state.AuthReducer);
  const { userData } = useSelector((state) => state.AuthReducer);
  const { patient } = useSelector((state) => state.PatientReducer);

  const [heartActive, setHeartActive] = React.useState(false);
  // console.log(
  //   '################',
  //   patient.favourites?.some((item) => {
  //     return item?._id === doctor._id;
  //   }),
  //   // patient.favourites,
  //   // doctor?._id,
  // );
  useEffect(() => {
    if (
      patient.favourites?.some((item) => {
        return item?._id === doctor._id;
      })
    ) {
      setHeartActive(true);
    } else {
      setHeartActive(false);
    }
  }, [patient, isFocused, doctor._id]);

  const heartHandle = useCallback(() => {
    let res;
    if (patient.favourites) {
      res = patient.favourites?.some((item) => {
        return item?.doctor?._id === doctor._id;
      });
    }
    if (!isLoggedin) {
      //TODO: open sidebar
      navigation.openDrawer();
    } else if (!res) {
      setLoading(true);
      setHeartActive(!heartActive);
      dispatch(
        AddFevDoc(
          doctor._id,
          patient._id,
          () => {
            setLoading(false);
            setHeartActive(!heartActive);

            dispatch(
              GetPatientInfo(patient._id, null, () => {
                // showTost("Added to Favorites!", () => { });
                // Alert.alert("Doctor Added!","Added to Favourites Successfuly!")
              }),
            );
          },
          (err) => {
            setLoading(false);
            setHeartActive(heartActive);
          },
        ),
      );
    } else if (res) {
      setLoading(true);
      setHeartActive(!heartActive);
      dispatch(
        RemoveFevDoc(
          doctor._id,
          patient._id,
          () => {
            // Alert.alert("Doctor Removed!","Removed From Favourites Successfuly!")
            // showTost("Removed from Favorites!", () => { });
            setLoading(false);
            setHeartActive(!heartActive);

            // dispatch(
            //   GetPatientInfo(
            //     patient._id,
            //     null,
            //     () => {}
            //   ));
            // console.log("removed")
          },
          () => {
            setLoading(false);
            setHeartActive(heartActive);
            // console.log("removed error")
          },
        ),
      );
      // if(heartActive) {
      //   showTost("Added to Favorites!", () => { });
      // } else {
      //   showTost("Removed from Favorites!", () => { });
      // }
    }
  }, [doctor._id, heartActive]);

  return (
    <View>
      <TouchableOpacity onPress={heartHandle}>
        <FontAwesomeIcon
          name="heart"
          size={22}
          color={heartActive ? '#EA1A65' : '#7B7A79'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Favorites;
