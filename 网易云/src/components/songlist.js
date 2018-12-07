import React, { Component } from 'react';
import styles from '../style/IndexLike.scss';
import {NavLink} from 'dva/router'
class Songlist extends Component {

    render() {
        let {data ,type} =this.props;
        return (
            <div className={styles.songlist_item_box}>
            { type ?
                <div className={styles.songlist_item}>
                    <NavLink to="">
                        <img src={data.song.album.picUrl} alt=""/>
                        <span>{data.name}</span>
                    </NavLink>
                </div> :
                <div className={styles.songlist_item}>
                    <NavLink to="">
                        <img src={data.picUrl} alt=""/>
                        <span>{data.copywriter}</span>
                    </NavLink>
                </div> 
            } 
            </div>
                  
            
        );
    }
}

export default Songlist;