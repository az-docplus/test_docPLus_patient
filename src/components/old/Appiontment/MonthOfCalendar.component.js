import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
      View,
      FlatList,
      StyleSheet,
      Text,
      useWindowDimensions,
} from 'react-native';
import calculateMonths from '../../../utils/calculateMonths.utils';

const MonthOfCalendar = ({ month, item, booked_days }) => {
      const dimen = useWindowDimensions();
      const [dayNdate, setdayNdate] = useState([]);
      const [sortDates, setSortDates] = useState([])

      const months = useRef([
            {
                  month: 1,
                  name: 'January',
            },
            {
                  month: 2,
                  name: 'February',
            },
            {
                  month: 3,
                  name: 'March',
            },
            {
                  month: 4,
                  name: 'April',
            },
            {
                  month: 5,
                  name: 'May',
            },
            {
                  month: 6,
                  name: 'June',
            },
            {
                  month: 7,
                  name: 'July',
            },
            {
                  month: 8,
                  name: 'August',
            },
            {
                  month: 9,
                  name: 'September',
            },
            {
                  month: 10,
                  name: 'October',
            },
            {
                  month: 11,
                  name: 'November',
            },
            {
                  month: 12,
                  name: 'December',
            },
      ]).current;

      const calculateMonthsOnMount = () => {
            const arr = calculateMonths(month);
            const Timeout = setTimeout(() => {
                  setdayNdate(arr);
            }, 100);
            return () => clearTimeout(Timeout);
      };



      useEffect(() => {
            calculateMonthsOnMount()
            setSortDates([...booked_days()])
      }, []);
      return (
            <View style={MonthOfCalendarStyles.Container}>
                  <View style={MonthOfCalendarStyles.Header}>
                        <Text style={MonthOfCalendarStyles.HeaderText}>
                              {months[item.month - 1].name} 2020
                        </Text>
                  </View>
                  <View style={MonthOfCalendarStyles.ContentContainer}>
                        <FlatList
                              listKey={item.month.toString()}
                              data={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
                              numColumns={7}
                              keyExtractor={item => item.toString()}
                              renderItem={({ item }) => (
                                    <View
                                          style={{
                                                width: (dimen.width - 40) / 7,
                                                height: (dimen.width - 100) / 7,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                          }}>
                                          <Text style={{ fontWeight: '600' }}>{item}</Text>
                                    </View>
                              )}
                        />
                        <FlatList
                              listKey={item.name + item.month}
                              data={dayNdate}
                              numColumns={7}
                              keyExtractor={item => item.date.toString()}
                              renderItem={({ item }) => (
                                    <View
                                          style={{
                                                width: (dimen.width - 40) / 7,
                                                height: (dimen.width - 40) / 7,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderColor: 'rgba(0,0,0,0.1)',
                                                borderWidth: 0.2,
                                          }}>
                                          <Text
                                                style={[
                                                      {
                                                            fontWeight: '700',
                                                            width: 20,
                                                            textAlign: 'center',
                                                            borderRadius: 2,
                                                      },
                                                      sortDates.includes(item.date.toString()) ? {
                                                            backgroundColor: '#F4C130',
                                                            color: '#fff',
                                                      } : null,
                                                ]}>
                                                {item.date}
                                          </Text>
                                    </View>
                              )}
                        />
                  </View>
            </View>
      );
};



const MonthOfCalendarStyles = StyleSheet.create({
      Container: {
            height: 'auto',
            marginLeft: 20,
            marginRight: 20,
      },
      Header: {},
      HeaderText: {
            fontSize: 20,
            fontWeight: 'bold',
            letterSpacing: 0.5,
      },
      ContentContainer: {
            borderWidth: 0.2,
            borderColor: 'rgba(0,0,0,0.08)',
      },
});
export default MonthOfCalendar;
