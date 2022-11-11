import React, {Component, createRef, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  Keyboard,
  findNodeHandle,
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import TextInputIcon from '../../../components/atoms/TextInputCustom/TextInputIcon';
import {TERTIARY_TEXT, PRIMARY_COLOR} from '../../../styles/colors';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Easing} from 'react-native-reanimated';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
export default function PatientLocation(props) {
  const panelRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    panelRef.current.show();
  }, []);

  const getIcon = (i) => {
    if (i === 'Delhi NCR') {
      return (
        <Image
          style={{width: 70, height: 70}}
          source={require('../../../assets/png/delhi.png')}
        />
      );
    } else if (i === 'Mumbai') {
      return (
        <Image
          style={{width: 70, height: 70}}
          source={require('../../../assets/png/mumbai.png')}
        />
      );
    } else if (i === 'Hyderabad') {
      return (
        <Image
          style={{width: 70, height: 70}}
          source={require('../../../assets/png/hyderabad.png')}
        />
      );
    } else if (i === 'Bangalore') {
      return (
        <Image
          style={{width: 70, height: 70}}
          source={require('../../../assets/png/bangalore.png')}
        />
      );
    }
  };
  const popularCities = ['Mumbai', 'Delhi NCR', 'Bangalore', 'Hyderabad'];
  const [popularCitiesCopy, setPopCities] = useState(popularCities);
  const [search, setSearch] = useState('');

  const cities = [
    'Ahmedabad',
    'Chennai',
    'Kolkata',
    'Surat',
    'Pune',
    'Jaipur',
    'Visakhapatnam',
    'Nagpur',
    'Lucknow',
    'Kanpur',
    'Indore',
    'Ludhiana',
    'Agra',
    'Amritsar',
  ];
  const [citiesCopy, setCities] = useState(cities);

  const height = Dimensions.get('screen').height;

  const handleSearch = (val) => {
    console.log(val);
    if (val == '') {
      setSearch(val);
      setPopCities(popularCities);
      setCities(cities);
    } else {
      setSearch(val);
      var a1 = popularCities.filter((txt) => {
        console.log(txt.toUpperCase().search(val.toUpperCase()));
        return txt.toUpperCase().search(val.toUpperCase()) == -1 ? false : true;
      });
      var a2 = cities.filter((txt) => {
        return txt.toUpperCase().search(val.toUpperCase()) == -1 ? false : true;
      });
      console.log(a1, a2);
      setPopCities(a1);
      setCities(a2);
    }
  };

  const heightPanel = useRef(new Animated.Value(0)).current;

  Keyboard.addListener('keyboardDidShow', () => {
    Animated.timing(heightPanel, {
      toValue: 1,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  });
  Keyboard.addListener('keyboardDidHide', () => {
    Animated.timing(heightPanel, {
      toValue: 0,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  });
  const heightPanelVal = heightPanel.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.8, height * 0.6],
  });
  return (
    <SlidingUpPanel
      ref={panelRef}
      friction={0.5}
      containerStyle={styles.container}
      onBottomReached={props.closePanel}
      onDragEnd={(pos, gestureState) => {
        console.log(pos, gestureState.dy);
        if (gestureState.dy > 0) {
          panelRef.current.hide();
        }
      }}
      onMomentumDragEnd={(pos) => {
        console.log(pos);
        if (pos > 0) {
          panelRef.current.hide();
        }
      }}>
      {(dragHandler) => (
        <Animated.View
          style={[
            styles.innerContainer,
            {height: heightPanelVal, marginTop: 'auto'},
          ]}>
          <Animated.View
            ref={inputRef}
            key={1}
            {...dragHandler}
            style={{width: '100%'}}>
            <View style={styles.topBtn} />
            <DmzText text={'Select your city'} style={{fontSize: 23}} />
          </Animated.View>
          <TextInputIcon
            hasIcon={true}
            iconName="magnify"
            placeholder="Search for city, area, etc.."
            inputHandler={handleSearch}
            placeholderTextColor="rgba(0, 0, 0,0.30)"
            style={styles.inputStyle}
            textStyle={styles.textStyle}
            iconColor={TERTIARY_TEXT}
            size={20}
            iconStyle={{alignSelf: 'center'}}
          />
          <DmzText text="POPULAR CITY" style={styles.listHeader} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              height: 'auto',
            }}>
            {popularCitiesCopy.map((u, i) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.onPress(u);
                  }}>
                  {getIcon(u)}
                  <DmzButton
                    text={u}
                    style={{
                      Container: [
                        styles.cityBtnContainer,
                        {
                          width: (width * 0.9) / popularCities.length,
                          flexDirection: 'column',
                        },
                      ],
                      Text: [
                        styles.cityBtnText,
                        {
                          color: props.location === u ? PRIMARY_COLOR : null,
                          fontSize: 14,
                          fontWeight: props.location === u ? 'bold' : 'normal',
                          textAlign: 'center',
                        },
                      ],
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <DmzText text="Others" style={styles.listHeader} />
          <FlatList
            keyExtractor={(item, index) => {
              return index;
            }}
            data={citiesCopy}
            renderItem={({item}) => {
              return (
                <DmzButton
                  onPress={() => {
                    props.onPress(item);
                  }}
                  text={item}
                  style={{
                    Container: styles.cityBtnContainer,
                    Text: [
                      styles.cityBtnText,
                      {color: props.location === item ? PRIMARY_COLOR : null},
                    ],
                  }}
                />
              );
            }}
          />
        </Animated.View>
      )}
    </SlidingUpPanel>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    elevation: 5,
    zIndex: 2,
  },
  innerContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  topBtn: {
    backgroundColor: '#ccc',
    height: 5,
    width: 50,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  listHeader: {
    color: '#ccc',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 25,
    width: '95%',
    marginHorizontal: '2.5%',
    fontSize: 14,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  cityBtnContainer: {
    width: '95%',
    alignSelf: 'center',
    elevation: 0,
  },
  cityBtnText: {
    width: '100%',
    fontSize: 18,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 35,
  },
  textStyle: {
    paddingLeft: 20,
    color: TERTIARY_TEXT,
    fontSize: 16,
    fontWeight: '300',
    flex: 1,
    width: '100%',
  },
});
