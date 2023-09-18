import csrfFetch from "../csrf"

export const addFriend = (username, senderId) => async dispatch => {
    const res = await csrfFetch(`/api/users?username=${username}`)
    let data = await res.json()
    if(res.ok){
        const fRes = await csrfFetch(`/api/friendships`, {
            method: 'POST',
            body: JSON.stringify({sender_id: senderId, receiver_id: data.user.id })
        })
        if(fRes.ok){
            return fRes
        } else {
            throw ( fRes )
        }
    } else{
        throw( res )
    }
}

export const removeFriend = (senderId, receiverId) => async dispatch => {
    const res = await csrfFetch(`/api/friendships`, {
        method: 'DELETE',
        body: JSON.stringify({
            sender_id: senderId,
            receiver_id: receiverId,
            mutual: true
        })
    })
    if(res.ok){
        let data = await res.json()
        return {message: "removed friend", data: {...data}}
    }else{
        throw(res)
    }
}

export const cancelRequest = (senderId, receiverId) => async dispatch => {
    const res = await csrfFetch(`/api/friendships`, {
        method: 'DELETE',
        body: JSON.stringify({
            sender_id: senderId,
            receiver_id: receiverId
        })
    })
    if(res.ok){
        let data = await res.json()
        return {message: "cancelled request", data: {...data}}
    }else{
        throw(res)
    }
}

