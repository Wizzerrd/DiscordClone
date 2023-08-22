import csrfFetch from "./csrf"
import * as serverActions from './servers'

export const ADD_USER = 'users/ADD_USER'

export const addUser = payload => ({
    type: ADD_USER,
    payload
})

export const fetchUser = userId => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`)
    const data = await res.json()
    dispatch(serverActions.setServers(data.servers)) 
}

export const fetchOnlyUser = userId => async dispatch => {
    const res = await csrfFetch(`/api/users/minimal/${userId}`)

}

export default function usersReducer(state = {}, action){
    switch(action.type){
        case ADD_USER:
            return {...state, [action.payload.user.id]: action.payload.user}
        default:
            return state
    }
}