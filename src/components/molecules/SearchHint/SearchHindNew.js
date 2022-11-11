import React, { memo, useRef, useEffect } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import Highlighter from 'react-native-highlight-words';
import MedsItem from './medItem';

export const SearchHint = memo(
  ({ data, topOffset, onSelect, name, setMedSelected }) => {
    const animationValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      console.log(data, 'dslklfkjdfl');
      Animated.spring(animationValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }, []);

    const translateX = animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 0],
    });
    const scaleX = animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    });
    const translateY = animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-40, 0],
    });

    const animatedVStyle = {
      top: topOffset,
      opacity: animationValue,
      transform: [
        {
          translateX,
        },
        {
          scaleX,
        },
        {
          translateY,
        },
      ],
    };
    /* useEffect(() => {
    console.log('rendering');
  }); */
    return (
      // <TouchableWithoutFeedback
      //     onPress={() => {setMedSelected(!medSelected)}}
      //     // style={customTouchableStyle}
      //     >
      <Animated.View
        pointerEvents={'auto'}
        style={[styles.hintContainer, animatedVStyle]}>
        {name == '' ? (
          <Text style={{ textAlign: 'center' }}>Start Typing</Text>
        ) : data.length == 0 ? (
          <Text style={{ textAlign: 'center' }}>
            No Matching Medicine Found
          </Text>
        ) : (
          <FlatList
            data={data}
            style={{
              flex: 1,
            }}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              /* return (
              <MedsItem item={item} onSelect={onSelect} name={name} />
            ) */
              return (
                <View>
                  <TouchableOpacity
                    style={[
                      styles.listItem,
                      {
                        // backgroundColor: '#E6F7F5',
                        padding: 10,
                        borderRadius: 5,
                      },
                    ]}
                    onPress={() => onSelect(item)}>
                    <Highlighter
                      style={{
                        color: '#000000',
                        fontSize: 20,
                        fontFamily: 'Gilroy-SemiBold',
                      }}
                      highlightStyle={{ color: '#297281' }}
                      searchWords={[name]}
                      textToHighlight={item}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  hintContainer: {
    marginTop: 50,
    position: 'absolute',
    backgroundColor: '#fff',
    height: 'auto',
    minHeight: 80,
    maxHeight: 180,
    borderRadius: 6,
    width: '100%',
    alignSelf: 'center',
    zIndex: 999,
    paddingHorizontal: '3%',
    paddingVertical: '5%',
    elevation: 20,
  },
  listItem: {
    marginBottom: 5,
    width: '100%',
  },
});
