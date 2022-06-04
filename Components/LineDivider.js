import React from 'react';
import {
    View
} from 'react-native';
import { COLORS } from "./Constants"

const LineDivider = ({ lineStyle }) => {
    return (
        <View
            style={{
                height: 0.8,
                width: "75%",
                backgroundColor: COLORS.gray2,
                ...lineStyle
            }}
        />
    )
}

export default LineDivider;