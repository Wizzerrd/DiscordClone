import { useState } from 'react';
import { useSelector } from 'react-redux';
import './newchannel.css'
import { useDispatch } from 'react-redux';
import { createChannel } from '../../../../store/channels';
import { fetchUser } from '../../../../store/users';
import { setModalType } from '../../../../store/ui';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function NewChannelModal(){

    const dispatch = useDispatch()
    
    const { user } = useSelector(state => state.session);
    const { serverId } = useParams()

    const [channelObj, setChannelObj] = useState({
        owner_id: user.id,
        server_id: serverId,
        title: ''
    })

    function handleSubmit(e){
        e.preventDefault();
        dispatch(createChannel(channelObj)).catch( async res => {
            let data = res.json
        })
        dispatch(fetchUser(user.id))
        dispatch(setModalType(false))
    }
    
    return(
        <div className="modal-foreground">
            
            <h1>Create Channel</h1>
                
            <div>
                <label htmlFor='new-channel-name-input'><h2>CHANNEL NAME</h2></label>
                <input value={channelObj.title} onChange={(e)=>setChannelObj({...channelObj, title: e.target.value})} className='server-text-input' id='new-channel-name-input' type='text' placeholder='new-channel'/>
            </div>

            <div className='new-channel-bottom'>
                <div onClick={(e)=>handleSubmit(e)} className='discord-button button-small'>
                    Create Channel
                </div>
                <div className='discord-button button-small'>
                    Cancel
                </div>
            </div>
            
        </div>
    )
}