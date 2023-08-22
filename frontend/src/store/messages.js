import csrfFetch from "./csrf"

export const SEND_MESSAGE = 'messages/SEND_MESSAGE'

export const RECEIVE_MESSAGE = 'messages/RECEIVE_MESSAGE'

export const sendMessage = message => async dispatch => {
    const res = await csrfFetch(`/api/messages`, {
        method: 'POST',
        body: JSON.stringify(message)
    })
    // if(res.ok){
    //     let data = await res.json()
    //     dispatch(receiveMessage(data.message))
    // } else {
    //     throw(res)
    // }
}

export const receiveMessage = message => ({
    type: RECEIVE_MESSAGE,
    message
})

export const SET_MESSAGES = 'messages/SET_MESSAGES'

export const setMessages = messages => ({
    type: SET_MESSAGES,
    messages
})

export const fetchMessages = channelId => async dispatch => {
    const res = await csrfFetch(`/api/channels/${channelId}`)
    if(res.ok){
        let data = await res.json()
        dispatch(setMessages(data))
    }
}

export default function messagesReducer(state = {}, action){  
    switch(action.type){
        case RECEIVE_MESSAGE:
            return {...state, messages: {...state.messages, [action.message.id]: {...action.message}}}
        case SET_MESSAGES:
            return { ...action.messages }
        default:
            return state
    }
}