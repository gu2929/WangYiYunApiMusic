import React, { Component } from 'react';
import {NavLink} from 'dva/router';
import RouterView from '../../router/routerView';
import styles from '../../style/InderFind.scss';
import Scroll from 'better-scroll';
class Find extends Component {
    componentDidMount () {
        new Scroll(this.dom)
    }
    render() {
        return (
            <div className={styles.wrap_find}>
                <div className={styles.header}>
                        <NavLink to="/index/find/like">个性推荐</NavLink>
                        <NavLink to="/index/find/peoplevideo">主播电台</NavLink>
                </div>
                <div ref={(box)=>{ this.dom = box}} className={styles.find_cont_scroll}>   
                    <div>
                        <RouterView routes={this.props.routes}/> 
                    </div>
                </div>
                
            </div>
        );
    }
}
export default Find;