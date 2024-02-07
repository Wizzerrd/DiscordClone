import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"

import './left-panel.css'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setModalType } from "../../store/ui"

import { AiOutlinePlus } from 'react-icons/ai'

import { ReactComponent as WaveIcon } from '../../Assets/wave.svg';
import { useEffect, useState } from "react"
import consumer from "../../consumer"
import { addChannel } from "../../store/channels"
import { logout } from "../../store/session"
import UserInfo from "./UserInfo"

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
        if (channels){
            let this_list = Object.keys(channels).filter(ele => {
                if(ele){
                    return true
                }
            })
            let idx = this_list[0]
            this_list = this_list.map(ele => {
                return channels[ele]
            })
            setChannelList(this_list)
            history.push(`/channels/${serverId}/${idx}`)
        }
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

    if(serverId === '@me'){
        return(     
            <div className="left-panel">
                <div className="left-panel-drop-down">
                    <input className="search-bar" type="text" placeholder="DMs coming soon!"></input>
                </div>
 
                <div id="left-panel-friends-button" className={amIChosen()}>
                    <WaveIcon id='wave-icon-list'/>
                    <div>Friends</div>
                </div>
                <div onClick={()=>dispatch(logout())} className="left-panel-option logout-button">
                    Log Out
                </div>
                <div className="list-spacer"></div>
                <UserInfo/>
            </div>

            
        )
    } else {
        return(
            <>
                {channels && <div className="left-panel">

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

                    <UserInfo/>

                </div>}
            </>
        )
    }
}