import {View, Text, TouchableOpacity, Image, ScrollView,Platform,ActivityIndicator} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {images, SIZES, FONTS, COLORS} from '../../Components/Constants';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import { useSelector } from 'react-redux';
import TextButton from '../../Components/TextButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axiosIns from '../../helpers/helpers';
import Card from '../../Components/Card';
export default function Parents({navigation}) {
  const [tag, setTag] = React.useState('');
  const [id, setId] = React.useState('');
  const [err, setErr] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [animal, setAnimal] = React.useState('');
  const [babies, setBabies] = React.useState([]);
  const [Herd,setHerd] = React.useState([])
  const [Sold,setSold] = React.useState([])
  const species = useSelector(state => state.Reducers.cat)
  const tagl = useSelector(state => state.Reducers.tags)

  React.useEffect(() => {
    setId(global.id);
  }, []);
  function clear(){
    setTag('');
    setAnimal('');
  }
  
  async function findChildren() {
      setLoading(true);
      try {
        let {data} = await axiosIns.get(
          `reports/getchildren/${id}${animal}${tag}`,
        );
        if (data.length > 0 && data != undefined) {
          clear()
            navigation.navigate('ParentPage',{
              data:data,
            })
          setLoading(false);
          return data;
        } else {
          setLoading(false);
          setErr('babies Not found');
        }
      } catch (e) {
        setTag('');
        setLoading(false);
        setErr('Server Error');
      }
    }
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
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Parents'}
      />
    );
  }
  function finder(list, value) {
    var dataValue;
    list?.map(a => {
      if (value == a.label) {
        dataValue = a.data;
      }
    });
    return dataValue;
  }
  function renderForm() {
    return (
      <View
        style={{
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <Text style={{color: COLORS.red, alignSelf: 'center', ...FONTS.body3}}>
          {err}
        </Text>
        <Dropdown
          label="Species"
          dropdownIcon={images.down}
          dropdownIconSize={22}
          borderRadius={SIZES.radius}
          data={species}
          textInputStyle={(FONTS.body2, {letterSpacing: 2})}
          selectedItemTextStyle={
            (FONTS.body3,
            {color: COLORS.white, letterSpacing: 2, alignSelf: 'center'})
          }
          selectedItemViewStyle={{
            backgroundColor: COLORS.Primary,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          value={animal}
          onChange={(value)=>{
            setAnimal(value)
          }}
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
          }}
          itemContainerStyle={{backgroundColor: COLORS.white, margin: 5}}
        />
        <Dropdown
          label="Tags"
          dropdownIcon={images.down}
          dropdownIconSize={22}
          borderRadius={SIZES.radius}
          data={finder(tagl,animal)}
          textInputStyle={(FONTS.body2, {letterSpacing: 2})}
          selectedItemTextStyle={(FONTS.body3, {color: COLORS.white})}
          selectedItemViewStyle={{
            backgroundColor: COLORS.Primary,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          disableSelectionTick
          primaryColor={COLORS.Primary}
          avatarSize={28}
          value={tag}
          onChange={(value) => {
            setTag(value);
          }}
          mainContainerStyle={{
            borderRadius: SIZES.padding,
            width: '88%',
            alignSelf: 'center',
            marginTop: SIZES.height > 800 ? SIZES.base : 10,
          }}
          itemContainerStyle={{
            backgroundColor: COLORS.white,
            margin: 5,
            borderRadius: SIZES.radius,
          }}
        />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderheader()}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          marginBottom:SIZES.height>700?0:50

        }}>
        {renderForm()}
      </KeyboardAwareScrollView>
      
      {/* {
        babies != undefined || !loading ?
      (
      
      <ScrollView>{renderAnimal(babies)}</ScrollView> 
      ):
      (<ActivityIndicator size={"large"} color={COLORS.Primary}/>)
      } */}
      <TextButton
        onPress={() => {
          findChildren()
          
        }}
        icon={images.parents}
        loading={loading}
        buttonContainerStyle={{
          marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            marginBottom: SIZES.padding,
            borderTopLeftRadius: SIZES.radius,
            borderTopRightRadius: SIZES.radius,
            backgroundColor: COLORS.Primary,
        }}
        label={'Search Babies'}
      />
    </View>
  );
}
