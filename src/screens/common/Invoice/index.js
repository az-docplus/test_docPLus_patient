import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
  BackHandler,
  Alert,
  // Alert,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {Host} from '../../../utils/connection';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';

export default class Invoice extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }
  backAction = () => {
    this.props.navigation.navigate('Appointments', {reset: true});
    return true;
  };
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    const {time} = this.props.route.params;
    setTimeout(
      () => {
        this.setState({show: true});
      },
      time ? time : 5000,
    );
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  render() {
    console.log(this.props);
    const {id} = this.props.route.params;
    console.log(`${Host}/invoices/${id}.pdf`);
    const source = {uri: `${Host}/invoices/${id}.pdf`, cache: false};

    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf'};

    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

    return (
      <>
      <TopNavBar
          onLeftButtonPress={this.backAction}
          // onRightButtonPress={() => {}}
          //LeftComp={<View></View>}
          navigation={this.props.navigation}

          headerText="Invoice"
        />
      
      <View style={styles.container}>
        
        {!this.state.show ? (
          <ActivityIndicator />
        ) : (
          <Pdf
            source={source}
            
            // onLoadProgress={(error) => {
            //   // console.log(error);
            //   Alert.alert('Loading', 'Creating invoice for you, please check again after some time', [
            //     {
            //       onPress: () => {
            //         console.log('navigation ', this.props.navigation);
            //         this.props.navigation.navigate('Appointments');
            //       },
            //       text: 'Go to Appointments',
            //     },
            //   ]);
            // }}
            onError={(error) => {
              console.log(error);
              Alert.alert('Error', 'Error loading invoice!!', [
                {
                  onPress: () => {
                    console.log('navigation ', this.props.navigation);
                    this.props.navigation.navigate('Appointments');
                  },
                  text: 'Go to Appointments',
                },
              ]);
            }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`current page: ${page}`);
            }}
            
            onPressLink={(uri) => {
              console.log(`Link presse: ${uri}`);
            }}
            style={styles.pdf}
          />
        )}
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: '#fff',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
