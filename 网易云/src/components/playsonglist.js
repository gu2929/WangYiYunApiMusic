import React, { Component } from 'react';
import {NavLink} from 'dva/router';
import {connect} from 'dva';
class Playsonglist extends Component {
    change_song_mask = () =>{
        let {
            changeMaskChild,
            Index,
            dispatch
        }=this.props;
        changeMaskChild();
        dispatch({
            type:'playSongStore/changeMaskSongReducers',
            payload:Index
        })
    }   
    render() {
        let {data,type,Index} =this.props;
        return (
            <div>
                {
                    type!=='search' ? <NavLink to={{
                        pathname:'/play',
                        id:data.id
                    }}>
                        <p>{data.name}</p>
                        <p>{data.alias.length > 0 ? data.alias[0] :data.album.name}</p>
                    </NavLink> : <div onClick={this.change_song_mask}>
                        <p>{data.name}</p>
                        <p>{data.alia.length > 0 ? data.alia[0] :data.al.name}</p>
                    </div>
                }
                
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return {...state.playSongStore}
}
export default connect(mapStateToProps)(Playsonglist);