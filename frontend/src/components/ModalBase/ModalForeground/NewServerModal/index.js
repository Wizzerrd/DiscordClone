import { setModalPage } from '../../../../store/ui'
import './newserver.css'

import { useDispatch, useSelector } from 'react-redux';


export default function NewServerModal({ modalPage }){
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.session);

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
                        <input type='text' className='new-server-text-input'></input>
                    </div>
                    <div className='new-server-bottom-buttons'>
                        <label className='new-server-back' onClick={()=>dispatch(setModalPage(modalPage - 1))}>Back</label>
                        <div className='discord-button button-small' >Create</div>
                    </div>
                </div>
            )

    }
}