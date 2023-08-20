export const DUMP_CHANNELS = 'channels/DUMP_CHANNELS'

export const SET_CHANNELS  = 'channels/SET_CHANNELS'

export const ADD_CHANNELS = 'channels/ADD_CHANNELS'

export const ADD_CHANNEL = 'channels/ADD_CHANNEL'

export const dumpChannels = () => ({
    type: DUMP_CHANNELS
})

export const setChannels = channels => ({
    type: SET_CHANNELS,
    channels
})

export const addChannels = channels => ({
    type: ADD_CHANNELS,
    channels
})

export const addChannel = channel => ({
    type: ADD_CHANNEL,
    channel
})

export default function channelsReducer(state = {}, action){
    switch(action.type){
        case SET_CHANNELS:
            return {...action.channels}
        case ADD_CHANNELS:
            return {...state, ...action.channels}
        case ADD_CHANNEL:
            return {...state, ...action.channel}
        case DUMP_CHANNELS:
            return {}
        default:
            return state;
    }
}