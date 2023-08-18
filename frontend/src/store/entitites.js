import csrfFetch from "./csrf"

export const DUMP_ENTITIES = 'entities/DUMP_ENTITIES'

export const dumpEntities = () => ({
    type: DUMP_ENTITIES
})

// Servers

export const SET_SERVERS = 'entities/SET_SERVERS'

export const ADD_SERVER = 'entities/ADD_SERVER'

export const setServers = servers => ({
    type: SET_SERVERS,
    servers
})

export const addServer = server => ({
    type: ADD_SERVER,
    server
})

export const createServer = server => async dispatch => {
    const res = await csrfFetch('/api/servers', {
        method:'POST',
        body: JSON.stringify(server)
    })
    let data = res.json()
    dispatch(addServer(data))
}

// Reducer

const initialState = {
    users: {},
    memberships: {},
    relationships: {},
    servers: {},
    channels: {},
    buckets: {},
    messages: {}
}

export default function entitiesReducer(state = initialState, action){
    switch(action.type){
        // Servers
        case SET_SERVERS:
            return({...state, servers: action.servers})
        case ADD_SERVER:
            return({...state, servers: {...state.servers, [action.server.id]: action.server}})
        // Other
        case DUMP_ENTITIES:
            return initialState
        default:
            return state
    }
}