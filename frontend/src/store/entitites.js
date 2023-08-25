import { combineReducers } from "redux"
import serversReducer from "./servers"
import usersReducer from './users'
import channelsReducer from "./channels"
import messagesReducer from "./messages"
import friendsReducer from "./friends"
import incomingFriendsReducer from "./incomingfriends"


export const DUMP_ENTITIES = 'entities/DUMP_ENTITIES'

export const dumpEntities = () => ({
    type: DUMP_ENTITIES
})

// Reducer

const entitiesReducer = combineReducers({
    users: usersReducer,
    memberships: {},
    friends: friendsReducer,
    servers: serversReducer,
    channels: channelsReducer,
    buckets: {},
    messages: {},
    messages: messagesReducer,
    incomingFriends: incomingFriendsReducer
})

export default entitiesReducer
