import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useParams } from 'react-router-dom';
import { logout } from '../../store/session';
import './base.css'
import LeftPanel from '../LeftPanel';
import NewServer from '../NewServer';

export default function AppBase({sessionUser}){

    const dispatch = useDispatch()
    const {serverId, channelId} = useParams()

    console.log(useParams())

    if (!sessionUser) return <Redirect to="/login" />


    return(
        <div className='app-main'>
            <button className='god-button' onClick={()=>dispatch(logout())}>Log Out</button>
            <div className='server-scroller'>
                    <div id='friend-list-selector' className='server-bubble'> 

                    </div>
                    <div className='server-list'>

                    </div>
                    <div>
                        <div className='server-list-item' id='add-server-button'>
                            +
                        </div>
                    </div>
            </div>
            <LeftPanel serverId={serverId}/>
            {/* <NewServer/> */}
        </div> 
    )
}