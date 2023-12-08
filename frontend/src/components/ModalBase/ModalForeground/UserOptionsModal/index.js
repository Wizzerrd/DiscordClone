import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { addError, logout, setErrors, updateUser } from "../../../../store/session";
import { setModalType } from "../../../../store/ui";
import "./user-options.css" 

export default function UserOptionsModal({modalPage}){

    const {username, id} = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [newUsername, setNewUsername] = useState("")
    const {errors} = useSelector(state => state.session)

    const saveUserDetails = async () => {
        await dispatch(setErrors([]));
        if((newUsername.length >= 2 || newUsername.length <= 32) && newUsername.match(/^[a-zA-Z0-9._]+$/) && !newUsername.includes("..")){ 
            let caught;
            await dispatch(updateUser({
                username: newUsername,
                id: id
            })).catch(async err => {
                const data = await err.json()
                await dispatch(addError(data.errors))
                caught = true;
            })
            if(!caught){
                await dispatch(setModalType(false))
            }
        }else{
            if(newUsername.length < 2 || newUsername.length > 32){
                await dispatch(addError("Username must be between 2-32 in length"))
            }
            if(!newUsername.match(/^[a-zA-Z0-9._]+$/)){
                await dispatch(addError("Please only use numbers, letters, underscores _ , or periods ."))
            }
            if(newUsername.includes("..")){
                await dispatch(addError("Username cannot contain repeating dots ( .. )"))
            }
        }
    }

    const closeAndLogout = async () => {
        await dispatch(setModalType(false))
        await dispatch(logout());
    }
    
    useEffect(()=>{
        dispatch(setErrors([]));
        setNewUsername(username);
    }, [username])
    
    switch(modalPage){
        case 0:
            return (
            <div className="modal-foreground">
                <h1>User Options for {username}</h1>

                <div id="username-change-section">
                    <h3>Change Username: </h3>
                    <input id="username-change-box" type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)}/>
                    <ul id="user-options-errors">
                        {errors.map(error => <li key={errors.indexOf(error)} className="error-message">{error}</li>)}
                    </ul>
                </div>

                <div id="save-button-div">
                    <button className="discord-button button-small" onClick={()=>{saveUserDetails()}}>
                        Save Changes
                    </button>
                    <div onClick={()=>closeAndLogout()} id="user-options-logout" className="discord-button button-small negative-button">
                        Logout
                    </div>
                </div>

            </div>)
    }
}