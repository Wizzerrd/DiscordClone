import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { updateUser } from "../../../../store/session";
import { setModalType } from "../../../../store/ui";

export default function UserOptionsModal({modalPage}){

    const {username, id} = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [newUsername, setNewUsername] = useState("")
    const [error, setNewError] = useState("")

    function saveUserDetails(){
        if(username.length >= 2 || username.length <= 32){
            dispatch(updateUser({
                username: newUsername,
                id: id
            })).then(
                setModalType(false)
            )
        }else{
            setNewError("Username must be between 2-32 long")
        }
    }
    
    useEffect(()=>{
        setNewUsername(username);
    }, [username])
    
    switch(modalPage){
        case 0:
            return (
            <div className="modal-foreground">
                <h1>User Options for {username}</h1>
                <div id="username-change-section">
                    <h3>Change Username: </h3>
                    <input type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)}/>
                </div>
                <button className="discord-button button-small" onClick={()=>{saveUserDetails()}}>Save Changes</button>
                
            </div>)
    }
}