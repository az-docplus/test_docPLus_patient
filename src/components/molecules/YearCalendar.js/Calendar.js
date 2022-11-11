/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, FlatList} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {extendMoment} from 'moment-range';
import Moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import {
  NEW_HEADER_TEXT,
  SEARCH_PLACEHOLDER_COLOR,
  NEW_UNSELECTED_TEXT,
  NEW_PRIMARY_COLOR,
  SECONDARY_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import RadioGroupV2 from '../../molecules/RadioGroup/RadioGroupV2';
import { Colors } from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';
const moment = extendMoment(Moment);

export default function Calendar({onDateChange, getDateView, activeConsultationType, setActiveConsultationType, data}) {
  const { theme } = useSelector(state => state.AuthReducer)
  const width = Dimensions.get('screen').width;
  const [months, setMonths] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const exampleRef = React.createRef();
  const daysLable = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [selectedStartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState();

  const getMonths = () => {
    const monthList = moment.months();
    const coming12Months = monthList
      .concat(monthList.slice(0, moment().month()))
      .slice(-12);
    console.log(coming12Months);
    setMonths(coming12Months);
  };
  const minDate = new Date(1950, 1, 1);
  const maxDate = new Date(2050, 12, 31);

  const setMonth = async (i) => {
    var index = months.indexOf(i);
    var index2 = selectedIndex;
    if (index > index2) {
      while (index2 < index) {
        await exampleRef.current.handleOnPressNext();
        index2++;
      }
      setSelectedIndex(index2);
    } else if (index < index2) {
      while (index2 > index) {
        await exampleRef.current.handleOnPressPrevious();
        index2--;
      }
      setSelectedIndex(index2);
    }
  };

  useEffect(() => {
    getMonths();
  }, []);

  useEffect(() => {
    console.log("...................", activeConsultationType)
  }, [activeConsultationType])

  // const [activeConsultationType, setActiveConsultationType] = useState('TC');

  return (
    <View style={{
      backgroundColor: Colors.secondary_background[theme],
    }}>
      {data === "Both" && <View
        style={{
          height: 80,
          paddingHorizontal: '10%',
          justifyContent: 'space-around',
          backgroundColor: Colors.secondary_background[theme],
          // borderBottomWidth: 3,
          // borderBottomColor: 'rgba(237,237,237,0.9)',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: Colors.primary_text_color[theme],}}>
          Select consultation type
        </Text>
        <View
          style={{flex: 1, justifyContent: 'center', paddingHorizontal: '3%', backgroundColor: Colors.secondary_background[theme],}}>
          <RadioGroupV2
            horizontal={true}
            activeKey={activeConsultationType}
            setActiveKey={setActiveConsultationType}
            Item={[
              {value: 'Tele-Consult', id: 'TC'},
              {value: 'In-Person', id: 'IP'},
            ]}></RadioGroupV2>
        </View>
      </View>}
      <FlatList
        data={months}
        horizontal
        style={{
          borderBottomWidth: 3,
          borderBottomColor: 'rgba(237,237,237,0.9)',
          borderTopWidth: 3,
          borderTopColor: 'rgba(237,237,237,0.9)',
          backgroundColor: Colors.secondary_background[theme],
          paddingVertical: '4%',
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
        //  console.log(item, index);
          return (
            <TouchableOpacity
              style={{
                width: 150,
                alignItems: 'center',
                backgroundColor: Colors.secondary_background[theme],
                borderRightWidth: 2,
                borderColor: NEW_PRIMARY_COLOR,
              }}
              onPress={() => {
                setMonth(item);
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color:
                    selectedIndex == index
                      ? Colors.primary_text_color[theme]
                      : NEW_UNSELECTED_TEXT,
                  // fontWeight: 'bold',
                  fontFamily:
                    selectedIndex == index
                      ? 'Montserrat-Bold'
                      : 'Montserrat-Regular',
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <FlatList
        data={daysLable}
        scrollEnabled={false}
        horizontal
        style={{marginHorizontal: 10, marginTop: 20, 
          backgroundColor: Colors.secondary_background[theme],
        }}
        renderItem={({item}) => {
          return (
            <View
              style={{
                width: width / 7 - 20 / 7,
                backgroundColor: Colors.secondary_background[theme],
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.primary_text_color[theme],
                  fontFamily: 'Montserrat-SemiBold',
                  width: '100%',
                  textAlign: 'center',
                }}>
                {item}
              </Text>
            </View>
          );
        }}
      />
      <View style={{
        backgroundColor: Colors.secondary_background[theme],
      }}>
      <CalendarPicker
        disabledDates={(date) => {
          const t2 = new Date().setDate(new Date().getDate() - 1);
          return (
            Moment(date) < Moment(t2)
          );
        }}
        ref={exampleRef}
        // showDayStragglers={true}
        startFromMonday={false}
        allowRangeSelection={true}
        minDate={minDate}
        maxDate={maxDate}
        todayBackgroundColor="transparent"
        selectedDayStyle={{
          backgroundColor: SECONDARY_COLOR,
          borderRadius: 6,
        }}
        nextTitleStyle={{height: 0}}
        previousTitleStyle={{height: 0}}
        todayTextStyle={{
          borderRadius: 6,
          borderWidth: 1,
          width: 30,
          height: 30,
          textAlignVertical: 'center',
          textAlign: 'center',
          borderColor: NEW_PRIMARY_COLOR,
        }}
        /* containerStyle={{
          backgroundColor: Colors.secondary_background[theme],
        }} */
        textStyle={{
          // color: NEW_HEADER_TEXT,
          color: Colors.primary_text_color[theme],
          fontFamily: 'Montserrat-Regular',
        }}
        selectedDayTextColor="#000000"
        onDateChange={onDateChange}
        activeConsultationType={activeConsultationType}
        selectedRangeStartStyle={{
          backgroundColor: SECONDARY_COLOR,
        }}
        selectedRangeEndStyle={{
          backgroundColor: SECONDARY_COLOR,
        }}
        selectedRangeStyle={{
          backgroundColor: SECONDARY_BACKGROUND,
          paddingVertical: -20,
        }}
        weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
        dayLabelsWrapper={{
          height: 0,
          borderBottomWidth: 0,
          borderTopWidth: 0,
          backgroundColor: 'transaprent',
          backgroundColor: Colors.secondary_background[theme],
          maxHeight: 0,
          width: 2,
         marginBottom: -30,
        }}
        showDayStragglers={false}
        monthYearHeaderWrapperStyle={{
          height: 0,
          width: 0,
        }}
      />
      </View>
    </View>
  );
}
