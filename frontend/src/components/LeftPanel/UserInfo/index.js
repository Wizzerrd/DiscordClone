import { AiOutlinePlus } from 'react-icons/ai'
import { useSelector } from "react-redux";
import "./user-info.css";
import { useDispatch } from 'react-redux';
import { setModalType } from '../../../store/ui';

export default function UserInfo(){

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.session);
    
    return(
        <div id="user-info-box">

            <div id="user-profile-section">
                <div id="user-profile-picture">

                </div>
                <div id="user-profile-name">{user?.username}</div>

            </div>
            <div id='user-profile-options-button' onClick={()=>dispatch(setModalType("userOptions"))}>
                <AiOutlinePlus />
            </div>

            
        </div>
    )
}