import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS, images, Bred} from './Constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from './Header';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import TextButton from './TextButton';
import FormInput from './FormInput';
import axiosIns from '../helpers/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { getAnimal, getHerds } from '../Store/actions';
const Status = ({show, setShow, animal}) => {
  const [status, setStatus] = React.useState("Alive");
  const [Price, setPrice] = React.useState(0);
  const [loading, setloading] = React.useState(false);
  const [Flagged, setFlagged] = React.useState(animal.flagged);
  const [Flaggedesp, setFlaggedesp] = React.useState(animal.flag_desc);
  const [err, setErr] = React.useState('');
  const statusCat = useSelector(state=>state.Reducers.status)
  async function delAnimal() {
    try {
      await axiosIns.delete(`animals/${animal.tag_number}`);
    } catch (err) {
      setErr('Something Went Wrong');
    }
  }

  const dispatch = useDispatch()
  const updateAnimal = async () => {
      setloading(true)
      axiosIns
        .patch(
          `animals/${animal.tag_number}`,
          {
            status: status.toString(),
            soldprice: Price,
            tag_number: status.toString() == 'Alive' ? `${animal?.tag_number}` : status.toString() == 'Dead' ?`${animal.tag_number + "D"}`:`${animal.tag_number + "S"}`,
            flagged:Flagged,
            flag_desc:Flaggedesp
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(Response => {
          if (Response.status == 200) {
            setErr('Status Update sucessfully');
            setloading(false);
            dispatch(getHerds())
            dispatch(getAnimal(animal?.tag_number))
            if(status.toString()!="Alive"){
              delAnimal().then(() => {
                setShow(false);
                dispatch(getHerds())

              });
            }
          }

          else {
            setErr('Status Not Update');
            setloading(false);
          }
        })
        .catch(err=>{
          console.log(err)
          setErr(err.data.msg);
        })
  
  };
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
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
        }
      
        title={'Status'}
        titleStyle={{
          marginRight:60,
          alignSelf:"center"
        }}
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
        <Text
          style={{
            color: !loading ? COLORS.red : COLORS.Primary,
            alignSelf: 'center',
            ...FONTS.body3,
          }}>
          {err}
        </Text>
        <Dropdown
          label="Status"
          borderRadius={SIZES.radius}
          data={statusCat}
          textInputStyle={(FONTS.body2, {letterSpacing: 2})}
          dropdownIcon={images.down}
          dropdownIconSize={22}
          selectedItemTextStyle={
            (FONTS.body3,
            {color: COLORS.white, letterSpacing: 2, alignSelf: 'center'})
          }
          selectedItemViewStyle={{
            backgroundColor: COLORS.Primary,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
          // enableAvatar
          required
          disableSelectionTick
          primaryColor={COLORS.Primary}
          value={status}
          onChange={(value)=>{
            setStatus(value)
          }}
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{backgroundColor: COLORS.white, margin: 5}}
        />
        <FormInput
          prependComponent={
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Image
                source={images.coin}
                style={{width: 26, height: 26, tintColor: COLORS.Primary}}
              />
            </View>
          }
          label={'Amount*'}
          value={Price}
          onChange={value => {
            value = value.replace(/,/g,"")
            value=parseInt(value.replace(/$/g,""))
            setPrice(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
        <Dropdown
          label="Flagged"
          borderRadius={SIZES.radius}
          data={Bred}
          textInputStyle={(FONTS.body2, {letterSpacing: 2})}
          dropdownIcon={images.down}
          dropdownIconSize={22}
          selectedItemTextStyle={
            (FONTS.body3,
            {color: COLORS.white, letterSpacing: 2, alignSelf: 'center'})
          }
          selectedItemViewStyle={{
            backgroundColor: COLORS.Primary,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
          required
          disableSelectionTick
          primaryColor={COLORS.Primary}
          value={Flagged}
          onChange={(value)=>{
            setFlagged(value)
          }}
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{backgroundColor: COLORS.white, margin: 5}}
        />
        {
          Flagged?
        <FormInput
          prependComponent={
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Image
                source={images.add}
                style={{width: 26, height: 26, tintColor: COLORS.Primary}}
              />
            </View>
          }
          placeholder={animal.flag_desc}
          label={'Description*'}
          value={Flaggedesp}
          onChange={value => {
            setFlaggedesp(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />:null
  }
      </View>
    );
  }

  return (
    <Modal
      transparent={true}
      animationType={"slide"}
      visible={show}
      onRequestClose={() => {
        setShow(false);
      }}>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#00000040',
          justifyContent: "flex-end",
          alignSelf: 'center',
        }}>
        <View
          style={{
            height: '88%',
          width: '100%',
            backgroundColor: COLORS.white,
            alignSelf: 'center',
            borderTopLeftRadius: SIZES.padding,
            borderTopRightRadius:SIZES.padding,
          }}>
          {renderHeader()}
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              marginTop: SIZES.radius,
              paddingHorizontal: SIZES.padding,
            }}>
            {renderForm()}
          </KeyboardAwareScrollView>
          <TextButton
            onPress={() => {
              updateAnimal();
            }}
            border={false}
            icon={images.update}
            buttonContainerStyle={{
              // height: 60,
              marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            marginBottom: SIZES.padding,
            borderTopLeftRadius: SIZES.radius,
            borderTopRightRadius: SIZES.radius,
            backgroundColor: COLORS.Primary,
            }}
            label={'Update'}
            loading={loading}
          />
        </View>
        </View>
    </Modal>
  );
};
export default Status;
