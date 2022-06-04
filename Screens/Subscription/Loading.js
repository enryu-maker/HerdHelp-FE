import { View, Text,Modal,StyleSheet,ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../Components/Constants';

export default function Loading({
    show
}) {
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={show}
      onRequestClose={() => {
        setShow(false)
      }}
    >
        <View style={styles.modalBackground}>
            <ActivityIndicator size={"large"} color={COLORS.white} animating={true}/>
            <Text style={{
                alignSelf:"center",
                ...FONTS.h3,
                color:COLORS.white
            }}>Payment In Progress ...</Text>
        </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent:"center",
      backgroundColor: '#00000050',
    }
  });