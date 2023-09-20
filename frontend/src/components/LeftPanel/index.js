import { Link, Redirect, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import UserPreview from "../UserPreview"

import './left-panel.css'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setModalPage, setModalType } from "../../store/ui"

import { FaGear } from 'react-icons/fa' 
import { AiOutlinePlus, AiOutlineDown } from 'react-icons/ai'

import { ReactComponent as WaveIcon } from '../../Assets/wave.svg';

import {PiGearSixFill} from 'react-icons/pi'
import { useEffect, useState } from "react"
import consumer from "../../consumer"
import { addChannel } from "../../store/channels"
import { logout } from "../../store/session"

export default function LeftPanel({serverId}){

    const dispatch = useDispatch()
    const history = useHistory()

    const { channels, servers } = useSelector(state => state.entities)
    const { selectedChannel } = useSelector(state => state.ui)

    const [channelList, setChannelList] = useState([])

    const { channelId } = useParams()

    function amIChosen(channelId){
        let className = "left-panel-option";
        if(selectedChannel){
            if(String(channelId) === String(selectedChannel)){
                className += ' selected-channel'
            }
        } else if (serverId === '@me') {
            className += ' selected-channel'
        }
        return(className)
    }

    useEffect(()=>{
        setChannelList(Object.values(channels).filter(ele => {
            if(ele){
                return true
            }
        }))
    },[channels])

    useEffect(()=>{
        if(serverId){
            const subscription = consumer.subscriptions.create(
                {channel: 'ServersChannel', id: serverId},
                {
                    received: channel => {
                        dispatch(addChannel({channel: {...channel}}))
                    }
                }
            );
            return () => subscription?.unsubscribe();
        }
    },[serverId, dispatch])

    useEffect(()=>{
        if(serverId !== '@me' && !channelId){
            if(channelList.length > 0){
                history.push(`/channels/${serverId}/${channelList[0]?.id || channelList[1]?.id}`)
            }
        }
    },[channelId])
    
    if(serverId === '@me'){
        return(     
            <div className="left-panel">
                <div className="left-panel-drop-down">
                    <input className="search-bar" type="text" placeholder="Find or start a conversation"></input>
                </div>
 
                <div id="left-panel-friends-button" className={amIChosen()}>
                    <WaveIcon id='wave-icon-list'/>
                    <div>Friends</div>
                </div>
                <div onClick={()=>dispatch(logout())} className="left-panel-option logout-button">
                    Log Out
                </div>

            </div>
        )
    } else {
        return(
            <>
                <div className="left-panel">

                    <div onClick={() => dispatch(setModalType('serverOptions'))} className="left-panel-drop-down">
                        <div>
                            {servers[serverId] && servers[serverId].title}
                        </div>
                        <div className="server-options-wheel">
                            <AiOutlinePlus/>
                        </div>
                    </div>

                    <div className="left-panel-scroller">
                        <div className="label-for-channels-drop-down">
                            <label>Text Channels</label>
                            <div onClick={()=>dispatch(setModalType('newChannel'))} id="add-channel-button"><AiOutlinePlus/></div>
                        </div>
                        <div className="channels-drop-down">
                            {channelList.map(channel => {
                                if(channel?.id) return (<Link key={channel.id} to={`/channels/${serverId}/${channel.id}`}>
                                    <div className={amIChosen(channel.id)}>
                                        {channel.title}
                                        <div onClick={()=>dispatch(setModalType('channelOptions'))}>
                                            <AiOutlinePlus/>
                                        </div>
                                    </div>
                                </Link>)}
                            )}
                        </div>
                    </div>

                </div>
            </>
        )
    }
}