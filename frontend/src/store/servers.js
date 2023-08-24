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
    let data = await res.json()
    console.log(data)
    dispatch(addServer(data.server))
 
}

export const fetchServer = serverId => async dispatch => {
    const res = await csrfFetch(`/api/servers/${serverId}`)
    let data = await res.json()
    return data
}

export const ADD_MEMBER = 'servers/ADD_MEMBER'

export const addMember = (serverId, memberId) => ({
    type: ADD_MEMBER,
    serverId,
    memberId
})

export default function serversReducer(state = {}, action){
    switch(action.type){
        case SET_SERVERS:
            return({...action.servers})
        case ADD_SERVER:
            return({...state, [action.server.id]: action.server})
        case ADD_SERVERS:
            return({...state, ...action.servers})
        case ADD_MEMBER:
            let newState = {...state}
            newState[action.serverId].members ||= []
            newState[action.serverId].members.push(action.memberId)
            return newState
        default: 
            return state
    }
}