import { Redirect, Link } from 'react-router-dom';

import './splash.css'

export default function Splash(){
    return (
        <>
        <div className="main">
            <div className="nav-bar">
                <Link to="/"><img alt="Discord logo with text"/></Link>
                <Link to="/login">Login</Link>
            </div>
            <div className="">
                <h1>IMAGINE A PLACE...</h1>
                <p>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
                <button>Open Discord in your browser</button>
            </div>
        </div>
        </>
    )
}