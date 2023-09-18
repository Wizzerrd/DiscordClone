import { useSelector } from 'react-redux'
import './server-options.css'
import { useDispatch } from 'react-redux'
import { createInvitation } from '../../../../store/utils/servers'
import { addMember } from '../../../../store/servers'

export default function ServerOptionsModal({modalPage}){
    const dispatch = useDispatch()
    
    const { friends, servers } = useSelector(state => state.entities)
    const { selectedServer } = useSelector(state => state.ui)
    const friendsList = Object.values(friends)
    
    function Friend(friend){
        const {members} = servers[Number(selectedServer)]
        const {userId, username} = friend
        
        if(members && members.includes(userId)){
            return null
        }
        
        async function sendInvite(id){
            let server = {
                user_id: id,
                membershipable_type: "Server",
                membershipable_id: Number(selectedServer)
            }
            const res = dispatch(createInvitation(server))
            .catch( res => console.log(res) )
            .then(dispatch(addMember(server.membershipable_id, id)))
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
                    <>
                        <h1>What would you like to do?</h1>
                            <h3>Edit Server Settings</h3>
                        <div className='server-settings-holder'>
                            <h2><label htmlFor='update-server-name'>Update Server Name</label></h2>
                            <input className='server-text-input' id='update-server-name' type='text'/>
                        </div>
                        <h1>or</h1>
                            <h3>Invite Friends to the Server</h3>
                        <div className='server-settings-holder'>
                            <div className='invite-friends-list'>
                                {friendsList.map( friend => Friend(friend))}
                            </div>
                        </div>
                    
                    </>
                )
            case 1:
                return(
                    <div className='modal-contents'>

                    </div>
                )
        }
    }

    return(
        <div className="modal-foreground">
            <ModalContents/>
        </div>
    )
}
