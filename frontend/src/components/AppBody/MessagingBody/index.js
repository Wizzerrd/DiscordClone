import { useState } from 'react'
import './messaging.css'

export default function MessagingBody(){

    const [message, setMessage] = useState('')
    
    function handleSubmit(e){
        e.preventDefault()
        
    }
    
    return(
        <div className="messaging-body">
            <div className="messages-holder">

            </div>

            <form onSubmit={(e)=> handleSubmit(e)} className="messaging-box-holder">
                <input value={message} onChange={e=>setMessage(e.target.value)} className='message-box' type="text"></input>
            </form>
        </div>
    )
}