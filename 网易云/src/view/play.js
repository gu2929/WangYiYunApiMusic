import React, { Component } from 'react';
import {connect} from 'dva';
import styles from '../style/IndexPlay.scss';
import {formatRandom} from '../utils/request';
import Playsonglist from '../components/playsonglist';
import Lyric from '../components/songlyric';
class Play extends Component {
    constructor () {
        super();
        this.state={
            isPlay:true,
            passmess:0,
            isShow:false
        }
    }
    componentDidMount () {
        let {
            location :{
                id
            },
            dispatch
        }=this.props;
        dispatch({
            type:'playSongStore/getSongUrl',
            payload:id
        })
        dispatch({
            type:'playSongStore/getSongLyric',
            payload:id
        })
    }
    //钩子函数 获取时间
    timeUpdate =()=>{
        this.setState({
            passmess:(this.refs.audio.currentTime/this.refs.audio.duration)*100,
        },()=>{
            if(this.state.passmess >= 99.99){
                this.refs.audio.pause();
                this.setState({
                    isPlay:false
                })
            }
        })
        
    }
    //get 立即执行
    get currentTime () {
        if(this.refs.audio){
            return formatRandom(this.refs.audio.currentTime)
        }
        return '00:00'
    }
     //get 立即执行
    get duration () {
        if(this.refs.audio){
            return formatRandom(this.refs.audio.duration)
        }
        return '00:00'
    }
    //点击控制暂停，播放
    changePlay = () =>{
        this.setState({
            isPlay:!this.state.isPlay
        },()=>{
            this.state.isPlay ? this.refs.audio.play() : this.refs.audio.pause()
        })
    }
    changeSong = (type) => {
        let {dispatch,playList} = this.props;
        if(playList.length===0){
            return;
        }
        dispatch({
            type:'playSongStore/changeSongReducers',
            payload:type
        })
    }
    changeMode = (type) => {
        let {dispatch} = this.props;
        dispatch({
            type:'playSongStore/changeModeReducers',
            payload:type
        })
    }
    changeMask = () => {
        this.setState({
            isShow:true
        })
    }
    changeMaskChild = () =>{
        this.setState({
            isShow:false
        })
    }
    TouchStart = () => {
        this.setState({
            isPlay:false
        },()=>{
            this.refs.audio.pause()
        })
    }
    TouchMove = (e) => {
        let {passmess,currentTime} =this.state;
        let domP=this.refs.pDom,
            touch=e.touches[0]
        passmess=(touch.pageX-domP.offsetLeft)/domP.offsetWidth
        if(passmess < 0){
            passmess = 0
        }
        if(passmess > 1){
            passmess = 1
        }
        this.setState({
            passmess:passmess*100,  
        },()=>{
            this.refs.audio.currentTime=passmess*this.refs.audio.duration
        })
        
    }
    TouchEnd = () => {
        this.setState({
            isPlay:true
        },()=>{
            this.refs.audio.play()
        })
    }
    render() {
        let {url,
            detailSongObj,
            playIndex,mode,
            playList,
            songLyricTime,
            songLyricText}=this.props;
        let {isPlay,passmess,isShow} =this.state;
        return (
            <div className={styles.wrap}>
                <h2>播放页面</h2>
                { url && <audio src={url} ref='audio'
                    autoPlay
                    onTimeUpdate ={()=>{this.timeUpdate()}}
                ></audio>}
                <div className={styles.imgBox}>
                    {
                        JSON.stringify(detailSongObj) !=="{}" && 
                        <img className={isPlay ? styles.imgs :styles.disabled }src={detailSongObj.al.picUrl}/>
                    }
                    <Lyric 
                        songLyricTime={songLyricTime} 
                        songLyricText={songLyricText}
                        times={this.refs.audio && this.refs.audio.currentTime}
                    />
                    <div className={styles.bottom}>
                        <p ref='pDom'>
                            <time>{this.currentTime}</time>
                            <span style={{
                                'width':`${passmess}%`
                            }}
                            onTouchStart={this.TouchStart}
                            onTouchMove={this.TouchMove}
                            onTouchEnd={this.TouchEnd}
                            ></span>
                            <time>{this.duration}</time>
                        </p>
                        <h3>
                            <span onClick={this.changeMode}>{mode === 1 ? '单曲播放' : mode === 2 ? '随机播放' : '顺序播放'}</span>
                            <span onClick={this.changeMask}>歌单</span>
                        </h3>
                        <p>
                            <span onClick={()=>{this.changeSong('prev')}}>上一首</span>
                            <span onClick={this.changePlay}>{ isPlay ?'暂停':'播放'}</span>
                            <span onClick={()=>{this.changeSong('next')}}>下一首</span>
                        </p>
                    </div>
                    <div className={!isShow ? styles.mask : styles.mask_active}>
                        {
                            playList.length > 0 && playList.map((v,i)=>{
                               return  <Playsonglist 
                               key={i}
                               data={v.detail} 
                               type='search' 
                               Index={i} 
                               changeMaskChild={this.changeMaskChild}
                               />
                            })
                        }
                    </div>      
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return {...state.playSongStore}
}
export default connect(mapStateToProps)(Play);