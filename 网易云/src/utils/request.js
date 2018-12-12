import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
//对时间进行处理
export function formatRandom (num) {
  let miu =parseInt(num/60);
  let sec =parseInt(num%60);
  miu = miu <= 9 ? '0'+ miu : miu;
  sec = sec <= 9 ? '0'+ sec : sec;
  return miu +':'+ sec
}
//对时间进行处理
export function formatTime (time) {
  let arr = time.split(':');
  return (arr[0]*60+arr[1]*1).toFixed(2)
}
//打乱数组
export function randomArr (arr) {
    let newArr=[...arr];
    newArr.sort(function(a,b){
      return Math.random()>.5 ? -1 : 1
    });
    return newArr
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
