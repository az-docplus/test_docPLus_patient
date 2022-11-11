import React from 'react';
import {View, StyleSheet, useWindowDimensions, Text, Image} from 'react-native';
import Card from '../Card/card.component';
import RoundedImageHolder from '../RoundedImageHolder/roundedImageHolder.component';
import CustomButton from '../CustomButton/CustomButton.component';
const images = [
  require('../../assets/jpg/person1.jpg'),
  require('../../assets/jpg/person2.jpg'),
  require('../../assets/jpg/person3.jpg'),
  require('../../assets/jpg/person4.jpg'),
  require('../../assets/jpg/person5.jpg'),
];

function Content({onPressSend}) {
  const dimen = useWindowDimensions();
  return (
    <View style={[ContentStyles.Container]}>
      <View style={ContentStyles.ChooseCard}>
        <Text style={ContentStyles.ChooseCardHeaderText}>Choose Card</Text>
        <View style={ContentStyles.ChooseCardCardContainer}>
          <Card
            style={{backgroundColor: '#E55F92'}}
            headercomponent="switch"
            balance="$8,567"
          />
          <Card
            headercomponent="visa"
            style={{
              SecondaryText: {
                color: '#444',
              },
              PrimaryText: {
                color: '#000',
              },
            }}
            balance="$4,131"
          />
        </View>
      </View>
      <View style={ContentStyles.Favorites}>
        <Text style={ContentStyles.FavoritesHeaderText}>Favorites</Text>
        <View style={ContentStyles.FavoritesImageContainer}>
          {images.map((sourceUrl, index) => (
            <RoundedImageHolder
              key={index}
              index={index}
              sourceUrl={sourceUrl}
            />
          ))}
          <RoundedImageHolder
            sourceUrl={require('../../assets/png/add-icon.png')}
            index={images.length}
            style={{
              ImageWrapper: {
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#6E21D1',
                borderStyle: 'dashed',
                borderWidth: 2,
                height: 45,
                width: 45,
              },
              Image: {
                height: '30%',
                width: '30%',
              },
            }}
          />
        </View>
      </View>
      <View
        style={[
          ContentStyles.UserSelection,
          {width: dimen.width, height: dimen.height * 0.3},
        ]}>
        <View style={ContentStyles.Credentials}>
          <View style={ContentStyles.CredentialsInfo}>
            <Text style={ContentStyles.CredentialsInfoSecondaryText}>
              Selected
            </Text>
            <Text style={ContentStyles.CredentialsInfoPrimaryText}>
              Bella Campbell
            </Text>
          </View>
          <RoundedImageHolder
            sourceUrl={require('../../assets/jpg/person1.jpg')}
            index={0}
            style={{
              ImageWrapper: {
                height: 60,
                width: 60,
              },
            }}
          />
        </View>
        <View style={ContentStyles.ActionButtonContainer}>
          <CustomButton
            title="$589"
            style={{
              Container: {
                paddingLeft: 50,
                paddingRight: 50,
                paddingTop: 30,
                paddingBottom: 30,
              },
            }}
          />
          <CustomButton
            title="Send"
            style={{
              Container: {
                paddingLeft: 50,
                paddingRight: 50,
                paddingTop: 30,
                paddingBottom: 30,
                backgroundColor: '#E55F92',
                elevation: 4,
              },
              Text: {
                color: '#eee',
              },
            }}
            onPress={onPressSend}
          />
        </View>
      </View>
    </View>
  );
}

const ContentStyles = StyleSheet.create({
  Container: {
    // position: 'absolute',
    width: '100%',
    backgroundColor: '#fff',
    // bottom: 0,
    borderRadius: 38,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    transform: [
      {
        translateY: -70,
      },
    ],
  },
  ChooseCard: {
    marginBottom: 15,
    marginTop: 30,
    marginLeft: 25,
  },
  ChooseCardHeaderText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  ChooseCardCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginRight: 25,
  },
  Favorites: {
    margin: 15,
    marginLeft: 25,
  },
  FavoritesHeaderText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  FavoritesImageContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  FavoritesImageWrapper: {
    height: 50,
    width: 50,
    borderRadius: 50,
    overflow: 'hidden',
    borderColor: '#fff',
    borderWidth: 3,
  },
  UserSelection: {
    height: 100,
    backgroundColor: '#eee',
    // position: 'absolute',
    // bottom: 0,
    borderRadius: 50,
    padding: 30,
    justifyContent: 'space-between',
  },
  Credentials: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CredentialsInfo: {
    justifyContent: 'space-between',
  },
  CredentialsInfoSecondaryText: {
    color: '#0f0f0f',
    fontSize: 15,
  },
  CredentialsInfoPrimaryText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  ActionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
export default Content;
