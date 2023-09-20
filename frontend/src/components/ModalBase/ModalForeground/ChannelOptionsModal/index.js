import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { deleteChannel, updateChannel } from "../../../../store/utils/channels"
import { setModalType } from "../../../../store/ui"
import { setChannels } from "../../../../store/channels"

export default function ChannelOptionsModal(){

    const dispatch = useDispatch()
    const history = useHistory()

    const {channelId, serverId} = useParams()

    const { channels } = useSelector(state => state.entities)
    
    const [message, setMessage] = useState('')
    const [channelObj, setChannelObj] = useState({
        title: '',
        id: null
    })
    
    useEffect(()=>{
        const currentChannel = channels[Number(channelId)]
        currentChannel && setChannelObj({
            title: currentChannel.title,
            id: currentChannel.id
        })
    }, [channelId])

    const handleDelete = async (e) => {
        e.preventDefault()
        if(Object.values(channels).filter(ele => {
            if(ele){
                return true
            }
        }).length > 1){
            const res = await dispatch(deleteChannel(channelObj.id))
            .catch(err => {
                if(err.status === 404){
                    setMessage('Channel has already been deleted')
                }else if (err.status === 422) {
                    setMessage("Can't delete the last channel")
                }else{
                    setMessage("Error deleting channel")
                }
            })
            if(res){
                await dispatch(setChannels({...channels, [channelObj.id]: undefined}))
                await history.push(`/channels/${serverId}`)
                await dispatch(setModalType(false))
            }
        } else {
            setMessage("Can't delete the last channel")
        }
    }

    function handleUpdate(e){
        e.preventDefault()
        if(channelObj.title){
            dispatch(updateChannel(channelObj))
            .then(dispatch(setModalType(false)))
        }else{
            setMessage('Title cannot be blank')
        }
    }
    
    return(
        <div className="modal-foreground">
            <h1>Edit Channel Settings</h1>
                <label htmlFor='new-channel-name-input'><h2>CHANNEL NAME</h2></label>
                <input value={channelObj?.title} onChange={(e)=>setChannelObj({...channelObj, title: e.target.value})} className='server-text-input' id='new-channel-name-input' type='text' placeholder='new-channel'/>
                <div className='server-settings-button-holder'>
                        <div onClick={(e)=>handleUpdate(e)} className='discord-button button-small'>Save</div>
                        <div onClick={(e)=>handleDelete(e)} className='discord-button button-small' id='delete-server-button'>Delete Channel</div>
                </div>
                <div className='message-holder'><div className='error-message modal-error'>{message}</div></div>
            <div>

            </div>
        </div>
    )
}