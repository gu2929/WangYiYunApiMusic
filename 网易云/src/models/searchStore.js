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
  