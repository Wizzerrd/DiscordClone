import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { deleteChannel, updateChannel } from "../../../../store/utils/channels"
import { setModalType } from "../../../../store/ui"

export default function ChannelOptionsModal(){

    const dispatch = useDispatch()

    const {channelId} = useParams()

    const { channels } = useSelector(state => state.entities)
    
    const [channelObj, setChannelObj] = useState({
        title: '',
        id: null
    })
    
    useEffect(()=>{
        const currentChannel = channels[Number(channelId)]
        setChannelObj({
            title: currentChannel.title,
            id: currentChannel.id
        })
    }, [channelId])

    function handleDelete(e){
        e.preventDefault()
        dispatch(deleteChannel(channelObj.id))
        .then(dispatch(setModalType(false)))
    }

    function handleUpdate(e){
        e.preventDefault()
        dispatch(updateChannel(channelObj))
        .then(dispatch(setModalType(false)))
    }
    
    return(
        <div className="modal-foreground">
            <h1>Edit Channel Settings</h1>
                <label htmlFor='new-channel-name-input'><h2>CHANNEL NAME</h2></label>
                <input value={channelObj.title} onChange={(e)=>setChannelObj({...channelObj, title: e.target.value})} className='server-text-input' id='new-channel-name-input' type='text' placeholder='new-channel'/>
                <div className='server-settings-button-holder'>
                        <div onClick={(e)=>handleUpdate(e)} className='discord-button button-small'>Save</div>
                        <div onClick={(e)=>handleDelete(e)} className='discord-button button-small' id='delete-server-button'>Delete Channel</div>
                    </div>
            <div>

            </div>
        </div>
    )
}