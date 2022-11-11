import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import InsetShadow from 'react-native-inset-shadow';
import { useDispatch } from 'react-redux';
import TopNavBar from '../../../../components/molecules/TopNavBar/TopNavBar';
import { UpdateDoctorProfile } from '../../../../reduxV2/action/DoctorAction';
import CancelSaveButton from '../__Components/cancel-save-buttons';
import Axios from 'axios';
import { Host } from '../../../../utils/connection';

const Languages = ({ backToPageOne, lastScreen, doctorProfile }) => {
  const dispatch = useDispatch();
  const [searchResest, setSearchreset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState([
    'ENGLISH',
    'HINDI',
    'FRENCH',
    'RUSSIAN',
    'GERMAN',
    'JAPANESE',
    'CHINESE',
    'ITALIAN',
  ]);
  const [selectedLanguages, setSelectedLanguages] = useState(
    doctorProfile['languages'] ? doctorProfile['languages'] : [],
  );
  const [allLanguages, setAllLanguages] = useState([
    'ENGLISH',
    'HINDI',
    'FRENCH',
    'RUSSIAN',
    'GERMAN',
    'JAPANESE',
    'CHINESE',
    'ITALIAN',
  ]);

  useEffect(() => {
    Axios.get(Host + '/content/get')
      .then((res) => {
        const data = res?.data?.data?.languageAndRegions?.map((el) => el.name);
        // console.log({ lang: data });
        // setLanguages(data);
        // setAllLanguages(data);
      })
      .catch((error) => console.log({ content: error }));
  }, []);

  useEffect(() => {
    if (searchResest) {
      setLanguages(languages);
    }
  }, []);

  const handlesearch = (val) => {
    if (val.length == 0) {
      setSearchreset(true);
    }
    const searcha = allLanguages.filter((item) => {
      return item.toLowerCase().includes(val.toLowerCase());
    });
    selectedLanguages.filter((item) => {
      if (item.toLowerCase().includes(val.toLowerCase())) {
        setLanguages([]);
      }
    });
    setLanguages(searcha);
  };

  const addLanguages = (name) => {
    setSelectedLanguages([...selectedLanguages, name]);
    const updatedLang = languages.filter((item) => {
      return item !== name;
    });
    setLanguages(updatedLang);
  };

  const LanguageboxWithCross = (props) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedLanguages(
            selectedLanguages.filter((e) => e != props.name),
          );
          setLanguages([...languages, props.name]);
        }}>
        <View
          style={{
            height: 47,
            width: 136,
            // elevation: 100,
            // marginBottom: 20,
            marginLeft: 10,
            // marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: '#EEEEEE',
          }}>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 13,
                  marginLeft: 6,
                }}>
                {props.name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const Languagebox = (props) => {
    return (
      <TouchableOpacity
        onPress={() => {
          addLanguages(props.name);
        }}>
        <View
          style={{
            height: 67,
            width: 156,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: '#EEEEEE',
            marginTop: 10,
            marginRight: 15,
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 13,
                marginLeft: 8,
                // marginTop: 10,
              }}>
              {props.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      //   </View>
    );
  };
  const SaveLanguageListFunc = () => {
    setLoading(true);
    const userData = {
      id: doctorProfile?._id,
      languages: selectedLanguages,
    };
    dispatch(
      UpdateDoctorProfile(
        userData,
        () => {
          setLoading(false);
          if (lastScreen == 'one') {
            backToPageOne('one');
          } else {
            backToPageOne('two');
          }
        },
        (e) => {
          setLoading(false);
          console.log('error in saving :::::>>> ', e);
        },
      ),
    );
  };
  return (
    <ScrollView style={{ height: '100%', backgroundColor: 'white', flex: 1 }}>
      <View style={{ backgroundColor: 'white' }}>
        <View style={{ backgroundColor: 'white', flexDirection: 'row' }}>
          <TopNavBar
            headerText=""
            hideRightComp={true}
            onLeftButtonPress={() => {
              if (lastScreen == 'one') {
                backToPageOne('one');
              } else {
                backToPageOne('two');
              }
            }}
            // navigation={props.navigation}
            style={{
              Container: {
                height: 'auto',
                marginTop: 5,
                marginRight: 24,
              },
            }}
          />
          <Text
            style={{
              fontFamily: 'Gilroy-Bold',
              fontSize: 14,
              marginLeft: 60,
              marginTop: 18,
              color: 'black',
            }}>
            LANGUAGES
          </Text>
        </View>
        <View
          style={{
            width: '88%',
            marginLeft: 28,
            marginTop: 20,
          }}>
          <InsetShadow
            shadowOpacity={1}
            shadowOffset={15}
            containerStyle={styles.numberField}
            shadowOffset={10}
            elevation={8}>
            <TextInput
              // editable={!isLoading}
              // keyboardType={name} // name,year,numbers
              // onTouchStart={(e) => {}}
              // onChangeText={(e) => {}}
              // value={inputText}
              placeholder="Search"
              // value={search}
              onChangeText={(value) => handlesearch(value)}
            />
          </InsetShadow>
        </View>
        {/* selectedlanguages */}
        {selectedLanguages.length > 0 && (
          <View>
            <View style={{ marginLeft: 30, marginTop: 20 }}>
              <Text
                style={{
                  color: '#339999',
                  fontSize: 14,
                  fontFamily: 'Gilroy-Medium',
                  marginBottom: 10,
                }}>
                SELECTED LANGUAGES
              </Text>
            </View>
            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ flexDirection: 'row' }}>
                {selectedLanguages.map((item, index) => {
                  return (
                    <View style={{ marginLeft: 25 }}>
                      <LanguageboxWithCross name={item}></LanguageboxWithCross>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        )}

        {/* more languages */}
        <View style={{ marginLeft: 30, marginTop: 20 }}>
          <Text
            style={{
              color: '#339999',
              fontSize: 14,
              fontFamily: 'Gilroy-Medium',
              marginBottom: 10,
            }}>
            SELECT LANGUAGES
          </Text>
          <View
            style={{ flexDirection: 'row', width: '100%', flexWrap: 'wrap' }}>
            {languages &&
              languages.map((item, index) => {
                return <Languagebox name={item}></Languagebox>;
              })}
          </View>
        </View>
      </View>
      <View
        style={{
          marginVertical: 25,
          marginHorizontal: 20,
        }}>
        <CancelSaveButton
          isLoading={loading}
          onSavePress={SaveLanguageListFunc}
          onCancelPress={() => {
            if (lastScreen == 'one') {
              backToPageOne('one');
            } else {
              backToPageOne('two');
            }
          }}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  numberField: {
    borderRadius: 20,
    textAlignVertical: 'center',
    paddingHorizontal: 20,
    height: 55,
    width: '96%',
    borderWidth: 0.1,
  },
});
export default Languages;
