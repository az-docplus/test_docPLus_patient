/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import RadialGradientBackground from '../../../components/molecules/GradientBackground/RadialGradientBackground';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import LinearGradientBackground from '../../../components/molecules/GradientBackground/LinearGradientBackground';
import VitalIllustrations from '../../../assets/svg/vitalIllustrations.svg';
import SideBar from '../../../assets/svg/sideBar.svg';
import DmzButton from '../../../components/atoms/SwitchButton/SwitchButton';
import {ScrollView} from 'react-native-gesture-handler';

export default function CategoriesScreen(props) {
  const categories = ['Vitals', 'Surgeries', 'Medications'];
  const width = Dimensions.get('screen').width;
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <LinearGradientBackground
        style={{flex: 1, opacity: 1, zIndex: 1}}
        colors={['#fff', '#fff', 'rgba(2, 126, 151, 0.1)']}>
        <View
          radius={20}
          style={{
            borderBottomLeftRadius: 80,
            borderBottomRightRadius: 80,
            height: '45%',
            overflow: 'hidden',
            zIndex: 2,
          }}>
          <RadialGradientBackground />
        </View>
        <View style={{position: 'absolute', zIndex: 10, width: width, flex: 1}}>
          <TopNavBar
            style={{
              Container: {
                height: 50,
                marginTop: 10,
              },
            }}
          />
          <DmzText text="Categories" style={styles.header} />
          <SideBar
            style={{
              marginTop: '60%',
              position: 'absolute',
              zIndex: 10,
              width: width,
            }}
          />

          <ScrollView style={{flex: 1, zIndex: 5}} horizontal pagingEnabled>
            {categories.map((u, i) => {
              return (
                <View key={i} style={{width}}>
                  <VitalIllustrations
                    style={{alignSelf: 'center', marginTop: 35}}
                  />

                  <Text style={styles.subHeader}>{u}</Text>
                  <Text style={styles.subHeader2}>
                    Each criteria can be edited and modified.
                  </Text>
                  <DmzButton
                    text="View"
                    style={{
                      Container: {
                        width: '40%',
                        alignSelf: 'center',
                        backgroundColor: '#FF7A59',
                        borderRadius: 30,
                        marginVertical: 30,
                      },
                      Text: {
                        fontSize: 16,
                        color: '#fff',
                      },
                    }}
                  />
                  <DmzButton
                    text="ADD CATEGORY           +"
                    style={{
                      Container: {
                        width: '60%',
                        alignSelf: 'center',
                        backgroundColor: '#71B4CD',
                        borderRadius: 30,
                        marginVertical: 'auto',
                      },
                      Text: {
                        fontSize: 16,
                        color: '#fff',
                      },
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
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
    marginTop: 15,
  },
  subHeader: {
    fontSize: 18,
    color: '#007E96',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    marginTop: 40,
  },
  subHeader2: {
    fontSize: 16,
    color: '#007E96',
    textAlign: 'center',
    marginHorizontal: 50,
    marginTop: 10,
  },
});
