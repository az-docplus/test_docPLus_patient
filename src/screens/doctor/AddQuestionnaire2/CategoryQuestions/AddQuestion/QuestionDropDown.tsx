import React, { useState, createRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../../../styles/colorsV3';
import { hp, wp } from '../../../../../components/Scalling';
import { Animation } from '../../../../../animations';

const checkBoxIcon = require('../../../../../assets/png/checkBox.png');
const linearIcon = require('../../../../../assets/png/linear.png');
const longAnswer = require('../../../../../assets/png/longAnswer.png');
const shortAnswer = require('../../../../../assets/png/shortAnswer.png');

const QuestionDropDown = (props) => {
  var dropDownRef: any = createRef();
  const [visible, setVisible] = useState(false);
  const [dropDownLayout, setDropDownLayout] = useState<any>('');

  const [dropDownItems] = useState([
    { icon: checkBoxIcon, label: 'Checkboxes', value: 'Checkboxes', id: 1 },
    {
      icon: 'radio-btn-active',
      label: 'Multiple Choice',
      value: 'MultipleChoice',
      id: 2,
    },
    { icon: linearIcon, label: 'Linear Scale', value: 'LinearScale', id: 3 },
    { icon: shortAnswer, label: 'Short Answer', value: 'ShortAnswer', id: 4 },
    { icon: longAnswer, label: 'Long Answer', value: 'LongAnswer', id: 5 },
  ]);
  const [activeItem, setActiveItem] = useState<any>(dropDownItems[1]);

  const closeDropDown = () => setVisible(false);
  const openDropDown = () => {
    if (dropDownRef) {
      dropDownRef.current.measure((x, y, width, height, pagex, pagey) => {
        setDropDownLayout({ pageX: pagex, pageY: pagey });
      });
    }
    setVisible(true);
  };
  useEffect(() => {
      if(props.editMode){
setActiveItem(
      dropDownItems.find((item) => item.value === props.oneditDropDown),
    );
      }
    
  }, [props.oneditDropDown]);

  const onItemPress = (item) => {
    setActiveItem(item);
    setVisible(false);
    props.onPress(item.value);
  };
  const renderList = ({ item }) => {
    return (
      <TouchableOpacity
        style={Style.listItemContainer}
        onPress={onItemPress.bind(null, item)}>
        {item.icon === 'radio-btn-active' ? (
          <Fontisto
            name="radio-btn-active"
            size={wp(5)}
            color={Colors.color6}
          />
        ) : (
          <Image
            source={item.icon}
            resizeMode="contain"
            style={Style.itemIcon}
          />
        )}
        <Text style={Style.dropDownOuterBtnTitle}>{item.label}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ ...Style.container, ...Style.shadow }} ref={dropDownRef}>
      <TouchableOpacity
        style={Style.dropDownOuterBtn}
        onPress={openDropDown}
        activeOpacity={0.7}>
        <View style={Style.dropDownOuterBtnInner}>
          {activeItem.icon === 'radio-btn-active' ? (
            <Fontisto
              name="radio-btn-active"
              size={wp(5)}
              color={Colors.color6}
            />
          ) : (
            <Image
              source={activeItem.icon}
              resizeMode="contain"
              style={Style.itemIcon}
            />
          )}
          <Text style={Style.dropDownOuterBtnTitle}>{activeItem.label}</Text>
        </View>
        <AntDesign name="down" color={Colors.color6} size={wp(5)} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        visible={visible}
        transparent={true}
        onDismiss={closeDropDown}
        onRequestClose={closeDropDown}>
        {dropDownLayout.length !== 0 && (
          <TouchableOpacity
            style={Style.dropDownModal}
            activeOpacity={1}
            onPress={closeDropDown}>
            <TouchableOpacity
              style={{
                ...Style.dropDownContainer,
                ...Style.shadow,
                top:
                  dropDownLayout.length !== 0
                    ? dropDownLayout.pageY + hp(9)
                    : null,
                left: dropDownLayout.length !== 0 ? dropDownLayout.pageX : null,
              }}
              activeOpacity={1}>
              <Animation animation="fadeInDown" duration={200}>
                <FlatList
                  data={dropDownItems}
                  renderItem={renderList}
                  keyExtractor={(item: any) => item.id.toString()}
                />
              </Animation>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      </Modal>
    </View>
  );
};

export default QuestionDropDown;

const Style = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    paddingVertical: hp(2.3),
    paddingHorizontal: wp(3),
    borderRadius: 10,
    borderColor: Colors.color15,
    backgroundColor: Colors.color14,
  },
  dropDownOuterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropDownOuterBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropDownOuterBtnTitle: {
    fontSize: wp(4),
    color: Colors.color16,
    marginLeft: wp(2),
  },
  dropDownModal: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  dropDownContainer: {
    borderWidth: 0.5,
    backgroundColor: Colors.color14,
    borderColor: Colors.color15,
    width: wp(66),
    borderRadius: 10,
    paddingVertical: hp(2),
    // top: hp(29.5),
    // left: wp(3),
  },
  listItemContainer: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    width: wp(5),
    height: hp(3),
  },
});
