import csrfFetch from "../csrf"

export const createInvitation = (membershipable) => async dispatch => {
    const res = await csrfFetch(`/api/memberships`, {
        method: 'POST',
        body: JSON.stringify({
            user_id: membershipable.user_id,
            membershipable_type: membershipable.membershipable_type,
            membershipable_id: membershipable.membershipable_id,
            accepted: false
        })
    })
    if(res.ok){
        return res
    } else {
        throw(res)
    }
}

export const deleteMembership = (userId, serverId) => async dispatch => {
    const res = await csrfFetch(`/api/memberships`, {
        method: 'DELETE',
        body: JSON.stringify({
            user_id: userId,
            server_id: serverId
        })
    })
    if(res.ok){
        return await res.json()
    } else {
        throw (res)
    }
}

export const fetchServer = serverId => async dispatch => {
    const res = await csrfFetch(`/api/servers/${serverId}`)
    if(res.ok){
        return await res.json()
    } else{
        throw(res)
    }
}

export const updateServer = server => async dispatch => {
    const res = await csrfFetch(`/api/servers/${server.id}`, {
        method: 'PATCH',
        body: JSON.stringify(server)
    })
    if (res.ok){
        return await res.json()
    } else {
        throw(res)
    }
}

export const deleteServer = serverId => async dispatch => {
    const res = await csrfFetch(`/api/servers/${serverId}`, {
        method: 'DELETE'
    })
    if(res.ok){
        return await res.json()
    } else {
        throw(res)
    }
}