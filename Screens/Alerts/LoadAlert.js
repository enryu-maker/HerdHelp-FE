import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { COLORS, images, SIZES, FONTS } from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';
import Header from '../../Components/Header';
import ActivityIndicatorExample from '../../Components/Loading';
import TextButton from '../../Components/TextButton';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message'
import { toastConfig } from '../../App';
import { getAlerts } from '../../Store/actions';

export default function LoadAlert({ navigation }) {
  const [species, setSpcies] = React.useState([]);
  const [id, setId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const alert = useSelector(state => state.Reducers.alerts)
  const dispatch = useDispatch()
  React.useEffect(() => {
    setId(global.id);
  }, []);
  function delAlert(id) {
    setLoading(true)
    axiosIns.delete(`alerts/${id}`).
      then((res) => {
        if (res.status == 204) {
          dispatch(getAlerts())
          setLoading(false)
          Toast.show({
            text1: "Alert Deleted Succesfully",
            type: "success",
          })
        }
        else {
          console.log(res)
          setLoading(false)
          Toast.show({
            text1: "Something Went Wrong",
            type: "error",
          })
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        Toast.show({
          text1: "Something Went Wrong",
          type: "error",
        })
      })
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
                navigation.openDrawer();
              }}>
              <Image
                source={images.menu}
                style={{ width: 25, height: 25, tintColor: COLORS.white, alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Alerts'}
        titleStyle={{
          marginLeft: 100
        }}
        rightComponent={
          <View
            style={{
              justifyContent: 'center',
              // position: 'absolute',
              marginRight: 15,
              // zIndex: 1,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.Primary,
                height: 40,
                width: 90,
                justifyContent: "space-evenly",
                borderRadius: 15,
                flexDirection: "row"
              }}
              onPress={() =>
                navigation.push('Alerts', {
                  sep: species,
                  id: id,
                })}
            >
              <Image source={images.add} style={{
                height: 25,
                width: 25,
                tintColor: COLORS.white,
                alignSelf: "center"
              }} />
              <Text style={{
                ...FONTS.h3,
                color: COLORS.white,
                alignSelf: "center"
              }}>
                Alerts
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    );
  }
  // console.log(alert)
  return (
    <View style={{ flex: 1 }}>
      {renderHeader()}

      {
        loading ? <ActivityIndicator style={{
          padding:10,
         
        }} 
        size={"small"}
        color={COLORS.Primary}
        /> :
          <>
            <Text style={{ ...FONTS.h4, color: COLORS.Primary, alignSelf: "center" }}>
              Swipe Left To{" "}
              <Text style={{ ...FONTS.h4, color: COLORS.red, marginLeft: 10 }}>
                Delete
              </Text>
            </Text>
          </>
      }
      {
        alert.length < 0 ?
          <ActivityIndicatorExample />
          :
          <SwipeListView
            data={alert}
            keyExtractor={item => `${item.id}`}
            renderItem={(data, rowMap) => (
              <View
                style={{
                  backgroundColor: COLORS.lightGray2,
                  // flex: 1,
                  // height: data.item.support_tag != "" ? 100:150,
                  margin: SIZES.base2,
                  borderRadius: SIZES.radius,
                  width: '88%',
                  alignSelf: 'center',
                  paddingHorizontal: 20
                }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "column", padding: 4 }}>
                    <Text style={
                      { ...FONTS.h3 }
                    }>{`Issue: ${data.item.title}`}</Text>
                    <Text style={
                      Platform.OS !="ios" ? { ...FONTS.body3 } : { ...FONTS.body3 }
                    }>{`Solution: ${data.item.content}`}</Text>
                    {
                      data.item.support_tag != "" ?
                        (<Text style={
                          { ...FONTS.body3 }
                        }>{`Tag: ${data.item.support_tag}`}</Text>) :
                        (<View></View>)
                    }
                    <View style={{}}>
                      <Text style={
                        Platform.OS !="ios" ? { ...FONTS.h4, color: COLORS.Primary } : { ...FONTS.h3, color: COLORS.Primary }
                      }>{`Date: ${data.item.start_date}`}</Text>
                    </View>
                  </View></View>
              </View>
            )}
            renderHiddenItem={(data, rowMap) => (
              <TextButton
                key={rowMap}
                buttonContainerStyle={{
                  height: data.item.support_tag != "" ? 90 : 90,
                  justifyContent: 'flex-end',
                  marginTop: 5,
                  backgroundColor: "#ff5b5b",
                  paddingHorizontal: 20
                }}
                icon={images.delet}
                iconStyle={{
                  // marginRight: 10,
                }}
                onPress={() => { delAlert(data.item.id) }}
              />
            )}
            disableRightSwipe={true}
            // leftOpenValue={0}
            rightOpenValue={-75}
          />
      }


      {/* <TextButton
        onPress={() => {
          console.log(navigation)
          navigation.replace('Alerts', {
            sep: species,
            id: id,
          });
        }}
        icon={images.bell}
        buttonContainerStyle={{
          //   flex:1,
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Add Alert'}
      /> */}
      <Toast ref={(ref) => { Toast.setRef(ref) }} config={toastConfig} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
