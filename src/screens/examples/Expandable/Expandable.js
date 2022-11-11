import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import ExpandableButton from '../../../components/organisms/ExpandableButton/ExpandableButton';

function Expandable() {
  const screenWidth = Dimensions.get('screen').width;
  const [heightOffset, setHeightOffset] = useState(0);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 40,
      }}>
      <View style={{flex: 1}} />
      <View
        style={{flex: 1}}
        onLayout={props => {
          if (heightOffset !== props.nativeEvent.layout.y)
            setHeightOffset(props.nativeEvent.layout.y);
        }}>
        <ExpandableButton
          width={100}
          height={60}
          expandedHeight={600}
          expandedTop={heightOffset}
          expandedWidth={screenWidth}
          heightOffset={heightOffset}
        />
      </View>
    </View>
  );
}

export default Expandable;
