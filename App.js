import { baseURL } from './helpers/helpers';
import { request, PERMISSIONS, requestMultiple } from 'react-native-permissions';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View, Platform, Text } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Init, isSubscriptionActive } from './Store/actions';
import { store } from './Store';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS, FONTS, SIZES } from './Components/Constants';
import Homenav from './Screens/Nav/Homenav';
import Rootnav from './Screens/Nav/Rootnav';
import { enableScreens } from 'react-native-screens';
import Subscription from './Screens/Subscription/Subscription';
const RootNavigation = () => {
  const token = useSelector(state => state.Reducers.authToken);
  const subscribed = useSelector(state => state.Reducers.subscribed);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const init = async() => {
    await dispatch(Init());
    // await dispatch(isSubscriptionActive())
    setLoading(false);
  };

  useEffect(() => {
    enableScreens(true);
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    init();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.Primary} />
        <Text style={{
          ...FONTS.body3,
          color: COLORS.Primary,
          alignSelf: "center"
        }}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <FlashMessage position="top" />
      { token === null ? <Rootnav /> : subscribed ? <Homenav /> : <Subscription/> }
      {/* {token === null ? <Rootnav /> : <Homenav />} */}

    </NavigationContainer>
  );
};
export const Permission = React.createContext();
export const Access = React.createContext();
export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: COLORS.Primary }}
      contentContainerStyle={{ paddingHorizontal: SIZES.padding }}
      text1Style={{
        ...FONTS.body3,
        color:COLORS.Primary
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: COLORS.red }}
      text1Style={{
        ...FONTS.body3,
        color:COLORS.red
      }}
    />
  )
};
const App = () => {
  const [PermissionResult, setPermissionResult] = React.useState(null);
  requestMultiple(
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]
      : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION],
  ).then(result => {
    setPermissionResult(result);
  });
  // console.log(pub)

  return (
    <Provider store={store}>
      <Permission.Provider value={PermissionResult}>
        <StatusBar
          barStyle={Platform.OS === 'android' ? 'default' : 'dark-content'}
          backgroundColor={'black'}
        />
        <RootNavigation />
      </Permission.Provider>
    </Provider>
  );
};

export default App;