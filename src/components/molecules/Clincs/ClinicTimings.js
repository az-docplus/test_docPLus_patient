import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {GREY_BACKGROUND, SECONDARY_COLOR} from '../../../styles/colors';
import RadioGroupV2 from '../../../components/molecules/RadioGroup/RadioGroupV2';
import {connect} from 'react-redux';
import moment from 'moment';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import Alternate from '../../../components/molecules/Alternate/Alternate';
import {SaveSlots} from '../../../reduxV2/action/DoctorAction';
import {Colors} from '../../../styles/colorsV2';
import {Local, setLocale} from '../../../i18n';
import {useDispatch, useSelector} from 'react-redux';

class availablity extends React.Component {
  constructor(props) {
    super(props);
    this.theme = this.props.theme;
    this.state = {
      formLayout: 'vertical',
      startTime: null,
      endTime: null,
      duration: '15',
      gap: 'none',
      customGap: '',
      weekdays: [],
      spinning: false,
      weekdaysArr: [
        {
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          startTime: '08:00:00',
          endTime: '17:00:00',
          lunchStart: '12:00:00',
          lunchEnd: '13:00:00',
        },
      ],
    };
    this.onWeekTimeChange = this.onWeekTimeChange.bind(this);
  }
  componentDidUpdate() {
    console.log(this.state, '...............state');
  }
  onCloseTo = () => {
    this.props.onClose();
  };
  handleFormLayoutChange = (e) => {
    this.setState({formLayout: e.target.value});
  };
  onDurationChange = (value) => {
    this.setState({
      duration: value,
    });
  };
  onGapChange = (e) => {
    const {value} = e.target;
    this.setState({
      gap: value,
    });
  };
  onDaysChange = (e) => {
    const {weekdays} = this.state;
    const {value} = e.target;
    if (weekdays.includes(value)) {
      this.setState({
        weekdays: weekdays.filter((el) => el !== value),
      });
    } else {
      this.setState({
        weekdays: [...weekdays, value],
      });
    }
  };
  onWeekDayChange = (e, index, value) => {
    console.log(e, index, value, 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    const {weekdaysArr} = this.state;
    //const { value } = e.target;
    const inInCurrent = weekdaysArr[index].days.some((el) => el === value);
    const isInOther = weekdaysArr.some((el) =>
      el.days.some((elx) => elx === value),
    );
    if (inInCurrent) {
      this.setState({
        weekdaysArr: weekdaysArr.map((el, i) => {
          if (i !== index) return el;
          return {
            ...el,
            days: el.days.filter((elx) => elx !== value),
          };
        }),
      });
    } else if (isInOther) {
      this.setState({
        weekdaysArr: weekdaysArr.map((el, i) => {
          if (i !== index)
            return {
              ...el,
              days: el.days.filter((elx) => elx !== value),
            };
          return {
            ...el,
            days: [...el.days, value],
          };
        }),
      });
    } else {
      this.setState({
        weekdaysArr: weekdaysArr.map((el, i) => {
          if (i !== index) return el;
          return {
            ...el,
            days: [...el.days, value],
          };
        }),
      });
    }
  };
  onWeekTimeChange(time, index, key = 'startTime') {
    console.log(time, index, key, '...........time change');
    this.setState((prevState) => ({
      weekdaysArr: prevState.weekdaysArr.map((el, i) => {
        if (index === i) {
          return {
            ...el,
            [key]: time,
          };
        }
        return el;
      }),
    }));
  }
  timeonChange(time, timeString) {
    console.log(time, timeString);
  }
  onStartTimeChange = (startTime) => {
    this.setState({
      startTime,
    });
  };
  onEndTimeChange = (endTime) => {
    this.setState({
      endTime,
    });
  };
  onSubmit = (e) => {
    const {duration, weekdaysArr} = this.state;
    const download = (objectData) => {
      let filename = 'export.json';
      let contentType = 'application/json;charset=utf-8;';
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        var blob = new Blob(
          [decodeURIComponent(encodeURI(JSON.stringify(objectData)))],
          {type: contentType},
        );
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        var a = document.createElement('a');
        a.download = filename;
        a.href =
          'data:' +
          contentType +
          ',' +
          encodeURIComponent(JSON.stringify(objectData));
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    };
    const {userData, theme} = this.props;
    // const modifiedWeekArr = weekdaysArr.map(el => {
    // 	return ({
    // 		...el,
    // 		startTime: typeof el.startTime === "string" ? el.startTime : moment(el.startTime).format("HH:mm:ss"),
    // 		endTime: typeof el.endTime === "string" ? el.endTime : moment(el.endTime).format("HH:mm:ss"),
    // 		lunchStart: typeof el.lunchStart === "string" ? el.lunchStart : moment(el.lunchStart).format("HH:mm:ss"),
    // 		lunchEnd: typeof el.lunchEnd === "string" ? el.lunchEnd : moment(el.lunchEnd).format("HH:mm:ss"),
    // 	})
    // })
    this.props.onUpdate({
      duration,
      id: userData._id,
      weekdaysArr: weekdaysArr,
    });
  };
  render() {
    const {
      visible,
      userData,
      theme,
      doctor,
      navigation,
      addingTiming,
      details,
      onUpdate,
    } = this.props;
    const {formLayout, duration, weekdaysArr} = this.state;
    const buttonItemLayout =
      formLayout === 'horizontal'
        ? {
            wrapperCol: {span: 14, offset: 4},
          }
        : null;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.secondary_background[theme],
          marginTop: '8%',
        }}>
        {addingTiming && (
          <View>
            <View
              style={{
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  // color: !isHistoryTab ? NEW_HEADER_TEXT : INPUT_PLACEHOLDER,
                  fontSize: 20,
                  fontFamily: 'Montserrat-SemiBold',
                  color: Colors.primary_text_color[theme],
                }}>
                Clinic Timings
              </Text>
              <RadioGroupV2
                horizontal={true}
                activeKey={duration}
                style={{marginTop: '8%'}}
                setActiveKey={this.onDurationChange}
                Item={[
                  {value: '15mins', id: '15'},
                  {value: '30mins', id: '30'},
                  {value: '45mins', id: '45'},
                  {value: '60mins', id: '60'},
                ]}></RadioGroupV2>
            </View>
            <Text
              style={{
                // color: !isHistoryTab ? NEW_HEADER_TEXT : INPUT_PLACEHOLDER,
                marginTop: '4%',
                textAlign: 'center',
                fontSize: 18,
                color: Colors.primary_text_color[theme],
                fontFamily: 'Montserrat-Regular',
              }}>
              Choose any day to the week to repeat this availabilty
            </Text>
            {weekdaysArr.map((week, index) => {
              return (
                <Alternate
                  key={index}
                  weekdays={week.days}
                  index={index}
                  onDaysChange={this.onWeekDayChange}
                  onWeekTimeChange={this.onWeekTimeChange}
                  onStartTimeChange={(e) => {
                    this.onWeekTimeChange(e, index, 'startTime');
                  }}
                  onEndTimeChange={(e) => {
                    this.onWeekTimeChange(e, index, 'endTime');
                  }}
                  onLunchStartChange={(e) => {
                    this.onWeekTimeChange(e, index, 'lunchStart');
                  }}
                  onLunchEndChange={(e) => {
                    this.onWeekTimeChange(e, index, 'lunchEnd');
                  }}
                  startTime={week.startTime}
                  endTime={week.endTime}
                  lunchStart={week.lunchStart}
                  lunchEnd={week.lunchEnd}
                  onAdd={() => {
                    this.setState({
                      weekdaysArr: [
                        ...weekdaysArr,
                        {
                          days: [],
                          startTime: moment('08:00:00', 'HH:mm:ss'),
                          endTime: moment('17:00:00', 'HH:mm:ss'),
                          lunchStart: moment('12:00:00', 'HH:mm:ss'),
                          lunchEnd: moment('13:00:00', 'HH:mm:ss'),
                        },
                      ],
                    });
                  }}
                  hideRemove={index === 0}
                  onRemove={() => {
                    if (weekdaysArr.length > 1) {
                      this.setState({
                        weekdaysArr: weekdaysArr.filter((el, i) => i !== index),
                      });
                    }
                  }}
                />
              );
            })}
          </View>
        )}
        <DmzButton
          // disabled={
          //   details.ClinicName === '' ||
          //   details.ClinicNumber == '' ||
          //   details.Fees === '' ||
          //   details.City === '' ||
          //   details.Locality == '' ||
          //   details.MapLocation === '' ||
          //   details.StreetAdrress === ''
          // }
          isLoading={doctor.addingClinics}
          onPress={this.onSubmit}
          style={{
            Text: {
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            },
            Container: {
              width: '72%',
              height: 46,
              borderRadius: 25,
              backgroundColor: SECONDARY_COLOR,
              alignSelf: 'center',
              marginTop: 20,
              elevation: 3,
            },
          }}
          text="UPDATE"
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  userData: state.AuthReducer.userData,
  theme: state.AuthReducer.theme,
  doctor: state.DoctorReducer,
});
export default connect(mapStateToProps, {SaveSlots})(availablity);
