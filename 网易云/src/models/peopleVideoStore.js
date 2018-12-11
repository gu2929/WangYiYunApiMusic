//引入banner接口的方法
import {getBannerApi} from '../services/IndexLikeApi';
export default {

    namespace: 'peopleVideoStore',
  
    state: {
        BannerList:[]
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
        //对banner数据进行处理
        *getBannerList(_,{call,put}){
            let data=yield call(getBannerApi);
            yield put({
                type:'getBannerListReducers',
                data
            })
        }
    },
  
    reducers: {
        getBannerListReducers (state,{data}){
            return {
                ...state,
                BannerList:data
            }
        }
    },
  
  };