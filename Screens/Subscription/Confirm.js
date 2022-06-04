import { View, Text,Modal } from 'react-native'
import React from 'react'
import { COLORS } from '../../Components/Constants'
export default function Confirm({navigation,route}) {
    const [Link,setLink] = React.useState('')
    React.useEffect(()=>{
        let {link} = route.params
        setLink(link)
    })
  return (
    <View style={{
        flex:1,
        backgroundColor:COLORS.white
    }}>
        <WebView source={{ uri:"herdhelp.com" }} />
    </View>
  )
}