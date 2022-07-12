import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';

import React, { useState, useRef } from 'react';
import Header from '../../Components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import {
  COLORS,
  SIZES,
  catedata,
  FONTS,
  genderdata,
  images,
  Bred,
  Bought,
} from '../../Components/Constants';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import FormDateInput from '../../Components/FormDateInput';
import PickerType from './PickerType';
import { showMessage } from 'react-native-flash-message';
import { baseURL } from '../../helpers/helpers';
import { Username } from '../Nav/Homenav';
import { getHerds, getTags } from '../../Store/actions';
const Addanimals = ({ navigation, route }) => {
  const [bred, setBred] = useState(false);
  const [breddob, setbredDob] = useState('');
  const [breddobt, setbredDobt] = useState('');
  const [valueMS, setValueMS] = useState('');
  const [valueBS, setValueBS] = useState('');
  const [age, setAge] = useState(0);
  const [Breed, setBreed] = useState('');
  const [tag, setTag] = useState('');
  const [price, setPrice] = useState(0);
  const [mother, setMother] = useState('');
  const [father, setFather] = useState('');
  const [weight, setWeight] = useState(0);
  const [weight30, setWeight30] = useState(0);
  const [weight60, setWeight60] = useState(0);
  const [weight90, setWeight90] = useState(0);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [dobt, setDobt] = useState('');
  const [vaccinated, setVaccinated] = useState(false);
  const [vaccinateddate, setVaccinateddate] = useState('');
  const [vaccinateddatet, setVaccinateddatet] = useState('');
  const [bought, setBought] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [id, setId] = React.useState('');
  const [registration, setRegistration] = React.useState('');
  const [showc, setshowc] = React.useState(false);
  const [showu, setshowu] = React.useState(false);
  const [pic, setPic] = React.useState('');
  const [profile_pic, setprofile_pic] = React.useState([]);
  const [picdata, setPicdata] = React.useState([]);
  const token = useSelector(state => state.Reducers.authToken);
  const unit = JSON.parse(useSelector(state => state.Reducers.unit))
  const animals = useSelector(state => state.Reducers.cat)
  const tagl = useSelector(state => state.Reducers.tags)
  function finder(list, value) {
    var dataValue;
    list?.map(a => {
      if (value == a.label) {
        dataValue = a.data;
      }
    });
    return dataValue;
  }
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
    setPic('');
    setValueMS("");
  };
  const username = global.User
  function renderFileUri() {
    if (pic) {
      return (
        <View
          style={{
            height: 100,
            width: 100,
            borderRadius: 100 / 2,
            alignSelf: 'center',
            borderColor: COLORS.black,
          }}>
          <Image
            source={{ uri: pic }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              alignSelf: 'center',
              borderWidth: 2,
              borderColor: COLORS.black
            }}
          />
          <View
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              backgroundColor: COLORS.Primary,
              height: 18,
              width: 30,
              justifyContent: 'center',
              marginTop: 70,
              borderRadius: 4,
            }}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h5,
                alignSelf: 'center',
              }}>
              Edit
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            height: 100,
            width: 100,
            borderRadius: 100 / 2,
            alignSelf: 'center',
            borderColor: COLORS.black,
          }}>
          <Image
            source={{ uri: pic == '' ? `https://ui-avatars.com/api/?name=${username[0].username}` : pic }}
            resizeMethod="auto"
            resizeMode="contain"
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              alignSelf: 'center',
              borderWidth: 2,
              borderColor: COLORS.black

            }}
          />

          <View
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              backgroundColor: COLORS.Primary,
              height: 18,
              width: 30,
              justifyContent: 'center',
              marginTop: 70,
              borderRadius: 4,
            }}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h5,
                alignSelf: 'center',
              }}>
              Edit
            </Text>
          </View>
        </View>

        //
      );
    }
  }
  const dispatch = useDispatch()
  function postAnimal() {
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('tag_number', `${id}${valueMS}${tag}`);
    formData.append('registration', registration);
    formData.append('support_tag', tag);
    formData.append('gender', valueBS);
    formData.append('species', valueMS);
    formData.append('birth_date', dobt);
    formData.append('mother_supporttag', mother != '' ? mother : '');
    formData.append(
      'mother_tagnumber',
      mother != '' ? `${id}${valueMS}${mother}` : '',
    );
    formData.append('father_supporttag', father != '' ? father : '');
    formData.append(
      'father_tagnumber',
      father != '' ? `${id}${valueMS}${father}` : '',
    );
    formData.append('breed', Breed);
    formData.append(
      'weight',
      unit == true ? weight : Math.round(weight / 0.45359237),
    );
    formData.append(
      'weight_kg',
      unit == false ? weight : Math.round(weight * 0.45359237),
    );
    formData.append(
      'weight_30',
      unit == true ? weight30 : Math.round(weight30 / 0.45359237),
    );
    formData.append(
      'weight_30_kg',
      unit == false ? weight30 : Math.round(weight30 * 0.45359237),
    );
    formData.append(
      'weight_60',
      unit == true ? weight60 : Math.round(weight60 / 0.45359237),
    );
    formData.append(
      'weight_60_kg',
      unit == false ? weight60 : Math.round(weight60 * 0.45359237),
    );
    formData.append(
      'weight_90',
      unit == true ? weight90 : Math.round(weight90 / 0.45359237),
    );
    formData.append(
      'weight_90_kg',
      unit == false ? weight90 : Math.round(weight90 * 0.45359237),
    );
    formData.append('bred', bred);
    formData.append('age', age);
    formData.append('vaccinated', vaccinated);
    formData.append('vaccination_date', vaccinateddatet);
    formData.append('price', price);
    formData.append('bought', bought);
    formData.append('status', 'Alive');
    formData.append('animal_image', profile_pic);
    if (isEnableSignIn()) {
      fetch(baseURL + `/animals/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then(response => {
          if (response.status == 201) {
            setLoading(false);
            dispatch(getHerds())
            dispatch(getTags())
            dispatch(getOverview())
            clear();
            showMessage({
              message: 'Animal Added',
              type: 'default',
              backgroundColor: COLORS.Primary,
              color: COLORS.white,
              titleStyle: {
                alignSelf: 'center',
                ...FONTS.h3,
              },
              animationDuration: 250,
              icon: 'success',
              style: {
                justifyContent: 'center',
              },
            });
          }
          else {
            setLoading(false);
            console.log(response);
            showMessage({
              message: `${response.msg}`,
              type: 'default',
              backgroundColor: COLORS.red,
              color: COLORS.white,
              titleStyle: {
                alignSelf: 'center',
                ...FONTS.h3,
              },
              animationDuration: 250,
              icon: 'danger',
              style: {
                justifyContent: 'center',
              },
            });
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
          showMessage({
            message: `${err.response.data?.msg}`,
            type: 'default',
            backgroundColor: COLORS.red,
            color: COLORS.white,
            titleStyle: {
              alignSelf: 'center',
              ...FONTS.h3,
            },
            animationDuration: 250,
            icon: 'danger',
            style: {
              justifyContent: 'center',
            },
          });
        });
    } else {
      setLoading(false);
      showMessage({
        message: `Required Fields cannot be empty`,
        type: 'default',
        backgroundColor: COLORS.red,
        color: COLORS.white,
        titleStyle: {
          alignSelf: 'center',
          ...FONTS.h3,
        },
        animationDuration: 250,
        icon: 'danger',
        style: {
          justifyContent: 'center',
        },
      });
    }
  }
  React.useEffect(() => {
    setId(global.id);
  }, []);
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
        title={'Add Animals'}
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
          showc &&

          <PickerType
            show={showc}
            setshow={setshowc}
            setPic={setPic}
            setPicdata={setPicdata}
            setprofile_pic={setprofile_pic}
            setshowc={setshowu}
          />
        }
        <View
          style={{
            marginTop: 6,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.radius,
          }}>
          <TouchableOpacity
            onPress={() => {
              setshowc(true);
            }}>
            {renderFileUri()}
          </TouchableOpacity>
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
          label="Tag Number*"
          returnKeyType={'next'}
          value={tag}
          onChange={value => {
            setTag(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          inputStyle={{ marginLeft: 20, fontSize: 16 }}
        />
        <FormInput
          prependComponent={
            <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
              <Image
                source={images.name}
                style={{ width: 26, height: 26, tintColor: COLORS.Primary }}
              />
            </View>
          }
          returnKeyType={'next'}
          label="Name"
          value={name}
          onChange={(value) => {
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
          onChange={(value) => {
            setValueMS(value);
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
          label="Gender"
          dropdownIcon={images.down}
          dropdownIconSize={22}
          borderRadius={SIZES.radius}
          data={genderdata}
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
          required
          primaryColor={COLORS.Primary}
          value={valueBS}
          onChange={(value) => {
            setValueBS(value);
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
          required
          disableSelectionTick
          primaryColor={COLORS.Primary}
          value={bought}
          onChange={(value) => {
            setBought(value);
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
        {bought != true ? (
          <View>
            <FormDateInput
              label="Date of Birth"
              placeholder="YYYY-MM-DD"
              value={dob}
              setDate={setDob}
              formatDate={setDobt}
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
                    // marginLeft: 0,
                  }}>
                  <Image
                    source={unit === true ? images.kg : images.scale}
                    style={{ width: 28, height: 28, tintColor: COLORS.Primary }}
                  />
                </View>
              }
              returnKeyType={'next'}
              label="Birth Weight"
              value={weight}
              keyboardType="numeric"
              onChange={(value) => {
                value = parseInt(value.replace(/,/g, ""))
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
            <View style={{
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}>
              <FormInput
                returnKeyType={'next'}
                label="30 Day"
                value={weight30}
                keyboardType="numeric"
                onChange={(value) => {
                  value = parseInt(value.replace(/,/g, ""))
                  setWeight30(value);
                }}
                containerStyle={{
                  marginTop: SIZES.radius,
                  width: 80
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
                onChange={(value) => {
                  value = parseInt(value.replace(/,/g, ""))
                  setWeight60(value);
                }}
                containerStyle={{
                  marginTop: SIZES.radius,
                  width: 80
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
                keyboardType="numeric"
                onChange={(value) => {
                  value = parseInt(value.replace(/,/g, ""))
                  setWeight90(value);
                }}
                containerStyle={{
                  marginTop: SIZES.radius,
                  width: 80
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
              returnKeyType={'next'}
              label="Mother Tag Number"
              value={mother}
              onChange={(value) => {
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
              returnKeyType={'next'}
              label="Father Tag Number"
              value={father}
              onChange={(value) => {
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
              onChange={value => {
                setVaccinated(value);
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
            {vaccinated ? (
              <FormDateInput
                label="Date of Vaccination"
                placeholder="YYYY-MM-DD"
                value={vaccinateddate}
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
              returnKeyType={'next'}
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
              returnKeyType={'next'}
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
            <FormInput
              returnKeyType={'next'}
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
              label="Price"
              value={price}
              keyboardType="numeric"
              onChange={value => {
                value = value.replace(/,/g, "")
                value = parseInt(value.replace(/$/g, ""))
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
              returnKeyType={'next'}
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
              returnKeyType={'next'}
              prependComponent={
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginLeft: 0,
                  }}>
                  <Image
                    source={unit == true ? images.kg : images.scale}
                    style={{ width: 28, height: 28, tintColor: COLORS.Primary }}
                  />
                </View>
              }
              label="Weight"
              value={weight}
              keyboardType="numeric"
              onChange={value => {
                value = parseInt(value.replace(/,/g, ""))
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
              <>
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
                onChange={value => {
                  setBred(value);
                }}
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
              {
                bred?
              <FormDateInput
              label="Date of Bred"
              placeholder="YYYY-MM-DD"
              value={breddob}
              setDate={setbredDob}
              formatDate={setbredDobt}
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
            />:null
  }
            </>
              
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
              onChange={value => {
                setVaccinated(value);
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
            {vaccinated ? (
              <FormDateInput
                label="Date of Vaccination"
                placeholder="YYYY-MM-DD"
                value={vaccinateddate}
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
              returnKeyType={'go'}
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
        }}
        icon={images.add}
        buttonContainerStyle={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderTopLeftRadius: SIZES.radius,
          borderTopRightRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Add Animal'}
        loading={loading}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '88%',
    // flex: 1,
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
export default Addanimals;
