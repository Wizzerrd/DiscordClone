import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setCenterPanelPage } from "../../../store/ui"

import './friends.css'
import { addFriend, cancelRequest, removeFriend  } from "../../../store/utils/friends"
import { receiveFriend, removeFriendRedux } from "../../../store/friends"

import { ReactComponent as CancelSymbol } from '../../../Assets/cancel.svg'
import { ReactComponent as AcceptSymbol} from '../../../Assets/accept.svg'
import { removeIncomingFriend } from "../../../store/incomingfriends"

export default function FriendsListBody(){

    const dispatch = useDispatch()

    const { centerPanelPage } = useSelector(state => state.ui)
    const { user } = useSelector(state => state.session)
    const { friends, incomingFriends } = useSelector(state => state.entities)

    const [newFriend, setNewFriend] = useState('')
    const [message, setMessage] = useState('')

    const [friendsList, setFriendsList] = useState([])
    const [incomingFriendsList, setIncomingFriendsList] = useState([])

    function handleSubmit(e, pending){
        e.preventDefault();
        setMessage('')
        switch(centerPanelPage){
            case 1:
                return dispatch(addFriend(pending.username, user.id))
                .then(dispatch(removeIncomingFriend(pending.userId)))
                .then(dispatch(receiveFriend({username: pending.username, userId: pending.userId, accepted: true})))
                .then(setMessage(`${pending.username} added!`))
            case 2:
                if( newFriend === user.username ){
                    setMessage("You can't add yourself as a friend, silly")
                }else {
                    return dispatch(addFriend(newFriend, user.id)).catch(res => {
                        setMessage('error')
                    }).then( async res => {
                        if(res){
                            let data = await res.json()
                            await dispatch(receiveFriend({...data, username: newFriend}))
                            setNewFriend('')
                            setMessage(`Success! Friend request sent to ${newFriend}`)
                        }
                    })
                }
        }
    }

    function handleRemove(e, friend, receiver){
        e.preventDefault()
        switch(centerPanelPage){
            case 0:
                return dispatch(removeFriend(user.id, friend.userId))
                .catch((err)=>console.log(err))
                .then(dispatch(removeFriendRedux(friend.userId)))
                .then(setMessage(`${friend.username} removed`))
            case 1:
                if(receiver){
                    return dispatch(cancelRequest(friend.userId , receiver.id))
                    .catch((err)=>console.log(err))
                    .then(dispatch(removeIncomingFriend(friend.userId)))
                    .then(setMessage(`Request from ${friend.username} rejected`))
                }else{
                    return dispatch(cancelRequest(user.id, friend.userId))
                    .catch((err)=>console.log(err))
                    .then(dispatch(removeFriendRedux(friend.userId)))
                    .then(setMessage(`Request to ${friend.username} canceled`))
                }
        }
    }
    
    useEffect(()=>{
        setNewFriend("")
        setMessage("")
    },[centerPanelPage])

    useEffect(()=>{
        setFriendsList(Object.values(friends))
    }, [friends])

    useEffect(()=>{
        setIncomingFriendsList(Object.values(incomingFriends))
    }, [incomingFriends])

    function ListOfFriends(){

        if(centerPanelPage === 0){
            return(
                <div className="friends-body">
                    <div className="list-title">ALL FRIENDS</div>
                    {friendsList.map(friend => {
                        if(friend?.accepted) return (
                        <div className="friends-list-item" key={friend.userId}>
                            <h1>{friend.username}</h1>
                            <div className="friends-list-item-button-holder">
                                <CancelSymbol onClick={(e)=>handleRemove(e, friend)} className="cancel-request-button" />
                            </div>
                        </div>
                        )
                    })}
                    {message && <div className='friend-error'>{message}</div>}
                </div>
            )
        } else if (centerPanelPage === 1) {
            return(
                <div className="friends-body">
                    <div className="list-title">OUTGOING</div>
                    <div id="outgoing-requests">
                        {friendsList.map(friend => { if( friend && !friend?.accepted) return (
                        <div className="friends-list-item" key={friend.userId}>
                            <h1>{friend.username}</h1>
                            <div className="friends-list-item-button-holder">
                                <CancelSymbol onClick={(e)=>handleRemove(e, friend)} className="cancel-request-button" />
                            </div>
                        </div>)})}
                    </div>

                    <div className="list-title">INCOMING</div>
                    <div id="incoming-requests">
                        {incomingFriendsList.map(incoming => {
                            if(incoming) return(
                                <div className="friends-list-item" key={incoming.userId}>
                                    <h1>{incoming.username}</h1>
                                    <div className="friends-list-item-button-holder">
                                        <AcceptSymbol onClick={(e)=>handleSubmit(e, incoming)} className="accept-request-button" />
                                        <CancelSymbol onClick={(e)=>handleRemove(e, incoming, user)} className="cancel-request-button" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {message && <div className='friend-error'>{message}</div>}
                </div>          
            )
        }
    }

    if(centerPanelPage === 2){
        return(
            <div className="friends-body">
                <div className="new-friend-search-holder">
                    <h1>ADD FRIEND</h1>
                    <h3>You can add friends with their Discord username.</h3>
                    <input value={newFriend} onChange={(e)=> setNewFriend(e.target.value)} placeholder="You can add friends with their Discord username." id='friend-request-input' type="text"/>
                    <div onClick={e=>handleSubmit(e)} id='send-friend-request' className="discord-button button-hover">Send Friend Request</div>
                    {message && <div className='friend-error'>{message}</div>}
                </div>
            </div>
        )
    } else {
        return(     
            <ListOfFriends/>
        )
    }

}