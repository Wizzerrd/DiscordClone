import csrfFetch from "../csrf"

export const updateChannel = channel => async dispatch => {
    const res = await csrfFetch(`/api/channels/${channel.id}`, {
        method: 'PATCH',
        body: JSON.stringify(channel)
    })
    if(res.ok){
        return await res.json()
    } else {
        throw res
    }
}

export const deleteChannel = channelId => async dispatch => {
    const res = await csrfFetch(`/api/channels/${channelId}`, {
        method: 'DELETE'
    })
    if(res.ok){
        return res
    } else {
        throw res
    }
}