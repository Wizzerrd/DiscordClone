import { Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min"
import UserPreview from "../UserPreview"

import './left-panel.css'
import { useSelector } from "react-redux"

export default function LeftPanel({serverId}){

    const {servers, channels} = useSelector(state => state.entities)
    const { currentServer, currentChannel} = useSelector(state => state.ui)
    const channelList = Object.values(channels)
    
    
    if(serverId === '@me'){
        return(
            <>
                <div className="left-panel">
                        <div className="left-panel-drop-down">
                            <input className="search-bar" type="text" placeholder="Find or start a conversation"></input>
                        </div>
                        <div className="left-panel-top-buttons">
                            <div className="left-panel-option" id="friend-list-button">Friends</div>
                        </div>
                        <div className="dm-label-div">
                            <div>
                                DIRECT MESSAGES
                            </div>
                            <div>
                                +
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
                <Redirect to={`/channels/${serverId}/`} />
                <div className="left-panel">
                    <div className="left-panel-drop-down">
        
                    </div>
                    <label>Text Channels</label>
                    <ul className="text-channels-drop-down">
                        {channelList.map(channel => <li className="left-panel-option" key={channel.id}>{channel.title}</li>)}
                    </ul>
                    {/* <UserPreview/> */}
                </div>
            </>
        )
    }
}