import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Modal, Platform } from 'react-native'
import React from 'react'
import { images, COLORS, SIZES, FONTS } from '../../Components/Constants';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import utils from '../../utils/Utils';
import TextButton from '../../Components/TextButton';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import axiosIns from '../../helpers/helpers';

import { useDispatch } from 'react-redux';
import { Logout } from '../../Store/actions';
import Loader from '../../Components/Loader';
export default function Delete({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [reason, setReason] = React.useState('');
    const [reasonc, setReasonc] = React.useState('');
    const [loading, setLoading] = React.useState(false);


    const [EmailErr, setEmailErr] = React.useState('');
    const data = [
        {
            id: 1,
            label: "Something was Broke",
            value: "Something was Broke",
        },
        {
            id: 2,
            label: "Its Hard to Use",
            value: "Its Hard to Use",
        },
        {
            id: 3,
            label: "I have Privacy Concern",
            value: "I have Privacy Concern",
        },
        {
            id: 4,
            label: "Other",
            value: "Other",
        },
    ]
    // {console.log(reasonc)}
    const dispatch = useDispatch()
    async function deleteUser() {
        setLoading(true)
        axiosIns.post('/deleteuser/', {
            reason:reasonc
        }).then((Response) => {
            if (Response.status === 200) {
                Alert.alert(
                    "Account Deleted we will miss you",
                    Platform.OS === "ios" ? "Go to Apple store to cancle subscription" : "Go to Play store to cancle subscription",
                    [
                        {
                            text: "Logout", onPress: () => { dispatch(Logout()) },
                            style: "destructive"
                        }
                    ]
                );
                setLoading(false)

            }
            else {
                alert("Something Went Wrong")
                setLoading(false)

            }
        }).catch((e) => {
            // console.log(e)
            alert("Invalid user details")
            setLoading(false)

        })
    }
    function renderheader() {
        return (
            <Header
                leftComponent={
                    <View
                        style={{
                            justifyContent: 'center',
                            position: 'absolute',
                            marginTop: 20,
                            zIndex: 1,
                        }}>
                        <TouchableOpacity
                            style={{
                                marginLeft: 25,
                                backgroundColor: COLORS.Primary,
                                height: 40,
                                width: 40,
                                justifyContent: "center",
                                borderRadius: 40 / 2,
                            }}
                            onPress={() => {
                                navigation.goBack();
                            }}>
                            <Image
                                source={images.back}
                                style={{ width: 25, height: 25, tintColor: COLORS.white, alignSelf: "center" }}
                            />
                        </TouchableOpacity>
                    </View>
                }
                title={'Delete Account'}
                titleStyle={{
                    color: COLORS.red
                }}
            />
        );
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            <Loader loading={loading}/>
            {renderheader()}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    // paddingHorizontal: SIZES.padding,
                }}>
                <FormInput
                    label={'Registered Email*'}
                    value={email}
                    onChange={text => {
                        utils.validateEmail(text, setEmailErr)
                        setEmail(text);
                    }}
                    errorMsg={EmailErr}
                    placeholder={'Enter Email'}
                    keyboardType="email-address"
                    autoCompleteType="email"
                    returnKeyType={"next"}
                    appendComponent={
                        <View
                            style={{
                                justifyContent: 'center',
                            }}>
                            <Image
                                source={
                                    email == '' ? images.correct : email != '' && EmailErr == '' ? images.correct : images.cancel
                                }
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor:
                                        email == ''
                                            ? COLORS.gray
                                            : email != '' && EmailErr == ''
                                                ? COLORS.green
                                                : COLORS.red,
                                }}
                            />
                        </View>
                    }
                />
                <Dropdown
                    dropdownIcon={images.down}
                    dropdownIconSize={22}
                    label="Reason*"
                    borderRadius={SIZES.radius}
                    data={data}
                    textInputStyle={(FONTS.body2, { letterSpacing: 2 })}
                    selectedItemTextStyle={
                        (FONTS.body3,
                            { color: COLORS.white, letterSpacing: 2, alignSelf: 'center' })
                    }
                    selectedItemViewStyle={{
                        backgroundColor: COLORS.Primary,
                        margin: 5,
                        borderRadius: SIZES.radius,
                    }}
                    animationIn="bounceInLeft"
                    animationOut="bounceOutLeft"
                    disableSelectionTick
                    primaryColor={COLORS.Primary}
                    value={reasonc}
                    onChange={(value) => {
                        setReasonc(value)
                    }}
                    mainContainerStyle={{
                        marginTop: 20,
                        borderRadius: SIZES.padding,
                        width: '88%',
                        alignSelf: 'center'
                    }}
                    itemContainerStyle={{ backgroundColor: COLORS.white, margin: 5 }}
                />
                <FormInput
                    label={'Description'}
                    value={reason}
                    onChange={text => {
                        setReason(text);
                    }}
                    multiline
                    placeholder={'Enter the reason for deletion (Optional)'}
                    keyboardType="email-address"
                    returnKeyType={"go"}
                    inputContainerStyle={{
                        height: 150,
                        // marginTop:20,

                    }}
                    containerStyle={{
                        marginTop: 20,

                    }}
                />

            </ScrollView>
            <TextButton
                border={false}
                icon={images.delet}
                buttonContainerStyle={{
                    height: 55,
                    alignItems: 'center',
                    marginBottom: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.red
                }}
                onPress={() => {
                    Alert.alert(
                        "Account Logout",
                        "Are you sure you want to Logout?",
                        [
                            {
                                text: "Cancel & Go to Herd",
                                onPress: () => {
                                    props.navigation.closeDrawer();
                                    props.navigation.navigate('Herds');
                                },
                                style: "cancel"
                            },
                            {
                                text: "Delete the whole data", onPress: () => { deleteUser() },
                                style: "destructive"
                            }
                        ]
                    );
                }}
                label={'Delete'}
            // disabled={!isEnableSignIn()}
            />

        </View>
    )
}