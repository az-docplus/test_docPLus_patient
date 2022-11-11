import React from 'react';
import {View, StyleSheet} from 'react-native';
import BasicCard from '../../atoms/BasicCard/BasicCard';
import TimelineContent from '../TimelineContent/TimelineContent';
import Ring from '../../../assets/svg/ring.svg';
import RingCircle from '../../../assets/svg/ringCircle.svg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
function TimelineContainer({
  PatientName,
  Timing,
  onPress,
  Age,
  Disease,
  Profile,
  active,
  onPressContinue,
}) {
  return (
    <View style={Styles.TimelineContainer}>
      <TouchableWithoutFeedback onPress={onPress}>
        <BasicCard
          style={{
            CardContainer: [
              Styles.CardContainer,
              active
                ? {backgroundColor: '#F4C130', elevation: 10}
                : {backgroundColor: '#fff', elevation: 0},
            ],
          }}>
          <TimelineContent
            PatientName={PatientName}
            Timing={Timing}
            onPressContinue={onPressContinue}
            Age={Age}
            Disease={Disease}
            Profile={Profile}
            active={active}
          />
        </BasicCard>
      </TouchableWithoutFeedback>
      <View style={Styles.RingCircleContainer}>
        {active ? <RingCircle height={20} /> : <Ring height={20} />}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  TimelineContainer: {
    marginLeft: 30,
    paddingLeft: 20,
    borderLeftWidth: 2,
    borderLeftColor: '#F4C130',
  },
  CardContainer: {
    marginRight: 15,
    marginBottom: 25,
    alignItems: 'flex-start',
    height: 'auto',
    position: 'relative',
    padding: 20,
    paddingBottom: 25,
    elevation: 1,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  RingCircleContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    left: -16,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 30,
    paddingBottom: 5,
  },
});
export default TimelineContainer;
