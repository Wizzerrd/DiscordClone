import { useSelector } from 'react-redux'
import './server-options.css'
import { useDispatch } from 'react-redux'
import { createInvitation, deleteMembership, deleteServer, updateServer } from '../../../../store/utils/servers'
import { addMember, setServers } from '../../../../store/servers'
import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { setModalType, setServer } from '../../../../store/ui'

export default function ServerOptionsModal({modalPage}){
    const dispatch = useDispatch()
    
    const { friends, servers } = useSelector(state => state.entities)
    const { selectedServer } = useSelector(state => state.ui)
    const {user} = useSelector(state => state.session)
    const state = useSelector(state => state)
    const friendsList = Object.values(friends)

    const currentServer = servers[selectedServer]
    const [editTitle, setEditTitle] = useState('')

    const history = useHistory()
    
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

    useEffect(()=>{
        setEditTitle(currentServer.title)
    },[currentServer])

    function handleUpdate(e){
        e.preventDefault()
        let serverInfo = {
            id: Number(selectedServer),
            title: editTitle
        }
        dispatch(updateServer(serverInfo))
        .then(dispatch(setServers({...servers, [Number(selectedServer)]: serverInfo})))
        .then(dispatch(setModalType(false)))
    }

    function handleDelete(e){
        e.preventDefault()
        return dispatch(deleteServer(Number(selectedServer)))
        .catch((err)=>console.error(err))
        .then(dispatch(setModalType(false)))
        .then(dispatch(setServers({
            ...servers,
            [Number(selectedServer)]: undefined
        })))
        .then(history.push('/channels/@me'))
    }
    
    function handleLeave(e){
        e.preventDefault()
        return dispatch(deleteMembership(user.id, Number(selectedServer)))
        .catch((err)=>console.error(err))
        .then(dispatch(setModalType(false)))
        .then(dispatch(setServers({...servers, [Number(selectedServer)]: undefined})))
        .then(history.push('/channels/@me'))
    }
    
    function SettingsDiv(){
        return(
            <>
                <h3>Edit Server Settings</h3>
                <div className='server-settings-holder'>
                    <h2><label htmlFor='update-server-name'>Update Server Name</label></h2>
                    <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className='server-text-input' id='update-server-name' type='text'/>
                    <div className='server-settings-button-holder'>
                        <div onClick={(e)=>handleUpdate(e)} className='discord-button button-small'>Save</div>
                        <div onClick={(e)=>handleDelete(e)} className='discord-button button-small' id='delete-server-button'>Delete Server</div>
                    </div>
                </div>
            </>
        )
    }

    function ModalContents(){
        switch(modalPage){
            case 0:
                return(
                    <>
                        <h1>What would you like to do?</h1>
                        {currentServer.ownerId === user.id && <SettingsDiv/> }
                        {currentServer.ownerId !== user.id && <div className='server-settings-button-holder'><div onClick={(e)=>handleLeave(e)} className='discord-button button-small' id='delete-server-button'>Leave Server</div></div> }
                        <h1>or</h1>
                        <h3>Invite Friends to the Server</h3>
                        <div className='server-settings-holder'>
                            <div className='invite-friends-list'>
                                {friendsList.map( friend => {if(friend.accepted) return Friend(friend)})}
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
