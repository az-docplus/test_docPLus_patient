<BlurModal {...{ visible, onCancel, setVisible }}>
  <Text
    style={{
      fontFamily: 'Gilroy-SemiBold',
      fontSize: 20,
      color: '#297281',
      textAlign: 'center',
      // color: Colors.primary_text_color[theme],
      marginBottom: 20,
    }}>
    {Local('doctor.medical_history.add_blood_pressure')}
  </Text>

  <View
    style={{
      // marginHorizontal: 20,
      // flexDirection: 'row',
      // alignItems: 'center',
      marginBottom: 25,
    }}>
    <View>
      <Text style={[styles.smallText, { color: '#707585' }]}>
        {Local('doctor.medical_history.systolic')}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <InsetShadow
          shadowOpacity={1}
          shadowOffset={15}
          containerStyle={styles.numberField}
          elevation={12}>
          <TextInput
            style={styles.input}
            // editable={open ? false : true}

            // onPress={() => setOpen(true)}
            value={sys}
            onChangeText={(text) => setSys(text)}
            placeholder="Systolic"
            keyboardType="decimal-pad"
          />
        </InsetShadow>

        <View style={styles.icons}>
          <TouchableOpacity onPress={handleDecrementSys}>
            <AntDesign color="#297281" name="minuscircle" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleIncementSys}
            style={{ marginLeft: 12 }}>
            <AntDesign color="#297281" name="pluscircle" size={35} />
          </TouchableOpacity>
        </View>
      </View>
      {sys > 370 && (
        <AnimatedErrorText
          style={{ width: '70%', alignSelf: 'center' }}
          text={'Please Enter a Valid systolic pressure'}
        />
      )}
      <Text style={[styles.smallText, { color: '#707585' }]}>
        {Local('doctor.medical_history.diastolic')}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <InsetShadow
          shadowOpacity={1}
          shadowOffset={15}
          containerStyle={styles.numberField}
          elevation={12}>
          <TextInput
            style={styles.input}
            // editable={open ? false : true}

            // onPress={() => setOpen(true)}
            value={Dia}
            onChangeText={(text) => setDia(text)}
            placeholder="Diastolic"
            keyboardType="decimal-pad"
          />
        </InsetShadow>

        <View style={styles.icons}>
          <TouchableOpacity onPress={handleDecrementDia}>
            <AntDesign color="#297281" name="minuscircle" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleIncementDia}
            style={{ marginLeft: 12 }}>
            <AntDesign color="#297281" name="pluscircle" size={35} />
          </TouchableOpacity>
        </View>
      </View>
      {Dia > 360 && (
        <AnimatedErrorText
          style={{ width: '70%', alignSelf: 'center' }}
          text={'Please Enter the appropriate fields'}
        />
      )}
    </View>
  </View>
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
    <TouchableOpacity
      onPress={() => onCancel()}
      style={{
        marginRight: 5,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#297281',
        paddingVertical: 15,
        flex: 1,
      }}>
      <Text
        style={{
          textAlign: 'center',
          color: '#297281',
          fontFamily: 'Gilroy-SemiBold',
          fontSize: 20,
        }}>
        Cancel
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      disabled={!sys || !Dia}
      onPress={() => {
        onUpdate(sys, Dia, date);
      }}
      style={{ flex: 1, marginLeft: 5 }}>
      <LinearGradient
        colors={['#225F6B', '#2E8192']}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 30,

          paddingVertical: 15,
          elevation: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#FFFFFF',
            fontFamily: 'Gilroy-SemiBold',
            fontSize: 20,
          }}>
          Update
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  </View>
</BlurModal>












    <BlurModal {...{ visible, onCancel, setVisible, moreMargin }}>
      <Text
        style={{
          fontFamily: 'Gilroy-SemiBold',
          fontSize: 20,
          color: '#297281',
          textAlign: 'center',
          // color: Colors.primary_text_color[theme],
          marginBottom: 20,
        }}>
       {headingText}
      </Text>

      <View
        style={{
          // marginHorizontal: 20,
          // flexDirection: 'row',
          // alignItems: 'center',
          marginBottom: 25,
        }}>
        <View>
          <Text style={[styles.smallText, { color: '#707585' }]}>
            Blood sugar level (
            <Text style={{ color: '#EA1A65' }}>  mg/dl</Text> )
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <InsetShadow
              shadowOpacity={1}
              shadowOffset={15}
              containerStyle={styles.numberField}
              elevation={12}>
              <TextInput
                style={styles.input}
                // editable={open ? false : true}

                // onPress={() => setOpen(true)}
             value={field1}
              onChangeText={(text) => setField1(text)}
                placeholder="Blood Sugar"
                keyboardType="decimal-pad"
              />
            </InsetShadow>
           
            <View style={styles.icons}>
              <TouchableOpacity onPress={handleDecrementWeight}>
                <AntDesign color="#297281" name="minuscircle" size={35} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleIncementWeight}
                style={{ marginLeft: 12 }}>
                <AntDesign color="#297281" name="pluscircle" size={35} />
              </TouchableOpacity>
            </View>
          </View>
          {field1 > 500 && (
            <AnimatedErrorText
              style={{ width: '70%', alignSelf: 'center' }}
              text={'Please Enter the appropriate fields'}
            />
          )}
        </View>
        
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => onCancel()}
          style={{
            marginRight: 5,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: '#297281',
            paddingVertical: 15,
            flex: 1,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#297281',
              fontFamily: 'Gilroy-SemiBold',
              fontSize: 20,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        disabled={field1 == 0 || field2 == 0 || field1 == '' || field2 == ''}
        onPress={() => {
          onUpdate(field1, field2, date);
        }}
          style={{ flex: 1, marginLeft: 5 }}>
          <LinearGradient
            colors={['#225F6B', '#2E8192']}
            start={{ x: 1, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 30,

              paddingVertical: 15,
              elevation: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#FFFFFF',
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 20,
              }}>
              Update
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

    </BlurModal>
    






  








