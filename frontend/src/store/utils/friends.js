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

