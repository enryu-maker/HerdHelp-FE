import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {images, SIZES, FONTS, COLORS} from '../../Components/Constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import TextButton from '../../Components/TextButton';
import { useSelector } from 'react-redux';
export default function ReportFilter({
  show,
  setShow,
  setSpec,
  setVacc,
  setMed,
  vacc,
  med,
}) {
  const [species, setSpecies] = React.useState(null);
  // const [animal, setAnimal] = React.useState([]);
  const updateStatus = value => {
    setSpecies(value);
    setSpec(value);
  };
  const animal = useSelector(state=>state.Reducers.cat)
  
  function renderHeader() {
    return (
      <Header
      leftComponent={
        <View
          style={{
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              marginLeft: 25,
              backgroundColor:COLORS.Primary,
              height:40,
              width:40,
              justifyContent:"center",
              borderRadius:40/2,
              }}
            onPressIn={() => {
              setShow(false);
            }}>
            <Image
              source={images.x}
              style={{width: 20, height: 20, tintColor: COLORS.white,alignSelf:"center"}}
            />
          </TouchableOpacity>
        </View>
      }
        title={'Filter'}
        titleStyle={{
          marginRight:60,
          alignSelf:"center"
        }}
      />
    );
  }
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
          animationIn="zoomIn"
          animationOut="zoomOut"
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
      transparent={true}
      animationType={'slide'}
      visible={show}
      onRequestClose={() => {
        setShow(false);
      }}>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#00000040',
          justifyContent: 'flex-end',
          alignSelf: 'center',
        }}
        // onStartShouldSetResponder={() => {
        //   setShow(false);
        // }}
      >
        <View
          style={{
            height: '88%',
            width: '100%',
            backgroundColor: COLORS.white,
            alignSelf: 'center',
            borderTopLeftRadius: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
          }}>
          {renderHeader()}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              marginTop: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              paddingBottom: 10,
            }}>
            {catFilter()}
            {buttonFilter()}
          </KeyboardAwareScrollView>
          <View
            style={{
              flexDirection: 'row',
              // flex: 1,
              // alignSelf: 'center',
              justifyContent: "space-evenly",
              // position: 'relative',
              // alignContent:"center",
              marginBottom:SIZES.height>700?30:20
            }}>
            <TextButton
              onPress={() => {
                setShow(false);
              }}
              icon={images.correct}
              buttonContainerStyle={{
                height: 60,
                width: 180,
                marginTop: SIZES.padding,
                // marginHorizontal: SIZES.padding,
                // marginBottom: SIZES.padding + 10,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.Primary,
              }}
              label={'Apply'}
            />
            <TextButton
              onPress={() => {
                setMed('');
                setSpec('');
                setVacc('');
              }}
              icon={images.cancel}
              buttonContainerStyle={{
                height: 60,
                width: 140,
                marginTop: SIZES.padding,
                // marginHorizontal: SIZES.padding,
                // marginBottom: SIZES.padding + 10,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.Primary,
              }}
              label={'Clear'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
