import moment from 'moment';
import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Alternate from '../../../../components/molecules/Alternate/Alternate';
import {
  SaveSlots,
  UpdateDoctorProfile,
} from '../../../../reduxV2/action/DoctorAction';
import { Colors } from '../../../../styles/colorsV2';
import CancelSaveButton from '../__Components/cancel-save-buttons';
import AppointmentDuration from '../../../../components/atoms2/appointments/appointmentDuration';

class availablity extends React.Component {
  constructor(props) {
    super(props);
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
    this.onDurationChange = this.onDurationChange.bind(this);
  }
  componentDidMount() {
    const { userData } = this.props;
    const appointmentsString = JSON.parse(userData.appointmentsString);
    console.log({ appointmentsString: userData.appointmentsString });
    this.setState({
      duration: appointmentsString.duration,
      weekdaysArr: appointmentsString.weekdaysArr,
    });
  }
  componentDidUpdate() {
    //  console.log(this.state, "...............state")
  }
  onCloseTo = () => {
    this.props.onClose();
  };
  handleFormLayoutChange = (e) => {
    this.setState({ formLayout: e.target.value });
  };
  onDurationChange = (value) => {
    this.setState({
      duration: value,
    });
  };
  onGapChange = (e) => {
    const { value } = e.target;
    this.setState({
      gap: value,
    });
  };
  onDaysChange = (e) => {
    const { weekdays } = this.state;
    const { value } = e.target;
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
    const { weekdaysArr } = this.state;
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
    const { duration, weekdaysArr } = this.state;
    const download = (objectData) => {
      let filename = 'export.json';
      let contentType = 'application/json;charset=utf-8;';
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        var blob = new Blob(
          [decodeURIComponent(encodeURI(JSON.stringify(objectData)))],
          { type: contentType },
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
    const { userData } = this.props;
    // const modifiedWeekArr = weekdaysArr.map(el => {
    // 	return ({
    // 		...el,
    // 		startTime: typeof el.startTime === "string" ? el.startTime : moment(el.startTime).format("HH:mm:ss"),
    // 		endTime: typeof el.endTime === "string" ? el.endTime : moment(el.endTime).format("HH:mm:ss"),
    // 		lunchStart: typeof el.lunchStart === "string" ? el.lunchStart : moment(el.lunchStart).format("HH:mm:ss"),
    // 		lunchEnd: typeof el.lunchEnd === "string" ? el.lunchEnd : moment(el.lunchEnd).format("HH:mm:ss"),
    // 	})
    // })
    this.props.SaveSlots(
      {
        duration,
        id: userData._id,
        type: this.props.type,
        weekdaysArr: weekdaysArr,
      },
      (res) => {
        Alert.alert('Update Success!', 'Slots have been updated successfully!');
        const profileData = {
          appointmentsString: JSON.stringify({
            duration,
            id: userData._id,
            type: this.props.type,
            weekdaysArr: weekdaysArr,
          }),
          id: userData._id,
        };
        this.props.UpdateDoctorProfile(profileData);
      },
      (e) => {
        Alert.alert('Update Error!', 'Something went Wrong!');
      },
    );
  };
  render() {
    const { userData, theme, backToPageOne } = this.props;
    const { formLayout, duration, weekdaysArr } = this.state;

    const buttonItemLayout =
      formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : null;

    return (
      <View
        style={{ flex: 1, backgroundColor: Colors.primary_background[theme] }}>
        {/* <TopNavBar
					navigation={navigation}
					headerText={`${Local("doctor.availablity.availability")}`}>
				</TopNavBar> */}
        <ScrollView
          contentContainerStyle={{
            padding: 20,
            paddingTop: 0,
          }}>
          {/* <View
                        style={{
                            // paddingHorizontal: '8%',
                            paddingVertical: '3%',
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                // color: !isHistoryTab ? NEW_HEADER_TEXT : INPUT_PLACEHOLDER,
                                fontSize: 20,
                                color: Colors.primary_text_color[theme],
                                fontFamily: 'Montserrat-SemiBold',
                            }} >{Local("doctor.availablity.appointment_duration")}</Text>
                        <RadioGroupV2
                            horizontal={true}
                            activeKey={duration}
                            style={{ marginTop: "8%", paddingRight: '4%' }}
                            setActiveKey={this.onDurationChange}
                            Item={[
                                { value: '15mins', id: '15' },
                                { value: '30mins', id: '30' },
                                { value: '45mins', id: '45' },
                                { value: '60mins', id: '60' },
                            ]}>
                        </RadioGroupV2>
                    </View> */}
          {/* <Text style={{
                        // color: !isHistoryTab ? NEW_HEADER_TEXT : INPUT_PLACEHOLDER,
                        marginTop: "4%",
                        textAlign: 'center',
                        color: Colors.primary_text_color[theme],
                        fontSize: 18,
                        fontFamily: 'Montserrat-Regular',
                    }}>{Local("doctor.availablity.choose_any_day")}</Text> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              marginTop: 20,
            }}>
            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 20 }}>
              Select Days
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#077EE9',
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 18,
                }}>
                Select all
              </Text>
            </TouchableOpacity>
          </View>
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
                        days: ['saturday', 'sunday'],
                        startTime: '08:00:00',
                        endTime: '17:00:00',
                        lunchStart: '12:00:00',
                        lunchEnd: '13:00:00',
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
                index={index}
              />
            );
          })}
          <View style={{ marginTop: 24 }}>
            <AppointmentDuration
              activeKey={duration}
              setActiveKey={this.onDurationChange}
            />
          </View>

          <View style={{ marginTop: 60 }}>
            <CancelSaveButton
              onSavePress={this.onSubmit}
              onCancelPress={backToPageOne}
            />
          </View>

          {/* <DmzButton
                        isLoading={doctor.gettingSlots}
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
                    /> */}
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  userData: state.AuthReducer.userData,
  doctor: state.DoctorReducer,
  theme: state.AuthReducer.theme,
});
export default connect(mapStateToProps, { SaveSlots, UpdateDoctorProfile })(
  availablity,
);
