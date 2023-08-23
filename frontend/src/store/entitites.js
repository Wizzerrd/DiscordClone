import { combineReducers } from "redux"
import serversReducer from "./servers"
import usersReducer from './users'
import channelsReducer from "./channels"
import messagesReducer from "./messages"


export const DUMP_ENTITIES = 'entities/DUMP_ENTITIES'

export const dumpEntities = () => ({
    type: DUMP_ENTITIES
})

// Reducer

const entitiesReducer = combineReducers({
    users: usersReducer,
    memberships: {},
    relationships: {},
    servers: serversReducer,
    channels: channelsReducer,
    buckets: {},
    messages: {},
    messages: messagesReducer
})

export default entitiesReducer
