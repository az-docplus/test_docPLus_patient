import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import HeadersCompo from '../__Components/Header'
import SlotCardCompo from './SlotCard'

export default function Times({
    backToPageOne
}) {
    return (
        <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
            <HeadersCompo
                title="Availablity"
                backHandler={backToPageOne}
            />
            <SlotCardCompo
                text={`Tele-consult Avalibility`}
                type={'Tele-consult'}
                backToPageOne={backToPageOne}
            />
        </ScrollView>
    )
}


