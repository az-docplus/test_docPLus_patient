import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import MaterialEvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialFontawesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MMaterialIconsIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import { FlatList } from 'react-native-gesture-handler'
import { Picker } from '@react-native-community/picker';
const EvilIcons = ({ name, size, color }) => <MaterialEvilIcons size={size} color={color} name={name} />
const MaterialFontawesomeIcons = ({ name, size, color }) => <MaterialFontawesome size={size} color={color} name={name} />
const MaterialCommunityIconsIcons = ({ name, size, color }) => <MaterialCommunityIcons size={size} color={color} name={name} />
const MMaterialIconsIconsIcons = ({ name, size, color }) => <MMaterialIconsIcons size={size} color={color} name={name} />
const AntDesignIconsIcons = ({ name, size, color }) => <AntDesignIcons size={size} color={color} name={name} />

export default function Headers({
    backHandler,
    title,
    viewStyle,
    hideIcon
}) {
    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 20, ...viewStyle }}>
            <TouchableOpacity onPress={backHandler}>
                <AntDesignIconsIcons name="left" size={28} color="#000" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 20, marginRight: 8, color: "#000" }}>{title}</Text>
                {!hideIcon && <AntDesignIconsIcons name="infocirlce" size={20} color="#51B7B7" />}
            </View>
        </View>
    )
}
