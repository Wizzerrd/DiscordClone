import {  useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {login, register} from '../../store/session'

import * as sessionActions from '../../store/session'

import './register.css'

export default function RegisterForm(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState({
        email: '',
        username: '',
        password: '',
        dob: ''
    });

    const [userObj, setUserObj] = useState({
        email: '',
        username: '',
        dob: new Date,
        password: ''
    })


    const DISABLED = 'disabled'

    let {email, username, password, dob} = userObj
    
    function handleSubmit(e){
        e.preventDefault()
        setErrors({
            email: '',
            username: '',
            password: '',
            dob: ''
        })

        dispatch(sessionActions.signup(userObj)).catch( async res => {
            let data;
            try{
                data = await res.clone().json()
            } catch {
                data = await res.json()
                setErrors(data)
            }
        })
    }

    if (sessionUser) return <Redirect to="/channels" />

    return(
        <div className='register-zone'>
            <div className='register-box'>
                <div className='register-fields'>
                    <h3>Create an account</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">EMAIL</label>
                        <input value={email} id="email" type="email" onChange={(e) => setUserObj({...userObj, email: e.target.value})}></input>
                        <label htmlFor="username">USERNAME</label>
                        <input value={username} id="username" type="text" onChange={(e) => setUserObj({...userObj, username: e.target.value})}></input>
                        <label value={password} htmlFor="password">PASSWORD</label>
                        <input id="password" type="password" onChange={(e) => setUserObj({...userObj, password: e.target.value})}></input>
                        <input type='submit' value="Continue"/>
                        <label>DATE OF BIRTH</label>

                        <div>
                            <select onChange={(e) => {
                                    const newDate = new Date(dob);
                                    newDate.setMonth(parseInt(e.target.value) - 1); 
                                    setUserObj({ ...userObj, dob: newDate });
                            }} defaultValue={DISABLED}>
                            
                                <option disabled hidden value={DISABLED}>Month</option>
                                <option value='01'>January</option>
                                <option value='02'>February</option>
                                <option value='03'>March</option>
                                <option value='04'>April</option>
                                <option value='05'>May</option>
                                <option value='06'>June</option>
                                <option value='07'>July</option>
                                <option value='08'>August</option>
                                <option value='09'>September</option>
                                <option value='10'>October</option>
                                <option value='11'>November</option>
                                <option value='12'>December</option>
                            </select>

                            <select onChange={(e) => {
                                    const newDate = new Date(dob);
                                    newDate.setDate(parseInt(e.target.value) - 1); 
                                    setUserObj({ ...userObj, dob: newDate });
                            }} defaultValue={DISABLED}>

                                <option disabled hidden value={DISABLED}>Day</option>

                                {[...Array(31)].map((_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                    </option>
                                ))}

                            </select>

                            <select onChange={(e) => {
                                    const newDate = new Date(dob);
                                    newDate.setYear(parseInt(e.target.value) - 1); 
                                    setUserObj({ ...userObj, dob: newDate });
                            }} defaultValue={DISABLED}>

                                <option disabled hidden value={DISABLED}>Year</option>

                                {[...Array(150)].map((_, index) => (
                                    <option key={index + 1870} value={index + 1870}>
                                    {index + 1870}
                                    </option>
                                ))}

                            </select>
                        </div>
                    </form>
                    <p><Link to='/login'>Already have an account?</Link></p>
                </div>
            </div>
        </div>
    )
}