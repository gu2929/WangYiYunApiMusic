import { connect } from 'dva';
import React, { Component } from 'react';
import { NavLink } from 'dva/router';
import RouterView from '../router/routerView';
import '../style/IndexPage.scss';
class IndexPage extends Component {
  
  goSearch = () => {
    let { 
      history :{
        push
    }} =this.props;
    push({pathname:'/index/search'})
  }
  render() {
    return (
      <div className='wrap'>
        <header>
            <span></span>
            <p onClick={this.goSearch}> 猜你喜欢 浮生</p>
            <span></span>
        </header>
        <div className='cont'>
          <RouterView routes={this.props.routes}></RouterView>
        </div> 
        <footer>
          <NavLink to='/index/find'>
            <span></span>
            <p>发现</p>
          </NavLink>
          <NavLink to='/index/video'>
            <span></span>
            <p>视频</p>
          </NavLink>
          <NavLink to='/index/my'>
            <span></span>
            <p>我的</p>
          </NavLink>
          <NavLink to='/index/people'>
            <span></span>
            <p>朋友</p>
          </NavLink>
          <NavLink to='/index/message'>
            <span></span>
            <p>账户</p>
          </NavLink>
        </footer>
      </div>
    );
  }
}
const mapStateTpProps=(state)=>{
  return {...state.indexStore}
}
export default connect(mapStateTpProps)(IndexPage);
