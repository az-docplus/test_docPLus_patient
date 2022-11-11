import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Animated,
} from 'react-native';
import CalenderBlock from '../../atoms/CalenderBlock/CalenderBlock';
import calculateMonths from '../../../utils/calculateMonths';
import {months} from '../../../utils/Months';

const MountMonth = ({dayNdate, onPressDate}) => {
  return (
    <FlatList
      listKey={JSON.stringify(dayNdate)}
      data={dayNdate}
      numColumns={7}
      keyExtractor={item => item.date.toString()}
      renderItem={({item}) => (
        <CalenderBlock
          onPress={() => onPressDate(item.date)}
          active={item.active}
          style={{
            Container: {borderColor: 'rgba(0,0,0,0.1)', borderWidth: 0.2},
            Text: {fontWeight: '700'},
          }}
          text={item.date}
        />
      )}
    />
  );
};
function AppointmentCalenderMonth({style, callback}) {
  const [dayNdate, setdayNdate] = useState([]);
  const date = new Date();
  const calculateMonthsOnMount = () => {
    let arr = calculateMonths(date.getMonth());
    const Timeout = setTimeout(() => {
      setdayNdate(arr);
    }, 100);
    return () => clearTimeout(Timeout);
  };
  useEffect(calculateMonthsOnMount, []);
  const onPressDate = date => {
    callback(date);
  };
  return (
    <Animated.View
      style={[MonthOfCalendarStyles.Container, style ? style.Container : null]}>
      <View style={MonthOfCalendarStyles.Header}>
        <Text style={MonthOfCalendarStyles.HeaderText}>
          {months[date.getMonth()].name} {date.getFullYear()}
        </Text>
      </View>
      <View style={MonthOfCalendarStyles.ContentContainer}>
        <FlatList
          listKey={date.toString()}
          data={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          numColumns={7}
          keyExtractor={item => item.toString()}
          renderItem={({item}) => <CalenderBlock text={item} />}
        />
        {dayNdate.length ? (
          <MountMonth dayNdate={dayNdate} onPressDate={onPressDate} />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </Animated.View>
  );
}

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
export default React.memo(AppointmentCalenderMonth);
