import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useParams } from 'react-router-dom';
import { logout } from '../../store/session';

import { AiOutlinePlus } from 'react-icons/ai'
import { IconContext } from "react-icons";

import { uiInitialState, setModalType, selectServer } from '../../store/ui';

import './servers.css'

export default function ServerScroller(){

    const dispatch = useDispatch()

    const servers = useSelector(state => state.entities.servers)
    const { selectedServer, modalType } = useSelector(state => state.ui)

    const serverList = Object.values(servers)

    function amIChosen(server){
        let className = 'server-list-item'
        if (selectedServer && selectedServer === server) className += ' chosen'
        else if (server === 0 && modalType === 'newServer' ) className += ' making-server'
        return className
    }
    
    return(
        <div className='server-scroller'>
            <div>
                <div onClick={()=> dispatch(selectServer(-1))} id='friend-list-selector' className={amIChosen(-1)}>
                    <img src='https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg'/>
                </div>
            </div>

            <ul className='server-list'>
                {serverList.map( server => <li onClick={()=> dispatch(selectServer(server.id))} className={amIChosen(server.id)} key={server.id}>{server.id}</li>)}
            </ul>
            <div>
                <div onClick={e => dispatch(setModalType('newServer'))} className={amIChosen(0)} id='add-server-button'>
                            <AiOutlinePlus/>
                </div>

            </div>
        </div>
    )
}