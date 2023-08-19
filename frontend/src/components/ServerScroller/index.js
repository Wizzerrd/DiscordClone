import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useParams } from 'react-router-dom';
import { logout } from '../../store/session';

import { AiOutlinePlus } from 'react-icons/ai'
import { IconContext } from "react-icons";

import { uiInitialState, setModalType } from '../../store/ui';

import './servers.css'

export default function ServerScroller(){

    const dispatch = useDispatch()

    const servers = useSelector(state => state.entities.servers)
    const serverList = Object.values(servers)
    
    return(
        <div className='server-scroller'>
            <div>
                <div id='friend-list-selector' className='server-list-item'>
                    <img src='https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg'/>
                </div>
            </div>

            <ul className='server-list'>
                {serverList.map( server => <li className='server-list-item' key={server.id}>{server.id}</li>)}
            </ul>
            <div>
                <div onClick={e => dispatch(setModalType('newServer'))} className='server-list-item' id='add-server-button'>
                            <AiOutlinePlus/>
                </div>

            </div>
        </div>
    )
}