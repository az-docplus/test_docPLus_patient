import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import InsetShadow from 'react-native-inset-shadow';
import SuggestionInputCompo from '../../../../components/atoms2/Input/suggestion-input';
import CancelSaveButtons from '../__Components/cancel-save-buttons';
import HeadersCompo from '../__Components/Header';
import {
    GetHospitals,
    GetHospitalsOfDoctor,
    AddHospital,
} from '../../../../reduxV2/action/DoctorAction';
import SimpleFieldCompo from '../../../../components/atoms2/Input/simple-field';
import { Host } from '../../../../utils/connection'
import Axios from 'axios'

const HospitalAffiliations = ({
    backToPageOne,
    doctorProfile
}) => {
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false)
    //   const GetDoctorHospitals = (
    //     payload = {
    //       doctor: userData._id,
    //     },
    //   ) => {
    //     dispatch(
    //       GetHospitalsOfDoctor(payload, (err, response) => {
    //         if (!err) setAffiliatedHospitals(response);
    //         else console.log(response);
    //       }),
    //     );
    //   };



    //   const checkLocationMatch = (item) => {
    //     if (location == '') return true;
    //     let match = false;
    //     Address.map((el) => {
    //       if (item.Address.includes(el.long_name)) match = true;
    //     });
    //     return match;
    //   };

    const SearchHospitalFunc = () => {
        // var raw = `{\"match\":{\r\n   \r\n    \"ICU_Beds_in_Hospital\":16\r\n\r\n\r\n}}`;
        // var requestOptions = {
        //     method: 'POST',
        //     body: raw,
        //     redirect: 'follow'
        // };

        // fetch(`${Host}/hospital/search`, requestOptions)
        //     .then(response => response.json())
        //     .then(result => console.log("res : ", result))
        //     .catch(error => console.log('error', error));

        // Axios.post(`${Host}/hospital/search`, {
        //     "match": {
        //         "Rajen": 10
        //     }
        // }).then(e => {
        //     console.log("res : ", e)
        // }).catch(e => {
        //     console.log("catch : ", e)
        // })

    }
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <HeadersCompo
                title="Hospital Affiliations"
                backHandler={backToPageOne}
            />
            <View style={{ width: '90%', marginLeft: 20, marginTop: 10, }}>
                {/* <Input
                        //   onChangeText={handleSearch(location)}
                        onFetchLocation={(address) => setLocation(address)}
                        value={(e) => {
                            setLocation(e);
                            handleSearch(e)
                        }}
                    /> */}
                <View style={{ flexDirection: "row" }}>
                    <SuggestionInputCompo
                        isLoading={loading}
                        title="Location"
                        value={e => {
                            console.log("e : ", e)
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SimpleFieldCompo
                        isLoading={loading}
                        title="Hospital Name"
                        inputType="name"  // required
                        value={e => {
                            console.log("e : ", e)
                        }}
                    />
                </View>

            </View>
            <View style={{ flex: 1 }}>
                <Text>LIST OF HOSPITALS</Text>
                <View style={{ flex: 1 }}>
                    <Text>Data</Text>
                </View>

            </View>
            <View style={{ marginHorizontal: 20 }}>
                <CancelSaveButtons
                    onSavePress={SearchHospitalFunc}
                />
            </View>
        </View>

    );
};
const styles = StyleSheet.create({

});
export default HospitalAffiliations;
