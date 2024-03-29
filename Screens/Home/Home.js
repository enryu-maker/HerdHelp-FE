import {View, Text, Image, TouchableOpacity, FlatList,Modal, ScrollView, Platform, Linking} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../Components/Header';
import {COLORS, FONTS, images, SIZES} from '../../Components/Constants';
import TextButton from '../../Components/TextButton';
import  { baseURL } from '../../helpers/helpers';
import CustomButton from './CustomButtom';
import { useSelector } from 'react-redux';
import ActivityIndicatorExample from '../../Components/Loading';
import { getAppstoreAppMetadata } from "react-native-appstore-version-checker";
export const Home = ({navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const animals = useSelector(state=>state.Reducers.herds)
  const update = useSelector(state=>state.Reducers.update)
  React.useEffect(() => {
    const storeSpecificId = Platform.OS === "ios" ? "1627766617" : "com.herdhelp";
    getAppstoreAppMetadata(storeSpecificId) //put any apps id here
        .then(appVersion => {
           Platform.OS==="ios"?setModalVisible(appVersion.version!="1.4"):setModalVisible(appVersion.version!="1.4")
        })
        .catch(err => {
          setModalVisible(false)
        });
  }, [])



  const User = useSelector(state=>state.Reducers.userData)
  function removeDuplicates(arr) {
    let jsonObject = arr.map(JSON.stringify);
    let uniqueSet = new Set(jsonObject);
    let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    return uniqueArray
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        >
        <View style={{
          // flex:1,
          height: SIZES.height,
          width: SIZES.width,
          alignItems:"center",
          justifyContent:"space-evenly",
          backgroundColor:"rgba(256,256,256,0.90)"
        }} >
          <TouchableOpacity style={{
            alignSelf:"flex-end",
            marginRight:20,
          }}
          onPress={()=>setModalVisible(false)}
          >
            <Image source={images.x} style={{
              height:30,
              width:30,
            }} onPress={()=>setModalVisible(false)} />
          </TouchableOpacity>
          <Text style={{
            ...FONTS.h2,
            letterSpacing:1,
          }}>
           New Version Available
          </Text>
          <Text style={{
            ...FONTS.h1,
            letterSpacing:1,
          }}>
          {` V ${Platform.OS==="ios"?update['version_ios']:update['version_android']} 🐄`}
          </Text>
          <View style={{
            height:250,
            width:SIZES.width*0.8,
          }}>
            <Text style={{
            ...FONTS.h2,
            color:COLORS.Primary,
            letterSpacing:1,
          }}>
           Features 🔥
          </Text>
          <FlatList style={{
            width:SIZES.width*0.8,
            backgroundColor:COLORS.white,
            borderRadius:10,
            padding:10
          }}
          data={update['features']?.split('|')}
          keyExtractor={item=>item}
          renderItem={({item,index})=>

            <Text style={{
              ...FONTS.h3,
              textAlign:"left",
            }}>
              {`${index+1}. ${item}`}
            </Text>
          }
          />
          </View>
          <TextButton
          onPress={()=>{
            Linking.openURL(Platform.OS==="ios"?update['download_link_ios']:update['download_link_android'].toString())
          }}
          border={false}
          buttonContainerStyle={{
            margin:0,
            padding:0
          }}
          icon={images.update}
          label={"Update"}
          />
        </View>
      </Modal>
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
                label={item.label=="Sheep"?`My ${item.label}`:`My ${item.label}s`} 
                label2={`${removeDuplicates(item.data)?.length}`}
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
