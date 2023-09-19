import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { logout } from '../../store/session';

import { AiOutlinePlus } from 'react-icons/ai'

import { uiInitialState, setModalType, selectServer } from '../../store/ui';

import './servers.css'
import { fetchServer } from '../../store/servers';
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function ServerScroller({ serverId }){

    const dispatch = useDispatch()
    const history = useHistory()

    const { servers } = useSelector(state => state.entities)
    const { selectedServer, modalType } = useSelector(state => state.ui)
    const serverList = Object.values(servers)

    function amIChosen(server){
        let className = 'server-list-item'
        if (String(serverId) === String(server)) className += ' chosen'
        else if (server === 0 && modalType === 'newServer' ) className += ' making-server'
        return className
    }

    useEffect(()=>{
        dispatch(selectServer(serverId)).catch(err => {
            history.push('/channels/@me')
        })
    }, [serverId])

    return(
        <div className='server-scroller'>

            {/* Friends List Selector */}
            <div>
                <Link to={`/channels/@me`}><div id='friend-list-selector' className={amIChosen('@me')}>
                    <img src='https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg'/>
                </div></Link>
            </div>

            {/* Server Selectors */}
            <div className='server-list'>
                {serverList.map( server => 
                    server?.id && <Link key={server.id} to={`/channels/${server.id}/${server.primaryChannel}`}><div className={amIChosen(server.id)}>{server.id}</div></Link>)
                }

            </div>

            {/* New Server Selector */}
            <div>
                <div onClick={e => dispatch(setModalType('newServer'))} className={amIChosen(0)} id='add-server-button'>
                    <AiOutlinePlus/>
                </div>
            </div>

        </div>
    )
}