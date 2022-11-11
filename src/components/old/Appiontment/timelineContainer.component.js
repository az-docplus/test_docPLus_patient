import React, { memo } from 'react';
import {View, StyleSheet} from 'react-native';
import BasicCard from '../BasicCard/basicCard.component';
import CardContent from './card.component';
import Ring from '../../../assets/svg/ring.svg';
import RingCircle from '../../../assets/svg/ringCircle.svg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const TimelineContainer = memo(({
  PatientName,
  Timing,
  onPress,
  Age,
  Disease,
  Profile,
  active,
}) => {
  return (
    <View style={TimelineContainerStyles.TimelineContainer}>
      <TouchableWithoutFeedback onPress={onPress}>
        <BasicCard
          style={{
            CardContainer: [
              TimelineContainerStyles.CardContainer,
              active
                ? {backgroundColor: '#F4C130'}
                : {backgroundColor: '#fff', elevation: 0},
            ],
          }}>
          <CardContent
            PatientName={PatientName}
            r
            Timing={Timing}
            // onPress={onPress}
            Age={Age}
            Disease={Disease}
            Profile={Profile}
            active={active}
          />
        </BasicCard>
      </TouchableWithoutFeedback>
      <View style={TimelineContainerStyles.RingCircleContainer}>
        <View
          style={[
            TimelineContainerStyles.circle,
            active && {backgroundColor: '#F4C130'},
          ]}
        />
      </View>
    </View>
  );
});

const TimelineContainerStyles = StyleSheet.create({
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
  circle: {
    marginLeft: 5,
    borderRadius: 100,

    borderWidth: 3,
    borderColor: '#F4C130',

    width: 20,
    height: 20,
  },
});

export default (TimelineContainer);
