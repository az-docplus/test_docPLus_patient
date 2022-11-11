import React from 'react';
import {LineChart, YAxis, Grid, XAxis} from 'react-native-svg-charts';
import {View} from 'react-native';
import {TERTIARY_TEXT, PRIMARY_COLOR} from '../../../styles/colors';

export default function Graph({data, hasAxis = true}) {
  const contentInset = {top: 10, bottom: 10};
  return (
    <View style={{height: 120, flexDirection: 'row', width: '100%'}}>
      {hasAxis ? (
        <YAxis
          data={data[0].value != undefined ? [50, 200] : data}
          contentInset={contentInset}
          style={{marginLeft: 10}}
          svg={{
            fill: '#a3a3a3',
            fontSize: 10,
          }}
          numberOfTicks={10}
        />
      ) : null}

      <LineChart
        animate={true}
        animationDuration={2000}
        style={{
          flex: 1,
          paddingHorizontal: 10,
          zIndex: 1,
          width: 150,
          marginLeft: hasAxis ? 0 : 15,
        }}
        data={data}
        svg={{stroke: '#077EE9', strokeWidth: 3}}
        contentInset={contentInset}>
        {/* <CustomGrid belowChart={true} /> */}
        <Grid
          svg={{
            stroke: '#000',
            strokeOpacity: 0.08,
            strokeWidth: 1,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
      </LineChart>
    </View>
  );
}
