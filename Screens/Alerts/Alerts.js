import { View, TouchableOpacity, Image, Text, ToastAndroid, Alert } from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import { COLORS, FONTS, images, SIZES } from '../../Components/Constants';
import FormDateInput from '../../Components/FormDateInput';
import FormInput from '../../Components/FormInput';
import TextButton from '../../Components/TextButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axiosIns from '../../helpers/helpers';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import Toast from 'react-native-toast-message'
import { toastConfig } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { getAlerts } from '../../Store/actions'
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import TagDropdown from '../../Components/TagDropdown';

export default function Alerts({ navigation, route }) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [Edate, setEdate] = React.useState(null);
  const [Edatet, setEdatet] = React.useState(null);
  const [datet, setDatet] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [timet, setTimet] = React.useState(null);
  const [animals, setAnimals] = React.useState("");
  const [id, setId] = React.useState(null)
  const [loading, setLoading] = React.useState(false);
  const species = useSelector(state => state.Reducers.cat)
  const tagl = useSelector(state => state.Reducers.tags)


  const clear = () => {
    setTitle("")
    setContent("")
    setTag("")
  }
  function finder(list, value) {
    var dataValue;
    list?.map(a => {
      if (value == a.label) {
        dataValue = a.data;
      }
    });
    return dataValue;
  }
  const actualContent = "content:" + content + "\ntag :" + JSON.stringify(tag ? `${id}${animals}${tag}` : "")
  const addCalander = async () => {
    const eventConfig = {
      title: title,
      startDate: moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      endDate: moment(Edate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      allDay: true,
      notes: actualContent,
    };
    await AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then((response) => {
        if (response.action == "SAVED") {
          Toast.show({
            text1: "Alert Added",
            type: "success",
          });
        }
      })
      .catch((error) => {
        Toast.show({
          text1: error,
          type: "error",
        });
      });
  }
  const data = JSON.stringify(
    {
      "title": title,
      "content": content,
      "tag_number": tag ? `${id}${animals}${tag}` : "",
      "support_tag": tag,
      "start_date": moment(date).format('YYYY-MM-DD'),
    },
  )
  const dispatch = useDispatch()
  function postAlert() {
    setLoading(true)
    try {
      axiosIns.post('alerts/', data, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(response => {
        if (response.status == 201) {
          setLoading(false)
          clear();
          dispatch(getAlerts())
          Toast.show({
            text1: "Alerts added",
            type: "success",
          });
        }

      }).catch(err => {
        setLoading(false)
        Toast.show({
          text1: `${err.response.data.msg}`,
          type: "error",
        });
      })
    }
    catch {
      Toast.show({
        text1: `Something went wrong`,
        type: "error",
      });
    }
  }
  React.useEffect(() => {
    setId(global.id)
  }, [])
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
        title={'Add Alerts'}
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
          label="Species"
          borderRadius={SIZES.radius}
          data={species}
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
          dropdownIcon={images.down}
          dropdownIconSize={22}
          primaryColor={COLORS.Primary}
          value={animals}
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          onChange={(value) => {
            setAnimals(value)
          }}
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{ backgroundColor: COLORS.white, margin: 5 }}
        />
        <TagDropdown
        data={finder(tagl,animals)}
        value={tag}
        setValue={setTag}
        />
        <FormInput
          prependComponent={
            <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
              <Image
                source={images.aler}
                style={{ width: 26, height: 26, tintColor: COLORS.Primary }}
              />
            </View>
          }
          label="Issue?*"
          returnKeyType={"next"}
          value={title}
          onChange={value => {
            setTitle(value);
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
                source={images.mark}
                style={{ width: 26, height: 26, tintColor: COLORS.Primary }}
              />
            </View>
          }
          returnKeyType={"next"}
          label="What needs to be Done?*"
          value={content}
          onChange={value => {
            setContent(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputStyle={{ marginLeft: 20, fontSize: 16 }}
        />
        <FormDateInput
          label="Alert Date*"
          placeholder="YYYY/MM/DD"
          value={date}
          mode={"date"}
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
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {renderHeader()}
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
        border={false}
        onPress={() => {
          // addCalander()
          postAlert()
        }}
        icon={images.bell}
        loading={loading}
        buttonContainerStyle={{
          // flex:1,
          // height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderTopLeftRadius: SIZES.radius,
          borderTopRightRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Add Alert'}
      />
      <Toast ref={(ref) => { Toast.setRef(ref) }} config={toastConfig} />
    </View>
  );
}
