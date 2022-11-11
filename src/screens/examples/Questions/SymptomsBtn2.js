/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';

export default function SymptomsBtn2(props) {
  const [selectedSymptom, setSymptom] = useState('');
  const symptoms = [
    'Constipation',
    ' Blood in Stool  ',
    'Diarrhea',
    '           Abdominal pain/Discomfort             ',
  ];
  const symptoms2 = [];

  const pressbtn = (val) => {
    setSymptom(val);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          marginHorizontal: 20,
        }}>
        {symptoms.map((u, i) => {
          return (
            <DmzButton
              onPress={() => {
                props.onPress(u);
                setSymptom(u);
              }}
              style={{
                Text: {
                  fontSize: 16,
                  color: selectedSymptom == u ? '#fff' : '#027E97',
                  textAlign: 'center',
                  paddingHorizontal: '5%',
                },
                Container: [
                  styles.btnStyle,
                  {
                    marginTop: 20,
                    backgroundColor: selectedSymptom == u ? '#FF7A59' : '#fff',
                    width: 'auto',
                    marginHorizontal: 15,
                    // paddingHorizontal: 20,
                  },
                ],
              }}
              text={u}
            />
          );
        })}
      </View>
      <View
        style={{
          justifyContent: 'flex-start',
        }}>
        {symptoms2.map((u, i) => {
          return (
            <DmzButton
              style={{
                Text: {
                  width: '100%',
                  fontSize: 16,
                  color: selectedSymptom == u ? '#fff' : '#027E97',
                  textAlign: 'center',
                },
                Container: [
                  styles.btnStyle,
                  {
                    marginTop: 20,
                    backgroundColor: selectedSymptom == u ? '#FF7A59' : '#fff',
                    width: '80%',
                    paddingHorizontal: 10,
                  },
                ],
              }}
              text={u}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    alignSelf: 'center',
    borderRadius: 15,
    height: 39,
    elevation: 10,
    justifyContent: 'center',
  },
  nextBtn: {
    width: 42,
    height: 42,
    backgroundColor: '#027E97',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
    marginLeft: 'auto',
    marginRight: '10%',
    elevation: 10,
  },
});
