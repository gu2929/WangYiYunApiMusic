import {routerRedux} from 'dva/router';
import {getCookie,setCookie,getLoginApi} from '../services/loginApi';
export default {

    namespace: 'loginStore',
  
    state: {

    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
        return history.listen(({pathname})=>{
            if(pathname!=='/login'){
                if(!getCookie()){
                    dispatch( routerRedux.push({
                        pathname:'/login'
                    }))   
                }
            }
        })
      },
    },
  
    effects: {
      *login({obj},{call,put}){
            let data = yield call(getLoginApi,obj);
            setCookie(data.loginType);
            yield put (routerRedux.push({
                pathname:'/'
            }))
      }
    },
  
    reducers: {
     
    },
  
  };