import React, { usebank, useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, TextInput } from 'react-native';
import {
	INPUT_PLACEHOLDER,
	NEW_PRIMARY_COLOR,
	NEW_PRIMARY_BACKGROUND,
	SECONDARY_COLOR,
	GREY_OUTLINE,
	NEW_HEADER_TEXT
} from '../../../styles/colors';
import { Picker } from '@react-native-community/picker';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import Timings from '../../../components/molecules/Clincs/ClinicTimings';
import { useSelector, useDispatch } from 'react-redux';
import { GetClinics, AddClinics } from '../../../reduxV2/action/DoctorAction';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioGroupVertical from '../../../components/molecules/RadioGroup/RadioGroupVertical';

const Payment = ({ navigation }) => {
	const [state, setState] = useState({
		option: "",
	})
	const [bank, setBank] = useState({
		name: '',
		number: '',
		IFSC: "",
		type: "",
		bankName: ''
	})
	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			<TopNavBar
				navigation={navigation}
				headerText={`${Local("doctor.payment.payment")}`}></TopNavBar>
			<ScrollView
				contentContainerStyle={{
					paddingHorizontal: "12%"
				}}>
				<View style={{ marginTop: '8%' }}>
					<Text style={styles.labels}>{Local("doctor.payment.payment_option")}</Text>
					<View
						style={{
							borderWidth: 1,
							borderColor: '#e0e0e0',
							width: '90%',
							alignSelf: 'center',
							borderRadius: 10,
							backgroundColor: '#fcfcfc',
							marginTop: 20,
						}}>
						<RadioGroupVertical
							activeKey={paymentOption}
							setActiveKey={setPaymentOption}
							Item={[
								{ value: `${Local("doctor.payment.payment_after_consult")}`, id: 'PAC' },
								{ value: `${Local("doctor.payment.payment_before_consult")}`, id: 'PBC' },
								{ value: `${Local("doctor.payment.danate_time")}`, id: 'DT' },
							]}
						/>
					</View>
					<Text style={styles.labels}>{Local("doctor.payment.add_bank_details")}</Text>
					<TextInput
						value={bank.type}
						onChangeText={(text) => setBank({ ...bank, type: text })}
						placeholderTextColor={Colors.input_placeholder_text[theme]}
						placeholder="Bank Type"
						style={styles.text}
					/>
					<TextInput
						value={bank.name}
						onChangeText={(text) => setBank({ ...bank, name: text })}
						placeholderTextColor={Colors.input_placeholder_text[theme]}
						placeholder="Account Name"
						style={styles.text}
					/>
					<TextInput
						value={bank.number}
						onChangeText={(text) => setBank({ ...bank, number: text })}
						placeholderTextColor={Colors.input_placeholder_text[theme]}
						placeholder="Account Number"
						style={styles.text}
					/>
					<TextInput
						value={bank.bankName}
						onChangeText={(text) => setBank({ ...bank, bankName: text })}
						placeholderTextColor={Colors.input_placeholder_text[theme]}
						placeholder="Bank name"
						style={styles.text}
					/>
					<TextInput
						value={bank.IFSC}
						onChangeText={(text) => setBank({ ...bank, IFSC: text })}
						placeholderTextColor={Colors.input_placeholder_text[theme]}
						placeholder="IFSC"
						style={styles.text}
					/>
					<DmzButton
						disabled={
							state.option === '' ||
							bank.name == '' ||
							bank.number === '' ||
							bank.IFSC === '' ||
							bank.type == '' ||
							bank.bankName === ''
						}
						onPress={() => {
							//	onUpdate(details);
						}}
						style={{
							Text: {
								textAlign: 'center',
								color: '#fff',
								fontSize: 18,
								fontFamily: 'Montserrat-SemiBold',
							},
							Container: {
								width: '70%',
								height: 46,
								borderRadius: 25,
								backgroundColor: SECONDARY_COLOR,
								alignSelf: 'center',
								marginTop: 24,
								elevation: 3,
							},
						}}
						text="UPDATE"
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default Payment;

const styles = StyleSheet.create({
	labels: {
		fontFamily: 'Montserrat-SemiBold',
		textAlign: "center",
		fontSize: 20,
	},
	text: {
		marginTop: '4%',
		fontFamily: 'Montserrat-Regular',
		fontSize: 14,
		alignSelf: 'stretch',
		borderBottomWidth: 1.5,
		borderColor: NEW_PRIMARY_BACKGROUND,
		padding: 5,
		marginBottom: 7,
	},
	inputStyle: {
		width: '65%',
		borderBottomColor: NEW_PRIMARY_COLOR,
		borderBottomWidth: 1,
		height: 'auto',
		alignSelf: 'center',
	},
	textStyle: {
		color: NEW_HEADER_TEXT,
		fontSize: 13,
		marginTop: 20,
		fontFamily: 'Montserrat-Medium',
	},
	inputContainer: {},
});