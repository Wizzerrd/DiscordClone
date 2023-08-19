import { combineReducers } from "redux"
import serversReducer from "./servers"
import usersReducer from './users'


export const DUMP_ENTITIES = 'entities/DUMP_ENTITIES'

export const dumpEntities = () => ({
    type: DUMP_ENTITIES
})

// Reducer

// const initialState = {
    // users: {},
    // memberships: {},
    // relationships: {},
    // servers: {},
    // channels: {},
    // buckets: {},
    // messages: {}
// }

const entitiesReducer = combineReducers({
    users: usersReducer,
    memberships: {},
    relationships: {},
    servers: serversReducer,
    channels: {},
    buckets: {},
    messages: {}
})

export default entitiesReducer
