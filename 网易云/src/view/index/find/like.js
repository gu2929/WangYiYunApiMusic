import React, { Component } from 'react';
import {connect} from 'dva';
import styles from '../../../style/IndexLike.scss';
import {Carousel,WingBlank} from 'antd-mobile';
import {NavLink} from 'dva/router';
import Songlist from '../../../components/songlist';
import Banner from '../../../components/banner';
class Like extends Component {
    componentDidMount () {
        let {dispatch} =this.props;
        dispatch({
            type:'likeStore/getBannerList'
        })
        dispatch({
            type:'likeStore/getSongList'
        })
        dispatch({
            type:'likeStore/getNewSongList'
        })
        dispatch({
            type:'likeStore/getBroadcastingList'
        })
        dispatch({
            type:'likeStore/getVipList'
        })
        
    }
    render() {
        let {BannerList,SongList,NewSongList,BroadcastingList,VipData} = this.props;
        SongList=SongList.slice(0,6);
        NewSongList=NewSongList.slice(0,6);
        return (
            <div className={styles.like_wrap}>
                <Banner BannerList = {BannerList}/>
                <div className={styles.nav}>
                    <NavLink to=''>
                        <p><img src="/public/icon/FM.png" alt=""/></p>
                        <span>私人FM</span>
                    </NavLink>
                    <NavLink to=''>
                        <p><img src="/public/icon/day.png" alt=""/></p>
                        <span>每日推荐</span>
                    </NavLink>
                    <NavLink to=''>
                        <p><img src="/public/icon/songList.png" alt=""/></p>
                        <span>歌单</span>
                    </NavLink>
                    <NavLink to=''>
                        <p><img src="/public/icon/List.png" alt=""/></p>
                        <span>排行榜</span>
                    </NavLink>
                </div>
                <h3>推荐歌单</h3>
                <div className={styles.songlist}>       
                    {
                        SongList.length > 0 && SongList.map((v,i)=>{
                            return <Songlist data = {v} key={i}/>
                        })
                    }
                </div>
                <h3>最新音乐</h3>
                <div className={styles.songlist}>       
                    {
                        NewSongList.length > 0 && NewSongList.map((v,i)=>{
                            return <Songlist data = {v} key={i} type = 'newSong' />
                        })
                    }
                </div>
                <h3>主播电台</h3>
                <div className={styles.songlist}>       
                    {
                        BroadcastingList.length > 0 && BroadcastingList.map((v,i)=>{
                            return <Songlist data = {v} key={i}/>
                        })
                    }
                </div>
                <div className={styles.vip}>
                    <h2>{VipData.name}</h2>
                    <WingBlank>
                        <Carousel
                        frameOverflow="visible"
                        cellSpacing={10}
                        slideWidth={0.8}
                        autoplay
                        infinite
                        >
                        {JSON.stringify(VipData)!=="{}" && VipData.result.map((val, index) => (
                            <a
                            key={index}
                            href=""
                            style={{
                                display: 'block',
                                position:' relative',
                                top:-10,
                                height:200,
                                boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)'
                            }}
                            >
                            <img
                                src={val.picUrl}
                                style={{
                                    width: '100%',
                                    height:'80%',
                                    verticalAlign: 'top'
                                }}/><p>{val.name}</p>
                            </a>
                        ))}
                        </Carousel>
                    </WingBlank>
                </div>
            </div>
        );
    }
}
const mapStateTpProps=(state)=>{
    return {...state.likeStore}
}
export default connect(mapStateTpProps)(Like);