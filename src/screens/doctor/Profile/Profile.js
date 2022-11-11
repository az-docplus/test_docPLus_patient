import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';

function Profile({navigation}) {
  
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flex: 3,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 8,
          paddingBottom: 8,
        }}>
        <TouchableOpacity>
          <View
            style={{
              height: 150,
              width: 150,
              borderRadius: 150,
              backgroundColor: '#fff',
              overflow: 'hidden',
            }}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../../assets/jpg/person1.jpg')}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                marginLeft: 'auto',
                marginRight: 'auto',
                height: 30,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(80,80,80,0.3)',
              }}>
              <Text style={{color: '#f2f2f2', fontSize: 12}}>Upload</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 8}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddAppointments')}>
          <View
            style={{
              width: '100%',
              borderBottomWidth: 0.2,
              paddingVertical: 15,
              paddingHorizontal: 15,
            }}>
            <Text>Appointments</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddQuestionnaire')}>
          <View
            style={{
              width: '100%',
              borderBottomWidth: 0.2,
              paddingVertical: 15,
              paddingHorizontal: 15,
            }}>
            <Text>Questionaire</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              width: '100%',
              borderBottomWidth: 0.2,
              paddingVertical: 15,
              paddingHorizontal: 15,
            }}>
            <Text>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Profile;
