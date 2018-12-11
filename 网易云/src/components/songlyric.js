import React, { Component } from 'react';
import {Carousel} from 'antd-mobile';
import styles from '../style/IndexPlay.scss';
class Lyric extends Component {
    constructor () {
        super();
        this.state={
            Index:0
        }
    }
    componentWillReceiveProps (nextProps) {
        let {songLyricText}=this.props;
        let {Index} =this.state;
        if(songLyricText.length > 0){
            for(var i=0;i<songLyricText.length;i++){
                if(nextProps.times < songLyricText[i].time){
                        if(i-1!==Index){
                            this.setState({
                                Index : i-1
                        })  
                    }
                    break;
                } 
            }
        }    
    }
    render() {
        let {songLyricText} =this.props;
        let {Index} =this.state;
        return (
            <div className={styles.songlyric}>
                <Carousel 
                    vertical
                    dots={false}
                    selectedIndex={Index}
                    autoplayInterval={500}
                >
                {
                    songLyricText.map((v,i)=>{
                        return <p key={i}
                        className={Index===i ? 'active' : ''}
                        >{v.text}</p>
                    })
                }
                </Carousel>
            </div>
        )
    }
}

export default Lyric;