import { setModalPage, setModalType } from '../../../../store/ui'
import './newserver.css'

import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { createServer } from '../../../../store/servers';
import { fetchUser } from '../../../../store/users';
import { FaChevronRight } from 'react-icons/fa';

export default function NewServerModal({ modalPage }){
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.session);

    const [message, setMessage] = useState('')
    const [serverObj, setServerObj] = useState({
        owner_id: user.id,
        title: `${user.username}'s server`
    })

    function handleSubmit(e){
        e.preventDefault();
        if(serverObj.title.length > 0){
            dispatch(createServer(serverObj)).catch( async res => {
                
            })
            dispatch(fetchUser(user.id))
            dispatch(setModalType(false))
        } else {
            setMessage('Title cannot be blank')
        }
    }

    switch(modalPage){
        case 0:
            return(
                <div className="modal-foreground">
                    <div className='new-server-modal-button' id='create-my-own' onClick={()=>dispatch(setModalPage(1))}>
                        <div>Create my Own</div>
                        <FaChevronRight/>
                    </div>
                </div>
            )
        case 1:
            return(
                <div className="modal-foreground">
                    <div id='new-server-heading'>
                        <h1>Customize your server</h1>
                        <p>Give your new server a personality with a name. You can always change it later.</p>
                    </div>
                    <div id='new-server-fields'>
                        <h2>SERVER NAME</h2>
                        <input value={serverObj.title} onChange={(e) => setServerObj({...serverObj, title: e.target.value})} type='text' className='server-text-input' id='new-server-text-input'></input>
                    </div>
                    <div className='message-holder'>
                        <div className='error-message modal-error'>{message}</div>
                    </div>
                    <div className='new-server-bottom-buttons'>
                        <div className='discord-button button-small' onClick={()=>dispatch(setModalPage(modalPage - 1))}>Back</div>
                        <div onClick={handleSubmit} className='discord-button button-small' >Create</div>
                    </div>
                </div>
            )

    }
}