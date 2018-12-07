import {getSongUrlApi,getSongDetailApi,getSongLyricApi} from '../services/playSongApi';
import {formatTime} from '../utils/request'
export default {

    namespace: 'playSongStore',
  
    state: {
      id:0,
      url:'',
      detailSongObj:{},
      playList:[],
      playIndex:0,
      mode:0,
      songLyricTime:[],
      songLyricText:[]
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *getSongUrl({payload},{call,put}){
        let arr = yield call(getSongUrlApi,payload);
        let data=yield call(getSongDetailApi,payload);
        let url=arr[0].url;
        data=data[0];
        yield put({
          type:'getSongUrlReducers',
          payload:{url,data,payload}
        })
      },

      *getSongUrls ({payload},{call,put}){
        let obj = yield call(getSongUrlApi,payload.join(','));
        let data=yield call(getSongDetailApi,payload.join(','));
        let newArr=[];
        obj.forEach(v=>{
          data.filter(val=>{
            if(v.id===val.id){
              newArr.push({
                info:v.url,
                detail:val
              })
            }
          })
        })
        yield put({
          type:'getSongUrlsReducers',
          payload:newArr
        })
      },

      *getSongLyric ({payload},{call,put}){
        let data=yield call(getSongLyricApi,payload);
        yield put ({
          type:'getSongLyricReducers',
          payload:data
        })
      }
    },
  
    reducers: {
      getSongUrlReducers(state,{payload}){
        return {
          ...state,
          id:payload.payload,
          url:payload.url,
          detailSongObj:payload.data
        }
      },

      getSongUrlsReducers(state,{payload}){
        return {
          ...state,
          playList:payload
        }
      },

      changeSongReducers(state,{payload}){
        let {url,detailSongObj,playIndex,playList,mode} =state;
        if(payload==='prev'){
            if(mode===1){
                playIndex=playIndex;
            }else if(mode===2){
                playIndex=Math.floor(Math.random()*playList.length)
            }else{
              if(playIndex===0){
                playIndex=playList.length-1
              }
              playIndex-=1;
            } 
          }else{
            if(mode===1){
                playIndex=playIndex;
            }else if(mode===2){
                playIndex=Math.floor(Math.random()*playList.length)
            }else{
              if(playIndex===playList.length-1){
                playIndex=0
              }
              playIndex+=1;
            }  
        }
        console.log(playList.detail)
        return {
          ...state,
          
          url:playList[playIndex].info,
          detailSongObj:playList[playIndex].detail,
          playIndex
        }
      },

      changeModeReducers (state){
        let {mode} =state;
        return {
          ...state,
          mode:(mode+1)%3
        }
      },

      changeMaskSongReducers (state,{payload}){
        let {playIndex,playList} =state;
        return {
          ...state,
          playIndex:payload,
          url:playList[payload].info,
          detailSongObj:playList[payload].detail,
        }
      },
      getSongLyricReducers (state,{payload}){
        let time=[],text=[];
        payload=payload.split('\n');
        payload=payload.map(val=>{
          return val.replace('[','').replace(']',',').split(',')
        })
        //补全歌词
        payload =payload.map((val,index)=>{
            if(val[1]==='' && index <payload.length-2){
              for(let i = index + 1 ; i < index+4;i++){
                if(payload[i][1]){
                  val[1]=payload[i][1]
                  break;
                }
              }
              return val
            }else{
              return val
            }
        })
        
        //删除最后一项
        payload = payload.filter(item=>item.length > 1)

        for(var i=0;i<payload.length;i++){
          time.push(payload[i][0]);
          text.push({
            time:formatTime(payload[i][0]),
            text:payload[i][1]
          })
          //公用一句歌词进行处理
          if(payload[i][1].includes('[')){
            let arr=payload[i][1].replace('[','').replace(']',',').split(',');
            time.push(arr[0]);
            text.push({
              time:formatTime(arr[0]),
              text:arr[1]
            })
          }
        }
        text.sort(function(a,b){
          return a.time-b.time
        })
        return {
          ...state,
          songLyricTime:time,
          songLyricText:text
        }
      }

    },
  
  };
  