import {View, Text, TouchableOpacity, Image,Alert} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axiosIns from '../../helpers/helpers';
import {COLORS, images, SIZES, FONTS} from '../../Components/Constants';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import CustomAlert from '../../Components/CustomAlert';
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux';
import { getHerds } from '../../Store/actions';
export const Weight =({ navigation,route})=> {
  const [tag, setTag] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [weight, setWeight] = React.useState(0);
  const [species, setSpcies] = React.useState([]);
  const [id, setId] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [validation, setValidation] = React.useState(false);
  const [dataText,setDataText] = React.useState("")
  const unit = JSON.parse(useSelector(state => state.Reducers.unit))
  const animals = useSelector(state => state.Reducers.cat)
  const tagl = useSelector(state => state.Reducers.tags)

  React.useEffect(() => {
      setId(global.id)
  },[]);
  function finder(list, value) {
    var dataValue;
    list?.map(a => {
      if (value == a.label) {
        dataValue = a.data;
      }
    });
    return dataValue;
  }
  const dispatch = useDispatch()
  const clear=()=>{
    setSpcies([])
    setWeight("")
    setTag([])
  }
  async function updateWeight(){
    if (tag!="",weight!=0){
      setLoading(true)
      try{
        await axiosIns.patch(`animals/${id}${species}${tag}`,{
          'weight': unit==true?weight: Math.round(weight/0.45359237),
          'weight_kg':unit==false?weight: Math.round(weight*0.45359237),
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((Response)=>{
          if (Response.status==200){
            dispatch(getHerds())
            setLoading(false)
            showMessage({
              message: "Weight Updated",
              type: "default",
              backgroundColor: COLORS.Primary,
              color:COLORS.white,
              titleStyle:{
                alignSelf:"center",
                ...FONTS.h3
              },
              animationDuration:250,
              icon:"success",
              style:{
                justifyContent:"center"
              }
            });
            clear()
          }
          else{
          setLoading(false)
          showMessage({
            message: `Animal with tag ${tag} not found here`,
            type: "default",
            backgroundColor: COLORS.red,
            color:COLORS.white,
            titleStyle:{
              alignSelf:"center",
              ...FONTS.h3
            },
            animationDuration:250,
            icon:"danger",
            style:{
              justifyContent:"center"
            }
          });
          }
        })
      }catch(err){
        setLoading(false)
        showMessage({
          message: `${err.response.data.msg}`,
          type: "default",
          backgroundColor: COLORS.red,
          color:COLORS.white,
          titleStyle:{
            alignSelf:"center",
            ...FONTS.h3
          },
          animationDuration:250,
          icon:"danger",
          style:{
            justifyContent:"center"
          }
        });
      }
    }
    else{
      setLoading(false)
      showMessage({
        message: `Please Enter valid Data`,
        type: "default",
        backgroundColor: COLORS.red,
        color:COLORS.white,
        titleStyle:{
          alignSelf:"center",
          ...FONTS.h3
        },
        animationDuration:250,
        icon:"danger",
        style:{
          justifyContent:"center"
        }
      });
    }
  }
  function renderHeader() {
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
                backgroundColor:COLORS.Primary,
                height:40,
                width:40,
                justifyContent:"center",
                borderRadius:40/2,
                }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Update Weight'}
      />
    );
  }
  function renderForm() {
    return (
      <View
        style={{
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <Dropdown
        dropdownIcon={images.down}
        dropdownIconSize={22}
          label="Species"
          borderRadius={SIZES.radius}
          data={animals}
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
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          value={species}
          onChange={(value)=>{
            setSpcies(value)
          }}
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center'
          }}
          itemContainerStyle={{backgroundColor: COLORS.white, margin: 5}}
        />
        <Dropdown
          label="Tags"
          dropdownIcon={images.down}
          dropdownIconSize={22}
          borderRadius={SIZES.radius}
          data={finder(tagl,species)}
          textInputStyle={(FONTS.body2, {letterSpacing: 2})}
          selectedItemTextStyle={(FONTS.body3, {color: COLORS.white})}
          selectedItemViewStyle={{
            backgroundColor: COLORS.Primary,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
          // enableAvatar
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          avatarSize={28}
          value={tag}
          onChange={(value) => {
            setTag(value);
          }}
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{
            backgroundColor: COLORS.white,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
        />
        <FormInput
        returnKeyType={"go"}
          prependComponent={
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                marginLeft: 0,
              }}>
              <Image
                source={unit==true?images.kg:images.scale}
                style={{width: 28, height: 28, tintColor: COLORS.Primary}}
              />
            </View>
          }
          keyboardType="numeric"
          label="Weight"
          value={weight}
          onChange={value => {
            value=parseInt(value.replace(/,/g,""))
            setWeight(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
        {show &&
        <CustomAlert show={show} setShow={setShow} validation={validation} label={dataText}/>
        } 
      {renderHeader()}
      <KeyboardAwareScrollView
        keyboardDismissMode="interactive"
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 40,
        }}>
        {renderForm()}
      </KeyboardAwareScrollView>

      <TextButton
        onPress={() => {
          updateWeight()         
        }}
        icon={images.weight}
        loading={loading}
        buttonContainerStyle={{
          marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            marginBottom: SIZES.padding,
            borderTopLeftRadius: SIZES.radius,
            borderTopRightRadius: SIZES.radius,
            backgroundColor: COLORS.Primary,
        }}
        label={'Update Weight'}
      />
    </View>
  );
}
