import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import {images, COLORS, SIZES, FONTS} from '../../Components/Constants';
import Header from '../../Components/Header';
import React from 'react';
import CustomButton from './CustomButtom';
import Card from './ButtonCard';
import { FlatList } from 'react-native-gesture-handler';

export default function AddModel({navigation}) {
  function renderheader() {
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
                justifyContent: 'center',
                borderRadius: 40 / 2,
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
        title={'Add'}
      />
    );
  }
  const data = [
      {
          'id':1,
          'label':'Add Animals',
          'image':images.addanimal,
          'nav':'Animals'
      },
      {
        'id':2,
        'label':'Add Medication',
        'image':images.med,
        'nav': 'medication',
        'cond': true,
    },
    {
        'id':3,
        'label':'Update Weight',
        'image':images.gain,
        'nav':'weight'
    },
  ]
  function renderButtons() {
    return (
        <FlatList
        style={{
          alignSelf:"center",
        }}
          data={data}
          numColumns={2}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
                <CustomButton
                  buttonContainerStyle={{
                    margin:10
                  }}
                  icon={item.image}
                  key={item.id}
                  label={item.label}
                  onPress={() => {
                      if(item.nav=='medication'){
                        navigation.navigate(item.nav,{
                            cond:true
                        })
                      }
                      else{
                        navigation.navigate(item.nav)
                      }
                  }}/>
               )} />
    )
  }
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
      }}>
      {renderheader()}
      {renderButtons()}
    </View>
  );
}
