import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosIns from "../helpers/helpers";
import { Platform } from "react-native";
import * as RNIap from 'react-native-iap';
export const Init = () => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('token');
    let id = await AsyncStorage.getItem('id');
    if (token !== null && id !== null) {
      dispatch({
        type: 'LOGIN',
        payload: token,
      })
    }
  }
}
export const isSubscriptionActive = () => {
  let sub;
  const itemSkus = Platform.select({
    ios: [
      'T699'
    ],
    android: [
      'hh_t699'
    ]
  });
  return async dispatch => {
    await RNIap.initConnection().then(async() => {
      await RNIap.clearTransactionIOS()
      const purchases = await RNIap.getAvailablePurchases();
      console.log(purchases)
      let active = false;
      purchases.forEach(purchase => {
        if (purchase.productId == itemSkus) {
          active = true;
        }
      })
      if (active == false) {
        console.log("error done")
        sub = false
      } else {
        sub = true
        console.log("done")
      }
    }).catch((err) => {
      console.log("suberr=>", err)
    })
    dispatch({
      type: 'PREMIUM',
      payload: sub,
    })
  }
}
export const Login = (token, id) => {
  return async dispatch => {
    if (token && id) {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('id', id);
      await AsyncStorage.setItem('unit', "true");
    }
    dispatch({
      type: 'LOGIN',
      payload: token,
    })
  }
}
export const getGender = () => {
  return async dispatch => {
    let { data } = await axiosIns.get('getanimaltypes/');
    dispatch({
      type: 'GENDER',
      payload: data
    })
  }
}
export const WeightUnit = (cond) => {
  return async dispatch => {
    if (cond) {
      await AsyncStorage.setItem('unit', cond);
    }
    dispatch({
      type: 'UNIT',
      payload: cond,
    })
  }
}
export const getUnit = () => {
  return async dispatch => {
    let unit = await AsyncStorage.getItem('unit');
    dispatch({
      type: 'UNIT',
      payload: unit,
    })
  }
}
export const UserData = () => {
  return async dispatch => {
    let { data } = await axiosIns.get('profile/');
    dispatch({
      type: 'USER',
      payload: data[0]
    })
  }
}
export const getHerds = () => {
  return async dispatch => {
    let { data } = await axiosIns.get('animals/');
    dispatch({
      type: 'HERDS',
      payload: data
    })
  }
}
export const getOverview = () => {
  return async dispatch => {
    let { data } = await axiosIns.get('reports/getoverview/');
    dispatch({
      type: 'OVERVIEW',
      payload: data
    })
  }
}
export const getStatus = () => {
  return async dispatch => {
    let { data } = await axiosIns.get('getstatuses/');
    dispatch({
      type: 'STATUS',
      payload: data
    })
  }
}
export const getTags = () => {
  return async dispatch => {
    let { data } = await axiosIns.get('animaltags/');
    dispatch({
      type: 'TAGS',
      payload: data
    })
  }
}
export const getSpecies = () => {
  return async dispatch => {
    let { data } = await axiosIns.get('getcategories/');
    dispatch({
      type: 'CATEGORY',
      payload: data
    })
  }
}
export const getFinance = () => {
  return async dispatch => {
    let { data } = await axiosIns.get('finance/');
    dispatch({
      type: 'FINANCE',
      payload: data
    })
  }
}
export const deleteFinance = (id) => {
  return async dispatch => {
    let { data } = await axiosIns.delete(`finance/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    getFinance()
  }
}
export const getAlerts = () => {
  return async dispatch => {
    let { data } = await axiosIns.get('alerts/');
    dispatch({
      type: 'ALERTS',
      payload: data
    })
  }
}
export const getAnimal = (tag) => {
  return async dispatch => {
    let { data } = await axiosIns.get(`animals/${tag}`);
    dispatch({
      type: 'ONEANIMAL',
      payload: data
    })
  }
}
export const getParent = (tag) => {
  return async dispatch => {
    let { data } = await axiosIns.get(`animals/${tag}`);
    dispatch({
      type: 'PARENT',
      payload: data
    })
  }
}
export const getBabies = (tag) => {
  return async dispatch => {
    let { data } = await axiosIns.get(`babiesbydate/${tag}`);
    dispatch({
      type: 'BABY',
      payload: data
    })
  }
}
export const CleanAnimal = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAN',
      payload: null
    })
  }
}
export const CleanParent = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEANP',
      payload: null
    })
  }
}
export const getMedical = (tag) => {
  return async dispatch => {
    let { data } = await axiosIns.get(`getmedication/${tag}`);
    dispatch({
      type: 'ONEMED',
      payload: data
    })
  }
}
export const getMedicalP = (tag) => {
  return async dispatch => {
    let { data } = await axiosIns.get(`getmedication/${tag}`);
    dispatch({
      type: 'ONEMEDP',
      payload: data
    })
  }
}
export const getFcat = () => {
  return async dispatch => {
    let { data } = await axiosIns.get(`getfinancecategories/`);
    dispatch({
      type: 'FCAT',
      payload: data
    })
  }
}

export const Logout = () => {
  return async dispatch => {
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT'
    })
  }
}