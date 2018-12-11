import axios from 'axios';
const url='http://123.206.55.50:14000';
//获取搜索歌曲的接口 返回数据到redux
export function getsearchSongListApi (val) {
    return axios.get(`${url}/search?keywords=${val}`).then(res=>{
       return res.data.result.songs
    })
}