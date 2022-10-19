import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import { images, COLORS, SIZES, FONTS, Bred } from '../../Components/Constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormDateInput from '../../Components/FormDateInput';
import axiosIns from '../../helpers/helpers';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import Toast from 'react-native-toast-message'
import { MultiSelect } from 'react-native-element-dropdown';
import { toastConfig } from '../../App';
import CustomAlert from '../../Components/CustomAlert';
import { useDispatch, useSelector } from 'react-redux';
import { getHerds, getMedical } from '../../Store/actions';
import axios from 'axios';
import TagDropdown from '../../Components/TagDropdown';
export const Medication = ({ navigation, route }) => {
  const [tag, setTag] = React.useState([]);
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
  const [stag, setStag] = React.useState([]);

  const [dataT, setDataT] = React.useState("");
  const [dataS, setDataS] = React.useState("");
  const tagl = useSelector(state => state.Reducers.tags)

  const [cond, setCond] = React.useState(false);
  const clear = () => {
    setMed("");
    setWithdraw("");
    setDis("");
    setTag("");
    setDos("");
  };
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  function finder(list, value) {
    var dataValue;
    list?.map(a => {
      if (value == a.label) {
        dataValue = a?.data;
      }
    });
    return dataValue
  }
  function axiosRequest(tag) {
    var ls = []
    tag.map((a, index) => {
      const v = `${id}${species}${a}`
      ls.push(v)
    })
    return (ls)
  }

  async function updateMed() {
    var final_list = axiosRequest(tag)
    if (tag != "", species != '') {
      setLoading(true)
      try {
        await Promise.all(final_list.map((endpoint) => axiosIns.post('medication/', 
          {
          tag_number:endpoint,
          medication_name: med,
          medication_date: treatt,
          dosage: dos,
          disease: Dis,
          withdrawal: withdraw,
          withdrawal_date: datet != "" ? datet : null,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        }))).then(axios.spread((Response) => {
          if (Response.status == 201) {
            dispatch(getHerds())
            setLoading(false)
            Toast.show({
              text1: "Medication Added",
              type: "success",
            });
            setTimeout(() => {
              navigation.pop()
              navigation.navigate("medication")
            }, 500);
          }
          else {
            setLoading(false)
            Toast.show({
              text1: "Animal Not Added",
                type: "error",
            });
          }
        }))
      } catch (err) {
        console.log(err)
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
  const dispatch = useDispatch()
  function addMedical() {
    setLoading(true),
      axiosIns
        .post(
          'medication/',
          {
            tag_number:`${global.id}${dataS}${dataT}`,
            medication_name: med,
            medication_date: treatt,
            dosage: dos,
            disease: Dis,
            withdrawal: withdraw,
            withdrawal_date: datet != "" ? datet : null,
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
            dispatch(getMedical(`${global.id}${dataS}${dataT}`)) 
            Toast.show({
              text1: "Medication Added",
              type: "success",
            });
            clear()
          } else {
            setLoading(false),
              Toast.show({
                text1: "Animal Not Added",
                type: "error",
              });
          }
        })
        .catch(err => {
          setLoading(false)
          Toast.show({
            text1: `${err.response.data.msg}`,
            type: "error",
          });
        });
  }
  React.useEffect(() => {
    setId(global.id);
    let { cond } = route.params
    setCond(cond)
    if (!cond) {
      let { tag } = route.params
      setDataT(tag)
      let { species } = route.params
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
                backgroundColor: COLORS.Primary,
                height: 40,
                width: 40,
                justifyContent: "center",
                borderRadius: 40 / 2,
              }}
              onPress={() => {
                navigation.goBack()
              }}>
              <Image
                source={images.back}
                style={{ width: 25, height: 25, tintColor: COLORS.white, alignSelf: "center" }}
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
          cond ?
            <>
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
              disableSelectionTick
              animationIn="bounceInLeft"
              animationOut="bounceOutLeft"
              primaryColor={COLORS.Primary}
              value={species}
              onChange={(value) => {
                setSpcies(value)
                // setStag(finder(tagl, value))
              }}
              mainContainerStyle={{
                borderRadius: SIZES.padding,
                width: '88%',
                alignSelf: 'center',
                marginTop: SIZES.height > 800 ? SIZES.base : 10,
              }}
              itemContainerStyle={{ backgroundColor: COLORS.white, margin: 5 }}
            />
              {/* <Dropdown
                label="Tags"
                dropdownIcon={images.down}
                dropdownIconSize={22}
                borderRadius={SIZES.radius}
                data={stag}
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

            </> : <View></View>
        }
        <FormInput
          prependComponent={
            <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
              <Image
                source={images.disease}
                style={{ width: 28, height: 28, tintColor: COLORS.Primary }}
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
          inputStyle={{ marginLeft: 20, fontSize: 16 }}
        />
        <FormInput
          returnKeyType={"next"}
          prependComponent={
            <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
              <Image
                source={images.medicines}
                style={{ width: 28, height: 28, tintColor: COLORS.Primary }}
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
          inputStyle={{ marginLeft: 20, fontSize: 16 }}
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
          inputStyle={{ marginLeft: 20, fontSize: 16 }}
        />
        <FormInput
          returnKeyType={"next"}
          prependComponent={
            <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
              <Image
                source={images.dropper}
                style={{ width: 28, height: 28, tintColor: COLORS.Primary }}
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
          inputStyle={{ marginLeft: 20, fontSize: 16 }}
        />
        <Dropdown
          label="Withdrawal"
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
            inputStyle={{ marginLeft: 20, fontSize: 16 }}
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
          !cond ?addMedical():updateMed()
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
      <Toast ref={(ref) => { Toast.setRef(ref) }} config={toastConfig} />

    </View>
  );
};
const styles = StyleSheet.create({
  container: { 
    width:"88%",
    padding: 16,
    marginTop:20 },
  dropdown: {
    width:"88%",
    height: 50,
    marginTop:20,
    alignSelf:"center",
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
    justifyContent:"center",
    alignItems:"center",
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
