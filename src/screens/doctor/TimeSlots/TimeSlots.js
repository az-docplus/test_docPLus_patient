import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
function TimeSlots({navigation}) {
  const [from, setFrom] = useState(new Date());
  const [showFrom, setShowFrom] = useState(false);
  const [to, setTo] = useState(new Date());
  const [showTo, setShowTo] = useState(false);

  const onPressFrom = () => {
    setShowFrom(true);
  };

  const onPressTo = () => {
    setShowTo(true);
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <TopNavBar navigation={navigation} headerText={'Schedule'} />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: '5%',
          marginHorizontal: '9%',
        }}>
        Set Time
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: '10%',
          backgroundColor: '#fff',
          paddingVertical: '5%',
          elevation: 3,
        }}>
        <TouchableOpacity onPress={onPressFrom}>
          <Text style={{fontSize: 24}}>{moment(from).format('hh:mm')}</Text>
          {showFrom && (
            <DateTimePicker
              value={from}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                setShowFrom(false);
                setFrom(selectedDate);
              }}
            />
          )}
        </TouchableOpacity>
        <View>
          <MaterialIcon
            name={'arrow-right'}
            color={'#43A2A2'}
            size={32}
            style={{paddingVertical: '2%', paddingHorizontal: '5%'}}
          />
        </View>
        <TouchableOpacity onPress={onPressTo}>
          <Text style={{fontSize: 24}}>{moment(to).format('hh:mm')}</Text>
          {showTo && (
            <DateTimePicker
              value={to}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                setShowTo(false);
                setTo(selectedDate);
              }}
            />
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: '#077EE9',
          paddingVertical: '8%',
          paddingHorizontal: '8%',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Select Days</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '5%',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#077EE9',
              marginHorizontal: '1%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2%',
              paddingHorizontal: '4%',
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 16}}>S</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#077EE9',
              marginHorizontal: '1%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2%',
              paddingHorizontal: '4%',
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 16}}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#077EE9',
              marginHorizontal: '1%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2%',
              paddingHorizontal: '4%',
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 16}}>T</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#077EE9',
              marginHorizontal: '1%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2%',
              paddingHorizontal: '4%',
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 16}}>W</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#077EE9',
              marginHorizontal: '1%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2%',
              paddingHorizontal: '4%',
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 16}}>T</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#077EE9',
              marginHorizontal: '1%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2%',
              paddingHorizontal: '4%',
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 16}}>F</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#077EE9',
              marginHorizontal: '1%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2%',
              paddingHorizontal: '4%',
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 16}}>S</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#077EE9',
          width: '75%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: '4%',
          alignSelf: 'center',
          marginVertical: '15%',
          borderRadius: 30,
          elevation: 4,
        }}>
        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
          SAVE
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default TimeSlots;
