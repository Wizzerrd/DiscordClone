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

export const REMOVE_FRIEND = 'friends/REMOVE_FRIEND'

export const removeFriendRedux = friendId => ({
    type: REMOVE_FRIEND,
    friendId
})

export default function friendsReducer(state = {}, action){
    switch (action.type){
        case SET_FRIENDS:
            return ({...action.friends})
        case RECEIVE_FRIEND:
            let userId;
            if (action.payload.friendship){
                userId = action.payload.friendship.receiverI
            } else {
                userId = action.payload.userId
            }
            let received = {
                userId,
                username: action.payload.username,
                accepted: action.payload.accepted
            }
            return({...state, [userId]: received})
        case REMOVE_FRIEND:
            let newState = {...state}
            newState[action.friendId] = undefined
            return newState
        default:
            return state
    }
}