import { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {login} from '../../store/session'

import './login.css'

export default function LoginForm(){
    const dispatch = useDispatch() 

    const [userObj, setUserObj] = useState({
        credential:'',
        password: ''
    })

    const [errors, setErrors] = useState({
        errors:''
    });

    const sessionUser = useSelector(state => state.session.user);
    
    let {credential,password} = userObj
    
    function handleSubmit(e){
        e.preventDefault()

        return dispatch(login(userObj)).catch( async res => {
            let data = await res.json();
            if(data.errors){
                setErrors(data);
            }
        })
    }

    function handleDemoLogin(e){
        e.preventDefault()
        let demoUser;
        if(e.target.value === '1'){
            demoUser = {
                username: 'Boolean',
                password: 'truefalse'
            }
        } else {
            demoUser = {
                username: 'Quanta',
                password: 'emergent'
            }
        }
        return dispatch(login(demoUser))
    }

    if (sessionUser) return <Redirect to="/channels/@me" />

    return(
        
        <div className='login-zone'>
            <div className='login-box'>
                <div className='login-fields'>
                    <div className='login-fields-welcome'>
                        <h1>Welcome back!</h1>
                        <h2>We're so excited to see you again!</h2>
                    </div>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="credential">EMAIL OR USERNAME</label>{errors.errors && <p className="error-message"> - {errors.errors}</p>}
                            <input className='input-field' value={credential} id="credential" type="text" onChange={(e) => setUserObj({...userObj, credential: e.target.value})}></input>
                        </div>

                        <div>
                            <label value={password} htmlFor="password">PASSWORD</label>{errors.errors && <p className="error-message"> - {errors.errors}</p>}
                            <input className='input-field' id="password" type="password" onChange={(e) => setUserObj({...userObj, password: e.target.value})}></input>
                        </div>

                        <div className='submit-div'>
                            <input className='discord-button' type='submit' value="Log In"/>
                        </div>

                    </form>
                    <div className='register-link-div'>Need an account? <Link to='/register'>Register</Link></div>
                </div>

                <div className='other-stuff'>

                    <div className='demo-buttons'>
                        <button className='discord-button' onClick={handleDemoLogin} value={'1'}>Demo User 1</button>
                        <button className='discord-button' onClick={handleDemoLogin} value={'2'}>Demo User 2</button>
                    </div>
                    <div>
                        <h1>Log in with a Demo Account</h1>
                        <p>Select a user from above to try the app's features instantly.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}