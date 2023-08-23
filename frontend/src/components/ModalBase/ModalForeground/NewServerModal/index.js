import { setModalPage, setModalType } from '../../../../store/ui'
import './newserver.css'

import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { createServer } from '../../../../store/servers';
import { fetchUser } from '../../../../store/users';

export default function NewServerModal({ modalPage }){
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.session);

    const [serverObj, setServerObj] = useState({
        owner_id: user.id,
        title: `${user.username}'s server`
    })

    function handleSubmit(e){
        e.preventDefault();
        dispatch(createServer(serverObj)).catch( async res => {
            let data = res.json
        })

        dispatch(fetchUser(user.id))
        dispatch(setModalType(false))
    }

    switch(modalPage){
        case 0:
            return(
                <div className="new-server-foreground">
                    <div className='new-server-modal-button' id='create-my-own' onClick={()=>dispatch(setModalPage(1))}>
                        Create my Own
                    </div>
                </div>
            )
        case 1:
            return(
                <div className="new-server-foreground">
                    <div>
                        <h1>Customize your server</h1>
                        <p>Give your new server a personality with a name. You can always change it later.</p>
                    </div>
                    <div>
                        <h2>SERVER NAME</h2>
                        <input value={serverObj.title} onChange={(e) => setServerObj({...serverObj, title: e.target.value})} type='text' className='new-server-text-input'></input>
                    </div>
                    <div className='new-server-bottom-buttons'>
                        <label className='new-server-back' onClick={()=>dispatch(setModalPage(modalPage - 1))}>Back</label>
                        <div onClick={handleSubmit} className='discord-button button-small' >Create</div>
                    </div>
                </div>
            )

    }
}