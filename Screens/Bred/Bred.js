import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import React from 'react'
import Header from '../../Components/Header'
import { COLORS, images, SIZES, FONTS } from '../../Components/Constants';
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux';
import { getHerds } from '../../Store/actions';
import { Dropdown ,GroupDropdown, MultiselectDropdown } from 'sharingan-rn-modal-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextButton from '../../Components/TextButton';
import FormDateInput from '../../Components/FormDateInput';
import axiosIns from '../../helpers/helpers';
import axios from 'axios';
export default function Bred({
  navigation
}) {
  const [tag, setTag] = React.useState([]);
  const [ftag, setfTag] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [breddob, setbredDob] = React.useState('');
  const [breddobt, setbredDobt] = React.useState('');
  const [species, setSpcies] = React.useState([]);
  const [id, setId] = React.useState("");
  const animals = useSelector(state => state.Reducers.cat)
  const tagl = useSelector(state => state.Reducers.tags)

  function finder(list, value) {
    var dataValue;
    var final_data = [];
    list?.map(a => {
      if (value == a.label) {
        dataValue = a.data;
        dataValue.map(a => {
          if (a.gender === "Female") {
            final_data.push(a)
          }
        })
      }
    });
    return final_data;
  }
  React.useEffect(() => {
    setId(global.id)
  }, []);
  const dispatch = useDispatch()
  const clear = () => {
    setSpcies([])
    setbredDobt("")
    setbredDob("")
    setTag([])
  }
  // console.log(tag)
   function axiosRequest(tag){
    var ls = []
    tag.map((a,index)=>{
      const v =   `animals/${id}${species}${a}`
      ls.push(v)
    })
    return(ls)
  }

  async function updateBred() {
    var final_list = axiosRequest(tag)
    if (tag != "", breddobt != '') {
      setLoading(true)
      try {
        await Promise.all(final_list.map((endpoint) => axiosIns.patch(endpoint, {
          'bred': true,
          'bred_date': breddobt
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        }))).then(axios.spread((Response) => {
          if (Response.status == 200) {
            dispatch(getHerds())
            setLoading(false)
            showMessage({
              message: "Bred added sucessfully",
              type: "success",
              backgroundColor: COLORS.Primary,
              color: COLORS.white,
              titleStyle: {
                alignSelf: "center",
                ...FONTS.h3
              },
              animationDuration: 250,
              icon: "success",
              style: {
                justifyContent: "center"
              }
            });
            clear()
          }
          else {
            setLoading(false)
            showMessage({
              message: `Animal with tag ${tag} not found here`,
              type: "danger",
              backgroundColor: COLORS.red,
              color: COLORS.white,
              titleStyle: {
                alignSelf: "center",
                ...FONTS.h3
              },
              animationDuration: 250,
              icon: "danger",
              style: {
                justifyContent: "center"
              }
            });
          }
        }))
      } catch (err) {
        console.log(err)
        setLoading(false)
        showMessage({
          // message: `${err.response.data.msg}`,
          type: "danger",
          backgroundColor: COLORS.red,
          color: COLORS.white,
          titleStyle: {
            alignSelf: "center",
            ...FONTS.h3
          },
          animationDuration: 250,
          icon: "danger",
          style: {
            justifyContent: "center"
          }
        });
      }
    }
    else {
      setLoading(false)
      showMessage({
        message: `Please Enter valid Data`,
        type: "danger",
        backgroundColor: COLORS.red,
        color: COLORS.white,
        titleStyle: {
          alignSelf: "center",
          ...FONTS.h3
        },
        animationDuration: 250,
        icon: "danger",
        style: {
          justifyContent: "center"
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
                backgroundColor: COLORS.Primary,
                height: 40,
                width: 40,
                justifyContent: "center",
                borderRadius: 40 / 2,
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{ width: 25, height: 25, tintColor: COLORS.white, alignSelf: "center" }}
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
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          value={species}
          onChange={(value) => {
            setSpcies(value)
          }}
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center'
          }}
          itemContainerStyle={{ backgroundColor: COLORS.white, margin: 5 }}
        />
        <MultiselectDropdown
          label="Tags"
          dropdownIcon={images.down}
          dropdownIconSize={22}
          borderRadius={SIZES.radius}
          data={finder(tagl, species)}
          textInputStyle={(FONTS.body2, { letterSpacing: 2 })}
          selectedItemTextStyle={(FONTS.body3, { color: COLORS.white })}
          selectedItemViewStyle={{
            backgroundColor: COLORS.Primary,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
          // enableAvatar
          enableSearch
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          avatarSize={28}
          value={tag}
          onChange={(value) => {
            setTag(value)
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
          updateBred()
        }}
        icon={images.update}
        loading={loading}
        buttonContainerStyle={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderTopLeftRadius: SIZES.radius,
          borderTopRightRadius: SIZES.radius,
          backgroundColor: breddobt === "" ? COLORS.transparentPrimary : COLORS.Primary,
        }}
        label={'Update Bred'}
        disabled={breddobt === "" ? true : false}
      />
    </View>
  )
}