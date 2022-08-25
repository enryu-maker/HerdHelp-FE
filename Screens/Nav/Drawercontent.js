import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import React, { useContext } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { COLORS, SIZES, FONTS, images } from '../../Components/Constants';
import { Caption, Drawer, Title } from 'react-native-paper';
import LineDivider from '../../Components/LineDivider';
import axiosIns, { baseURL } from '../../helpers/helpers';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getOverview, Logout, UserData } from '../../Store/actions';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Drawercontent(props) {
  const subscribed = useSelector(state => state.Reducers.subscribed);
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(UserData())
    dispatch(getOverview())
  }, [])
  const User = useSelector(state => state.Reducers.userData)
  const overView = useSelector(state => state.Reducers.overView)

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView

        showsVerticalScrollIndicator={false}
        {...props}
        style={{ borderBottomWidth: 0.8, borderBottomColor: COLORS.Primary }}>
        <TouchableOpacity
          style={{
            flex: 1,
            height: 40,
            width: 40,
            backgroundColor: COLORS.Primary,
            borderRadius: 40 / 2,
            justifyContent: "center",
            alignSelf: "flex-end",
            marginRight: 20,
          }}
          onPress={() => {
            props.navigation.closeDrawer()
          }}
        >
          <Image source={images.x} style={{
            height: 22,
            width: 22,
            tintColor: COLORS.white,
            alignSelf: "center"
          }} />

        </TouchableOpacity>

        <TouchableWithoutFeedback
          style={styles.drawerContent}
          onPress={() => {
            props.navigation.navigate('MyAccount')
          }}
        >
          <View style={styles.userInfoSection}>
            <View style={[styles.row, { flexDirection: 'row' }]}>
              <Image
                source={{ uri: User?.profile_picture == null ? `https://ui-avatars.com/api/?name=${User?.username}` : User?.profile_picture }}
                resizeMode="cover"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 80 / 2,
                  borderColor: COLORS.white,
                  borderWidth: 1
                }}
              />
              <View />
              {global.User && (
                <View style={{ marginLeft: 20 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Title style={styles.title}>
                      {User?.fullname}
                    </Title>
                    {subscribed ? (
                      <Image
                        source={images.star}
                        style={{
                          width: 25,
                          height: 26,
                          margin: 6,
                        }}
                      />
                    ) : null}
                  </View>
                  <Caption style={[styles.caption, { color: COLORS.white }]}>
                    {User?.farm_name}
                  </Caption>
                  <Caption
                    style={
                      styles.caption
                    }>{`@ ${User?.username}`}</Caption>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
        <LineDivider
          lineStyle={{
            alignSelf: 'center',
            width: '100%',
            marginTop: 10,
            backgroundColor: COLORS.white,
          }}
        />
        <Drawer.Section style={[styles.drawerSection]}>
          <DrawerItem
            icon={({ color, size }) => (
              <Image
                source={images.home}
                style={[{ height: 25, width: 25, tintColor: COLORS.white }]}
              />
            )}
            label="Home"
            labelStyle={[FONTS.body3, { letterSpacing: 2, color: COLORS.white }]}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('Herds');
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Image
                source={images.file}
                style={[{ height: 25, width: 25, tintColor: COLORS.white }]}
              />
            )}
            label="Report"
            labelStyle={[FONTS.body3, { letterSpacing: 2, color: COLORS.white }]}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('Report');
            }}
          />
          {
            subscribed ? null :

              <DrawerItem
                icon={({ color, size }) => (
                  <Image
                    source={images.subs}
                    style={[{ height: 25, width: 25, tintColor: COLORS.white }]}
                  />
                )}
                label="Subscription"
                labelStyle={[FONTS.body3, { letterSpacing: 2, color: COLORS.white }]}
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate('Subscription', {
                    msg: '',
                    cond: false,
                  });
                }}
              />
          }
        </Drawer.Section>
        <Drawer.Section style={[styles.drawerSection, { marginTop: 5 }]}>
          <DrawerItem
            icon={({ color, size }) => (
              <Image
                source={images.weight}
                style={[{ height: 25, width: 25, tintColor: COLORS.white }]}
              />
            )}
            label="Weight History"
            labelStyle={[FONTS.body3, { letterSpacing: 2, color: COLORS.white }]}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('WeightH');
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Image
                source={images.parents}
                style={[{ height: 25, width: 25, tintColor: COLORS.white }]}
              />
            )}
            label="Parents"
            labelStyle={[FONTS.body3, { letterSpacing: 2, color: COLORS.white }]}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('Parents');
            }}
          />
        </Drawer.Section>
        <Drawer.Section>
          {/* <SafeAreaView style={{
            flex:1
          }}> */}
          <Text style={[FONTS.h3, { letterSpacing: 2, color: COLORS.white, alignSelf: "center" }]}>Herds OverView</Text>
          <View>
            <FlatList
              style={{
                alignSelf: "center",
                margin: 5
              }}
              disableVirtualization={false}
              data={overView?.animals_overview}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View key={index} style={{
                  flexDirection: 'row',
                  justifyContent: "space-evenly",
                  margin: 10
                }}>
                  <View style={{
                    height: 35,
                    width: 35,
                    borderRadius: 35 / 2,
                    alignSelf: "center",
                    backgroundColor: COLORS.white,
                    margin: 4,
                    justifyContent: "center"
                  }}>
                    <Text style={{
                      alignSelf: "center",
                      ...FONTS.h3,
                      color: COLORS.Primary
                    }} >
                      {item.count}
                    </Text>

                  </View>
                  <Text style={{
                    alignSelf: "center",
                    ...FONTS.body3,
                    color: COLORS.white
                  }} >
                    {item.label}
                  </Text>

                </View>

              )}
            />
          </View>
          {/* </SafeAreaView> */}

        </Drawer.Section>
      </DrawerContentScrollView>


      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Image
              source={images.logout}
              style={[{ height: 25, width: 25, tintColor: "#ff4d4d" }]}
            />
          )}
          label="Logout"
          labelStyle={[
            FONTS.body3,
            { letterSpacing: 2, color: "#ff4d4d", fontWeight: 'bold' },
          ]}
          onPress={() => {
            Alert.alert(
              "Account Logout",
              "Are you sure you want to Logout?",
              [
                {
                  text: "Cancel",
                  onPress: () => {
                    props.navigation.closeDrawer();
                    props.navigation.navigate('Herds');
                  },
                  style: "cancel"
                },
                { text: "Logout", onPress: () => dispatch(Logout()) }
              ]
            );
            // dispatch(Logout())
          }}
        />
      </Drawer.Section>
    </View>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 25,
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: COLORS.white,
  },
  caption: {
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: 1,
    color: COLORS.white,
  },
  row: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: COLORS.white,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopWidth: 0.8,
    borderTopColor: COLORS.white,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
