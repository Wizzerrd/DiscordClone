import { useSelector } from "react-redux";
import "./user-info.css";

export default function UserInfo(){

    const {username} = useSelector(state => state.session.user)
    
    return(
        <div id="user-info-box">

            <div id="user-profile-section">
                <div id="user-profile-picture">

                </div>
                <div id="user-profile-name">{username}</div>

                <div>

            </div>


            </div>
        </div>
    )
}