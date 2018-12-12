import {routerRedux} from 'dva/router';
//引入登录接口的方法  和cookie值得方法
import {getCookie,setCookie,getLoginApi} from '../services/loginApi';
export default {

    namespace: 'loginStore',
  
    state: {

    },
  
    subscriptions: {
        //判断cookie值进行路由拦截
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
            //存值之后进行跳转  routerRedux跳转页面 
            yield put (routerRedux.push({
                pathname:'/'
            }))
      }
    },
  
    reducers: {
     
    },
  
  };