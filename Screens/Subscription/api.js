import axiosIns from "../../helpers/helpers";
export const API_URL = 'https://api-herdhelp-nerdtech-q984k.ondigitalocean.app'

export default class ApiService{
  static saveStripeInfo(data={}){
    return axiosIns.post(`/payments/save-stripe-info/`, data)
  }
}
