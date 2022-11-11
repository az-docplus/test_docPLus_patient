import React, { useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import { GREY_BACKGROUND } from '../../../styles/colors';
import NewItem from '../../../components/molecules/MedicalHistory/NewItem';
import AddHealthCare from '../../../components/molecules/Modal/AddHealthCare';
import HealthCareItem from '../../../components/molecules/HealthCareItem/HealthCareItem';
import LottieView from 'lottie-react-native';
import {Local, setLocale} from '../../../i18n';

const HealthCare = ({ navigation }) => {
  const [addModal, setModal] = useState(false);
  const HealthCareData = [
    {
      name: 'Dr. Dropkin Jared',
      speciality: 'Dentist',
      acceptance: 'Waiting to accept invitation',
    },
    {
      name: 'Dr. Hochang Hwang ',
      speciality: 'Physician',
      canDoMessage: true,
    },
    {
      name: 'Dr. Co Ekatarine',
      speciality: 'Gynaecologist',
      reffered: 'Referred by Dr. Ray',

      canDoMessage: true,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
      <TopNavBar
        headerText={`${Local("patient.my_profile.my_healthcare_team")}`}
        {...{ navigation }}
        style={{ Container: { marginTop: 5, marginBottom: 10 } }}
      />
      <AddHealthCare
        visible={addModal}
        onCancel={() => setModal(false)}
      // onUpdate={onSubmit}
      />
      <View style={{ flex: 1, backgroundColor: GREY_BACKGROUND }}>
        <FlatList
          keyExtractor={(item) => item._id}
          data={HealthCareData}
          ListEmptyComponent={
            <View
              style={{
                height: 260,
                width: '70%',
                alignSelf: 'center',
                justifyContent: 'center',
                paddingBottom: "12%",
                alignItems: 'center',
                marginTop: '12%'
              }}>

              <LottieView
                style={{ height: '100%', width: '100%' }}
                source={require('../../../assets/anim_svg/empty_bottle.json')}
                autoPlay
                loop
              />
              <Text style={{ textAlign: "center", fontFamily: "Montserrat-Medium", fontSize: 20 }}>
                No data
											</Text>
            </View>
          }
          style={{ flex: 1, padding: 20 }}
          renderItem={({ item }) => <HealthCareItem data={item} />}
          ListFooterComponent={<NewItem onPress={() => setModal(true)} />}
        />
      </View>
    </View>
  );
};

export default HealthCare;
