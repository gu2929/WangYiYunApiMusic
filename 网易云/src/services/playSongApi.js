import axios from 'axios';
const url='http://123.206.55.50:14000';
export function getSongUrlApi (val) {
    return axios.get(`${url}/song/url?id=${val}`).then(res=>{
        return res.data.data;
    })
}
export function getSongDetailApi (val) {
    return axios.get(`${url}/song/detail/?ids=${val}`).then(res=>{
        return res.data.songs;
    })
}
export function getSongLyricApi (val) {
    return axios.get(`${url}/lyric?id=${val}`).then(res=>{
        return res.data.lrc.lyric;
    })
}