import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useParams } from 'react-router-dom';
import { logout } from '../../store/session';

import {FiPlus} from 'react-icons/fi'
import { IconContext } from "react-icons";

import './base.css'
import LeftPanel from '../LeftPanel';
import ModalBase from '../ModalBase';

import { uiInitialState, setModalType } from '../../store/ui';

export default function AppBase({sessionUser}){

    const dispatch = useDispatch()
    const {serverId, channelId} = useParams()

    if (!sessionUser) return <Redirect to="/login" />

    return(
        <div className='app-main'>
            <ModalBase/>
            <button className='god-button' onClick={()=>dispatch(logout())}>Log Out</button>
            <div className='server-scroller'>
                    <div id='friend-list-selector' className='server-bubble'> 

                    </div>
                    <div className='server-list'>

                    </div>
                    <div>
                            <IconContext.Provider value={{ color: "#23A559", size: 24 , className: "green-plus-icon" }}>
                                <div onClick={e => dispatch(setModalType('newServer'))} className='server-list-item' id='add-server-button'>
                                            <FiPlus/>
                                </div>
                            </IconContext.Provider>
                    </div>
            </div>
            <LeftPanel serverId={serverId}/>
        </div> 
    )
}