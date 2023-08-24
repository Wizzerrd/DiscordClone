import csrfFetch from "./csrf"
import { setFriends } from "./friends"
import { setIncomingFriends } from "./incomingfriends"
import * as serverActions from './servers'
import { SET_SERVER } from "./ui"

export const ADD_USER = 'users/ADD_USER'

export const addUser = payload => ({
    type: ADD_USER,
    payload
})

export const fetchUser = userId => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`)
    const data = await res.json()
    dispatch(serverActions.setServers(data.servers))
    dispatch(setFriends(data.friends)) 
    dispatch(setIncomingFriends(data.incomingFriendships))
}

export const findUser = username => async dispatch => {
    const res = await csrfFetch(`/api/users?username=${username}`)
    const data = await res.json()

}

export const ADD_USERS = 'users/ADD_USERS'

export const addUsers = users => ({
    type: ADD_USERS,
    users
})

export const addFriend = (username, senderId) => async dispatch => {
    const res = await csrfFetch(`/api/users?username=${username}`)
    let data = await res.json()
    if(res.ok){
        const fRes = await csrfFetch(`/api/friendships`, {
            method: 'POST',
            body: JSON.stringify({sender_id: senderId, receiver_id: data.user.id })
        })
        if(fRes.ok){
            return fRes
        } else {
            throw ( fRes )
        }
    } else{
        throw( res )
    }
}

export const createInvitation = (membershipable) => async dispatch => {
    console.log(membershipable)
    const res = await csrfFetch(`/api/memberships`, {
        method: 'POST',
        body: JSON.stringify({
            user_id: membershipable.user_id,
            membershipable_type: membershipable.membershipable_type,
            membershipable_id: membershipable.membershipable_id,
            accepted: false
        })
    })
    if(res.ok){
        return res
    } else {
        throw(res)
    }
}

export default function usersReducer(state = {}, action){
    switch(action.type){
        case ADD_USER:
            return {...state, [action.payload.user.id]: action.payload.user}
        case ADD_USERS:
            return {...state, ...action.users}
        default:
            return state

    }
}

