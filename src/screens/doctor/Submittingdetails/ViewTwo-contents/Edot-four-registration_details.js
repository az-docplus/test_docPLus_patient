import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import SimpleFieldCompo from '../../../../components/atoms2/Input/simple-field'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import MMaterialIconsIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialAntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient'
import CancelSaveButtonCompo from '../__Components/cancel-save-buttons'
import UploadDocsCompo from '../__Components/Upload-documents'
import { useDispatch } from 'react-redux'
import { UpdateDoctorProfile } from '../../../../reduxV2/action/DoctorAction'

const MMaterialIconsIconsIcons = ({ name, size, color }) => <MMaterialIconsIcons size={size} color={color} name={name} />
const MaterialAntDesignIcon = ({ size, name, color }) => <MaterialAntDesign size={size} name={name} color={color} />
const MaterialCommunityIconsIcons = ({ name, size, color }) => <MaterialCommunityIcons size={size} color={color} name={name} />
const AntDesignIconsIcons = ({ name, size, color }) => <AntDesignIcons size={size} color={color} name={name} />
const RegexCheck = (type) => {
    if (type == 'name') {
        return new RegExp(/^[a-zA-Z ]+$/);
    } else if (type == 'year') {
        return new RegExp(/^(19[5-9]\d|20[0-4]\d|2050)$/)
    } else if (type == 'number') {
        return new RegExp('^[0-9]+$');
    } else if (type == 'email') {
        return new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,);
    } else if (type == "should10number") {
        return new RegExp(/^[0-9]{10}$/)
    } else if (type == 'phone') {
        return new RegExp(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,)
    }
}
export default function EditRegDetails({ doctorProfile, backToPageOne }) {
    //  registration  :  {"regCouncil": "Tyf", "regNo": "8448443891", "regYear": 2021}
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        regNo: doctorProfile.registration.regNo ? doctorProfile.registration.regNo : null,
        regCouncil: doctorProfile.registration.regCouncil ? doctorProfile.registration.regCouncil : null,
        regYear: doctorProfile.registration["regYear"] ? `${doctorProfile.registration["regYear"]}` : null
    })
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        console.log('doctorProfile["idProof"] : ', doctorProfile["idProof"])
    }, [])
    const [error, setError] = useState({ text: '', visible: false })

    const UpdateDoctorProfileHandler = () => {
        setLoading(true)
        if (RegexCheck("should10number").test(form['regNo']) && RegexCheck("name").test(form['regCouncil'])
            && RegexCheck("year").test(form['regYear'])) {
            const userData = {
                id: doctorProfile?._id,
                registration: {
                    "regCouncil": form["regCouncil"],
                    "regNo": form["regNo"],
                    "regYear": form["regYear"]
                }
            }
            //  console.log(userData)
            setError({ text: 'Processing !', visible: true })
            dispatch(
                UpdateDoctorProfile(userData, () => {
                    backToPageOne()
                    setError({ text: 'Updated !', visible: true })
                    setLoading(false)
                }, (e) => {
                    setError({ text: 'Something went wrong !', visible: true })
                    setLoading(false)
                }),
            );
        } else {
            setError({ text: 'Please enter appropiate values !', visible: true })
            setLoading(false)
        }

    }
    const updateDoctorDocumentFunc = (url) => {
        const userData = {
            id: doctorProfile?._id,
            document: url,
        }
        setError({ text: 'Processing !', visible: true })
        dispatch(
            UpdateDoctorProfile(
                userData,
                () => {
                    setError({ text: 'Document Saved !', visible: true })
                }, (e) => {
                    setError({ text: JSON.stringify(e.response.data), visible: true })
                })
        );
    }
    return (
        <View style={{ paddingHorizontal: 20, paddingVertical: 20, backgroundColor: '#fff', flex: 1 }}>
            <TouchableOpacity onPress={backToPageOne} style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <MaterialAntDesignIcon name="left" size={24} color="#000" />
                <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 18, marginLeft: 10, marginLeft: 20, marginRight: 10 }}>Registration Details</Text>
            </TouchableOpacity>
            <View>
                <View style={{
                    flexDirection: 'row',
                    marginVertical: 25
                }}>
                    <SimpleFieldCompo
                        preValue={form["regNo"]}
                        isLoading={loading}
                        title="Registration number*  "
                        regexType="should10number"
                        inputType="number" // required
                        value={e => {
                            setForm({ ...form, regNo: e })
                        }}
                    />
                </View>

                <View style={{ height: 1, backgroundColor: '#EEEEEE' }}></View>

                <View style={{
                    flexDirection: 'row',
                    marginTop: 18,
                    marginBottom: 25
                }}>
                    <SimpleFieldCompo
                        preValue={form["regCouncil"]}
                        isLoading={loading}
                        title="Medical Council*"
                        inputType="name"  // required
                        value={e => {
                            setForm({ ...form, regCouncil: e })
                        }}
                    />
                </View>

                <View style={{ height: 1, backgroundColor: '#EEEEEE' }}></View>

                <View style={{
                    flexDirection: 'row',
                    marginTop: 18,
                    marginBottom: 25
                }}>
                    <SimpleFieldCompo
                        preValue={form["regYear"]}
                        isLoading={loading}
                        title="Registration Year*"
                        inputType="year" // required
                        value={e => {
                            setForm({ ...form, regYear: e })
                        }}
                    />
                </View>
            </View>

            <View style={{ height: 1, backgroundColor: '#EEEEEE' }}></View>


            <UploadDocsCompo
                title="Upload"
                desc="Registration Document"
                preImage={doctorProfile["document"]?.replace('public', '')?.replace('\\\\', '/')}
                onSubmitGetUrl={e => {
                    updateDoctorDocumentFunc(e.replace('public', '')?.replace('\\\\', '/'))
                }}
            />

            {error.visible ? <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', marginVertical: 14, fontSize: 14, color: '#EA1A65' }}>{error.text}</Text> : <Text> </Text>}

            <CancelSaveButtonCompo
                onCancelPress={backToPageOne}
                onSavePress={UpdateDoctorProfileHandler}
                isLoading={loading}
            />

        </View>
    )
}
