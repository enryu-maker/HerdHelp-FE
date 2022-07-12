import React from 'react';
import {
    View,
    Text,
    Animated,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
    Platform,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView
} from 'react-native';

import TextButton from '../../Components/TextButton';
import { COLORS, FONTS, SIZES } from "../../Components/Constants";
import { images } from '../../Components/Constants';
import LineDivider from '../../Components/LineDivider';
import { useSelector } from 'react-redux';
import {Dropdown} from 'sharingan-rn-modal-dropdown';

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

const FilterModal = ({ 
    isVisible, 
    onClose,
    setSpec,
    setVacc,
    setMed,
    vacc,
    med, 
}) => {

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
    const [species, setSpecies] = React.useState(null);
  // const [animal, setAnimal] = React.useState([]);
  const updateStatus = value => {
    setSpecies(value);
    setSpec(value);
  };
  const animal = useSelector(state=>state.Reducers.cat)
    function catFilter() {
        return (
          <View
            style={{
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2,
            }}>
            <Dropdown
              label="Cateogry"
              borderRadius={SIZES.radius}
              data={animal}
              dropdownIcon={images.down}
              dropdownIconSize={22}
              textInputStyle={(FONTS.body2, {letterSpacing: 2})}
              selectedItemTextStyle={
                (FONTS.body3,
                {color: COLORS.white, letterSpacing: 2, alignSelf: 'center'})
              }
              selectedItemViewStyle={{
                backgroundColor: COLORS.Primary,
                margin: 5,
                borderRadius: SIZES.radius,
              }}
              disableSelectionTick
              primaryColor={COLORS.Primary}
              value={species}
              onChange={updateStatus}
              animationIn="bounceInLeft"
              animationOut="bounceOutLeft"
              mainContainerStyle={{
                borderRadius: SIZES.padding,
                width: '88%',
                alignSelf: 'center'
              }}
              itemContainerStyle={{
                backgroundColor: COLORS.white,
                margin: 5,
              }}
            />
          </View>
        );
      }
      function buttonFilter(){
        return(
          <View
            style={{
              marginTop:15,
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2,
            }}>
          <View style={{
            flex:1,
            flexDirection:"row",
            justifyContent:"space-evenly",
            marginTop:10
          }}>
          <TouchableOpacity
          style={{
            backgroundColor:vacc?COLORS.Primary:COLORS.transparentPrimary,
            height:50,
            width:120,
            borderRadius:SIZES.radius,
            justifyContent:"center",
            alignItems:"center"
          }}
          onPress={()=>{
            setVacc(!vacc)
          }}
          >
            <Text style={{
              ...FONTS.h3,
              color:vacc?COLORS.white:COLORS.black
            }}>Vaccinated</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{
            backgroundColor:med? COLORS.Primary:COLORS.transparentPrimary,
            height:50,
            width:120,
            borderRadius:SIZES.radius,
            justifyContent:"center",
            alignItems:"center"
            // alignSelf:"center"
          }}
          onPress={()=>{
            setMed(!med)
          }}
          >
           <Text style={{
              ...FONTS.h3,
              color:med?COLORS.white:COLORS.black
            }}>Medicated</Text>
          </TouchableOpacity>
          
          </View>
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
                    <ScrollView>
                        {
                            catFilter()
                        }
                        {
                            buttonFilter()
                        }
                    </ScrollView>
                    
                    
                    {/* Apply Button */}
                    <View
                        style={{
                            // position: 'absolute',
                            bottom: Platform.OS === 'ios' ? (SIZES.height > 700 ? 150 : 90) : 80,
                            left: 0,
                            right: 0,
                            height: 110,
                            // paddingHorizontal: SIZES.padding,
                            // paddingVertical: SIZES.radius,
                            // backgroundColor: COLORS.white,
                        }}
                    >
                        <TextButton
                            icon={images.correct}
                            border={false}
                            label="Apply Filters"
                            buttonContainerStyle={{
                                height: 50,
                                borderRadius: SIZES.base,
                                backgroundColor: COLORS.Primary
                            }}
                            onPress={() => setShowFilterModal(false)}
                        />
                        <TextButton
                            icon={images.cancel}
                            border={false}
                            label="Remove Filters"
                            buttonContainerStyle={{
                                height: 50,
                                borderRadius: SIZES.base,
                                backgroundColor: COLORS.red,
                                margin:10
                            }}
                            onPress={() => {
                                setMed('');
                                setSpec('');
                                setVacc('');
                                setShowFilterModal(false)
                              }}
                        />
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}

export default FilterModal;