import { View, Text,TouchableOpacity,Image,ScrollView } from 'react-native'
import React from 'react'
import { images,FONTS,SIZES, COLORS, formatter } from '../../Components/Constants';
import Header from '../../Components/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../Home/CustomButtom';
import TextButton from '../../Components/TextButton'
function SubDetails({navigation,route}) {
  const [Amount,setAmount] =React.useState(0)
  const [Data,setData] =React.useState(0)
  const [active,setActive] =React.useState(route.params.cond)
    React.useEffect(()=>{
      let {data} = route.params
      setData(data)
      setAmount((data.price*100).toFixed(0))
    },[])
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
                    borderRadius:40/2,

                  }}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image
                    source={images.back}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: COLORS.white,
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>
              </View>
            }
            title={"Details"}
          />
        );
      }
    function renderContent(){
        return(
            <View style={{
                backgroundColor:COLORS.lightGray2,
                // height:100,
                width:"88%",
                alignSelf:"center",
                borderRadius:SIZES.radius,
                marginTop:20,
            }}>
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between"
                }}>
                <Text style={{
                ...FONTS.h2,
                marginTop:10,
                marginLeft:10,
                // color:active?COLORS.white:COLORS.black
            }}>{route.params.data.label}</Text>
            {
                active && route.params.cond?<Image source={images.paid} style={{
                    height:50,
                    width:50,
                    marginLeft:65,
                    tintColor:COLORS.Primary,
                    margin:10
                }}/>:null
            }
            
        </View>
        {
            active && route.params.cond?<>
            <Text style={{
                ...FONTS.h3,
                marginTop:10,
                marginLeft:10,
                // color:active?COLORS.white:COLORS.black
            }}>{`Start Date : ${Data.start_date} `}</Text>
            <Text style={{
                ...FONTS.h3,
                marginTop:10,
                marginLeft:10,
                // color:active?COLORS.white:COLORS.black
            }}>{`End Date : ${Data.expiry_date}`}</Text>
            <Text style={{
                ...FONTS.h3,
                margin:10,
                // marginLeft:10,
                // color:active?COLORS.white:COLORS.black
            }}>{`Animal Count : ${Data.usage}`}</Text>
            </>:<>
            <Text style={{
                ...FONTS.h3,
                marginTop:10,
                marginLeft:10,
                // color:active?COLORS.white:COLORS.black
            }}>{`Price : ${formatter.format(route.params.data.price)} `}</Text>
            <Text style={{
                ...FONTS.h3,
                marginLeft:10,
                marginTop:10,

                // marginLeft:10,
                // color:active?COLORS.white:COLORS.black
            }}>{`Animal Count : ${route.params.data.count} `}</Text>
            <Text style={{
            ...FONTS.body3,
            margin:10,
            color:active && route.params.cond?COLORS.white:COLORS.black
        }}>
           {`${route.params.data.description}`}
        </Text>
            </>
        }
            </View>
        )
    }
    function renderTable(){
        return(
            <View style={{
                backgroundColor:COLORS.lightGray2,
                height:100,
                width:"88%",
                alignSelf:"center",
                borderRadius:SIZES.radius,
                marginTop:20,
                flexDirection:"row",
                
            }}>
                <View style={{
                    justifyContent:"center"
                }}>
                <Text style={{
                    ...FONTS.h2,
                    justifyContent:"center",
                    marginLeft:50
                    
                }}>
                    1
                </Text>
                
                </View>
                <View style={{
                    justifyContent:"center"
                }}>
                <Text style={{
                    ...FONTS.h2,
                    justifyContent:"center",
                    marginLeft:20

                    
                }}>
                    X
                </Text>
                
                </View>
                <View style={{
                    justifyContent:"center"
                }}>
                <Text style={{
                    ...FONTS.h2,
                    justifyContent:"center",
                    marginLeft:20
                }}>
                   {route.params.data.price}
                </Text>
                
                </View>
                <View
            style={{
                height: 80,
                width: 1,
                backgroundColor: COLORS.Primary,
                justifyContent:"center",
                alignSelf:"center",
                marginLeft:20
            }}
        />
        <View style={{
                    justifyContent:"center"
                }}>
                <Text style={{
                    ...FONTS.h2,
                    justifyContent:"center",
                    marginLeft:35

                    
                }}>
                   {` ${formatter.format( route.params.data.price)}`}
                </Text>
                
                </View>

            </View>
        )
    }
  return (
    <View style={{
        flex:1,
        backgroundColor:COLORS.white
    }}>
      {renderheader()}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingBottom: 40,
        }}>
      {renderContent()}
      {renderTable()}
      </KeyboardAwareScrollView>
      <TextButton
        onPress={() => {
          navigation.navigate("Address",{
            data:Amount,
            label:Data.label
          })
        }}
        icon={images.right}
        iconContainerStyle={{
            borderWidth:0
        }}
        buttonContainerStyle={{
          height: 60,
          marginTop: SIZES.padding,
          // marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding + 10,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={active && route.params.cond?'Renew':'Proceed'}
        label2={formatter.format( route.params.data.price)}
        label2Style={{
          justifyContent:"center",
          color:COLORS.Primary,
          alignSelf:"center",
          marginBottom:3

        }}
        labelStyle={{
            marginLeft:50
        }}
        buttonContainerStyle2={{
            width:80,
            height:30,
            backgroundColor:COLORS.white,
            marginBottom:15,
            marginLeft:15
        }}
      />
    </View>
  )
}
export default SubDetails;