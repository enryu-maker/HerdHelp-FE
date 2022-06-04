import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
} from 'react-native';

import {COLORS, FONTS, images} from './Constants';

function LoaderOp ({
    navigation,
    boxstyle,
    showing,
    validation,
    dataText,
    onClose
}) {
    // console.log(showing)
    // var show = showing
    const [show, setShow] = React.useState(showing);
    // React.useEffect(()=>{
    //     setShow(showing)
    // },[])
  // console.log(show)
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={show}
      
      onRequestClose={() => {
        // show=false
        setShow(false)
      }}
    >
          <TouchableOpacity onPress={() => {setShow(false)}}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          >
          {/* <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          > */}
        
      <View style={styles.modalBackground}>
        
        <View style={[styles.activityIndicatorWrapper, {...boxstyle}]}>
          {validation ? (
            <Image
              source={images.correct}
              style={{
                width: 60,
                height: 60,
                alignSelf: 'center',
                tintColor: COLORS.Primary,
              }}
            />
          ) : (
            <Image
              source={images.cancel}
              style={{
                width: 60,
                height: 60,
                alignSelf: 'center',
                tintColor: COLORS.red,
              }}
            />
          )}
          <Text style={{...FONTS.h3}}>{dataText}</Text>
        </View>
      </View>
      {/* </View> */}
      </TouchableOpacity>
    </Modal>
  );
};

export default LoaderOp;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 130,
    width: 130,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    // ...boxstyle
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
