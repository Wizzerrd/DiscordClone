import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useParams } from 'react-router-dom';
import { logout } from '../../store/session';

import './base.css'
import LeftPanel from '../LeftPanel';
import ModalBase from '../ModalBase';

import ServerScroller from '../ServerScroller';
import { useEffect, useState } from 'react';
import { fetchUser } from '../../store/users';
import { selectServer, setCenterPanel } from '../../store/ui';
import AppBody from '../AppBody';

export default function AppBase(){

    const dispatch = useDispatch()
    const {serverId, channelId} = useParams()
    const sessionUser = useSelector(state => state.session.user);

    useEffect(()=>{
        if(sessionUser){
            dispatch(fetchUser(sessionUser.id))
        }
    }, [sessionUser])

    useEffect(()=>{
        dispatch(selectServer(serverId))
    }, [serverId])

    useEffect(()=>{
        if(channelId){
            dispatch(setCenterPanel('messages'))
        } else {
            dispatch(setCenterPanel('friends'))
        }
    }, [channelId])
    
    return(
        <div className='app-main'>
            {!sessionUser && <Redirect to="/login" />}
            <ModalBase/>
            <button className='god-button' onClick={()=>dispatch(logout())}>Log Out</button>
            <ServerScroller serverId={serverId}/>
            <LeftPanel serverId={serverId} />
            <AppBody/>
        </div> 
    )
}