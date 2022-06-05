import React, { Component } from 'react';
import {View, StyleSheet } from 'react-native';
import { FONTS, SIZES, COLORS, icons, dummyData } from './Constants';
import { ActivityIndicator } from 'react-native-paper';
class ActivityIndicatorExample extends Component {
    _isMounted = false;
   state = { animating: true }
   closeActivityIndicator = () => setTimeout(() => this.setState({
   animating: false }), 6000)
   componentDidMount (){
    this._isMounted = true;
    this.closeActivityIndicator()
   }
//    = () => 
   render() {
      const animating = this.state.animating
      return (
         <View style = {styles.container}>
            <ActivityIndicator
               animating = {animating}
               color = {COLORS.Primary}
               size = "small"
               style = {styles.activityIndicator}/>
         </View>
      )
   }
}
export default ActivityIndicatorExample
const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   marginTop: 70
   },
   activityIndicator: {
    //   flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 80
   }
})