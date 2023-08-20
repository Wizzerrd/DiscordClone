import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useParams } from 'react-router-dom';
import { logout } from '../../store/session';

import './base.css'
import LeftPanel from '../LeftPanel';
import ModalBase from '../ModalBase';

import ServerScroller from '../ServerScroller';
import { useEffect, useState } from 'react';
import { fetchUser } from '../../store/users';

export default function AppBase({sessionUser}){

    const dispatch = useDispatch()
    const {serverId, channelId} = useParams()

    const {selectedServer} = useSelector(state => state.ui)

    if (!sessionUser) return <Redirect to="/login" />

    return(
        <div className='app-main'>
            <ModalBase/>
            <button className='god-button' onClick={()=>dispatch(logout())}>Log Out</button>
            <ServerScroller/>
            <LeftPanel serverId={serverId}/>
        </div> 
    )
}