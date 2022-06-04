import {View, Text, TouchableOpacity, Image, FlatList,ActivityIndicator} from 'react-native';
import React from 'react';
import axiosIns from '../../helpers/helpers';
import Header from '../../Components/Header';
import TextButton from '../../Components/TextButton';
import FinanceCard from './FinanceCard';
import {COLORS, SIZES, images,FONTS} from '../../Components/Constants';
import ActivityIndicatorExample from '../../Components/Loading';
import { useSelector } from 'react-redux';

export default function FinanceInfo({navigation}) {
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
      {
        finance?.length<0?<ActivityIndicatorExample />:
        <FlatList
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
          )}/>
        }
        
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
