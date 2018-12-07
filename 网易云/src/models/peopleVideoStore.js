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