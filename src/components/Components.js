import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import { Colors } from '../utils/Colors';
import { windowWidth } from '../utils/utils';
import CustomTextComponent from './CustomTextComponent';
import Favorites from './atoms2/doctor/favorites';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Local } from '../i18n';
import { SliderBox } from 'react-native-image-slider-box';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
const images = [require('../assets/images/doc.jpg')];
export const BuildIntroductionComponent = ({
  image,
  isOnline,
  name,
  info,
  location,
  time,
  setLoading,
  _id,
  doctor,
  imageLength,
  imageExceed,
}) => {
  const [index, setIndex] = useState(0);
  const [activeHeart, setActiveHeart] = useState(false);
  const changeIndex = (e) => {
    setIndex(e);
  };

  console.log(index.index, '==============index');

  return (
    <View style={styles.container}>
      {/* <View>
        {image}
        <Card style={styles.activeGreenBtn} />
      </View>
      <View
        style={{
          flexDirection: 'column',
          width: windowWidth - 162,
          marginLeft: 16,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomTextComponent
              text={name}
              fs={18}
              fw={'600'}
              textColor={Colors.BLACK}
            />
            <View style={{ width: 8 }} />
            <Favorites setLoading={setLoading} doctor={_id} />
          </View>
          <Image
            source={require('../../assets/share.png')}
            style={{ width: 22, height: 22 }}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <CustomTextComponent
            text={info}
            fs={14}
            fw={'300'}
            textColor={Colors.gray}
          />
          <Image
            source={require('../../assets/exclaimation.png')}
            style={{ width: 18, height: 18, tintColor: '#dcdcdc' }}
          />
        </View>
        <View style={{ height: 4 }} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 6,
          }}>
          <Image
            source={require('../../assets/location.png')}
            style={{
              width: 20,
              height: 20,
              tintColor: '#51B7B7',
              marginRight: 4,
              marginLeft: -4,
            }}
          />
          <CustomTextComponent
            text={`Location: ${location}`}
            fs={13}
            fw={'300'}
            textColor={Colors.BLACK}
          />
        </View>

        {time && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 6,
            }}>
            <Image
              source={require('../../assets/clock.png')}
              style={{
                width: 13,
                height: 13,
                tintColor: '#51B7B7',
                marginRight: 8,
              }}
            />
            <CustomTextComponent
              text={'Available Time: '}
              fs={13}
              fw={'300'}
              textColor={Colors.BLACK}
            />
            <CustomTextComponent
              text={time}
              fs={13}
              fw={'300'}
              textColor={'#51B7B7'}
            />
          </View>
        )}
      </View> */}

      <View
        style={{
          position: 'relative',
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <View style={{flex:1}}>
        </View> */}
        <SwiperFlatList
          index={0}
          data={image}
          onChangeIndex={(index) => changeIndex(index)}
          renderItem={({ item }) => <View style={{}}>{item}</View>}
        />
        {imageExceed ? (
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              right: 20,
              backgroundColor: 'rgba(0,0,0,0.4)',
              paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Gilroy-Bold',
                fontSize: 14,
              }}>
              {index.index === undefined ? '0' : index.index + 1} /{' '}
              {imageLength}
            </Text>
          </View>
        ) : (
          <></>
        )}
        <TouchableOpacity
          onPress={() => setActiveHeart(!activeHeart)}
          style={{
            position: 'absolute',
            paddingTop: 3,
            width: 40,
            height: 40,
            backgroundColor: 'whitesmoke',
            borderRadius: 20,
            top: 10,
            right: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Favorites setLoading={() => {}} doctor={doctor} />
        </TouchableOpacity>
        {/* <View> */}
        {/* {imageLength && (
          <View
            style={{
              width: 70,
              paddingVertical: 5,
              height: 30,
              backgroundColor: 'rgba(0,0,0,0.4)',
              borderRadius: 5,
              position: 'absolute',
              bottom: 20,
              right: '-40%',
              // elevation: 4,
              shadowColor: '#999',
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-Bold',
                color: '#FFFFFF',
                textAlign: 'center',
                fontSize: 18,
              }}>
              {imageLength}
            </Text>
          </View>
        )} */}
        {/* </View> */}
        {/* <Card style={styles.activeGreenBtn} /> */}
      </View>
    </View>
  );
};

export const BuildPersonalInfoComponent = ({
  text1,
  image1,
  text2,
  image2,
  text3,
  image3,
}) => {
  return (
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <PersonalInfoCardComponent
        image={image1}
        text={text1}
        title={`${Local('doctor.V2.DoctorProfileScreen.Card.Titile.patients')}`}
      />

      <PersonalInfoCardComponent
        image={image2}
        text={text2}
        title={`${Local(
          'doctor.V2.DoctorProfileScreen.Card.Titile.experience',
        )}`}
      />
      {text3 && (
        <PersonalInfoCardComponent
          image={image3}
          text={text3}
          title={`${Local('doctor.V2.DoctorProfileScreen.Card.Titile.rating')}`}
        />
      )}
    </View>
  );
};

export const PersonalInfoCardComponent = ({ title, text, image }) => {
  return (
    <Card
      style={{
        // flexDirection: 'column',
        elevation: 20,
        shadowColor: 'silver',
        height: 75,
        paddingHorizontal: 10,
        paddingTop: 11,
        width: windowWidth / 2 - 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginHorizontal: 12,
        marginTop: 10,
      }}>
      <CustomTextComponent
        text={title}
        fs={14}
        ff={'Gilroy-Medium'}
        textColor={'#7B7A79'}
        textAign={'center'}
      />
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        <Image
          source={image}
          style={{
            width: 20,
            height: 20,
            marginRight: 6,
            tintColor: Colors.BLUE2,
            resizeMode: 'contain',
          }}
        />
        <CustomTextComponent
          text={text}
          fs={16}
          ff={'Gilroy-Bold'}
          textColor={'#000000'}
        />
      </View>
    </Card>
  );
};

export const BuildIntoCardComponent = ({ name, info}) => {
  return (
    <View style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 10 }}>
      <View></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Gilroy-SemiBold',
              color: '#000000',
              marginBottom: 6,
            }}>
            {name}
          </Text>
          <Text
            style={{
              color: '#297281',
              fontSize: 16,
              fontFamily: 'Gilroy-Medium',
            }}>
            {info}
          </Text>
        </View>

        {/* <TouchableOpacity>
          <Card style={{ padding: 5, borderRadius: 50 }}>
            <Image
              source={require('../../src/assets/icons/message.png')}
              style={{ height: 45, width: 45, resizeMode: 'contain' }}
            />
          </Card>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export const BuildTabCardComponent = ({
  showTab,
  onPress,
  text,
  selectedVal,
}) => {
  return (
    <Card
      style={{
        elevation: showTab === selectedVal ? 5 : 0,
        shadowColor: '#999',
        paddingHorizontal: 20,
        paddingVertical: 12,
      }}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
        onPress={() => onPress()}>
        <CustomTextComponent
          text={text}
          fs={14}
          fw={'300'}
          textColor={Colors.BLUE}
        />
        <View style={{ marginRight: 20 }} />
        <Image
          source={require('../../assets/arrow-down.png')}
          style={{ width: 15, height: 15, tintColor: Colors.BLUE }}
        />
      </TouchableOpacity>
    </Card>
  );
};

export const BuildTimeSlotsComponent = ({
  text1,
  text2,
  selectedVal,
  onPress,
  showTimeTab,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 8,
        borderBottomWidth: showTimeTab === selectedVal ? 3 : 0,
        borderBottomColor: Colors.BLUE,
        paddingBottom: 4,
      }}
      onPress={() => onPress()}>
      <CustomTextComponent
        text={text1}
        fs={12.5}
        fw={'600'}
        textColor={'black'}
      />
      <View style={{ marginRight: 6 }} />
      <CustomTextComponent
        text={text2}
        fs={12.5}
        fw={'600'}
        textColor={Colors.BLUE}
      />
    </TouchableOpacity>
  );
};

export const BuildSlotsTabComponent = ({ text, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      style={{
        width: '30%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSelected ? Colors.BLUE2 : Colors.WHITE,
        borderRadius: 12,
        elevation: 6,
        shadowColor: '#999',
      }}
      onPress={() => onPress()}>
      <CustomTextComponent
        text={text}
        fs={16}
        fw={'normal'}
        textColor={isSelected ? 'white' : Colors.LIGHTGRAY}
      />
    </TouchableOpacity>
  );
};

export const OverviewTabBlock = ({
  active,
  text,
  onPress,
  selectedVal,
  showTab,
  image,
  width,
}) => {
  width = active ? width + 3 : width - 1;
  return (
    <Card
      style={{
        elevation: selectedVal === showTab ? 3 : 0,
        shadowColor: '#eee',
        width: width.toString() + '%',
        paddingVertical: 11,
        borderRadius: 4,
        backgroundColor: selectedVal === showTab ? '#fff' : '#f7f8f9',
      }}>
      <TouchableOpacity
        style={{ alignItems: 'center' }}
        onPress={() => onPress()}>
        {selectedVal === showTab ? (
          <CustomTextComponent
            text={text}
            fs={14}
            ff={'Gilroy-Medium'}
            textAign="center"
            textColor={selectedVal === showTab ? '#EA1A65' : 'black'}
          />
        ) : (
          <Image
            source={image}
            style={{ width: 21, height: 21, tintColor: Colors.BLUE }}
          />
        )}
        {/* <View style={{ marginRight: 20 }} /> */}
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // marginVertical: 20,
    // paddingHorizontal: 16,
    // borderRadius: 8,
    // justifyContent: 'space-between',
    // width: windowWidth - 32,
    // backgroundColor: 'white',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  activeGreenBtn: {
    width: 70,
    paddingVertical: 5,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
    right:-200,
    // elevation: 4,
    shadowColor: '#999',
  },
  button_bookAppointment: {
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    elevation: 12,
    borderRadius: 30,
    backgroundColor: '#3893e4',
    paddingHorizontal: 32,
    paddingVertical: 18,
  },
});
