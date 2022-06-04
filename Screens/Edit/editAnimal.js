import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import React, {useState, useRef} from 'react';
import Header from '../../Components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
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
} from '../../Components/Constants';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import FormDateInput from '../../Components/FormDateInput';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {getHerds} from '../../Store/actions';
const EditAnimal = ({navigation, route}) => {
  React.useEffect(() => {
    setId(global.id);
  }, []);
  const [bred, setBred] = useState(route.params.animal?.bred);
  const [valueMS, setValueMS] = useState(route.params.animal?.species);
  const [valueBS, setValueBS] = useState(route.params.animal?.gender);
  const [age, setAge] = useState(route.params.animal?.age);
  const [Breed, setBreed] = useState(route.params.animal?.breed);
  const [tag, setTag] = useState(route.params.animal?.support_tag);
  const [price, setPrice] = useState(route.params.animal?.price);
  const [mother, setMother] = useState(route.params.animal?.mother_supporttag);
  const [father, setFather] = useState(route.params.animal?.father_supporttag);
  const [weight, setWeight] = useState(
    unit ? route.params.animal?.weight : route.params.animal?.weight_kg,
  );
  const [name, setName] = useState(route.params.animal?.name);
  const [dob, setDob] = useState('');
  const [dobt, setDobt] = useState(route.params.animal?.birth_date);
  const [vaccinated, setVaccinated] = useState(route.params.animal?.vaccinated);
  const [vaccinateddate, setVaccinateddate] = useState('');
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

  const unit = JSON.parse(useSelector(state => state.Reducers.unit));

  const [showc, setshowc] = React.useState(false);
  const [pic, setPic] = React.useState('');
  const [picdata, setPicdata] = React.useState('');
  const [weight30, setWeight30] = useState(0);
  const [weight60, setWeight60] = useState(0);
  const [weight90, setWeight90] = useState(0);

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
  const data = JSON.stringify({
    name: name,
    registration: registration,
    gender: valueBS,
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
  });
  const dispatch = useDispatch();
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
            showMessage({
              message: 'Animal Updated',
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
            dispatch(getHerds());
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
          showMessage({
            message: `${err.response.data.msg}`,
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
        icon: 'danger',
        animationDuration: 250,
        style: {
          justifyContent: 'center',
        },
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
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Image
                source={images.name}
                style={{width: 26, height: 26, tintColor: COLORS.Primary}}
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
          inputStyle={{marginLeft: 20, fontSize: 16}}
        />
        <Dropdown
          label="Species"
          dropdownIcon={images.down}
          dropdownIconSize={22}
          borderRadius={SIZES.radius}
          data={animals}
          returnKeyType={'next'}
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
          itemContainerStyle={{backgroundColor: COLORS.white, margin: 5}}
        />
        <Dropdown
          label="Gender"
          dropdownIcon={images.down}
          dropdownIconSize={22}
          borderRadius={SIZES.radius}
          data={genderdata}
          textInputStyle={(FONTS.body2, {letterSpacing: 2})}
          selectedItemTextStyle={
            (FONTS.body3,
            {color: COLORS.white, letterSpacing: 2, alignSelf: 'center'})
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
          value={valueBS}
          onChange={onChangeBS}
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
        <Dropdown
          label="Purchased?"
          dropdownIcon={images.down}
          dropdownIconSize={22}
          borderRadius={SIZES.radius}
          data={Bought}
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
          itemContainerStyle={{backgroundColor: COLORS.white, margin: 5}}
        />
        {bought != true ? (
          <View>
            <FormDateInput
              label="Date of Birth"
              placeholder="YYYY-MM-DD"
              value={dob}
              setDate={setDob}
              formatDate={setDobt}
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
              inputStyle={{marginLeft: 20, fontSize: 16}}
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
                    style={{width: 28, height: 28, tintColor: COLORS.Primary}}
                  />
                </View>
              }
              label="Birth Weight"
              returnKeyType={'next'}
              value={weight}
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
              inputStyle={{marginLeft: 20, fontSize: 16}}
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
                onChange={value => {
                  value = parseInt(value.replace(/,/g, ''));
                  setWeight30(value);
                }}
                containerStyle={{
                  marginTop: SIZES.radius,
                  width: 80,
                }}
                inputContainerStyle={{
                  backgroundColor: COLORS.white,
                }}
                inputStyle={{fontSize: 16}}
              />
              <FormInput
                returnKeyType={'next'}
                label="60 Day"
                value={weight60}
                keyboardType="numeric"
                onChange={value => {
                  value = parseInt(value.replace(/,/g, ''));
                  setWeight60(value);
                }}
                containerStyle={{
                  marginTop: SIZES.radius,
                  width: 80,
                }}
                inputContainerStyle={{
                  backgroundColor: COLORS.white,
                }}
                inputStyle={{fontSize: 16}}
              />
              <FormInput
                returnKeyType={'next'}
                label="90 Day"
                value={weight90}
                keyboardType="numeric"
                onChange={value => {
                  value = parseInt(value.replace(/,/g, ''));
                  setWeight90(value);
                }}
                containerStyle={{
                  marginTop: SIZES.radius,
                  width: 80,
                }}
                inputContainerStyle={{
                  backgroundColor: COLORS.white,
                }}
                inputStyle={{fontSize: 16}}
              />
            </View>
            <FormInput
              prependComponent={
                <View style={{alignSelf: 'center', justifyContent: 'center'}}>
                  <Image
                    source={images.tag}
                    style={{width: 26, height: 26, tintColor: COLORS.Primary}}
                  />
                </View>
              }
              label="Mother Tag Number"
              value={mother}
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
              inputStyle={{marginLeft: 20, fontSize: 16}}
            />
            <FormInput
              prependComponent={
                <View style={{alignSelf: 'center', justifyContent: 'center'}}>
                  <Image
                    source={images.tag}
                    style={{width: 26, height: 26, tintColor: COLORS.Primary}}
                  />
                </View>
              }
              label="Father Tag Number"
              value={father}
              onChange={value => {
                setFather(value);
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
              label="Vaccinated"
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
                inputStyle={{marginLeft: 20, fontSize: 16}}
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
                    style={{width: 28, height: 28, tintColor: COLORS.Primary}}
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
              inputStyle={{marginLeft: 20, fontSize: 16}}
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
                    style={{width: 28, height: 28, tintColor: COLORS.Primary}}
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
              inputStyle={{marginLeft: 20, fontSize: 16}}
            />
          </View>
        ) : (
          <View>
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
                    style={{width: 28, height: 28, tintColor: COLORS.Primary}}
                  />
                </View>
              }
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
              inputStyle={{marginLeft: 20, fontSize: 16}}
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
                    style={{width: 28, height: 28, tintColor: COLORS.Primary}}
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
              inputStyle={{marginLeft: 20, fontSize: 16}}
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
                    style={{width: 28, height: 28, tintColor: COLORS.Primary}}
                  />
                </View>
              }
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
              inputStyle={{marginLeft: 20, fontSize: 16}}
            />
            {valueBS != 'Male' ? (
              <Dropdown
                label="Bred"
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
                // required
                disableSelectionTick
                primaryColor={COLORS.Primary}
                avatarSize={28}
                value={bred}
                onChange={onChangeB}
                animationIn="zoomIn"
                animationOut="zoomOut"
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
              textInputStyle={(FONTS.body2, {letterSpacing: 2})}
              selectedItemTextStyle={(FONTS.body3, {color: COLORS.white})}
              selectedItemViewStyle={{
                backgroundColor: COLORS.Primary,
                margin: 5,
                borderRadius: SIZES.radius,
              }}
              // enableAvatar
              // required
              disableSelectionTick
              animationIn="zoomIn"
              animationOut="zoomOut"
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
                inputStyle={{marginLeft: 20, fontSize: 16}}
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
                    style={{width: 28, height: 28, tintColor: COLORS.Primary}}
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
              inputStyle={{marginLeft: 20, fontSize: 16}}
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
                    style={{width: 28, height: 28, tintColor: COLORS.Primary}}
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
              inputStyle={{marginLeft: 20, fontSize: 16}}
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
          // console.log(typeof(price))
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
