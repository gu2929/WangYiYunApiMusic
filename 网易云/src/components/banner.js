import React, { Component } from 'react';
import {NavLink} from 'dva/router';
import {Carousel,WingBlank} from 'antd-mobile';
import styles from '../style/IndexPeopleVideo.scss';
class Banner extends Component {
    render() {
        let {BannerList} = this.props;
        return (
            <div className={styles.Banner}>
                    <WingBlank>
                        <Carousel
                        autoplay="true"
                        dots
                        >
                        {BannerList.length > 0 && BannerList.map(val => (   
                        <NavLink to ='' key={val}><img src={val.imageUrl} 
                        style={{
                            'width':'100%',
                            'height':'120px',
                            'display':'block',
                            'borderRadius':'8px',
                            'margin':'20px auto 0px'
                            }}/><span className={styles.BannerSpan}>{val.typeTitle}</span></NavLink>
                        ))}
                        </Carousel>
                    </WingBlank>
                </div>
        );
    }
}

export default Banner;