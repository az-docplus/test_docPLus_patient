import {
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

const AntDesignIconsIcons = ({ name, size, color }) => (
  <AntDesignIcons size={size} color={color} name={name} />
);

export default function AppointmentDuration({activeKey, setActiveKey}) {
  //   const [selectedValue, setSelectedValue] = useState('15 mins');
  //   const space = props.gap;
  const minutesArray = ['15', '30', '45', '60'];
  const [isTimeList, setIsTimeList] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 35,
        justifyContent: 'space-between',
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AntDesignIconsIcons name="clockcircleo" color="#EA1A65" size={20} />
        <View style={{ marginLeft: 8 }}>
          <Text style={{ fontFamily: 'Montserrat-Regular' }}>Appointment</Text>
          <Text style={{ fontFamily: 'Montserrat-Regular' }}>Duration</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => {
            setIsTimeList(!isTimeList);
            LayoutAnimation.spring();
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            elevation: 4,
            backgroundColor: '#fff',
            paddingVertical: 7,
            paddingHorizontal: 17,
            borderRadius: 9,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 14,
              marginRight: 9,
            }}>
            {activeKey} {'mins'}
          </Text>
          <AntDesignIconsIcons name="caretdown" color="#000" size={12} />
        </TouchableOpacity>

        {isTimeList && (
          <View
            style={{
              position: 'absolute',
              elevation: 8,
              zIndex: 9,
              top: -39 * 5,
              borderWidth: 0.1,
              borderRadius: 20,
            }}>
            {minutesArray &&
              minutesArray.map((val) => (
                <TouchableOpacity
                  onPress={() => {
                    setActiveKey(val);
                    setIsTimeList(!isTimeList);
                    LayoutAnimation.spring();
                  }}
                  style={{
                    backgroundColor: '#fff',
                    paddingVertical: 7,
                    paddingHorizontal: 17,
                    paddingRight: 24,
                    height: 38,
                  }}>
                  <Text
                    style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>
                    {val}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        )}
      </View>
    </View>
  );
}
