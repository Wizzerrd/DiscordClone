import { useSelector } from 'react-redux'
import './top-bar.css'

export default function TopBar({channelId}){

    const {channels} = useSelector(state => state.entities)

    let channelTitle;
    
    if(channelId && channelId !== '@me' && channels[channelId]){
        channelTitle = channels[channelId].title
    }

    return(
        <div id="top-bar">
            {channelTitle && `${channelTitle}`}
        </div>
    )
}