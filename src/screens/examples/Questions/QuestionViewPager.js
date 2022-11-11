import React, {createRef} from 'react';
import {View, StyleSheet} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import Question1Screen from './Question1Screen';
import Question1Screen2 from './Question1Screen2';
import Question2Screen from './Question2Screen';
import Question3Screen from './Question3Screen';
import Question4Screen from './Question4Screen';
import Question5Screen from './Question5Screen';

function QuestionViewPager(props) {
  const pagerRef = createRef();
  const nextpage = (page) => {
    pagerRef.current.setPage(page);
  };
  return (
    <ViewPager
      ref={pagerRef}
      style={styles.viewPager}
      initialPage={0}
      scrollEnabled={false}>
      <View key="0">
        <Question1Screen onPress={() => nextpage(1)} />
      </View>
      <View key="1">
        <Question1Screen2 onPress={() => nextpage(2)} />
      </View>
      <View key="2">
        <Question2Screen onPress={() => nextpage(3)} />
      </View>
      <View key="3">
        <Question3Screen onPress={() => nextpage(4)} />
      </View>
      <View key="4">
        <Question4Screen onPress={() => nextpage(5)} />
      </View>
      <View key="5">
        <Question5Screen />
      </View>
    </ViewPager>
  );
}

export default QuestionViewPager;

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});
