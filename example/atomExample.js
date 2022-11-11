import React from 'react';
import {View, Text} from 'react-native';
import Card from '../src/components/atoms/Card/Card';
import DmzButton from '../src/components/atoms/DmzButton/DmzButton';
import {ScrollView} from 'react-native-gesture-handler';
import DmzHeaderAtom from '../src/components/atoms/DmzHeader/DmzHeaderAtom';
import Avater from '../src/components/atoms/Avater/Avater';
import AnimInput from '../src/components/molecules/AnimInput/AnimInput';
import CardHole from '../src/components/atoms/CardHole/CardHole';
import BlockLinker from '../src/components/molecules/BlockLinker/BlockLinker';
import File from '../src/assets/svg/file.svg';
import SquareBlue from '../src/assets/svg/squareblue.svg';
import {Picker} from '@react-native-community/picker';
import LinkedComponent from '../src/components/molecules/LinkedComponent/LinkedComponent';
import ExpandableOption from '../src/components/molecules/ExpandableOption/ExpandableOption';
import ExpandableList from '../src/components/molecules/ExpandableList/ExpandableList';
import RadioBtn from '../src/components/atoms/RadioBtn/RadioBtn';
import RadioGroup from '../src/components/molecules/RadioGroup/RadioGroup';
const AtomExample = () => {
  return (
    <ScrollView style={{backgroundColor: '#f0f0f0'}}>
      <_break />
      <RadioBtn />
      <_break />
      <RadioGroup
        Item={[
          {
            key: 'a',
            value: 'apple',
          },
          {
            key: 'b',
            value: 'ball',
          },
        ]}
      />
      <_break />
      <ExpandableOption
        active={true}
        name={'test'}
        // icon={''}
        activeItemKey={'test'}
        navigateTo={'tes'}
        // goto={() => navigation.navigate('authentication')}
      />
      <_break />
      <AnimInput textContentType="name" withAnim placeholder="test" />
      <_break />
      <Text>Example</Text>
      <_break />
      <CardHole
        style={{
          backgroundColor: '#fff',
          elevation: 5,
          marginLeft: 20,
        }}
      />
      <_break />
      <ExpandableList name="Expandable" nestedList={['el', 'do', 'rado']} />
      <_break />
      <Card>
        <Text>okk</Text>
      </Card>
      <_break />
      <BlockLinker>
        <File height={24} width={24} />
      </BlockLinker>

      <_break />
      <LinkedComponent>
        <AnimInput placeholder="next" />
      </LinkedComponent>
      <LinkedComponent
        type={0}
        blockIcon={<SquareBlue height={24} width={24} />}>
        <AnimInput placeholder="next" />
      </LinkedComponent>
      <_break />
      <Picker
        mode={'dropdown'}
        selectedValue={'js'}
        itemStyle={{color: 'red'}}
        style={{
          height: 50,
          width: 200,
        }}>
        <Picker.Item label="Java" value="java" style={{color: 'red'}} />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>

      <_break />
      <DmzButton />
      <_break />
      <DmzHeaderAtom>
        <Text>sample</Text>
      </DmzHeaderAtom>
      <_break />
      <_break />
      <Text>
        Avater it takes two params 1. 'source' of the image 2. 'type': 0/1/2{' '}
      </Text>
      <Avater />
    </ScrollView>
  );
};

const _break = () => (
  <View style={{marginVertical: 20}}>
    <Text>------------------------------------------</Text>
  </View>
);

export default AtomExample;
