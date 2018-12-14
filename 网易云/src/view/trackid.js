import React, { Component } from 'react';
import {connect} from 'dva';
import styles from '../style/trackid.scss';
import {randomArr} from '../utils/request'
class TrackID extends Component {
    constructor () {
        super();
        this.state={
            songList:[],//原始数组
            randomSongList:[],//打乱后的数组
            listenList:[],//备选答案数组
            currect:0,//播放下标递增
            passmess:0,//播放进度滚动条
            isPlay:true,
            count:0,
            time:{
                start:0,
                end:0
            }
        }
    }
    componentDidMount () {
        let {trackid} =this.props;
        this.setState({
            songList:trackid.map(v=>v.detail.name)
        })
    }
    
     //get 立即执行 开始时间
     get currentTime () {
        let {currect} =this.state;
       if(this.refs.audio){
           if(currect ==9){
               return 10
           }
           return Math.floor(this.refs.audio.currentTime-this.state.time.start)
       }
       
   }
    //audio加载完成前  设置播放时间
    startPlay = () => {
        let {trackid} =this.props;
        let start=Math.floor(Math.random()*this.refs.audio.duration-10);
        this.setState({
            time:{
                start,
                end:start+10
            },
            ////加载开始播放前 把之前的数组打乱
            randomSongList:randomArr(trackid.map(v=>v.detail.name))
        },()=>{
            this.refs.audio.currentTime=start;
        });
    }
    //自动触发时间事件
    timeUpdate = () => {
        let {songList,currect} =this.state;
        let pArr=[...document.querySelectorAll('.pDom')];
        if(this.refs.audio.currentTime > this.state.time.end){
            this.refs.audio.pause();
            if(this.state.currect==9){
                return;
            }else{
                this.setState({
                    currect:this.state.currect+1
                },()=>{
                    this.refs.audio.play();
                })
                let flag=pArr.some(v=>{
                    return v.classList.contains('success') || v.classList.contains('error')     
                })
                //没有类名的话 就拼接一个没有答案
                if(!flag){
                    this.setState({
                        listenList:this.state.listenList.concat('没有答案')
                    })
                }
            }
            //下一首开始播放前 把之前的类名清空
            [...document.querySelectorAll('.pDom')].map(v=>{
                v.className=v.className.replace(' success','').replace(' error','')
            })
        }
        //获取宽度 红色线条占的百分比 播放时间减去开始时间除以10 得到播放占比
        this.setState({
            passmess:Math.floor((this.refs.audio.currentTime-this.state.time.start)/10*100),
        })
    }
    
    
    //改变播放状态
    changePlay = () => {
        this.setState({
            isPlay:!this.state.isPlay
        },()=>{
            this.state.isPlay ? this.refs.audio.play() : this.refs.audio.pause()
        })
    } 
    //点击判断是否猜对
    activeP = (v,i) => {
        let {currect,songList,listenList,count} =this.state;
        let pArr=[...document.querySelectorAll('.pDom')];
        //判断是否有类名 有的话就return 不能进行点击return
        let flag=pArr.some(v=>{
            return v.classList.contains('success') || v.classList.contains('error')
        })

        if(flag){
            return;
        }
        //备选答案数组 把你点击的内容拼接 
        this.setState({
            listenList:this.state.listenList.concat(v)
        })
        //判断数组songList正在播放的是不是你点击的歌名
        if(songList[currect] == v){
            pArr[i].classList.add('success')
            this.setState({
                count:this.state.count+1
            })
        }else{
            pArr[i].classList.add('error')
        }     
    }
    render() {
       let {randomSongList,currect,isPlay,passmess,songList,listenList,count} =this.state;
       let {trackid} =this.props;
        return (
            <div className={styles.wrap}>
                <div className={styles.header}>听歌识曲</div>
                <div className={styles.section}>
                    <div className={styles.list}>
                        {
                            randomSongList.map((v,i)=>{
                                return <p key={i}
                                    className='pDom'
                                    onClick={()=>{this.activeP(v,i)}}
                                >{v}</p>
                            })
                        }
                    </div>
                    <audio src={trackid[currect].info} ref='audio'
                        autoPlay
                        onTimeUpdate ={()=>{this.timeUpdate()}}
                        onLoadedMetadata ={()=>{this.startPlay()}}
                    ></audio>
                    <p className={styles.tit}>
                        <span onClick={this.changePlay}>{ isPlay ? '暂停' : '播放'}</span>
                        <span>正在播放进度{currect+1}/10</span>
                    </p>
                    <p className={styles.playScroll}>
                        <time>00:{this.currentTime}</time>
                        <span
                            style={{
                               'width' :`${passmess}%`
                            }}
                        ></span>
                        <time>00.10</time>
                    </p>
                    <div className={styles.bottomBox}>
                        <h2>猜歌结果</h2>
                        {
                            songList.length > 0 && songList.map((v,i)=>{
                                return <p className={styles.pBottom} key={i}>
                                    <span>{i+1}</span>
                                    <span>{listenList[i]}</span>
                                    <span>{v === listenList[i] ? '猜对':'猜错'}</span>
                                </p>
                            })
                        }
                        <p className={styles.tit}>
                            <span>你总共答对了{count}道题</span>
                            <span>总共:{count*10}分</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return {...state.playSongStore}
}
export default connect(mapStateToProps)(TrackID);