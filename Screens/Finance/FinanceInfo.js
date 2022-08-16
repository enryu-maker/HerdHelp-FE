import {View, Text, TouchableOpacity, Image, FlatList,SafeAreaView} from 'react-native';
import React from 'react';
import axiosIns from '../../helpers/helpers';
import Header from '../../Components/Header';
import TextButton from '../../Components/TextButton';
import FinanceCard from './FinanceCard';
import {COLORS, SIZES, images,FONTS} from '../../Components/Constants';
import ActivityIndicatorExample from '../../Components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { deleteFinance } from '../../Store/actions';

export default function FinanceInfo({navigation}) {
  const dispatch = useDispatch()
  const finance = useSelector(state=>state.Reducers.finance)
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
                backgroundColor:COLORS.Primary,
                height:40,
                width:40,
                justifyContent:"center",
                alignSelf:"center",
                borderRadius:40/2,
                }}
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Image
                source={images.menu}
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Finance'}
        titleStyle={{
          marginLeft:120
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
                backgroundColor:COLORS.Primary,
                height:40,
                width:110,
                flexDirection:"row",
                justifyContent:"space-evenly",
                borderRadius:15,
                }}
                onPress={() => {
                  navigation.push('Finance');
                  }}>
                    <Image source={images.add} style={{
              height:25,
              width:25,
              tintColor:COLORS.white,
              alignSelf:"center"
            }}/>
              <Text style={{
                ...FONTS.h3,
                color:COLORS.white,
                alignSelf:"center"
              }}>
              Finance
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    );
  }
  return (
    <View style={{flex: 1}}>
      {renderHeader()}
      <Text style={{
        ...FONTS.h3,
        color:COLORS.Primary,
        alignSelf:"center"
      }}>
        Swipe Right to <Text style={{
        ...FONTS.h3,
        color:COLORS.red,
        alignSelf:"center"
      }}>Delete</Text>
      </Text>
      <SafeAreaView style={{
        flex:1
      }}>
      {
        finance?.length<0?<ActivityIndicatorExample />:
        <SwipeListView
        data={finance}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <FinanceCard
            key={index}
            category={item.category}
            price={item.price}
            quantity={item.quantity}
            date={item.added_date}
          />
          )}
          renderHiddenItem={(data, rowMap) => (
            <TextButton
            buttonContainerStyle={{
                    // flex: 1,
                    justifyContent:"flex-end",
                    height:120,
                    marginTop:5,
                    backgroundColor: COLORS.red,
                }}
                icon={images.delet}
                iconStyle={{
                  height:30,
                  width:30,
                  marginRight:15
                }}
                onPress={() =>  {dispatch(deleteFinance(data.item.id))}}
            />
        )}
        disableRightSwipe
        rightOpenValue={-75}
          />
        }
        </SafeAreaView>
        
      {/* <TextButton
        onPress={() => {
          navigation.replace('Finance');
        }}
        icon={images.money}
        buttonContainerStyle={{
          //   flex:1,
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding + 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Add Finance'}
      /> */}
    </View>
  );
}
