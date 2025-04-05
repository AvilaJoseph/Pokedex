import { TouchableOpacity, Text, StyleSheet, View, Image, StyleProp, TextStyle, ViewStyle, ImageStyle, TouchableOpacityProps, ImageSourcePropType } from 'react-native';
import React, { ReactNode } from 'react';


export interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    icon?: ReactNode | ImageSourcePropType;
    iconStyle?: StyleProp<ImageStyle>;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string | null;
    borderWidth?: number;
    iconPosition?: 'left' | 'right';
    disabled?: boolean;
}