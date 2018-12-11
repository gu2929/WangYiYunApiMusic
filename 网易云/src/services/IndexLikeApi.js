import axios from 'axios';
const url='http://123.206.55.50:14000';
//banner 歌单 最新歌单 vip数据的接口 返回数据到redux
export function getBannerApi () {
  return axios.get(`${url}/banner`).then(res=>{
    return res.data.banners;
  })
}
export function getSongListApi () {
  return axios.get(`${url}/personalized`).then(res=>{
    return res.data.result;
  })
}
export function getNewSongListApi () {
  return axios.get(`${url}/personalized/newsong`).then(res=>{
    return res.data.result;
  })
}
export function getBroadcastingListApi () {
  return axios.get(`${url}/personalized/djprogram`).then(res=>{
    return res.data.result;
  })
}
export function getVipListApi () {
  return axios.get(`${url}/personalized/privatecontent`).then(res=>{
    return res.data;
  })
}