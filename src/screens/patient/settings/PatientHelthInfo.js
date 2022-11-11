import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import DmzHeader from '../../../components/organisms/DmzHeader/DmzHeader';
import Container from '../../../components/organisms/Container/Container';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import SubSupScriptText from '../../../components/atoms/SubSupScriptText/SubSupScriptText';
import CardInRow from '../../../components/molecules/CardInRow/CardInRow';
import Card from '../../../components/atoms/Card/Card';

const PatientHelthInfo = (props) => {

  const {bloodPressure,temperature,respiration,oxygen,heartRate} = props

  return (
    <>
      <View style={Styles.ChartContainer}>
        <View style={Styles.ChartLegend}>
          <DmzText text={'Heart Rate'} style={{fontSize: 18, color: '#fff'}} />
          <DmzText text={'180'} style={{fontSize: 18, color: '#2FCAAF'}}>
            <SubSupScriptText
              text="bmp"
              type="sub"
              style={{fontSize: 12, color: '#2FCAAF'}}
            />
          </DmzText>
        </View>
        <LineChart
          withShadow={false}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          withInnerLines={false}
          withOuterLines={false}
          data={{
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width + 50}
          height={180}
          chartConfig={{
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255,255,255,0.7)`,
            backgroundGradientFrom: '#025EC3',
            backgroundGradientTo: '#025EC3',
            strokeWidth: 2,
          }}
          withDots={false}
          style={{marginTop: 10, backgroundColor: '#fff', marginLeft: -50}}
          bezier
        />
      </View>
      <CardInRow style={{marginTop: 10, paddingLeft: 20}}>
        <Card>
          <DmzText
            text="Blood Pressure"
            style={{fontWeight: 'bold', color: '#999', fontSize: 18}}
          />
          <DmzText
            text={`${bloodPressure}/89`}
            style={{fontWeight: 'bold', color: '#025EC3', fontSize: 18}}>
            <SubSupScriptText
              text="mm/Hg"
              type="sub"
              style={{fontSize: 14, color: '#aaa'}}
            />
          </DmzText>
        </Card>
        <Card>
          <DmzText
            text="Temperature"
            style={{fontWeight: 'bold', color: '#999', fontSize: 18}}
          />
          <DmzText
            text={temperature}
            style={{fontWeight: 'bold', color: '#025EC3', fontSize: 18}}>
            <SubSupScriptText
              text="o"
              style={{fontSize: 14, color: '#025EC3', fontWeight: '400'}}
            />
            <DmzText
              text="F"
              style={{fontWeight: 'bold', color: '#025EC3', fontSize: 18}}
            />
          </DmzText>
        </Card>
      </CardInRow>
      <CardInRow style={{paddingLeft: 20}}>
        <Card>
          <DmzText
            text="Respiration"
            style={{fontWeight: 'bold', color: '#999', fontSize: 18}}
          />
          <DmzText
            text={respiration}
            style={{fontWeight: 'bold', color: '#025EC3', fontSize: 18}}>
            <SubSupScriptText
              text="rpm"
              type="sub"
              style={{fontSize: 14, color: '#aaa'}}
            />
          </DmzText>
        </Card>
        <Card>
          <DmzText
            text="Oxygen Sat."
            style={{fontWeight: 'bold', color: '#999', fontSize: 18}}
          />
          <DmzText
            text={oxygen}
            style={{fontWeight: 'bold', color: '#2FCAAF', fontSize: 18}}>
            <SubSupScriptText
              text="o"
              style={{fontSize: 14, color: '#2FCAAF', fontWeight: '400'}}
            />
          </DmzText>
        </Card>
      </CardInRow>
    </>
  );
};

const Styles = StyleSheet.create({
  ChartContainer: {
    backgroundColor: '#025EC3',
    padding: 5,
    marginTop: 40,
  },
  ChartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default PatientHelthInfo;
