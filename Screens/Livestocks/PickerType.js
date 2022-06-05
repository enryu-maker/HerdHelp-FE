import {View, Text, Modal, Image, TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
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
      animationType={"fade"}
      visible={show}
      onRequestClose={() => {
        setshow(false);
      }}>
        <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.primary
                }}
            >
      <TouchableWithoutFeedback
                    onPress={() => setshow(false)}
                >
                    <View
                        style={{
                            height:SIZES.height-130,
                            backgroundColor:"#C0C0C070"
                        }}
                    />
                </TouchableWithoutFeedback>
          
        <View
          style={{
            height: 130,
            width: '100%',
            backgroundColor: COLORS.white,
            alignSelf: 'center',
            borderTopLeftRadius: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
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
