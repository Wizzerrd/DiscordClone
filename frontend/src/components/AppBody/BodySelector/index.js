import { useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min"

import FriendsListBody from "../FriendsListBody"
import MessagingBody from "../MessagingBody"

export default function BodySelector(){

    const { centerPanel } = useSelector(state => state.ui)
    const { channels } = useSelector(state => state.entities)

    const { serverId, channelId } = useParams()

    switch(centerPanel){
        case 'friends':
            return <FriendsListBody/>
        case 'messages':
            return <MessagingBody/>
        default:
            return(
                <div>
        
                </div>
            )
    }
    
}