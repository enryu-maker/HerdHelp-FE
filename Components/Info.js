import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import Header from './Header';
import {COLORS, SIZES, images, FONTS} from './Constants';
import InfoItem from './InfoItem';
import Status from './Status';
import TextButton from './TextButton';
import CustomButton from './CustomButton';
import PickerType from '../Screens/Livestocks/PickerType';
import Update from '../Screens/Account/Update';
import {useDispatch, useSelector} from 'react-redux';
import { CleanAnimal, getAnimal, getMedical } from '../Store/actions';
import ActivityIndicatorExample from './Loading';
import { baseURL } from '../helpers/helpers';
export const Info = ({navigation, route}) => {
  const [cond, setCond] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [profile_pic, setprofile_pic] = React.useState([]);
  const [picdata, setPicdata] = React.useState('');
  const [pic, setPic] = React.useState('');
  const [showu, setshowu] = React.useState(false);
  const [showc, setshowc] = React.useState(false);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  const dispatch = useDispatch()
  const animal = useSelector(state=>state.Reducers.animal)
  const med = useSelector(state=>state.Reducers.med)
  // console.log(animal)
  React.useEffect(() => {
    let {value} = route.params;
    let {cond} = route.params;
    dispatch(getAnimal(value.tag_number))
    dispatch(getMedical(value.tag_number))
    setCond(cond);
  }, []);
  const unit = JSON.parse(useSelector(state => state.Reducers.unit))

  function renderSectionOne() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <InfoItem label="Name" value={animal?.name} />
        <InfoItem label="Gender" value={animal?.gender} />
        {animal?.gender == 'Female' ? (
          <InfoItem label="Bred" value={animal?.bred == false ? 'No' : 'Yes'} />
        ) : (
          <View></View>
        )}
        <InfoItem label="Tag Number" value={animal?.support_tag} />
        <InfoItem
          label="Weight"
          value={ unit == true ? `${animal?.weight} lbs` : `${animal?.weight_kg} kg`}
          withDivider={false}
        />
      </View>
    );
  }
  function renderFileUri() {
    if (animal?.animal_image) {
      return (
        <View
          style={{
            height: 100,
            // width: 100,
            borderRadius: 100 / 2,
            alignSelf: 'center',
          }}>
          <Image
            source={{uri: baseURL + animal?.animal_image}}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              alignSelf: 'center',
              borderWidth: 2,
            }}
          />
          <View
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              backgroundColor: COLORS.Primary,
              height: 18,
              width: 30,
              justifyContent: 'center',
              marginTop: 70,
              borderRadius: 6,
            }}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h5,
                alignSelf: 'center',
              }}>
              Edit
            </Text>
          </View>
          <Text style={{alignSelf: 'center', ...FONTS.h3, paddingBottom: 10}}>
            {`ID: ${animal?.support_tag}`}
            
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            // backgroundColor:COLORS.lightGray1,
            height: 100,
            width: 100,
            borderRadius: 100 / 2,
            alignSelf: 'center',
          }}>
          <Image
            source={{uri: baseURL + animal?.image}}
            resizeMethod="auto"
            resizeMode="contain"
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              alignSelf: 'center',
              borderWidth: 2,
            }}
          />

          <View
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              backgroundColor: COLORS.Primary,
              height: 18,
              width: 30,
              justifyContent: 'center',
              marginTop: 70,
              borderRadius: 6,
            }}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h5,
                alignSelf: 'center',
              }}>
              Edit
            </Text>
          </View>
          <Text style={{alignSelf: 'center', ...FONTS.h3, paddingBottom: 10}}>
            ID: {animal?.support_tag}
          </Text>
        </View>
      );
    }
  }

  function renderSectionZero() {
    return (
      <CustomButton
        border={false}
        onPress={() => {
          navigation.navigate('MedCard', {
            animal: animal,
          });
        }}
        icon={images.rightone}
        iconStyle={{
          height: 20,
          width: 20,
        }}
        label={'Medical History'}
        buttonContainerStyle={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.Primary,
          width: '100%',
        }}
        iconContainerStyle={{
          borderWidth: 0,
        }}
        label2={med?.length}
      />
    );
  }
  function Vaccinated() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          marginBottom: SIZES.padding,
        }}>
        <InfoItem
          label="Vaccinated?"
          value={animal?.vaccinated ? 'Yes' : 'No'}
        />
        {animal?.vaccinated ? (
          <InfoItem
            label="Vacc Date"
            value={animal?.vaccination_date}
            withDivider={false}
          />
        ) : (
          <View></View>
        )}
      </View>
    );
  }
  function Type() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <InfoItem
          label="Type"
          value={animal?.bought == false ? 'Birth' : 'Purchased'}
        />
        {animal?.bought == false ? (
          <View>
            <InfoItem
              label="30 Days"
              value={unit == true ?`${animal?.weight_30} lbs` :`${animal?.weight_30_kg} kg`}
            />
            <InfoItem
              label="60 Days"
              value={unit == true ?`${animal?.weight_60} lbs`:`${animal?.weight_60_kg} kg`}
            />
            <InfoItem
              label="90 Days"
              value={unit == true ?`${animal?.weight_90} lbs`:`${animal?.weight_90_kg} kg`}
            />
            <InfoItem label="Date Of Birth" value={animal?.birth_date} />
            <InfoItem label="Mother's Tag" value={animal?.mother_supporttag} />
            <InfoItem
              label="Father's Tag"
              value={animal?.father_supporttag}
              withDivider={false}
            />
          </View>
        ) : (
          <>
            <InfoItem
              label="Price"
              value={`${formatter.format(animal?.price)}`}
              withDivider={false}
            />
          </>
        )}
      </View>
    );
  }
  function renderSectionFour() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <InfoItem label="Registration" value={animal?.registration} />
        <InfoItem label="Breed" value={animal?.breed} withDivider={false} />
      </View>
    );
  }
  function Babies() {
    return (
      <CustomButton
        buttonContainerStyle={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.Primary,
          width: '100%',
        }}
        border={false}
        icon={images.rightone}
        iconStyle={{
          height: 20,
          width: 20,
        }}
        iconContainerStyle={{
          borderWidth: 0,
        }}
        label={'Babies'}
        label2={animal?.children.length}
        label2Style={{
          color: COLORS.Primary,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        onPress={() => {
          navigation.navigate('ParentPage',{
            data:animal?.children,
            cond:true
          })
        }}
      />
    );
  }
  function renderSectionLast() {
    return (
      <View
        style={{
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <InfoItem label="Flagged Description?" withDivider={false} />
        <Text  style={Platform.OS=="android"?{ flex: 1, textAlign: 'left',  ...FONTS.body3,paddingBottom:20 }:{ flex: 1, textAlign: 'left',  ...FONTS.body2,paddingBottom:20 }}>{animal.flag_desc}</Text>

      </View>
    );
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
                backgroundColor: COLORS.Primary,
                height: 40,
                width: 40,
                justifyContent: 'center',
                borderRadius: 40 / 2,
              }}
              onPress={() => {
                navigation.goBack();
                dispatch(CleanAnimal())

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
        title={'More Info'}
        titleStyle={{
          marginLeft: cond ? 120 : 0,
        }}
        rightComponent={
          cond ? (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
              }}
              onPress={() => {
                setShow(true);
              }}>
              <Text
                style={{
                  padding: SIZES.padding,
                  color: COLORS.Primary,
                  ...FONTS.h2,
                }}>
                Status
              </Text>
            </TouchableOpacity>
          ) : (
            <View></View>
          )
        }
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      {show && <Status show={show} setShow={setShow} animal={animal} />}
      <PickerType
        show={showc}
        setshow={setshowc}
        setPic={setPic}
        setPicdata={setPicdata}
        setprofile_pic={setprofile_pic}
        setshowc={setshowu}
      />
      <Update
        showu={showu}
        setshowu={setshowu}
        profile={profile_pic}
        tag={animal?.tag_number}
        cond={false}
      />
      {
        animal?.length<0? <ActivityIndicatorExample/> :
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding
        }}>
        <TouchableOpacity
          onPress={() => {
            setshowc(true);
          }}>
          {renderFileUri()}
        </TouchableOpacity>
        {renderSectionOne()}
        {renderSectionZero()}
        {animal?.children?.length > 0 ? Babies() : null}
        {Type()}
        {renderSectionFour()}
        {Vaccinated()}
        {
          animal?.flagged?renderSectionLast():null
        }
        
      </ScrollView>
}

      {cond ? (
        <TextButton
          onPress={() => {
            Alert.alert('Are you sure', 'You want ot edit animal?', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Edit',
                onPress: () =>
                  navigation.navigate('editAnimal', {
                    animal: animal,
                  }),
                style: 'edit',
              },
            ]);
          }}
          icon={images.update}
          buttonContainerStyle={{
            // height: 60,
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            marginBottom: SIZES.padding,
            borderTopLeftRadius: SIZES.radius,
            borderTopRightRadius: SIZES.radius,
            backgroundColor: COLORS.Primary,
          }}
          label={'Edit Animal'}
          // loading={loading}
        />
      ) : null}
    </View>
  );
};
