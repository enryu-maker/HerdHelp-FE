import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import React from 'react'
import Header from '../../Components/Header'
import { COLORS, images, SIZES, FONTS } from '../../Components/Constants';
import Toast from 'react-native-toast-message'
import { toastConfig } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { getHerds } from '../../Store/actions';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextButton from '../../Components/TextButton';
import FormInput from '../../Components/FormInput';
import axiosIns from '../../helpers/helpers';
import TagDropdown from '../../Components/TagDropdown';
export default function Flag({
  navigation
}) {
  const [tag, setTag] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [breddob, setbredDob] = React.useState('');
  const [breddobt, setbredDobt] = React.useState('');
  const [species, setSpcies] = React.useState([]);
  const [id, setId] = React.useState("");
  const [Flagged, setFlagged] = React.useState('');
  const [Flaggedesp, setFlaggedesp] = React.useState('');
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
  React.useEffect(() => {
    setId(global.id)
  }, []);
  const dispatch = useDispatch()
  const clear = () => {
    // setSpcies([])
    setbredDobt("")
    setbredDob("")
    setTag([])
  }
  async function updateBred() {
    if (tag != "", Flaggedesp != '') {
      setLoading(true)
      try {
        await axiosIns.patch(`animals/${id}${species}${tag}`, {
          flagged: true,
          flag_desc: Flaggedesp
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((Response) => {
          if (Response.status == 200) {
            dispatch(getHerds())
            setLoading(false)
            Toast.show({
              text1: "FLag Updated sucessfully",
              type: "success",
            });
            setTimeout(() => {
              navigation.pop()
              navigation.navigate("Flag")
            }, 500);
          }
          else {
            setLoading(false)
            Toast.show({
              text1: `Animal with tag ${tag} not found here`,
              type: "error"
            });
          }
        })
      } catch (err) {
        // console.log(err)
        setLoading(false)
        Toast.show({
          text1: `${err.response.data}`,
          type: "error"
        });
      }
    }
    else {
      setLoading(false)
      Toast.show({
        text1: `Please Enter valid Data`,
        type: "error"
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
        title={'Flag Animal'}
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
        {/* <Dropdown
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
          enableSearch
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
        /> */}
        <TagDropdown
          value={tag}
          setValue={setTag}
          data={finder(tagl, species)}
        />
        <FormInput
          prependComponent={
            <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
              <Image
                source={images.add}
                style={{ width: 26, height: 26, tintColor: COLORS.Primary }}
              />
            </View>
          }
          //   placeholder={'Flag Description'}
          label={'Description*'}
          multiline={true}
          value={Flaggedesp}
          onChange={value => {
            setFlaggedesp(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
            height: 65
          }}
          containerStyle={{
            marginTop: SIZES.radius,
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
          backgroundColor: Flaggedesp === "" ? COLORS.transparentPrimary : COLORS.Primary,
        }}
        label={'Update Flag'}
        disabled={Flaggedesp === "" ? true : false}
      />
      <Toast ref={(ref) => { Toast.setRef(ref) }} config={toastConfig} />
    </View>
  )
}