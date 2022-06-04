import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import {images, COLORS, SIZES, FONTS, Bred} from '../../Components/Constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormDateInput from '../../Components/FormDateInput';
import axiosIns from '../../helpers/helpers';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import { showMessage, hideMessage } from "react-native-flash-message";
import CustomAlert from '../../Components/CustomAlert';
import { useDispatch, useSelector } from 'react-redux';
import { getMedical } from '../../Store/actions';
export const Medication = ({navigation, route}) => {
  const [tag, setTag] = React.useState('');
  const [treat, setTreat] = React.useState('');
  const [treatt, setTreatt] = React.useState('');
  const [Dis, setDis] = React.useState('');
  const [med, setMed] = React.useState('');
  const [dos, setDos] = React.useState('');
  const [withdraw, setWithdraw] = React.useState(false);
  const [date, setDate] = React.useState('');
  const [datet, setDatet] = React.useState('');
  const [species, setSpcies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [id, setId] = React.useState('');
  const [dataT,setDataT] = React.useState("");
  const [dataS,setDataS] = React.useState("");
  const tagl = useSelector(state => state.Reducers.tags)

  const [cond,setCond] = React.useState(false);
  const clear = () => {
    setMed("");
    setWithdraw("");
    setDis("");
    setTag("");
    setDos("");
  };
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
  function addMedical() {
    setLoading(true),
    axiosIns
      .post(
        'medication/',
        {
          tag_number:!cond?`${global.id}${dataS}${dataT}` : `${global.id}${species}${tag}`,
          medication_name: med,
          medication_date: treatt,
          dosage: dos,
          disease: Dis,
          withdrawal: withdraw,
          withdrawal_date: datet!=""? datet:null,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        if (response.status == 201) {
          setLoading(false)
          !cond?dispatch(getMedical(`${global.id}${dataS}${dataT}`)):null
          showMessage({
            message: "Medication Added",
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
        } else {
          setLoading(false),
          showMessage({
            message: "Animal Not Added",
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
      .catch(err => {
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
      });
  }
  React.useEffect(() => {
    setId(global.id);
    let {cond} = route.params
    setCond(cond)
    if (!cond){
      let {tag} = route.params
      setDataT(tag)
      let{species} = route.params
      setDataS(species)
    }
  }, []);
  const animals = useSelector(state => state.Reducers.cat)

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
                backgroundColor:COLORS.Primary,
                height:40,
                width:40,
                justifyContent:"center",
                borderRadius:40/2,
                }}
              onPress={() => {
                navigation.goBack() 
              }}>
              <Image
                source={images.back}
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Add Medication'}
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
        {
          cond?
          <><Dropdown
          label="Species"
          dropdownIcon={images.down}
          dropdownIconSize={22}
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
          disableSelectionTick
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          primaryColor={COLORS.Primary}
          value={species}
          onChange={(value)=>{
            setSpcies(value)
          }}
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
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
        </>:<View></View>
        }
        <FormInput
          prependComponent={
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Image
                source={images.disease}
                style={{width: 28, height: 28, tintColor: COLORS.Primary}}
              />
            </View>
          }
          returnKeyType={"next"}
          label="Reason for Medication?"
          value={Dis}
          onChange={(value) => {
            setDis(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
        <FormInput
        returnKeyType={"next"}
          prependComponent={
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Image
                source={images.medicines}
                style={{width: 28, height: 28, tintColor: COLORS.Primary}}
              />
            </View>
          }
          value={med}
          onChange={value => {
            setMed(value);
          }}
          label={'Medicine'}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
        <FormDateInput
        returnKeyType={"next"}
          label="Medication Date"
          placeholder="YYYY-MM-DD"
          value={treat}
          setDate={setTreat}
          formatDate={setTreatt}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
            width: '88%',
            alignSelf: 'center',
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
        <FormInput
        returnKeyType={"next"}
          prependComponent={
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Image
                source={images.dropper}
                style={{width: 28, height: 28, tintColor: COLORS.Primary}}
              />
            </View>
          }
          value={dos}
          onChange={(value) => {
            setDos(value);
          }}
          label={'Dosage'}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
        <Dropdown
          label="Withdrawal"
          dropdownIcon={images.down}
          dropdownIconSize={22}
          borderRadius={SIZES.radius}
          data={Bred}
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
          value={withdraw}
          onChange={(value) => {
            setWithdraw(value);
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

        {withdraw ? (
          <FormDateInput
            label="Withdrawal Date"
            placeholder="YYYY-MM-DD"
            value={date}
            setDate={setDate}
            formatDate={setDatet}
            containerStyle={{
              marginTop: SIZES.radius,
            }}
            inputContainerStyle={{
              backgroundColor: COLORS.white,
              width: '88%',
              alignSelf: 'center',
            }}
            inputStyle={{marginLeft: 20, fontSize: 16}}
          />
        ) : (
          <View></View>
        )}
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderheader()}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 40,
        }}>
        {renderForm()}
      </KeyboardAwareScrollView>
      <TextButton
        onPress={() => {
          addMedical();
        }}
        icon={images.med}
        loading={loading}
        buttonContainerStyle={{
          marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            marginBottom: SIZES.padding,
            borderTopLeftRadius: SIZES.radius,
            borderTopRightRadius: SIZES.radius,
            backgroundColor: COLORS.Primary,
        }}
        label={'Add Medication'}
      />
    </View>
  );
};
