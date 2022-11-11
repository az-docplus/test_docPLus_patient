import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {
  NEW_HEADER_TEXT,
  GREY_OUTLINE,
  SECONDARY_COLOR,
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TextInputIcon from '../../../components/atoms/TextInputCustom/TextInputIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TextInputIconMask from '../../../components/atoms/TextInputCustom/TextInputMask';

const NewCard = ({params, navigation}) => {
  const onPress = () => {};
  const [cardDetails, setCardDetails] = useState({
    cardNo: '',
    name: '',
    valid: '',
    cvv: '',
    save: false,
  });

  return (
    <View style={styles.Container}>
      <TopNavBar
        hideRightComp
        headerText="Add Card"
        navigation={navigation}
        style={{
          Container: {
            height: 'auto',
            marginTop: 5,
          },
        }}
      />
      <ScrollView style={styles.body}>
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.text2}>Add Details</Text>

          <TextInputIconMask
            maskProps={{
              type: 'custom',
              options: {mask: '9999 - 9999 - 9999 - 9999'},
            }}
            value={cardDetails.cardNo}
            placeholder="XXXX - XXXX - XXXX - XXXX"
            placeholderTextColor={INPUT_PLACEHOLDER}
            textStyle={styles.text1}
            inputHandler={(text) =>
              setCardDetails({
                ...cardDetails,
                cardNo: text,
              })
            }
            style={[styles.input, {width: 300}]}
            keyboardType="number-pad"
            maxLength={25}
            validationCallback={() => cardDetails.cardNo.length === 25}
          />

          <TextInputIcon
            value={cardDetails.name}
            placeholder="Name on Card"
            placeholderTextColor={INPUT_PLACEHOLDER}
            textStyle={styles.text1}
            inputHandler={(text) =>
              setCardDetails({...cardDetails, name: text})
            }
            style={[styles.input, {width: 300}]}
            validationCallback={() => cardDetails.name.length > 0}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <TextInputIconMask
              maskProps={{type: 'datetime', options: {mask: 'MM/YY'}}}
              value={cardDetails.valid}
              placeholder="Valid Thru (MM/YY)"
              placeholderTextColor={INPUT_PLACEHOLDER}
              textStyle={styles.text1}
              inputHandler={(text) =>
                setCardDetails({...cardDetails, valid: text})
              }
              style={[styles.input, {width: 180}]}
              keyboardType="number-pad"
              maxLength={5}
              validationCallback={() => cardDetails.valid.length === 5}
            />

            <TextInputIcon
              value={cardDetails.cvv}
              placeholder="CVV"
              placeholderTextColor={INPUT_PLACEHOLDER}
              textStyle={styles.text1}
              inputHandler={(text) =>
                setCardDetails({...cardDetails, cvv: text})
              }
              style={[styles.input, {width: 100}]}
              keyboardType="number-pad"
              maxLength={3}
              validationCallback={() => cardDetails.cvv.length === 3}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <TouchableOpacity
              onPress={() =>
                setCardDetails({...cardDetails, save: !cardDetails.save})
              }>
              <View
                style={{
                  height: 16,
                  width: 16,
                  marginRight: 10,
                  backgroundColor: '#82cb74',
                  borderRadius: 3,
                }}>
                <FontAwesome
                  name="check"
                  size={15}
                  color={cardDetails.save ? '#82cb74' : 'white'}
                />
              </View>
            </TouchableOpacity>
            <Text style={[styles.text1, {fontSize: 13}]}>
              Securely save card details
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../../assets/icons/amex-grey.png')}
              style={{height: 20, width: 40}}
              resizeMode="contain"
            />
            <Image
              source={require('../../../assets/icons/mastercard-grey.png')}
              style={{height: 20, width: 40}}
              resizeMode="contain"
            />
            <Image
              source={require('../../../assets/icons/visa-grey.png')}
              style={{height: 20, width: 40}}
              resizeMode="contain"
            />
          </View>
        </View>
        <DmzButton
          onPress={onPress}
          style={{
            Text: {
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            },
            Container: {
              width: 250,
              height: 46,
              borderRadius: 25,
              backgroundColor: SECONDARY_COLOR,
              alignSelf: 'center',
              marginVertical: 20,
              elevation: 3,
              marginTop: 40,
            },
          }}
          text="CONFIRM PAYMENT"
        />
      </ScrollView>
    </View>
  );
};

export default NewCard;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
  },
  text1: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  text2: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: NEW_PRIMARY_BACKGROUND,
    marginBottom: 25,
  },
});
