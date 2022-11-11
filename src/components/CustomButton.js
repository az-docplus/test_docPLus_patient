import React from 'react';
import { View, Text } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import CustomTextComponent from './CustomTextComponent';

export default function CustomButton({
    text, width, height, br, bgColor, shadowColor, fs, fw, textColor, backgroundDarker, onPress
}) {
    return (
        <AwesomeButton width={width} height={height} borderRadius={br} backgroundColor={bgColor}
            backgroundShadow={shadowColor} activeOpacity={0.5} backgroundDarker={backgroundDarker}
            onPress={onPress}
        >
            <CustomTextComponent
                text={text} fs={fs} fw={fw} textColor={textColor}
            />
        </AwesomeButton>
    )
}
