import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setCenterPanelPage } from "../../../store/ui"

import './friends.css'
import { addFriend, fetchOnlyUser, findUser } from "../../../store/users"
import { receiveFriend } from "../../../store/friends"

export default function FriendsListBody(){

    const dispatch = useDispatch()

    const { centerPanelPage } = useSelector(state => state.ui)
    const { user } = useSelector(state => state.session)
    const { friends, incomingFriends } = useSelector(state => state.entities)

    const [newFriend, setNewFriend] = useState('')
    const [searchFriend, setSearchFriend] = useState('')
    const [message, setMessage] = useState('')

    function handleSubmit(e){
        e.preventDefault();
        setMessage('')
        dispatch(addFriend(newFriend, user.id)).catch(res => {
            setMessage('error')
        }).then( async res => {
            if(res){
                let data = await res.json()
                console.log(data)
                dispatch(receiveFriend({...data, username: newFriend}))
                setNewFriend('')
                setMessage('success')
            }
        })
    }

    function ListOfFriends(){
        const friendsList = Object.values(friends)
        const incomingFriendsList = Object.values(incomingFriends)
        if(centerPanelPage === 0){
            return(
                friendsList.map(friend => {
                    if(friend.accepted) return (
                    <div className="friends-list-item" key={friend.userId}>
                        <h1>{friend.username}</h1>
                    </div>
                    )
                })
            )
        } else if (centerPanelPage === 1) {
            return(
                <>
                    <h1>Outgoing</h1>
                    <div className="outgoing-requests">
                        {friendsList.map(friend => {if(!friend.accepted) return (<div className="friends-list-item" key={friend.userId}><h1>{friend.username}</h1></div>)})}
                    </div>
                    <h1>Incoming</h1>
                    <div className="incoming-requests">
                        {incomingFriendsList.map(incoming => <div className="friends-list-item" key={incoming.userId}><h1>{incoming.username}</h1></div>)}
                    </div>
                </>
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
            
            <div className="friends-body">
                {/* <div className="friend-search-holder">
                    <input type="text"/>
                </div> */}
                <div>
                    <div className="list-title"></div>
                    <div className="list-of-friends">
                        <ListOfFriends/>
                    </div>
                </div>
                
            </div>
            
            
        )
    }

}