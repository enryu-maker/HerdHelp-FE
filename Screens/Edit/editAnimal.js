import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import React, { useState, useRef } from 'react';
import Header from '../../Components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import axiosIns from '../../helpers/helpers';
import PickerType from '../Livestocks/PickerType';
import {
  COLORS,
  SIZES,
  catedata,
  FONTS,
  genderdata,
  images,
  Bred,
  Bought,
  days,
} from '../../Components/Constants';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import FormDateInput from '../../Components/FormDateInput';
import Toast from 'react-native-toast-message'
import { toastConfig } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { getAnimal, getHerds } from '../../Store/actions';
import { baseURL } from '../../helpers/helpers';
const EditAnimal = ({ navigation, route }) => {
  const unit = JSON.parse(useSelector(state => state.Reducers.unit));
  React.useEffect(() => {
    setId(global.id);
  }, []);
  const [bred, setBred] = useState(route.params.animal?.bred);
  const [valueMS, setValueMS] = useState(route.params.animal?.species);
  const [valueBS, setValueBS] = useState(route.params.animal?.gender);
  const [valueBST, setValueBST] = useState(route.params.animal?.gender_name);
  const [pdatet, setPdatet] = useState(route.params.animal?.purchased_date);
  const [pdate, setPdate] = useState('');


  const [age, setAge] = useState(route.params.animal?.age);
  const [Breed, setBreed] = useState(route.params.animal?.breed);
  const [tag, setTag] = useState(route.params.animal?.support_tag);
  const [price, setPrice] = useState(route.params.animal?.price);
  const [mother, setMother] = useState(route.params.animal?.mother_supporttag);
  const [father, setFather] = useState(route.params.animal?.father_supporttag);
  const [weight, setWeight] = useState(
    route.params.animal?.weight
  );
  const [name, setName] = useState(route.params.animal?.name);
  const [dob, setDob] = useState('');
  const [dobt, setDobt] = useState(route.params.animal?.birth_date);
  const [vaccinated, setVaccinated] = useState(route.params.animal?.vaccinated);
  const [vaccinateddate, setVaccinateddate] = useState('');
  const [day, setDay] = useState(Math.abs(days(new Date(dobt), new Date())));
  const [vaccinateddatet, setVaccinateddatet] = useState(
    route.params.animal?.vaccination_date,
  );
  const [bought, setBought] = useState(route.params.animal?.bought);
  const [loading, setLoading] = React.useState(false);
  const animals = useSelector(state => state.Reducers.cat);
  const [id, setId] = React.useState('');
  const [registration, setRegistration] = React.useState(
    route.params.animal?.registration,
  );
  const [showc, setshowc] = React.useState(false);
  const [pic, setPic] = React.useState('');
  const [picdata, setPicdata] = React.useState('');
  const [weight30, setWeight30] = useState(unit ? route.params.animal?.weight_30 : route.params.animal?.weight_30_kg);
  const [weight60, setWeight60] = useState(unit ? route.params.animal?.weight_60 : route.params.animal?.weight_60_kg);
  const [weight90, setWeight90] = useState(unit ? route.params.animal?.weight_90 : route.params.animal?.weight_90_kg);

  const onChangeMS = value => {
    setValueMS(value);
  };
  const onChangeVacc = value => {
    setVaccinated(value);
  };
  const onChangeBS = value => {
    setValueBS(value);
  };
  const onChangeB = value => {
    setBred(value);
  };
  const onChangebought = value => {
    setBought(value);
  };
  function isEnableSignIn() {
    return tag != '' && valueMS != '' && valueBS != '';
  }
  const clear = () => {
    setWeight('');
    setTag('');
    setRegistration('');
    setAge('');
    setBreed('');
    setMother('');
    setFather('');
    setPrice('');
    setName('');
  };
  const gender = useSelector(state => state.Reducers.gender)
  function finder(list, value) {
    var dataValue;
    list?.map(a => {
      if (value == a.label) {
        dataValue = a.data;
      }
    });
    return dataValue;
  }
  function findertype(list, value, type, setValue) {
    list?.map(a => {
      if (value == a.label) {
        a.data.map(a => {
          if (type == a.label) {
            setValue(a.type)
          }
        });
      }
    });
  }

  const dispatch = useDispatch();
  const data = JSON.stringify({
    name: name,
    registration: registration,
    gender: valueBS,
    gender_name: valueBST,
    species: valueMS,
    birth_date: dobt,
    mother_supporttag: mother != '' ? mother : '',
    mother_tagnumber: mother != '' ? `${id}${valueMS}${mother}` : '',
    father_supporttag: father != '' ? father : '',
    father_tagnumber: father != '' ? `${id}${valueMS}${father}` : '',
    breed: Breed,
    weight: unit == true ? weight : Math.round(weight / 0.45359237),
    weight_kg: unit == false ? weight : Math.round(weight * 0.45359237),
    weight_30: unit == true ? weight30 : Math.round(weight30 / 0.45359237),
    weight_30_kg: unit == false ? weight30 : Math.round(weight30 * 0.45359237),
    weight_60: unit == true ? weight60 : Math.round(weight60 / 0.45359237),
    weight_60_kg: unit == false ? weight60 : Math.round(weight60 * 0.45359237),
    weight_90: unit == true ? weight90 : Math.round(weight90 / 0.45359237),
    weight_90_kg: unit == false ? weight90 : Math.round(weight90 * 0.45359237),
    bred: bred,
    age: age,
    vaccinated: vaccinated,
    vaccination_date: vaccinateddatet,
    price: price,
    bought: bought,
    purchased_date: pdatet
  });


  async function postAnimal() {
    setLoading(true);
    if (isEnableSignIn()) {
      await axiosIns
        .patch(`animals/${route.params.animal?.tag_number}`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          if (response.status == 200) {
            clear();
            setLoading(false);
            Toast.show({
              text1: 'Animal Updated',
              type: 'success',
            });
            dispatch(getAnimal(route.params.animal?.tag_number))
            dispatch(getHerds());
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
          Toast.show({
            text1: `${err.response.data.msg}`,
            type: 'error'
          });
        });
    } else {
      setLoading(false);
      Toast.show({
        text1: `Required Fields cannot be empty`,
        type: 'error',
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
                backgroundColor: COLORS.Primary,
                height: 40,
                width: 40,
                justifyContent: 'center',
                borderRadius: 40 / 2,
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.white,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Edit Animal'}
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
        <FormInput
          prependComponent={
            <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
              <Image
                source={images.name}
                style={{ width: 26, height: 26, tintColor: COLORS.Primary }}
              />
            </View>
          }
          label="Name"
          value={name}
          returnKeyType={'next'}
          onChange={value => {
            setName(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputStyle={{ marginLeft: 20, fontSize: 16 }}
        />
        <Dropdown
          label="Species"
          dropdownIcon={images.down}
          dropdownIconSize={22}
          borderRadius={SIZES.radius}
          data={animals}
          returnKeyType={'next'}
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
          required
          disableSelectionTick
          primaryColor={COLORS.Primary}
          value={valueMS}
          onChange={onChangeMS}
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{ backgroundColor: COLORS.white, margin: 5 }}
        />
        <Dropdown
          label="Gender"
          dropdownIcon={images.down}
          dropdownIconSize={22}
          borderRadius={SIZES.radius}
          data={finder(gender, valueMS)}
          textInputStyle={(FONTS.body2, { letterSpacing: 2 })}
          selectedItemTextStyle={
            (FONTS.body3,
              { color: COLORS.white, letterSpacing: 2, alignSelf: 'center' })
          }
          selectedItemViewStyle={{
            backgroundColor: COLORS.Primary,
            marginTop: 5,
            borderRadius: SIZES.radius,
            height: 40,
          }}
          // enableAvatar
          required
          disableSelectionTick
          primaryColor={COLORS.Primary}
          value={valueBST}
          onChange={(value) => {
            setValueBST(value)
            findertype(gender, valueMS, value, setValueBS)
          }}
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{ backgroundColor: COLORS.white, margin: 5 }}
        />
        <Dropdown
          label="Purchased?"
          dropdownIcon={images.down}
          dropdownIconSize={22}
          borderRadius={SIZES.radius}
          data={Bought}
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
          // enableAvatar
          required
          // showLoader
          // mode="outlined"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          // avatarSize={28}
          value={bought}
          onChange={onChangebought}
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{ backgroundColor: COLORS.white, margin: 5 }}
        />
        {bought != true ? (
          <View>
            <FormDateInput
              label="Date of Birth"
              placeholder="YYYY-MM-DD"
              value={new Date(dobt)}
              setDate={setDob}
              formatDate={setDobt}
              setDays={setDay}
              returnKeyType={'next'}
              containerStyle={{
                marginTop: SIZES.radius,
                // marginLeft:20
              }}
              inputContainerStyle={{
                backgroundColor: COLORS.white,
                width: '88%',
                alignSelf: 'center',
              }}
              inputStyle={{ marginLeft: 20, fontSize: 16 }}
            />
            <FormInput
              prependComponent={
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginLeft: 0,
                  }}>
                  <Image
                    source={unit === true ? images.kg : images.scale}
                    style={{ width: 28, height: 28, tintColor: COLORS.Primary }}
                  />
                </View>
              }
              label="Weight"
              placeholder={weight.toString()}
              returnKeyType={'next'}
              value={weight}
              keyboardType="numeric"
              onChange={value => {
                value = parseInt(value.replace(/,/g, ''));
                if (day < 35 && day > 25) {
                  setWeight30(value)
                  setWeight(value);
                }
                else if (day < 65 && day > 55) {
                  setWeight60(value)
                  setWeight(value)
                }
                else if (day < 95 && day > 85) {
                  setWeight90(value)
                  setWeight(value)
                }
                else {
                  setWeight(value);
                }
              }}
              containerStyle={{
                marginTop: SIZES.radius,
              }}
              inputContainerStyle={{
                backgroundColor: COLORS.white,
              }}
              inputStyle={{ marginLeft: 20, fontSize: 16 }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <FormInput
                returnKeyType={'next'}
                label="30 Day"
                value={weight30}
                keyboardType="numeric"
                placeholder={weight30.toString()}
                onChange={value => {
                  value = parseInt(value.replace(/,/g, ''));
                  if (day < 35 && day > 25) {
                    setWeight30(value)
                    setWeight(value);
                  }
                  else {
                    setWeight30(value)
                  }
                }}
                containerStyle={{
                  marginTop: SIZES.radius,
                  width: 90,
                }}
                inputContainerStyle={{
                  backgroundColor: COLORS.white,
                }}
                inputStyle={{ fontSize: 16 }}
              />
              <FormInput
                returnKeyType={'next'}
                label="60 Day"
                value={weight60}
                keyboardType="numeric"
                placeholder={weight60.toString()}

                onChange={value => {
                  value = parseInt(value.replace(/,/g, ''));
                  if (day < 65 && day > 55) {
                    setWeight60(value)
                    setWeight(value);
                  }
                  else {
                    setWeight60(value)
                  }
                }}
                containerStyle={{
                  marginTop: SIZES.radius,
                  width: 90,
                }}
                inputContainerStyle={{
                  backgroundColor: COLORS.white,
                }}
                inputStyle={{ fontSize: 16 }}
              />
              <FormInput
                returnKeyType={'next'}
                label="90 Day"
                value={weight90}
                placeholder={weight90.toString()}
                keyboardType="numeric"
                onChange={value => {
                  value = parseInt(value.replace(/,/g, ''));
                  if (day < 95 && day > 85) {
                    setWeight90(value)
                    setWeight(value);
                  }
                  else {
                    setWeight90(value)
                  }
                }}
                containerStyle={{
                  marginTop: SIZES.radius,
                  width: 90,
                }}
                inputContainerStyle={{
                  backgroundColor: COLORS.white,
                }}
                inputStyle={{ fontSize: 16 }}
              />
            </View>
            <FormInput
              prependComponent={
                <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                  <Image
                    source={images.tag}
                    style={{ width: 26, height: 26, tintColor: COLORS.Primary }}
                  />
                </View>
              }
              label="Mother Tag Number"
              value={mother}
              placeholder={mother}
              returnKeyType={'next'}
              // keyboardType="numeric"
              onChange={value => {
                setMother(value);
              }}
              inputContainerStyle={{
                backgroundColor: COLORS.white,
              }}
              containerStyle={{
                marginTop: SIZES.radius,
              }}
              inputStyle={{ marginLeft: 20, fontSize: 16 }}
            />
            <FormInput
              prependComponent={
                <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                  <Image
                    source={images.tag}
                    style={{ width: 26, height: 26, tintColor: COLORS.Primary }}
                  />
                </View>
              }
              label="Father Tag Number"
              value={father}
              placeholder={father}
              onChange={value => {
                setFather(value);
              }}
              inputContainerStyle={{
                backgroundColor: COLORS.white,
              }}
              containerStyle={{
                marginTop: SIZES.radius,
              }}
              inputStyle={{ marginLeft: 20, fontSize: 16 }}
            />
            <Dropdown
              label="Vaccinated"
              dropdownIcon={images.down}
              dropdownIconSize={22}
              borderRadius={SIZES.radius}
              data={Bred}
              textInputStyle={(FONTS.body2, { letterSpacing: 2 })}
              selectedItemTextStyle={(FONTS.body3, { color: COLORS.white })}
              selectedItemViewStyle={{
                backgroundColor: COLORS.Primary,
                margin: 5,
                borderRadius: SIZES.radius,
              }}
              disableSelectionTick
              animationIn="bounceInLeft"
              animationOut="bounceOutLeft"
              primaryColor={COLORS.Primary}
              avatarSize={28}
              value={vaccinated}
              onChange={onChangeVacc}
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
            {vaccinated ? (
              <FormDateInput
                label="Date of Vaccination"
                placeholder="YYYY-MM-DD"
                value={new Date(vaccinateddatet)}
                setDate={setVaccinateddate}
                formatDate={setVaccinateddatet}
                containerStyle={{
                  marginTop: SIZES.radius,
                  // marginLeft:20
                }}
                inputContainerStyle={{
                  backgroundColor: COLORS.white,
                  width: '88%',
                  alignSelf: 'center',
                }}
                inputStyle={{ marginLeft: 20, fontSize: 16 }}
              />
            ) : (
              <View></View>
            )}
            <FormInput
              prependComponent={
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginLeft: 0,
                  }}>
                  <Image
                    source={images.dog}
                    style={{ width: 28, height: 28, tintColor: COLORS.Primary }}
                  />
                </View>
              }
              label="Breed"
              returnKeyType={'next'}
              value={Breed}
              onChange={value => {
                setBreed(value);
              }}
              containerStyle={{
                marginTop: SIZES.radius,
              }}
              inputContainerStyle={{
                backgroundColor: COLORS.white,
              }}
              inputStyle={{ marginLeft: 20, fontSize: 16 }}
            />
            <FormInput
              prependComponent={
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginLeft: 0,
                  }}>
                  <Image
                    source={images.name}
                    style={{ width: 28, height: 28, tintColor: COLORS.Primary }}
                  />
                </View>
              }
              label="Registration"
              value={registration}
              onChange={value => {
                setRegistration(value);
              }}
              containerStyle={{
                marginTop: SIZES.radius,
              }}
              inputContainerStyle={{
                backgroundColor: COLORS.white,
              }}
              inputStyle={{ marginLeft: 20, fontSize: 16 }}
            />
          </View>
        ) : (
          <View>
            <FormDateInput
              label="Date of Purchase"
              placeholder="YYYY-MM-DD"
              value={new Date(pdatet)}
              setDate={setPdate}
              formatDate={setPdatet}
              containerStyle={{
                marginTop: SIZES.radius,
              }}
              inputContainerStyle={{
                backgroundColor: COLORS.white,
                width: '88%',
                alignSelf: 'center',
              }}
              inputStyle={{ marginLeft: 20, fontSize: 16 }}
            />
            <FormInput
              prependComponent={
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginLeft: 0,
                  }}>
                  <Image
                    source={images.coin}
                    style={{ width: 28, height: 28, tintColor: COLORS.Primary }}
                  />
                </View>
              }
              placeholder={JSON.stringify(price)}
              label="Price"
              value={price}
              returnKeyType={'next'}
              keyboardType="numeric"
              onChange={value => {
                // const v = value
                value = value.replace(/,/g, '');
                value = parseInt(value.replace(/$/g, ''));
                setPrice(value);
              }}
              containerStyle={{
                marginTop: SIZES.radius,
              }}
              inputContainerStyle={{
                backgroundColor: COLORS.white,
              }}
              inputStyle={{ marginLeft: 20, fontSize: 16 }}
            />
            <FormInput
              prependComponent={
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginLeft: 0,
                  }}>
                  <Image
                    source={images.age}
                    style={{ width: 28, height: 28, tintColor: COLORS.Primary }}
                  />
                </View>
              }
              returnKeyType={'next'}
              label="Age"
              value={age}
              onChange={value => {
                setAge(value);
              }}
              containerStyle={{
                marginTop: SIZES.radius,
              }}
              inputContainerStyle={{
                backgroundColor: COLORS.white,
              }}
              inputStyle={{ marginLeft: 20, fontSize: 16 }}
            />
            <FormInput
              prependComponent={
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginLeft: 0,
                  }}>
                  <Image
                    source={unit === true ? images.kg : images.scale}
                    style={{ width: 28, height: 28, tintColor: COLORS.Primary }}
                  />
                </View>
              }
              placeholder={JSON.stringify(weight)}
              label="Weight"
              value={weight}
              returnKeyType={'next'}
              keyboardType="numeric"
              onChange={value => {
                value = parseInt(value.replace(/,/g, ''));
                setWeight(value);
              }}
              containerStyle={{
                marginTop: SIZES.radius,
              }}
              inputContainerStyle={{
                backgroundColor: COLORS.white,
              }}
              inputStyle={{ marginLeft: 20, fontSize: 16 }}
            />
            {valueBS != 'Male' ? (
              <Dropdown
                label="Bred"
                dropdownIcon={images.down}
                dropdownIconSize={22}
                borderRadius={SIZES.radius}
                data={Bred}
                textInputStyle={(FONTS.body2, { letterSpacing: 2 })}
                selectedItemTextStyle={(FONTS.body3, { color: COLORS.white })}
                selectedItemViewStyle={{
                  backgroundColor: COLORS.Primary,
                  margin: 5,
                  borderRadius: SIZES.radius,
                }}
                // enableAvatar
                // required
                disableSelectionTick
                primaryColor={COLORS.Primary}
                avatarSize={28}
                value={bred}
                onChange={onChangeB}
                animationIn="bounceInLeft"
                animationOut="bounceOutLeft"
                // mode="outlined"
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
            ) : (
              <View></View>
            )}
            <Dropdown
              label="Vaccinated"
              dropdownIcon={images.down}
              dropdownIconSize={22}
              borderRadius={SIZES.radius}
              data={Bred}
              textInputStyle={(FONTS.body2, { letterSpacing: 2 })}
              selectedItemTextStyle={(FONTS.body3, { color: COLORS.white })}
              selectedItemViewStyle={{
                backgroundColor: COLORS.Primary,
                margin: 5,
                borderRadius: SIZES.radius,
              }}
              // enableAvatar
              // required
              disableSelectionTick
              animationIn="bounceInLeft"
              animationOut="bounceOutLeft"
              primaryColor={COLORS.Primary}
              avatarSize={28}
              value={vaccinated}
              onChange={onChangeVacc}
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
            {vaccinated ? (
              <FormDateInput
                label="Date of Vaccination"
                placeholder="YYYY-MM-DD"
                value={new Date(vaccinateddatet)}
                setDate={setVaccinateddate}
                formatDate={setVaccinateddatet}
                containerStyle={{
                  marginTop: SIZES.radius,
                  // marginLeft:20
                }}
                inputContainerStyle={{
                  backgroundColor: COLORS.white,
                  width: '88%',
                  alignSelf: 'center',
                }}
                inputStyle={{ marginLeft: 20, fontSize: 16 }}
              />
            ) : (
              <View></View>
            )}
            <FormInput
              prependComponent={
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginLeft: 0,
                  }}>
                  <Image
                    source={images.dog}
                    style={{ width: 28, height: 28, tintColor: COLORS.Primary }}
                  />
                </View>
              }
              returnKeyType={'next'}
              label="Breed"
              value={Breed}
              onChange={value => {
                setBreed(value);
              }}
              containerStyle={{
                marginTop: SIZES.radius,
              }}
              inputContainerStyle={{
                backgroundColor: COLORS.white,
              }}
              inputStyle={{ marginLeft: 20, fontSize: 16 }}
            />
            <FormInput
              prependComponent={
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginLeft: 0,
                  }}>
                  <Image
                    source={images.name}
                    style={{ width: 28, height: 28, tintColor: COLORS.Primary }}
                  />
                </View>
              }
              label="Registration"
              returnKeyType={'go'}
              value={registration}
              onChange={value => {
                setRegistration(value);
              }}
              containerStyle={{
                marginTop: SIZES.radius,
              }}
              inputContainerStyle={{
                backgroundColor: COLORS.white,
              }}
              inputStyle={{ marginLeft: 20, fontSize: 16 }}
            />
          </View>
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
      {renderHeader()}
      <PickerType
        show={showc}
        setshow={setshowc}
        setPic={setPic}
        setPicdata={setPicdata}
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 40,
        }}>
        {renderForm()}
      </KeyboardAwareScrollView>
      <TextButton
        onPress={() => {
          postAnimal();
          // alert(pdatet)
        }}
        icon={images.add}
        buttonContainerStyle={{
          // height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderTopLeftRadius: SIZES.radius,
          borderTopRightRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Update Animals'}
        loading={loading}
      />
      <Toast ref={(ref) => { Toast.setRef(ref) }} config={toastConfig} />

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '88%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginRight: 30,
  },
  datePickerStyle: {
    height: 55,
    width: '88%',
    backgroundColor: COLORS.lightGray2,
    alignSelf: 'center',
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    color: COLORS.black,
  },
});
export default EditAnimal;
