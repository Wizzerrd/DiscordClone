import { Redirect, useState, useEffect } from 'react';
import { Link,  useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {login} from '../../store/session'

import './login.css'

export default function UserForm(){
    const dispatch = useDispatch()

    const [userObj, setUserObj] = useState({
        username: '',
        email: '',
        credential:'',
        password: ''
    })

    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector(state => state.session.user);
    
    let {credential,password} = userObj
    
    function handleSubmit(e){
        e.preventDefault()
        dispatch(login(credential, password)).catch(res => {
            console.log(res)
        })
    }

    return(
        <div className='login-zone'>
            <div className='login-box'>
                <div className='login-fields'>
                    <h3>Welcome back!</h3>
                    <h4>We're so excited to see you again!</h4>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="credential">EMAIL OR PHONE NUMBER</label>
                        <input value={credential} id="credential" type="text" onChange={(e) => setUserObj({...userObj, credential: e.target.value})}></input>
                        <label value={password} htmlFor="password">PASSWORD</label>
                        <input id="password" type="password" onChange={(e) => setUserObj({...userObj, password: e.target.value})}></input>
                        <input type='submit' value="Log In"/>
                    </form>
                    <p>Need an account? <Link to='/register'>Register</Link></p>
                </div>

                <div className='other-stuff'>

                    <div className='demo-buttons'>
                        <button>Demo User 1</button>
                        <button>Demo User 2</button>
                    </div>
                    <div>
                        <h3>Log in with a Demo Account</h3>
                        <p>Select a user from above to try the app's features instantly</p>
                    </div>

                </div>

            </div>
        </div>
    )
}