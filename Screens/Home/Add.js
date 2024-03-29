import { View, Text, TouchableOpacity, Image, TextInput, FlatList, Alert } from 'react-native'
import React from 'react'
import Header from '../../Components/Header';
import Card from '../../Components/Card';
import natsort from 'natsort';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  COLORS,
  FONTS,
  images,
  SIZES,
} from '../../Components/Constants';
import FilterModal from './filterModel';
import TextButton from '../../Components/TextButton';
import { useDispatch, useSelector } from 'react-redux';
import axiosIns from '../../helpers/helpers';
import { getHerds } from '../../Store/actions';
export default function Add({ navigation, route }) {
  const [label, setLabel] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [cond, setCond] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const [showFilter, setShowFilter] = React.useState(false)
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  // const [data, setData] = React.useState([])
  const [searched, setSearched] = React.useState("")
  const [sep, setSpec] = React.useState('')
  const [vacc, setVacc] = React.useState('')
  const [med, setMed] = React.useState('')
  const [Bred, setBred] = React.useState('')
  const [Animal, setAnimal] = React.useState([])
  var sorter = natsort();
  const dispatch = useDispatch();
  React.useEffect(() => {

    let { label } = route.params
    let { data } = route.params
    let { cond } = route.params
    setCond(cond)
    if (!loading) {
      setLabel(label)
      setAnimal(data)
      // data.sort((function(a, b) {
      //   return sorter(a.support_tag, b.support_tag)
      // }));
      // console.log(data)
    }
  }, [])

  function deleteAnimal(item) {
    axiosIns.delete(`/animals/${item}`)
      .then((res) => {
        dispatch(getHerds())
        alert("Animal Deleted")
      }
      )
      .catch((err) => {
        console.log(err)
      })
  }


  function filterList(list) {
    return list.filter(
      (listItem) =>
        (listItem.tag_number
          .toString()
          .toLowerCase()
          .includes(searched.toString().toLowerCase()) ||
          listItem.name.toString().toLowerCase().includes(searched.toString().toLowerCase()) ||
          listItem.weight.toString().includes(searched.toString().toLowerCase()) ||
          listItem.gender.toLowerCase().includes(searched.toLowerCase())) &&
        (listItem.species
          .toString()
          .includes(sep.toString()) &&
          (listItem.vaccinated
            .toString()
            .includes(vacc.toString()) &&
            listItem.medicated
              .toString()
              .includes(med.toString())
          ) &&
          listItem.bred
            .toString()
            .includes(Bred.toString())
        )
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
                justifyContent: "center",
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
                  alignSelf: "center",

                }}
              />
            </TouchableOpacity>
          </View>
        }
        title={label == "Sheep" ? `My ${label}` : `My ${label}s`}

        titleStyle={{
          marginLeft: 65,
        }}
        rightComponent={
          <View
            style={{
              marginTop: 20,
              flexDirection: "row"
            }}>

            <View
              style={{
                marginRight: 5,
                backgroundColor: COLORS.Primary,
                height: 40,
                width: 40,
                justifyContent: "center",
                borderRadius: 40 / 2,
                justifyContent: "center"
              }}>
              <Text style={{
                color: COLORS.white,
                ...FONTS.h2,
                alignSelf: "center"
              }}>{Animal.length}</Text>
            </View>
            <TouchableOpacity
              style={{
                marginRight: 25,
                backgroundColor: COLORS.Primary,
                height: 40,
                width: 40,
                justifyContent: "center",
                borderRadius: 40 / 2,
                justifyContent: "center"
              }}
              onPress={() => {
                setShow(!show)
              }}
            >
              <Image source={images.search} style={{
                height: 28,
                width: 28,
                alignSelf: "center",
                tintColor: COLORS.white
              }} />
            </TouchableOpacity>
          </View>
        }
      />
    );
  }
  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginVertical: 5,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          bottom: Platform.OS === 'ios' ? null : 5,
          marginTop: Platform.OS === 'ios' ? 20 : null,
          marginBottom: Platform.OS === 'ios' ? 20 : null,
        }}>
        {/* Icon */}
        <Image
          source={images.search}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.gray,
          }}
        />

        {/* Text Input */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
            height: 100,
            marginTop: Platform.OS === 'ios' ? null : 5,
          }}
          placeholder="search..."
          placeholderTextColor={COLORS.gray}
          onChangeText={text => { setSearched(text) }}
        />
        <TouchableOpacity
          onPress={() => {
            setShowFilterModal(true)
          }}
        >
          <Image
            source={images.filter}
            style={{
              height: 22,
              width: 22,
              tintColor: COLORS.Primary,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {renderHeader()}
      {
        show ? renderSearch() : null
      }
      {
        showFilterModal &&
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)
          }
          vacc={vacc}
          setMed={setMed}
          med={med}
          setVacc={setVacc}
          setSpec={setSpec}
          bred={Bred}
          setBred={setBred}
        />
      }
      <Text style={{ ...FONTS.h4, color: COLORS.Primary, alignSelf: "center" }}>
        Swipe Left To{" "}
        <Text style={{ ...FONTS.h4, color: COLORS.red, marginLeft: 10 }}>
          Delete
        </Text>
      </Text>
      <SwipeListView
        // style={{
        //   marginBottom:SIZES.height>700?Platform.OS=="ios"?120:90:75,
        // }}
        data={filterList(Animal)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Card
            Flagged={item?.flagged}
            cond={cond}
            Name={item.name}
            Tagnumber={item.support_tag}
            Gender={item.gender}
            Species={item.category}
            Weight={item.weight}
            image={item.animal_image == null ? item.image : item.animal_image}
            weight_kg={item.weight_kg}
            birth={item.bought}
            onPress={() => {
              navigation.navigate('Info', {
                value: item,
                cond: cond,
              });
            }}
          />
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={{
            flexDirection: "row",
            alignSelf: "center",
            marginTop: 5,

          }}>

            <TextButton
              buttonContainerStyle={{
                // flex: 1,
                justifyContent: "flex-end",
                height: 120,
                width: "88%",
                marginTop: 5,
                backgroundColor: COLORS.red,
              }}
              border={false}
              icon={images.delet}
              iconStyle={{
                height: 30,
                width: 30,
                marginRight: 15
              }}
              onPress={() => {
                Alert.alert(
                  "Delete",
                  "Are you sure you want to delete this animal?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    {
                      text: "OK", onPress: () => {
                        deleteAnimal(data.item.tag_number)
                        navigation.goBack()

                      }
                    }
                  ]
                );
              }}
            />
          </View>
        )}
        // leftOpenValue={75}
        rightOpenValue={-75}
      />
      {/* <FlatList
        data={filterList(Animal)}
        // keyExtractor={item => `${item.support_tag}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Card
            Flagged={item?.flagged}
            cond={cond}
            Name={item.name}
            Tagnumber={item.support_tag}
            Gender={item.gender}
            Species={item.category}
            Weight={item.weight}
            image={item.animal_image == null ? item.image : item.animal_image}
            weight_kg={item.weight_kg}
            birth={item.bought}
            onPress={() => {
              navigation.navigate('Info', {
                value: item,
                cond: cond,
              });
            }}
          />
        )} /> */}
    </View>
  )
}