import csrfFetch from "./csrf"
import { ADD_USER } from "./users"

// Servers

export const SET_SERVERS = 'servers/SET_SERVERS'

export const ADD_SERVER = 'servers/ADD_SERVER'

export const ADD_SERVERS = 'servers/ADD_SERVERS'

export const setServers = servers => ({
    type: SET_SERVERS,
    servers
})

export const addServer = server => ({
    type: ADD_SERVER,
    server
})

export const addServers = servers => ({
    type: ADD_SERVERS,
    servers
})

export const createServer = (server) => async dispatch => {
    const res = await csrfFetch('/api/servers', {
        method:'POST',
        body: JSON.stringify(server)
    })
    if (res.ok){
        let data = await res.json()
        dispatch(addServer(data.server))
    }
}

export default function serversReducer(state = {}, action){
    switch(action.type){
        case SET_SERVERS:
            return({...state, servers: action.servers})
        case ADD_SERVER:
            return({...state.servers, [action.server.id]: action.server})
        case ADD_SERVERS:
            return({...state, ...action.servers})
        default:
            return state
    }
}