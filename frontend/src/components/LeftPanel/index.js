import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import UserPreview from "../UserPreview"

import './left-panel.css'

export default function LeftPanel({serverId}){
    
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
                        <UserPreview/>
                </div>
            </>
        )
    } else {
        return(
            <>
                <div className="left-panel">
                    <div className="left-panel-drop-down">
        
                    </div>
                    <div className="text-channels-drop-down">
                        
                    </div>
                    <UserPreview/>
                </div>
            </>
        )
    }
}