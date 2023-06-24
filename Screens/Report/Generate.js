import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,

} from 'react-native';
import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import axiosIns from '../../helpers/helpers';
import Header from '../../Components/Header';
import { COLORS, images, SIZES, FONTS } from '../../Components/Constants';
import SelectMultiple from 'react-native-select-multiple';
import TextButton from '../../Components/TextButton';
import Toast from 'react-native-toast-message'
import { toastConfig } from '../../App';
class Generate extends Component {
  state = {
    selectedFruits: [],
    loading: false,
    EmailError: '',
    Rang: COLORS.Primary,
    fields: [],
    loader: false
  };
  onSelectionsChange = selectedFruits => {
    this.setState({ selectedFruits });
  };
  fetchprofile = async () => {
    this.setState({ loading: true });
    const { data } = await axiosIns.get('getfields/');
    return data.reportdata;
  };
  componentDidMount() {
    {
      this.fetchprofile().then(data => {
        this.setState({ fields: data });
        this.setState({ loading: false });
      });
    }
  }
  genReport(dic, label) {
    this.setState({ loader: true });
    axiosIns
      .post(
        'reports/generate/',
        {
          reportdata: dic,
          filter: label,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        if (response.status == 200) {
          this.setState({ loader: false });
          this.props.navigation.navigate('Download', {
            data: response.data,
          }
          )

        } else {
          this.setState({ loader: false });
          Toast.show({
            text1: 'Something went wrong',
            type: 'error'
          });
        }
      })
      .catch(error => {
        if (error.response) {
          // console.log(error)
          this.setState({ loader: false });
          Toast.show({
            text1: `${error.response.data.msg}`,
            type: 'error',
          });
        }
      });
  }
  dataGen(data) {
    const dic = {};
    data.map(a => {
      dic[a.label] = true;
    });
    Object.keys(dic).length > 0
      ?
      this.genReport(dic, this.props.route.params.label)
      : (this.setState({ EmailError: 'Checkbox Not Selected' }),
        this.setState({ Rang: COLORS.red }));
  }
  renderHeader() {
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
                this.props.navigation.goBack();
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
        title={'Generate Report'}
        titleStyle={{
          marginLeft: 0,
        }}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        {this.renderHeader()}
        <Text
          style={{
            ...FONTS.body3,
            alignSelf: 'center',
            color: this.state.Rang,
          }}>
          {this.state.EmailError}
        </Text>
        {this.state.loading ? (
          <ActivityIndicator size="large" color={COLORS.Primary} />
        ) : (
          <SelectMultiple
            style={{
              marginBottom: SIZES.height > 700 ? 20 : 40,
            }}
            selectedCheckboxStyle={{
              tintColor: COLORS.Primary,
            }}
            labelStyle={{
              ...FONTS.body3,
            }}
            rowStyle={{
              width: '88%',
              alignSelf: 'center',
            }}
            checkboxStyle={{
              tintColor: COLORS.gray,
            }}
            items={this.state.fields}
            selectedItems={this.state.selectedFruits}
            onSelectionsChange={this.onSelectionsChange}
          />
        )}
        <TextButton
          label={'Generate'}
          icon={images.file}
          loading={this.state.loader}
          buttonContainerStyle={{
            marginBottom: 20,
            margin: 20,
          }}
          onPress={() => {
            // console.log(dic)
            // console.log(this.props.route.params.label)
            this.dataGen(this.state.selectedFruits);
          }}
        />
        <Toast ref={(ref) => { Toast.setRef(ref) }} config={toastConfig} />

      </View>
    );
  }
}
export default Generate;
