import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

import { FONTS, SIZES, COLORS,images } from "./Constants"

const FormTimeInput = ({
    containerStyle,
    inputContainerStyle,
    label,
    placeholder,
    setDate,
    value,
    errorMsg = "",
    formatDate
}) => {

    const [open, setOpen] = useState(false)
    return (
        <View style={{ ...containerStyle }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: COLORS.gray, ...FONTS.body4,width:"88%",
            marginLeft:18 }}>{label}</Text>
                <Text style={{ color: COLORS.red, ...FONTS.body4 }}>{errorMsg}</Text>
            </View>

            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: SIZES.height > 800 ? 55 : 45,
                    paddingHorizontal: SIZES.padding,
                    marginTop: SIZES.height > 800 ? SIZES.base : 0,
                    alignItems: 'center',
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2,
                    ...inputContainerStyle
                }}
                onPress={() => setOpen(true)}
            >
                <Image
                    source={images.clock}
                    style={{
                        width: 25,
                        height: 25,
                        tintColor:COLORS.Primary
                    }}
                />
                <Text
                    style={{
                        flex: 1,
                        color: value ? COLORS.black : COLORS.gray2,
                        ...FONTS.body3,
                        marginLeft: 20
                    }}
                >
                    {value ? moment(value).format("hh:mm") : placeholder}
                </Text>

                
            </TouchableOpacity>

            <DatePicker
                modal
                open={open}
                date={value ? value : new Date()}
                mode="time"
                title={label}
                // is24Hour={t}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    // console.log(date)
                    formatDate(`${date.getHours()}:${date.getMinutes()}`)
                    // console.log(formatDate)

                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </View>
    )
}

export default FormTimeInput;