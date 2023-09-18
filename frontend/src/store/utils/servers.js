import csrfFetch from "../csrf"

export const createInvitation = (membershipable) => async dispatch => {
    console.log(membershipable)
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

export const fetchServer = serverId => async dispatch => {
    const res = await csrfFetch(`/api/servers/${serverId}`)
    let data = await res.json()
    return data
}