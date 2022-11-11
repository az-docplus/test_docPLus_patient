import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import DmzText from '../../atoms/DmzText/DmzText';
import DmzButton from '../../atoms/SwitchButton/SwitchButton';

function TimelineContent({
  Profile,
  PatientName,
  Timing,
  Age,
  Disease,
  onPressContinue,
  active,
}) {
  return (
    <>
      <View style={Styles.TimelineContent}>
        {active ? Profile : null}
        <View style={Styles.TimelineDetails}>
          <View
            style={[
              Styles.TimelineNameContainer,
              {width: active ? '60%' : '100%'},
            ]}>
            <DmzText
              type={active ? 4 : 3}
              text={PatientName}
              style={Styles.TimelineName}
            />
            <View style={[Styles.TimelineTime]}>
              <Text>{Timing}</Text>
            </View>
          </View>
          <Text style={Styles.TimelineAge}>{`${Age} yrs`}</Text>
          <View style={Styles.TimelineDisease}>
            <Text style={Styles.TimelineDiseaseText}>{Disease}</Text>
          </View>
        </View>
      </View>
      {active === true ? (
        <DmzButton
          onPress={onPressContinue}
          icon={<FontAwesomeIcon name="remove" size={18} color="#555" />}
          style={{Container: Styles.TimelineContinueButton}}
        />
      ) : null}
    </>
  );
}

const Styles = StyleSheet.create({
  TimelineContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TimelineDetails: {
    marginLeft: 10,
    width: '100%',
  },
  TimelineNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TimelineName: {
    color: '#444',
  },
  TimelineTime: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  TimelineAge: {
    color: '#444',
  },
  TimelineDisease: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 5,
  },
  TimelineDiseaseText: {
    borderRadius: 10,
    color: '#444',
    fontSize: 14,
  },
  TimelineContinueButton: {
    height: null,
    width: 60,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 8,
    paddingRight: 18,
    paddingLeft: 18,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 20,
  },
});
export default TimelineContent;
