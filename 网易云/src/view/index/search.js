import React, { Component } from 'react';
import {connect} from 'dva';
import styles from '../../style/IndexSearch.scss';
import Playsonglist from '../../components/playsonglist';
class Search extends Component {
    //点击搜索触发库里函数 
    searchSong = () => {
        let {dispatch} =this.props;
        dispatch({
            type:'searchStore/getsearchSongList',
            payload:this.ipt.value
        })
    }
    //点击播放全部 把播放列表的id都传过去 默认传第一个id触发'/play'页面歌曲详情
    searchSongs = () => {
        let {
            searchSongList,
            dispatch,
            history:{
                push
            }
        }=this.props;
        dispatch({
            type:'playSongStore/getSongUrls',
            payload:searchSongList.map(v=>v.id)
        })
        push({pathname:'/play',id:searchSongList[0].id})
    }
    render() {
        let {searchSongList}=this.props;
        return (
            <div className={styles.wrap}>
                <h2>
                    <input placeholder='输入歌曲名' type="text" ref={(ipt)=>{this.ipt=ipt}}/>
                    <button onClick={this.searchSong}>搜索</button>
                    <button onClick={this.searchSongs}>播放全部</button>
                </h2>
                <div className={styles.cont}>
                    <ul className={styles.songBox}>
                        {
                            searchSongList.length > 0 && searchSongList.map((v,i)=>{
                                return <li key={i}>
                                    <Playsonglist data={v}/>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return {...state.searchStore}
}
export default connect(mapStateToProps)(Search);