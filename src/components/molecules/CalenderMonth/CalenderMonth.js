import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Animated,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import CalenderBlock from '../../atoms/CalenderBlock/CalenderBlock';
import calculateMonths from '../../../utils/calculateMonths';
import {months} from '../../../utils/Months';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import VerticalText from '../../atoms/VerticalText/VerticalText';
import {slice} from 'lodash';
import {TouchableOpacity} from 'react-native-gesture-handler';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const MountMonth = ({dayNdate, setDate, activeDate}) => {
  return (
    <FlatList
      listKey={JSON.stringify(dayNdate)}
      data={dayNdate}
      numColumns={7}
      keyExtractor={(item) => item.date.toString()}
      renderItem={({item}) => (
        <CalenderBlock
          onPress={() => {
            setDate(item.date);
          }}
          tapActive={item.date === activeDate}
          active={item.active}
          text={item.date}
        />
      )}
    />
  );
};
function CalenderMonth({
  style,
  dayNdate = [],
  setDate,
  activeDate,
  setGlobalShowCalendar,
}) {
  const date = new Date();
  const [showCalendar, setShowCalender] = useState(false);
  const week = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [defaultDayNdate, setDefaultDayNdate] = useState([]);
  const todayDate = date.getDate();
  const day = date.getDay();
  useEffect(() => {
    const index = dayNdate
      .map((item, i) => {
        if (item.date === todayDate) return i;
      })
      .find((item) => item);
    const sliced = dayNdate.slice(index - day, index - day + 7);
    setDefaultDayNdate(sliced);
  }, [dayNdate]);
  return (
    <Animated.View
      style={[MonthOfCalendarStyles.Container, style ? style.Container : null]}>
      <View style={MonthOfCalendarStyles.Header}>
        <Text style={MonthOfCalendarStyles.HeaderText}>
          {months[date.getMonth()].name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setShowCalender(!showCalendar);
            setGlobalShowCalendar(!showCalendar);
          }}>
          <Icon name="calendar" size={20} color={'#EA508F'} />
        </TouchableOpacity>
      </View>
      {!showCalendar && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          {defaultDayNdate.map((item) => {
            return (
              <VerticalText
                key={item.date}
                isActive={item.date === todayDate}
                text={{
                  Top: `${week[item.day]}`,
                  Bottom: `${item.date}`,
                }}></VerticalText>
            );
          })}
        </View>
      )}
      {showCalendar && (
        <View>
          {dayNdate.length ? (
            <MountMonth
              activeDate={activeDate}
              setDate={setDate}
              dayNdate={dayNdate}
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
      )}
    </Animated.View>
  );
}

const MonthOfCalendarStyles = StyleSheet.create({
  Container: {
    height: 'auto',
    marginLeft: 20,
    marginRight: 20,
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  HeaderText: {
    color: '#9C77BC',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
export default CalenderMonth;
