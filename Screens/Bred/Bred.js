import {View, Text, TouchableOpacity, Image,Alert} from 'react-native';
import React from 'react'
import Header from '../../Components/Header'
import {COLORS, images, SIZES, FONTS} from '../../Components/Constants';
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux';
import { getHerds } from '../../Store/actions';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextButton from '../../Components/TextButton';
import FormDateInput from '../../Components/FormDateInput';
export default function Bred({
    navigation
}) {
    const [tag, setTag] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [breddob, setbredDob] = React.useState('');
  const [breddobt, setbredDobt] = React.useState('');
  const [species, setSpcies] = React.useState([]);
  const [id, setId] = React.useState("");
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
            title={'Update Bred'}
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
      {
        renderHeader()
      }
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
        //   updateWeight()         
        }}
        icon={images.update}
        loading={loading}
        buttonContainerStyle={{
          marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            marginBottom: SIZES.padding,
            borderTopLeftRadius: SIZES.radius,
            borderTopRightRadius: SIZES.radius,
            backgroundColor: COLORS.Primary,
        }}
        label={'Update Bred'}
      />
    </View>
  )
}