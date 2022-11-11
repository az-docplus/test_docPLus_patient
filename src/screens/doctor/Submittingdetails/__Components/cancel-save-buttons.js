import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export default function Buttons({ onCancelPress, onSavePress, isLoading }) {
    return (
        <View>
            <View style={{ flexDirection: 'row', marginBottom: 20, justifyContent: "space-between" }}>

                <TouchableOpacity
                    disabled={isLoading}
                    onPress={onCancelPress}
                    style={{ flex: 1, marginHorizontal: 7, borderWidth: 1, borderColor: '#2E81CD', borderRadius: 50 }}>
                    <Text style={{ textAlign: 'center', color: '#2E81CD', fontFamily: 'Montserrat-SemiBold', padding: 13, fontSize: 17 }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={isLoading}
                    onPress={onSavePress} style={{ flex: 1, marginHorizontal: 7 }}>
                    <LinearGradient
                        colors={[isLoading ? "#94B9C0" : '#2D7D8E', isLoading ? "#94B9C0" : '#2D7D8E']}
                        angle={0}
                        style={{ elevation: 10, borderRadius: 50 }}
                    >
                        <Text style={{ textAlign: 'center', color: '#fff', fontFamily: 'Montserrat-SemiBold', padding: 13, fontSize: 17 }}>Save</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}
