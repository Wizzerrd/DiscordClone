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
    const res = await csrfFetch(`/api/users/${userId}`).catch(err => {throw err})
    const data = await res.json()
    if(res.ok){
        dispatch(serverActions.setServers(data.servers))
        dispatch(setFriends(data.friends)) 
        dispatch(setIncomingFriends(data.incomingFriendships))
    }
}

export const ADD_USERS = 'users/ADD_USERS'

export const addUsers = users => ({
    type: ADD_USERS,
    users
})

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

