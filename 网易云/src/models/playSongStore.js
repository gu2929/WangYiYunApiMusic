//引入获取歌曲播放路径和歌曲详情和歌词的方法
import {getSongUrlApi,
  getSongDetailApi,
  getSongLyricApi} from '../services/playSongApi';
//引入处理时间的方法
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
      songLyricText:[]
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      //获取一个歌曲的路径和详情
      *getSongUrl({payload},{call,put}){
        let arr = yield call(getSongUrlApi,payload);
        let data=yield call(getSongDetailApi,payload);
        let playList=[];
        let url=arr[0].url;
        data=data[0];
        playList.push({detail:data});
        yield put({
          type:'getSongUrlReducers',
          payload:{
            url,
            data,
            payload,
            playList
          }
        })
      },
      //获取一组歌曲的路径和详情
      *getSongUrls ({payload},{call,put}){
        let obj = yield call(getSongUrlApi,payload.join(','));
        let data=yield call(getSongDetailApi,payload.join(','));
        let newArr=[];
        //把两个数组进行排序 处理放在一个数组里
        data.forEach(v=>{
          obj.filter(val=>{
            if(v.id===val.id){
              newArr.push({
                info:val.url,
                detail:v
              })
            }
          })
        })
        yield put({
          type:'getSongUrlsReducers',
          payload:newArr
        })
      },
      //获取歌词
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
          detailSongObj:payload.data,
          playList:payload.playList
        }
      },

      getSongUrlsReducers(state,{payload}){
        return {
          ...state,
          playList:payload
        }
      },
      //点击上一曲下一曲进行切换，还要判断状态单曲随机
      changeSongReducers(state,{payload}){
        let {url,detailSongObj,playIndex,playList,mode} =state;
        if(payload==='prev'){
            if(mode===0){
                playIndex=playIndex;
            }else if(mode===1){
                playIndex=Math.floor(Math.random()*playList.length)
            }else{
              if(playIndex <= 0){
                playIndex = playList.length-1
              }else{
                 playIndex-=1;
              }
             
            } 
          }else{
            if(mode===0){
                playIndex=playIndex;
            }else if(mode===1){
                playIndex=Math.floor(Math.random()*playList.length)
            }else{
              if(playIndex >= playList.length-1){
                playIndex = 0
              }else{
                playIndex+=1;
              }      
            }  
        }
        return {
          ...state,
          id:playList[playIndex].detail.id,
          url:playList[playIndex].info,
          detailSongObj:playList[playIndex].detail,
          playIndex
        }
      },
      //对状态进行切换
      changeModeReducers (state){
        let {mode} =state;
        return {
          ...state,
          mode:(mode+1)%3
        }
      },
      //点击遮罩层歌曲 更改下标
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
        let text=[];
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
        
        //删除最后一项为空字符串
        payload = payload.filter(item=>item.length > 1)

        for(var i=0;i<payload.length;i++){
          text.push({
            time:formatTime(payload[i][0]),
            text:payload[i][1]
          })
          //公用一句歌词进行处理，把公用歌词的时间都显示出来
          if(payload[i][1].includes('[')){
            let arr=payload[i][1].replace('[','').replace(']',',').split(',');
            text.push({
              time:formatTime(arr[0]),
              text:arr[1]
            })  
          }
        }
        //改变里面有时间的字符串
        text=text.map(v=>{
          if(v.text.includes(']')){
            v.text=v.text.slice(v.text.indexOf(']')+1)
          }
          return v;
        })
        //对text进行排序 让时间一次升序
        text=text.sort(function(a,b){
          return a.time-b.time
        })
        return {
          ...state,
          songLyricText:text
        }
      }

    },
  
  };
  