import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setCenterPanelPage } from "../../../store/ui"

import './friends.css'
import { addFriend  } from "../../../store/utils/friends"
import { receiveFriend } from "../../../store/friends"

import { ReactComponent as CancelSymbol } from '../../../Assets/cancel.svg'

export default function FriendsListBody(){

    const dispatch = useDispatch()

    const { centerPanelPage } = useSelector(state => state.ui)
    const { user } = useSelector(state => state.session)
    const { friends, incomingFriends } = useSelector(state => state.entities)

    const [newFriend, setNewFriend] = useState('')
    const [message, setMessage] = useState('')

    function handleSubmit(e, pending){
        e.preventDefault();
        setMessage('')
        switch(centerPanelPage){
            case 1:
            case 2:
                if( newFriend === user.username ){
                    setMessage("You can't add yourself as a friend, silly")
                }else {
                    dispatch(addFriend(newFriend, user.id)).catch(res => {
                        setMessage('error')
                    }).then( async res => {
                        if(res){
                            let data = await res.json()
                            dispatch(receiveFriend({...data, username: newFriend}))
                            setNewFriend('')
                            setMessage('success')
                        }
                    })
                }
        }
    }

    function handleRemove(e){

    }
    
    useEffect(()=>{
        setNewFriend("")
        setMessage("")
    },[centerPanelPage])

    function ListOfFriends(){
        const friendsList = Object.values(friends)
        console.log(friendsList)
        const incomingFriendsList = Object.values(incomingFriends)
        if(centerPanelPage === 0){
            return(
                <div className="friends-body">
                    <div className="list-title">ALL FRIENDS</div>
                    {friendsList.map(friend => {
                        if(friend.accepted) return (
                        <div className="friends-list-item" key={friend.userId}>
                            <h1>{friend.username}</h1>
                            <div className="friends-list-item-button-holder">
                                <CancelSymbol onClick={(e)=>handleRemove()} className="cancel-request-button" />
                            </div>
                        </div>
                        )
                    })}
                </div>
            )
        } else if (centerPanelPage === 1) {
            return(
                <div className="friends-body">
                    <div className="list-title">OUTGOING</div>
                    <div id="outgoing-requests">
                        {friendsList.map(friend => {if(!friend.accepted) return (
                        <div className="friends-list-item" key={friend.userId}>
                            <h1>{friend.username}</h1>
                            <div className="friends-list-item-button-holder">
                                <CancelSymbol className="cancel-request-button" />
                            </div>
                        </div>)})}
                    </div>

                    <div className="list-title">INCOMING</div>
                    <div id="incoming-requests">
                        {incomingFriendsList.map(incoming => {
                            return(
                                <div className="friends-list-item" key={incoming.userId}>
                                    <h1>{incoming.username}</h1>
                                    <div className="friends-list-item-button-holder">
                                        <CancelSymbol className="accept-request-button" />
                                        <CancelSymbol className="cancel-request-button" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {message && <div>{message}</div>}
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
                    {message && <div>{message}</div>}
                </div>
            </div>
        )
    } else {
        return(     
            <ListOfFriends/>
        )
    }

}