import './messaging.css'
import consumer from '../../../consumer';

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchMessages, receiveMessage, sendMessage, setMessages } from '../../../store/messages'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function MessagingBody(){

    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState([])
    
    const dispatch = useDispatch()
    const history = useHistory()

    const { user } = useSelector(state => state.session)
    const { users } = useSelector(state => state.entities)
    const { messages } = useSelector(state => state.entities.messages)

    const messageList = () => {
        let list = []
        if (messages) {
            list = Object.values(messages).sort((ele1, ele2) => ele2.id - ele1.id)  
        } 
        return list
    }

    const { serverId, channelId } = useParams()
    
    useEffect(() => {      
        const subscription = consumer.subscriptions.create(
          { channel: 'ChannelsChannel', id: channelId },
          {
            received: message => {
                dispatch(receiveMessage(message))
            }
          }
        );
    
        return () => subscription?.unsubscribe();
    }, [channelId, dispatch]);

    useEffect(()=>{
        if(channelId) dispatch(fetchMessages(channelId)).catch(err => {
            history.push(`/channels/${serverId}`)
        })
    }, [channelId])

    function handleSubmit(e){
        e.preventDefault()
        dispatch(sendMessage({
            body: message,
            author_id: user.id,
            channel_id: channelId,
            server_id: serverId
        })).catch(res => setErrors(prev => [...prev, res])).then(setMessage(''))
    }

    function Message(ele){
        return(
            <div className='message-holder' key={ele.id}>
                <div className='author-details'>{(users[ele.authorId] && users[ele.authorId].username) || users[ele.author_id] && users[ele.author_id].username}</div>
                <div className='message-contents'>{ele.body}</div>
            </div>
        )
    }
    
    return(
        <div className="messaging-body">
            <div className="messages-holder">
                {messageList().map( ele => Message(ele) )}
            </div>

            <form onSubmit={(e)=> handleSubmit(e)} className="messaging-box-holder">
                <input value={message} onChange={e=>setMessage(e.target.value)} className='message-box' type="text"></input>
            </form>
        </div>
    )
}