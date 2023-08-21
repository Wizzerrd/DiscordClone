import { Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min"
import UserPreview from "../UserPreview"

import './left-panel.css'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { selectChannel, setModalPage, setModalType } from "../../store/ui"

export default function LeftPanel({serverId}){

    const dispatch = useDispatch()

    const {servers, channels} = useSelector(state => state.entities)
    const { currentServer, currentChannel } = useSelector(state => state.ui)
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
                <div className="left-panel">
                    <div className="left-panel-drop-down">
        
                    </div>

                    <div className="label-for-channels-drop-down">
                        <label>Text Channels</label>
                        <div onClick={()=>dispatch(setModalType('newChannel'))} id="add-channel-button">+</div>
                    </div>
                    <div className="channels-drop-down">
                        {channelList.map(channel => <div onClick={() => dispatch(selectChannel(channel.id))} className="left-panel-option" key={channel.id}>{channel.title}</div>)}
                    </div>
                    {/* <UserPreview/> */}
                </div>
            </>
        )
    }
}