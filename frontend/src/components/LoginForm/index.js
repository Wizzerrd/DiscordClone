import {  useState } from 'react';
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
                password: 'emerging'
            }
        }
        return dispatch(login(demoUser))
    }

    if (sessionUser) return <Redirect to="/channels" />

    return(
        
        <div className='login-zone'>
            <div className='login-box'>
                <div className='login-fields'>
                    <h3>Welcome back!</h3>
                    <h4>We're so excited to see you again!</h4>
                    <form onSubmit={handleSubmit}>
                        <label className={errors.errors && "error-message"} htmlFor="credential">EMAIL OR USERNAME</label>{errors.errors && <p className="error-message"> - {errors.errors}</p>}
                        <input value={credential} id="credential" type="text" onChange={(e) => setUserObj({...userObj, credential: e.target.value})}></input>
                        <label className={errors.errors && "error-message"} value={password} htmlFor="password">PASSWORD</label>{errors.errors && <p className="error-message"> - {errors.errors}</p>}
                        <input id="password" type="password" onChange={(e) => setUserObj({...userObj, password: e.target.value})}></input>
                        <input type='submit' value="Log In"/>
                    </form>
                    <p>Need an account? <Link to='/register'>Register</Link></p>
                </div>

                <div className='other-stuff'>

                    <div className='demo-buttons'>
                        <button onClick={handleDemoLogin} value={'1'}>Demo User 1</button>
                        <button onClick={handleDemoLogin} value={'2'}>Demo User 2</button>
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