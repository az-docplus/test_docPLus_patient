/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Modal, Button, TouchableOpacity} from 'react-native';
import GradientTopNavBar from '../../../components/molecules/TopNavBar/GradientTopNavBar';
import NotFound from '../../../components/organisms/NotFound/NotFound';
import FancyHeaderLite from '../../../components/organisms/FancyHeaderLite/FancyHeaderLite';
import Container from '../../../components/organisms/Container/Container';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import FilterIcon from '../../../assets/svg/filter_icon.svg';
import FilterScreen from './FilterScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Orders = ({navigation}) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [filter, setFilter] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filterVal, setFilterVal] = useState({
    Category: 'All',
    Date_Range: 'All',
  });
  const modalVisible = (i) => {
    setFilter(i);
  };
  const onPressSave = (val) => {
    setFilterVal(val);
    setFilter(false);
  };
  const resetFilters = (val) => {
    setFilterVal(val);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <FancyHeaderLite
        navigation={navigation}
        onLeftButtonPress={() => navigation.goBack(null)}
        headerText={'Order'}
        style={{Section: {overflow: 'hidden', height: '20%', marginBottom: 0}}}
      />
      <Container
        style={{
          height: '75%',
          transform: [{translateY: -30}],
          zIndex: 999,
          backgroundColor: '#fff',
          padding: 5,
          paddingTop: 15,
        }}>
        {isEmpty ? <NotFound /> : <Text>Orders</Text>}
      </Container> */}
      <TopNavBar
        navigation={navigation}
        headerText="Orders"
        style={{
          Header: {
            color: '#000',
            fontSize: 23,
            alignSelf: 'center',
            width: '50%',
          },
          Container: {
            marginTop: 10,
          },
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setFilter(true);
        }}
        style={{
          flexDirection: 'row-reverse',
          width: 90,
          justifyContent: 'space-evenly',
          alignSelf: 'flex-end',
          margin: 20,
        }}>
        <Text style={{fontSize: 18}}>FILTER</Text>
        {/* <FilterIcon height={24} width={24} /> */}
        <Icon size={24} name="filter" />
      </TouchableOpacity>
      {orders == null ? (
        <NotFound />
      ) : orders.length == 0 ? (
        <NotFound />
      ) : (
        <Text>orders</Text>
      )}
      <Modal
        transparent
        presentationStyle="overFullScreen"
        animationType="fade"
        animated={true}
        visible={filter}
        onRequestClose={() => {
          setFilter(false);
        }}>
        <FilterScreen
          modalVisible={modalVisible}
          filterVal={filterVal}
          onPressSave={onPressSave}
          resetFilters={resetFilters}
        />
      </Modal>
    </View>
  );
};

export default Orders;
