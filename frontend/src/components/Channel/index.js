import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { logout } from '../../store/session';

export default function Channel(){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) return <Redirect to="/login" />
    
    return (
        <>
            <button onClick={()=>dispatch(logout())}>Log Out</button>
        </>
    )
}