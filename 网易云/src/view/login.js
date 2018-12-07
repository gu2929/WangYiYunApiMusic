import React, { Component } from 'react';
import styles from '../style/login.scss';
import {connect} from 'dva'
class Login extends Component {
    constructor () {
        super();
        this.state={
            phone:'13439299426',
            password:'cheng.'
        }
    }
    changeIpt = (e,val) => {
        this.setState({
            [val]:e.target.value
        })
    }
    getLogin = () => {
        let {dispatch} =this.props;
        let {phone,password} =this.state;
        if(!(/^\d{11}$/.test(phone)) || phone===''){
            alert('手机号格式错误')
        }else if(!(/^\w{5,20}\.$/.test(password)) || password===''){
            alert('密码格式错误')
        }else{
            dispatch({
                type:'loginStore/login',
                obj:{
                    phone,
                    password
                }
            })
        }
    }
    render() {
        let {phone,password}=this.state;
        return (
            <div className={styles.wrap}>
                <div>
                    <p>用户名:<input value={phone} onChange={(e)=>{this.changeIpt(e,'phone')}}/></p>
                    <p>密码:<input  value={password} onChange={(e)=>{this.changeIpt(e,'password')}}/></p>
                    <button onClick={this.getLogin}>登录</button>
                </div>   
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return {...state.loginStore}
}
export default connect(mapStateToProps)(Login);