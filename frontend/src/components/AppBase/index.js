import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { logout } from '../../store/session';

import './base.css'
import LeftPanel from '../LeftPanel';
import ModalBase from '../ModalBase';

import ServerScroller from '../ServerScroller';
import { useEffect } from 'react';
import { fetchUser } from '../../store/users';
import { selectChannel, selectServer, setCenterPanel } from '../../store/ui';
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
        if(channelId){
            dispatch(setCenterPanel('messages'))
            dispatch(selectChannel(channelId))
        } else if(serverId === '@me') {
            dispatch(setCenterPanel('friends'))
        }
    }, [channelId])
    
    return(
        <>
        <div className='app-main'>
            <ModalBase/>
            {!sessionUser && <Redirect to="/login" />}
            <button className='god-button' onClick={()=>dispatch(logout())}>Log Out</button>
            <ServerScroller serverId={serverId}/>
            <LeftPanel serverId={serverId} />
            <AppBody  />
        </div> 
        </>
    )
}