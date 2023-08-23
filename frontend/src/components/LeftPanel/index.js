import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min"
import UserPreview from "../UserPreview"

import './left-panel.css'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setModalPage, setModalType } from "../../store/ui"

import { FaGear } from 'react-icons/fa' 
import { AiOutlinePlus, AiOutlineDown } from 'react-icons/ai'

import {PiGearSixFill} from 'react-icons/pi'

const landingRedirect = () => {

}

export default function LeftPanel({serverId}){

    const dispatch = useDispatch()

    const { channels, servers } = useSelector(state => state.entities)
    const { selectedChannel } = useSelector(state => state.ui)
    const channelList = Object.values(channels)

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
    
    if(serverId === '@me'){
        return(
            <>
                <div className="left-panel">
                    <div className="left-panel-drop-down">
                        <input className="search-bar" type="text" placeholder="Find or start a conversation"></input>
                    </div>
                    <div className={amIChosen()}>
                        <div className="left-panel-option" id="friend-list-button">Friends</div>
                    </div>
                    <div className="dm-label-div">
                        <div>
                            DIRECT MESSAGES
                        </div>
                        <div>
                            <AiOutlinePlus/>
                        </div>
                    </div>
                    <div className="left-panel-dms">
                    </div>
                    {/* <UserPreview/> */}
                </div>
            </>
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
                            <AiOutlineDown/>
                        </div>
                    </div>

                    <div className="label-for-channels-drop-down">
                        <label>Text Channels</label>
                        <div onClick={()=>dispatch(setModalType('newChannel'))} id="add-channel-button"><AiOutlinePlus/></div>
                    </div>
                    <div className="channels-drop-down">
                        {channelList.map(channel => <Link key={channel.id} to={`/channels/${serverId}/${channel.id}`}><div className={amIChosen(channel.id)}>{channel.title}</div></Link>)}
                    </div>
                    {/* <UserPreview/> */}
                </div>
            </>
        )
    }
}