import { Redirect, Link } from 'react-router-dom';
import SiteNavBar from '../SiteNavBar';

import { ReactComponent as RightImage } from '../../Assets/right-splash.svg';
import { ReactComponent as LeftImage } from '../../Assets/left-splash.svg';

import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

import './splash.css'

export default function Splash(){
    return (
        <>
            <SiteNavBar/>
            <div className="splash-main">

                <div className='splash-first'>
                    <h1>DISCORD CLONE</h1>
                    <p>By Luis Laffitte</p>
                    <br/>
                    <br/>
                    <p>To begin, simply press <Link className='splash-auth' id='auth-on-splash' to="/login">Login</Link> at the top of the screen</p>
                    <br/>
                    <br/>
                    <div className='my-links'>
                        <h1>My Links:</h1>
                        <div className='links-holder'>
                            <a target="_blank" className='my-link' href='https://github.com/Wizzerrd/'><AiFillGithub /></a>
                            <a target="_blank" className='my-link' href='https://www.linkedin.com/in/luis-laffitte-276238286/'><AiFillLinkedin /></a>
                        </div>
                    </div>
                </div>
                <div className="splash-last">
                    <LeftImage id='splash-left' className='svg-image'/>
                    <RightImage id='splash-right' className='svg-image'/>
                </div>

            </div>
        </>
    )
}