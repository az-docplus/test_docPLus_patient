import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomNavigationComponent from '../../../components/old/BottomNavigation/BottomNavigation.component';

const Wishlist = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Wishlist</Text>
      <BottomNavigationComponent activeOption={4} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Wishlist;

// import React, { Component, useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
// import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
// import BottomNavigationComponent from '../../../components/old/BottomNavigation/BottomNavigation.component'
// import axios from 'axios'
// import AvailDoctorContainer from '../../../components/molecules/AvailDoctorContainer/AvailDoctorContainer';

// class Wishlist extends Component {

//   constructor(props) {
//     super(props);
//     let { width } = Dimensions.get("window");
//     this.state = {
//       dataProvider: new DataProvider((r1, r2) => {
//         return r1 !== r2
//       }),
//       data: [],
//       page: 0,
//       isLoading: false
//     }
//     this._layoutProvider = new LayoutProvider(
//       index => { return 0 },
//       (type, dim) => {
//         switch (type) {
//           default:
//             dim.width = width;
//             dim.height = 180;
//             break;
//         }
//       }
//     );

//     this._rowRenderer = this._rowRenderer.bind(this);

//   }
//   componentDidMount() {
//     this.getData();
//   }

//   getData = () => {

//     const apiUrl = 'https://jsonplaceholder.typicode.com/comments?_page=1'
//     this.setState({ isLoading: true })
//     setTimeout(() => {
//       fetch(apiUrl).then(responseJson => responseJson.json()).then(responseJson => {
//         this.setState({
//           data: [...this.state.data, ...responseJson],
//           dataProvider: this.state.dataProvider.cloneWithRows(this.state.data),
//           isLoading: false
//         })
//       })
//     }, 2000)

//   }

//   _rowRenderer(type, data) {
//     switch (type) {
//       default:
//         return (
//           // <View style={styles.itemContainer}>
//           //   <View style={styles.box}>
//           //     <Text style={styles.itemHead}>PostId : </Text>
//           //     <Text style={styles.item}>{data.postId}</Text>
//           //   </View>
//           //   <View style={styles.box}>
//           //     <Text style={styles.itemHead}>Id : </Text>
//           //     <Text style={styles.item}>{data.id}</Text>
//           //   </View>
//           //   <View style={styles.box}>
//           //     <Text style={styles.itemHead}>Name : </Text>
//           //     <Text style={styles.item}>{data.name}</Text>
//           //   </View>

//           //   <View style={styles.box}>
//           //     <Text style={styles.itemHead}>Email : </Text>
//           //     <Text style={styles.item}>{data.email}</Text>
//           //   </View>

//           // </View>
//           <AvailDoctorContainer />
//         );
//     }
//   }

//   handleEnd = () => {

//     this.setState({
//       page: this.state.page + 1,
//       isLoading: true
//     }, () => this.getData())

//   }
//   handleFooter = () => {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" />
//       </View>
//     )
//   }

//   render() {
//     return (
//       <SafeAreaView>
//         <ScrollView style={{ height: "100%" }}>
//           <View style={styles.heading}>
//             <Text style={styles.headingText}>
//               Recycler List Using API Integration
//                 </Text>
//           </View>
//           <View style={styles.list}>
//             <RecyclerList layoutProvider={this._layoutProvider}
//               dataProvider={this.state.dataProvider}
//               rowRenderer={this._rowRenderer}
//               onEndReached={() => this.handleEnd()}
//               onEndReachedThreshold={100}
//               renderFooter={() => this.handleFooter()} />

//           </View>
//         </ScrollView>
//         {/* <BottomNavigationComponent activeOption={4} navigation={this.props.navigation} /> */}
//       </SafeAreaView>
//     );

//   }
// }

// const styles = StyleSheet.create({
//   heading: {
//     paddingTop: 50,
//     alignItems: "center",
//     backgroundColor: "#0052a2",
//     paddingHorizontal: 15
//   },
//   headingText: {
//     fontSize: 25,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 10,
//     color: "#fff"
//   },
//   list: {
//     flex: 1,
//     height: 2000,
//     justifyContent: "center",
//     marginTop: 15,
//     marginRight: 5
//   },
//   itemHead: {
//     fontSize: 18,
//     fontWeight: "600",
//     margin: 3,
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   item: {
//     fontSize: 15,
//     margin: 3,
//     paddingRight: 3,
//     marginBottom: 10,
//   },
//   itemContainer: {
//     marginHorizontal: 15,
//     backgroundColor: "#f8f8f8",
//     borderRadius: 10,
//     padding: 5,
//     shadowOffset: { width: 1, height: 1 },
//     shadowColor: '#d4d4d4',
//     shadowOpacity: 1.0,
//   },
//   box:
//   {
//     flexDirection: "row",
//     alignItems: "center"
//   },
//   loader: {
//     marginBottom: 20,
//     justifyContent: "center"
//   }

// })

// const RecyclerList = ({ layoutProvider, dataProvider, rowRenderer, onEndReached, renderFooter }) => {

//   const [state, setState] = useState({
//     dataProvider: new DataProvider((r1, r2) => {
//       return r1 !== r2
//     }),
//     data: [],
//     page: 0,
//     isLoading: true
//   })

//   const getData = () => {
//     const apiUrl = 'https://jsonplaceholder.typicode.com/comments?_page=1'
//     setState({ isLoading: true })

//     setTimeout(() => {
//       fetch(apiUrl).then(responseJson => responseJson.json()).then(responseJson => {
//         setState({
//           data: [...state.data, ...responseJson],
//           dataProvider: state.dataProvider.cloneWithRows(state.data),
//           isLoading: false
//         })
//       })
//     }, 2000)

//   }

//   useEffect(() => {
//     getData()
//   }, [])

//   return state.isLoading ? <Text>Loading..</Text>: (
//     <RecyclerListView
//       layoutProvider={layoutProvider}
//       dataProvider={state.dataProvider}
//       rowRenderer={rowRenderer}
//       onEndReached={() => onEndReached()}
//       onEndReachedThreshold={100}
//       renderFooter={() => renderFooter()}
//     />
//   )
// }

// export default Wishlist

// import React, { Component, useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
// import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
// import BottomNavigationComponent from '../../../components/old/BottomNavigation/BottomNavigation.component'
// import axios from 'axios'

// const Wishlist = (props) => {
//   let { width } = Dimensions.get("window");

//   const [state, setState] = useState({
//     dataProvider: new DataProvider((r1, r2) => {
//       return r1 !== r2
//     }),
//     data: [],
//     page: 0,
//     isLoading: false
//   })

//   var _layoutProvider = new LayoutProvider(index => { return 0 },
//     (type, dim) => {
//       switch (type) {
//         default:
//           dim.width = width;
//           dim.height = 180;
//           break;
//       }
//     }
//   );

//   useEffect(() => {
//     getData();
//   }, [])

//   const getData = () => {

//     const apiUrl = 'https://jsonplaceholder.typicode.com/comments?_page=1'

//     console.log('---------------00000000000----------------')

//     axios.get(apiUrl).then(result => {
//       console.log(result)
//     })
//     // setTimeout(() => {
//       fetch(apiUrl).then(responseJson => responseJson.json()).then(responseJson => {
//         console.log('Done------------------------->')
//         setState({
//           ...state,
//           data: [...state.data, ...responseJson],
//           dataProvider: state.dataProvider.cloneWithRows(state.data),
//           isLoading: false
//         })
//       })
//       .catch(err => console.log('err'))
//     // }, 2000)

//   }

//   const _rowRenderer = (type, data) => {
//     switch (type) {
//       default:
//         return (
//           <View style={styles.itemContainer}>
//             <View style={styles.box}>
//               <Text style={styles.itemHead}>PostId : </Text>
//               <Text style={styles.item}>{data.postId}</Text>
//             </View>
//             <View style={styles.box}>
//               <Text style={styles.itemHead}>Id : </Text>
//               <Text style={styles.item}>{data.id}</Text>
//             </View>
//             <View style={styles.box}>
//               <Text style={styles.itemHead}>Name : </Text>
//               <Text style={styles.item}>{data.name}</Text>
//             </View>

//             <View style={styles.box}>
//               <Text style={styles.itemHead}>Email : </Text>
//               <Text style={styles.item}>{data.email}</Text>
//             </View>

//           </View>
//         );
//     }
//   }

//   const handleEnd = () => {
//     setState({
//       page: state.page + 1,
//       isLoading: true
//     }, () => getData())
//   }

//   const handleFooter = () => {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" />
//       </View>
//     )
//   }

//   return state.isLoading ? <Text>Loading...</Text> : (
//     <SafeAreaView>
//       <ScrollView style={{ height: "100%" }}>
//         <View style={styles.heading}>
//           <Text style={styles.headingText}>
//             Recycler List Using API Integration
//                 </Text>
//         </View>
//         <View style={styles.list}>
//           <RecyclerListView
//             layoutProvider={_layoutProvider}
//             dataProvider={state.dataProvider}
//             rowRenderer={_rowRenderer}
//             onEndReached={() => handleEnd()}
//             onEndReachedThreshold={100}
//             renderFooter={() => handleFooter()}
//           />
//         </View>
//       </ScrollView>
//       {/* <BottomNavigationComponent activeOption={4} navigation={this.props.navigation} /> */}
//     </SafeAreaView>
//   );

// }

// const styles = StyleSheet.create({
//   heading: {
//     paddingTop: 50,
//     alignItems: "center",
//     backgroundColor: "#0052a2",
//     paddingHorizontal: 15
//   },
//   headingText: {
//     fontSize: 25,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 10,
//     color: "#fff"
//   },
//   list: {
//     flex: 1,
//     height: 2000,
//     justifyContent: "center",
//     marginTop: 15,
//     marginRight: 5
//   },
//   itemHead: {
//     fontSize: 18,
//     fontWeight: "600",
//     margin: 3,
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   item: {
//     fontSize: 15,
//     margin: 3,
//     paddingRight: 3,
//     marginBottom: 10,
//   },
//   itemContainer: {
//     marginHorizontal: 15,
//     backgroundColor: "#f8f8f8",
//     borderRadius: 10,
//     padding: 5,
//     shadowOffset: { width: 1, height: 1 },
//     shadowColor: '#d4d4d4',
//     shadowOpacity: 1.0,
//   },
//   box:
//   {
//     flexDirection: "row",
//     alignItems: "center"
//   },
//   loader: {
//     marginBottom: 20,
//     justifyContent: "center"
//   }

// })

// export default Wishlist
