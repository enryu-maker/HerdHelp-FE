import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {COLORS, SIZES, FONTS, images, Bred} from '../../Components/Constants';
import { ActivityIndicator } from 'react-native-paper';
import { baseURL } from '../../helpers/helpers';
import Toast from 'react-native-toast-message'
import { toastConfig } from '../../App';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHerds, UserData } from '../../Store/actions';
export default function Update({showu, setshowu, profile,cond,tag}) {
  const [loading, setLoading] = React.useState(false);
const token = useSelector(state => state.Reducers.authToken);
const dispatch = useDispatch()
  function updateProfile() {
    setLoading(true);
    const formData = new FormData();
    formData.append('profile_picture', profile);
    fetch(baseURL + `/updateprofile/${global.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
      .then(response => {
        if (response.status == 200) {
          setLoading(false);
          Toast.show({
            text1: 'Profile Pic updated',
            type: 'success',
          });
          dispatch(UserData())
          setshowu(false)
        }
      })
      .catch((err) => {
        setLoading(false);
        Toast.show({
          text1: `${err.response.data.msg}`,
          type: 'error',
        });
        setshowu(false)
      });
  }
  function animalProfile() {
    setLoading(true);
    const formData = new FormData();
    formData.append('animal_image', profile);
    fetch(baseURL + `/animals/${tag}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
      .then(response => {
        if (response.status == 200) {
          setLoading(false);
          Toast.show({
            text1: "Profile updated",
            type: 'success',
          });
          setshowu(false)
          dispatch(getHerds())
        }
      })
      .catch((err) => {
        setLoading(false);
        Toast.show({
          text1: `${err.response.data.msg}`,
          type: 'error',
        });
        setshowu(false)
      });
  }
  return (
    <Modal
      transparent={true}
      animationType={'slide'}
      visible={showu}
      onRequestClose={() => {
        setshowu(false);
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000040',
          justifyContent: 'flex-end',
          alignSelf: 'center',
          alignItems: 'center',
        }}
        onStartShouldSetResponder={() => setshowu(false)}>
            <ActivityIndicator animating={loading} size={"large"} color={COLORS.Primary} style={{
                justifyContent:"center",
                alignSelf:"center",
                marginBottom:SIZES.height/1.5
            }}/>
        <View
          style={{
            height: 110,
            width: '100%',
            backgroundColor: COLORS.white,
            alignSelf: 'center',
            borderTopLeftRadius: SIZES.radius + 10,
            borderTopRightRadius: SIZES.radius + 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setshowu(false);
            }}>
            <Image
              source={images.cancel}
              style={{
                height: 45,
                width: 45,
                justifyContent: 'center',
                alignSelf: 'center',
                tintColor: COLORS.red,
              }}
            />
            <Text
              style={{
                ...FONTS.h4,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
                cond?updateProfile():animalProfile()
            }}>
            <Image
              source={images.correct}
              style={{
                height: 45,
                width: 45,
                justifyContent: 'center',
                alignSelf: 'center',
                tintColor: COLORS.Primary,
              }}
            />
            <Text
              style={{
                ...FONTS.h4,
              }}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast ref={(ref) => { Toast.setRef(ref) }} config={toastConfig} />
    </Modal>
  );
}
