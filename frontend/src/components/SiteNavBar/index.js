import { Redirect, Link } from 'react-router-dom';


export default function SiteNavBar(){
    return(
        <div className="nav-bar">
                <Link to="/"><img alt="Discord logo with text"/></Link>
                <Link to="/login">Login</Link>
        </div>
    )
}