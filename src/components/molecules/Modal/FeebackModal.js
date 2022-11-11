import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import BlurModal from './BlurModal';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import { Rating } from 'react-native-elements'
import {Local, setLocale} from '../../../i18n';
import {Colors} from '../../../styles/colorsV2';
import { useDispatch, useSelector } from 'react-redux';

const FeedbackModal = ({
  onCancel,
  visible,
  onUpdate,
  setVisible = () => {}
}) => {
  const { userData, theme } = useSelector((state) => state.AuthReducer);
  const [state, setstate] = useState({
    note: '',
    rating: 4,
    waitTimeRating: 4,
    bedSideRating: 4
  })

  return (
    <BlurModal {...{ visible, onCancel, setVisible }}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          color: Colors.primary_text_color[theme],
          fontSize: 20,
          marginBottom: 20,
        }}>
        {`${Local("patient.doc_profile.exp_question")}`}
      </Text>

      {/* <View style={{ marginVertical: 12 }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: 20,
            color: Colors.primary_text_color[theme],
            textAlign: 'center',
            marginBottom: 20,
          }}>
          {'Wait Time rating : '}
        </Text>
        <Rating
          // showRating
          //startingValue={state.waitTimeRating}
          onFinishRating={(waitTimeRating) => setstate({ ...state, waitTimeRating: waitTimeRating })}
        />
      </View>

      <View style={{ marginVertical: 12 }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: 20,
            color: Colors.primary_text_color[theme],
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          {'Bedside rating : '}
        </Text>
        <Rating
          // showRating
          //startingValue={state.bedSideRating}
          onFinishRating={(data) => setstate({ ...state, bedSideRating: data })}
        />
      </View> */}

      {<View style={{ 
        // marginVertical: 12,
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: 20,
            color: Colors.primary_text_color[theme],
            textAlign: 'center',
            // marginBottom: 20,
          }}>
          {/* {'Overall rating : '} */}
        </Text>
        <Rating
          showRating={false}
          startingValue={state.rating}
          onFinishRating={(data) => setstate({ ...state, rating: data })}
        />
      </View>}

      {/* <Text
        
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 13,
          color: Colors.input_placeholder_color[theme],
          alignSelf: 'flex-start',
          marginTop: 20
        }}>
        {'Review'}
      </Text> */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: NEW_PRIMARY_BACKGROUND,
          borderBottomWidth: 1.5,
          marginBottom: 30,
        }}>
        <TextInput
          placeholder={`${Local("patient.doc_profile.tell_us_liked")}`}
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 20,
            color: Colors.primary_text_color[theme],
            padding: 4,
            flex: 1,
          }}
          multiline
          numberOfLines={2}
          value={state.note}
          onChangeText={(text) => setstate({ ...state, note: text })}
        />
      </View>

      <DmzButton
        disabled={
          state.note === ''
        }
        onPress={() => {
          onUpdate(state);
        }}
        style={{
          Text: {
            width: '100%',
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Montserrat-SemiBold',
          },
          Container: {
            width: '100%',
            height: 46,
            borderRadius: 25,
            backgroundColor: SECONDARY_COLOR,
            alignSelf: 'center',
            elevation: 3,
          },
        }}
        text="SUBMIT"
      />
    </BlurModal>
  );
};

export default FeedbackModal;
