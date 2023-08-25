import { RECEIVE_MESSAGE } from "./messages"

export const SET_FRIENDS = 'friends/SET_FRIENDS'

export const setFriends = friends => ({
    type: SET_FRIENDS,
    friends
})

export const RECEIVE_FRIEND = 'friends/RECEIVE_FRIEND'

export const receiveFriend = payload => ({
    type: RECEIVE_FRIEND,
    payload
})

export default function friendsReducer(state = {}, action){
    switch (action.type){
        case SET_FRIENDS:
            return ({...action.friends})
        case RECEIVE_FRIEND:
            let received = {
                userId: action.payload.friendship.receiverId,
                username: action.payload.username,
                accepted: action.payload.accepted
            }
            return({...state, [action.payload.friendship.receiverId]: received})
        default:
            return state
    }
}