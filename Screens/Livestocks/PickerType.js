import {View, Text, Modal, Image, TouchableOpacity,Platform} from 'react-native';
import {COLORS, SIZES, FONTS, images, Bred} from '../../Components/Constants';
import ImageCropPicker from 'react-native-image-crop-picker';
import React from 'react';
export default function PickerType({
  show,
  setshow,
  setPic,
  setPicdata,
  setprofile_pic,
  setshowc
}) {
  function openLibrary() {
    setTimeout(() => {
      ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      // compressImageQuality:true
    }).then(image => {
        const uriParts = image.path.split('.')
        const fileType = uriParts[uriParts.length - 1];
        setPic(image.path);
        setprofile_pic(
          {
            type: `image/${fileType}`,
            uri:image.path,
            name: `photo.${fileType}`
          },
        );
        setshowc(true)
    });
  },2000)
  }
  function openCamera() {
    setTimeout(() => {
      ImageCropPicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        // compressImageQuality:true
      }).then(image => {
        // console.log(image);
          const uriParts = image.path.split('.')
          const fileType = uriParts[uriParts.length - 1];
          setPic(image.path);
          setprofile_pic(
            {
              type: `image/${fileType}`,
              uri:image.path,
              name: `photo.${fileType}`
            },
          );
          setshowc(true)
      });
    },2000)
  }
  return (
    <Modal
      transparent={true}
      animationType={'slide'}
      visible={show}
      onRequestClose={() => {
        setshow(false);
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000040',
          justifyContent: 'flex-end',
          alignSelf: 'center',
          alignItems: 'center',
        }}
        onStartShouldSetResponder={() => setshow(false)}>
          
        <View
          style={{
            height: 110,
            width: '100%',
            backgroundColor: COLORS.white,
            alignSelf: 'center',
            borderTopLeftRadius: SIZES.radius+10,
            borderTopRightRadius: SIZES.radius+10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          
          <TouchableOpacity
            onPress={() => {
              setshow(false);
              openCamera();
            }}>
            <Image
              source={images.cam}
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
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setshow(false);
              openLibrary();
            }}>
            <Image
              source={images.picture}
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
              Library
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
