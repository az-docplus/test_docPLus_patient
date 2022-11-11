import React, {useState} from 'react';
import {View, Text} from 'react-native';
import FancyHeader from '../../../components/organisms/FancyHeader/FancyHeader';
import Container from '../../../components/organisms/Container/Container';
import AppointmentCalendar from '../../../components/molecules/AppointmentCalendar/AppointmentCalendar';
import Overlay from '../../../components/atoms/Overlay/Overlay';
function AddAppointments({navigation}) {
  const [selectedDate, setSelectedDate] = useState('');
  const updateDate = (date) => {
    setSelectedDate(date);
  };
  console.log(navigation);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FancyHeader
        navigation={navigation}
        hideRightComp
        style={{Container: {height: '25%', overflow: 'hidden'}}}
      />
      <Container
        style={{
          height: '75%',
          transform: [
            {
              translateY: -30,
            },
          ],
          paddingVertical: 25,
        }}>
        <AppointmentCalendar callback={updateDate} />
      </Container>
      <Overlay />
    </View>
  );
}
export default AddAppointments;
