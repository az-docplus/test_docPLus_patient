/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import RadialGradientBackground from '../../../components/molecules/GradientBackground/RadialGradientBackground';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import LinearGradientBackground from '../../../components/molecules/GradientBackground/LinearGradientBackground';
import VitalIllustrations from '../../../assets/svg/vitalIllustrations.svg';
import Divider from '../../../assets/svg/divider.svg';
import DmzButton from '../../../components/atoms/SwitchButton/SwitchButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function CategoriesScreen(props) {
  const width = Dimensions.get('screen').width;
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <LinearGradientBackground
        style={{flex: 1, opacity: 1, zIndex: 1}}
        colors={['#fff', '#fff', 'rgba(2, 126, 151, 0.1)']}>
        <View
          radius={20}
          col
          style={{
            borderBottomLeftRadius: 200,
            borderBottomRightRadius: 200,
            height: '40%',
            width: '150%',
            alignSelf: 'center',
            overflow: 'hidden',
            zIndex: 2,
          }}>
          <RadialGradientBackground />
        </View>
        <View style={{position: 'absolute', zIndex: 10, width}}>
          <TopNavBar
            style={{
              Container: {
                height: 50,
                marginTop: 5,
              },
            }}
          />
          <DmzText text="Categories" style={styles.header} />
          <VitalIllustrations
            style={{
              alignSelf: 'center',
              marginTop: 10,
              transform: [{scale: 1}],
            }}
          />
          <View
            style={{
              marginHorizontal: '15%',
              alignSelf: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[styles.subHeader, {width: '85%', textAlign: 'left'}]}>
                Vitals
              </Text>
              <Text
                style={[styles.subHeader, {fontSize: 14, color: '#FF7A59'}]}>
                Edit
              </Text>
            </View>
            <Text style={styles.subHeader2}>Category Name</Text>
            <Divider style={{marginTop: 30}} />
          </View>

          <TouchableOpacity
            onPress={() => {
              console.log('pressed');
            }}>
            <View
              style={{
                marginHorizontal: '15%',
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 30,
              }}>
              <Text
                style={[
                  styles.subHeader,
                  {width: '100%', textAlign: 'left', marginTop: 0},
                ]}>
                View Questions
              </Text>
              <AntDesign name={'right'} size={25} color="#ff7a59" />
            </View>
          </TouchableOpacity>
          <Divider style={{alignSelf: 'center'}} />

          <TouchableOpacity
            containerStyle={{
              alignSelf: 'center',
              marginVertical: 30,
              width: '80%',
            }}
            onPress={() => {
              console.log('pressed');
            }}>
            <Text
              style={[
                styles.subHeader,
                {
                  width: '100%',
                  textAlign: 'left',
                  color: '#FF7A59',
                },
              ]}>
              Delete Category
            </Text>
            <Text style={styles.subHeader2}>
              All content created will be deleted
            </Text>
          </TouchableOpacity>
          <DmzButton
            text="SUBMIT"
            style={{
              Container: {
                width: '40%',
                alignSelf: 'center',
                backgroundColor: '#FF7A59',
                borderRadius: 30,
              },
              Text: {
                fontSize: 16,
                color: '#fff',
              },
            }}
          />
        </View>
      </LinearGradientBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 38,
    lineHeight: 40,
    textAlign: 'center',
    width: '100%',
    color: '#007E96',
    marginTop: 5,
  },
  subHeader: {
    fontSize: 18,
    color: '#007E96',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeader2: {
    fontSize: 13,
    marginTop: 10,
    color: 'rgba(0, 0, 0, 0.25)',
  },
});
