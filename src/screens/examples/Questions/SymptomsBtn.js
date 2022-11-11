/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';

export default function SymptomsBtn(props) {
  const [selectedSymptom, setSymptom] = useState('');
  const symptoms = ['Cough', 'Palpitation', 'Wheezing', 'Shortness of breath'];
  const symptoms2 = [
    'Decreased excersice tolerance    ',
    'Productive cough/Phlem/Sputum    ',
  ];

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          marginLeft: 20,
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
                  width: 'auto',
                },
                Container: [
                  styles.btnStyle,
                  {
                    marginTop: 20,
                    backgroundColor: selectedSymptom == u ? '#FF7A59' : '#fff',
                    width: 'auto',
                    marginHorizontal: 15,
                    paddingHorizontal: 10,
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
              onPress={() => {
                props.onPress(u);
                setSymptom(u);
              }}
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
