import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import { images,COLORS, FONTS } from '../../Components/Constants'
export default function Download({
    navigation,
    route
}) {
    const [url,setUrl] = React.useState('')
    React.useEffect(()=>{
        let {data} = route.params
        setUrl(data['link'])
    },[])
  return (
    <View style={{
        flex: 1,
        alignItems: 'center',
    }}>
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
              navigation.goBack();
            }}>
            <Image
              source={images.back}
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
        title="Download"    
        />
        <View style={{
            height:"75%",
            justifyContent:"center",
            alignItems:"center",
        }}>

        <Image
        source={images.download}
        style={{
            width:150,
            height:150,
        }}
        />
        <Text style={{
            ...FONTS.body3,
            marginTop:20
        }}>Click on the link to download the report</Text>
        <TouchableOpacity
        onPress={()=>{
            Linking.openURL(url)
        }
        }
        style={{
            marginTop:20,
            backgroundColor:COLORS.Primary,
            height:40,
            width:200,
            justifyContent:"center",
            borderRadius:10
        }}
        >
            <Text style={{
                ...FONTS.body3,
                color:COLORS.white,
                alignSelf:"center"
            }}>Download</Text>
            </TouchableOpacity>
            </View>
    </View>
  )
}