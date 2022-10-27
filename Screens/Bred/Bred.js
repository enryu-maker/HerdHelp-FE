import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import React from 'react'
import Header from '../../Components/Header'
import { COLORS, images, SIZES, FONTS } from '../../Components/Constants';
import Toast from 'react-native-toast-message'
import { toastConfig } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { getHerds } from '../../Store/actions';
import { Dropdown, GroupDropdown, MultiselectDropdown } from 'sharingan-rn-modal-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextButton from '../../Components/TextButton';
import FormDateInput from '../../Components/FormDateInput';
import axiosIns from '../../helpers/helpers';
import axios from 'axios';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };
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
    // setSpcies([])
    setbredDobt("")
    setbredDob("")
    setTag([])
  }
  // console.log(tag)
  function axiosRequest(tag) {
    var ls = []
    tag.map((a, index) => {
      const v = `animals/${id}${species}${a}`
      ls.push(v)
    })
    return (ls)
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
            Toast.show({
              text1: "Bred added sucessfully",
              type: "success",
            });
            setTimeout(() => {
              navigation.pop()
              navigation.navigate("Bred")
            }, 500);
          }
          else {
            setLoading(false)
            Toast.show({
              text1: `Animal with tag ${tag} not found here`,
              type: "error",
            });
          }
        }))
      } catch (err) {
        // console.log(err)
        setLoading(false)
        Toast.show({
          text1: `${err.response.data.msg}`,
          type: "error",
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
        {/* <MultiselectDropdown
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
        /> */}
        <View style={styles.container}>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={finder(tagl,species)}
          labelField="label"
          valueField="value"
          placeholder="Select Tag"
          value={tag}
          search
          searchPlaceholder="Search..."
          onChange={item => {
            setTag(item);
          }}
          renderLeftIcon={() => (
            <Image source={images.paw} style={{
              height:20,
              width:20,
              marginHorizontal:10,
              tintColor:COLORS.Primary
             }}/>
          )}
          selectedStyle={styles.selectedStyle}
          renderItem={renderItem}
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View style={styles.selectedStyle}>
                <Text style={styles.textSelectedStyle}>{item.label}</Text>
                <Image source={images.x} style={{
                  height:15,
                  width:15,
                  tintColor:COLORS.red
                }}/>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
        <FormDateInput
          label="Date Bred"
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
      <Toast ref={(ref) => { Toast.setRef(ref) }} config={toastConfig} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});