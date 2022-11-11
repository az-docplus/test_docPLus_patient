import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Image,
  Animated,
  Easing,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import TopNavBar from '../../../../../components/molecules/TopNavBar/TopNavBar';
import Axios from 'axios';
import InsetShadow from 'react-native-inset-shadow';
import { Host } from '../../../../../utils/connection';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const MaterialCommunityIconsIcons = ({ name, size, color }) => (
  <MaterialCommunityIcons size={size} color={color} name={name} />
);
import HeadersCompo from '../../__Components/Header';
import { useDispatch } from 'react-redux';
import { UpdateDoctorProfile } from '../../../../../reduxV2/action/DoctorAction';
import CancelSaveButton from '../../__Components/cancel-save-buttons';
import SimpleFieldCompo from '../../../../../components/atoms2/Input/simple-field';

const EditQualificationEducation = ({
  backToPageOne,
  doctorProfile,
  setEditQualification,
  editQualification,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  console.log({ editQualification });
  const update = (payload) => {
    setIsLoading(true);
    dispatch(
      UpdateDoctorProfile(
        payload,
        (res) => {
          console.log(res);
          setIsLoading(false);
        },
        (e) => {
          setIsLoading(false);
          console.log('error in saving :::::>>> ', e);
        },
      ),
    );
  };

  const updateSpecialtyArray = () => {
    let education = doctorProfile.education;

    editQualification.isEdit
      ? (education[editQualification.index] = editQualification)
      : (education = [...doctorProfile.education, editQualification]);

    const dataToUpdate = {
      id: doctorProfile?._id,
      education,
    };
    update(dataToUpdate);
    backToPageOne();
  };

  const handleRemove = () => {
    let education = doctorProfile.education;

    education.splice(editQualification.index, 1);

    const dataToUpdate = {
      id: doctorProfile?._id,
      education,
    };

    update(dataToUpdate);
    backToPageOne();
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 10,
      }}>
      <View>
        <HeadersCompo
          title="Qualification"
          backHandler={() => {
            backToPageOne();
          }}
        />

        <ScrollView>
          <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            <SimpleFieldCompo
              isLoading={isLoading}
              title="Degree"
              preValue={editQualification.title}
              inputType="name" // required
              value={(e) => {
                setEditQualification({ ...editQualification, degree: e });
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
            <SimpleFieldCompo
              isLoading={isLoading}
              title="College/University"
              preValue={editQualification.university}
              inputType="name" // required
              value={(e) => {
                setEditQualification({ ...editQualification, university: e });
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
            <SimpleFieldCompo
              preValue={editQualification.year.toString()}
              isLoading={isLoading}
              title="Year*"
              inputType="year" // required
              value={(e) => {
                setEditQualification({ ...editQualification, year: e });
              }}
            />
          </View>

          {editQualification?.isEdit && (
            <TouchableOpacity
              onPress={handleRemove}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 40,
              }}>
              <MaterialCommunityIconsIcons
                name="minus-circle"
                size={18}
                color="#EA1A65"
              />
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  marginLeft: 5,
                  color: '#EA1A65',
                }}>
                Remove
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
        }}>
        <CancelSaveButton
          onSavePress={updateSpecialtyArray}
          onCancelPress={backToPageOne}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EditQualificationEducation;
