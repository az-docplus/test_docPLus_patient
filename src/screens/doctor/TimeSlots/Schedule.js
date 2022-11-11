import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
function TimeSlots({navigation}) {
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <TopNavBar navigation={navigation} headerText="Schedule" />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: '5%',
          marginHorizontal: '9%',
        }}>
        Time Slots
      </Text>

      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          backgroundColor: '#fff',
          elevation: 4,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: '4%',
          paddingHorizontal: '5%',
          marginVertical: '4%',
          borderRadius: 20,
        }}>
        <View style={{flex: 3, justifyContent: 'space-between'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            08:45 - 09:45 am
          </Text>
          <Text style={{color: '#43A2A2', marginTop: '2%'}}>
            Tue, Wed, Thu, Fri
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <MaterialIcon name={'delete'} size={26} color={'#7B7A79'} />
          <MaterialIcon name={'pencil'} size={26} color={'#7B7A79'} />
        </View>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: '#077EE9',
          width: '90%',
          alignSelf: 'center',
          paddingVertical: '4%',
          paddingHorizontal: '10%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          elevation: 3,
        }}>
        <MaterialIcon name={'plus'} color={'#43A2A2'} size={34} />
        <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: '5%'}}>
          Add new
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default TimeSlots;
