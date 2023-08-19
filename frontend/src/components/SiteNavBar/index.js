import { Redirect, Link } from 'react-router-dom';

import './navbar.css'

export default function SiteNavBar(){
    return(
        <div className="nav-bar">
            <div>
                <Link to="/"><img className='full-logo' src='https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0b5493894cf60b300587_full_logo_white_RGB.svg' alt="Discord logo with text"/></Link>
            </div>

            <div>

            </div>

            <Link id='splash-auth' to="/login">Login</Link>
        </div>
    )
}