export const SET_FRIENDS = 'friends/SET_FRIENDS'

export const setFriends = friends => ({
    type: SET_FRIENDS,
    friends
})

export default function friendsReducer(state = {}, action){
    switch (action.type){
        case SET_FRIENDS:
            return ({...action.friends})
        default:
            return state
    }
}