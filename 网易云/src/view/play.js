import React, { Component } from 'react';
import {connect} from 'dva';
import styles from '../style/IndexPlay.scss';
//引入处理时间的方法  变为分钟 秒
import {formatRandom} from '../utils/request';
//引入公共播放歌曲组件  在遮罩层显示
import Playsonglist from '../components/playsonglist';
//引入歌词组件
import Lyric from '../components/songlyric';
import {Carousel} from 'antd-mobile';
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
        //进入页面获取歌曲路径(详情) 歌词
        dispatch({
            type:'playSongStore/getSongUrl',
            payload:id
        })
        dispatch({
            type:'playSongStore/getSongLyric',
            payload:id
        })
    }
    //对id进行判断  获取新的歌词
    componentWillReceiveProps (nextProps)  {
        console.log
        let {dispatch} =this.props;
        if(nextProps.id!==this.props.id){
            dispatch({
                type:'playSongStore/getSongLyric',
                payload:nextProps.id
            })
        }
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
    //get 立即执行 开始时间
    get currentTime () {
        if(this.refs.audio){
            return formatRandom(this.refs.audio.currentTime)
        }
        return '00:00'
    }
     //get 立即执行 总长时间
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
    //点击上一首一下一首触发库里的方法
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
    //点击状态触发库里的方法
    changeMode = (type) => {
        let {dispatch} = this.props;
        dispatch({
            type:'playSongStore/changeModeReducers',
            payload:type
        })
    }
    //控制遮罩层
    changeMask = () => {
        this.setState({
            isShow:true
        })
    }
    //状态 提升控制遮罩层
    changeMaskChild = () =>{
        this.setState({
            isShow:false
        })
    }
    //触摸事件开始
    TouchStart = () => {
        this.setState({
            isPlay:false
        },()=>{
            this.refs.audio.pause()
        })
    }
    //移动触摸 控制歌条动态
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
    //触摸结束
    TouchEnd = () => {
        this.setState({
            isPlay:true
        },()=>{
            this.refs.audio.play()
        })
    }
    //控制单曲 随机 顺序标签
    ModeDom = (mode) => {
       switch (mode) {
        case 0:
            return <i className={styles.iconfont}  onClick={this.changeMode}>&#xe636;</i>
            break;
        case 1:
            return <i className={styles.iconfont}  onClick={this.changeMode}>&#xe65f;</i>
            break;
        case 2:
            return <i className={styles.iconfont}  onClick={this.changeMode}>&#xe617;</i>
            break;
       }
    }
    //点击返回上一级
    goPrev = () => {
        let {
            history:{
            goBack
        }}=this.props;
        goBack();
    }
    render() {
        let {url,
            detailSongObj,
            playIndex,
            mode,
            playList,
            songLyricText}=this.props;
        let {isPlay,passmess,isShow} =this.state;
        return (
            <div className={styles.wrap}>
                <img className={styles.Img} src={detailSongObj.al && detailSongObj.al.picUrl}/>
                <h2>
                    <i className={styles.iconfont}
                        onClick={this.goPrev}
                    >&#xe648;</i>
                    <p><b>{detailSongObj.name}</b><b>{detailSongObj.alia}</b></p>
                    <i className={styles.iconfont}>&#xe677;</i>
                </h2>
                { url && <audio src={url} ref='audio'
                    autoPlay
                    onTimeUpdate ={()=>{this.timeUpdate()}}
                ></audio>}
                <div className={styles.centBox}>
                    <Carousel
                        autoplayInterval={500}
                    >
                     <div className={styles.imgBox1}>
                        <div className={styles.imgBox2}>
                            {
                                JSON.stringify(detailSongObj) !=="{}" && 
                                <img className={isPlay ? styles.imgs :styles.disabled} src={detailSongObj.al.picUrl}/>
                            }
                        </div>
                    </div>
                        <Lyric
                            songLyricText={songLyricText}
                            times={this.refs.audio && this.refs.audio.currentTime}
                        />
                    </Carousel>
                   
                    <div className={styles.bottom}>
                    <h3>
                        <i className={styles.iconfont}>&#xe601;</i>
                        <i className={styles.iconfont}>&#xe6b1;</i>
                        <i className={styles.iconfont}>&#xe702;</i>
                        <i className={styles.iconfont}>&#xe667;</i>
                    </h3>
                    
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
                        <p>
                            {
                               this.ModeDom(mode)
                            }

                            <i onClick={()=>{this.changeSong('prev')}}
                                className={styles.iconfont}>&#xe647;</i>

                            {
                                !isPlay &&  <i className={styles.iconfont}
                                            onClick={this.changePlay}
                                >&#xe748;</i>
                            }
                            {
                                isPlay &&  <i className={styles.iconfont}
                                            onClick={this.changePlay}
                                >&#xe747;</i>
                            }

                            <i onClick={()=>{this.changeSong('next')}}
                                className={styles.iconfont}>&#xe646;</i>

                            <i className={styles.iconfont}
                                onClick={this.changeMask}
                            >&#xe600;</i>
                        </p>
                    </div>
                    <div className={!isShow ? styles.mask : styles.mask_active}>
                        <div>
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
                        <button onClick={this.changeMaskChild}>关闭</button>
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