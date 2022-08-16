import {View, Text, Image, TouchableOpacity, FlatList,} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {COLORS, FONTS, images, SIZES} from '../../Components/Constants';
import TextButton from '../../Components/TextButton';
import axiosIns, { baseURL } from '../../helpers/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from './CustomButtom';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getHerds } from '../../Store/actions';
import ActivityIndicatorExample from '../../Components/Loading';
export const Home = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const animals = useSelector(state=>state.Reducers.herds)
  const User = useSelector(state=>state.Reducers.userData)
  
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
                borderRadius:40/2,
                }}
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Image
                source={images.menu}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.white,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
        }
        title={'My Herds'}
        titleStyle={{
          marginLeft:70
        }}
        rightComponent={
                  <View
                    style={{
                      marginTop: 20,
                    }}>
                    <TouchableOpacity
                      style={{
                        marginRight: 25,
                        height: 40,
                        width: 40,
                        borderRadius: 40 / 2,
                justifyContent:"center",
                      }}
                      onPress={() => {
                        navigation.navigate('MyAccount');
                      }}>
                      <Image
                        source={{uri: User?.profile_picture==null?`https://ui-avatars.com/api/?name=${User?.username}`: User?.profile_picture}}
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 40 / 2,
                          borderWidth: 0.8,
                          borderColor: COLORS.Primary,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                }
      />
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {renderHeader()}
      {
        animals?.length===0?<ActivityIndicatorExample/>:
      <FlatList
      style={{
        alignSelf:"center",
      }}
        data={animals}
        numColumns={2}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          item.data.length>0?
              <CustomButton
                buttonContainerStyle={{
                  margin:10
                }}
                icon={{uri: baseURL + item.data[0]?.image}}
                key={index}
                label={item.label=="Sheep"?`My ${item.label}`:`My ${item.label}'s`} 
                label2={`${item.data?.length}`}
                onPress={() => {
                  navigation.navigate('add', {
                    label: item.label,
                    data: item.data,
                    cond:true
                  });
                }}
              />:null
        )}/>
              }
    </View>
  );
};
