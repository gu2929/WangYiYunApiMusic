import axios from 'axios';
import cookie from 'js-cookie';
const url='http://123.206.55.50:14000';


export function getCookie () {
    return cookie.get('info')
  }
  export function setCookie (val) {
    return cookie.set('info',val)
  }
  export function getLoginApi (obj) {
    return axios.get(`${url}/login/cellphone?phone=${obj.phone}&password=${obj.password}`).then(res=>{
      return res.data;
    })
  }