import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { addError, logout, setErrors, updateUser } from "../../../../store/session";
import { setModalType } from "../../../../store/ui";
import "./user-options.css" 

export default function UserOptionsModal({modalPage}){

    const {username, id, avatarUrl} = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [newUsername, setNewUsername] = useState("")
    const [newAvatar, setNewAvatar] = useState(null)
    const {errors} = useSelector(state => state.session)

    const saveUserDetails = async () => {
        await dispatch(setErrors([]));
        if(newUsername !== username){
            await handleUsername()
        }
    }

    const handleUsername = async () => {
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

    const handleAvatar = async () => {
        
    }

    const closeAndLogout = async () => {
        await dispatch(setModalType(false));
        await dispatch(logout());
    }
    
    const handleFile = ({currentTarget}) => {
        const file = currentTarget.files[0];
        setNewAvatar(file);
    }
    
    useEffect(()=>{
        dispatch(setErrors([]));
        setNewUsername(username);
    }, [username])

    useEffect(()=>{
        console.log(newAvatar)
    }, [newAvatar])
    
    switch(modalPage){
        case 0:
            return (
            <div className="modal-foreground" id="user-options-modal">

                <h1>User Options for {username}</h1>

                <div id="username-change-section">
                    <h3>Change Username: </h3>
                    <input id="username-change-box" type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)}/>
                </div>

                <div id="user-avatar-change-section">
                    <h3>Change Profile Picture: </h3>
                    <div id="user-options-avatar-sizes">
                        <img className="user-options-avatar" id="user-options-avatar-large" src={newAvatar || avatarUrl || "https://laffitte-discord-clone-seeds.s3.us-west-1.amazonaws.com/default.png"}/>
                        <img className="user-options-avatar" id="user-options-avatar-medium" src={newAvatar || avatarUrl || "https://laffitte-discord-clone-seeds.s3.us-west-1.amazonaws.com/default.png"}/>
                        <img className="user-options-avatar" id="user-options-avatar-small" src={newAvatar || avatarUrl || "https://laffitte-discord-clone-seeds.s3.us-west-1.amazonaws.com/default.png"}/>
                    </div>

                    <input id="user-avatar-box" type="file" onChange={handleFile}/>
                </div>

                <ul id="user-options-errors">
                    {errors.map(error => <li key={errors.indexOf(error)} className="error-message">{error}</li>)}
                </ul>

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