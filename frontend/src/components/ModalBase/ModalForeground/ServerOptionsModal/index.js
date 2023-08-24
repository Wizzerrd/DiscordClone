import { useSelector } from 'react-redux'
import './server-options.css'
import { useDispatch } from 'react-redux'
import { createInvitation } from '../../../../store/users'

export default function ServerOptionsModal({modalPage}){
    const dispatch = useDispatch()
    
    const { friends } = useSelector(state => state.entities)
    const { selectedServer } = useSelector(state => state.ui)
    const friendsList = Object.values(friends)

    function Friend(friend){

        const {userId, username} = friend

        function sendInvite(id){
            let server = {
                user_id: id,
                membershipable_type: "Server",
                membershipable_id: Number(selectedServer)
            }
            dispatch(createInvitation(server)).catch( res => console.log(res) )
        }

        return(
            <div className='invite-friends-item' key={userId}>
                <div>{username}</div>
                <div onClick={()=>sendInvite(userId)} className='invite-button'>Invite</div>
            </div>
        )
    }


    function ModalContents(){
        switch(modalPage){
            case 0:
                return(
                    <div className='modal-contents'>
                        <h1>What would you like to do?</h1>
                        <div className='settings-holder'>
                            <h2>Edit Server Settings</h2>
                            <label htmlFor='update-server-name'>Update Server Name</label>
                            <input id='update-server-name' type='text'/>
                        </div>
                        <h1>or</h1>
                        <div className='invite-option-holder'>
                            <h2>Invite Friends to the Server</h2>
                            <div className='invite-friends-list'>
                                {friendsList.map( friend => Friend(friend))}
                            </div>
                        </div>
                    </div>
                )
            case 1:
                return(
                    <div className='modal-contents'>

                    </div>
                )
        }
    }

    return(
        <div className="server-options-modal-foreground">
            <ModalContents/>
        </div>
    )
}
