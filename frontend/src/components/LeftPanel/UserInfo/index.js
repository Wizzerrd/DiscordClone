import { AiOutlinePlus } from 'react-icons/ai'
import { useSelector } from "react-redux";
import "./user-info.css";
import { useDispatch } from 'react-redux';
import { setModalType } from '../../../store/ui';

export default function UserInfo(){

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.session);
    console.log(user.avatar)
    
    return(
        <div id="user-info-box">

            <div id="user-profile-section">
                <img src={user.avatarUrl || "https://laffitte-discord-clone-seeds.s3.us-west-1.amazonaws.com/default.png"} id="user-profile-picture"/>
                <div id="user-profile-name">{user?.username}</div>

            </div>
            <div id='user-profile-options-button' onClick={()=>dispatch(setModalType("userOptions"))}>
                <AiOutlinePlus />
            </div>

            
        </div>
    )
}