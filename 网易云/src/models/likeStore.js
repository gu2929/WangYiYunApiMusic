//引入获取banner 歌单 最新歌单 vip数据的接口
import {
  getBannerApi,
  getSongListApi,
  getNewSongListApi,
  getBroadcastingListApi,
  getVipListApi
} from '../services/IndexLikeApi.js'
export default {

    namespace: 'likeStore',
  
    state: {
        BannerList:[],
        SongList:[],
        NewSongList:[],
        BroadcastingList:[],
        VipData:{}

    },
  
    // subscriptions: {
    //   setup({ dispatch, history }) {  // eslint-disable-line
    //   },
    // },
  
    effects: {
      *getBannerList(_, { call, put }) {
        let data= yield call(getBannerApi);
        yield put({
          type:'getBannerListReducers',
          data
        });
      },
      *getSongList(_, { call, put }) {
        let data= yield call(getSongListApi);
        yield put({
          type:'getSongListReducers',
          data
        });
      },
      *getNewSongList(_, { call, put }) {
        let data= yield call(getNewSongListApi);
        yield put({
          type:'getNewSongListReducers',
          data
        });
      },
      *getBroadcastingList(_, { call, put }) {
        let data= yield call(getBroadcastingListApi);
        yield put({
          type:'getBroadcastingListReducers',
          data
        });
      },
      *getVipList(_, { call, put }) {
        let data= yield call(getVipListApi);
        yield put({
          type:'getVipListReducers',
          data
        });
      }
    },
  
    reducers: {
      getBannerListReducers (state,{data}) {
        return {
          ...state,
          BannerList:data
        }
      },
      getSongListReducers (state,{data}) {
        return {
          ...state,
          SongList:data
        }
      },
      getNewSongListReducers (state,{data}) {
        return {
          ...state,
          NewSongList:data
        }
      },
      getBroadcastingListReducers (state,{data}) {
        return {
          ...state,
          BroadcastingList:data
        }
      },
      getVipListReducers (state,{data}) {
        return {
          ...state,
          VipData:data
        }
      }
    },
  
  };
  