import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useParams } from 'react-router-dom';
import { logout } from '../../store/session';
import './base.css'

export default function AppBase({sessionUser}){
    
    const dispatch = useDispatch()
    const {serverId, channelId} = useParams()

    if (!sessionUser) return <Redirect to="/login" />

    return(
        <>
            <button className='god-button' onClick={()=>dispatch(logout())}>Log Out</button>
            <div className='server-scroller'>
                    <div id='friend-list-selector' className='server-bubble'> 

                    </div>
                    <div className='server-list'>

                    </div>
                    <div>
                        <div id='add-server-button'>
                            +
                        </div>
                    </div>
            </div>
            
        </>
    )
}