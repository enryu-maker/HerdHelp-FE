import { View, Text, TouchableOpacity, Image, Modal, FlatList } from 'react-native'
import React from 'react'
import Header from '../../Components/Header';
import { COLORS, images, FONTS, SIZES } from '../../Components/Constants';
import TutorialCard from './TutorialCard';
import axiosIns from '../../helpers/helpers';
import Loader from '../../Components/Loader';
import { ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message'
import { toastConfig } from '../../App';


export default function Tutorial({
    navigation
}) {
    const [videos, setVideo] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const getVideos = async () => {
        setLoading(true)
        await axiosIns.get("/gettutorials").then((Response) => {
            if (Response.status == 200) {
                setVideo(Response.data)
                setLoading(false)
            }
            else {
                Toast.show({
                    text1:"error",
                    type:"error"
                })
                setLoading(false)

            }
        }).catch((e) => {
            Toast.show({
                text1:"error",
                type:"error"
            })
            setLoading(false)

        })
    }
    React.useEffect(() => {
        getVideos()
    }, [])
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
                title={'Tutorial'}
            />
        );
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            {renderheader()}
            {
                loading ? <ActivityIndicator color={COLORS.Primary} style={{
                    flex: 1,
                    justifyContent: "center",
                    alignSelf: "center"
                }} /> :

                    <FlatList
                        data={videos}
                        renderItem={({ item, index }) => (
                            <TutorialCard key={index} link={item.link} image={item.image} title={item.title} />
                        )} />
            }
            <Toast ref={(ref) => { Toast.setRef(ref) }} config={toastConfig} />
        </View>
    )
}