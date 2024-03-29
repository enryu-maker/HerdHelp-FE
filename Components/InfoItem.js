import React from 'react';
import {
    View,
    Text,
    Platform,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';

import LineDivider from './LineDivider';
import { COLORS, FONTS } from './Constants';

const InfoItem = ({ label, value, withDivider = true,onPress, buttonStyle }) => {
    return (
        <>
            <TouchableOpacity
                style={{
                    ...buttonStyle
                }}
                onPress={onPress}
            >
                <View style={{
                    flexDirection: 'row',
                    height: 70,
                    alignItems: 'center',
                }}>
                <Text style={Platform.OS!="ios"?{ color: COLORS.gray, ...FONTS.h3 }:{ color: COLORS.gray, ...FONTS.h2 }}>{label}</Text>
                <Text  style={Platform.OS!="ios"?{ flex: 1, textAlign: 'right',  ...FONTS.body3 }:{ flex: 1, textAlign: 'right',  ...FONTS.body2 }}>{value}</Text>
                </View>
            </TouchableOpacity>

            {withDivider &&
                <LineDivider
                    lineStyle={{
                        backgroundColor: COLORS.lightGray1
                    }}
                />
            }
        </>
    )
}

export default InfoItem;