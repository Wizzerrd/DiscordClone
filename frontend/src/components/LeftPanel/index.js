import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min"
import UserPreview from "../UserPreview"

import './left-panel.css'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setModalPage, setModalType } from "../../store/ui"

const landingRedirect = () => {

}

export default function LeftPanel({serverId}){

    const dispatch = useDispatch()

    const { channels } = useSelector(state => state.entities)
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
                        {channelList.map(channel => <Link key={channel.id} to={`/channels/${serverId}/${channel.id}`}><div className="left-panel-option">{channel.title}</div></Link>)}
                    </div>
                    {/* <UserPreview/> */}
                </div>
            </>
        )
    }
}