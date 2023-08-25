import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import RightPanel from "../RightPanel";
import TopBar from "./TopBar";
import BodySelector from "./BodySelector";

import './app-body.css'

export default function AppBody(){
    const {serverId, channelId} = useParams()

    return(
        <div className="app-body-main">
            <TopBar channelId={channelId}/>
            <BodySelector />
        </div>
    )
}