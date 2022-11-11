import React from 'react';
import { View, Text, Image } from 'react-native';
import CustomTextComponent from '../../../components/CustomTextComponent';
import { Colors } from '../../../utils/Colors';
import { Rating, AirbnbRating } from 'react-native-ratings';
import PicturelessAvatar from '../../../components/atoms/PicturelessAvatar/PicturelessAvatar';
import moment from 'moment';
export const PatientReviewsTitleComponent = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 22,
        marginBottom: 8,
      }}>
      <CustomTextComponent
        text={'Patient Reviews'}
        fs={14}
        fw={'700'}
        textColor={Colors.BLACK90}
      />
      {/* <View
        style={{
          width: 24,
          height: 24,
          backgroundColor: Colors.GREEN,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: '#fff', fontSize: 20 }}>+</Text>
      </View> */}
    </View>
  );
};

export const PatientReviewCardComponent = ({
  rating,
  patientid,
  createdAt,
  note,
}) => {
  return (
    <View
      style={{ borderBottomColor: '#eee', borderBottomWidth: 1, padding: 24 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginBottom: 12,
        }}>
        {patientid?.picture ? (
          <Image
            source={{
              uri: `${Host}${patientid?.picture
                .replace('public', '')
                .replace('\\\\', '/')}`,
            }}
            style={{ width: 70, height: 70, borderRadius: 100 }}
          />
        ) : (
          <PicturelessAvatar
            style={{
              color: '#000',
              backgroundColor: '#f9f9f9',
              height: 70,
              width: 70,
              borderRadius: 35,
            }}
            textStyle={{ fontSize: 32 }}
            text={`${patientid?.firstName[0]}${patientid?.lastName[0]}`}
          />
        )}
        <View style={{ marginLeft: 10, width: '76%' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <CustomTextComponent
              text={patientid?.basic?.name}
              fs={17}
              fw={'700'}
              textColor={'#000'}
            />
            <CustomTextComponent
              text={moment(createdAt).format("DD MMM 'YY")}
              fs={12}
              fw={'600'}
              textColor={Colors.BLUE2}
            />
          </View>
          <View style={{ height: 4 }} />
          {/* <CustomTextComponent
            text={'Visited for Pain'}
            fs={13}
            fw={'600'}
            textColor={'#000'}
          /> */}
          <View style={{ alignItems: 'flex-start', marginTop: -48 }}>
            <AirbnbRating
              count={5}
              defaultRating={rating}
              isDisabled={true}
              size={16}
            />
          </View>
        </View>
      </View>
      <CustomTextComponent
        text={note}
        fs={12}
        fw={'700'}
        textColor={'#000'}
        lineHeight={17}
      />
    </View>
  );
};
