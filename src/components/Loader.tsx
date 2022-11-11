import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { hp } from './Scalling'

const Loader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: hp(8) }}>
            <ActivityIndicator size="small" color={'#000'} />
        </View>
    )
}

export default Loader
