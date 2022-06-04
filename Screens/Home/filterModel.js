import React from 'react';
import {
    View,
    Text,
    Animated,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
    Platform,
    KeyboardAvoidingView
} from 'react-native';

import TextButton from '../../Components/TextButton';
import { COLORS, FONTS, SIZES } from "../../Components/Constants";
import LineDivider from '../../Components/LineDivider';

const Section = ({ containerStyle, title, children }) => {
    return (
        <View
            style={{
                marginTop: SIZES.padding,
                ...containerStyle
            }}
        >
            <Text style={{ ...FONTS.h3 }}>{title}</Text>

            {children}
        </View>
    )
}

const FilterModal = ({ isVisible, onClose }) => {

    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current

    const [showFilterModal, setShowFilterModal] = React.useState(isVisible)

    const [deliveryTime, setDeliveryTime] = React.useState("")
    const [ratings, setRatings] = React.useState("")
    const [tags, setTags] = React.useState("")

    React.useEffect(() => {
        if (showFilterModal) {
            Animated.timing(modalAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start(() => onClose());
        }
        // console.log(isVisible)
    }, [showFilterModal])

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, SIZES.height > 700 ? SIZES.height - 680 : SIZES.height - 580]
    })
    function renderGender(){
        return(
            <View
                style={{
                    flexDirection: 'row',
                    height: 50,
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    marginBottom:20,
                    borderBottomEndRadius:SIZES.radius,
                    borderBottomStartRadius:SIZES.radius
                }}
            >
                <TextButton
                    buttonContainerStyle={{
                        flex: 1,
                        borderRadius: SIZES.radius,
                        // backgroundColor: (selectedTab == 'history') ? COLORS.Primary : COLORS.transparentPrimary2
                        backgroundColor:COLORS.transparentPrimary
                    }}
                    label="Male"
                    labelStyle={{
                        // color: (selectedTab == 'history') ? COLORS.white : COLORS.primary
                    }}
                    onPress={() => {
                        // setSelectedTab("history")
                        // setOrders(dummyData.orderHistories)
                    }}
                />
    
                <TextButton
                    buttonContainerStyle={{
                        flex: 1,
                        marginLeft: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor:COLORS.transparentPrimary
                        // backgroundColor: (selectedTab == 'upcoming') ? COLORS.primary : COLORS.transparentPrimary9
                    }}
                    label="Female"
                    labelStyle={{
                        // color: (selectedTab == 'upcoming') ? COLORS.white : COLORS.Primary
                    }}
                    onPress={() => {
                        // setSelectedTab("upcoming")
                        // setOrders(dummyData.upcomingOrders)
                    }}
                />
            </View>
        )
    }
    function renderSpecies(){
        return(
            <View style={{
                flexDirection:"column",
            }}>
                <View
                style={{
                    flexDirection:"row",
                    height: 50,
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    marginBottom:20,
                    borderBottomEndRadius:SIZES.radius,
                    borderBottomStartRadius:SIZES.radius
                }}
            >
                <TextButton
                    buttonContainerStyle={{
                        flex: 1,
                        borderRadius: SIZES.radius,
                        // backgroundColor: (selectedTab == 'history') ? COLORS.Primary : COLORS.transparentPrimary2
                        backgroundColor:COLORS.transparentPrimary
                    }}
                    label="Cow"
                    labelStyle={{
                        // color: (selectedTab == 'history') ? COLORS.white : COLORS.primary
                    }}
                    onPress={() => {
                        // setSelectedTab("history")
                        // setOrders(dummyData.orderHistories)
                    }}
                />
    
                <TextButton
                    buttonContainerStyle={{
                        flex: 1,
                        marginLeft: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor:COLORS.transparentPrimary
                        // backgroundColor: (selectedTab == 'upcoming') ? COLORS.primary : COLORS.transparentPrimary9
                    }}
                    label="Goat"
                    labelStyle={{
                        // color: (selectedTab == 'upcoming') ? COLORS.white : COLORS.Primary
                    }}
                    onPress={() => {
                        // setSelectedTab("upcoming")
                        // setOrders(dummyData.upcomingOrders)
                    }}
                /></View>
                <View
                style={{
                    flexDirection:"row",
                    height: 50,
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    marginBottom:20,
                    borderBottomEndRadius:SIZES.radius,
                    borderBottomStartRadius:SIZES.radius
                }}
            >
                <TextButton
                    buttonContainerStyle={{
                        flex: 1,
                        // marginLeft: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor:COLORS.transparentPrimary
                        // backgroundColor: (selectedTab == 'upcoming') ? COLORS.primary : COLORS.transparentPrimary9
                    }}
                    label="Pig"
                    labelStyle={{
                        // color: (selectedTab == 'upcoming') ? COLORS.white : COLORS.Primary
                    }}
                    onPress={() => {
                        // setSelectedTab("upcoming")
                        // setOrders(dummyData.upcomingOrders)
                    }}
                />
                <TextButton
                    buttonContainerStyle={{
                        flex: 1,
                        marginLeft: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor:COLORS.transparentPrimary
                        // backgroundColor: (selectedTab == 'upcoming') ? COLORS.primary : COLORS.transparentPrimary9
                    }}
                    label="Dog"
                    labelStyle={{
                        // color: (selectedTab == 'upcoming') ? COLORS.white : COLORS.Primary
                    }}
                    onPress={() => {
                        // setSelectedTab("upcoming")
                        // setOrders(dummyData.upcomingOrders)
                    }}
                />
            </View>
            <View
                style={{
                    flexDirection:"row",
                    height: 50,
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    marginBottom:20,
                    borderBottomEndRadius:SIZES.radius,
                    borderBottomStartRadius:SIZES.radius
                }}
            >
                <TextButton
                    buttonContainerStyle={{
                        flex: 1,
                        // marginLeft: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor:COLORS.transparentPrimary
                        // backgroundColor: (selectedTab == 'upcoming') ? COLORS.primary : COLORS.transparentPrimary9
                    }}
                    label="Sheep"
                    labelStyle={{
                        // color: (selectedTab == 'upcoming') ? COLORS.white : COLORS.Primary
                    }}
                    onPress={() => {
                        // setSelectedTab("upcoming")
                        // setOrders(dummyData.upcomingOrders)
                    }}
                />
                <TextButton
                    buttonContainerStyle={{
                        flex: 1,
                        marginLeft: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor:COLORS.transparentPrimary
                        // backgroundColor: (selectedTab == 'upcoming') ? COLORS.primary : COLORS.transparentPrimary9
                    }}
                    label="Chicken"
                    labelStyle={{
                        // color: (selectedTab == 'upcoming') ? COLORS.white : COLORS.Primary
                    }}
                    onPress={() => {
                        // setSelectedTab("upcoming")
                        // setOrders(dummyData.upcomingOrders)
                    }}
                />
            </View>
            <View
                style={{
                    flexDirection:"row",
                    height: 50,
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    marginBottom:20,
                    borderBottomEndRadius:SIZES.radius,
                    borderBottomStartRadius:SIZES.radius
                }}
            >
                <TextButton
                    buttonContainerStyle={{
                        flex: 1,
                        // marginLeft: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor:COLORS.transparentPrimary
                        // backgroundColor: (selectedTab == 'upcoming') ? COLORS.primary : COLORS.transparentPrimary9
                    }}
                    label="Rabbit"
                    labelStyle={{
                        // color: (selectedTab == 'upcoming') ? COLORS.white : COLORS.Primary
                    }}
                    onPress={() => {
                        // setSelectedTab("upcoming")
                        // setOrders(dummyData.upcomingOrders)
                    }}
                />
                <TextButton
                    buttonContainerStyle={{
                        flex: 1,
                        marginLeft: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor:COLORS.transparentPrimary
                        // backgroundColor: (selectedTab == 'upcoming') ? COLORS.primary : COLORS.transparentPrimary9
                    }}
                    label="Horse"
                    labelStyle={{
                        // color: (selectedTab == 'upcoming') ? COLORS.white : COLORS.Primary
                    }}
                    onPress={() => {
                        // setSelectedTab("upcoming")
                        // setOrders(dummyData.upcomingOrders)
                    }}
                />
            </View>
            </View>
        )
    }
    function renderTabButtons() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 50,
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    marginBottom:20,
                    borderBottomEndRadius:SIZES.radius,
                    borderBottomStartRadius:SIZES.radius
                }}
            >
                <TextButton
                    buttonContainerStyle={{
                        flex: 1,
                        borderRadius: SIZES.radius,
                        // backgroundColor: (selectedTab == 'history') ? COLORS.Primary : COLORS.transparentPrimary2
                        backgroundColor:COLORS.transparentPrimary
                    }}
                    label="Breed"
                    labelStyle={{
                        // color: (selectedTab == 'history') ? COLORS.white : COLORS.primary
                    }}
                    onPress={() => {
                        // setSelectedTab("history")
                        // setOrders(dummyData.orderHistories)
                    }}
                />
    
                <TextButton
                    buttonContainerStyle={{
                        flex: 1,
                        marginLeft: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor:COLORS.transparentPrimary
                        // backgroundColor: (selectedTab == 'upcoming') ? COLORS.primary : COLORS.transparentPrimary9
                    }}
                    label="Purchased"
                    labelStyle={{
                        // color: (selectedTab == 'upcoming') ? COLORS.white : COLORS.Primary
                    }}
                    onPress={() => {
                        // setSelectedTab("upcoming")
                        // setOrders(dummyData.upcomingOrders)
                    }}
                />
            </View>
        )
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.Primary
                }}
            >
                {/* Transparent Background */}
                <TouchableWithoutFeedback
                    onPress={() => setShowFilterModal(false)}
                >
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}
                    />
                </TouchableWithoutFeedback>

                <Animated.View
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: modalY,
                        width: "100%",
                        height: "100%",
                        padding: SIZES.padding,
                        borderTopRightRadius: SIZES.padding,
                        borderTopLeftRadius: SIZES.padding,
                        backgroundColor: COLORS.white,
                        // paddingBottom:30
                    }}
                >
                    <View style={{flex:1}}>
                    <ScrollView
        // style={{flex:1}}
        contentContainerStyle={{paddingBottom:250}}
        showsVerticalScrollIndicator={false}
        
        >
                        <KeyboardAvoidingView behavior="position">
                    {/* <Text style={ [FONTS.body3,{letterSpacing:2,padding:8}]}>Type of Animal</Text>
                    {renderTabButtons()}
                    <LineDivider
                    lineStyle={{width:"98%",alignSelf:"center"}}/> */}
                    <Text style={ [FONTS.body3,{letterSpacing:2,padding:8}]}>Gender</Text>
                    {renderGender()}
                    <LineDivider
                    lineStyle={{width:"98%",alignSelf:"center"}}/>
                    
                    <Text style={ [FONTS.body3,{letterSpacing:2,padding:8}]}>Species</Text>
                    
                        {renderSpecies()}
                    <LineDivider
                    lineStyle={{width:"98%",alignSelf:"center"}}/>
                        </KeyboardAvoidingView>
                    
                    </ScrollView>
                    </View>
                    
                    {/* Apply Button */}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: Platform.OS === 'ios' ? (SIZES.height > 700 ? 150 : 75) : 80,
                            left: 0,
                            right: 0,
                            height: 110,
                            paddingHorizontal: SIZES.padding,
                            paddingVertical: SIZES.radius,
                            backgroundColor: COLORS.white
                        }}
                    >
                        <TextButton
                            label="Apply Filters"
                            buttonContainerStyle={{
                                height: 50,
                                borderRadius: SIZES.base,
                                backgroundColor: COLORS.Primary
                            }}
                            onPress={() => setShowFilterModal(false)}
                        />
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}

export default FilterModal;