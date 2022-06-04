import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import React from 'react';
import {images, COLORS, SIZES} from '../../Components/Constants';
import Header from '../../Components/Header';
import { ActivityIndicator } from 'react-native-paper';
import ReportB from './ReportB';
import axiosIns from '../../helpers/helpers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../Home/CustomButtom';

export default function Report(props) {
  const [report, setReport] = React.useState([]);
  const [footer, setFooter] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function getReports() {
    setLoading(true);
    let {data} = await axiosIns.get('reports/');
    setLoading(false);
    return data;
  }
  
  React.useEffect(() => {
    getReports().then(data => {
      setReport(data);
    });

  }, []);
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
                props.navigation.openDrawer();
              }}>
              <Image
                source={images.menu}
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Reports'}
      />
    );
  }
  function renderButtons() {
    return (
      
          
          <FlatList
      data={report}
      style={{
        alignSelf:"center",
        paddingBottom:20
      }}
      numColumns={2}
      keyExtractor={item => `${item.id}`}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
            <CustomButton
            buttonContainerStyle={{
              margin:10
            }}
            cond={true}
              key={item.id}
              icon={item.image}
              label={item.name}
              onPress={() => {
                props.navigation.navigate('ReportOP', {
                  label: item.name,
                  api: item.api.toString(),
                  cond: false,
                  footer:
                  item.name == 'Lost Animals' ||
                  item.name == 'Sold Animals' ||
                  item.name == 'Purchased Animals'
                      ? true
                      : false,
                });
              }}
            />
          )}/>
  
    );
  }
  return (
    <View style={{flex: 1,backgroundColor:COLORS.white}}>
      {renderheader()}
      {loading ? (
          <ActivityIndicator
            animating={loading}
            color={COLORS.Primary}
            size="large"
            style={{height: SIZES.height/2}}
          />
        ):
        renderButtons()
      }
    </View>
  );
}
