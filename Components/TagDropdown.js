import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { COLORS, FONTS, images, SIZES } from './Constants';

export default function TagDropdown({
    data,
    value,
    setValue
}) {

    const [isFocus, setIsFocus] = useState(false);
    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label]}>
                    Tags
                </Text>
            );
        }
        return null;
    };
    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Tag' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    // setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <Image source={images.paw} style={{
                        height: 20,
                        width: 20,
                        marginHorizontal: 10,
                        tintColor: COLORS.Primary
                    }} />
                )}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        //   backgroundColor: 'white',
        width: "88%",
        paddingVertical: 17,
        alignSelf: "center",
        marginTop: 20
    },
    dropdown: {
        height: 50,
        borderColor: COLORS.gray,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        ...FONTS.body3
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 10,
        ...FONTS.body5,
        borderRadius: SIZES.base,
        color: COLORS.Primary,

    },
    placeholderStyle: {
        ...FONTS.body3
    },
    selectedTextStyle: {
        ...FONTS.body3,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        ...FONTS.body3,
    },
});