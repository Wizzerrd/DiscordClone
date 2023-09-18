export const SET_INCOMING_FRIENDS = 'incomingfriends/SET_INCOMING_FRINEDS'
export const RECEIVE_INCOMING_FRIENDS = 'incomingfriends/RECEIVE_INCOMING_FRIENDS'

export const setIncomingFriends = incomingFriends => ({
    type: SET_INCOMING_FRIENDS,
    incomingFriends
})

export const receivIncomingFriends = incomingFriends => ({
    type: RECEIVE_INCOMING_FRIENDS,
    incomingFriends
})

export const REMOVE_INCOMING_FRIEND = 'incomingFriends/REMOVE_INCOMING_FRIEND'

export const removeIncomingFriend = incomingFriendId => ({
    type: REMOVE_INCOMING_FRIEND,
    incomingFriendId
})

export default function incomingFriendsReducer(state = {}, action){
    switch(action.type){
        case RECEIVE_INCOMING_FRIENDS:
            return({...state, ...action.incomingFriends})
        case SET_INCOMING_FRIENDS:
            return({...action.incomingFriends})
        case REMOVE_INCOMING_FRIEND:
            let newState = {...state}
            newState[action.incomingFriendId] = undefined
            return newState
        default:
            return state
    }
}