import {baseURL} from './helpers/helpers';
import {request, PERMISSIONS, requestMultiple} from 'react-native-permissions';

import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, View, Platform} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {Init} from './Store/actions';
import {store} from './Store';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS} from './Components/Constants';
import Homenav from './Screens/Nav/Homenav';
import Rootnav from './Screens/Nav/Rootnav';
import {enableScreens} from 'react-native-screens';

const RootNavigation = () => {
  const token = useSelector(state => state.Reducers.authToken);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init());
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
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.Primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <FlashMessage position="top" />
      {token === null ? <Rootnav /> : <Homenav />}
    </NavigationContainer>
  );
};
export const Permission = React.createContext();
export const Access = React.createContext();
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