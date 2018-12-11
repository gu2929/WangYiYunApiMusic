//引入搜索接口的方法
import {getsearchSongListApi} from '../services/searchApi';
export default {

    namespace: 'searchStore',
  
    state: {
        searchSongList:[]
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
        //对搜索接口数据进行处理
      *getsearchSongList ({payload},{call,put}){
        let data=yield call (getsearchSongListApi,payload);
        yield put({
            type:'getsearchSongListReducers',
            data
        })
      }
    },
  
    reducers: {
        getsearchSongListReducers (state,{data}){
            return {
                ...state,
                searchSongList:data
            }
        }
    },
  
  };
  