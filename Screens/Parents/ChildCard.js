import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react'
import { useSelector } from 'react-redux';
import { COLORS, SIZES, FONTS } from '../../Components/Constants';
import { baseURL } from '../../helpers/helpers';
import { images } from '../../Components/Constants';
import { useNavigation } from '@react-navigation/native';
export default function ChildCard({
    date,
    data,
    type

}) {
    const navigation = useNavigation()
    const unit = JSON.parse(useSelector(state => state.Reducers.unit))
    return (
        <>
            <Text style={{
                width: '88%',
                ...FONTS.h3,
                color: COLORS.Primary,
                alignSelf: "center",
                textDecorationLine: "underline",
                padding: 5
            }}>
                {date}
            </Text>

            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.lightGray2,
                            height: 120,
                            margin: SIZES.base2,
                            borderRadius: SIZES.radius,
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            // shadowColor: COLORS.black,
                            // shadowOffset: { width: 0, height: 0 },
                            // shadowOpacity: 0.5,
                            // shadowRadius: 5,
                            // elevation: 2,
                            width: '88%',
                            alignSelf: 'center',

                        }}
                    onPress={()=>{
                        navigation.navigate(type=="B"?'ChildInfo':'Info', {
                            value: item,
                            cond: false
                          });
                    }}
                    >
                        {
                            item?.flagged ?
                                <>
                                    <View style={{
                                        height: 30,
                                        width: 2,
                                        transform: [{
                                            rotate: '45deg'
                                        }],
                                        backgroundColor: COLORS.red,
                                        position: "absolute",
                                        marginLeft: 15,
                                    }} />
                                    <View style={{
                                        height: 40,
                                        width: 2,
                                        transform: [{
                                            rotate: '45deg'
                                        }],
                                        backgroundColor: COLORS.red,
                                        position: "absolute",
                                        marginLeft: 20,
                                    }} />
                                </> : null}
                                {
                                    console.log(item?.animal_image)
                                }
                        <View style={{ justifyContent: 'center', marginRight: SIZES.padding, height: 80, width: 80, alignSelf: "center", marginLeft: 15 }}>
                            {item?.animal_image != null ? (
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}>
                                    <Image
                                        source={{
                                            uri:
                                                baseURL +
                                                item?.animal_image,
                                        }}
                                        resizeMode="cover"
                                        style={{ height: 80, width: 80, borderRadius: SIZES.padding, marginLeft: 5 }}
                                    />
                                </View>
                            ) : (
                                <Image source={{ uri:baseURL + item?.image }} style={{ height: 80, width: 80, borderRadius: SIZES.padding }}
                                />
                            )}
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                position: "absolute",
                                marginLeft: 120,
                                // marginTop:15
                                alignSelf: "center"
                            }}>
                            <Text style={[FONTS.h4, { letterSpacing: 3, padding: 3 }]}>{item?.support_tag}</Text>
                            <Text style={[FONTS.h4, { letterSpacing: 3, fontWeight: '700', padding: 3 }]}>
                                {item?.name}
                            </Text>
                            <Text style={[FONTS.h4, { letterSpacing: 3, padding: 3 }]}>
                                {unit ? `${item?.weight} lbs` : `${item?.weight_kg} kg`}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                            }}>
                            <Image
                                source={images.rightone}
                                style={{
                                    height: 15,
                                    width: 15,
                                    margin: 10,
                                    tintColor: COLORS.black,
                                    alignSelf: "flex-end"
                                }}
                            />
                            <View style={{}}>
                                <Image
                                    source={item?.gender === 'Male' ? images.male : images.female}
                                    style={{ height: 40, width: 40, justifyContent: "center", marginTop: 10, marginRight: 20 }}
                                />
                            </View>

                        </View>

                    </TouchableOpacity>
                )}
            />


        </>
    );
}