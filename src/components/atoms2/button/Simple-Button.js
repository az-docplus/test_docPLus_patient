import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

export default function Button(props) {

    const { title, pressHandler, style, isBackground } = props

    return <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={[!isBackground ? '#2E81CD' : "transparent", !isBackground ? '#3EACFF' : "transparent"]}
        style={{
            flex: 1, marginHorizontal: 5, borderWidth: isBackground ? 0.5 : 0, borderColor: isBackground && "#fff", borderRadius: 50, shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 20,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,
            elevation: 12,
        }}
    >
        <TouchableOpacity onPress={pressHandler} style={{
            ...style
        }}>
            <Text style={{ color: "#fff", textAlign: 'center', paddingVertical: 12, fontSize: 18, fontFamily: 'Montserrat-Regular', elevation: 10 }}>{title}</Text>
        </TouchableOpacity>
    </LinearGradient>
}

